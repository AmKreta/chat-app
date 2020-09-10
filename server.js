const express = require('express');  
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3000, () => { 
    console.log('App listening to port 3000');
});

app.use(express.static('public'));

app.get('/', function (req, res) { 
    res.sendFile(__dirname+'/index.html');
});


io.on('connection', socket => { 
    console.log(socket.id + 'is connected');
    socket.on('message_from_client', function (data) { 
        socket.broadcast.emit('message_from_server',data);
    });
})