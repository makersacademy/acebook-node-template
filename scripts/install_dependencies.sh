#!/bin/bash

# Exit on any error
set -e

echo "Updating packages..."
# sudo apt update -y  # For Ubuntu/Debian
sudo yum update -y  # For Amazon Linux

# Ensure the application directory exists
echo "Ensuring application directory exists..."
sudo mkdir -p /home/ec2-user/myapp
sudo chown ec2-user:ec2-user /home/ec2-user/myapp

# Install Node.js and NVM
echo "Installing Node.js and NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 23

# Verify that package.json exists before installing dependencies
echo "Listing files in /home/ec2-user/myapp for debugging..."
ls -lah /home/ec2-user/myapp

echo "Checking if package.json exists..."
if [ ! -f /home/ec2-user/myapp/package.json ]; then
  echo "Error: package.json not found in /home/ec2-user/myapp! Deployment may have failed."
  exit 1
fi

# Install project dependencies
echo "Installing project dependencies..."
cd /home/ec2-user/myapp || { echo "Directory not found!"; exit 1; }
npm install

# Install MongoDB
echo "Installing MongoDB..."
wget -qO - https://pgp.mongodb.com/server-8.0.asc | sudo tee /etc/apt/trusted.gpg.d/mongodb.asc
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt update -y
sudo apt install -y mongodb-org

# Start MongoDB
echo "Starting MongoDB..."
sudo systemctl start mongod
sudo systemctl enable mongod
