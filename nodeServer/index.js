
const io = require("socket.io")(3000, {
    cors: {
        origin: "http://127.0.0.1:5500", // Allow requests from your Live Server
        methods: ["GET", "POST"] // Or specify the methods you allow
    }
});
const users={};

io.on('connection', socket=>{
   socket.on('new-user-joined',uname=>{

    console.log("New user",uname);
    users[socket.id]=uname;

    socket.broadcast.emit('user-joined',uname);
   });

   socket.on('send',message=>{
    socket.broadcast.emit('receive',{ message :message ,uname: users[socket.id]})
   });
   socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
   });
})
