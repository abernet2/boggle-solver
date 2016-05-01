define(['../scripts/helpers/htmlHelper'], function(HTML){
    describe('Tagify', function() {
        var tagify = HTML.tagify;

        it("creates simple tags", function() {
            var tag = tagify('p');
            expect(tag.tagName).toBe('P');
        });

        it('returns detached tags', function() {
            var tag = tagify('span');
            expect(tag.parentElement).toBeNull();
        })

        it('creates tags with children', function() {
            var tagWithChild = tagify('div>p');
            expect(tagWithChild.tagName).toBe('DIV');
            expect(tagWithChild.firstChild.tagName).toBe('P')
        });

        it('creates tags with class names', function() {
            var tag = tagify('p.klass');
            expect(tag.className).toBe('klass');
        });

        it('creates tags with id names', function() {
            var tag = tagify('p#klass');
            console.log(tag)
            expect(tag.id).toBe('klass');
        });

        it('creates children tags with class names', function(){
            var tag = tagify('div>p.klass');
            expect(tag.firstChild.className).toBe('klass');
            expect(tag.className).toBe('');
        });

        it('creates sibling elements', function() {
            var div = tagify('div>p+p');
            expect(div.childElementCount).toBe(2);
        });

        it('handles grandchildren', function() {
            var tag = tagify('div>div>div.grand');
            expect(tag.firstChild.firstChild.className).toBe('grand');
            expect(tag.firstChild.className).toBe('');
            expect(tag.className).toBe('');
        });

        describe('Multiplier', function() {
            it('creates multiple tags', function(){
                var tags = tagify('p*3');
                expect(tags.length).toBe(3);
            });

            it('creates multiple trees of tags', function(){
                var divs = tagify('div*3>p');
                expect(divs[0].tagName).toBe("DIV");
                expect(divs[1].firstChild.tagName).toBe("P");
                expect(divs[2].firstChild.tagName).toBe("P");
            });

            it('can process multiple *s in one line', function() {
                var divs = tagify('div*2>div>p*3');
                expect(divs.length).toBe(2);
                expect(divs[0].childElementCount).toBe(1);
                expect(divs[0].firstChild.childElementCount).toBe(3);
            })
        });
    });
});