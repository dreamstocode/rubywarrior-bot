'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = require('selenium-webdriver').Key;

var Editor = function () {
    function Editor(editor) {
        _classCallCheck(this, Editor);

        this.editor = editor;
    }

    _createClass(Editor, [{
        key: 'clear',
        value: function clear() {
            this.editor.click();
            this.editor.sendKeys(Key.chord(Key.CONTROL, "a"));
            this.editor.sendKeys(Key.DELETE);
        }
    }, {
        key: 'input',
        value: function input(code) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var lines = code.split('\n');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var line = _step.value;

                        _this.editor.sendKeys(line.trim());
                        _this.editor.sendKeys(Key.RETURN);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                resolve();
            });
        }
    }]);

    return Editor;
}();

module.exports = {
    Editor: Editor
};