FROM node:18.16.1-alpine
RUN mkdir -p /home/food_delivery_application
COPY . /home/food_delivery_application
WORKDIR /home/food_delivery_application
COPY package*.json ./
RUN npm install
ENV NODE_ENV="development"
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "app.js" ]