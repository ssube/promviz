# promviz

Visualize Prometheus metrics as a sunburst graph, broken down by namespace and subsystem.

![example sunburst diagram of weighted metrics](https://raw.githubusercontent.com/ssube/promviz/master/docs/example-load.png)

## Features

- filter metrics by name, regexp
- load JSON data from URL
- show a nice graph

## Contents

- [promviz](#promviz)
  - [Features](#features)
  - [Contents](#contents)
  - [Getting Started](#getting-started)
  - [Status](#status)
  - [Releases](#releases)

## Getting Started

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

[![Pipeline status](https://img.shields.io/gitlab/pipeline/ssube/promviz.svg?gitlab_url=https%3A%2F%2Fgit.apextoaster.com&logo=gitlab)](https://git.apextoaster.com/ssube/promviz/commits/master)
[![Test coverage](https://codecov.io/gh/ssube/promviz/branch/master/graph/badge.svg)](https://codecov.io/gh/ssube/promviz)
[![MIT license](https://img.shields.io/github/license/ssube/promviz.svg)](https://github.com/ssube/promviz/blob/master/LICENSE.md)

[![Renovate badge](https://badges.renovateapi.com/github/ssube/promviz)](https://renovatebot.com)
[![Dependency status](https://img.shields.io/david/ssube/promviz.svg)](https://david-dm.org/ssube/promviz)
[![Dev dependency status](https://img.shields.io/david/dev/ssube/promviz.svg)](https://david-dm.org/ssube/promviz?type=dev)
[![Known vulnerabilities](https://snyk.io/test/github/ssube/promviz/badge.svg)](https://snyk.io/test/github/ssube/promviz)

[![Maintainability score](https://api.codeclimate.com/v1/badges/5d4326d6f68a2fa137cd/maintainability)](https://codeclimate.com/github/ssube/promviz/maintainability)
[![Technical debt ratio](https://img.shields.io/codeclimate/tech-debt/ssube/promviz.svg)](https://codeclimate.com/github/ssube/promviz/trends/technical_debt)
[![Quality issues](https://img.shields.io/codeclimate/issues/ssube/promviz.svg)](https://codeclimate.com/github/ssube/promviz/issues)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/ssube/promviz.svg?logo=lgtm)](https://lgtm.com/projects/g/ssube/promviz/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/ssube/promviz.svg)](https://lgtm.com/projects/g/ssube/promviz/alerts/)

## Releases

[![github release link](https://img.shields.io/badge/github-release-blue?logo=github)](https://github.com/ssube/promviz/releases)
[![github release version](https://img.shields.io/github/tag/ssube/promviz.svg)](https://github.com/ssube/promviz/releases)
[![github commits since release](https://img.shields.io/github/commits-since/ssube/promviz/v0.2.2.svg)](https://github.com/ssube/promviz/compare/v0.2.2...master)

[![npm package link](https://img.shields.io/badge/npm-package-blue?logo=npm)](https://www.npmjs.com/package/promviz)
[![npm release version](https://img.shields.io/npm/v/promviz.svg)](https://www.npmjs.com/package/promviz)
[![Typescript definitions](https://img.shields.io/npm/types/promviz.svg)](https://www.npmjs.com/package/promviz)

[![docker image link](https://img.shields.io/badge/docker-image-blue?logo=docker)](https://hub.docker.com/r/ssube/promviz)
[![docker image size](https://images.microbadger.com/badges/image/ssube/promviz:master.svg)](https://microbadger.com/images/ssube/promviz:master)
