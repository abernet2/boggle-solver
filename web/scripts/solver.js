define(['./helpers/trie'], function(Trie){
    function BoggleSolver(board){
        var solutions = new Set();
        var solArray;
        var trie = Trie.loadDictionary();
        solve(board, solutions);    // with big dictionary, might want to make this asynchronous

        function addNeighbor(sequence, n) {
            if(!n.visited) solveCell(n, sequence + n.value);
        }

        function solveCell(cell, sequence) {
            if(!sequence) sequence = cell.value;
            if(!trie.sequence(sequence)) return;
            if(valid(sequence)) solutions.add(sequence);
            
            cell.visited = true;
            cell.neighbors.forEach(addNeighbor.bind(null, sequence));
            cell.visited = false;
        }
        
        function solve(board, solutions) {
            board.eachCell(solveCell);
        }

        function valid(seq) {
            return seq.length > 2 && trie.contains(seq);
        }

        this.check = function(word) {
            return solutions.has(word.toUpperCase());
        }

        var getSolutions = function() {
            if(!solArray) solArray = Array.from(solutions).sort();
            return  solArray;
        }

        Object.defineProperty(this, 'solutions', {
            get: getSolutions
        })
    }


    return BoggleSolver;
});
