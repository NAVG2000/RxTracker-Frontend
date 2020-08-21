FROM node:10
RUN apt-get update
RUN apt-get install -y nginx
COPY . .
WORKDIR /app
RUN npm install
RUN npm run build
RUN cp /app/nginx.conf /etc/nginx/conf.d
RUN cp -a /app/dist/. /usr/share/nginx/html
RUN rm /etc/nginx/sites-enabled/default
RUN rm /etc/nginx/sites-available/default
EXPOSE 80
CMD nginx -g 'daemon off;'