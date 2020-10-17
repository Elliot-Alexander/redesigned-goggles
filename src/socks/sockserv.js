const app = require("express")();
const server = require("http").createServer(app);
const options = {
  /* ... */
};
const io = require("socket.io")(server, options);

app.get("/", (req, res) => {
  res.send(
    '<script src="/socket.io/socket.io.js"></script><script>var socket = io();</script>'
  );
});

processes = [];
users = [];

io.on("connection", (socket) => {
  socket.on("lfg", () => {
    socket.emit("lfg", processes);
    console.log("joined lfg");
  });
  socket.on("register_user", (username, room_id) => {
    socket.emit(
      "roomCheck",
      !(users.includes(username) || processes.includes(room_id)) &&
        !(
          username === undefined ||
          username === "" ||
          room_id === undefined || room_id === ""
        )
    );
    console.log(processes);
    console.log(users);
    if (
      !(
        username === undefined ||
        username === "" ||
        room_id === undefined || room_id === ""
      )
    ) {
      users.push(username);
      processes.push(room_id);
    }
    console.log("check");
    socket.on("command"+room_id, (command) => {
      "kubectl exec -i POD_NAME COMMAND"
    })
    socket.join("command"+room_id);
    socket.leave("lfg");
    socket.to("lfg").broadcast.emit("new_room", room_id)
  });
  socket.on("generate_id", () => {
    let code = Math.random()
      .toString(36)
      .substring(7);
    while (processes.includes(code)) {
      code = Math.random()
        .toString(36)
        .substring(7);
    }
    socket.emit("generate_id", code);
  });

  socket.join("lfg");
});

server.listen(3000);
