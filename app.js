
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var io = require('socket.io');

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
//TODO probably move this to a submodule and add data from UDP reporting
var user_count = 0;
io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  user_count++;
  io.sockets.emit('user_count', {
    number: user_count
  });
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


// Routes

app.get('/', routes.index);

app.listen(1337, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
