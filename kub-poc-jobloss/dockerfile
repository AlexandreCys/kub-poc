FROM debian:latest

RUN sed 's/main$/main universe/' -i /etc/apt/sources.list
RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
                                   apt-get upgrade -y

RUN apt-get install -y curl gnupg

# install node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY ./package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY ./ /usr/src/app

ENV NODE_ENV test

EXPOSE 8080
EXPOSE 8081

CMD [ "npm", "start" ]
