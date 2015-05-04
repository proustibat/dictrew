"use strict";

require.config({
    baseUrl: './js',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../bower_components/requirejs-text/text',
        tipper: '../bower_components/Tipper/jquery.fs.tipper',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        radio: '../bower_components/backbone.radio/build/backbone.radio'
    },
    shim: {
        backbone: { deps: ['jquery', 'underscore'], exports: 'Backbone' },
        underscore: { exports: '_' },
        bootstrap: {deps: ['jquery']},
        handlebars: { exports: 'Handlebars'},
        tipper: { deps: ['jquery'] },
        marionette: { deps: ["backbone"], exports:"Marionette" },
        radio: { deps: ["backbone"], exports:"Radio" }
    }
});

require([
    'jquery',
    'bootstrap'
    ], function($, _bootstrap){
        // this is where all the site code should begin
        console.log("allo");
        var app = {
            start: function() {
                console.log('this is :', this);
            }
        };
        return app.start();
});

// require(['./Overrides', './NavView', './Router'], function(Overrides, NavView, Router) {
    // new NavView();
    // new Router();

    // Backbone.history.start();
// });


