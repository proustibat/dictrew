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
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        bootstrap: {
            deps: ['jquery']
        },
        handlebars: {
            exports: 'Handlebars'
        },
        tipper: {
            deps: ['jquery']
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        radio: {
            deps: ["backbone"],
            exports: "Radio"
        }
    }
});

require([
    'jquery',
    'bootstrap',
    'handlebars',
    'backbone'
], function($, _bootstrap, Handlebars, Backbone) {

    // Vue de la collection
    var SoundsView = Backbone.View.extend({
        initialize: function() {
            console.log('SoundsView.initialize');
            this.listenTo(this.collection, "sync destroy", this.render);
            this.collection.fetch();
        },
        render: function() {
            console.log('SoundsView.render');
            var $template = "";
            this.$el.html("");
            this.collection.each(function(model) {
                console.log('model : ', model);
                var child = new SoundView({
                    model: model
                });
                this.$el.append(child.el);
            }.bind(this));
        }
    });

    // Vue d'un son
    var SoundView = Backbone.View.extend({
        className: "list-group-item",
        tagName: "a",
        initialize: function() {
            this.template = Handlebars.compile($("#sounds-template").html()),
            console.log('SoundView.initialize');
            this.render();
        },
        render: function() {
            console.log('Soundview.render : ');
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            this.$el.addClass("disabled");
            // this.$el.attr("href", this.model.attributes.url).removeClass("disabled");
        }
    });

    // Collection de sons
    var SoundsCollection = Backbone.Collection.extend({
        url: "http://localhost/dictrew/server/allsounds.json",
        initialize: function() {
            console.log('SoundsCollection.initalize');
            console.log('this.url : ', this.url);
        }
    });




    // INSTANCIATIONS
    var soundsCollection = new SoundsCollection();

    var soundsView = new SoundsView({
        el: '.js-list-sounds',
        collection: soundsCollection
    });

    // soundsCollection.fetch().done(function(){
    //      console.log('List found ');
    //  });
});

// require(['./Overrides', './NavView', './Router'], function(Overrides, NavView, Router) {
// new NavView();
// new Router();

// Backbone.history.start();
// });
