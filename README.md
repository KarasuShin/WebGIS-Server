# WebGIS Server

[![docker publish](https://img.shields.io/docker/pulls/karasushin/webgis-server?branch=master&label=docker%20publish&logo=docker)](https://hub.docker.com/r/karasushin/gis-server)
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/karasushin/webgis-server/latest?logo=docker)
![GitHub](https://img.shields.io/github/license/karasushin/WebGIS-Server)


## Introduction

a gis tiledata server powered by @nestJS

## Deploy

### Manual

clone the project to your local machine.
```bash
git clone git@github.com:KarasuShin/gis-server.git
cd gis-server
```

install dependencies.
```bash
pnpm install
```

build project.
```bash
pnpm run build
```

run the application
```bash
node dist/main.js
```
or use pm2
```bash
pm2 start dist/main.js --name gis-server
```

### Docker
pull docker image.
```bash
docker pull karasushin/gis-server
```
start a container
```bash
docker run -d --name gis-server -v -p 3000:3000 -v /path/to/data:/app/data karasushin/gis-server
```