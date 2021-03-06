define(['./boggleDice', './helpers/utils', './helpers/htmlHelper'], function(constants, utils, htmls){
  var {index, add, endOf} = utils;
  var {tds} = htmls;
  var cell;

  function Cell(row, col, value, board) {
    if(!cell) cell = board.cell.bind(board);
    this.row = row;
    this.col = col;
    this.value = value;
    this.tag = tds[index(row, col)];  // dependent on boggle board, should be namespaced better
    this.updateHTML();
  }

  Cell.prototype.find = function(word, visited=new Set(), wordIndex=0) {
    if(visited.has(this)) return null;
    var match, neighFound;
    word = word.toUpperCase();
    match = this.match(word[wordIndex]);
    
    if(endOf(word, wordIndex)) {
      if(!match) return null;
      visited.add(this);
      return visited;
    }

    if(match) {
      visited.add(this);
      neighFound = this.neighbors.some(function(cell, index) { 
        return cell.find(word, visited, wordIndex + 1);
      });
      if(neighFound) return visited;
    }
    visited.delete(this);
    return null;
  };

  Cell.prototype.updateHTML = function(){
    this.tag.innerText = this.value;
  }

  Cell.prototype.match = function(other) {
    return this.value === other;
  }

  Object.defineProperty(Cell.prototype, 'highlighted', {
    set: function(bool=true) {
      var func = bool ? 'add' : 'remove';
      this.tag.classList[func]('highlighted');
    }
  });

  Object.defineProperty(Cell.prototype, 'neighbors', {
    get: function() {
      if(this._neighbors) return this._neighbors;
      var neighbors = this._neighbors = [];
      var rows = [-1, 0, 1].map(add(this.row));
      var cols = [-1, 0, 1].map(add(this.col));

      rows.forEach(function(row){
        cols.forEach(function(col){
          if(cell(row, col)) neighbors.push(cell(row, col));
        })
      });

      return this._neighbors;
    }
  });   

  return Cell;
})
