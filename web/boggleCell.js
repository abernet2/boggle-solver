function Cell(row, col, value, board) {
  this.row = row,
  this.col = col,
  this.value = value,
  this.board = board
}

Cell.prototype.find = function(word, visited=new Set(), wordIndex=0) {
  if(visited.has(this)) return null;
  word = word.toUpperCase();
  var die = this.value;
  var letter = word[wordIndex];
  
  if(wordIndex === word.length - 1) {
    if(die !== letter) return null;
    visited.add(this);
    return visited;
  }

  if(die === letter) {
    visited.add(this);
    var neighbors = this.getNeighbors(this.row, this.col);
    var pass = neighbors.some(function(cell, index) { 
      return cell.find(word, visited, wordIndex + 1)
    }, this);
    if(pass) return visited;
  }
  visited.delete(this);
  return null;
};

Cell.prototype.getNeighbors = function() {
  var neighbors = [];
  var i = -1;
  while(i <= 1) {
    var j = -1;
    var row = this.row + i;
    while(j <= 1) {
      var col = this.col + j++;
      var neighbor = this.board.cell(row, col);
      if(neighbor) neighbors.push(neighbor);
    }
    i++;
  }
  return neighbors;
};

module.exports = Cell;
