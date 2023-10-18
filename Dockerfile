# Usa una imagen base de Node.js
FROM node:19

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todos los archivos de tu aplicación al directorio de trabajo en la imagen
COPY . .

# Expone el puerto en el que el servicio estará en ejecución
EXPOSE 3001

# Comando para iniciar el servicio
CMD ["node", "app.js"]