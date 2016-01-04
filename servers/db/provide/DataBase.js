var extend = require('node.extend');


var DataBase = function (settings) {

  this.settings = extend({
	mongoURI: 'mongodb://localhost:27017',
	versionKey: false,
	collection: 'provide'
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


DataBase.prototype.getProvideSchema = function () {
  if (this.ProvideSchema)
	return this.ProvideSchema;

  var shemaService = require('./schemas/provide');
  this.ProvideSchema = new this.mongoose.Schema(shemaService, {
	versionKey: this.settings.versionKey,
	collection: this.settings.collection
  });

  return this.ProvideSchema;
};


DataBase.prototype.getProvideModel = function () {
  if (this.ProvideModel)
	return this.ProvideModel;

  var provideSchema = this.getProvideSchema();
  this.ProvideModel = this.db.model('provide', provideSchema);

  return this.ProvideModel;
};


module.exports = DataBase;
