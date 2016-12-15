Observable = require("FuseJS/Observable")
var pixabay = require("pixabay")

exports.items = Observable()
exports.term = Observable()
exports.loading = Observable(false)

var page = this

page.Parameter.onValueChanged( function(param) {
	exports.term.value = param.term || ""
})

var pageNumber = 1
var pageDone = false

var baseUrl = page.Parameter.map( function(param) {
	var url = pixabay.search + 
		"?key=" + encodeURIComponent(pixabay.key) +
		"&q=" + encodeURIComponent(param.term || "") +
		"&per_page=" + (param.perPage || 40)

	return url
})

baseUrl.onValueChanged( function(url) {
	pageNumber = 1
	pageDone = false
	
	theScroll.gotoRelative(0)
	exports.items.clear()
	search(url)
})

function search(url) {
	console.log( "Search: " + url )
	exports.loading.value = true
	fetch( url ).then( function(resp) {
		
		if (resp.status != 200) {
			console.log( "Failed: " + resp.statusText)
			pageDone = true
		}
		
		var data = resp.json().then( function(data) {
			if (data.hits.length == 0) {
				pageDone = true
			} else {
				
				data.hits.forEach( function(item) {
					exports.items.add(item)
				})
				scrolledToEnd.check()
			}
			
			exports.loading.value = false
		}).catch(function(err) {
		
			exports.loading.value = false
			console.log( "Data Error: " + err)
		})
		
	}).catch(function(err) {
		exports.loading.value = false
		console.log( "Fetch Error: " +  err )
	})
}

exports.onEnd = function() {
	if (pageDone) {
		return
	}
	
	pageNumber++
	search(baseUrl.value + "&page=" + pageNumber)
}

exports.search = function() {
	var p = page.Parameter.value || {}
	p.term = exports.term.value
	page.Parameter.value = p
}

var selected = Observable()
exports.select = function(args) {
	selected.value = args.data
}

exports.goInfo = function() {
	router.push( "info", selected.value )
}
