async = require("async");

module.exports = function (socket, app) {
  var self = this;
  self.contacts = [];
  self.ServiceModel = app.dbService.getServiceModel();
  self.ProvideModel = app.dbProvide.getProvideModel();
  self.UsersModel = app.dbContact.getUsersModel();
  
  self.routerRequest = function (request, callback) {
	var response = 'no valid request';
	switch (request.type) {
	  case 'getAccessible':
		callback(null, {
		  type: request.type,
		  response: {
			status: true
		  }
		});
		break;
	  case 'getStartData':
		async.parallel({
		  contacts: function (cb) {
			self.UsersModel.find({}, function (err, contacts) {
			  cb(err, contacts);
			});
		  },
		  services: function (cb) {
			self.ServiceModel.find({}, function (error, services) {
			  cb(error, services);
			});
		  },
		  provides: function (cb) {
			self.ProvideModel.find({}, function (error, provides) {
			  cb(error, provides);
			});
		  }
		}, function (error, results) {
		  callback(error, {
			type: 'getStartData',
			response: results
		  });
		});
		break;
	  case 'postProvide':
		var newProvide = new self.ProvideModel(request.data);
		newProvide.save(function (error, results) {
		  if (error)
			console.log('error create sercive:', error.message);
		  self.ProvideModel.find({}, function (error, services) {
			callback(error, {
			  type: 'postProvide',
			  response: services
			});
		  });
		});
		break;
	  default :
	  {
		callback(response, null);
	  }
	}
  };
  socket.on('request', function (request) {
	var response = routerRequest(request, function (error, response) {
	  var result = {
		error: null,
		response: null
	  };
	  if (error) {
		console.error(error);
		result.error = error;
		result.response = null;
	  } else {
		result.error = null;
		result = response;
	  }

	  socket.emit('response', result);
	});
  });
};