var BoggleRow = React.createClass({
  render: function() {
    var row = this.props.row;
    return(
      <tr>
        <td>{row[0].value}</td>
        <td>{row[1].value}</td>
        <td>{row[2].value}</td>
        <td>{row[3].value}</td>
      </tr>
    );
  }
});

var WordForm = React.createClass({
  handleChange: function(event) {
    var word = event.target.value;
    var include = this.props.boggle.include(word);
    if(include) alert('asdas!');
  },
  render: function() {
    return (
      <form>
        <label for="word"></label>
        <input type="text" name='word' onChange={this.handleChange} /> 
        <input type="submit" />
      </form>
    )
  }
});

var BoggleBoard = React.createClass({
  render: function() {
    var r = React.DOM;
    var boggle = this.props.boggle;
    return (
      <div>
      <table id='boggle-board'>
        <tbody>
          <BoggleRow row={boggle.board[0]} />
          <BoggleRow row={boggle.board[1]} />
          <BoggleRow row={boggle.board[2]} />
          <BoggleRow row={boggle.board[3]} />
        </tbody>
      </table>
      <WordForm boggle={boggle} />
      </div>
    );
  }
});