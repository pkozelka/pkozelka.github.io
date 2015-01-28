define(function () {
    var Settings = function() {
        this.colorCount = 8;
        this.codeSize = 5;
        this.rowCount = 10;

    };
    Settings.prototype.setCodeSize = function(/*int */newSize) {
        if (newSize > colorCount) {
            throw "Code size exceeds number of available colors";
        }
        this.codeSize = newSize;
    };
    //
    return Settings;
});