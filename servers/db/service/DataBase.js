var extend = require('node.extend');


var DataBase = function (settings) {

  this.settings = extend({
	mongoURI: 'mongodb://localhost:27017',
	versionKey: false,
	collection: 'service'
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


DataBase.prototype.getServiceSchema = function () {
  if (this.UsersSchema)
	return this.UsersSchema;

  var shemaService = require('./schemas/services');
  this.UsersSchema = new this.mongoose.Schema(shemaService, {
	versionKey: this.settings.versionKey,
	collection: this.settings.collection
  });

  return this.UsersSchema;
};


DataBase.prototype.getServiceModel = function () {
  if (this.ServiceModel)
	return this.ServiceModel;

  var serviceSchema = this.getServiceSchema();
  this.ServiceModel = this.db.model('service', serviceSchema);

  return this.ServiceModel;
};


module.exports = DataBase;
