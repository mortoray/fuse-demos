class Item {
	constructor( name, color, icon, energy ) {
		this.name = name
		this.color = color
		this.energy = energy
		this.icon = icon
	}
}

class Room {
	constructor(name, color, icon, cnt) {
		this.name = name
		this.color = color 
		this.icon = icon
		
		this.items = [
			new Item( "Light", "#ffc42e", "💡", 25 ),
			new Item( "Fan", "#c4ff2e", "🌬", 15 ),
			new Item( "Air Conditioner", "#2769ff", "❄️", 37 ),
			new Item( "Television", "#aa88ff", "📺", 15 ),
			new Item( "Computer", "#ffc42e", "🖥", 25 ),
			new Item( "Water Heater", "#c4ff2e", "☀️", 15 ),
			new Item( "Fridge", "#2769ff", "💧", 37 ),
			new Item( "Washing Machine", "#aa88ff", "🎰", 15 ),
			new Item( "Microwave", "#ffc42e", "😞", 25 ),
			new Item( "Stereo", "#c4ff2e", "🎵", 15 ),
			new Item( "Playstation", "#2769ff", "🎮", 37 ),
		]
		this.items.splice( 0, this.items.length - cnt )
	}
	
	get totalEnergy() {
		return this.items.reduce( (a,b) => a + b.energy, 0 )
	}
	
	addItem() {
		this.items.push( new Item( "Playstation", "#2769ff", "🎮", 37 ) )
	}
}
	
export default class MainState {
	constructor() {
		this.rooms = [ new Room( "Bedroom", "#215eF9", "🛏", 3 ),
			new Room( "Dining Room", "#29e27f", "🍲", 5 ),
			new Room( "Appliances", "#7f29e2", "🔌", 11 ),
		]
		
		this.selectedRoom = this.rooms[0]
	}
	
	selectRoom(args) {
		this.selectedRoom = args.data
	}
}
