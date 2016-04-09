define({
    row: function(index) {
        return Math.floor(index / 4);
    },

    col: function(index) {
        return index % 4;
    },

    index: function(row, col) {
        return row * 4 + col;
    },

    add: function(a, b) {
        if (arguments.length === 0) return add;
        if (arguments.length === 1) return function(c) {return a + c};
        return a + b;
    },

    tds: function(elem=document) {
        return elem.getElementsByTagName('td');
    },

    board: function() {
        return document.getElementById('boggle-board');
    },
});