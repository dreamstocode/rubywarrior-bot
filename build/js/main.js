'use strict';

var Player = require('./ruby-warrior-bot/player.js').Player;
var Game = require('./ruby-warrior-bot/game.js').Game;

var game = new Game();
var bob = new Player('Bob');

bob.play(game);