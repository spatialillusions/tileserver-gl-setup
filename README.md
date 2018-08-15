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

## How to install server

- Download this repository as a zip to your Ubuntu machine
- Unzip in the root of your account
- Run `setup-server.sh`
- Restart server
- Run `setup-container`

Now your machine is ready, and you can take it offline to an air-gapped system if you want, and it is ready for more data. You can get more mbtiles from openmaptiles.com, place it in the folder `tileserver/geodata/`.

You can try out your server by going to `https://localhost/`

Use `tileserver/restart-server.sh` when you want to restart your machine or have updated the data.

## Using custom overlays

- Add SHP files for your overlay to the geodata folder.
- Make a folder under `tileserver/style-additions` with the same name as your SHP file (whitout extension).
- Under your new folder, create a style.json that contains the visualization for your data, the source for your style should have the same name as your folder. See the mapbox-gl-style specification for how it is done.

## Removing the sample overlay

Simply remove the SHP files from `tileserver/geodata/`.
