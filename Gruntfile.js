'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '**/*.js',
                '!**/*Spec.js',
                '!app/bower_components/**/*.js',
                '!node_modules/**/*.js',
                '!build/*.js',
                '!dist/*.js',
                '!coverage/**/*.js'
            ]
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: [
                '**/*.js',
                '!**/*Spec.js',
                '!app/bower_components/**/*.js',
                '!node_modules/**/*.js',
                '!build/*.js',
                '!dist/*.js',
                '!coverage/**/*.js'
            ]
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                autoWatch: true
            },
            singleRun: {
                autoWatch: false,
                singleRun: true,
                browsers: ['Firefox']
            }
        }
    });

    grunt.registerTask('default', ['jshint:all', 'jscs:all', 'karma:singleRun']);
};
