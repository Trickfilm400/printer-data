FROM node:16-alpine3.14 AS builder

WORKDIR /builder

COPY . .

RUN npm ci
RUN npm run build
RUN npm ci --only=production



FROM node:16-alpine3.14
# set working directory
WORKDIR /app

MAINTAINER Trickfilm400 <info@trickfilm400.de>

COPY --from=builder /builder/dist/ dist/
COPY --from=builder /builder/package*.json /app/
COPY --from=builder /builder/node_modules/ node_modules/


ENTRYPOINT ["node", "."]
