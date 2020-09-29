FROM node:10.22.1-slim as Build

WORKDIR /app

COPY package.json  .
RUN npm install

FROM node:10.22.1-slim as Prod
WORKDIR /app

COPY --from=Build /app/node_modules ./node_modules
COPY . .
EXPOSE 3000

CMD ["npm", "run","start" ]
