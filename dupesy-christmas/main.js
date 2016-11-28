var Observable = require("FuseJS/Observable")
var FileSystem = require("FuseJS/FileSystem")
var Environment = require('FuseJS/Environment')

var gameState = require("GameState.js")
var gameStats = require("GameStats.js")

var gameTiles = require("GameTiles.js")
exports.gameTiles = gameTiles.getPublic()

var gameRouting = require("GameRouting.js")
gameRouting.setRouter( router )

var gameConfig = require("GameConfig.js" )

gameState.onGameOver = function() {
	gameTiles.clear()
	router.goto( "gameOver" )
	saveData()
}
 
gameState.onTimePenalty = function() {
	eventTimePenalty.raise()
}

gameState.onCreateLevel = function(tilesConfig) {
	gameTiles.createLevel(tilesConfig)
}

gameState.onLostLife = function() {
	eventLostLife.raise()
}

gameState.onGoodSelect = function() {	
	eventGoodSelect.raise()
}

//https://github.com/fusetools/fuselibs/issues/3383
var saveDir = FileSystem.dataDirectory
if (Environment.ios) {
	saveDir = FileSystem.iosPaths.documents
} else if (Environment.android) {
	saveDir = FileSystem.androidPaths.files
}
var savePath = saveDir + "/state"


function saveData() {
	console.log( "Saving: " + savePath )
	FileSystem.writeTextToFile( savePath, JSON.stringify( {
		version: 1.0,
		config: gameConfig.save(),
		stats: gameStats.save(),
	}))
}

exports.loading = Observable(false)

function loadData() {
	console.log( "Loading: " + savePath )
	exports.loading.value = true
	FileSystem.readTextFromFile( savePath ).then( function(contents) {
		var data = JSON.parse(contents)
		if (data.stats) {
			gameStats.load(data.stats)
		}
		if (data.config) {
			gameConfig.load(data.config)
		}
		exports.loading.value = false
		
	}, function(error) {
		exports.loading.value = false
		console.log(error)
	})
}

loadData()