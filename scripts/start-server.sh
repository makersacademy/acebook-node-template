#!/bin/bash
cd ~/aws-codedeploy
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash  
source ~/.bashrc 
nvm install 16.0.0
npm install
npm start