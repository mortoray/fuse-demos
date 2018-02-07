var moment = require( "lib/moment.js" )

function formatHours( dur ) {
	var pad = "00"
	return Math.floor(dur) + ":" + (pad + Math.floor((dur %1)*60)).slice(-pad.length)
}

class TimeItem {
	constructor(name, icon, color, value) {
		this.name = name
		this.color = color
		this.value = value
		this.icon = icon
		
		//simulate some data
		this.timeStart = moment().subtract( -(Math.random() *10), 'hours' )
		this.timeEnd = this.timeStart.clone().add( value*300, 'minutes' )
	}
	
	get hours() {
		return moment.duration(this.timeEnd.diff(this.timeStart)).asHours()
	}
	
	get durationStr() {
		return formatHours(this.hours)
	}
	
	get startStr() {
		return this.timeStart.format( "HH:MM" )
	}
	
	get endStr() {
		return this.timeEnd.format( "HH:MM" )
	}
	
}

class PageDetails {
	constructor( collection ) {
		this.item = collection
		this.productivity = Math.floor(Math.random() * 500) / 60
	}
	
	get prodStr() {
		return formatHours(this.productivity)
	}
}

class TimeCollection {
	constructor( name ) {
		this.name = name
		this.values = [ 
			new TimeItem("Sketch", "S", "#1F8", Math.random() ), 
			new TimeItem("Dribbble", "D", "#F1F", Math.random() ), 
			new TimeItem("Learning", "L", [1.0, 0.8, 0.1], Math.random() ), 
			new TimeItem("Chat", "C", "#18F", Math.random() ),
			new TimeItem("Sport", "P", "#F81", Math.random() ),
			new TimeItem("TV", "T", "#888", Math.random() ),
		]
	}
	
	get sortedValues() {
		var q = this.values.slice()
		q.sort( (a,b) => b.hours - a.hours )
		return q
	}
}

class PageOverview {
	constructor() {
		this.days = [
			new TimeCollection( "Friday" ),
			new TimeCollection( "Thursday" ),
			new TimeCollection( "Wednesday" ),
			new TimeCollection( "Tuesday" ),
			new TimeCollection( "Monday" ),
			new TimeCollection( "Sunday" ),
			new TimeCollection( "Saturday" ),
		]
		
		this.weeks = [
			new TimeCollection( "1 Jan" ),
			new TimeCollection( "8 Jan" ),
			new TimeCollection( "15 Jan" ),
			new TimeCollection( "22 Jan" ),
			new TimeCollection( "29 Jan" ),
			new TimeCollection( "5 Feb" ),
			new TimeCollection( "12 Feb" ),
			new TimeCollection( "19 Feb" ),
			new TimeCollection( "26 Feb" ),
		]
		
		this.months = [
			new TimeCollection( "December" ),
			new TimeCollection( "November" ),
			new TimeCollection( "October" ),
			new TimeCollection( "September" ),
			new TimeCollection( "August" ),
			new TimeCollection( "July" ),
		]
	}
}

export default class MainState {
	constructor() {
		this.pages = [ new PageOverview() ]
	}
	
	showItem( args ) {
		var item = args.data
		this.pages.push( new PageDetails(item) )
	}
	
	goBack() {
		this.pages.pop()
	}
}
