var Observable = require("FuseJS/Observable")

var stats = {
}

function getStats(id) {
	if (stats[id]) {
		return stats[id]
	}
	
	var r = {}
	stats[id] = r
	return r
}

var bestScore = Observable(0)

exports.addScore = function(id, score) {	
	var modeStats = getStats(id)
	
	if (!modeStats.bestScore || score > modeStats.bestScore) {
		modeStats.bestScore = score
		modeStats.lastBest = true
	} else {
		modeStats.lastBest = false
	}
	modeStats.played = (modeStats.played || 0) + 1
	return modeStats
}

exports.getPublic = function() {
	return {
	}
}

exports.save = function() {
	return stats
}

exports.load = function(data) {
	stats = data
}