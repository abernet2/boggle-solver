var BOGGLE_DICE = require('./boggleDice');
var Cell = require('./boggleCell');

function Boggle() {
  this.board = [[],[],[],[]]
}

Boggle.prototype.chooseRandom = function(value, index, array) {
  var rand = Math.floor(Math.random() * value.length);
  var r = row(index);
  var c = col(index);
  this.board[r][c] = new Cell(r, c, value[rand], this);
};

Boggle.prototype.shake = function() {
  BOGGLE_DICE.forEach(this.chooseRandom, this);
  return this;
};

Boggle.prototype.findPath = function(word) {
  var i = 0;
  while(i < 16) {
    var cell = this.cell(i++);
    var found = cell.find(word);
    if(found) return [...found];
  }
  return null;
};

Boggle.prototype.include = function(word) {
  var path = this.findPath(word);
  return !!path;
};

Boggle.prototype.cell = function(r, c) {
  if(!c && c !== 0) {
    var idx = r;
    r = row(idx);
    c = col(idx);
  }
  if(r > 3 || r < 0) return null;
  return this.board[r][c];
};

Boggle.prototype.highlight = function(cells) {
  this.unhighlight();
  if(cells) cells.forEach((cell) => cell.highlighted = true);
};

Boggle.prototype.unhighlight = function() {
  var i = 0;
  while(i < 16) {
    var cell = this.cell(i++);
    cell.highlighted = false;
  }
};

Boggle.prototype.highlightWord = function(word) {
  this.highlight(this.findPath(word));
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