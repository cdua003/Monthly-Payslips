'use strict';

module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/jquery-ui/jquery-ui.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/bootstrap/dist/js/bootstrap.js',
            'app/bower_components/underscore/underscore-min.js',
            'app/js/app/Services/*.js',
        ],
        exclude: [],
        preprocessors: {
            'app/!(bower_components)/**/!(*Spec).js': ['coverage']
        },
        reporters: ['dots', 'junit', 'coverage'],
        autoWatch: true,
        colors: true,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        singleRun: false,
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        },
        junitReporter: {
            outputDir: 'unit-test-results',
            outputFile: 'testoutput.xml',
            useBrowserName: true,
            suite: 'unit'
        }
    });
};
