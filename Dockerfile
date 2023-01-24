# ------------
# Build obsBrowserSource View and Asset files
# ------------
FROM node:alpine as browserSource
WORKDIR /usr/app/browserSource
COPY ./obsBrowserSource .
RUN npm install
RUN npm run prod
# View file is ./dist/index.html
# Asset files are in ./dist/assets/

# ------------
# Build frontend View and Asset files
# ------------
FROM node:alpine as frontend
WORKDIR /usr/app/frontend
COPY ./frontend .
RUN npm install
RUN npm run prod
# View files are ./dist/index.html and ./dist/userRegistrationPage/index.html
# Asset files are in ./dist/assets/

# ------------
# Install & run backend
# ------------
FROM node:alpine as backend
WORKDIR /usr/app/backend
COPY ./backend .
# Copy over built asset & view files from obsBrowserSource
COPY --from=browserSource /usr/app/browserSource/dist/index.html ./views/pages/obsBrowserSource
COPY --from=browserSource /usr/app/browserSource/dist/assets ./public/assets
# Copy over built asset & view files from frontend
COPY --from=frontend /usr/app/frontend/dist/index.html ./views/pages/frontend/index.html
COPY --from=frontend /usr/app/frontend/dist/userRegistrationPage/index.html ./views/pages/frontend/userRegistrationPage/index.html
COPY --from=frontend /usr/app/frontend/dist/assets ./public/assets
# Build express app for production
RUN npm ci --only=production
EXPOSE 8000
CMD [ "node", "src/index.js" ]