const {ExpressPeerServer} = require("frontend/js/peer");
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{
    cors: 'http://localhost:5000'
});
const {v4: uuid} = require('uuid');
const peerServer = ExpressPeerServer(server,{
    debug: true
})

app.use('/peerjs',peerServer);

io.on('connection',socket=>{
    socket.on('join-room',(Roomid, Userid)=>{
        socket.join(Roomid);
        socket.to(Roomid).emit('user-connect', Userid);
    })
});

server.listen(3000);