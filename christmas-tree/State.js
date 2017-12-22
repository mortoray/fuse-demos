class Ornament {
	constructor( x, y, defn ) {
		this.x = x
		this.y = y
		this.defn = defn
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
	constructor( x, y, defn ) {
		this.x = x
		this.y = y
		this.defn = defn
	}
}

class OrnamentDefn {
	constructor( height, anchorY ) {
		this.height =  height
		this.anchorY = anchorY
		// set below in loop
		// this.id
		// this.image
	}
}

var ornaments = {
	"bulb0": new OrnamentDefn( 0.07, 0.15 ),
	"bulb1": new OrnamentDefn( 0.07, 0.15 ),
	"bulb2": new OrnamentDefn( 0.07, 0.15 ),
	"bulb3": new OrnamentDefn( 0.07, 0.15 ),
	"candle0": new OrnamentDefn( 0.12, 0.98 ),
	"candle1": new OrnamentDefn( 0.12, 0.98 ),
}
var ornamentsVector = []
for (var id in ornaments) {
	var orn = ornaments[id]
	orn.id = id
	orn.image = id
	ornamentsVector.push(orn)
}

class GiftDefn {
	constructor( ) {
	}
}
var gifts = {
	"gift0": new GiftDefn(),
	"gift1": new GiftDefn(),
	"gift2": new GiftDefn(),
	"gift3": new GiftDefn(),
}
var giftsVector = []
for (var id in gifts) {
	var gift = gifts[id]
	gift.id = id
	gift.image = id
	giftsVector.push(gift)
}	

var snowflakes = ["snowflake0", "snowflake1","snowflake2","snowflake3","snowflake4",
	"snowflake5","snowflake6" ]

export default class State {
	constructor() {
		this.clear()
		this._treeSize = { }
		this.availableOrnaments = ornamentsVector
		this.selectedOrnamentId = ornamentsVector[0].id
		
		this.availableGifts = giftsVector
		this.selectedGiftId = giftsVector[0].id
		
		this.paletteIndex = 0
	}
	
	clear() {
		this.ornaments = [ ]
		this.snowflakes = [ ]
		this.gifts = []
	}
	
	get selectedOrnament() {
		return ornaments[this.selectedOrnamentId]
	}
	
	addOrnament(args) {
		let x = args.localX / this._treeSize.x
		let y = args.localY / this._treeSize.y
		
		var ornament = new Ornament(x,y, this.selectedOrnament)
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
	
	get selectedGift() {
		return gifts[this.selectedGiftId]
	}
	
	addGift(args) {
		let x = args.localX / this._giftsSize.x
		let y = args.localY / this._giftsSize.y
		let defn = this.selectedGift
		this.gifts.push( new Gift( x, y, defn ) )
	}
	
	get frontGifts() {
		return this.gifts.filter( gift => gift.y > 0.3 )
	}
	get backGifts() {
		return this.gifts.filter( gift => gift.y <= 0.3 )
	}
	
	
}