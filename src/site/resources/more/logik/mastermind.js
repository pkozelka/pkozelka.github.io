'use strict';

function MastermindController($scope) {
    $scope.barvy = [
        'red',
        'blue',
        'black',
        'green',
        'purple',
        'yellow',
        'orange',
        'magenta'
    ];

    $scope.pocetSloupcu = 5;
    $scope.pocetPokusu = 10;
    $scope.aktivniRadek = 1;
    $scope.aktivniSloupec = 1;

    $scope.secret = [1, 2, 3, 4, 5];

    $scope.rows = [
        {guess:[0, 0, 0, 0, 0]}
    ];

    var missingColors = function (row) {
        var cnt = 0;
        for (var i in row.guess) {
            if (row.guess[i] == 0) {
                cnt++;
            }
        }
        return cnt;
    };

    var evaluateRow = function (row) {
        var goodPosition = 0;
        var goodColor = 0;
        for (var i = 0; i < $scope.pocetSloupcu; i++) {
            var g1 = row.guess[i];
            if (g1 === $scope.secret[i]) {
                goodPosition++;
            } else {
                for (var x = 0; x < $scope.pocetSloupcu; x++) {
                    if (g1 === $scope.secret[x]) {
                        goodColor++;
                        break;
                    }
                }
            }
        }
        row.flags = [];
        for (var i = 0; i < goodPosition; i++) {
            row.flags.push('GoodPosition');
        }
        for (var i = 0; i < goodColor; i++) {
            row.flags.push('GoodColor');
        }
        while (row.flags.length < $scope.pocetSloupcu) {
            row.flags.push(null);
        }
        row.goodPosition = goodPosition;
        row.goodColor = goodColor;
    };

    var endGame = function (success) {
        if (success) {
            window.alert("Jsi vítěz!");
        } else {
            window.alert("Prohrál(a) jsi!");
        }
    };

    $scope.evaluate = function () {
        var row = $scope.rows[$scope.aktivniRadek - 1];
        var missing = missingColors(row);
        if (missing > 0) {
            window.alert(missing + " barvy chybí, nelze vyhodnotit");
        } else {
            evaluateRow(row);
            if (row.goodPosition == $scope.pocetSloupcu) {
                endGame(true);
            } else if ($scope.aktivniRadek == $scope.pocetPokusu) {
                endGame(false);
            } else {
                $scope.aktivniRadek = $scope.aktivniRadek + 1;
                $scope.aktivniSloupec = 1;

            }
        }
    };

    $scope.setActiveColumn = function (rowNo, colNo) {
//        if ($scope.aktivniRadek === rowNo) {
            $scope.aktivniSloupec = colNo;
            console.log(rowNo + ":" + colNo);
//        }
        $scope.aktivniRadek = rowNo;
    };

    $scope.getFlagClass = function (radek, sloupec) {
        var row = $scope.rows[radek - 1];
        return row && row.flags ? row.flags[sloupec - 1] : '';
    };

    $scope.getBarvaKnofliku = function (radek, sloupec) {
        var row = $scope.rows[radek - 1];
        if (row) {
            var guess = row.guess[sloupec - 1];
            if (guess) {
                var color = $scope.barvy[guess - 1];
                return {
                    colorIndex:guess,
                    colorStyle:'background-color: ' + color + ';'
                }
            }
        }
        return {
            colorIndex:0,
            colorStyle:''
        };
    };

    $scope.useColor = function (barva) {
        var row = $scope.rows[$scope.aktivniRadek - 1];
        if (!row) {
            row = {guess:[0, 0, 0, 0, 0]};
            $scope.rows[$scope.aktivniRadek - 1] = row;
        }
        row.guess[$scope.aktivniSloupec - 1] = barva;
        if ($scope.aktivniSloupec >= $scope.pocetSloupcu) {
            $scope.aktivniSloupec = 1;
        } else {
            $scope.aktivniSloupec = $scope.aktivniSloupec + 1;
        }
        row.flags = null;
    }

}

angular.module('myApp', ['myApp.filters']);

/**
 * http://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
 */
angular.module('myApp.filters', []).filter('makeRange', function () {
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
        if (lowBound > highBound) {
            for (var i = lowBound; i >= highBound; i--) {
                result.push(i);
            }
        } else {
            for (var i = lowBound; i <= highBound; i++) {
                result.push(i);
            }
        }
        return result;
    };
});
