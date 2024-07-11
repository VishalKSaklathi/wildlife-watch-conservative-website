document.addEventListener('DOMContentLoaded', () => {
    const sightingForm = document.getElementById('sightingForm');
    const uploadPic = document.getElementById('uploadPic');
    const previewImage = document.getElementById('previewImage');
    const latitudeField = document.getElementById('latitude');
    const longitudeField = document.getElementById('longitude');
    const placeNameField = document.getElementById('placeName');

    // Image Preview
    uploadPic.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Initialize the map
    const map = L.map('map').setView([15, 75], 6); // Centered at lat 0, long 0 with zoom level 2

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;

    // Geocoder
    const geocoder = L.Control.Geocoder.nominatim();

    // Add marker on map click and fetch place name using reverse geocoding
    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }
        latitudeField.value = lat;
        longitudeField.value = lng;

        geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), results => {
            const r = results[0];
            if (r) {
                placeNameField.value = r.name;
            } else {
                placeNameField.value = 'Unknown location';
            }
        });
    });

    // Handle form submission
    sightingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(sightingForm);
        // Form data includes user name, email, date of sighting, image, latitude, longitude, and place name.

        console.log('Form Data Submitted:', Object.fromEntries(formData.entries()));
        alert('Sighting reported successfully!');

        sightingForm.reset();
        previewImage.style.display = 'none';
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }
        latitudeField.value = '';
        longitudeField.value = '';
        placeNameField.value = '';
    });
});
