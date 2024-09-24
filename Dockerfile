# base image
FROM node:18.12.1

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm config set legacy-peer-deps true
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
