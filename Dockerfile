# NestJS uygulaması için bir temel image
FROM node:18

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodunu kopyala
COPY . .

# Port tanımla
EXPOSE 3000

# Uygulamayı çalıştır
CMD ["npm", "run", "start:dev"]
