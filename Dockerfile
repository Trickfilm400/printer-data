FROM node:16-alpine3.13
# set working directory
WORKDIR /app

MAINTAINER Trickfilm400 <info@trickfilm400.de>

COPY dist/ dist/
COPY package*.json dist/

RUN npm ci

ENTRYPOINT ["node", "dist/"]
