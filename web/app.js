document.addEventListener('DOMContentLoaded', function(){
    var _boggle = new Boggle(board());
    _boggle.shake();

    function tds(elem=document) {
        return elem.getElementsByTagName('td');
    }
    function board() {
        return document.getElementById('boggle-board');
    }
});