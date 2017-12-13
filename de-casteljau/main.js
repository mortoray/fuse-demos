var Observable = require("FuseJS/Observable")

var points = [[0,0.8], [0.2,0.3], [0.9,0], [1,1]]
exports.points4 = Observable( )
exports.points4.replaceAll( points )

exports.points3 = Observable()
exports.points2 = Observable()
exports.points1 = Observable()
	
function recalc(t) {
	var p3 = deCasteljau( points, t )
	var p2 = deCasteljau( p3, t )
	var p1 = deCasteljau( p2, t )
	
	exports.points3.replaceAll( p3 )
	exports.points2.replaceAll( p2 )
	exports.points1.replaceAll( p1 )
}

exports.t = Observable(0.5)
recalc(exports.t.value)


function lerp( a, b, t ) {
	var q = []
	for (var i=0; i < a.length; ++i) {
		q[i] = a[i] * (1-t) + b[i] * t
	}
	return q
}

function deCasteljau( pts, t ) {
	var next = []
	for (var i=0; i < pts.length - 1; ++i ) {
		next.push( lerp(pts[i], pts[i+1], t) )
	}
	return next
}

exports.t.onValueChanged( module, recalc )

