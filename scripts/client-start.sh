#! /bin/sh

cd tmp/bergamot
yarn build
yarn global add serve
serve -s build