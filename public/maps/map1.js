const map = L.map('map').setView([13.5204, 75.7224], 7);

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> WildLife Watch';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

L.circle([11.7788, 76.4647
], {
    color: '#A93226',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Bandipur Tiger Reserves</b>');

L.circle([13.6949, 75.6352
], {
    color: '#A93226',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Bhadra Tiger Reserves</b>');

L.circle([12.06000, 76.15111
], {
    color: '#A93226',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Nagarahole Tiger Reserves</b>');

L.circle([14.9981, 74.3587
], {
    color: '#A93226',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 7000
}).addTo(map)
    .bindPopup('<b>Kali Tiger Reserves</b>');

// L.circle([15.3173, 75.7139
// ], {
//     color: '#A93226',
//     fillColor: 'red',
//     fillOpacity: 0.5,
//     radius: 7000
// }).addTo(map)
//     .bindPopup('<b>BRT Tiger Reserves</b>');


