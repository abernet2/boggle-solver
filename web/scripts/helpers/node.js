function Node(value, word=false) {
    this.value = value.toUpperCase();
    this.word = word;
    this.left = null;
    this.right = null;
    this.middle = null;
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
    if(branch === 'middle') {
        charLoc++;
        if(charLoc === word.length) return node.markEnd();
    }
    if(node[branch] === null) node[branch] = new Node(word[charLoc]);
    node[branch].add(word, charLoc);
    return node;
}

Node.prototype.find = function(word, charLoc=0) {
    var char = word[charLoc].toUpperCase(),
        branch = this.branch(char);
        
    charLoc += branch === 'middle';     // goes to next character if it's a match
    if(charLoc === word.length) return this;
    if(this[branch]) return this[branch].find(word, charLoc);
    return null;
}

Node.prototype.branch = function(other) {
    other = other.toUpperCase();
    var dirs = {'-1': 'left', 0: 'middle', 1: 'right'};
    return dirs[this.compare(other)];
}