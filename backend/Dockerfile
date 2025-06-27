# server/Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
