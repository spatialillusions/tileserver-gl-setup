#!/usr/bin/env bash

# Set up a new virtual machine with ubuntu and move Archive.zip and this file to the root of the main user
# For network from host to guest, check https://gist.github.com/odan/48fc744434ec6566ca9f7a993f4a7ffb
# After script is done, restart and then run: ./tileserver/stop-update-start.sh

# Install unzip
sudo apt install -y unzip

# Install curl
sudo apt install -y curl

# Install node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs

# Install NPM
sudo apt install -y npm

# Install docker
sudo apt install -y docker.io


# Set up docker
sudo systemctl start docker
sudo systemctl enable docker
# Add current user to docker group
sudo usermod -a -G docker $USER

# Unzip files for the tilserver
unzip Archive.zip -d tileserver

curl -L -o tmp.zip https://github.com/openmaptiles/fonts/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/fonts"
rm -f tmp.zip

curl -L -o tmp.zip https://github.com/openmaptiles/klokantech-basic-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles/klokantech-basic-gl-style"
rm -f tmp.zip

curl -L -o tmp.zip https://github.com/openmaptiles/osm-bright-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles/osm-bright-gl-style"
rm -f tmp.zip

curl -L -o tmp.zip https://github.com/openmaptiles/positron-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles/positron-gl-style"
rm -f tmp.zip

curl -L -o tmp.zip https://github.com/openmaptiles/dark-matter-gl-style/archive/gh-pages.zip
unzip tmp.zip -d "tileserver/styles/dark-matter-gl-style"
rm -f tmp.zip

# Move to the new folder
cd tileserver
npm i shapefile
