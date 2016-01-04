var React = require('react');
var conf = require('./conf');
var Io = require('./services-io');
var servicesIo = new Io(conf);

var ServiceList = require('./sercices-list');

var ServicesApp = React.createClass({
	getInitialState: function(){
	  
	  servicesIo.connect();
	  
	  var requestTypeAutch = 'getAccessible';

	  servicesIo.emit(requestTypeAutch);
	  
	  servicesIo.on('getServices', function(err, response){
		this.setState({
		  services: response
		});
	  }.bind(this));
	  
	  servicesIo.on(requestTypeAutch, function(err, response){
		this.setState({
		  isAccessible: response.status
		});
		if(response.status)
		  servicesIo.emit('getServices');
	  }.bind(this));
	  
	  return {
		isAccessible: false,
		serviceName: '',
		minTime: '',
		maxTime: '',
		services: []
	  }
	},
	onChangeServiceName: function(e){
	  this.setState({
		serviceName: e.target.value
	  });
	},
	onChangeMinTime: function(e){
	  this.setState({
		minTime: e.target.value
	  });
	},
	onChangeMaxTime: function(e){
	  this.setState({
		maxTime: e.target.value
	  });
	},
	handleSubmit: function(e) {
	  e.preventDefault();
	  
	  var requestType = 'postSercive';
	  var newService = {
		serviceName: this.state.serviceName,
		minTime: this.state.minTime,
		maxTime: this.state.maxTime, 
		created: Date.now()
	  };
	  servicesIo.emit(requestType, newService);
	  
	  servicesIo.on(requestType, function(error, services){
		this.setState({
		  services: services,
		  serviceName: '',
		  minTime: '',
		  maxTime: '',
		  created: ''
		});
	  }.bind(this));
	},
    render: function() {
	  var renderContent,
		  renderFormAddNew;
	  if (this.state.isAccessible) {
		renderContent = <div className="panel panel-default">
						  <div className="panel-heading">
							<h3 className="panel-title">Service list</h3>
						  </div>
						  <ServiceList services={this.state.services} />
						</div>
		renderFormAddNew =
						  <div className="panel panel-default">
							<div className="panel-heading">
							  <h3 className="panel-title">Add sercice</h3>
							</div>
							<div className="panel-body">
							  <form onSubmit={this.handleSubmit}>
								<div className="form-group">
								  <input onChange={this.onChangeServiceName} value={this.state.serviceName} placeholder="Service ame" className="form-control" />
								</div>
								<div className="form-group">
								  <input onChange={this.onChangeMinTime} value={this.state.minTime} placeholder="Min time" className="form-control" />
								</div>
								<div className="form-group">
								  <input onChange={this.onChangeMaxTime} value={this.state.maxTime}  placeholder="Max time" className="form-control" />
								</div>
								<button className="btn btn-success">
								  {'Add new'}
								</button>
							  </form>
							</div>
						  </div>
	  } else {
		renderContent = <div>Services isn't accessible</div>
	  };
      return (
			  <div className="col-md-12">
				<div className="row">
				  <div className="col-md-8">
					{renderContent}
				  </div>
				  <div className="col-md-4">
					{renderFormAddNew}
				  </div>
				</div>
			  </div>
      )
    }
});

module.exports = ServicesApp;