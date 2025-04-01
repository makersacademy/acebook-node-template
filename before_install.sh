#!/bin/sh

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install
nvm use

DIR="/home/ec2-user/acebook"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

#add npm and node to path
export NVM_DIR="$HOME/.nvm" 
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# Install latest NPM
npm install -g npm@latest
# Install dependencies from package.json
npm install

# Install MongoDB Community from repository
sudo yum install -y mongodb-org-8.0.6 mongodb-org-database-8.0.6 mongodb-org-server-8.0.6 mongodb-mongosh mongodb-org-mongos-8.0.6 mongodb-org-tools-8.0.6 mongodb-org-database-tools-extra-8.0.6

# Start MongoDB
sudo systemctl start mongod

# Enable at startup
sudo systemctl enable mongod
