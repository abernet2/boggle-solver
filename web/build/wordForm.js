alert('hey');
var WordForm = React.createClass({
  displayName: "WordForm",

  render: function () {
    return React.createElement(
      "form",
      null,
      React.createElement("label", { "for": "word" }),
      React.createElement("input", { type: "text", name: "word" }),
      React.createElement("input", { type: "submit" })
    );
  }
});

module.exports = WordForm;