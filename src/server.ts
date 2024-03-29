import express from "express";
import path from "path";
import dotenv from 'dotenv';
import { createServer } from 'http'
import { Server } from 'socket.io'

declare module 'socket.io' {
    interface Socket {
        username: string;
    }
}

dotenv.config()


const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

server.listen(process.env.PORT, () => {
    console.log(`server rodando na porta ${process.env.PORT}`)
})

let connectedUsers: string[] = []

io.on('connection', (socket) => {
    console.log('Conexão detectada')

    socket.on('join-request', (username) => {
        const userExists = connectedUsers.includes(username);

        if (!userExists) {
            socket.username = username;
            connectedUsers.push(username);
        }

        console.log(connectedUsers);
        socket.emit('user-ok', connectedUsers);
        
        socket.broadcast.emit('list-update', {
            joined: username,
            list: connectedUsers
        })
    })

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(u => u != socket.username)
        console.log(connectedUsers)

        socket.broadcast.emit('list-update',{
            left: socket.username,
            list: connectedUsers
        } )
    })

    socket.on('send-msg', (txt) => {
        let obj = {
            username: socket.username,
            message: txt
        }
        socket.emit('show-msg', obj)
        socket.broadcast.emit('show-msg', obj)
    })
})




