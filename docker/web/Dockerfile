FROM node:18.16.1-bullseye-slim as base

RUN mkdir /app
WORKDIR /app

RUN apt update && \
    apt upgrade && \
    apt install -y curl libpq-dev build-essential procps && \
    apt clean

COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json

FROM base as dev
RUN npm install
RUN apt install -y git && apt clean
CMD ["npm", "run", "start:dev"]