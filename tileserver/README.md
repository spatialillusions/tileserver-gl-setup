# Tileserver-gl

For general information about tileserver-gl:

https://github.com/klokantech/tileserver-gl/

Information about how to modify styles:

https://www.mapbox.com/mapbox-gl-js/style-spec/

Get more base data for the server: (Should be placed under `tileserver/geodata` and be named `planet.mbtiles`)

https://openmaptiles.com/downloads/planet/

## Using custom overlays

- Add SHP files for your overlay to the geodata folder.
- Make a folder under `tileserver/style-additions` with the same name as your SHP file (whitout extension).
- Under your new folder, create a style.json that contains the visualization for your data, the source for your style should have the same name as your folder. See the mapbox-gl-style specification for how it is done.

## Removing the sample overlay

Simply remove the SHP files from `tileserver/geodata/`.
