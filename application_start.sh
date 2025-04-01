#!/bin/bash

#navigate into our working directory where we have all our github files
cd /home/ec2-user/acebook

#add npm and node to path
export NVM_DIR="$HOME/.nvm" 
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# Install latest NPM
npm install -g npm@latest
# Install dependencies from package.json
npm install

# Start server
npm start
