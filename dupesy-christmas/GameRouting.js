var gameState = require("GameState.js")
var gameConfig = require("GameConfig.js")

var router 
exports.setRouter = function(router_) {
	router = router_
}

exports.restart = function() {
	router.goto( "game" )
	gameState.restart()
}

exports.returnMain = function() {
	router.goto( "start" )
}

exports.startGame = function() {
	router.goto( "game" )
	gameState.newGame( gameConfig.getDifficulty(), gameConfig.getMode() )
}

exports.help = function(args) {
	router.goto( "help" )
}
