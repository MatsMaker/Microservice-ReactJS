var React = require('react');

var PprovideList = React.createClass({
  render: function() {
	var self = this;
	var renderProvide = function(provide) {
	  var findAttr = function(arr, value){
		var i = 0, leng = arr.length, result;
		for (i = 0; i <= leng; i++){
		  if(arr[i]['_id'] == value){
			result = arr[i];
			i = leng;
		  }
		}
		return result;
	  };
	  
	  var findService = findAttr(self.props.services, provide.idService);
	  var findContact = findAttr(self.props.contacts, provide.idContact);
	  
      return <tr key={provide._id}>
			  <td>{findService.serviceName}</td>
              <td>{findContact.firstName} {findContact.lastName}</td>
			</tr>;
    };
    return <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td><b>Contact</b></td>
                <td><b>Service</b></td>
              </tr>
            </thead>
            <tbody>
			 {this.props.provide.map(renderProvide)}
            </tbody>
		  </table>;
  }
});

module.exports = PprovideList;