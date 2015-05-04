module.exports = function(grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./js",
                    mainConfigFile: "js/app.js",
                    name: "app",
                    out: "dist/app.js",
                    optimize: "uglify2",
                    generateSourceMaps: true,
                    preserveLicenseComments: false
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['requirejs']);
};
