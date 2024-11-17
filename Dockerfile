FROM node:22.11.0-bullseye AS build

WORKDIR /bergamot

ENV PATH /bergamot/node_modules/.bin:$PATH

COPY ./package.json /bergamot/

COPY ./yarn.lock /bergamot/

RUN yarn

COPY . /bergamot/

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start-server"]