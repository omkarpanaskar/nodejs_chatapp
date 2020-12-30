const app = require('express')();
const http = require('http').createServer(app);
const socketio=require('socket.io')
const io = socketio(http);
const mongoDb=require('./dbconnection')
const Room=require('./Modules/Room')
const Message=require('./Modules/message')
const {addUser,getUser,removeUser}=require('./helper')
const port=process.env.PORT || 5000

io.on('connection', (socket) => {
  console.log('user connected');
  // console.log(socket.id);
  Room.find().then(result=>{
    socket.emit('output-created',result)
  })
  socket.on("create-room",name=>{
    // console.log("room name receive is ", name)
    const room=new Room({name});
    room.save().then(result=>{
      io.emit('room-created',result)
      
    })
  })
  socket.on('join',({name,room_id,user_id})=>{
    const {error,user}= addUser({
      socket_id:socket.id,   
      name,
      room_id,
      user_id
    })
    socket.join(room_id);
    if(error){
      console.log('join error',error);
    }
    else{
      console.log('join User',user) ;
    }
  })
  // receive message at server side 
  socket.on('sendMessege',(message,room_id,callback)=>{
    const user=getUser(socket.id);
    const msgToStore={
      name:user.name,
      user_id:user.user_id,
      room_id,
      text:message
    }
    const msg=new Message(msgToStore);
    msg.save().then(result=>{
      io.to(room_id).emit('message',result)
      callback()

    })
  })
  socket.on('disconnect',()=>{
    const user=removeUser(socket.id)
  })
});

http.listen(port, () => {
  console.log(`Listing on port no ${port}`);
});