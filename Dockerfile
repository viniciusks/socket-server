FROM node:8.16.0-alpine
MAINTAINER Vinicius Kremer Santos <vinicius@ootz.com.br>

EXPOSE 3000

ADD . /

RUN npm install

CMD [ "node", "app.js" ]