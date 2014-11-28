module.exports = function(grunt) {

    grunt.initConfig({

        concurrent: {
            first: {
                tasks: ['watch','nodemon'],
                options: { logConcurrentOutput: true }
            }
        },

        // configure nodemon
        nodemon: {
            dev: {
                script: 'target/server/server.js'
            }
        },
        watch: {
            all: {
                files: 'public/**/*.html',
                options: {
                    livereload: true
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'public/js/gscreen.js': ['target/client/gscreen.js']
                }
            },
            options: {
                watch: "true"
            }
        }
    });

    // load nodemon
    grunt.loadNpmTasks('grunt-nodemon');
    
    //load concurrent
    grunt.loadNpmTasks('grunt-concurrent');

    //load browserify
    grunt.loadNpmTasks('grunt-browserify');

    //load watch
    grunt.loadNpmTasks('grunt-contrib-watch');

    // register the nodemon task when we run grunt
    grunt.registerTask('default', ['browserify', 'concurrent:first']);

};
