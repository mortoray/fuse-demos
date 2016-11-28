var Observable = require("FuseJS/Observable")

// converts our own options object into an array of options for an `Each`
function mapOptions(opts) {
	return Object.keys(opts).map( function(key) {
		opts[key].id = key //so we know the key when we just have the value
		return { value: key, label: opts[key].label }
	})
}

var difficultyOptions = {
	low: { 
		label: "Quick Fun",
		tiles: {
			count: 12,
			sizeVariance: 0.1, 
			spinFreq: 0,
		}
	},
	middle: { 
		label: "Easy  Going",
		tiles: {
			count: 16,
			sizeVariance: 0.3, 
			spinFreq: 0.05,
		}
	},
	high: { 
		label: "Difficult Now", 
		tiles: {
			count: 20,
			sizeVariance: 0.4, 
			spinFreq: 0.1,
		}
	},
	highest: { 
		label: "Bloody Hard", 
		tiles: {
			count: 22,
			sizeVariance: 0.5, 
			spinFreq: 0.2,
		}
	},
}
exports.difficulty = Observable("middle")
exports.difficultyOptions = mapOptions(difficultyOptions)

exports.getDifficulty = function() {
	return difficultyOptions[exports.difficulty.value] || difficultyOptions.middle
}

var modeOptions = {
	fixed: { 
		label: "60s Limit",
		rushMode: false,
		levelTime: 60,
		lives: 1,
	},
	panic: { 
		label: "Rush Mode" ,
		rushMode: true,
		levelTime: 15,
		lives: 5,
	},
}
exports.mode = Observable("fixed")
exports.modeOptions = mapOptions(modeOptions)

exports.getMode = function() {
	return modeOptions[exports.mode.value] || modeOptions.fixed
}

exports.save = function() {
	return {
		difficulty: exports.difficulty.value,
		mode: exports.mode.value,
	}
}

exports.load = function(data) {
	if (difficultyOptions[data.difficulty]) {
		exports.difficulty.value = data.difficulty
	}
	if (modeOptions[data.mode]) {
		exports.mode.value = data.mode
	}
}
