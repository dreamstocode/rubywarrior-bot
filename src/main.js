let Player  = require('./ruby-warrior-bot/player.js').Player;
let Game    = require('./ruby-warrior-bot/game.js').Game;

let game = new Game();
let bob  = new Player('Bob');

bob.play(game);



