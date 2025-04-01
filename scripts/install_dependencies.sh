#!/bin/bash
set -e

# Update packages
sudo yum update -y

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 23
nvm install 23
nvm use 23
nvm alias default 23

# Install dependencies
cd /home/ec2-user/app
npm install

# Install MongoDB
sudo yum install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod
