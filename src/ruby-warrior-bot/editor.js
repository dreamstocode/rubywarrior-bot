let Key = require('selenium-webdriver').Key;


class Editor {
    constructor(editor) {
        this.editor = editor;
    }

    clear() {
        this.editor.click();
        this.editor.sendKeys(Key.chord(Key.CONTROL, "a"));
        this.editor.sendKeys(Key.DELETE);
    }
    
    input(code) {
        return new Promise((resolve, reject) => {
            let lines = code.split('\n');
            for(let line of lines) {
                this.editor.sendKeys(line.trim());
                this.editor.sendKeys(Key.RETURN)
            }
            resolve();
        });
    }
}

module.exports = {
    Editor: Editor
}