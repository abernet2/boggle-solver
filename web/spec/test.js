require.config({
    baseUrl: '../spec',

    paths: {
        'jasmine': ['../jasmine/lib/jasmine-2.4.1/jasmine'],
        'jasmine-html': ['../jasmine/lib/jasmine-2.4.1/jasmine-html'],
        'jasmine-boot': ['../jasmine/lib/jasmine-2.4.1/boot']
    },

    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps : ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {
  require(['nodeSpec'], function(){
    //trigger Jasmine
    window.onload();
  })
});