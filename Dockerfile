FROM node:18-alpine as builder

RUN mkdir -p /usr/src/tru-mate
WORKDIR /usr/src/tru-mate
COPY package.json yarn.lock ./
RUN yarn 

COPY . .
RUN  yarn build

FROM node:18-alpine

COPY --from=builder /usr/src/tru-mate/dist /usr/src/tru-mate/dist
COPY --from=builder /usr/src/tru-mate/node_modules /usr/src/tru-mate/node_modules
COPY --from=builder /usr/src/tru-mate/package.json /usr/src/tru-mate/package.json

WORKDIR /usr/src/tru-mate

ENTRYPOINT ["yarn", "start:develop"]
