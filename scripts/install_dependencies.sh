#!/bin/bash
set -e 

echo "Updating Packages"
sudo yum update -y

echo "Checking if Git is installed..."
if ! command -v git &>/dev/null; then
    echo "Installing Git..."
    sudo yum install -y git
else
    echo "Git is already installed."
fi

echo "Checking for Homebrew Installation..."
if ! command -v brew &>/dev/null; then
    echo "Installing Homebrew as ec2-user..."
    sudo -u ec2-user /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for the current session
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/ec2-user/.bashrc
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
else
    echo "Homebrew is already installed."
fi

# **Explicitly set Homebrew in PATH**
# eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# echo "Installing NVM via Homebrew"
# brew install nvm

# Install NVM if not installed
if [ ! -d "/home/ec2-user/.nvm" ]; then
    echo "Installing NVM..."
    sudo -u ec2-user bash -c 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash'
fi

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

echo "Installing Node JS"
nvm install 23

echo "Installing project dependencies"
npm install

echo "Tapping MongoDB brew repository"
brew tap mongodb/brew

echo "Installing MongoDB Community 8.0"
brew install mongodb-community@8.0

echo "Dependencies Installed Successfully"