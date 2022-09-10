source /root/.bash_profile
# References
# -------------
# https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html#w2ab1c23b7c10
# https://gist.github.com/sealocal/0cd468ba4f12cdada436aebe534b40da

set -xe

NODE_VERSION=v9.3.0
YARN_REPO="/etc/yum.repos.d/yarn.repo"

# If yarn is not detected, install it.
if which yarn; then
  echo "Skipping installation of yarn -- yarn already installed."
  echo "yarn --version: `yarn --version`"
else
  echo "which yarn: `which yarn`"
  echo "Yarn is not installed and accessible."
  echo "Installing yarn..."

  if [ ! -f $YARN_REPO ]; then
    sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O $YARN_REPO
  
    # Confirm that it downloaded
    file /etc/yum.repos.d/yarn.repo
  fi
  
  # If node is not detected, install it.
  if [ `node --version` == "v$NODE_VERSION" ]; then
    echo "Skipping installation of node -- node already installed."
    echo "node --version: `node --version`"
  else
    echo "Installing Node $NODE_VERSION"

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

    source ~/.nvm/nvm.sh

    nvm install $NODE_VERSION
  fi

  # install yarn
  sudo yum install -y yarn
  yarn --version

  echo "... and finished installing yarn."
fi