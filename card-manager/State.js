class Card {
	constructor() {
		this.type = "visa"
		this.name = "BoS Visa"
		this.number = "4859 3948 3948 5723"
		this.cardholder = "Luboš Volkov"
		this.expires = "07/21"
		this.cvc = "123"
	}
}

class PageCard {
	constructor( card ) {
		this.$path = "cardView"
		this.card = card
	}
}
	

class PageListing {
	constructor() {
		this.$path = "listing"
		this.cards = [ new Card(), new Card(), new Card(), new Card() ]
	}
}

export default class State {
	constructor() {
		this.pages = [ new PageListing() ]
	}
	
	gotoCard(args) {
		this.pages.push( new PageCard(args.data) )
	}
	
	goBack() {
		if (this.pages.length > 1) {
			this.pages.pop()
		}
	}
}