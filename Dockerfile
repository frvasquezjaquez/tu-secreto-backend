FROM node:10 as Build

WORKDIR /app

COPY package.json .
RUN npm install

From node:10 as Prod
WORKDIR /app

Copy --from=Build /app/node_modules ./node_modules
COPY . .
EXPOSE 4000

CMD ["npm", "run","start" ]
