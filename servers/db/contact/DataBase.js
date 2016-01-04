var extend = require('node.extend');


var DataBase = function (settings) {

  this.settings = extend({
	mongoURI: 'mongodb://localhost:27017',
	versionKey: false,
	collection: 'contact'
  }, settings);

  this.mongoose = require('mongoose');
};


DataBase.prototype.connect = function (callback) {
  var settings = this.settings;
  this.db = this.mongoose.createConnection(settings.mongoURI + '/' + settings.collection, function (error, results) {
	if (error)
	  callback(error, null);
	callback(null, results);
  });
};


DataBase.prototype.getUserSchema = function () {
  if (this.UsersSchema)
	return this.UsersSchema;

  var shemaUser = require('./schemas/user');
  this.UsersSchema = new this.mongoose.Schema(shemaUser, {
	versionKey: this.settings.versionKey,
	collection: this.settings.collection
  });

  return this.UsersSchema;
};


DataBase.prototype.getUsersModel = function () {
  if (this.UsersMode)
	return this.UsersMode;

  var userSchema = this.getUserSchema();
  this.UsersModel = this.db.model('user', userSchema);

  return this.UsersModel;
};

module.exports = DataBase;
