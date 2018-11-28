FROM node:11 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

RUN ng build --aot --prod

FROM nginx
ARG api_host=localhost

COPY nginx.conf.template /tmp

ENV API_HOST $api_host

# nginx config
RUN bash -c 'envsubst "\$API_HOST" < /tmp/nginx.conf.template > /etc/nginx/nginx.conf'

# otis pictures
COPY static /usr/share/nginx/static

# angular dist
COPY --from=build /usr/src/app/dist/otis-farted /usr/share/nginx/html




































































































