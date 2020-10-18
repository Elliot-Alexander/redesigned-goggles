const app = require("express")();
const server = require("http").createServer(app);
const options = {
  /* ... */
};
const io = require("socket.io")(server, options);
const rcon = require("rcon")
const { spawn } = require("child_process");

const login = spawn("gcloud.cmd", [
  "container",
  "clusters",
  "get-credentials",
  "cluster-1",
  "--zone",
  "us-central1-c",
  "--project",
  "hackathon2020-292800",
]);

login.stdout.on("data", (data) => {
  console.log(data.toString());
});

login.stderr.on("data", (data) => {
  console.error(data.toString());
});

login.on("exit", (code) => {
  console.log(`Child exited with code ${code}`);
});

app.get("/", (req, res) => {
  res.send(
    '<script src="/socket.io/socket.io.js"></script><script>var socket = io();</script>'
  );
});

rooms = [];
users = {};
pods = [];
active = {};

io.on("connection", (socket) => {
  socket.on("lfg", () => {
    socket.emit("lfg", rooms);
    console.log("joined lfg");
  });
  socket.on("register_user", (username, room_id) => {
    socket.emit(
      "roomCheck",
      !users[room_id].includes(username) &&
        !(
          username === undefined ||
          username === "" ||
          room_id === undefined ||
          room_id === ""
        )
    );
    if (
      !(
        username === undefined ||
        username === "" ||
        room_id === undefined ||
        room_id === ""
      )
    ) {
      if (!rooms.includes(room_id)) {
        rooms.push(room_id);
        socket.on("command" + room_id, (command) => {
          let conn = new rcon(active[room_id][0], "25575", "minecraft")
          conn.on('auth', function() {
            console.log("Authed!");
            conn.send(command)
        }).on('response', function(str) {
            console.log("Got response: " + str);
            socket.emit("console", str)
        }).on('end', function() {
            console.log("Socket closed!");
            process.exit();
        });
          "kubectl exec -i POD_NAME COMMAND";
        });
        socket.to("lfg").broadcast.emit("new_room", room_id);
        const scaleUpSet = spawn("kubectl", ["scale", "sts", "minecraft-server-set", "--replicas=" + rooms.length])
        const  getPods = spawn("kubectl", ["get", "pods","-o", "json"])

        let pod_name = JSON.parse(getPods).items[-1].metadata.name;
        const  exposePod = spawn("kubectl", ["expose", "pod",pod_name, "type=LoadBalancer"])
        const  getServices = spawn("kubectl", ["get", "svc","-o", "json"])
        let ip = JSON.parse(getServices).items[-1].status.loadBalancer.ingress[0].ip
        active[room_id] = [ip, pod_name]
        socket.to(room_id).emit("ip", ip)
        users[room_id] = [];
      }
      users[room_id].push(username);
      socket.emit("users", users[room_id]);
    }    
    socket.join(room_id)
    socket.to(room_id).broadcast.emit("new_user", username)
    socket.emit("ip", active[room_id][0])
    socket.leave("lfg");
  });

  socket.on("generate_id", () => {
    let code = Math.random()
      .toString(36)
      .substring(7);
    while (rooms.includes(code)) {
      code = Math.random()
        .toString(36)
        .substring(7);
    }
    socket.emit("generate_id", code);
  });


  socket.join("lfg");
});

server.listen(3000);
