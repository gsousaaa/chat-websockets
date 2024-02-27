import express from "express";
import path from "path";
import dotenv from 'dotenv';
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Socket } from "dgram";

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

let connectedUsers: Socket[] = []

io.on('connection', (socket) => {
    console.log('Conexão detectada')

    socket.on('join-request', (username) => {
        const userExists = connectedUsers.includes(username);

        if (!userExists) {
            socket.username = username;
            connectedUsers.push(username);
        }
        console.log(connectedUsers);
        socket.emit('user-on', connectedUsers);
    })
})




