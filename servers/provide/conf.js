"use strict";

exports.server = {
  port: 8095
};

exports.dbs = {
  service: {
	mongoURI: 'mongodb://localhost:27017',
	versionKey: false,
	service: 'service'
  },
  contact: {
	mongoURI: 'mongodb://localhost:27017',
	versionKey: false,
	contact: 'contact'
  },
  provide: {
	mongoURI: 'mongodb://localhost:27017',
	versionKey: false,
	contact: 'provide'
  }
};