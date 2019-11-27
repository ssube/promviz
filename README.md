# Rollup Template

This project contains the configuration and build scripts for most of
my Typescript projects, with scripts to create a new project and keep
existing ones up-to-date. Even this readme is a template for others.

## Features

- build scripts with `make`
- build pipeline with `gitlab`
  - update github commit status
  - publish docker images from branches & tags
  - publish npm packages from tags
- bundled with `rollup`
- type checked with `typescript`
- style checked with `eslint` (with `tslint` rules and other plugins)
- tested with `mocha` (with source map support and helpers for async leak tracking)
- code coverage measured with `nyc`
- changelog generated with `standard-release`

### Intentionally Omitted Features

- everything frontend: React, CSS, etc
- heavy backend libraries: ORMs, etc

## Contents

- [Rollup Template](#rollup-template)
  - [Features](#features)
    - [Intentionally Omitted Features](#intentionally-omitted-features)
  - [Contents](#contents)
  - [Status](#status)
  - [Releases](#releases)
  - [Usage](#usage)
    - [To Setup](#to-setup)
    - [To Build](#to-build)
    - [To Release](#to-release)
  - [External Services](#external-services)
    - [Maintenance Bots](#maintenance-bots)
  - [External Secrets](#external-secrets)

## Status

[![Pipeline status](https://img.shields.io/gitlab/pipeline/ssube/rollup-template.svg?gitlab_url=https%3A%2F%2Fgit.apextoaster.com&logo=gitlab)](https://git.apextoaster.com/ssube/rollup-template/commits/master)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ssube_rollup-template&metric=ncloc)](https://sonarcloud.io/dashboard?id=ssube_rollup-template)
[![Test coverage](https://codecov.io/gh/ssube/rollup-template/branch/master/graph/badge.svg)](https://codecov.io/gh/ssube/rollup-template)
[![MIT license](https://img.shields.io/github/license/ssube/rollup-template.svg)](https://github.com/ssube/rollup-template/blob/master/LICENSE.md)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fssube%2Frollup-template.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fssube%2Frollup-template?ref=badge_shield)

[![Open bug count](https://img.shields.io/github/issues-raw/ssube/rollup-template/type-bug.svg)](https://github.com/ssube/rollup-template/issues?q=is%3Aopen+is%3Aissue+label%3Atype%2Fbug)
[![Open issue count](https://img.shields.io/github/issues-raw/ssube/rollup-template.svg)](https://github.com/ssube/rollup-template/issues?q=is%3Aopen+is%3Aissue)
[![Closed issue count](https://img.shields.io/github/issues-closed-raw/ssube/rollup-template.svg)](https://github.com/ssube/rollup-template/issues?q=is%3Aissue+is%3Aclosed)

[![Renovate badge](https://badges.renovateapi.com/github/ssube/rollup-template)](https://renovatebot.com)
[![Dependency status](https://img.shields.io/david/ssube/rollup-template.svg)](https://david-dm.org/ssube/rollup-template)
[![Dev dependency status](https://img.shields.io/david/dev/ssube/rollup-template.svg)](https://david-dm.org/ssube/rollup-template?type=dev)
[![Known vulnerabilities](https://snyk.io/test/github/ssube/rollup-template/badge.svg)](https://snyk.io/test/github/ssube/rollup-template)

[![Maintainability score](https://api.codeclimate.com/v1/badges/0ca333e0379bda050d84/maintainability)](https://codeclimate.com/github/ssube/rollup-template/maintainability)
[![Technical debt ratio](https://img.shields.io/codeclimate/tech-debt/ssube/rollup-template.svg)](https://codeclimate.com/github/ssube/rollup-template/trends/technical_debt)
[![Quality issues](https://img.shields.io/codeclimate/issues/ssube/rollup-template.svg)](https://codeclimate.com/github/ssube/rollup-template/issues)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/ssube/rollup-template.svg?logo=lgtm)](https://lgtm.com/projects/g/ssube/rollup-template/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/ssube/rollup-template.svg)](https://lgtm.com/projects/g/ssube/rollup-template/alerts/)

## Releases

[![github release link](https://img.shields.io/badge/github-release-blue?logo=github)](https://github.com/ssube/rollup-template/releases)
[![github release version](https://img.shields.io/github/tag/ssube/rollup-template.svg)](https://github.com/ssube/rollup-template/releases)
[![github commits since release](https://img.shields.io/github/commits-since/ssube/rollup-template/v0.2.2.svg)](https://github.com/ssube/rollup-template/compare/v0.2.2...master)

[![npm package link](https://img.shields.io/badge/npm-package-blue?logo=npm)](https://www.npmjs.com/package/@apextoaster/rollup-template)
[![npm release version](https://img.shields.io/npm/v/@apextoaster/rollup-template.svg)](https://www.npmjs.com/package/@apextoaster/rollup-template)
[![Typescript definitions](https://img.shields.io/npm/types/@apextoaster/rollup-template.svg)](https://www.npmjs.com/package/@apextoaster/rollup-template)

## Usage

### To Setup

To create a new repository from this template:

- create your new repo on Github & Gitlab (your server or Gitlab.com)
- `git clone git@github.com:ssube/rollup-template.git your-project`
- `cd your-project`
- `git remote add github git@github.com:yourname/your-project.git`
- `git remote add gitlab git@gitlab.com:yourname/your-project.git`
- set up repository mirroring in Gitlab
- set up [some maintenance bots](#maintenance-bots)
- `make git-push`
- install your dependencies
- write some code

### To Build

Once your project is set up:

- `make` to bundle and test
- commit
- `make git-push`

The `git-push` target pushes to Github first, to avoid conflicts with changes
from bots and other contributors.

### To Release

When your project is ready to release:

- `make release-dry` to make sure your changelog and options look right
- `make release`

Additional options can be passed with the `RELEASE_OPTS` variable. Frequently
used options include `--release-as minor` and `--prerelease`.

## External Services

This template works with or expects a few external services, namely a Gitlab
CI server (self-hosted or using Gitlab.com).

### Maintenance Bots

Good tests and clever bots can eliminate the most painful parts of project
maintenance. This repository is configured to work with:

- [CodeCov](https://codecov.io/)
- [Code Climate](https://codeclimate.com/)
- [LGTM](https://lgtm.com/)
- [Renovate](https://renovatebot.com/)
- [Snyk](https://snyk.io/)
- [SonarCloud](https://sonarcloud.io/)

None of these are required, but Renovate and Snyk can be very helpful when
dependencies release a security patch.

## External Secrets

This template expects a few secrets to exist in the environment, including
tokens for the [external services](#external-services).

| Name                | Description                                           |
| ------------------- | ----------------------------------------------------- |
| CC_TEST_REPORTER_ID | code climate ID                                       |
| CODECLIMATE_SECRET  | code climate token                                    |
| CODECOV_SECRET      | codecov token                                         |
| DOCKER_SECRET       | docker config, required for publishing images         |
| GITHUB_SECRET       | github.com token, required for publishing status      |
| NPM_SECRET          | npmjs.com token, required for publishing npm packages |
| SONAR_SECRET        | sonarcloud token                                      |

Secrets should be provided as environment variables, with the secret value
`base64`-encoded.
