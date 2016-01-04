var serviceShema = {
  maxTime: String,
  minTime: String,
  serviceName: {
	type: String,
	validate: {
	  validator: function (value) {
		return (value !== '') ? true : false;
	  },
	  message: '{VALUE} is not a valid name!'
	}
  }
};

module.exports = serviceShema;