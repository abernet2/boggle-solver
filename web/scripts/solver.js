define(['./helpers/trie'], function(Trie){
    function BoggleSolver(board){
        var solutions = new Set();
        var trie = Trie.loadDictionary();
        solve(board, solutions);

        function solveCell(cell, sequence) {
            if(!sequence) sequence = cell.value;
            if(!trie.sequence(sequence)) return;
            if(valid(sequence)) solutions.add(sequence);
            var nbors = cell.getNeighbors();    // make a getter method
            var addNeighbor = function(n) {
                if(!n.visited) solveCell(n, sequence + n.value);
            }

            cell.visited = true;
            nbors.forEach(addNeighbor);
            cell.visited = false;
        }
        
        function solve(board, solutions) {
            console.log(trie);
            board.eachCell(solveCell);
        }

        function valid(seq) {
            return seq.length > 2 && trie.contains(seq);
        }

        this.check = function(word) {
            return solutions.has(word.toUpperCase());
        }

    }

    // function BoggleSolver(board, dictionaryURL='../../dictionaries/dictionary-tiny.txt'){
    //     var solutions = new Set();
    //     var solveCell = solveCell;
    //     solve(board, solutions);

    //     function solveCell(solutions, trie, cell, sequence='') {
    //         // if(!trie.sequence(sequence)) return;
    //         // if(valid(sequence)) solutions.add(sequence);
    //         // var nbors = cell.getNeighbors();    // make a getter method
    //         // var addNeighbor = function(n) {
    //         //     if(!n.visited) solveCell(n, sequence + n.value);
    //         // }

    //         // cell.visited = true;
    //         // nbors.forEach(addNeighbor);
    //         // cell.visited = false;
    //     }
        
    //     function solve(board, solutions) {
    //         debugger;
    //         var trie = Trie.loadDictionary(dictionaryURL);
    //         // board.eachCell(solveCell.bind(null, solutions, trie));
    //         // for(var i = 0; i < 10; i++) {
    //             // solveCell(solutions, trie, board[0][0]);
    //         // }
    //     }

    //     function valid(seq) {
    //         return seq.length > 2 && trie.contains(seq);
    //     }

    //     // this.check = function(word) {
    //     //     return solutions.has(word);
    //     // }

    // }

    return BoggleSolver;
});
