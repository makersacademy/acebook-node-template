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

# Wait for package-lock.json to be available, checking every 5 seconds
echo "Waiting for package-lock.json to be available..."
MAX_TRIES=10
TRY_COUNT=0
while [ ! -f /home/ec2-user/myapp/package-lock.json ] && [ $TRY_COUNT -lt $MAX_TRIES ]; do
  echo "Waiting for package-lock.json... Attempt $((TRY_COUNT+1))/$MAX_TRIES"
  sleep 5
  TRY_COUNT=$((TRY_COUNT+1))
done

if [ ! -f /home/ec2-user/myapp/package-lock.json ]; then
  echo "Error: package-lock.json not found in /home/ec2-user/myapp after waiting."
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
