var io = require('socket.io-client');
//var extend = require('node.extend');

var Io = function (conf) {
  var self = this;
  self.conf = conf;
};


Io.prototype.connect = function () {
  this.socket = io(this.conf.socketUrl);
  return this;
};


Io.prototype.on = function (event, callback) {
  var self = this;
//  this._beforeOn(event);
  if (this[event]) {
	this[event].push(callback);
  } else {
	this[event] = [callback];
  }

  this.socket.on('response', function (response) {
	var error = null,
			result = null;

	if ('error' in response)
	  error = response.error;
	if ('response' in response)
	  result = response.response;

	if (self[response.type])
	  self[response.type].map(function (fn) {
		fn(error, result);
	  });
  });
};


Io.prototype.emit = function (event, data, callback) {
  var self = this;
  var request = {
	type: event,
	data: data
  };
  this.socket.emit('request', request);
//  this.socket.on('response', function (response) {
//	var error = null,
//			result = null;
//	if ('error' in response)
//	  error = response.error;
//	if ('response' in response)
//	  result = response.response;
//
//	self.on(response.type, function (error, response) {
//	  callback(error, response);
//	});
//  });
};


Io.prototype._beforeOn = function (event) {

};


module.exports = Io;