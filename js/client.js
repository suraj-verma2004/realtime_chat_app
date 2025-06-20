const socket = io('http://localhost:3000');

const form=document.getElementById('send_container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio('beep.mp3');

const append=(message,position)=>{
      const messageEle=document.createElement('div');
      messageEle.innerText=message;
      messageEle.classList.add('message');
      messageEle.classList.add(position);
      messageContainer.append(messageEle);
      if(position=='left'){
      audio.play();
}}

const uname =prompt("Enter Your Name to join");
socket.emit('new-user-joined',uname);

socket.on('user-joined',uname=>{
      append(`${uname} joined the chat`,'left')
})

form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const message=messageInput.value;
      append(`You: ${message}`,'right');
      socket.emit('send',message);
      messageInput.value="";
})




socket.on('receive',data=>{
      append(`${data.uname}:${data.message}`,'left')
})
socket.on('left',name=>{
      append(`${uname} left the chat`,'left')
})


