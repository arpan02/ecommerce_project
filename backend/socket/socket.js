const uid = require('uniqid');
const mongoose = require('mongoose');
const connectSocket = require('socket.io');
const Category = require('../models/Category');
const product = require('../models/Product');
let counter = 0;

module.exports.Socket = function(socketServer) {
  const io = connectSocket(socketServer);

  io.sockets.on('connection', function(socket) {
    console.log('connected to socket-o--------------');
    socket.on('delete', async data => {
      await product.findOne({ _id: data._id }, { name: 1 });
      // await product.findByIdAndDelete(data._id);
      console.log(counter++);
    });
    socket.on('search', async data => {
      const roomId = uid();
      socket.join(roomId);
      const searchData = await Category.find({
        $text: { $search: data.text }
      }).limit(10);
      io.in(roomId).emit('searchData', searchData);
      socket.leave(roomId);
    });
  });
};
