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
  this._beforeOn(event);
  this.socket.on(event, callback);
};


Io.prototype.emit = function (event, data) {
  this.socket.emit(event, data);
};


Io.prototype._beforeOn = function (event) {

};


Io.prototype.onIsAccessible = function (callback) {
  this.socket.on('is accessible', callback);
};


Io.prototype.isAccessible = function () {
  this.socket.emit('accessible');
};


Io.prototype.onAddedContact = function (callback) {
  this.socket.on('contact added', callback);
};


Io.prototype.createContact = function (contact) {
  this.socket.emit('create contact', contact);
};


Io.prototype.onChangeContacts = function (callback) {
  this.socket.on('received contacts', callback);
};


Io.prototype.getContacts = function () {
  this.socket.emit('get contacts');
};


module.exports = Io;