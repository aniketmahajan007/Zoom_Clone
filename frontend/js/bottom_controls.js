//Mute Unmute Control
document.getElementById("mute_control").addEventListener("click",()=>{
    if(audio_option){
        audio_option = false;
        MyvideoStream.getAudioTracks()[0].enabled = audio_option;
        document.getElementById("mute_control").innerHTML = `<i class="fas fa-microphone-slash"></i><span>Unmute</span>`;
    }else{
        audio_option = true;
        MyvideoStream.getAudioTracks()[0].enabled = audio_option;
        document.getElementById("mute_control").innerHTML = `<i class="fas fa-microphone"></i><span>Mute</span>`;
    }
});
// Show Video Disabled Video
document.getElementById("video_control").addEventListener("click",()=>{
    if(video_option){
        video_option=false;
        MyvideoStream.getVideoTracks()[0].enabled = video_option;
        document.getElementById("video_control").innerHTML = `<i class="fas fa-video-slash"></i><span>Show Video</span>`;
    }else{
        //<i class="fas fa-video"></i>
        video_option=true;
        MyvideoStream.getVideoTracks()[0].enabled = video_option;
        document.getElementById("video_control").innerHTML = `<i class="fas fa-video"></i><span>Hide Video</span>`;
    }
});
// Leave Room
document.getElementById("leave_room_control").addEventListener("click",()=>{
    document.getElementById("meeting_view").style.display = "none";
    document.getElementById("welcome_view").style.display = "block";
    document.getElementById("current_roomid").innerText = "Null";
    document.getElementById("app_title_nav").style.top = "20px";
    document.getElementById("app_title").style.color = "black";
    document.getElementById("video-grid").innerHTML = "";
    MyvideoStream.getTracks().forEach(function(track) {
        if (track.readyState === 'live') {
            track.stop();
        }
    });

});