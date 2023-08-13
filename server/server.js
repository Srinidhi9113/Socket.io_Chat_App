const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())


const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"]
    }})

io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on("send-message",(data)=>{
        console.log(data)
        socket.to(data.room).emit("recieve-message",data)
    })
    socket.on("join-room",(data)=>{
        console.log(data)
        socket.join(data)
    })
})

server.listen(3000)