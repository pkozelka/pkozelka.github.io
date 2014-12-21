define(function (require) {
    var Row = require('mastermind/Row');

    var GameBoard = function (/*Settings */settings) {
        this.settings = settings;
        this.currentRow = 1;
        this.currentCodePegHole = 1;

        //TODO: private fields
        this.secret = [1, 2, 3, 4, 5];
        this.rows = [];
        for (var rowIndex = 1; rowIndex <= settings.rowCount; rowIndex++) {
            this.rows.push(new Row(settings.codeSize, rowIndex));
        }
    };

    var endGame = function (success) {
        if (success) {
            window.alert("Jsi vítěz!");
        } else {
            window.alert("Prohrál(a) jsi!");
        }
    };

    GameBoard.prototype.setCurrentHole = /*void*/ function (/*int*/ holeIndex, /*int*/ rowIndex) {
        if (this.currentRow === rowIndex) {
            this.currentCodePegHole = holeIndex;
        }
    };

    GameBoard.prototype.setGuess = function(/*int*/ guess) {
        var row = this.rows[this.currentRow - 1];
        row.guess[this.currentCodePegHole - 1] = guess;
        if (this.currentCodePegHole >= this.settings.codeSize) {
            this.currentCodePegHole = 1;
        } else {
            this.currentCodePegHole = this.currentCodePegHole + 1;
        }
    };

    GameBoard.prototype.evaluate = function () {
        var row = this.rows[this.currentRow - 1];
        var missing = this.settings.codeSize - row.filledColors();
        if (missing > 0) {
            window.alert(missing + " barvy chybí, nelze vyhodnotit");
        } else {
            row.evaluate(this.secret);
            if (row.goodPosition == this.settings.codeSize) {
                endGame(true);
            } else if (this.currentRow == this.settings.rowCount) {
                endGame(false);
            } else {
                this.currentRow = this.currentRow + 1;
                this.currentCodePegHole = 1;
            }
        }
    };

    return GameBoard;
});
