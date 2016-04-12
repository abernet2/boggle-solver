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

    flatten: function(array) {
        return [].concat.apply([], array);
    },

    endOf: function(list, idx) {
        return list.length - 1 === idx;
    }
});