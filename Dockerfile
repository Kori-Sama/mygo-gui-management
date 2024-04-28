FROM node:20-buster as builder

WORKDIR /app
COPY ./ /app

RUN yarn install

RUN yarn build



FROM nginx:alpine-slim

RUN  rm -rf /etc/nginx/nginx.conf
 
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]