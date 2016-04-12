define({
    createBoard: function(tag){
        if(!tag) tag = document.getElementById('boggle-container');
        var board = document.createElement('table');
        var tbody = board.appendChild(document.createElement('tbody'));
        board.setAttribute('id', this.boggleId);
        for(var i = 0; i < 4; i++)
            tbody.appendChild(this.createTr());
        tag.insertBefore(board, tag.firstChild);
        return board;
    },

    createTr: function(){
        var row = document.createElement('tr');
        for(var i = 0; i < 4; i++)
            row.appendChild(document.createElement('td'));
        return row;
    },

    tds: function(elem=document) {
        return elem.getElementsByTagName('td');
    },

    board: function() {
        var b = document.getElementById(this.boggleId);
        if(!b) b = this.createBoard();
        return b;
    },

    boggleId: 'boggle-board',
});