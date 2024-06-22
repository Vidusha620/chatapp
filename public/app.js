const chatForm = document.getElementById('chatForm'); // Corrected ID
const socket = io("http://localhost:3000");

socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get text
    const msg = e.target.elements.msg.value;

    // A message to the server
    socket.emit('text', msg);

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
