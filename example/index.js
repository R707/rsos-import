/**
 * Created by cavasblack on 16/10/20.
 */
"use strict"
var Import = require("../lib")

var m = new Import(__dirname);

console.log(m.load("").done())