document.addEventListener('DOMContentLoaded', () => {
    const animalForm = document.getElementById('animalForm');
    const animalTable = document.getElementById('animalTable').getElementsByTagName('tbody')[0];
    let editRowIndex = null;

    // Add event listener to table body for delete button clicks
    animalTable.addEventListener('click', async function (e) {
        if (e.target.classList.contains('delete')) {
            const row = e.target.closest('tr'); // Find the parent row of the delete button
            if (!row) return; // Return if no row found

            // Ask for confirmation before deleting
            if (confirm('Are you sure you want to delete this row?')) {
                deleteRow(row);
            }
        } else if (e.target.classList.contains('edit')) {
            const row = e.target.closest('tr');
            if (!row) return;

            editRow(row);
        }
    });

    animalForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const animalName = document.getElementById('animalName').value;
        const species = document.getElementById('species').value;
        const count = document.getElementById('count').value;

        const formData = { animalName, species, count };

        if (editRowIndex === null) {
            // Add new row
            try {
                const response = await fetch('/add-animals', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const newRow = animalTable.insertRow();
                    newRow.insertCell(0).textContent = animalName;
                    newRow.insertCell(1).textContent = species;
                    newRow.insertCell(2).textContent = count;

                    const actionsCell = newRow.insertCell(3);
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.className = 'edit';

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'delete';

                    actionsCell.appendChild(editButton);
                    actionsCell.appendChild(deleteButton); // Append delete button without event listener
                } else {
                    console.error('Failed to add animal:', await response.text());
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            // Edit existing row
            const row = animalTable.rows[editRowIndex];
            const id = row.dataset.id; // Assume row has data-id attribute with the MongoDB document ID

            if (confirm('Are you sure you want to update this row?')) {
                try {
                    const response = await fetch(`/update-animal/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        row.cells[0].textContent = animalName;
                        row.cells[1].textContent = species;
                        row.cells[2].textContent = count;
                        editRowIndex = null; // Reset editRowIndex after updating
                    } else {
                        console.error('Failed to update animal:', await response.text());
                    }
                } catch (error) {
                    console.error('Error updating animal:', error);
                }
            }
        }

        animalForm.reset();
    });

    function editRow(row) {
        const cells = row.getElementsByTagName('td');
        document.getElementById('animalName').value = cells[0].textContent.trim();
        document.getElementById('species').value = cells[1].textContent.trim();
        document.getElementById('count').value = cells[2].textContent.trim();

        editRowIndex = row.rowIndex - 1; // Store the index of the row being edited
    }

    function deleteRow(row) {
        const id = row.dataset.id; // Assuming row has data-id attribute with MongoDB document ID

        fetch(`/delete-animal/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    animalTable.deleteRow(row.rowIndex - 1);
                    if (editRowIndex !== null && row.rowIndex - 1 < editRowIndex) {
                        editRowIndex--; // Adjust editRowIndex if a row above the edited row is deleted
                    }
                } else {
                    console.error('Failed to delete animal:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting animal:', error);
            });
    }


    // js to generate pdf

    // Add event listener to the generate PDF button
    $('#generatePDF').on('click', function () {
        const { jsPDF } = window.jspdf;
        // Use html2canvas to take a snapshot of the table
        html2canvas(document.querySelector('.pdf'), {
            x: 0,
            y: 0,
            width: document.querySelector('.container-animal').offsetWidth,
            height: document.querySelector('.container-animal').offsetHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a6');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Check if the image height exceeds one page and add another page if necessary
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            // Save the PDF
            pdf.save('animal-count.pdf');
        });
    });
});
