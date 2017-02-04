const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
// const port = 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var fs = require('fs');
var dl = require('delivery');

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log(`\n\nNew User Connected: \n\t(socket.id):${socket.id}`);
  var delivery = dl.listen(socket);
  delivery.on('receive.success', function(file){
    var params = file.params;
    fs.writeFile(file.name, file.buffer, function(err){
      if(err) {
        console.log('FAIL: File could NOT be saved');
      }else{
        console.log('SUCCESS: File SAVED on server');
        socket.emit('image', { image: true, buffer: file.buffer.toString('base64'), params:params});

      }
    });
    // console.log(file);
    // delivery.send({
    //   name: file.name,
    //   path: file.name,
    //   params: {sender: 'SERVER'}
    // });
    fs.readFile(__dirname + file.name, function(err, buf){
    console.log('\n\nPARAMS: box', params);
    // it's possible to embed binary data
    // within arbitrarily-complex objects
    // socket.emit('image', { image: true, buffer: file.buffer.toString('base64'), params:params});
    console.log('image file is initialized');
  });
    // delivery.send({
    //   name: file.name,
    //   path: file.buffer
    // });
    // delivery.on('send.success', function(file){
    //   console.log('File successfully sent BACK to the client');
    // });
  });

  // delivery.on('delivery.connect', function(delivery){
  //
  // });
});




server.listen(port, function(){
  console.log(`Server is up and running on port: ${port}`);
});
