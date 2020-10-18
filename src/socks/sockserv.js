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
      (users[room_id] === undefined) || !users[room_id].includes(username) &&
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
        socket.on("command", (command) => {
          console.log("command recieved" + command)
          let conn = new rcon(active[room_id][0], "25575", "minecraft")
          conn.on('auth', function() {
            console.log("Authed!");
            conn.send(command)
        }).on('response', function(str) {
            console.log("Got response: " + str);
            socket.emit("command", str)
        }).on('end', function() {
            console.log("Socket closed!");
            process.exit();
        });
          conn.connect();
        });
        socket.to("lfg").broadcast.emit("new_room", room_id);
        let ip = 'No IP'
        const scaleUpSet = spawn("kubectl", ["scale", "sts", "minecraft-server-set", "--replicas=" + rooms.length])

        let pod_name = ''
        scaleUpSet.stdout.on("data", (data) => {
          const  getPods = spawn("kubectl", ["get", "pods","-o", "json"])
          console.log("scale pod")
          getPods.stdout.on("data", (data) => {
            console.log("getting last pod")
            // console.log(data.toString());
            pod_name = JSON.parse(data.toString()).items[JSON.parse(data.toString()).items.length - 1].metadata.name;
            console.log(pod_name)
            const  exposePod = spawn("kubectl", ["expose", "pod",pod_name, "--type=LoadBalancer"])
            console.log("test")
            exposePod.stdout.on("data", (data) => {
              console.log("expose")
              const  getServices = spawn("kubectl", ["get", "svc","-o", "json"])

              getServices.stdout.on("data", (data) => {
                // console.log(data.toString());
                console.log("getting services")
                let list =  JSON.parse(data.toString()).items
                console.log(list)
                for (let i=0; i< list.length ; i++) {
                  if (i > rooms.length) {
                    console.log(i)
                    const  delService = spawn("kubectl", ["delete", "svc","minecraft-server-set-"+i])
                  }
                  console.log(list[i].metadata.name === pod_name)
                  console.log(pod_name)
                  if (list[i].metadata.name === pod_name) {
                    setTimeout(5000)
                    ip = list[i].status.loadBalancer.ingress[0].ip;
                  }
                }
                active[room_id] = [ip, pod_name]
                socket.emit("ip", active[room_id][0])
                console.log("dumb" + ip)

            });

            getServices.stderr.on("data", (data) => {
              console.error(data.toString());
            });

            getServices.on("exit", (code) => {
              console.log(`Child exited with code ${code}`);
            });
            });
            exposePod.stderr.on("data", (data) => {
              console.error(data.toString());
              const  getServices = spawn("kubectl", ["get", "svc","-o", "json"])

              getServices.stdout.on("data", (data) => {
                // console.log(data.toString());
                console.log("getting services")
                let list =  JSON.parse(data.toString()).items
                console.log(list)
                for (let i=0; i< list.length ; i++) {
                  if (i > rooms.length-1) {
                    console.log(i)
                    const  delService = spawn("kubectl", ["delete", "svc","minecraft-server-set-"+i])
                  }
                  console.log(list[i].metadata.name === pod_name)
                  console.log(pod_name)
                  if (list[i].metadata.name === pod_name) {
                    console.log(list[i].status.loadBalancer.ingress[0].ip)
                    ip = list[i].status.loadBalancer.ingress[0].ip;
                  }
                }
                active[room_id] = [ip, pod_name]
                socket.emit("ip", active[room_id][0])
                console.log("dumb" + ip)

              });

              getServices.stderr.on("data", (data) => {
                console.error(data.toString());
              });

              getServices.on("exit", (code) => {
                console.log(`Child exited with code ${code}`);
              });
            });
            exposePod.on("exit", (code) => {
              console.log(`Child exited with code ${code}`);
            });
          });
          getPods.stderr.on("data", (data) => {
            console.error(data.toString());
          });

          getPods.on("exit", (code) => {
            console.log(`Child exited with code ${code}`);
          });
        });



        socket.to(room_id).emit("ip", ip)
        users[room_id] = [];
      }
      console.log(users)
      users[room_id].push(username);
      socket.emit("users", users[room_id]);
      socket.join(room_id)
      console.log("Join " + room_id)
      socket.to(room_id).emit("new_user", username)
      console.log(active)
      if ( active[room_id] !== undefined && active[room_id][0] !== undefined) {
        console.log("This should work")
        socket.emit("ip", active[room_id][0])
      }
      socket.emit("userInfo", room_id)
      socket.leave("lfg");
    }    

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
