import express from "express";
import path from "path";
import dotenv from 'dotenv';
import { createServer } from 'http'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

server.listen(process.env.PORT, ()=> {
    console.log(`server rodando na porta ${process.env.PORT}`)
})

io.on('connection', (socket)=> {
    console.log('Conexão detectada')
})



