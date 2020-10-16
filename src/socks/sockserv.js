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
  socket.on("create_room", (room_id) => {
    processes.push(room_id);
    const room = socket.of(room_id);
    room.on("connection", socket => {
        console.log("connected to room")
    })
    socket.join(room_id);
  });
  socket.on("lfg", () => {

  });
  socket.on("register_user", (username) => {
    socket.emit("verify", !users.includes(username))
  })
  socket.join("lfg");
  console.log("Here");
  


});

server.listen(3000);
