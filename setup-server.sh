#!/usr/bin/env bash

# Set up a new virtual machine with ubuntu and move Archive.zip and this file to the root of the main user
# For network from host to guest, check https://gist.github.com/odan/48fc744434ec6566ca9f7a993f4a7ffb
# After script is done, restart and then run: ./tileserver/stop-update-start.sh

# Install curl
sudo apt install curl

# Install docker
sudo apt install docker.io

# Install node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install nodejs

# Install NPM
sudo apt install npm

# Install unzip
sudo apt install unzip

# Set up docker
sudo systemctl start docker
sudo systemctl enable docker
# Add current user to docker group
sudo usermod -a -G docker $USER

# Unzip files for the tilserver
#unzip Archive.zip -d tileserver

curl -L -o tmp.zip https://github.com/openmaptiles/fonts/archive/gh-pages.zip
unzip tmp.zip -d "tileserver"
rm -f tmp.zip

mkdir "tileserver/styles"

curl -L -o tmp.zip https://github.com/openmaptiles/klokantech-basic-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles"
rm -f tmp.zip

curl -L -o tmp.zip https://github.com/openmaptiles/osm-bright-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles"
rm -f tmp.zip

curl -L -o tmp.zip https://github.com/openmaptiles/positron-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles"
rm -f tmp.zip

curl -L -o tmp.zip https://github.com/openmaptiles/dark-matter-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles"
rm -f tmp.zip

# Move to the new folder
cd tileserver
npm i shapefile
