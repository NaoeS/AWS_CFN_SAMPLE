FROM node:13-alpine

WORKDIR /myapp

COPY package*.json ./

RUN npm i --no-optional
