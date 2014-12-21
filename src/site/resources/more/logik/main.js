require.config({
    shim:{
        'angular': { exports: 'angular'},
        'jquery':{ exports:'jQuery' }
    },
    paths:{
        'jquery':'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
        'less':['lib/less-1.3.3.min',
            'https://raw.github.com/cloudhead/less.js/master/dist/less-1.3.3.min'],
        'angular':['lib/angular-1.1.4.min',
            '//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min']
    },
    priority: ['angular']
});

require(['jquery','angular', 'less', 'app'], function ($, angular, less, app) {
    'use strict';

    $(document).ready(function () {
        angular.bootstrap(document.documentElement, [app.name]);
//        $(document.documentElement).addClass("ng-app");  // for scenario runner
    });
});
