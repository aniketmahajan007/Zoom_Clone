function gui_newroom(){
    return new Promise((resolve,reject) => {
        // Accessing Camera, Audio and Streaming
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then((res)=>{
            document.getElementById("meeting_view").style.display = "block";
            document.getElementById("welcome_view").style.display = "none";
            document.getElementById("current_roomid").innerText = roomid;
            document.getElementById("app_title_nav").style.top = "0px";
            document.getElementById("app_title").style.color = "white";
            audio_option=true;
            video_option=true;
            MyvideoStream = res;
            let newvideo= document.createElement('video');
            addnewvideo_window(newvideo, MyvideoStream);
            resolve('success');
        }).catch(e => {
            reject('Permission Denied');
            alert('Permission denied');
        });
    });
}
function setname(){
    while (username === null){
        username = prompt("Enter your name");
        if(username.length< 3){
            username=null;
            alert("Name should be at least 3 letter")
        }
    }
}
document.getElementById("create_room").addEventListener("click",()=>{
    //peer
    roomid = peer.id;
    setname();
    socket.emit('create-room', roomid, username);
    gui_newroom();
    // Answering call peer
    peer.on('call',call => {
        call.answer(MyvideoStream);
        const video = document.createElement("video");
        call.on('stream', RemoteVideStream => {
            addnewvideo_window(video,RemoteVideStream)
        });
    },(e)=>{
        console.log('Answer '+e);
    });
});
document.getElementById("join_room").addEventListener("click",()=>{
    setname();
    roomid = prompt("Enter Room id");
    if(roomid === null || roomid.length< 15){roomid=""}else{
        // Change View
        socket.emit('join-room', roomid);
    }
});
// Socket Error Handler
socket.on('error',msg =>{
    if(msg === "invalid_id"){
        alert('Room not available or already fill.')
    }
});
// Allowed to join
socket.on('join-allowed',room_creater => {
    socket_peerid = room_creater;
    gui_newroom().
    then(()=>{
        const call = peer.call(roomid,MyvideoStream);
        const remote_video= document.createElement('video');
        call.on('stream',RemoteVideoStream => {
            addnewvideo_window(remote_video,RemoteVideoStream);
        });
        socket.emit('server-msg',roomid, username, "has joined your room");
    }).catch(e => {
        console.log('Reject '+e);
    });
});
// Join user id update
socket.on('join-user-id',UserId => {
    socket_peerid = UserId;
});
socket.on('user-leave-broadcast',UserId => {
    if(UserId === socket_peerid){
        let element = document.getElementById("video-grid");
        element.removeChild(element.lastChild);
        alert('Caller just leave the room');
    }
});
socket.on('client-msg',(msg) => {
    let append_msg = document.createElement("li");
    append_msg.appendChild(document.createTextNode(msg));
    document.getElementById("chat_msg_display").appendChild(append_msg)
});