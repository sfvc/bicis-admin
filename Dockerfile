
# Usar Nginx para servir el contenido estático
FROM nginx:1.19-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/share/nginx/html

# Nuevas variables de entorno
ARG PORT=80
ENV PORT=$PORT

# Exponer el puerto configurado
EXPOSE ${PORT}

# Copiar la carpeta 'dist' al directorio de Nginx
COPY ./dist /usr/share/nginx/html
