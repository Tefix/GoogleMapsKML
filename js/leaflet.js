var startCoords = [59.421, 24.735];
var startZoom = 13;

var map = L.map('map').setView(startCoords, startZoom);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

map.on('click', function(e) {
    document.getElementById('map-info').textContent =
        'Koordinaadid: ' + e.latlng.lat.toFixed(5) + ', ' + e.latlng.lng.toFixed(5);
});

document.getElementById('resetBtn').onclick = function() {
    map.setView(startCoords, startZoom);
};

omnivore.kml('../data/google.kml')
    .on('ready', function() {
        this.eachLayer(function(layer) {
            var name = layer.feature && layer.feature.properties && layer.feature.properties.name;
            if (name) layer.bindPopup('<b>' + name + '</b>');
        });
    })
    .addTo(map);
