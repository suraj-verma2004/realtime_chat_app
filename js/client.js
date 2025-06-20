const socket = io('http://localhost:3000');                  //connect my localhost Port to web socket

//getting elements from html page
const form=document.getElementById('send_container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio('beep.mp3');   

const append=(message,position)=>{                            //adding the message in the client side chatbox
      const messageEle=document.createElement('div');
      messageEle.innerText=message;
      messageEle.classList.add('message');
      messageEle.classList.add(position);
      messageContainer.append(messageEle);
      
      if(position=='left'){                                  //used audio to beep when message received
      audio.play();         
}}

const uname =prompt("Enter Your Name to join");
socket.emit('new-user-joined',uname);                         //asking the user name and adding to users list

socket.on('user-joined',uname=>{
      append(`${uname} joined the chat`,'left')               //displays the name of the user when joined  in the left side of other participants
})

form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const message=messageInput.value;
      append(`You: ${message}`,'right');                       //display the message sent by a user in own chatbox in right side 
      socket.emit('send',message);
      messageInput.value="";                                   //empty the input box after sending the essage
})

socket.on('receive',data=>{
      append(`${data.uname}:${data.message}`,'left')           //displays the message of others in left side
})
socket.on('left',name=>{
      append(`${uname} left the chat`,'left')                  //shows the name when someone left the chat
})


