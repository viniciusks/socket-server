FROM node:latest
MAINTAINER Vinicius Kremer Santos <vinicius@ootz.com.br>

ADD . /

RUN npm install

CMD [ "node", "app.js" ]