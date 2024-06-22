const path = require('path');
const http = require('http');
const express = require('express');
const { Socket } = require('socket.io');
const socketio = require(socket.io);
const formatMessage = require('./utils/texts');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection',socket => {

    //The admin of the app is Birdie!
    
    //Broadcast to one user
    socket.emit('message', formatMessage('Birdie','Welcome to Chirps!'));
    
    //Broadcast to all users except the one connecting
    socket.broadcast.emit('message',formatMessage('Birdie','New user has joined to the chat...'));

    //Broadcast to all the users
    socket.on('disconnect',() => {
        io.emit('message',formatMessage('Birdie','A user has left the chat...'))
    });

    //Listen to text
    socket.on('chatMessage',(msg) => {
        io.emit('User','msg');
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => CONSOLE.LOG('Server running on port ${PORT}'));

