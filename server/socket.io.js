var clients = {};

exports.connect = function (socket) {
  console.log('connected...', socket.id);
  clients[socket.id] = { socket: socket };
  socket.emit('userMessage', 'hello');
  // socket.emit('setQrcode', 'https://xidong360.com/xuchang-marathon/' + socket.id);
};

exports.setToken = function (token, data) {
  console.log('setToken', data);
  if (token) {
    var client = clients[token];
    if (client) {
      var socket = client.socket;
      if (socket) {
        socket.emit('setToken', data);
      }
    }
  }
};

setInterval(function () {
  for (var i in clients) {
    var client = clients[i];
    if (client.socket.disconnected) {
      delete clients[i];
    }
  }
}, 2000);
