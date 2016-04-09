function Boggle(tag) {
    Cell.prototype.board = this;
    this.board = [[],[],[],[]];
    this.tag = tag;
    this.shake;
}

define(function(require, exports, module){
    debugger;
    return Boggle;
});

require(['./boggleDice'], function(o.BOGGLE_DICE){
    Boggle._dice = o.BOGGLE_DICE;
});

Boggle.prototype.chooseRandom = function(value, index, array) {
    var rand = Math.floor(Math.random() * value.length);
    var r = row(index);
    var c = col(index);
    if(typeof this.board[r][c] === 'Cell'){
        this.board[r][c].value = value[rand];
    } else {
        this.board[r][c] = new Cell(r, c, value[rand], this);
    }
};

Boggle.prototype.shake = function() {
    Boggle._dice.forEach(this.chooseRandom, this);
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
    if(arguments.length === 1) {
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
