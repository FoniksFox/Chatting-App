import express from "express"
import logger from "morgan"

import { Server } from "socket.io";
import {createServer} from "node:http";

const port = process.env.port ?? 3000;
const path = process.cwd();

const app = express();
const server = createServer(app);
const io = new Server(server);
io.on("connection",(socket) =>{
    console.log("a user has connected")

    socket.on("disconnect",(socket) => {
        console.log("a user has disconnected")
    })
    socket.on("msg",(msg) => {
        io.emit("msg",msg)
    })
})



app.use(logger("dev"));

app.use(express.static(path + "/client"));
app.get("/",(req,res) => {
res.sendFile(path + "/client/index.html")
})
server.listen(port, () =>{
console.log(`server running on port ${port}`)
})

