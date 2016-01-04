var React = require('react');
var ReactDOM = require('react-dom');
// not using an ES6 transpiler
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('history').History;

var App = require('./app');

ReactDOM.render(
		<Router history={browserHistory}>
		  <Route path="/" component={App}>
			<Route path="/:activeModule" component={App} />
		  </Route>
		</Router>,
		document.getElementById('container')
);