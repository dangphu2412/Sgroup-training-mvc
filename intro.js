"use strict";
/***
 * Data type
 */
function tester() {
    console.log('Im tester');
}
function runCallback(cb) {
    cb();
}
runCallback(tester);
var dataType = 'asd';
var arr1 = [1, 2];
var arr2 = [1, 2];
var arr3 = [1, 'asd', true, function () { }];
var k = {
    'asd': 'asd'
};
console.log(dataType);
var animal = {
    name: 'Fus',
    type: 'human',
    age: 18
};
var mapAnimal = {
    'asd': {
        name: 'Fus',
        type: 'human',
        age: 18
    }
};
function checkAnimal(sucvak) {
    return sucvak.name + " is a " + sucvak.type + " have age: " + sucvak.age;
}
checkAnimal(animal);
var NormalDuck = /** @class */ (function () {
    function NormalDuck() {
    }
    NormalDuck.prototype.quack = function () {
        console.log('Quack quack im a normal duck');
    };
    return NormalDuck;
}());
var SkyDuck = /** @class */ (function () {
    function SkyDuck() {
    }
    SkyDuck.prototype.fly = function () {
        throw new Error("Method not implemented.");
    };
    SkyDuck.prototype.quack = function () {
        throw new Error("Method not implemented.");
    };
    return SkyDuck;
}());
