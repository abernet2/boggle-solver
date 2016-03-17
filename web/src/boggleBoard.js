var WordForm = require('./wordForm');
var BoggleRow = require('./boggleRow');
var Boggle = require('../boggle');

var BoggleBoard = React.createClass({
  highlight: function(event) {
    var word = event.target.value;
    this.state.boggle.highlightWord(word);
    this.setState({boggle: this.state.boggle})
  },
  checkWord: function(event) {
    event.preventDefault();
    console.log('check');
  },
  getInitialState: function() {
    var boggle = new Boggle();
    boggle.shake();
    return {boggle};
  },
  render: function() {
    var r = React.DOM;
    var boggle = this.state.boggle;
    var highlighted = {backgroundColor: 'red'}
    return (
      <div>
      <table id='boggle-board'>
        <tbody>
          <tr>
            <td style={boggle.cell(0).highlighted ? highlighted : null}>{boggle.cell(0).value}</td>
            <td style={boggle.cell(1).highlighted ? highlighted : null}>{boggle.cell(1).value}</td>
            <td style={boggle.cell(2).highlighted ? highlighted : null}>{boggle.cell(2).value}</td>
            <td style={boggle.cell(3).highlighted ? highlighted : null}>{boggle.cell(3).value}</td>
          </tr>
          <tr>
            <td style={boggle.cell(4).highlighted ? highlighted : null}>{boggle.cell(4).value}</td>
            <td style={boggle.cell(5).highlighted ? highlighted : null}>{boggle.cell(5).value}</td>
            <td style={boggle.cell(6).highlighted ? highlighted : null}>{boggle.cell(6).value}</td>
            <td style={boggle.cell(7).highlighted ? highlighted : null}>{boggle.cell(7).value}</td>
          </tr>
          <tr>
            <td style={boggle.cell(8).highlighted ? highlighted : null}>{boggle.cell(8).value}</td>
            <td style={boggle.cell(9).highlighted ? highlighted : null}>{boggle.cell(9).value}</td>
            <td style={boggle.cell(10).highlighted ? highlighted : null}>{boggle.cell(10).value}</td>
            <td style={boggle.cell(11).highlighted ? highlighted : null}>{boggle.cell(11).value}</td>
          </tr>
          <tr>
            <td style={boggle.cell(12).highlighted ? highlighted : null}>{boggle.cell(12).value}</td>
            <td style={boggle.cell(13).highlighted ? highlighted : null}>{boggle.cell(13).value}</td>
            <td style={boggle.cell(14).highlighted ? highlighted : null}>{boggle.cell(14).value}</td>
            <td style={boggle.cell(15).highlighted ? highlighted : null}>{boggle.cell(15).value}</td>
          </tr>
        </tbody>
      </table>
      <WordForm 
        boggle={boggle}
        onType={this.highlight}
        onSubmit={this.checkWord}
      />
      </div>
    );
  }
});

console.log(BoggleBoard)
module.exports = BoggleBoard;