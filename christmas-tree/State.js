class Ornament {
	constructor( x, y, image, height ) {
		this.x = x
		this.y = y
		this.image = image
		this.height = height
	}
}

var snowflakeId = 0
class Snowflake {
	constructor( x, y, image ) {
		this.x = x
		this.y = y
		this.image = image
		this.id = snowflakeId++
	}
}

class Gift {
	constructor( x, y, image ) {
		this.x = x
		this.y = y
		this.image = image
	}
}

var bulbs = [ "bulb0", "bulb1", "bulb2", "bulb3" ]
var candles = [ "candle0", "candle1" ]
var snowflakes = ["snowflake0", "snowflake1","snowflake2","snowflake3","snowflake4",
	"snowflake5","snowflake6" ]
var gifts = [ "gift0", "gift1", "gift2", "gift3" ]

export default class State {
	constructor() {
		this.clear()
		this._treeSize = { }
		this.bulbs = bulbs
		this.selectedBulb = bulbs[0]
		
		this.candles = candles
		this.selectedCandle = candles[0]
		
		this.paletteIndex = 0
	}
	
	clear() {
		this.ornaments = [ ]
		this.snowflakes = [ ]
		this.gifts = []
	}
	
	addOrnament(args) {
		let x = args.localX / this._treeSize.x
		let y = args.localY / this._treeSize.y
		
		if (this.paletteIndex == 0) {
			var ornament = new Ornament(x,y, this.selectedBulb, 0.07)
		} else if (this.paletteIndex == 1) {
			var ornament = new Ornament(x,y, this.selectedCandle, 0.12)
		}
		this.ornaments.push( ornament )
	}
	
	treePlaced(args) {
		this._treeSize = { 
			x: args.width, 
			y: args.height,
		}
	}
	
	addSnowflake(args) {
		let x = args.localX / this._fullSize.x
		let y = args.localY / this._fullSize.y
		let image = snowflakes[ Math.floor(Math.random() * snowflakes.length )]
		this.snowflakes.push( new Snowflake( x, y, image ) )
	}
	
	fullPlaced(args) {
		this._fullSize = {
			x: args.width,
			y: args.height,
		}
	}
	
	removeSnowflake(args) {
		var index = this.snowflakes.indexOf( args.data )
		this.snowflakes.splice(index, 1)
		let x = Math.random()
		let y = -0.05
		let image = snowflakes[ Math.floor(Math.random() * snowflakes.length )]
		this.snowflakes.push( new Snowflake( x, y, image ) )
	}
	
	giftsPlaced(args) {
		this._giftsSize = {
			x: args.width,
			y: args.height,
		}
	}
	
	addGift(args) {
		let x = args.localX / this._giftsSize.x
		let y = args.localY / this._giftsSize.y
		let image = gifts[ Math.floor(Math.random() * gifts.length )]
		this.gifts.push( new Gift( x, y, image ) )
	}
	
	get frontGifts() {
		return this.gifts.filter( gift => gift.y > 0.3 )
	}
	get backGifts() {
		return this.gifts.filter( gift => gift.y <= 0.3 )
	}
	
	
}