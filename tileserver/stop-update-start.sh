#!/usr/bin/env bash

# stop all docker containers
docker stop tileserver
docker rm tileserver
# update geodata
node update-data.js
# Restart container
docker run --restart always --name tileserver -d -v $(pwd):/data -p 80:80 klokantech/tileserver-gl -c config-custom.json;
