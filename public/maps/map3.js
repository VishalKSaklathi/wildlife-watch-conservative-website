const map = L.map('map').setView([13.5204, 75.7224], 7);

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> WildLife Watch';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

//places and their lat long
L.circle([11.6548, 76.6167
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Bandipur Wildlife Sancturies</b>');
L.circle([12.1081, 76.1200
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Nagarhole Wildlife Sancturies</b>');
L.circle([13.6800, 75.6300
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Bhadra Wildlife Sancturies</b>');
L.circle([15.2473, 74.6296
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Dandeli Wildlife Sancturies</b>');
L.circle([13.1500, 75.2500
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Kudremukh Wildlife Sancturies</b>');
L.circle([12.6087, 75.6931
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Pushpagiri Wildlife Sancturies</b>');
L.circle([11.9794, 75.9000
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Brahmagiri Wildlife Sancturies</b>');
L.circle([14.1700, 74.8400
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Sharavathi Wildlife Sancturies</b>');
L.circle([13.5264, 75.1304
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Someshwara Wildlife Sancturies</b>');
L.circle([12.2326, 77.7832
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Cauvery Wildlife Sancturies</b>');
L.circle([13.8653, 74.7505
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Mookambika Wildlife Sancturies</b>');
L.circle([12.3921, 76.5550
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Arabithittu Wildlife Sancturies</b>');
L.circle([12.6600, 76.6500
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Melukote Wildlife Sancturies</b>');
L.circle([12.3961, 75.5264
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Talakaveri Wildlife Sancturies</b>');
L.circle([15.6154, 74.4055
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Bhimgad Wildlife Sancturies</b>');
L.circle([17.4893, 77.4164
], {
    color: 'yellow',
    fillColor: '#F39C12',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Chincholi  Wildlife Sancturies</b>');
