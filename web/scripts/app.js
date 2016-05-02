require(['./boggle', './solver', './helpers/htmlHelper'], function(Boggle, Solver, html){
    if(!html.board) html.createAll();

    var boggle = new Boggle(html.board);
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
        resetState(this);
    }

    function resetState(form) {
        form.reset();
        boggle.unhighlight();
    }

    function appendWord(id, word, tf) {
        var elem = html[id],
            li, className;
        if(typeof tf === 'boolean') {
            className = tf ? 'correct' : 'wrong';
        }
        li = html.createLi(word, className);
        elem.appendChild(li);
    }

    function printSolutions() {
        solver.solutions.forEach(appendWord.bind(null, 'answers'));
    }

    html.form.addEventListener('keyup', highlightWord);
    html.form.addEventListener('submit', checkWord);
    html.button.addEventListener('click', printSolutions);

});
