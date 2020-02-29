FROM node:11.6.0 as build
WORKDIR /app
COPY config ./config
COPY public ./public
COPY src ./src
COPY scripts ./scripts
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
RUN npm install && node scripts/build.js


# Prod container
FROM nginx:1.17.2-alpine as productiton
WORKDIR /var/app
COPY --from=build /app/build ./build
EXPOSE 80

COPY landing-page/landing-assets ./build/landing-assets
COPY landing-page/landing.html ./build/landing.html
COPY nginx.conf /etc/nginx/nginx.conf


CMD ["nginx"]