FROM node:12-alpine as BASE

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}
RUN npm run build

FROM nginx:alpine
COPY --from=BASE /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
