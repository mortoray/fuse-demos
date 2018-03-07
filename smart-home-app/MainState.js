class Item {
	constructor( type, name, color, icon, energy ) {
		this.type = type
		this.name = name
		this.color = color
		this.energy = energy
		this.icon = icon
		
		this.status = true
		this.level = 0.7
		this.statusString = "Playing Good Song..."
	}
	
	toggleStatus() {
		this.status = !this.status
	}
	
	controlBack() {
		//device.sendControl( "BACK" )
	}
	controlPause() {
	}
	controlNext() {
	}
}

class ItemPage {
	constructor( item ) {
		this.$path = "item"
		this.item = item
	}
}
	

class Room {
	constructor(name, color, icon, items) {
		this.name = name
		this.color = color 
		this.icon = icon
		this.items = items
	}
	
	get totalEnergy() {
		return this.items.reduce( (a,b) => a + b.energy, 0 )
	}
	
	addItem() {
		this.items.push( new Item( "generic", "Switch", "#2769ff", "👾", 5 ) )
	}
}
	
class Selector {
	constructor(mainState) {
		this.$path = "selector"
		this.mainState = mainState
		
		this.rooms = [ 
			new Room( "Bedroom", "#215eF9", "🛏", [
				new Item( "light","Light", "#ffc42e", "💡", 25 ),
				new Item( "generic","Fan", "#c4ff2e", "🌬", 15 ),
				new Item( "generic","Air Conditioner", "#2769ff", "❄️", 37 ),
				new Item( "generic","Television", "#aa88ff", "📺", 15 ),
				new Item( "generic","Computer", "#ffc42e", "🖥", 25 ),
				new Item( "generic","Playstation", "#2769ff", "🎮", 37 ),
			] ),
			new Room( "Dining Room", "#29e27f", "🍲", [
				new Item( "light","Light", "#ffc42e", "💡", 25 ),
				new Item( "generic","Air Conditioner", "#2769ff", "❄️", 37 ),
				new Item( "generic","Television", "#aa88ff", "📺", 15 ),
				new Item( "stereo","Stereo", "#c4ff2e", "🎵", 15 ),
			] ),
			new Room( "Kitchen", "#7f29e2", "🔌", [
				new Item( "light","Light", "#ffc42e", "💡", 25 ),
				new Item( "generic","Fan", "#c4ff2e", "🌬", 15 ),
				new Item( "generic","Water Heater", "#c4ff2e", "☀️", 15 ),
				new Item( "generic","Fridge", "#2769ff", "💧", 37 ),
				new Item( "generic","Washing Machine", "#aa88ff", "🎰", 15 ),
				new Item( "generic","Microwave", "#ffc42e", "😞", 25 ),
			] ),
			new Room( "Storage", "#7f7f7f","📦", [
				new Item( "light","Light", "#ffc42e", "💡", 25 ),
				new Item( "generic","Heater", "#c4ff2e", "☀", 0 ),
				new Item( "generic","Distiller", "#FEBF2A", "🥃", 0 ),
			] ),
		]
		
		this.selectedRoom = this.rooms[0]
	}
	
	selectRoom(args) {
		this.selectedRoom = args.data
	}
	
	goItem(args) {
		this.mainState.push( new ItemPage(args.data) )
	}
}

class Welcome {
	constructor() {
		
	}
}

export default class MainState {
	constructor() {
		this.selector = new Selector(this)
		this.welcome = new Welcome()
		
		this.pages = [ this.welcome ]
	}
	
	goSelector() {
		this.pages = [ this.selector ]
	}
	
	push( page ) {
		this.pages.push( page )
	}
}
