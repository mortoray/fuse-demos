import * as currency from "./Currency"

function formatCurrency( currency : string ) : string {
	switch( currency ) {
		case "EUR": return "€";
		case "USD": return "$";
		case "GBP": return "£";
	}
	return currency;
}

class Config {
	//if undefined do no conversion
	showCurrency? : string
	
	formatCurrency( mv : MoneyValue ) : string {
		if( this.showCurrency == undefined ) {
			return `${mv.value} ${formatCurrency(mv.currency)}`
		}
		
		var fx = currency.getExchange(mv.currency, this.showCurrency)
		if( fx == undefined ) {
			return "?"
		}
		return `${(mv.value*fx).toFixed(2)} ${formatCurrency(this.showCurrency)}`
	}
}
var config : Config = new Config()

class MoneyValue {
	get formatted() : string {
		return `${this.value} ${formatCurrency(this.currency)}`
	}
	
	constructor( 
		public readonly value :number, 
		public readonly currency : string ) {
	}
}

class Monies {
	static EUR( value : number ) : MoneyValue {
		return new MoneyValue( value, "EUR" )
	}
	
	static USD( value : number ) : MoneyValue {
		return new MoneyValue( value, "USD" )
	}
	
	static CAD( value : number ) : MoneyValue {
		return new MoneyValue( value, "CAD" )
	}
}

class Item {
	constructor( 
		public name : string, 
		public image : string, 
		public value : MoneyValue, 
		public tags : string[] ) {
	}
	
	get formattedCurrent() : string {
		return config.formatCurrency(this.value)
	}
	
	update() {
	}
}

export default class State {
	title : string
	items : Item[]
	currencies : string[]
	showCurrency : string[] = []
	config : Config
	
	constructor() {
		this.config = config
		this.title = "Typey Woo!"
		this.items = [
			new Item( "Rickety Rocket", "Assets/rocket.png", 
				Monies.EUR(13),
				[ 'fast', 'cool' ] ),
			new Item( "Black  Bowling Ball", "Assets/bowling.png", 
				Monies.USD(9),
				[ 'fast', 'noisy' ] ),
			new Item( "Clicking  Tock Clock", "Assets/clock.png", 
				Monies.EUR(1),
				[ 'slow', 'noisy' ] ),
			new Item( "Mountainous Mountain", "Assets/mountain.png", 
				Monies.CAD(1),
				[ 'slow', 'cool' ] ),
		]
		
		this.currencies = [ "USD", "EUR", "GBP" ]
		
		currency.addWatcher( (s,v) => { this.updatedCurrency(s,v) } )
	}	
	
	currencyChanged() {
		if( this.showCurrency.length == 0 ) {
			this.config.showCurrency = undefined
		} else {
			this.config.showCurrency = this.showCurrency[0]
		}
		
		this.updateItems()
	}
	
	updateItems() {
		for( let v of this.items ){
			v.update()
		}
	}
	
	//TYPESCRIPT: no way to mark variable as ignored/unused
	updatedCurrency( sym : string, value : number ) {
		ignore = sym
		ignore = value
		this.updateItems()
	}
}

export var ignore : any
