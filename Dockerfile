FROM Node:12.6.0

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]