document.getElementById('accountLink').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('accountPopup').style.display = 'flex';
});

document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('accountPopup').style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('accountPopup')) {
        document.getElementById('accountPopup').style.display = 'none';
    }
});
