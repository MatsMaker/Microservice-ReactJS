'use strict';

var conf = require('./conf');
var App = require('./server');

var app = new App(conf);

app.run();