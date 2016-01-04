var connectToDbs = function (app, cb) {
  var dbConnected = 0;

  var done = function () {
	dbConnected++;
	if (dbConnected == 2)
	  cb();
  };
  
  app.dbProvide.connect(function (error, results) {
	if (error) {
	  console.error('error conect to database:', error);
	  return false;
	}
	done();
  }.bind(this));

  app.dbService.connect(function (error, results) {
	if (error) {
	  console.error('error conect to database:', error);
	  return false;
	}
	done();
  }.bind(this));

  app.dbContact.connect(function (error, results) {
	if (error) {
	  console.error('error conect to database:', error);
	  return false;
	}
	done();
  }.bind(this));

};

module.exports = connectToDbs;