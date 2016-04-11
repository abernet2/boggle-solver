define(['../scripts/helpers/node'], function(Node){
    describe('Node', function(){
        var node,
            value = 'a';
        beforeEach(function(){
            node = new Node('a');
        });

        describe('instantiation', function(){
            it('should have an uppercase value', function() {
                expect(node.value).toEqual(value.toUpperCase());
            });

            it('should instantiate children to null', function() {
                expect(node.left).toEqual(null);
                expect(node.middle).toEqual(null);
                expect(node.right).toEqual(null);
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
                expect(node.middle.value).toEqual('B');
            });
            it('should add to right / left if there is not a match', function(){
                node.add('b');
                expect(node.right.value).toEqual('B');
            });

            it('should mark for end of word', function() {
                expect(node.middle.word).toEqual(true);
            })
        })
    });
});