const express = require('express');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('User connected!')

  socket.on('move', function( board ){
    io.emit('move', board )
  })

  socket.on('invite', function( invite ){
    io.emit('invite', invite )
  })

  socket.on('acceptedInvite', function( invite ){
    io.emit('acceptedInvite', invite )
  })
})

const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
})
