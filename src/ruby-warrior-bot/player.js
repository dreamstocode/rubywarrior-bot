class Player {
    constructor(name) {
        this.name = name;
        this.level = 1;
    }

    play(game) {
        this.game = game;
        this.game.newGame(this.name)
        this.game.toggleMusic();

        this.game.play(1)
        .then(() => {this.game.play(2)})
        .then(() => {this.game.play(3)})
        .then(() => {this.game.play(4)})
        .then(() => {this.game.play(5)})
        .then(() => {this.game.play(6)})
        .then(() => {this.game.play(7)})
        .then(() => {this.game.play(8)})
        .then(() => {this.game.play(9)})
        .then(() => { 
            console.log("Game Complete!, WELL DONE!");
        })
        .catch(() => {
            console.log("You failed, G A M E  O V E R!");
        })
    }
}

module.exports = {
    Player: Player
}