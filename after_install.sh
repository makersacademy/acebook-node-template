#!/bin/sh

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
nvm use node

DIR="/home/ec2-user/acebook"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

# Change directory into /acebook
cd /home/ec2-user/acebook
# Install latest NPM
npm install -g npm@latest
# Install dependencies from package.json
npm ci -v

# Add mongodb repo to YUM sources
sudo sh -c "echo [mongodb-org-8.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/8.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-8.0.asc > /etc/yum.repos.d/mongodb-org-8.0.repo"

# Install MongoDB Community from repository
sudo yum install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable at startup
sudo systemctl enable mongod
