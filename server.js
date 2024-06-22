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
    console.log('New WS Connection...');
    
    //Broadcast to one user
    socket.emit('message', formatMessage('Chatpool','Welcome to Chatpool!'));
    
    //Broadcast to all users except the one connecting
    socket.broadcast.emit('message',formatMessage('Chatpool','New user has joined to the chat'));

    //Broadcast to all the users
    socket.on('disconnect',() => {
        io.emit('message',formatMessage('Chatpool','A user has left the chat'))
    });

    //Listen to text
    socket.on('chatMessage',(msg) => {
        io.emit('User','msg');
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => CONSOLE.LOG('sERVER RUNNING ON PORT ${PORT}'));

