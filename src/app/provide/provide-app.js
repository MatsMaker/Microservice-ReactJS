var React = require('react');
var conf = require('./conf');
var Io = require('./provide-io');
var provideIo = new Io(conf);

var ProvideList = require('./provide-list');

var ProvideApp = React.createClass({
	getInitialState: function(){
	  
	  provideIo.connect();
	  var requestTypeAutch = 'getAccessible';
	  provideIo.emit(requestTypeAutch);
	  
	  provideIo.on('getStartData', function(err, response){
		this.setState(response);
	  }.bind(this));
	  
	  provideIo.on(requestTypeAutch, function(err, response){
		this.setState({
		  isAccessible: response.status
		});
		if(response.status)
		  provideIo.emit('getStartData');
	  }.bind(this));
	  
	  return {
		isAccessible: false,
		formServiceId: '',
		formContactId: '',
		provides: [],
		services: [],
		contacts: []
	  }
	},
	onChangeService: function(e) {
	  this.setState({
		formServiceId: e.target.value
	  });
	},
	onChangeContact: function(e) {
	  this.setState({
		formContactId: e.target.value
	  });
	},
	handleSubmit: function(e) {
	  e.preventDefault();
	  
	  var requestType = 'postProvide';
	  var newPrivice = {
		idService: this.state.formServiceId,
		idContact: this.state.formContactId
	  };
	  provideIo.emit(requestType, newPrivice);
	  
	  provideIo.on(requestType, function(error, provides){
		this.setState({
		  provides: provides,
		  formServiceId: '',
		  formContactId: ''
		});
		
	  }.bind(this));
	},
    render: function() {
	  var renderContent,
		  renderFormAddNew;
  
	  var makeOptSercice = service => {
		return <option key={service._id} value={service._id}>{service.serviceName}</option>
	  };
	  
	  var makeOptContact = contact => {
		return <option key={contact._id} value={contact._id}>{contact.firstName} {contact.lastName}</option>
	  };
	  
	  if (this.state.isAccessible) {
		renderContent = <div className="panel panel-default">
						  <div className="panel-heading">
							<h3 className="panel-title">Provide list</h3>
						  </div>
						  <ProvideList provide={this.state.provides} services={this.state.services} contacts={this.state.contacts}/>
						</div>
		renderFormAddNew =
						  <div className="panel panel-default">
							<div className="panel-heading">
							  <h3 className="panel-title">Add provide</h3>
							</div>
							<div className="panel-body">
							  <form onSubmit={this.handleSubmit}>
								<div className="form-group">
								  <select className="form-control" onChange={this.onChangeService}>
									<option>Сhoose sercice</option>
									{this.state.services.map(makeOptSercice)}
								  </select>
								</div>
								<div className="form-group">
								  <select className="form-control" onChange={this.onChangeContact}>
									<option>Choose contact</option>
									{this.state.contacts.map(makeOptContact)}
								  </select>
								</div>
								<button className="btn btn-success">
								  {'Add new'}
								</button>
							  </form>
							</div>
						  </div>
	  } else {
		renderContent = <div>Provide isn't accessible</div>
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

module.exports = ProvideApp;