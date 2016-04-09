function Trie() {
    this.root = null;
}

Trie.prototype.put = function(word) {
    if(this.root === null) {
        this.root = new Node(word[0])
        this.root.add(word);
    }
    this.root.add(word);    
}

Trie.prototype.get = function(word) {
    return this.root.find(word);
}

Trie.prototype.contains = function(word) {
    var node = this.root.find(word);
    if(!node) return false;
    return node.word;
}

Trie.prototype.sequence = function(word) {
    var node = this.get(word);
    return node !== null;
}