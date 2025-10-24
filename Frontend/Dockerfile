FROM node:22-alpine

WORKDIR /my_project/Frontend

COPY package*.json ./

RUN npm install 

COPY ./src ./src
COPY ./public ./public

RUN npm run build

RUN npm install -g serve@latest

EXPOSE 3000

CMD [ "serve", "-s", "build" ]