'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key;

var driver = new webdriver.Builder().forBrowser('firefox').build();

var Editor = require('./editor').Editor;
var Level = require('./level').Level;

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);
    }

    _createClass(Game, [{
        key: 'newGame',
        value: function newGame(player_name) {
            this._startNewGame();
            this._createWarrior(player_name);
        }
    }, {
        key: 'play',
        value: async function play(level_number) {
            var level = new Level(level_number);

            await this._ready();
            this._run(level);
        }
    }, {
        key: 'quit',
        value: function quit() {
            driver.quit();
        }
    }, {
        key: 'toggleMusic',
        value: function toggleMusic() {
            driver.findElement(By.className('music-toggle')).click();
        }
    }, {
        key: '_createWarrior',
        value: function _createWarrior(player_name) {
            var by = By.xpath("//a[contains(.,'select')]");
            driver.wait(until.elementLocated(by, 10000));
            driver.wait(until.elementIsVisible(driver.findElement(by)), 10000);
            driver.findElement(by).click();
            driver.findElement(By.id('create-warrior')).click();
        }
    }, {
        key: '_run',
        value: function _run(level) {
            var by = By.className("editor");
            var editor = new Editor(driver.findElement(by));

            editor.clear();

            editor.input(level.data).then(function () {
                driver.sleep(3000);
                driver.executeScript("window.scroll(0,0);");
            }).then(function () {
                by = By.className("run-code");
                driver.sleep(1000);
                driver.findElement(by).click();
            });
        }
    }, {
        key: '_startNewGame',
        value: function _startNewGame() {
            driver.get('https://www.bloc.io/ruby-warrior#/');
            driver.manage().window().maximize();
            driver.findElement(By.xpath("//a[contains(.,'venture forth!')]")).click();
        }
    }, {
        key: '_ready',
        value: function _ready() {
            return new Promise(function (resolve, reject) {
                var by = By.className("editor");
                driver.wait(until.elementLocated(by, 10000)).then(function () {
                    return driver.wait(until.elementIsVisible(driver.findElement(by)), 10000);
                }).then(function () {
                    return driver.sleep(2000);
                }).then(function () {
                    resolve();
                });
            });
        }
    }]);

    return Game;
}();

module.exports = {
    Game: Game
};