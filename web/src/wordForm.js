var WordForm = React.createClass({
  handleChange: function(event) {
    var word = event.target.value;
    var include = this.props.boggle.include(word);
    if(include) alert('Change!');
  },
  render: function() {
    return (
      <form>
        <label htmlFor="word"></label>
        <input type="text" name='word' onChange={this.props.onType} /> 
        <input type="submit" />
      </form>
    )
  }
});

module.exports = WordForm;