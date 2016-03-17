var React = require('react');
var ReactDOM = require('react-dom');
var BoggleBoard = require('./build/boggleBoard');

console.log(BoggleBoard)
ReactDOM.render(
  <BoggleBoard />,
  document.getElementById('example')
);
