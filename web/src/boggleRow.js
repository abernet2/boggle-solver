var BoggleRow = React.createClass({
  getInitialState: function() {
    return {
      highlighted: this.props.row[0].highlighted
    }
  },
  render: function() {
    var row = this.props.row;
    return(
      <tr>
        <td className={row.highlighted}>{row[0].value}{row[0].highlighted}</td>
        <td className={row.highlighted}>{row[1].value}{row[1].highlighted}</td>
        <td className={row.highlighted}>{row[2].value}{row[2].highlighted}</td>
        <td className={row.highlighted}>{row[3].value}{row[3].highlighted}</td>
      </tr>
    );
  }
});

module.exports = BoggleRow;