var React = require('react');

var conf = require('./conf');
var Io = require('./contacts-io');
var contactIo = new Io(conf);
var ContactsList = require('./contacts-list');

var ContactsApp = React.createClass({
  getInitialState: function() {
	
	contactIo.connect();
	contactIo.isAccessible();
	
	contactIo.on('is accessible',function(isAccessible){
	  this.setState({isAccessible: isAccessible.status});
	  if(isAccessible.status)
		contactIo.getContacts();
	}.bind(this));
	
	contactIo.onChangeContacts(function(contacts) {
		this.setState({contacts: contacts});
	}.bind(this));
	
    contactIo.onAddedContact(function(contact){
      contact = JSON.parse(contact);
      var contacts = this.state.contacts;
      var newComments = contacts.concat([contact]);
      this.setState({contacts: newComments});
    }.bind(this));
	
    return {
	  contacts: [], 
	  firstName: '',
	  lastName: '',
	  email: '',
	  isAccessible: false
	};
  },
  onChangefirstName: function(e) {
    this.setState({
	  firstName: e.target.value
	});
  },
  onChangelastName: function(e) {
    this.setState({
	  lastName: e.target.value
	});
  },
  onChangeEmail: function (e){
	this.setState({
	  email: e.target.value
	});
  },
  handleSubmit: function(e) {
    e.preventDefault();
	
    var newContact = {
		firstName: this.state.firstName,
		lastName: this.state.lastName,
		email: this.state.email, 
		id: Date.now()
	  };
	  
	contactIo.getContacts();
	contactIo.createContact(newContact);
	contactIo.onChangeContacts(function(contacts) {
		this.setState({
		  contacts: contacts,
		  firstName: '',
		  lastName: '',
		  email: ''
		});
	}.bind(this));
  },
  
  render: function() {
	var renderContent,
		renderFormAddNew;
	if (this.state.isAccessible) {
	  renderContent = <div className="panel panel-default">
						<div className="panel-heading">
						  <h3 className="panel-title">Contact list</h3>
						</div>
						<ContactsList contacts={this.state.contacts} />
					  </div>
	  renderFormAddNew = 
						<div className="panel panel-default">
							<div className="panel-heading">
							  <h3 className="panel-title">Add sercice</h3>
							</div>
							<div className="panel-body">
							  <form onSubmit={this.handleSubmit}>
								<div className="form-group">
								  <input onChange={this.onChangefirstName} value={this.state.firstName} placeholder="First name" className="form-control" />
								</div>
								<div className="form-group">
								  <input onChange={this.onChangelastName} value={this.state.lastName} placeholder="Last name" className="form-control" />
								</div>
								<div className="form-group">
								  <input onChange={this.onChangeEmail} value={this.state.email} type="email" placeholder="Email" className="form-control" />
								</div>
								<button className="btn btn-success">
								  {'Add new'}
								</button>
							  </form>
							</div>
						  </div>
	} else {
	  renderContent = <div>Contacts isn't accessible</div>
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
    );
  }
});

module.exports = ContactsApp;