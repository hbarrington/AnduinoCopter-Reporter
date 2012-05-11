
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var io = require('socket.io');
var dgram = require('dgram');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


//setup socket.io
//TODO probably move this to a submodule
var user_count = 0;
io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  user_count++;
  io.sockets.emit('user_count', {
    number: user_count
  });
  /*socket.on('metric-data', function(metric, point){
    console.log("testing");
    /*io.sockets.emit(metric, {
      number: point
    });
  });*/
  setInterval(function() {
    return io.sockets.emit('user_count', {
      number: user_count
    });
  }, 1200);
  return socket.on('disconnect', function() {
    user_count--;
    return io.sockets.emit('user_count', {
      number: user_count
    });
  });
});



//setup UDP server for data reception
//receives data on UDP port 1337 and spits it to socket.io
SERVER_HOST = '192.168.233.137';
SERVER_PORT = 1337;

function ts() {
  return Math.round(new Date().getTime() / 1000);
}
var generation = ts();
var sock = null;
var clients = {};
//dependency functions
function processMsg(msg, peer) {
  var str = msg.toString();
  str = str.replace(/[\n\r]/g, ""); 
  //TODO get metric
  if (str.length > 0) {
    return io.sockets.emit('metric-data', {metric: 'taco', data : str });
  }
}

function updateTimeout(key) {
  clients[key] = generation;
}

sock = dgram.createSocket("udp4", function (msg, peer) {
  var key = peer.address + ":" + peer.port;
  updateTimeout(key);
  processMsg(msg, peer);
});

/*sock.on('listening', function() {
  console.log('Bound to '+ SERVER_HOST + ':' + SERVER_PORT);
});*/
sock.bind(SERVER_PORT, SERVER_HOST);




// Routes

app.get('/', routes.index);

app.listen(1337, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
