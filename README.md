# Automatic installation of tilserver-gl on Ubuntu

This is files for automatic setup of docker based tileserver-gl on Ubuntu, with the addition that it adds additional overlays.

## How to install server

- Download this repository as a zip to your Ubuntu machine
- Unzip in the root of your account
- Run `setup-server.sh`
- Restart server
- Run `setup-container.sh`

Now your machine is ready, and you can take it offline to an air-gapped system if you want, and it is ready for more data. You can get more mbtiles from openmaptiles.com, place it in the folder `tileserver/geodata/`. (You can also remove files outside the `tileserver` folder if you want.)

You can try out your server by going to `https://localhost/`

Use `tileserver/restart-server.sh` when you want to restart your machine or have updated the data.
