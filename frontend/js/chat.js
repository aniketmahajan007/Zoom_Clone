document.getElementById("user_type_msg").addEventListener("keypress",(e)=>{
    if(e.charCode === 13){
        const msg_value =document.getElementById("user_type_msg").value;
        if(msg_value.length < 1){
            alert('Empty msg not allowed');
            return;
        }
        let append_msg = document.createElement("li");
        append_msg.appendChild(document.createTextNode(`${username}: ${msg_value}`));
        document.getElementById("chat_msg_display").appendChild(append_msg)
        socket.emit('server-msg',roomid, username, msg_value);
        document.getElementById("user_type_msg").value = "";
        scrollbottom();
    }
})