export default class State {
	title : string
	data : number[] = []
	
	constructor() {
		this.title = "Hello There"
		
		for (var i=0; i < 10; i += 1) {
			this.data.push(i)
		}
	}
	
	randomize() {
		this.data = []
		for (var i=0; i < 10; i += 1) {
			this.data.push( Math.random() * 100 )
		}
	}
}
