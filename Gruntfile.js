/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: grunt.file.readJSON('package.json').version,
      banner: '/*! fixto - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://github.com/bbarakaci/fixto/' +
        '*/'
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/fixto.js>'],
        dest: 'dist/fixto.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/fixto.min.js'
      }
    },
    watch: {
      files: '<config:jshint.files>',
      tasks: ['jshint', 'qunit']
    },
    uglify: {}
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('make', ['jshint', 'qunit', 'concat', 'min']);

};
