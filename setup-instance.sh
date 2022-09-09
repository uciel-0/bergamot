#! /bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
node -e "console.log('Running Node.js ' + process.version)"

export PATH="/usr/local/share/npm/bin:/root/.nvm/versions/node/v16.17.0"

npm i yarn -g