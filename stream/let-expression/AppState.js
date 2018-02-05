export default class AppState {
	constructor() {
		this.title = "Fuse Coding"
		this.count = 0
		this.maxCount = 100
	}
	
	incr() {
		this.count += 5
		if( this.count >= this.maxCount ) {
			this.count -= this.maxCount
		}
	}
}
