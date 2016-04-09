
require(['./boggle'], function(dice){
    debugger;
    var form = document.getElementById('word-form');
    var _boggle = new Boggle(board());
    _boggle.shake();
    form.addEventListener('keyup', function(){
    debugger;
        var word = event.target.value;
        var path = _boggle.findPath(word);
        _boggle.highlight(path);
    });

    function tds(elem=document) {
        return elem.getElementsByTagName('td');
    }
    function board() {
        return document.getElementById('boggle-board');
    }
});
