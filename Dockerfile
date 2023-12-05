FROM node:20.9-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

RUN npm i

EXPOSE ${PORT}

CMD npm run start
