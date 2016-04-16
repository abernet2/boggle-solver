define(function(){
    var container, board, form, tds, btn, gsses, answers;
    var ret = {

        createAll: function() {
            createBoard(this.container);
            createForm(this.container);
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
            if(!form) createForm(this.container);
            return form;
        },

        get guesses() {
            if(!gsses) createGuesses(this.container);
            return gsses;
        },

        get answers() {
            if(!answers) createAnswers(this.container);
            return answers;
        },

        get container() {
            if(!container) container = document.getElementById('boggle-container');
            return container;
        },

        get tds() {
            if(!tds) tds = document.getElementsByTagName('td');
            return tds;
        },

        get board() {
            if(!board) board = document.getElementById(this.boggleId);
            return board;
        },

        tagMaker: function(str) {
            // chop up by period
            var sep = /[>+]/g,
                tags = str.split(sep),
                operators = str.match(sep);
            var array = tags.map(makeTag)
            return array.reduce(function(p, c, i, a){
                if(operators[i - 1] === '+') {
                    p = p.parentNode;
                }
                p.appendChild(c);
                if(i !== a.length -1) return c;
                return a[0];
            });
        },
    }

    var tagMaker  = function(str) {
        var tag = document.createElement.bind(document);
        return {
            root: tag(str),
            curr: this.root,
            '#': function(name) {this.curr.id = name},
            '.': function(name) {this.curr.classList.add(name)},
            '>': function(str) {return curr.appendChild(tag(str))}
        }
    }
            // '*': function(times) {
            //     var parent = this.curr.parentNode;
            //     for(var i = 0; i < times; i++) {

            //     }
            // }

    // only support single class or id for now
    var makeTag = function(str) {
        var sep = /[\.#]/g,
            operators = str.match(sep),
            args = str.split(sep),
            tag, attr, innerHTML;
        var maker = tagMaker(args.shift());
        console.log(maker)
        debugger;
        while(args.length) {
            var test = maker[operators.shift()](args.shift());
            console.log(test)
        }

        // innerHTML = str.match(/{(.*)}/);
        // if(!operators) return document.createElement(str);
        // tag = document.createElement(args[0]);
        // if(operators[0] === '.'){
        //     tag.classList.add(args[1]);
        // }
        // if(operators[0] === '#'){
        //     tag.id = args[1];
        // }
        // tag[attr] = args[1];
        // if(innerHTML) tag.innerHTML = innerHTML[1];
        return maker.root;
    }

    var last = function(array) {
        return array[array.length-1];
    }


    var createButton = function(tag) {
        btn = makeTag('button#solutions{Get Solutions}');
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
        console.log(form)
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