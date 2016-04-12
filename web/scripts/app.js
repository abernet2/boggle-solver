require(['./boggle', './solver', './helpers/utils', './helpers/htmlHelper'], function(Boggle, Solver, utils, htmls){
    var {tds} = utils;
    var {board} = htmls;
    var form = document.getElementById('word-form');
    var btn = document.getElementById('solutions');
    var boggle = new Boggle(board.call(htmls));
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
        appendWord('guesses', word, correctness);
        this.reset();
    }

    function appendWord(id, word, tf) {
        var elem = document.getElementById(id);
        if(typeof tf === 'boolean') {
            var className = tf ? 'correct' : 'wrong';
        }
        elem.appendChild(li(word, className));
    }

    function li(text, className) {
        var newNode = document.createElement('li');
        newNode.classList.add(className);
        newNode.innerText = text;
        return newNode;
    }

    function printSolutions() {
        solver.solutions.forEach(appendWord.bind(null, 'answers'));
    }

    form.addEventListener('keyup', highlightWord);
    form.addEventListener('submit', checkWord);
    btn.addEventListener('click', printSolutions)

});
