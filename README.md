# Automatic installation of tilserver-gl on Ubuntu

This is files for automatic setup of docker based tileserver-gl on Ubuntu, with the addition that it adds additional overlays.

## Overlays data

Overlays in SHP format are placed in the geodata folder togheter with the planet.mbtiles file.

Style layers for the overlays are placed in the style-additions folder.

When the start up script stop-update-start.sh runs, it will:

- Stop the current tileserver docker container
- Remove the container
- Convert SHP files to GeoJSON and insert data and additional styles into existing styles, see update-data.js
- Start a new tileserver container
