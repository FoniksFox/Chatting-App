
import { io } from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js';
document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const user = prompt("Indica su nombre de Usuario")
    let msgArea = document.querySelector(".msgArea");
    const newSection = (txt)=>{
        let section = document.createElement('p');
        section.textContent = txt;
        msgArea.appendChild(section);
        
    }
    class Msg{
        constructor(txt,username,date){
            this.txt = txt;
            this.username = username;
            this.date = date;
            this.write()
            
        }
        write() {newSection(`[${this.username}]:  ` + this.txt);}
    }
    socket.on("msg",(msg) => {
        if(msg.username == user){
            console.log("server recived message");
        }
        else{
            new Msg(msg.txt,msg.username,msg.date)
        }
    })

    
    const form = document.getElementById("form");
    const input =document.getElementById("chatWritting");
    
    input.addEventListener("keydown",(e) => {
        if(e.key == "Enter"&& !e.shiftKey){
            e.preventDefault();
            form.requestSubmit();
        }

    })
    
    form.addEventListener("submit",(e) =>{
        e.preventDefault();
        if(input.value) {
            socket.emit("msg",new Msg(input.value,user, new Date));
            input.value = "";
        }
    })
});