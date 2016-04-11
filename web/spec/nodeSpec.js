define(['../scripts/helpers/node'], function(TrieNode){
    describe('Node', function(){
        var node,
            value = 'a';
        beforeEach(function(){
            node = new TrieNode('a');
        });

        describe('instantiation', function(){
            it('should have an uppercase value', function() {
                expect(node.value).toEqual(value.toUpperCase());
            });

            it('should instantiate children to empty array', function() {
                expect(node.children).toEqual([]);
            });

            it('should mark for end of the word and default to false', function() {
                expect(node.word).toEqual(false);
            })
        });

        describe('add', function() {
            beforeEach(function(){
                node.add('ab');
            });

            it('should add to middle branch when there is a match but no children', function(){
                expect(node.children[0].value).toEqual('B');
            });
            it('should add to right / left if there is not a match', function(){
                node.add('b');
                expect(node.children[1].value).toEqual('B');
            });

            it('should mark for end of word', function() {
                expect(node.children[0].word).toEqual(true);
            })
        })
    });
});