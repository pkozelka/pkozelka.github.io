define(function (require) {
    'use strict';

    var angular = require('angular');
    var Settings = require('mastermind/Settings');
    var GameBoard = require('mastermind/GameBoard');

    var app = angular.module('app', []);

    app.controller('MastermindController', ['$scope', function ($scope) {
        $scope.settings = new Settings();
        $scope.game = new GameBoard($scope.settings);
    }]);

    /**
     * http://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
     */
    app.filter('makeRange', function () {
            return function (input) {
                var lowBound, highBound;
                switch (input.length) {
                    case 1:
                        lowBound = 0;
                        highBound = parseInt(input[0]) - 1;
                        break;
                    case 2:
                        lowBound = parseInt(input[0]);
                        highBound = parseInt(input[1]);
                        break;
                    default:
                        return input;
                }
                var result = [];
                var i;
                if (lowBound > highBound) {
                    for (i = lowBound; i >= highBound; i--) {
                        result.push(i);
                    }
                } else {
                    for (i = lowBound; i <= highBound; i++) {
                        result.push(i);
                    }
                }
                return result;
            };
        });
    return app;
});
