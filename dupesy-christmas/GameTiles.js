var Observable = require("FuseJS/Observable")
var gameState = require("GameState.js")

var items = Observable()

exports.getPublic = function() {
	return {
		items,
		tileTypes, //just for preloading
	}
}

exports.clear = function() {
	items.clear()
}

function Item(tileType) {
	
	var _this = this
	this.tileType = tileType
	this.image = tileType.image
	this.used = false
	this.layout = Observable({})
	
	this.setup = function(x,y,radius,target, config) {
		//limit size variance on small devices, otherwise it just gets too small
		var sz = 2 * radius * (1 - Math.random() * config.sizeVariance)
		
		_this.layout.value = {
			x,
			y,
			size: Math.max(55,sz), //smallest still identifiable size on tiny phones (though still hard)
			rotation: Math.random() * 360,
			isTarget: target,
			spinFreq: Math.random() * config.spinFreq,
		}
		_this.used = true
	}
}

function pad(num, size) {
	var s = num+""
	while (s.length < size) {
		s = "0" + s
	}
	return s
}

var tileTypes = []
for (var i=0; i <= 31; ++i) {
	tileTypes.push({
		index: i,
		image: "Assets/tile_" + pad( i, 2 ) + ".png",
	})
}

function length( ax, ay, bx, by ) {
	var x = bx - ax
	var y = by - ay
	return Math.sqrt( x * x + y * y )
}

function contained( x, y, r, szX, szY ) {
	return (x -r > 0) && (x + r < szX) && 
		(y - r > 0) && (y + r < szY)
}

//circle's packed into a snub square tiling
function createLocations( width, height, stepSize ) {
	lefts = []
	rights = []
	
	var wide = width > height
	
	var primeAngle = Math.PI / 12
	var spokeLen =(stepSize/2) / Math.sin(Math.PI/2 - primeAngle)
	var radius = spokeLen * length( Math.cos(primeAngle), Math.sin(primeAngle),
		Math.cos(primeAngle+Math.PI/2), Math.sin(primeAngle+Math.PI/2) ) / 2
	
	var yAlt = true
	for (var y=0; y < height; y+= stepSize) {
		var alt = yAlt
		for (var x=0; x < width; x+= stepSize) {
			var base = alt ? -primeAngle : primeAngle;
			
			function add(angle) {
				var ax = spokeLen * Math.cos(angle) + x
				var ay = spokeLen * Math.sin(angle) + y
				if (contained(ax,ay, radius, width, height)) {
					//split into two sections, this makes it harder as it divides the player's attention
					if ( (wide && ax < (width / 2)) || (!wide && ay < (height/2)) ) {
						lefts.push( [ax,ay] )
					} else {
						rights.push( [ax,ay] )
					}
				}
			}
			
			add(base)
			add(base + Math.PI/2)
			
			alt = !alt
		}
		
		yAlt = !yAlt
	}
	
	return {
		lefts,
		rights,
		radius,
	}
}

/**
	Find an existing item with a matching template or create a new one.
*/
function findOrCreateItem(tileType) {
	for (var i=0; i < items.length; ++i) {
		var item = items.getAt(i)
		if (!item.used && item.tileType == tileType) {
			return item
		}
	}
	
	var item = new Item(tileType)
	items.add(item)
	return item
}

function getLocations( count ) {
	//determine a decent size for the items
	function calcItemSize() {
		var area = areaSize[0] * areaSize[1]
		var itemArea = area / count
		return Math.sqrt(itemArea)
	}	

	var cr
	while(true) {
		var sz = calcItemSize()
		cr = createLocations(areaSize[0], areaSize[1], sz )
		if ((cr.lefts.length + cr.rights.length) > (count+2)) {
			return cr
		}
		//it's really only very unusual layouts (like a strip) where this is ever needed
		sz *= 0.9
	}
}

//stores configuration (this is a default to just show the structure)
var curConfig = { 
	count: 20,
	sizeVariance: 0.3,
	spinFreq: 0.05,
}

/**
	Modify/create all items, positiong them, and creating one duplicate (the target tile).
*/
exports.createLevel = function(config) {
	curConfig = config
	for (var i=0; i < items.length; ++i) {
		items.getAt(i).used = false
	}

	var count = config.count

	var cr = getLocations(count)
	shuffle(cr.lefts)
	shuffle(cr.rights)
	shuffle(tileTypes)
	
	function locs(i) {
		var lcs = i%2 ? cr.lefts : cr.rights
		var ndx = Math.floor(i/2)
		return lcs[ndx]
	}
	
	for (var i=0; i < count; ++i) {
		var loc = locs(i)
		var item = findOrCreateItem(tileTypes[i])
		item.setup( loc[0], loc[1], cr.radius, (i == count-1), config )
	}
	
	//duplicate last item (locations/tiles are shuffled, so this is effenctively a random duplicate)
	var loc = locs( count ) //since one past last will be on alternate side 
	var item = findOrCreateItem(tileTypes[count-1])
	item.setup( loc[0], loc[1], cr.radius, true, config )
	
	//remove unsued items
	for (var i=items.length-1; i >= 0; --i) {
		if (!items.getAt(i).used) {
			items.removeAt(i)
		}
	}
}


function shuffle(array) {
	var counter = array.length;

	while (counter > 0) {
		var index = Math.floor(Math.random() * counter);

		counter--;

		var temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

var areaSize = [0,0]
exports.setSize = function(nAreaSize) {
	var diff = Math.abs(areaSize[0]-nAreaSize[0]) + Math.abs(areaSize[1]-nAreaSize[1])
	areaSize = nAreaSize
	
	//recreate level if it's changed too much (mainly to handle rotation)
	if (diff > 10 && gameState.isRunning()) {
		exports.createLevel(curConfig)
	}
}