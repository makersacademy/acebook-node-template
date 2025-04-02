#!/bin/bash
set -e

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Change to the app directory
cd /home/ec2-user/app

# Backup existing package.json if it exists
if [ -f package.json ]; then
    echo "package.json already exists, backing it up..."
    mv package.json package.json.bak
fi

# If you are copying a new package.json, do it here (optional)
# cp /path/to/new/package.json /home/ec2-user/app/

# Install Node.js dependencies
npm install

# Start the server
npm run start