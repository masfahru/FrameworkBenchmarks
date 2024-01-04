FROM node:20-slim

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

RUN rm -rf .next/cache

RUN npm ci --omit=dev && npm cache clean --force

CMD ["npm", "start"]
