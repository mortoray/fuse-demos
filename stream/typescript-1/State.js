"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var currency = __importStar(require("./Currency"));
function formatCurrency(currency) {
    switch (currency) {
        case "EUR": return "€";
        case "USD": return "$";
        case "GBP": return "£";
    }
    return currency;
}
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.prototype.formatCurrency = function (mv) {
        if (this.showCurrency == undefined) {
            return mv.value + " " + formatCurrency(mv.currency);
        }
        var fx = currency.getExchange(mv.currency, this.showCurrency);
        if (fx == undefined) {
            return "?";
        }
        return (mv.value * fx).toFixed(2) + " " + formatCurrency(this.showCurrency);
    };
    return Config;
}());
var config = new Config();
var MoneyValue = /** @class */ (function () {
    function MoneyValue(value, currency) {
        this.value = value;
        this.currency = currency;
    }
    Object.defineProperty(MoneyValue.prototype, "formatted", {
        get: function () {
            return this.value + " " + formatCurrency(this.currency);
        },
        enumerable: true,
        configurable: true
    });
    return MoneyValue;
}());
var Monies = /** @class */ (function () {
    function Monies() {
    }
    Monies.EUR = function (value) {
        return new MoneyValue(value, "EUR");
    };
    Monies.USD = function (value) {
        return new MoneyValue(value, "USD");
    };
    Monies.CAD = function (value) {
        return new MoneyValue(value, "CAD");
    };
    return Monies;
}());
var Item = /** @class */ (function () {
    function Item(name, image, value, tags) {
        this.name = name;
        this.image = image;
        this.value = value;
        this.tags = tags;
    }
    Object.defineProperty(Item.prototype, "formattedCurrent", {
        get: function () {
            return config.formatCurrency(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Item.prototype.update = function () {
    };
    return Item;
}());
var State = /** @class */ (function () {
    function State() {
        var _this = this;
        this.showCurrency = [];
        this.config = config;
        this.title = "Typey Woo!";
        this.items = [
            new Item("Rickety Rocket", "Assets/rocket.png", Monies.EUR(13), ['fast', 'cool']),
            new Item("Black  Bowling Ball", "Assets/bowling.png", Monies.USD(9), ['fast', 'noisy']),
            new Item("Clicking  Tock Clock", "Assets/clock.png", Monies.EUR(1), ['slow', 'noisy']),
            new Item("Mountainous Mountain", "Assets/mountain.png", Monies.CAD(1), ['slow', 'cool']),
        ];
        this.currencies = ["USD", "EUR", "GBP"];
        currency.addWatcher(function (s, v) { _this.updatedCurrency(s, v); });
    }
    State.prototype.currencyChanged = function () {
        if (this.showCurrency.length == 0) {
            this.config.showCurrency = undefined;
        }
        else {
            this.config.showCurrency = this.showCurrency[0];
        }
        this.updateItems();
    };
    State.prototype.updateItems = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var v = _a[_i];
            v.update();
        }
    };
    //TYPESCRIPT: no way to mark variable as ignored/unused
    State.prototype.updatedCurrency = function (sym, value) {
        exports.ignore = sym;
        exports.ignore = value;
        this.updateItems();
    };
    return State;
}());
exports.default = State;
