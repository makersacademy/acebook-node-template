#!/bin/bash

# Exit on any error
set -e

echo "Navigating to application directory..."
cd /home/ec2-user/myapp

# Make sure MongoDB is running (optional, depending on your setup)
echo "Checking MongoDB status..."
sudo systemctl status mongod || sudo systemctl start mongod

echo "Starting the Node.js server..."
nohup npm start &  # Assuming you have a 'start' script in package.json
