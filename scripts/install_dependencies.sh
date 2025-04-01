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
# Install Node.js 23
echo "Installing Node.js 23..."
nvm install 23

# Ensure the app directory exists
APP_DIR="/home/ec2-user/app"
if [ ! -d "$APP_DIR" ]; then
    mkdir -p "$APP_DIR"
    echo "Created $APP_DIR directory."
fi

# Move to app directory and install npm dependencies
cd "$APP_DIR"
npm init
npm install

# Install and start MongoDB
