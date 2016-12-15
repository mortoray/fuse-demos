var Observable = require("FuseJS/Observable")

console.log( "Huh" )
console.dir(this.Parameter.value)

exports.data = this.Parameter.map( function(param) {
	console.log( "Mapping!" )
	console.dir(param)
	param.size = param.imageWidth + " x " + param.imageHeight
	return param
})

exports.goBack = function() {
	router.goBack()
}