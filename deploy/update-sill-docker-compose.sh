#!/bin/bash

set -e

cd ~/websites/sill/sill-monorepo
git fetch --tags

if [ -z "$1" ]
then
  versionTag=$(git describe --tags --abbrev=0)
  echo "No version supplied, deploying current version: $versionTag"
else
  versionTag=$1
  echo "Deploying version: $versionTag"
fi

git checkout .
git checkout $versionTag

# the following is made so that the build is done with relative url "/sill"
# jq --indent 4 '{"homepage":"https://xxx.yy/sill"} + .' web/package.json > web/temp.json && mv web/temp.json web/package.json

sed -i 's|base: "\/"|base: "\/sill"|g' web/vite.config.ts

# SILL customization lives on sill-deploy `main`, never in the upstream tags we deploy.
# Overlay it on top of the checked-out tag (config only, app code stays at the tag).
# Fetch by explicit URL so this works regardless of what `origin` points to.
git fetch git@github.com:codegouvfr/sill-deploy.git main
rm -rf customization
git archive FETCH_HEAD customization | tar -x -C .

sudo docker compose -f docker-compose.prod.yml -f customization/docker-compose.prod.override.yml build
sudo docker compose -f docker-compose.prod.yml -f customization/docker-compose.prod.override.yml down
sudo docker compose -f docker-compose.prod.yml -f customization/docker-compose.prod.override.yml up -d
