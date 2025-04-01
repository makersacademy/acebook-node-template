#!/bin/bash
set -e

# Update packages
sudo yum update -y

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 25
nvm install 25
nvm use 25
nvm alias default 25

# Install dependencies
cd /home/ec2-user/app
npm install

# Install MongoDB
sudo yum install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod
