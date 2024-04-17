# Just Chattin'

## What can I watch and expect from this project?

This repository has implemented many things, such as:

- Room, namespaces
- Validations JWT
- Sockets
- Component Architecture in Frontend & Hexagonal from Backend as well
- Routing

## Needed Requirements

This project aims to be user-friendly, convenient, and easy to connect to for testing, improvement and more. To handle database queries, we've opted for MongoDB with a [Docker] image, which must be installed first.

## How to Install?

We need to first run our database image from Docker, as it's already configured.

```sh
docker compose up -d
```

Before running the entire project, we need to install our primary depedencies. To do so, enter `npm install` in terminal.

Now we can run both sides of the project with just two commands. One command install all dependencies for both the client and server sides:

```sh
npm run build
```

And the other command is used to run both:

```sh
npm run start
```

<br/>

When you are logged in, we've added mock users for you. To find them and start chatting, use the keyword search "all".

We hope you enjoy this project and feel free to conduct your own tests and make improvements!

<p align="center" >  
<img src="./assets/registerPage.jpg" title="SigInPage" width="900" >
</p>

<br/>

<p align="center">  
<img src="./assets/publicRoom.png" title="PublicRoom" width="900" >
</p>

<br/>

<p align="center">  
<img src="./assets/chatPrivate.jpg" title="PrivatePage" width="900" >
</p>

[Docker]: https://www.docker.com/products/docker-desktop/
