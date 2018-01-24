export default class BoxPage {
	constructor() {
		this.emailCount = 0
		this.alert = undefined
		this.important = false;
	}
	
	addEmail() {
		this.emailCount += 1
	}
	clearEmail() {
		this.emailCount = 0
	}

	setAlert() {
		this.alert = "Alert"
	}
	clearAlert() {
		this.alert = ""
	}
		
	setImportant() {
		this.important = true
	}
	clearImportant() {
		this.important = false
	}
}