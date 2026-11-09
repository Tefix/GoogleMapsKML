# Story: KML-faili kasutamine CesiumJS-is

Eesmärk: kasutajana soovin näha olemasoleva KML-faili objekte kolmandas kaardikeskkonnas, et võrrelda 2D-kaarte 3D-gloobusega.

Branch: `feature/cesium-kml`

## Ülesanded

1. Uurida CesiumJS KML-tuge ning valida aluskaart, mis ei vaja API-võtit.
2. Lisada `pages/cesium.html` ja laadida sama `data/google.kml` fail.
3. Kuvada kool, kodu, marsruut ja kodukoha polügoon ning kontrollida stiile.
4. Lisada algvaate ja marsruudi nähtavuse nupud ning objektide valimine.
5. Lisada CesiumJS link kõigi lehtede menüüsse ja avalehele.
6. Kontrollida kaarti brauseris ning laadida muudetud projekt Zone.ee serverisse.
7. Siduda LiteTracker GitHubi repoga, push'ida branch ja kontrollida commit'i nähtavust.
8. Lisada LiteTrackerist ekraanipilt, kus on näha Story ning seotud branch ja commit.

## Vastuvõtukriteeriumid

- Kolmas kaart kasutab olemasolevat KML-faili; koordinaate ei kopeerita eraldi andmefaili.
- Kaardil kuvatakse kõik neli põhiobjekti.
- Algvaade ja marsruudi lüliti töötavad.
- Kõigi lehtede menüü kaudu saab kolmandale kaardile.
- GitHubi branch ja commit on LiteTrackeris nähtavad ning lisatud on tegelik ekraanipilt.

## Integreerimise kontroll

Story tuleb luua enne lõplikke sidumiseks vajalikke commit'e. Kasuta LiteTrackeri integratsiooni juhiste kohast Story viidet branch'is või commit'i sõnumis. Ära eelda viite süntaksit: kontrolli seda oma LiteTrackeri keskkonnas.

Kui Story ID on olemas, tee vajalik siduv commit ja push; veendu LiteTrackeris, et kuvatakse õige repo, branch ning commit'i SHA. Kohalik Git log ega GitHubi screenshot ei asenda LiteTrackeri tõendit.

## CesiumJS-i uurimine (#89207)

| Teek | Kaardivaade | KML-i kasutamine projektis |
| --- | --- | --- |
| LeafletJS | 2D-kaart | KML-i loeb lisateek leaflet-omnivore. |
| OpenLayers | 2D-kaart | KML-i loeb sisseehitatud `ol.format.KML`. |
| CesiumJS | 3D-gloobus ja 2D-vaade | Sisseehitatud `KmlDataSource` teisendab KML-i objektid CesiumJS-i üksusteks. |

CesiumJS sobib kolmandaks lahenduseks, sest sama kooli, kodu, marsruuti ja polügooni saab vaadelda 3D-gloobusel. [KmlDataSource](https://cesium.com/learn/cesiumjs/ref-doc/KmlDataSource.html) loeb KML 2.2 faile. KML-i ja Google'i laienduste tugi on osaline, mistõttu rakendus määrab neljale objektile oma stiili ning jätab läbipaistva GroundOverlay kihi kaardilt välja.

Aluskaardiks valisime OpenStreetMapi rasterpaanid aadressilt `https://tile.openstreetmap.org/`. [OpenStreetMapImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/OpenStreetMapImageryProvider.html) saab neid laadida API-võtmeta. Paanide kasutamisel kehtivad [OpenStreetMapi kasutustingimused](https://operations.osmfoundation.org/policies/tiles/).

Võrdluse allikad: [Leaflet Quick Start](https://leafletjs.com/examples/quick-start/), [OpenLayersi KML-vorming](https://openlayers.org/en/latest/apidoc/module-ol_format_KML-KML.html).
