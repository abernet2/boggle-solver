alert('hey')
var WordForm = React.createClass({
  render: function() {
    return (
      <form>
        <label for="word"></label>
        <input type="text" name='word' /> 
        <input type="submit" />
      </form>
    )
  }
});

module.exports = WordForm;