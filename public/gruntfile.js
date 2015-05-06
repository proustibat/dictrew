module.exports = function(grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./js",
                    mainConfigFile: "js/app.js",
                    name: "app",
                    out: "js/app.min.js",
                    optimize: "uglify2",
                    generateSourceMaps: true,
                    preserveLicenseComments: false
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: "nested",
                    sourcemap: "inline",
                    debugInfo: true,
                    lineNumbers: true
                },
                files: [{
                    "expand": true,
                    "cwd": "sass/",
                    "src": ["*.scss"],
                    "dest": "css/",
                    "ext": ".min.css"
                }]
            },
            prod: {
                options: {
                    style: "compressed",
                    sourcemap: "none"

                },
                files: [{
                    "expand": true,
                    "cwd": "sass/",
                    "src": ["*.scss"],
                    "dest": "css/",
                    "ext": ".min.css"
                }]
            }
        },
        watch: {
            css: {
                files: "sass/*.scss",
                tasks: ["sass:dev"]
            },
            scripts: {
                files: ['js/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['requirejs', "sass:prod"]);
    grunt.registerTask("dev", [
        "requirejs",
        "sass:dev",
        "watch"
    ]);
};
