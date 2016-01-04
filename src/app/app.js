var React = require('react');

var ContactsApp = require('./contacts/contacts-app');
var ServicesApp = require('./services/services-app');
var ProvideApp = require('./provide/provide-app');

var App = React.createClass({
    render: function() {
      return (
              <div className="container bs-docs-container">
                <div className="row">
				  <ContactsApp />
                  <ServicesApp />
				  <ProvideApp />
                </div>
              </div>
      )
    }
});

module.exports = App;