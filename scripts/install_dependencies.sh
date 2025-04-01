#!/bin/bash
set -e  # Exit on any error

# Update system packages
sudo yum update -y

# Install NVM if not installed
if [ ! -d "$HOME/.nvm" ]; then
    echo "Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
else
    echo "NVM is already installed."
fi

# Load NVM into the shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Node.js 23
echo "Installing Node.js 23..."
nvm install 23
nvm use 23
nvm alias default 23

# Ensure the app directory exists
APP_DIR="/home/ec2-user/app"
if [ ! -d "$APP_DIR" ]; then
    mkdir -p "$APP_DIR"
    echo "Created $APP_DIR directory."
fi

# Move to app directory and install npm dependencies
cd "$APP_DIR"
if [ -f "package.json" ]; then
    echo "Installing npm dependencies..."
    npm install
else
    echo "Warning: No package.json found. Skipping npm install."
fi

# Install and start MongoDB
echo "Installing MongoDB..."
sudo yum install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod
