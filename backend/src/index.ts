import { WebSocket,WebSocketServer } from "ws";
import {spawn} from "child_process"
const wss = new WebSocketServer({port:8080});

const options = [
    '-i',
    '-',
    '-c:v','libx264',
    '-preset','ultrafast',
    '-tune','zerolatency',
    '-r',`${25}`,
    '-g',`${25 * 2}`,
    '-keyint_min','25',
    '-crf','25',
    '-pix_fmt','yuv420p',
    '-sc_threshold','0',
    '-profile:v','main',
    '-level','3.1',
    '-c:a','aac',
    '-b:a','128k',
    '-ar',(128000/4).toString(),
    '-f','flv',
    `rtmp://a.rtmp.youtube.com/live2/pa25-7exq-usfw-2udw-4usg`,
]

const ffmpegProcess = spawn('ffmpeg',options);
ffmpegProcess.stderr.on('data',(data)=>{
    console.error(`FFMPEG stderr : ${data}`);
});
ffmpegProcess.on('close',(code)=>{
    console.log(`FFMPEG exited with code ${code}`);
})

wss.on('connection',function connect(ws){
    ws.on('error',console.error);

    ws.on('message',function message(data:any){
        if(data instanceof Buffer){
            console.log("Received Binary Data...")
            ffmpegProcess.stdin.write(data);
        }else{
            console.log("Non-Binary Data Received")
        }

    })

    ws.send("i am connected!")



})