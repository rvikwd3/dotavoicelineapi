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
# Build backend
# ------------
FROM node:alpine as backend
WORKDIR /usr/app/backend
COPY ./backend/package*.json ./
COPY ./backend/tsconfig*.json ./
RUN npm install
# Bundle app source
COPY ./backend .
RUN npm run prod

# ------------
# Copy files to root and run backend
# ------------
FROM node:alpine as run-container
WORKDIR /usr/app/run
# Copy over built files from backend into root
COPY --from=backend /usr/app/backend/package*.json ./
COPY --from=backend /usr/app/backend/dist ./
COPY --from=backend /usr/app/backend/.env ./
# Copy over backend public files into public folder
COPY --from=backend /usr/app/backend/public ./public
# Copy over built asset & view files from obsBrowserSource
COPY --from=browserSource /usr/app/browserSource/dist/index.html ./views/pages/obsBrowserSource/index.html
COPY --from=browserSource /usr/app/browserSource/dist/assets ./public/assets
# Copy over built asset & view files from frontend
COPY --from=frontend /usr/app/frontend/dist/index.html ./views/pages/frontend/index.html
COPY --from=frontend /usr/app/frontend/dist/userRegistrationPage/index.html ./views/pages/frontend/userRegistrationPage/index.html
COPY --from=frontend /usr/app/frontend/dist/assets ./public/assets
# Build express app for production

RUN find . | sed -e "s/[^-][^\/]*\//  |/g" -e "s/|\([^ ]\)/|-\1/"

RUN npm ci --only=production
EXPOSE 8000
CMD [ "node", "src/index.js" ]