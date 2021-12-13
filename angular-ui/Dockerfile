FROM node:16.10
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
EXPOSE 4200

# start app
CMD ["ng","serve", "--host", "0.0.0.0", "--disable-host-check"]
