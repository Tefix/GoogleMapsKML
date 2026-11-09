/* global Cesium */
(async function () {
    'use strict';
    const status = document.getElementById('map-info');
    const reset = document.getElementById('resetBtn');
    const toggle = document.getElementById('toggleRouteBtn');
    try {
        if (typeof Cesium === 'undefined') throw new Error('CesiumJS teeki ei õnnestunud laadida.');
        const viewer = new Cesium.Viewer('cesium-map', {
            baseLayer: new Cesium.ImageryLayer(new Cesium.OpenStreetMapImageryProvider({
                url: 'https://tile.openstreetmap.org/'
            })),
            terrainProvider: new Cesium.EllipsoidTerrainProvider(),
            baseLayerPicker: false,
            geocoder: false,
            animation: false,
            timeline: false,
            homeButton: false,
            infoBox: false
        });
        viewer.scene.globe.depthTestAgainstTerrain = false;
        const response = await fetch('../data/google.kml');
        if (!response.ok) throw new Error('KML HTTP ' + response.status);
        const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
        if (xml.querySelector('parsererror')) throw new Error('Vigane KML-fail.');

        // The Google Earth export contains a transparent global image overlay.
        // It is not one of the assignment's four objects and distorts zoom bounds.
        // Remove it only from the in-memory document; the shared KML stays unchanged.
        Array.from(xml.getElementsByTagNameNS('*', 'GroundOverlay')).forEach(node => node.remove());
        const source = await Cesium.KmlDataSource.load(xml, {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
            clampToGround: false
        });
        await viewer.dataSources.add(source);
        const objects = source.entities.values.filter(entity => entity.position || entity.polyline || entity.polygon);
        if (!objects.length) throw new Error('KML-failis puuduvad kaardiobjektid.');
        const routes = objects.filter(entity => entity.polyline);
        objects.forEach(entity => {
            if (entity.position) {
                entity.billboard = undefined;
                entity.point = new Cesium.PointGraphics({
                    pixelSize: 14,
                    color: entity.name === 'kool' ? Cesium.Color.ROYALBLUE : Cesium.Color.DARKORANGE,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                });
            }
            if (entity.polyline) {
                entity.polyline.material = Cesium.Color.CRIMSON;
                entity.polyline.width = 4;
                entity.polyline.clampToGround = false;
                entity.polyline.positions = entity.polyline.positions.getValue(viewer.clock.currentTime).map(position => {
                    const location = Cesium.Cartographic.fromCartesian(position);
                    return Cesium.Cartesian3.fromRadians(location.longitude, location.latitude, Math.max(2, location.height));
                });
            }
            if (entity.polygon) {
                entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.4);
                entity.polygon.height = 1;
                entity.polygon.outline = true;
                entity.polygon.outlineColor = Cesium.Color.DARKORANGE;
            }
        });
        const coordinates = Array.from(xml.getElementsByTagNameNS('*', 'coordinates'))
            .flatMap(node => node.textContent.trim().split(/\s+/))
            .map(value => value.split(',').map(Number))
            .filter(value => value.length >= 2 && Number.isFinite(value[0]) && Number.isFinite(value[1]));
        const longitudes = coordinates.map(value => value[0]);
        const latitudes = coordinates.map(value => value[1]);
        const bounds = Cesium.Rectangle.fromDegrees(
            Math.min(...longitudes) - 0.008, Math.min(...latitudes) - 0.006,
            Math.max(...longitudes) + 0.008, Math.max(...latitudes) + 0.006
        );
        const showAll = () => viewer.camera.flyTo({ destination: bounds, duration: 1 });
        const loadedMessage = 'KML laaditud: ' + objects.length + ' objekti. Vali kool, kodu, marsruut või polügoon.';
        status.textContent = loadedMessage;
        viewer.selectedEntityChanged.addEventListener(entity => {
            status.textContent = entity ? 'Valitud objekt: ' + (entity.name || 'Nimetu objekt') : loadedMessage;
        });
        reset.addEventListener('click', () => {
            viewer.selectedEntity = undefined;
            showAll();
        });
        let routeVisible = true;
        toggle.addEventListener('click', () => {
            routeVisible = !routeVisible;
            routes.forEach(entity => { entity.show = routeVisible; });
            if (!routeVisible && routes.includes(viewer.selectedEntity)) {
                viewer.selectedEntity = undefined;
            }
            toggle.textContent = routeVisible ? 'Peida marsruut' : 'Näita marsruuti';
            toggle.setAttribute('aria-pressed', String(routeVisible));
        });
        reset.disabled = false;
        toggle.disabled = routes.length === 0;
        await showAll();
    } catch (error) {
        status.textContent = 'Kaarti ei saanud laadida. Kontrolli internetiühendust ja ava leht veebiserveri kaudu. ' + error.message;
        console.error(error);
    }
}());
