FROM node:18-alpine AS build
WORKDIR /app
COPY . .

# Nuevas variables de entorno
ARG PORT=80
ARG PUBLIC_URL
ARG REACT_APP_BASE_URL
ARG REACT_APP_SOCKET_TRACKER
ARG REACT_APP_SOCKET_BACK

# Nuevas variables de entorno
ENV PORT=$PORT
ENV PUBLIC_URL=$PUBLIC_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_SOCKET_TRACKER=$REACT_APP_SOCKET_TRACKER
ENV REACT_APP_SOCKET_BACK=$REACT_APP_SOCKET_BACK

# Verificar la versión de Yarn
RUN yarn --version || npm install -g yarn

# Instalar dependencias con Yarn
RUN yarn install

# Construir el proyecto
RUN yarn build

FROM nginx:1.19-alpine
EXPOSE ${PORT}
COPY --from=build /app/build /usr/share/nginx/html

