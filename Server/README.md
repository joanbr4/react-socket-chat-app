# Server side

## How to Install and run it?

Before running the backend project, we need to check that you are in the server route (subfolder) in terminal, if not, copy this.

```sh
cd Server/
```

Lets install all dependencies with next script.

```sh
npm install
```

Then, lets create a container with our dataBase Mongo, it's already configured.

```sh
docker compose up -d
```

To build our project (turn into .js), we just run next script.

```sh
npm run build
```

Once it is build, we can run our server build.

```sh
npm run start
```

But if you want to make changes or want run in dev (row code), type this script.

```sh
npm run dev
```
