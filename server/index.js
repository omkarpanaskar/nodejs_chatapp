const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const socketio = require('socket.io')
const io = socketio(http);
require('./dbconnection')
const Room = require('./Modules/Room')
const Message = require('./Modules/message')
const { addUser, getUser, removeUser } = require('./helper')
const port = process.env.PORT || 5000

// middleware to handle request and show in specific format  
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(authRoute);
// cors used to communicate with client localhost
app.options('*',cors(corsOptions));
let whitelist =['http://localhost:3000']
var corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
  origin:function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.all(cors(corsOptions))
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'omkar');
  res.cookie('isAuthenticate', true, { httpOnly: true }); // we can set {secure:true, maxAge: 24*60*60*1000} insted of httpOnly
  res.send('cookie is set')
})
app.get('/get-cookie', (req, res, next) => {
  const cookie = req.cookies;
  console.log(cookie);
  res.json(cookie)
})
io.on('connection', (socket) => {
  console.log('user connected');
  // console.log(socket.id);
  Room.find().then(result => {
    socket.emit('output-created', result)
  })
  socket.on("create-room", name => {
    // console.log("room name receive is ", name)
    const room = new Room({ name });
    room.save().then(result => {
      io.emit('room-created', result)

    })
  })
  socket.on('join', ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id
    })
    socket.join(room_id);
    if (error) {
      console.log('join error', error);
    }
    else {
      console.log('join User', user);
    }
  })
  // receive message at server side 
  socket.on('sendMessege', (message, room_id, callback) => {
    const user = getUser(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message
    }
    const msg = new Message(msgToStore);
    msg.save().then(result => {
      io.to(room_id).emit('message', result)
      callback()

    })
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
  })
});

http.listen(port, () => {
  console.log(`Listing on port no ${port}`);
});