FROM node:latest
ENV HOST="http://192.168.31.212:4001"
ENV PORT=4001

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4001


CMD ["npm","run","start"]