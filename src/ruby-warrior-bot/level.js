let fs = require('fs');


class Level {
    constructor(level_number) {
        this.levelNumber = level_number;
        this._load();
    }

    _load() {
        this.data = fs.readFileSync(`${__dirname}/level_data/${this.levelNumber}.rb`, 'utf8');
    }
}

module.exports = {
    Level: Level
}