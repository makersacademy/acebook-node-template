sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
sudo ~/.nvm/versions/node/v15.9.0/bin/npm install
sudo systemctl start mongod