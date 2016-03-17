var WordForm = React.createClass({
  displayName: "WordForm",

  handleChange: function (event) {
    var word = event.target.value;
    var include = this.props.boggle.include(word);
    if (include) alert('Change!');
  },
  render: function () {
    return React.createElement(
      "form",
      null,
      React.createElement("label", { htmlFor: "word" }),
      React.createElement("input", { type: "text", name: "word", onChange: this.props.onType }),
      React.createElement("input", { type: "submit" })
    );
  }
});

module.exports = WordForm;