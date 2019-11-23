FROM node:12.4.0-alpine AS build

WORKDIR /app

# Take advantage of caching and just install node_modules
COPY ./package.json ./yarn.lock ./
RUN yarn install --pure-lockfile --no-progress

# Build application
COPY ./ ./
RUN yarn build

# Only copy over build files for a lightweight image
FROM node:12.4.0-alpine

WORKDIR /app

COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json /app/ormconfig.js ./

EXPOSE 3000

CMD ["yarn", "serve"]
