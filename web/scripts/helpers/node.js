define(function(){
    function Node(value, word=false) {
        this.value = value.toUpperCase();
        this.word = word;
        this.children = [];
    }

    Node.make = function(value) {
        return new Node(value);
    }

    Node.prototype.compare = function(other) {
        if(this.constructor === other.constructor) {
            if(this.value === other.value) return 0;
            return this.value > other.value ? -1 : 1;
        }
        else if(typeof other === 'string') {
            if(this.value === other) return 0;
            return this.value > other ? -1 : 1;
        }
        else {
            console.log('error');
        }
    }

    Node.prototype.markEnd = function(){
        this.word = true;
        return this;
    }

    Node.prototype.toString = function(){
        return this.value;
    }

    // only increment if match or if a new node was created
    Node.prototype.add = function(word, charLoc=0) {
        var char = word[charLoc].toUpperCase(),
            node = this,
            branch;

        if(node === null) node = new Node(char);
        branch = node.branch(char);
        if(!branch) {
            charLoc++;
            if(charLoc === word.length) return node.markEnd();
        }
        if(!node.children[branch]) node.children[branch] = new Node(word[charLoc]);
        node.children[branch].add(word, charLoc);
        return node;
    }

    Node.prototype.find = function(word, charLoc=0) {
        var char = word[charLoc].toUpperCase(),
            branch = this.branch(char);
            
        charLoc += branch === 0;     // goes to next character if it's a match
        if(charLoc === word.length) return this;
        if(this.children[branch]) return this.children[branch].find(word, charLoc);
        return null;
    }

    Node.prototype.branch = function(other) {
        return this.compare(other);
    }

    return Node;
});