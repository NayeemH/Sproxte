FROM node:16 as base


ARG PORT=5000
ENV PORT $PORT


WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE $PORT


FROM base as production
ENV NODE_ENV=production
COPY . .
RUN npm i 
#& npm run generateKey && npm run setup
CMD ["sh", "-c", "npm run generateKey && npm run setup && node server/index.js" ]


FROM base as development
ENV NODE_ENV=development
COPY . .
RUN npm i -g nodemon && npm i 
RUN npm run generateKey
RUN npm run setup
#&& npm run generateKey && npm run setup
CMD ["node", "server/index.js"]