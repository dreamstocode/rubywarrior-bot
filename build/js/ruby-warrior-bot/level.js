'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var Level = function () {
    function Level(level_number) {
        _classCallCheck(this, Level);

        this.levelNumber = level_number;
        this._load();
    }

    _createClass(Level, [{
        key: '_load',
        value: function _load() {
            this.data = fs.readFileSync(__dirname + '/level_data/' + this.levelNumber + '.rb', 'utf8');
        }
    }]);

    return Level;
}();

module.exports = {
    Level: Level
};