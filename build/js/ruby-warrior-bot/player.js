"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(name) {
        _classCallCheck(this, Player);

        this.name = name;
        this.level = 1;
    }

    _createClass(Player, [{
        key: "play",
        value: function play(game) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            this.game = game;
            this.game.newGame(this.name);
            this.game.toggleMusic();
            this.game.play(level);
        }
    }]);

    return Player;
}();

module.exports = {
    Player: Player
};