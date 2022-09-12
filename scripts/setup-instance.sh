source /root/.bash_profile
nvm use 14.15.1

# NODE_STATUS=$(node -v)
# if [NODE_STATUS == 'command not found']; then 
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
#     . ~/.nvm/nvm.sh
#     export NVM_DIR="$HOME/.nvm"
#     [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
#     [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
#     nvm install 14.15.1
#     nvm use 14.15.1
# fi

# curl -o- -L https://yarnpkg.com/install.sh | bash