module.exports = function(grunt) {

    grunt.initConfig({

        // configure nodemon
        nodemon: {
            dev: {
                script: 'target/server/server.js'
            }
        },

        browserify: {
            dist: {
                files: {
                    'public/js/gscreen.js': ['target/client/gscreen.js']
                }
            },
            options:{
                watch:"true"
            }
        }
    });

    // load nodemon
    grunt.loadNpmTasks('grunt-nodemon');


    //load browserify
    grunt.loadNpmTasks('grunt-browserify');


    // register the nodemon task when we run grunt
    grunt.registerTask('default', ['browserify', 'nodemon']);

};
