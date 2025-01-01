import { useEffect, useRef, useState } from "react";

export default function Stream () {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying,setIsVideoPlaying] = useState(false);
    const [socket,setSocket] = useState<WebSocket|any>(null);
    const [stream,setStream] = useState<MediaStream | any>(null);
    const [mediaRecorder,setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks,setRecordedChunks] = useState<Blob[]>([]);
    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080')
        socket.onopen = () =>{
            console.log("connected!")
        }
        setSocket(socket);
    },[])
    

    async function startRecording(){
        const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        if(videoRef.current){

            videoRef.current.srcObject = stream;
            setStream(stream)
            videoRef.current.play();
            
            setIsVideoPlaying(true)
        }

        


    }
    function stopRecording(){
        mediaRecorder?.stop();
        setIsVideoPlaying(false);
    }
    function startStreaming(){
        // initialize mediarecorder for stream.
        if(!socket) return;
        console.log("i am in")
        const recorder = new MediaRecorder(stream,{"mimeType":"video/webm"});
        // const chunks : Blob[] = [];
        recorder.ondataavailable = (event) =>{
            console.log("binary stream avilable",event.data)
            socket?.send(event.data); // send a raw binary data
        }

        recorder.start(25);
        setMediaRecorder(recorder)

    }

    return <div>
        hi. i am from streamyard.
        <button onClick={startRecording}>Start Recording.</button>
        <video ref={videoRef} muted autoPlay playsInline></video>
        {isVideoPlaying && <button onClick={startStreaming}>Start Streaming....</button>}
    </div>
}