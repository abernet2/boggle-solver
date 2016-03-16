function Boggle() {
  this.board = [[],[],[],[]]
}

Boggle.prototype.chooseRandom = function(value, index, array) {
  var rand = Math.floor(Math.random() * 6);
  return this.board[row(index)][col(index)] = value[rand];
}

Boggle.prototype.shake = function() {
  BOGGLE_DICE.forEach(this.chooseRandom, this);
}

Boggle.prototype.include = function(word) {
  var y = 0;
  var x = 0;
  while(y < 4) {
    while(x < 4) {
      if(this.find(word.toUpperCase(), y, x++, {})) return true;
    }
    x = 0;
    y++;
  }
  return false;
}

Boggle.prototype.getNeighbors = function(x, y) {
  var neighbors = [];
  var i = -1;
  while(i <= 1) {
    var j = -1;
    while(j <= 1) {
      var row = x + i;
      var col = y + j++;
      var inbounds = row < 4 && row > -1 && col < 4 && col > -1;
      if(inbounds && !(row == y && col == x)) neighbors.push({row, col});
    }
    i++;
  }
  return neighbors;
}

Boggle.prototype.find = function(word, row, col, visited, wordIndex) {
  if(!wordIndex) wordIndex = 0;
  if(visited[[row, col]]) return false;
  var die = this.board[row][col];
  var letter = word[wordIndex];
  
  if(wordIndex === word.length - 1) return letter === die;

  if(die === letter) {
    visited[[row, col]] = true;
    var neighbors = this.getNeighbors(row, col);
    var pass = neighbors.some(function(val, index){ 
      return this.find(word, val.row, val.col, visited, wordIndex + 1)
    });
    if(pass) return true;
    visited[row, col] = false;
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