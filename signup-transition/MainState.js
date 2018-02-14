class PageLogin {
	constructor(mainState) {
		this.mainState = mainState
		this.email = "login@smply.com"
		this.password = "1231312321"
	}

	get inputValid() {
		return this.email != "" && this.password != ""
	}
	
	forgotPassword() {
	}	
	
	action() {
		this.mainState.gotoLoading()
		setTimeout( () => { this.mainState.gotoHome() }, 1000 )
	}
}

class PageRegister {
	constructor(mainState) {
		this.mainState = mainState
		this.email = "sample@smply.com"
		this.password = "1231312321"
		this.password2 = ""
	}
	
	get inputValid() {
		return this.email != "" && this.password != "" &&
			this.password == this.password2
	}
	
	action() {
		//TODO: implement
	}
}

class PageLogout {
	constructor(mainState) {
		this.$path = 'logout'
		this.mainState = mainState
		this.loginPages = [  new PageLogin(mainState), new PageRegister(mainState) ]
	}
}

class PageLoading {
	constructor(mainState) {
		this.$path = 'loading'
	}
}

class PageHome {
	constructor(mainState) {
		this.mainState = mainState
		this.$path = 'home'
		
		this.items = [ {
			name: "Ricky Bass",
			status: "Pending", 
			date: "13 Apr 2017 10:13 AM", 
			amount: "$2348.85"
		},{
			name: "Katie Roy",
			status: "Denied", 
			date: "12 Apr 2017 11:13 AM", 
			amount: "$148.27"
		},{
			name: "Tom Tailor",
			status: "Accepted", 
			date: "11 Apr 2017 8:13 AM", 
			amount: "$348.45"
		}]
	}
}

export default class MainState {
	constructor() {
		this.title ="Login Transitions"
		
		this.mainPages = [ new PageLogout(this) ] 
	}
	
	gotoLoading() {
		this.mainPages[0] = new PageLoading(this)
	}
	
	gotoHome() {
		this.mainPages.splice(0, this.mainPages.length, new PageHome(this))
		//this.mainPages.pop();
		//this.mainPages[0] = new PageHome(this)
	}
	
	logout() {
		this.mainPages = [ new PageLogout(this) ]
	}
}
