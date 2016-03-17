var WordForm = require('./wordForm');
var BoggleRow = require('./boggleRow');
var Boggle = require('../boggle');

var BoggleBoard = React.createClass({
  displayName: 'BoggleBoard',

  highlight: function (event) {
    var word = event.target.value;
    this.state.boggle.highlightWord(word);
    this.setState({ boggle: this.state.boggle });
  },
  checkWord: function () {
    console.log('check');
  },
  getInitialState: function () {
    var boggle = new Boggle();
    boggle.shake();
    return { boggle };
  },
  render: function () {
    var r = React.DOM;
    var boggle = this.state.boggle;
    var highlighted = { backgroundColor: 'red' };
    return React.createElement(
      'div',
      null,
      React.createElement(
        'table',
        { id: 'boggle-board' },
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { style: boggle.cell(0).highlighted ? highlighted : null },
              boggle.cell(0).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(1).highlighted ? highlighted : null },
              boggle.cell(1).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(2).highlighted ? highlighted : null },
              boggle.cell(2).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(3).highlighted ? highlighted : null },
              boggle.cell(3).value
            )
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { style: boggle.cell(4).highlighted ? highlighted : null },
              boggle.cell(4).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(5).highlighted ? highlighted : null },
              boggle.cell(5).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(6).highlighted ? highlighted : null },
              boggle.cell(6).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(7).highlighted ? highlighted : null },
              boggle.cell(7).value
            )
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { style: boggle.cell(8).highlighted ? highlighted : null },
              boggle.cell(8).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(9).highlighted ? highlighted : null },
              boggle.cell(9).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(10).highlighted ? highlighted : null },
              boggle.cell(10).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(11).highlighted ? highlighted : null },
              boggle.cell(11).value
            )
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { style: boggle.cell(12).highlighted ? highlighted : null },
              boggle.cell(12).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(13).highlighted ? highlighted : null },
              boggle.cell(13).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(14).highlighted ? highlighted : null },
              boggle.cell(14).value
            ),
            React.createElement(
              'td',
              { style: boggle.cell(15).highlighted ? highlighted : null },
              boggle.cell(15).value
            )
          )
        )
      ),
      React.createElement(WordForm, {
        boggle: boggle,
        onType: this.highlight,
        onSubmit: this.checkWord
      })
    );
  }
});

console.log(BoggleBoard);
module.exports = BoggleBoard;