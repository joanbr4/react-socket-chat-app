FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV='production'
COPY . .
RUN yarn install 
EXPOSE 4000
# CMD ['npm', 'run', 'prod']