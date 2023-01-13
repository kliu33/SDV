/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log(\"Webpack is working!\");\r\n\r\nconst MovingObject = __webpack_require__(/*! ./movingobject.js */ \"./src/movingobject.js\");\r\n\r\nMovingObject.prototype.draw = function(ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this. pos[1], this.radius, 0, Math.PI * 2, true);\r\n    ctx.strokeStyle = this.color;     // possibly `${this.color}\r\n    ctx.lineWidth = 3;                // possibly remove lines 11 &12\r\n    ctx.stroke();\r\n    ctx.fillStyle = this.color;\r\n    ctx.fill();\r\n}\r\n\r\nMovingObject.prototype.move = function(ctx){\r\n    ctx.clearRect(0, 0, 600, 600)\r\n    ctx.fillStyle = \"black\";\r\n    ctx.fillRect(0, 0, 600, 600)\r\n    this.pos[0] += this.vel[0]\r\n    this.pos[1] += this.vel[1]\r\n    this.draw(ctx)\r\n}\r\n\r\nwindow.MovingObject = MovingObject;\r\n\n\n//# sourceURL=webpack://asteroid/./src/index.js?");

/***/ }),

/***/ "./src/movingobject.js":
/*!*****************************!*\
  !*** ./src/movingobject.js ***!
  \*****************************/
/***/ ((module) => {

eval("function MovingObject(pos, vel, radius, color) {\r\n  this.pos = pos;\r\n  this.vel = vel;\r\n  this.radius = radius;\r\n  this.color = color;\r\n}\r\n\r\n\r\n\r\nmodule.exports = MovingObject;\r\n\n\n//# sourceURL=webpack://asteroid/./src/movingobject.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;