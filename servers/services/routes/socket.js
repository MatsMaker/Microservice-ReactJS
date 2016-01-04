module.exports = function (socket, dbServices) {
  var self = this;
  self.contacts = [];
  self.serviceModel = dbServices.getServiceModel();

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
	  case 'getServices':
		self.serviceModel.find({}, function (error, services) {
		  callback(error, {
			type: 'getServices',
			response: services
		  });
		});
		break;
	  case 'postSercive':
		var newService = new self.serviceModel(request.data);
		newService.save(function (error, results) {
		  if (error)
			console.log('error create sercive:', error.message);
		  self.serviceModel.find({}, function (error, services) {
			callback(error, {
			  type: 'postSercive',
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