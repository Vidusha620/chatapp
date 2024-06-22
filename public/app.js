const chatForm = document.getElementById('chatForm'); 
const socket = io.connect('http://localhost:3001');

socket.on('message', (message) => { 
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get text
    const msg = e.target.elements.msg.value;

    // A text to the server
    socket.emit('message', msg);

    //Clear text
    e.target.elements.msg.value = '';

});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${message.username}<span>${message.time}</span></p>
        <p class="text">${message.text}</p>`; 
    document.querySelector('.chat-messages').appendChild(div); 
}
