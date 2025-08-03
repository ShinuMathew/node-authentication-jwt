FROM node:lts-jod
# Uses Node 22 LTS with Alpine Linux for
# smaller size and better security
WORKDIR /usr/src/app
# Creates a work directory /usr/src/app
COPY package*.json ./
# Copies the package.json file
RUN npm install
# install dependencies
COPY . .
# Copies all the content from the 
# project folder to the workdir
EXPOSE 3000
# Exposes port 3000
ENTRYPOINT ["npm", "start"]
# Runs npm start on docker run