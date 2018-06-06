"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = /** @class */ (function () {
    function State() {
        this.data = [];
        this.title = "Hello There";
        for (var i = 0; i < 10; i += 1) {
            this.data.push(i);
        }
    }
    State.prototype.randomize = function () {
        this.data = [];
        for (var i = 0; i < 10; i += 1) {
            this.data.push(Math.random() * 100);
        }
    };
    return State;
}());
exports.default = State;
