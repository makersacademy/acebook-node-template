#!/bin/bash

# Exit on any error
set -e

echo "Updating packages..."
# sudo apt update -y  # For Ubuntu/Debian
sudo yum update -y  # For Amazon Linux

echo "Installing Node.js and NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 23

echo "Installing project dependencies..."
cd /home/ec2-user/myapp
npm install

echo "Installing MongoDB..."
wget -qO - https://pgp.mongodb.com/server-8.0.asc | sudo tee /etc/apt/trusted.gpg.d/mongodb.asc
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt update -y
sudo apt install -y mongodb-org

echo "Starting MongoDB..."
sudo systemctl start mongod
sudo systemctl enable mongod
