'use strict';

var App = function (settings) {
  var self = this;

  var socket = require('socket.io');

  var ContactDataBase = require('./../db/contact/DataBase');
  var ServiceDataBase = require('./../db/service/DataBase');
  var ProvideDataBase = require('./../db/provide/DataBase');

  var express = require('express');
  var http = require('http');

  self.conf = settings;
  self.express = express();
  self.server = http.createServer(self.express);

  self.io = socket(self.server);

  self.dbService = new ServiceDataBase({
	mongoURI: self.conf.dbs.service.mongoURI,
	versionKey: self.conf.dbs.service.versionKey,
	collection: self.conf.dbs.service.service
  });

  self.dbContact = new ContactDataBase({
	mongoURI: self.conf.dbs.contact.mongoURI,
	versionKey: self.conf.dbs.contact.versionKey,
	collection: self.conf.dbs.contact.contact
  });
  
  self.dbProvide = new ProvideDataBase({
	mongoURI: self.conf.dbs.provide.mongoURI,
	versionKey: self.conf.dbs.provide.versionKey,
	collection: self.conf.dbs.provide.contact
  });

  return self;
};

App.prototype.run = function () {
  var self = this;
  var port = self.conf.server.port;
  
  this.server.listen(port, function () {
	console.log('Server listening at port %d', port);
  });
  
  var connectToDbs = require('./connectToDbs');
  
  connectToDbs(this, function () {
	self.io.on('connection', function (socket) {
	  var routesSocket = require('./routes/socket');
	  routesSocket(socket, self);
	});
  });
};

module.exports = App;

