class PageLogin {
	constructor() {
		this.email = "login@smply.com"
		this.password = "1231312321"
	}

	get inputValid() {
		return this.email != "" && this.password != ""
	}
	
	forgotPassword() {
	}	
}

class PageRegister {
	constructor() {
		this.email = "sample@smply.com"
		this.password = "1231312321"
		this.password2 = ""
	}
	
	get inputValid() {
		return this.email != "" && this.password != "" &&
			this.password == this.password2
	}
}

export default class MainState {
	constructor() {
		this.title ="Login Transitions"
		
		this.loginPages = [  new PageLogin(), new PageRegister() ]
	}
}