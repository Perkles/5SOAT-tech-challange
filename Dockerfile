FROM node:18 as builder

WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm install
COPY . .
RUN npx tsc
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
