module.exports = function (socket, dbContacts) {
  var self = this;
  self.UsersModel = dbContacts.getUsersModel();
  self.contacts = [];

  socket.on('accessible', function (contacts) {
	self.contacts = self.contacts.concat(contacts);
	socket.emit('is accessible', {status: true});
  });

  socket.on('create contact', function (data) {
	var newUser = new self.UsersModel(data);
	newUser.save(function (error, results) {
	  if (error) {
		console.log('error create contact:', error.message);
		socket.emit('contact added error', error);
		return false;
	  }
	  //socket.emit('get contacts', results.toString());  
      socket.emit('contact added', JSON.stringify(results));
	});
  });

  socket.on('get contacts', function () {
	self.UsersModel.find({}, function (err, contacts) {
	  console.log('received contacts');
	  socket.emit('received contacts', contacts);
	});
  });

};