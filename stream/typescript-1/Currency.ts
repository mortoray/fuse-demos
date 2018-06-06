//can return undefined
//TODO: why doesn't this work
//var fxMap : Map<string, Map<string, number>> = new Map<string, Map<string, number>>

// where stirng is From_To standard currency exchange format
var fxMap : Map<string, number> = new Map<string, number>()
var fxLoading : Map<string, boolean> = new Map<string, boolean>()

type WatcherCallback = ( sym : string, value : number ) => void
var watchers : WatcherCallback[] = []

export function addWatcher( callback :  WatcherCallback ) {
	watchers.push( callback )
}

export function getExchange( from : string, to : string ) : number | undefined {
	let sym = `${from}_${to}`
	let val = fxMap.get(sym)
	if( val == undefined ) {
		loadRate(sym)
	}
	
	return val
}

function storeRate( sym : string, value : number ) {
	fxMap.set( sym, value )
	for( let w of watchers ) {
		w(sym, value)
	}
}

function loadRate( sym : string ) {
	if( fxLoading.get(sym) == true ) {
		return
	}
	
	fxLoading.set(sym, true)
	let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${sym}&compact=y`
	console.log( "Getting " + url )
	fetch( url ).
		then( function(response) {
			return response.json()
		}).
		then( function(json) {
			console.dir(json)
			fxLoading.set(sym, false)
			storeRate( sym, json[sym].val )
		}).
		catch( function(err) {
			fxLoading.set(sym, false)
			//just for testing to see that the rest is working
			setTimeout( () => {
				storeRate( sym, Math.random() + 0.5)
			}, 1000 * (Math.random()+1) )
			console.log(err.message)
		})
}

