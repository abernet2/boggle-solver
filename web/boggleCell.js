function Cell(row, col, value, board) {
  this.row = row;
  this.col = col;
  this.value = value;
}

Cell.prototype.find = function(word, visited=new Set(), wordIndex=0) {
  if(visited.has(this)) return null;
  word = word.toUpperCase();
  var match = this.value === word[wordIndex];
  
  if(wordIndex === word.length - 1) {
    if(!match) return null;
    visited.add(this);
    return visited;
  }

  if(match) {
    visited.add(this);
    var neighbors = this.getNeighbors(this.row, this.col);
    var pass = neighbors.some(function(cell, index) { 
      return cell.find(word, visited, wordIndex + 1);
    });
    if(pass) return visited;
  }
  visited.delete(this);
  return null;
};

Cell.prototype.getNeighbors = function() {
  if(this.neighbors) return this.neighbors;
  var neighbors = this.neighbors = [];
  var cell = this.board.cell.bind(this.board);
  var rows = [-1, 0, 1].map(add(this.row));
  var cols = [-1, 0, 1].map(add(this.col));

  rows.forEach(function(row){
    cols.forEach(function(col){
      if(cell(row, col)) neighbors.push(cell(row, col));
    }, this)
  } ,this);

  return this.neighbors;
};

// curried add function
function add(a, b) {
  if (arguments.length === 0) return add;
  if (arguments.length === 1) return function(c) {return a + c};
  return a + b;
}