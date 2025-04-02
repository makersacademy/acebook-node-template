#!/bin/bash
set -e  # Exit on any error

echo "Cleaning previous installations..."

# Remove existing Node.js, NVM, and MongoDB if they exist
rm -rf "$HOME/.nvm" || true
sudo yum remove -y nodejs mongodb-org || true
sudo rm -rf /var/lib/mongo /etc/mongod.conf /var/log/mongodb || true
sudo rm -f /etc/yum.repos.d/mongodb-org-8.0.repo || true

# Update system packages
sudo yum update -y

# Install NVM
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Node.js 23
echo "Installing Node.js 23..."
nvm install 23
export PATH="$HOME/.nvm/versions/node/$(nvm version)/bin:$PATH"

# Ensure the app directory exists
APP_DIR="/home/ec2-user/app"
if [ ! -d "$APP_DIR" ]; then
    mkdir -p "$APP_DIR"
    echo "Created $APP_DIR directory."
fi

# Move to app directory and install npm dependencies
cd "$APP_DIR"
npm init -y
npm install

# Install and start MongoDB
echo "[mongodb-org-8.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/8.0/aarch64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-8.0.asc" | sudo tee /etc/yum.repos.d/mongodb-org-8.0.repo

sudo yum install -y mongodb-org --enablerepo=mongodb-org-8.0
sudo systemctl start mongod
