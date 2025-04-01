#!/bin/bash

# Exit on any error
set -e

echo "Updating packages..."
sudo yum update -y

# Install dependencies for Node.js and MongoDB
echo "Installing required dependencies..."
sudo yum groupinstall 'Development Tools' -y
sudo yum install -y curl git

# Install Node Version Manager (NVM)
echo "Installing Node Version Manager (NVM)..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Load NVM into the current shell
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Install Node.js version 23
echo "Installing Node.js version 23..."
nvm install 23

# Ensure the application directory exists
APP_DIR="/home/ec2-user/myapp"

if [ ! -d "$APP_DIR" ]; then
  echo "Error: Application directory $APP_DIR does not exist!"
  exit 1
fi

# Verify that package.json exists
if [ ! -f "$APP_DIR/package.json" ]; then
  echo "Error: package.json not found in $APP_DIR!"
  ls -lah "$APP_DIR"
  exit 1
fi

# Install project dependencies
echo "Installing project dependencies..."
cd "$APP_DIR"
npm install

# Install MongoDB Community 8.0
echo "Installing MongoDB Community 8.0..."
echo "[mongodb-org-8.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/8.0/x86_64/
gpgcheck=1
enabled=1" | sudo tee /etc/yum.repos.d/mongodb-org-8.0.repo

sudo yum install -y mongodb-org

# Start MongoDB service
echo "Starting MongoDB..."
sudo systemctl start mongod
sudo systemctl enable mongod

echo "Dependencies installed successfully!"
