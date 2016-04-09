
require(['./boggle', './helpers/utils'], function(Boggle, utils){
    var {tds, board} = utils;
    var form = document.getElementById('word-form');
    var boggle = new Boggle(board());

    function highlightWord() {
        var word = event.target.value;
        boggle.highlightWord(word);
    }

    form.addEventListener('keyup', highlightWord);

});
