#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd build

git init
git config user.name "Maxime Colin"
git config user.email "maxime.colin2+travisci@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/maxime-colin/ng2-snd.git"
git fetch upstream
git reset upstream/gh-pages


touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages