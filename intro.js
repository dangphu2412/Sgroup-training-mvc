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
