var BOGGLE_DICE = require('./boggleDice');

function Cell(row, col, value, board) {
  this.row = row,
  this.col = col,
  this.value = value,
  this.board = board
}

Cell.prototype = {
  find: function(word, visited, wordIndex) {
    if(!wordIndex) wordIndex = 0;
    if(!visited) visited = new Set();
    word = word.toUpperCase();
    if(visited.has(this)) return null;
    var die = this.value;
    var letter = word[wordIndex];
    
    if(wordIndex === word.length - 1) {
      visited.add(this);
      return letter === die;
    }

    if(die === letter) {
      visited.add(this);
      var neighbors = this.getNeighbors(this.row, this.col);
      var pass = neighbors.some(function(val, index){ 
        return val.find(word, visited, wordIndex + 1)
      }, this);
      if(pass) return visited;
    }
    visited.delete(this);
    return null;
  },

  getNeighbors: function() {
    var neighbors = [];
    var i = -1;
    while(i <= 1) {
      var j = -1;
      while(j <= 1) {
        var row = this.row + i;
        var col = this.col + j++;
        var inbounds = row < 4 && row > -1 && col < 4 && col > -1;
        if(inbounds && !(row == this.row && col == this.col))
          neighbors.push(this.board.cell(row,col));
      }
      i++;
    }
    return neighbors;
  },
}

function Boggle() {
  this.board = [[],[],[],[]]
}

Boggle.prototype = {
  chooseRandom: function(value, index, array) {
    var rand = Math.floor(Math.random() * 6);
    var r = row(index);
    var c = col(index);
    this.board[r][c] = new Cell(r, c, value[rand], this);
  },

  shake: function() {
    BOGGLE_DICE.forEach(this.chooseRandom, this);
  },

  findPath: function(word) {
    var i = 0;
    while(i < 16) {
      var cell = this.cell(i++);
      var found = cell.find(word);
      if(found) return found;
    }
    return null;
  },

  include: function(word) {
    var path = this.findPath(word);
    return !!path;
  },

  cell: function(r, c) {
    if(!c && c !== 0) {
      var idx = r;
      r = row(idx);
      c = col(idx);
    }
    return this.board[r][c];
  }
}

function row(index) {
  return Math.floor(index / 4);
}

function col(index) {
  return index % 4;
}

function index(row, col) {
  return row * 4 + col;
}
module.exports = Boggle;