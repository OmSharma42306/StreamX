import { WebSocket,WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080});

wss.on('connection',function connect(ws){
    ws.on('error',console.error);

    ws.on('message',function message(data:string){
        const message = JSON.parse(data);
        if(message.type === "hi"){
            ws.send("hello")
        }else if(message.type === 'binaryStream'){
            console.log("Binary Stream Comming....")
        }

    })

    ws.send("i am connected!")



})