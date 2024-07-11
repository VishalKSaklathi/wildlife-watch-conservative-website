const map = L.map('map').setView([13.5204, 75.7224], 7);

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> WildLife Watch';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

// L.marker([15, 75]).addTo(map)
//     .bindPopup('<img src="./public/images/s4.jpg" style="width:150px; height:125px; display:flex">The White Tiger<br> Bhadra Forest');

L.circle([11.666400, 76.6291894
], {
    color: '#196F3D',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Bandipur National Park</b>');

L.circle([14.9981, 74.3587
], {
    color: '#196F3D',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Anshi National Park</b>');

L.circle([13.1413, 75.2537
], {
    color: '#196F3D',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Kudremukha National Park</b>');

L.circle([12.0734, 76.1511
], {
    color: '#196F3D',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Nagarahole National Park</b>');

L.circle([12.7822, 77.5737], {
    color: '#196F3D',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Bannerghatta National Park</b>');
