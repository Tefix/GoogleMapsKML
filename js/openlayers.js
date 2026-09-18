var startCenter = ol.proj.fromLonLat([24.735, 59.421]);
var startZoom = 13;

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() })
    ],
    view: new ol.View({ center: startCenter, zoom: startZoom })
});

function makeStyle(feature, routeVisible) {
    var name = feature.get('name') || '';
    var geomType = feature.getGeometry().getType();

    if (geomType === 'Point') {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({ color: name === 'kool' ? '#e53935' : '#1565c0' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 2 })
            }),
            text: new ol.style.Text({
                text: name,
                offsetY: -16,
                font: 'bold 13px sans-serif',
                fill: new ol.style.Fill({ color: '#333' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 3 })
            })
        });
    }
    if (geomType === 'LineString') {
        return routeVisible === false ? null : new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#2f2fd3', width: 3 })
        });
    }
    return new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#1565c0', width: 2 }),
        fill: new ol.style.Fill({ color: 'rgba(21,101,192,0.12)' })
    });
}

var routeVisible = true;

var kmlLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '../data/google.kml',
        format: new ol.format.KML({ extractStyles: false })
    }),
    style: function(feature) { return makeStyle(feature, routeVisible); }
});
map.addLayer(kmlLayer);

var popup = document.createElement('div');
popup.style.cssText = 'background:white;padding:6px 12px;border-radius:4px;border:1px solid #aaa;font-size:13px;font-family:sans-serif;';
var overlay = new ol.Overlay({ element: popup, positioning: 'bottom-center', offset: [0, -10] });
map.addOverlay(overlay);

map.on('singleclick', function(e) {
    var coord = ol.proj.toLonLat(e.coordinate);
    document.getElementById('map-info').textContent =
        'Koordinaadid: ' + coord[1].toFixed(5) + ', ' + coord[0].toFixed(5);

    var hit = false;
    map.forEachFeatureAtPixel(e.pixel, function(feature) {
        if (hit) return;
        hit = true;
        popup.textContent = feature.get('name') || 'Objekt';
        overlay.setPosition(e.coordinate);
    });
    if (!hit) overlay.setPosition(undefined);
});

document.getElementById('toggleRouteBtn').onclick = function() {
    routeVisible = !routeVisible;
    this.textContent = routeVisible ? 'Peida marsruut' : 'Naita marsruut';
    kmlLayer.setStyle(function(feature) { return makeStyle(feature, routeVisible); });
};

document.getElementById('resetBtn').onclick = function() {
    map.getView().animate({ center: startCenter, zoom: startZoom, duration: 500 });
};
