import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [videos,setvideo] = useState([]);
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(stream => {
            console.log(stream);
            setvideo([...videos,stream]);
            console.log(videos);
        });

    },[])
  return (
    <div className="App">
        {
            videos.map((stream)=>{
                return (
                    <video ref={stream.current} autoPlay />
                )
            })
        }
    </div>
  );
}

export default App;
