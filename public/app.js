const chatForm = document.getElementById();
const socket = io("http://localhost:3000");

socket.on('message',message => {
    console.log(message);
});

chatForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('text',msg);

});