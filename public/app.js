const socket = io("http://localhost:3000");

socket.on('message',message => {
    console.log(message);
});

socket.on("message",(data) => {
    console.log(data);

    socket.emit('message','Hello there');
})