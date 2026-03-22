FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# docker run -p 3000:3000 -v ${PWD}:/app -v /app/node_modules node-ts-app