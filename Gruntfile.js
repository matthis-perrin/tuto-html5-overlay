'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'src',
    dist: 'dist',
    testApp: 'test-app'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      build: {
        files: ['<%= yeoman.app %>/{,*/}*.js'],
        tasks: ['build', 'livereload']
      },
      reload: {
        files: ['<%= yeoman.testApp %>/{,*/}*'],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 3876,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/test-app/'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/main.js': [
            'src/main.js',
            'src/ellipse.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/main.min.js': [
            '<%= yeoman.dist %>/main.js'
          ]
        }
      }
    },
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'livereload-start',
    'build',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('default', ['build']);
};