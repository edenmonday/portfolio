Skjermbilder som brukes på siden:

  screen2.png   enkeltskjerm, vises i toppen og som siste bilde i karusellen
  flow1.png     bred gjennomgang: velkomst -> kart -> søk -> valgt adresse
  flow2.png     bred gjennomgang: vinddata -> tiltaksliste -> filter -> detalj

Enkeltskjermene er telefonmockups med gjennomsiktig bakgrunn. Siden legger på
skygge selv, så ikke bak inn ramme eller hvit bakgrunn i selve bildet.

Flytbildene vises på lyst kort, fordi pilene i dem er svarte.

Karusellen hopper over bilder som mangler. Vil du ha flere skjermer inn, legg
dem til i listen i FlowSection i src/App.jsx.

screen1.png er ikke i bruk: kartet er kuttet og bunnpanelet er bredere enn
telefonen, så bildet ser feil ut. Byttes det ut med en ren eksport, kan det
legges inn igjen.

Flytbildene er 634x296 og 760x342. Det er i minste laget for skjermer med høy
pikseltetthet — eksporter gjerne i dobbel størrelse hvis originalene finnes.
