module.exports = function(grunt) {
  'use strict';
  require('time-grunt')(grunt);
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          targetDir: './libs',
          cleanTargetDir: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
    },

    jade: {
      templates: {
        options: {
          client: false,
          pretty: true
        },
        files: {
          'dist/index.html': 'app/index.jade',
          'dist/templates/biography.html': 'app/views/biography.jade',
          'dist/templates/header.html': 'app/views/header.jade',
          'dist/templates/navbar.html': 'app/views/navbar.jade',
          'dist/templates/timeline.html': 'app/views/timeline.jade'
        }
      }
    },

    html2js: {
      dist: {
        src: [ 'dist/views/*.html' ],
        dest: 'dist/views.js'
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/{,*/}*',
          ]
        }]
      },
      server: '.tmp'
    },

    wiredep: {
      app: {
        src: ['dist/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['app/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['app/**/*.js'],
        dest: 'dist/js/app.js'
      }
    },

    uglify: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['app/**/*.js'],
        dest: 'dist/js/app.min.js'
      }
    },

    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: 'dist/css',
        specify: 'app/styles/main.scss',
        generatedImagesDir: 'dist/img/generated',
        imagesDir: 'app/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: 'dist/img/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    copy: {
      images: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: ['**'],
          dest: 'dist/images'
        }]
      },
      data: {
        files: [{
          expand: true,
          cwd: 'app/data',
          src: ['**'],
          dest: 'dist/data'
        }]
      },
      vendors: {
        files: [{
          expand: true,
          cwd: 'bower_components',
          src: ['**'],
          dest: 'dist/vendors'
        }]
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('default', [
    'jshint:all',
    'clean:dist',
    'compass:prod',
    'jade:templates',
    'html2js:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'clean:dist',
    'compass:dist',
    'jade:templates',
    'copy:images',
    'copy:data',
    'copy:vendors',
    'concat:dist'
  ]);

};
