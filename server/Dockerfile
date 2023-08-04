FROM node:18.9.1-alpine

WORKDIR /usr/app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]