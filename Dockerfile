FROM node:22-alpine AS build
WORKDIR /app
COPY . .

RUN npm install -g npm@11.5.2
RUN npm install --force
RUN npm run build

FROM nginx:1.19-alpine
EXPOSE 80
COPY --from=build /app/build /usr/share/nginx/html
