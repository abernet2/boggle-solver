var BOGGLE_DICE = require('./boggleDice');
var Cell = require('./boggleCell');

function Boggle() {
  this.board = [[],[],[],[]]
}

Boggle.prototype = {
  chooseRandom: function(value, index, array) {
    var rand = Math.floor(Math.random() * value.length);
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
      if(found) return [...found];
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