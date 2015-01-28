define(function (require) {

    var Row = function (/*int*/ codeSize, /*int*/ index) {
        this.codeSize = codeSize;
        this.rowIndex = index;
        this.reset(this);
    };

    Row.prototype.reset = function () {
        this.goodColor = 0;
        this.goodPosition = 0;
        this.keypegs = [];
        this.guess = [];
        for (var i = 0; i < this.codeSize; i++) {
            this.keypegs.push('Empty');
            this.guess.push(0);
        }
    };

    Row.prototype.filledColors = function () {
        var cnt = 0;
        for (var i = 0; i < this.guess.length; i++) {
            if (this.guess[i]) {
                cnt++;
            }
        }
        return cnt;
    };

    Row.prototype.evaluate = function (secret) {
        var goodPosition = 0;
        var goodColor = 0;
        for (var codePegIndex = 0; codePegIndex < this.codeSize; codePegIndex++) {
            var g1 = this.guess[codePegIndex];
            if (g1 === secret[codePegIndex]) {
                goodPosition++;
            } else {
                for (var x = 0; x < this.codeSize; x++) {
                    if (g1 === secret[x]) {
                        goodColor++;
                        break;
                    }
                }
            }
        }
        this.keypegs = [];
        for (var ip = 0; ip < goodPosition; ip++) {
            this.keypegs.push("GoodPosition");
        }
        for (var ic = 0; ic < goodColor; ic++) {
            this.keypegs.push("GoodColor");
        }
        while (this.keypegs.length < this.codeSize) {
            this.keypegs.push("Empty");
        }
        this.goodPosition = goodPosition;
        this.goodColor = goodColor;
    };

    return Row;
});
