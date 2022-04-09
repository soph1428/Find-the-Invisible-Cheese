const express = require(`express`)
const app = express()
const server = require(`http`).createServer(app)
const io = require(`socket.io`)(server, { 'pingTimeout': 600000})
var interval = ``
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.use(express.static(__dirname))
io.on(`connection`, (socket) => {
    socket.on(`Global`, (data) => {
        clearInterval(interval)
        interval = setInterval(() => {io.emit(`Global`, data)}, 100)
    })
})
server.listen(process.env.PORT || 5500, "0.0.0.0", () => {
    console.log('listening on 5500');
})