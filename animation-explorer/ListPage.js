var itemId = 0
class Item {
	constructor() {
		this.id = itemId++
	}
}

class ChatItem extends Item {
	constructor() {
		super()
		this.type ="chat"
		this.loading = true
		setTimeout( () => {
			this.clearLoad()
		}, Math.random() * 2000 + 1000)
	}
	
	clearLoad() {
		this.loading = false
	}
}

class AdItem extends Item {
	constructor() {
		super()
		this.type = "ad"
	}
}

export default class ListPage {
	constructor() {
		this.items = [ new ChatItem(), new ChatItem(), new ChatItem() ]
		this.adLoc = 0
		this.isLoading = false
	}
	
	remove( args ) {
		let ndx = this.items.indexOf( args.data )
		this.items.splice( ndx, 1 )
	}
	
	add() {
		this.items.push( new ChatItem() )
	}
	
	insert() {
		this.items.splice( 1, 0, new ChatItem() )
	}
	
	insertAd() {
		this.items.splice( this.adLoc, 0, new AdItem() )
		this.adLoc += 2
	}
	
	clear() {
		this.items = []
		this.adLoc = 0
	}
	
	reload() {
		this.isLoading = true
		setTimeout( () => {
			this.isLoading = false
			this.items = [ new ChatItem(), new ChatItem(), new ChatItem() ]
		}, 5000)
	}
}
