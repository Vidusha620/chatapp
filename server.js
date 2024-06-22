const path = require('path');
const http = require('http');
const express = require('express');
const { Socket } = require('socket.io');
const socketio = require(socket.io);

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection',socket => {
    console.log('New WS Connection...');
    
    //Broadcast to one user
    socket.emit('message','Welcome to Chatpool!');
    
    //Broadcast to all users except the one connecting
    socket.broadcast.emit('message','New user has joined to the chat');

    //Broadcast to all the users
    socket.on('disconnect',() => {
        io.emit('message','A user has left the chat')
    });
});



const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port ${PORT}'));


