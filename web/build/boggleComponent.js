var BoggleRow = React.createClass({
  displayName: "BoggleRow",

  render: function () {
    var row = this.props.row;
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        row[0].value
      ),
      React.createElement(
        "td",
        null,
        row[1].value
      ),
      React.createElement(
        "td",
        null,
        row[2].value
      ),
      React.createElement(
        "td",
        null,
        row[3].value
      )
    );
  }
});

var WordForm = React.createClass({
  displayName: "WordForm",

  handleChange: function (event) {
    var word = event.target.value;
    var include = this.props.boggle.include(word);
    if (include) alert('asdas!');
  },
  render: function () {
    return React.createElement(
      "form",
      null,
      React.createElement("label", { "for": "word" }),
      React.createElement("input", { type: "text", name: "word", onChange: this.handleChange }),
      React.createElement("input", { type: "submit" })
    );
  }
});

var BoggleBoard = React.createClass({
  displayName: "BoggleBoard",

  render: function () {
    var r = React.DOM;
    var boggle = this.props.boggle;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "table",
        { id: "boggle-board" },
        React.createElement(
          "tbody",
          null,
          React.createElement(BoggleRow, { row: boggle.board[0] }),
          React.createElement(BoggleRow, { row: boggle.board[1] }),
          React.createElement(BoggleRow, { row: boggle.board[2] }),
          React.createElement(BoggleRow, { row: boggle.board[3] })
        )
      ),
      React.createElement(WordForm, { boggle: boggle })
    );
  }
});