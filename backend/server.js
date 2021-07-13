const {ExpressPeerServer} = require("peer");
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{
    cors: 'http://localhost:5000'
});
const {v1: uuid} = require('uuid');
const cors = require('cors');
const peerServer = ExpressPeerServer(server,{
    debug: true
})
app.use(cors());
app.use('/peerjs',peerServer);

io.on('connection',socket=>{
    socket.on('create-room',new_roomid => {
        socket.join(new_roomid);
    });
    socket.on('join-room', Roomid=>{
        let flag=false;
        socket.adapter.rooms.forEach((index,value)=>{
           if(value === Roomid){
               flag=true;
               console.log(value, value.length);
               console.log('hello');
               socket.join(Roomid);
               console.log(value, value.length);
           }
        });
        console.log(flag);
        socket.emit('error','invalid_id')
        /*if(flag){
            socket.join(Roomid);
            socket.emit('join-allowed','Access Granted');
        }else{
            socket.emit('error','invalid_id')
        }*/
    });
});

server.listen(3000);