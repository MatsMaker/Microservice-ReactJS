var React = require('react');

var ContactsList = React.createClass({
  render: function() {
    var createContact = function(contact) {
      return <tr key={contact._id}>
			  <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
			</tr>;
    };
    return <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td><b>First name</b></td>
                <td><b>Last name</b></td>
                <td><b>Email</b></td>
              </tr>
            </thead>
            <tbody>
              {this.props.contacts.map(createContact)}
            </tbody>
		  </table>;
  }
});

module.exports = ContactsList;