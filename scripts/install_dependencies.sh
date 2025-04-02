#!/bin/bash
set -e 

echo "Updating Packages"
sudo yum update -y

echo "Checking for Homebrew Installation..."
if ! command -v brew &>/dev/null; then
    echo "Installing Homebrew..."
    sudo -u ec2-user /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "Homebrew is already installed.."
fi

echo "Installing NVM"
brew install nvm

echo "Installing Node JS"
nvm install 23

echo "Installing project dependencies"
npm install

echo "Tapping MongoDB brew repository"
brew tap mongodb/brew

echo "Installing MongoDB Community 8.0"
brew install mongodb-community@8.0

echo "Dependencies Installed Successfully"