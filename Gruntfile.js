'use strict';
var fs = require('fs');

require('./package.json');

var gruntConfig = {};

try {
    gruntConfig = require('./grunt-config.js');
} catch (e) {
    gruntConfig = require('./grunt-config-sample.js');
}


module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        watch: {
            styles: {
                files: ["less/**"],
                tasks: ["less:dev"],
                options: {
                    livereload: false, //default port 35729
                    nospaces: true
                }
            },
            resources: {
                files: ["*",'!less/*'],
                options: {
                    livereload: true
                }
            }
        },
        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    sourceMap: true,
                    sourceMapRootpath: gruntConfig.lessMapUrlPrefix,
                    paths: ["less/"]
                },
                files: {
                    "dist/cdreami.common.css": "less/index.less",
                }
            },
            prod: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    sourceMap: false,
                    paths: ["less/"]
                },
                files: {
                    "dist/cdreami.common.min.css": "less/index.less",
                }
            }
        }
    });

    grunt.registerTask('default', ['less:dev', 'watch']);
    grunt.registerTask('build', ['less:dev','less:prod']);

};
