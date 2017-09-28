let webdriver = require('selenium-webdriver'), 
    By = webdriver.By, until = webdriver.until;

let driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

let Editor = require('./editor').Editor;
let Level = require('./level').Level;


class Game {
    newGame(player_name) {
        this._startNewGame();
        this._createWarrior(player_name);
    }
    
    async play(level_number) {
        return new Promise(async (resolve, reject) => {
            console.log(`Playing level: ${level_number}...`);

            if (level_number > 1) { 
                resolve();
                return;
            }

            let level = new Level(level_number);
            
            await this._ready();            
            let result = await this._run(level);

            if (result) {
                console.log(`Level ${level_number} complete!`);
                resolve();
            } else {
                reject();
            }
        });

    }

    quit() {
        driver.quit();
    }

    toggleMusic() {
        driver.findElement(By.className('music-toggle')).click();
    }

    _createWarrior(player_name) {
        let by = By.xpath("//a[contains(.,'select')]");
        driver.wait(until.elementLocated(by, 10000));
        driver.wait(until.elementIsVisible(driver.findElement(by)), 10000);
        driver.findElement(by).click();
        driver.findElement(By.id('create-warrior')).click();
    }
   
    async _run(level) {
        // Enter level code into editor
        let by = By.className("editor");
        let editor = new Editor(driver.findElement(by));
        
        editor.clear();
        await editor.input(level.data)
        await driver.sleep(2000);
        
        // Run code 
        await driver.executeScript("window.scroll(0,0);");

        by = By.className("run-code");
        await driver.findElement(by).click();
        await driver.sleep(1000);

        // Wait for code to complete and check results
        let success = await this._checkResult();

        return (success) ? true: false;
    }

    _startNewGame() {
        driver.get('https://www.bloc.io/ruby-warrior#/');
        driver.manage().window().maximize();
        driver.findElement(By.xpath("//a[contains(.,'venture forth!')]")).click();
    }

    _ready() {
        return new Promise((resolve, reject) => {
            let by = By.className("editor");
            driver.wait(until.elementLocated(by, 10000))
            .then(() => driver.wait(until.elementIsVisible(driver.findElement(by)), 10000))
            .then(() => driver.sleep(2000))
            .then(() => {
                resolve();
            });
        });
    }

    _checkResult() {
        return new Promise(async (resolve, reject) => {
            let successText = 'Onto the next journey, ruby warrior!';
            let failureText = 'Ruby Warrior failed this level!';

            let result = By.xpath(`//p[contains(., "${successText}")] | //p[contains(.,"${failureText}")]`);
            
            await driver.wait(
                until.elementIsVisible(driver.findElement(result)), 60000);

            try {
                await driver.findElement(By.xpath(`//p[contains(.,"${failureText}")]`));
                // There's a failure message, level was not completed :(
                resolve(false); 
            }
            catch(err)
            {
                // No failure message was found, level was completed!
                resolve(true);                
            }
        });
    }
}

module.exports = {
    Game: Game
}