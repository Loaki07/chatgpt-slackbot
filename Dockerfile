FROM node:lts-alpine3.10

RUN apk update \
    && apk add git

WORKDIR /chatgpt-slackbot

COPY . .

RUN yarn install

EXPOSE 5557

CMD ["yarn", "start"]