'use strict';

var App = function (settings) {
  var self = this;

  var socket = require('socket.io');
  var DataBase = require('./../db/contact/DataBase');
  var express = require('express');
  var http = require('http');

  self.conf = settings;
  self.express = express();
  self.server = http.createServer(self.express);

  self.io = socket(self.server);

  self.dbContacts = new DataBase({
    mongoURI: self.conf.db.mongoURI,
    versionKey: self.conf.db.versionKey,
    contacts: self.conf.db.dbName
  });
  
  return self;
};

App.prototype.run = function () {
  var self = this;
  var port = self.conf.server.port;
  
  this.server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });

  self.dbContacts.connect(function (error, results) {
    if (error) {
      console.error('error conect to database:', error);
      return false;
    }

    self.io.on('connection', function (socket) {
      var routesSocket = require('./routes/socket');
      routesSocket(socket, self.dbContacts);
    });

  });
};

module.exports = App;

