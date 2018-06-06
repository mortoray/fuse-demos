"use strict";
//can return undefined
//TODO: why doesn't this work
//var fxMap : Map<string, Map<string, number>> = new Map<string, Map<string, number>>
Object.defineProperty(exports, "__esModule", { value: true });
// where stirng is From_To standard currency exchange format
var fxMap = new Map();
var fxLoading = new Map();
var watchers = [];
function addWatcher(callback) {
    watchers.push(callback);
}
exports.addWatcher = addWatcher;
function getExchange(from, to) {
    var sym = from + "_" + to;
    var val = fxMap.get(sym);
    if (val == undefined) {
        loadRate(sym);
    }
    return val;
}
exports.getExchange = getExchange;
function storeRate(sym, value) {
    fxMap.set(sym, value);
    for (var _i = 0, watchers_1 = watchers; _i < watchers_1.length; _i++) {
        var w = watchers_1[_i];
        w(sym, value);
    }
}
function loadRate(sym) {
    if (fxLoading.get(sym) == true) {
        return;
    }
    fxLoading.set(sym, true);
    var url = "https://free.currencyconverterapi.com/api/v5/convert?q=" + sym + "&compact=y";
    console.log("Getting " + url);
    fetch(url).
        then(function (response) {
        return response.json();
    }).
        then(function (json) {
        console.dir(json);
        fxLoading.set(sym, false);
        storeRate(sym, json[sym].val);
    }).
        catch(function (err) {
        fxLoading.set(sym, false);
        //just for testing to see that the rest is working
        setTimeout(function () {
            storeRate(sym, Math.random() + 0.5);
        }, 1000 * (Math.random() + 1));
        console.log(err.message);
    });
}
