# promviz

Visualize Prometheus metrics as a sunburst graph, broken down by namespace and subsystem.

![example sunburst diagram of weighted metrics](https://raw.githubusercontent.com/ssube/promviz/master/docs/example-load.png)

## TODO

This project required the [Prometheus SQL adapter schema](https://github.com/ssube/prometheus-sql-adapter), which
has been retired, and needs to be updated to work with Prometheus' own `/api/v1/labels` endpoint.

## Contents

- [promviz](#promviz)
  - [TODO](#todo)
  - [Contents](#contents)
  - [Usage](#usage)
  - [Status](#status)
  - [Releases](#releases)

## Usage

- clone this repo
  - into a gitpod: https://gitpod.io/#https://github.com/ssube/promviz/tree/master
  - locally: `git clone git@github.com:ssube/promviz.git`
- get some metric names
  - run `psql -f scripts/index-names.sql` against your [Prometheus SQL adapter database](https://github.com/ssube/prometheus-sql-adapter)
  - or use the included names from `src/resource/names.json`
- build the graph app:
  - `make` a bundle
  - or `Terminal -> Run Task -> Serve` in gitpod
- serve `out/`:
  - `SERVE=TRUE make`
  - or `docker run --name promviz-nginx -p 10001:80 -v $(pwd)/out:/usr/share/nginx/html:ro nginx`
- navigate to http://localhost:10001/index.html or the gitpod port

## Status

[![MIT license](https://img.shields.io/github/license/ssube/promviz.svg)](https://github.com/ssube/promviz/blob/master/LICENSE.md)

[![Renovate badge](https://badges.renovateapi.com/github/ssube/promviz)](https://renovatebot.com)
[![Dependency status](https://img.shields.io/david/ssube/promviz.svg)](https://david-dm.org/ssube/promviz)
[![Dev dependency status](https://img.shields.io/david/dev/ssube/promviz.svg)](https://david-dm.org/ssube/promviz?type=dev)
[![Known vulnerabilities](https://snyk.io/test/github/ssube/promviz/badge.svg)](https://snyk.io/test/github/ssube/promviz)

## Releases

[![github release link](https://img.shields.io/badge/github-release-blue?logo=github)](https://github.com/ssube/promviz/releases)
[![github release version](https://img.shields.io/github/tag/ssube/promviz.svg)](https://github.com/ssube/promviz/releases)
[![github commits since release](https://img.shields.io/github/commits-since/ssube/promviz/v0.2.2.svg)](https://github.com/ssube/promviz/compare/v0.2.2...master)

[![npm package link](https://img.shields.io/badge/npm-package-blue?logo=npm)](https://www.npmjs.com/package/promviz)
[![npm release version](https://img.shields.io/npm/v/promviz.svg)](https://www.npmjs.com/package/promviz)
[![Typescript definitions](https://img.shields.io/npm/types/promviz.svg)](https://www.npmjs.com/package/promviz)

[![docker image link](https://img.shields.io/badge/docker-image-blue?logo=docker)](https://hub.docker.com/r/ssube/promviz)
[![docker image size](https://images.microbadger.com/badges/image/ssube/promviz:master.svg)](https://microbadger.com/images/ssube/promviz:master)
