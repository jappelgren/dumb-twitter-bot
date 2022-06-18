FROM node:16


WORKDIR /usr/app

COPY package*.json ./
RUN npm install

EXPOSE 5000

COPY . .

CMD npm start