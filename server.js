const express = require('express')
const app = express()
const path = require("path");
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" }})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get('/', (req, res) => {
  res.render("home/index")
})

server.listen(3000, () => {
  console.log('server running')
})

io.on('connection', (socket) => {
  console.log('socket connected')
  socket.emit('handshake', 'hello client')

  socket.on('answer', (msg) => {
    console.log(msg)
  })

})
