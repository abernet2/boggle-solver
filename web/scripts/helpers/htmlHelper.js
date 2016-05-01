define(function(){
    var container, board, form, tds, btn, gsses, answers;
    function array(collection) {
        return Array.prototype.slice.call(collection);
    }

    var ret = {

        createAll: function() {
            var fragment = document.createDocumentFragment();
            createBoard(fragment);
            createForm(fragment);
        },

        createLi: function(text, className) {
            var newNode = document.createElement('li');
            newNode.classList.add(className);
            newNode.innerText = text;
            return newNode;
        },

        get button() {
            if(!btn) btn = document.getElementById('solutions');
            if(!btn) createButton(this.container);
            return btn;
        },

        get form() {
            if(!form) form = document.getElementById('word-form');
            // if(!form) createForm(this.container);
            return form;
        },

        get guesses() {
            if(!gsses) createGuesses(this.container);
            return gsses;
        },

        get answers() {
            if(!answers) answers = document.getElementById('answers');
            if(!answers) createAnswers(this.container);
            return answers;
        },

        get container() {
            if(!container) container = document.getElementById('boggle-container');
            return container;
        },

        get tds() {
            if(!tds) tds = document.getElementsByTagName('td');
            return array(tds);
        },

        get board() {
            if(!board) board = document.getElementById('boggle-board');
            return board;
        },

        tagify: function(str) {
            // chop up by period
            var sep = /[>+]/g,
                tags = str.split(sep),
                operators = str.match(sep);
            var array = tags.map(makeTag)
            var result = array.reduce(function(p, c, i, a){
                var currOperator = operators[i - 1];
                if(currOperator.match(/[+*]/)) {
                    p = p.parentNode;
                p.appendChild(c);
                if(i !== a.length -1) return c;
                return a[0];
            });

            return result;
        },
    }

    var tagMaker  = function(str) {
        var tag = document.createElement.bind(document);
        return {
            root: tag(str),
            curr: tag(str),
            '#': function(name) {this.root.id = name},
            '.': function(name) {this.root.classList.add(name)},
            // '>': function(str) {return curr.appendChild(tag(str))}
        }
    }

    // only support single class or id for now
    var makeTag = function(str) {
        var sep = /[\.#]/g,
            operators = str.match(sep),
            args = str.split(sep),
            tag, attr, innerHTML;
        var maker = tagMaker(args.shift());
        while(args.length) {
            var test = maker[operators.shift()](args.shift());
        }

        return maker.root;
    }


    var createButton = function(tag) {
        btn = makeTag('button#solutions{Get Solutions}');
        btn.innerHTML = 'Get Solutions';
        return tag.appendChild(btn);
    }
    var createGuesses = function(tag) {
        gsses = makeTag('ul#guesses');
        return tag.appendChild(gsses);
    }
    
    var createAnswers = function(tag) {
        gsses = makeTag('ul#answers');
        return tag.appendChild(answers);
    }

    var createForm = function(tag) {
        form = makeTag('form#word-form');
        var text = makeTag('input');
        var submit = makeTag('input');
        text.type = 'text';
        submit.type = 'submit';
        form.appendChild(text).appendChild(submit);
        return tag.appendChild(form);
    }

    var createBoard = function(tag){
        if(!tag) tag = document.getElementById('boggle-container');
        board = document.createElement('table');
        var tbody = board.appendChild(document.createElement('tbody'));
        board.setAttribute('id', 'boggle-board');
        for(var i = 0; i < 4; i++)
            tbody.appendChild(createTr());
        tag.insertBefore(board, tag.firstChild);
        return board;
    }

    var createTr = function(){
        var row = document.createElement('tr');
        for(var i = 0; i < 4; i++)
            row.appendChild(document.createElement('td'));
        return row;
    }

    return ret;
}());
