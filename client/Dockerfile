FROM node:17-alpine3.14 as build

WORKDIR /app

# copy the app
COPY . /app/

# prepare the container for buildding react
RUN npm install 
RUN npm run build

# prepare NGINX
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


# fire up NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
