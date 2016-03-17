var Boggle = require('./boggle');
var React = require('react');
var ReactDOM = require('react-dom');

var boggle = new Boggle();
boggle.shake();

ReactDOM.render(
  <BoggleBoard boggle={boggle}/>,
  document.getElementById('example')
);
