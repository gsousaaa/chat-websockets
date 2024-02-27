import express from "express";
import path from "path";
import dotenv from 'dotenv';

dotenv.config()

const server = express()

server.use(express.static(path.join(__dirname, '../public')))

server.listen(process.env.PORT, ()=> {
    console.log(`server rodando na porta ${process.env.PORT}`)
})


