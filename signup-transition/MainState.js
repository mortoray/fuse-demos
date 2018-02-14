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
		this.$navigationRequest = {
			transition: 'Transition',
			style: 'Push',
		}
	}
}

export default class MainState {
	constructor() {
		this.title ="Login Transitions"
		
		this.mainPages = [ new PageLogout(this) ] 
		//this.mainPages = [ new PageLoading(this) ]
	}
	
	gotoLoading() {
		//TODO: replace with Goto
		//this.mainPages[0] = new PageLoading(this)
		this.mainPages.push( new PageLoading(this) )
	}
	
	gotoHome() {
		//TODO: something weird here
		//this.mainPages.pop();
		//this.mainPages[0] = new PageHome(this)
		//this.mainPages = [ new PageHome(this) ]
		this.mainPages.push( new PageHome(this) );
	}
	
	logout() {
		this.mainPages = [ new PageLogout(this) ]
	}
}

/**
File name: FuseJS/Internal/zone.js
Line number: 196
Script stack trace: Error: Internal error: Attempted to detach child that is not attached to us
    at removeAsParentFrom (FuseJS/Internal/Model.js:320:12)
    at Object.meta.diff (FuseJS/Internal/Model.js:250:7)
    at update (FuseJS/Internal/Model.js:392:15)
    at Object.meta.diff (FuseJS/Internal/Model.js:266:6)
    at update (FuseJS/Internal/Model.js:392:15)
    at Object.meta.diff (FuseJS/Internal/Model.js:266:6)
    at FuseJS/Internal/Model.js:212:11
    at ZoneDelegate.invokeTask (FuseJS/Internal/zone.js:425:31)
    at Zone.runTask (FuseJS/Internal/zone.js:192:47)
    at ZoneTask.invokeTask (FuseJS/Internal/zone.js:499:34)
<---

*/