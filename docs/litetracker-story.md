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

### Story #89211: GitHubi ja LiteTrackeri sidumine

- Repositoorium: `Tefix/GoogleMapsKML`.
- Alusharu: `feature/cesium-kml`. Story haru: `#89211_github-litetracker`.
- Commit'i näide: `[#89211] Document LiteTracker GitHub integration`.
- [LiteTrackeri juhend](https://help.litetracker.com/articles/github_integration/) kirjeldab Story viidet ja GitHubi webhook'i seadistust.
- Kontroll: GitHubi webhook peab edastama push-sündmuse. Pärast push'i kontrolli, et Story #89211 tegevusvoos kuvatakse vastava commit'i link.
