var userShema = {
  firstName: String,
  lastName: String,
  email: {
	type: String,
	validate: {
	  validator: function (value) {
		return /\w+@+\w+\.\w{2,5}/i.test(value);
	  },
	  message: '{VALUE} is not a valid email!'
	}
  }
};

module.exports = userShema;