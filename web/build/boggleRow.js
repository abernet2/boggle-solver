var BoggleRow = React.createClass({
  displayName: "BoggleRow",

  getInitialState: function () {
    return {
      highlighted: this.props.row[0].highlighted
    };
  },
  render: function () {
    var row = this.props.row;
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        { className: row.highlighted },
        row[0].value,
        row[0].highlighted
      ),
      React.createElement(
        "td",
        { className: row.highlighted },
        row[1].value,
        row[1].highlighted
      ),
      React.createElement(
        "td",
        { className: row.highlighted },
        row[2].value,
        row[2].highlighted
      ),
      React.createElement(
        "td",
        { className: row.highlighted },
        row[3].value,
        row[3].highlighted
      )
    );
  }
});

module.exports = BoggleRow;