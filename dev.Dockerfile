FROM node:14.14-alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

RUN apk update && apk upgrade
RUN apk add git
RUN apk add yarn

COPY . /usr/src
RUN yarn install

EXPOSE 5000

ENV HOST=0.0.0.0

ENV PORT=5000

CMD [ "yarn", "dev" ]
