import { useRef, useState } from "react";

export default function Stream () {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying,setIsVideoPlaying] = useState(false);
    async function startRecording(){
        const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        
        if(videoRef.current){
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsVideoPlaying(true)
        }


    }
    
    
    
    return <div>
        hi. i am from streamyard.
        <button onClick={startRecording}>Start Recording.</button>
        <video ref={videoRef} muted autoPlay playsInline></video>
        {isVideoPlaying && <button>Start Streaming....</button>}
    </div>
}