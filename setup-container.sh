#!/usr/bin/env bash

# This is just a first start of the container so that you get it downloaded
docker run --restart always --name tileserver -d -v $(pwd):/data -p 80:80 klokantech/tileserver-gl