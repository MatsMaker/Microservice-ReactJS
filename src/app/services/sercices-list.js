var React = require('react');

var ServiceList = React.createClass({
  render: function() {
    var createService = function(service) {
      return <tr key={service._id}>
			  <td>{service.serviceName}</td>
              <td>{service.minTime}</td>
              <td>{service.maxTime}</td>
			</tr>;
    };
    return <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td><b>Service name</b></td>
                <td><b>Min time</b></td>
                <td><b>Max time</b></td>
              </tr>
            </thead>
            <tbody>
              {this.props.services.map(createService)}
            </tbody>
		  </table>;
  }
});

module.exports = ServiceList;