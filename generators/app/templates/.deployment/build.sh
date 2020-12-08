#!/usr/bin/env sh

set -x

# Cleanup
rm -rf ./dist
rm -rf ./build
mkdir ./build

# Bundle server
cp -a lib ./build/lib
cp package.json ./build/package.json
cp package-lock.json ./build/package-lock.json
cp index.js ./build/index.js

# Bundle audio data
cp -a _data ./build/_data

# Bundle client
npm run gulp
rm -rf ./build/lib/client
cp -a dist ./build/

du -sh ./build/
