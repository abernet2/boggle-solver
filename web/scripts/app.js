require(['./boggle', './solver', './helpers/utils'], function(Boggle, Solver, utils){
    var {tds, board} = utils;
    var form = document.getElementById('word-form');
    var boggle = new Boggle(board());
    var solver = new Solver(boggle);
    var highlighted = false;
    var guesses = new Set();

    function highlightWord() {
        var word = event.target.value;
        highlighted = boggle.highlightWord(word);
    }

    // add html actions
    function checkWord(event) {
        event.preventDefault();
        if(!highlighted) return;
        var word = event.target.children.item('text').value,
            correctness = solver.check(word);
        appendWord(word, correctness);
    }

    function appendWord(word, tf) {
        var elem = document.getElementById('guesses');
        var newNode = document.createElement('li');
        var className = tf ? 'correct' : 'wrong';
        newNode.innerText = word;
        newNode.classList.add(className);
        elem.appendChild(newNode);
    }

    form.addEventListener('keyup', highlightWord);
    form.addEventListener('submit', checkWord);

});
