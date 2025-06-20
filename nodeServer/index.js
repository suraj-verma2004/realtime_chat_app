
const io = require("socket.io")(3000, {
    cors: {
        origin: "http://127.0.0.1:5500", // Allow requests from your Live Server
        methods: ["GET", "POST"] // Or specify the methods you allow
    }
});
const users={};

io.on('connection', socket=>{
   socket.on('new-user-joined',uname=>{    //tracks when any new user joined the chat

    console.log("New user",uname);
    users[socket.id]=uname;                //add the new user to the users list

    socket.broadcast.emit('user-joined',uname);       //broadcast the message that the xyz user joined
   });

   socket.on('send',message=>{
    socket.broadcast.emit('receive',{ message :message ,uname: users[socket.id]})       //brodcasting the message sended by any user
   });
   socket.on('disconnect',message=>{               //to specify when any user left the chat
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];                     //delete the user name from users list when left
   });
})
