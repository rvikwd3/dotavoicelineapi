FROM node:alpine
WORKDIR /usr/browserSource
COPY ./obsBrowserSource /usr/browserSource
RUN npm install
RUN npm run prod