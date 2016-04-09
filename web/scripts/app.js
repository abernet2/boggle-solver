require(['./boggle', './solver', './helpers/utils'], function(Boggle, Solver, utils){
    var {tds, board} = utils;
    var form = document.getElementById('word-form');
    var boggle = new Boggle(board());
    var solver = new Solver(boggle);
    var highlighted = false;

    function highlightWord() {
        var word = event.target.value;
        highlighted = boggle.highlightWord(word);
    }

    // add html actions
    function checkWord(event) {
        event.preventDefault();
        if(!highlighted) return;
        var word = event.target.children.item('text').value;
        console.log(solver.check(word));
    }

    form.addEventListener('keyup', highlightWord);
    form.addEventListener('submit', checkWord);

});
