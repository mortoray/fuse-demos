var Observable = require("FuseJS/Observable")

var gameStats = require("GameStats.js")

var gameOver = true
var timePenalty = 5

var score = Observable(0)

var failCount = Observable(0)

var timeLeft = Observable(0)
var maxTime = Observable(1)

var timer = null
var lastTime
var difficulty
var mode
var lives = Observable(0)
var rushMode = Observable(false)

/**
	Starts a new game
*/
exports.newGame = function(difficulty_, mode_) {
	difficulty = difficulty_
	mode = mode_
	
	score.value = 0
	failCount.value = 0
	timeLeft.value = mode.levelTime
	maxTime.value = mode.levelTime
	lives.value = mode.lives,
	rushMode.value = mode.rushMode,
	gameOver = false
	
	lastTime = (new Date()).getTime()
	timer = setInterval( update, 100 )
	
	exports.onCreateLevel(difficulty.tiles)
}

exports.isRunning = function() {
	return !gameOver
}

exports.getConfigId = function() {
	return mode.id + "." + difficulty.id
}

/**
	Starts another round of the game in the same mode as last time.
*/
exports.restart = function() {
	exports.newGame(difficulty, mode)
}

function update() {
	var next = (new Date()).getTime()
	var elapsed = next - lastTime
	lastTime = next
	step(elapsed/1000.0)
}

function step(elapsed) {
	var cur = timeLeft.value
	var next = cur - elapsed
	timeLeft.value = next
	
	if (next < 0) {
		lives.value -= 1
		if (lives.value <= 0) {
			endGame()
		} else {
			timeLeft.value = maxTime.value
			exports.onLostLife()
			exports.onCreateLevel(difficulty.tiles)
		}
	}
}

var statsResult = Observable()

function endGame() {
	gameOver = true
	clearInterval(timer)
	exports.onGameOver()
	
	statsResult.value = gameStats.addScore( exports.getConfigId(), score.value )
}

/** Indicates a correct tile has been selected */
exports.selectedCorrect = function() {
	if (gameOver) {
		return
	}
	
	score.value++
	exports.onGoodSelect()
	exports.onCreateLevel(difficulty.tiles)
	if (mode.rushMode) {
		//keep reducing to ensure a timely end to the game
		maxTime.value = maxTime.value * 0.95
		timeLeft.value = maxTime.value
	}
}

/** Indicates an incorrect file has been selected */
exports.selectedIncorrect = function() {
	if (gameOver) {
		return
	}
	
	failCount.value++
	
	timeLeft.value -= timePenalty
	exports.onTimePenalty()
}

/** Return a map of the data that is meant to be accessible directly from UX */
exports.getPublic = function() {
	return {
		score,
		failCount,
		timeLeft,
		maxTime,
		lives,
		rushMode,
		statsResult,
	}
}
