# Game Server Orchestrator

A multiplayer game server orchestrator for containerised game servers running on the Kubernetes Engine. Frontend built with VueJS and TailwindCSS, backend API built with Express and Socket.IO.

Designed to run with Google Kubernetes Engine but could be adapted to run with alternatives or locally. Currently only has Minecraft support but just needs StatefulSet configuration for a game for it to run. 

Requires Kubernetes Cluster on Google Cloud Platform to get started.

Run:

```npm install```

```npm run serve```

```node src/socks/sockserv.js```


Built by myself and [@fulminatingmoat](https://github.com/fulminatingmoat)
