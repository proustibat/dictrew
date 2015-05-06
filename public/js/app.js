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
        radio: '../bower_components/backbone.radio/build/backbone.radio',
        soundManager: '../vendors/soundmanager2/soundmanager2-nodebug'
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
        },
        soundManager: {
            exports: "soundManager"
        }
    }
});

require([
    'jquery',
    'bootstrap',
    'handlebars',
    'backbone',
    'soundManager'
], function($, _bootstrap, Handlebars, Backbone, soundManager) {
    window.soundManager = soundManager; // for flash version
    soundManager.beginDelayedInit();

    // Vue de la collection
    var SoundsView = Backbone.View.extend({
        initialize: function() {
            // console.log('SoundsView.initialize');
            this.listenTo(this.collection, "sync", this.render);
            this.collection.fetch();
        },
        render: function() {
            console.log('SoundsView.render');
            var $template = "";
            this.$el.html("");
            this.collection.each(function(model) {
                // console.log('model : ', model);
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
        events: {
            'click': 'onClick'
        },
        player: null,
        initialize: function() {
            console.log('SoundView.initialize');
            this.template = Handlebars.compile($("#sounds-template").html()),
            this.initPlayer();
            this.render();
        },

        onClick:function(e){
            console.log('onclick');
            this.player.play();
        },

        initPlayer: function() {
            soundManager.setup({
                url: "/swf/",
                flashVersion: 9,
                preferFlash: false,
                onready: function() {
                    console.log("I am ready : ", this);
                    this.player = soundManager.createSound({
                        id: this.model.cid,
                        url: this.model.attributes.url,
                        autoLoad: true,
                        autoPlay: false,
                        onload: function(isLoaded) {
                            if(isLoaded) {
                                console.log('ISLOADED');
                                // soundManager.play(this.model.cid+'');
                                // this.player.play();
                            }
                            // console.log('onload : ', this.model);
                            // this.$el.attr("href", this.model.attributes.url).removeClass("disabled");
                        }.bind(this),
                        volume: 60
                    })
                }.bind(this)
            });
        },

        render: function() {
            console.log('Soundview.render : ');
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            this.$el.addClass("disabled");
        }
    });

    // Collection de sons
    var SoundsCollection = Backbone.Collection.extend({
        url: "../server/allsounds.json",
        initialize: function() {
            console.log('SoundsCollection.initalize');
            // console.log('this.url : ', this.url);
        }
    });


    // INSTANCIATIONS
    var soundsCollection = new SoundsCollection();

    var soundsView = new SoundsView({
        el: '.js-list-sounds',
        collection: soundsCollection
    });

});

// require(['./Overrides', './NavView', './Router'], function(Overrides, NavView, Router) {
// new NavView();
// new Router();

// Backbone.history.start();
// });
