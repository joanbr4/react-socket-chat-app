# Use your preferred development version of Node.js
FROM node:20-alpine as server-builder
WORKDIR /Server
COPY ./Server .
RUN  npm install 
EXPOSE 4000
CMD ["npm","run", "dev"]

# Use another stage for the client
FROM node:20-alpine as client-builder
ENV VITE_DOCKER='Hola Docker'
WORKDIR /Client
COPY ./Client/ .
RUN  npm install
EXPOSE 5173
CMD ["npm","run", "dev"]