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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ \"./src/modules/dom.js\");\n\n\nconsole.log(_modules_dom__WEBPACK_IMPORTED_MODULE_0__.test);\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   test: () => (/* binding */ test)\n/* harmony export */ });\nconst {player, ship, gameboard} = __webpack_require__(/*! ./logic */ \"./src/modules/logic.js\");\n\nfunction gameControl() {\n\n    // Player 1 ships and gameboard\n    const player1 = player();\n    const player1_ship1 = ship(4);\n    const player1_ship2 = ship(3);\n    const player1_ship3 = ship(3);\n    const player1_ship4 = ship(2);\n    const player1_ship5 = ship(2);\n    const player1_ship6 = ship(2);\n    const player1_ship7 = ship(1);\n    const player1_ship8 = ship(1);\n    const player1_ship9 = ship(1);\n    const player1_ship10 = ship(1);\n\n    // (horizontal, vertical)\n    // Place ships on predetermined coordinates on the gameboard for now\n    player1.gameboard.placeShip(player1_ship1, 1, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship2, 2, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship3, 3, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship4, 4, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship5, 5, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship6, 6, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship7, 7, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship8, 8, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship9, 9, 1, true); // Place horizontally\n    player1.gameboard.placeShip(player1_ship10, 10, 1, true); // Place horizontally\n}\n\nconst test = \"Test!\";\n\n//# sourceURL=webpack://odin-battleship/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/logic.js":
/*!******************************!*\
  !*** ./src/modules/logic.js ***!
  \******************************/
/***/ ((module) => {

eval("function ship(length) {\n    if (length <= 0) {\n        throw new Error(\"Ship length must be greater than zero.\");\n    }\n\n    return {\n        length: length,\n        timesShot: 0,\n        hit() {\n            if (this.timesShot >= this.length) {\n                return \"Ship has already been destroyed.\";\n            }\n            this.timesShot += 1;\n            if (this.isSunk()) {\n                return \"Ship has been sunk!\";\n            }\n            return \"Hit!\";\n        },\n        isSunk() {\n            return this.timesShot >= this.length;\n        },\n    };\n}\n\nfunction gameboard() {\n    const ships = {}; // Tracks all ship objects\n    const shipCoordinates = {}; // Tracks all ships' positions\n    const shotCoordinates = []; // Tracks missed shots\n\n    return {\n        shipCoordinates,\n        shotCoordinates,\n        shipNumbers: 0,\n        missedAttacks: 0,\n        placeShip(ship, startingPointX, startingPointY, isHorizontal) {\n          if((ship.length + startingPointX - 1) > 10 && !isHorizontal ||\n            (ship.length + startingPointY - 1) > 10 && isHorizontal) {\n                return \"out of bounds\";\n            }\n\n            let newCoordinates = [];\n            for (let i = 0; i < ship.length; i++) {\n                let x = isHorizontal ? startingPointX : startingPointX + i;\n                let y = isHorizontal ? startingPointY + i : startingPointY;\n                let coordinate = `${x},${y}`;\n\n                for (const coords of Object.values(shipCoordinates)) {\n                    if (coords.includes(coordinate)) {\n                        return \"Coordinates are already occupied\";\n                    }\n                }\n                newCoordinates.push(`${x},${y}`);\n            }\n\n            this.shipNumbers++;\n            let shipName = `ship${this.shipNumbers}`;\n            shipCoordinates[shipName] = newCoordinates;\n            ships[shipName] = ship; // Store the actual ship object\n\n            return \"Ship placed successfully\";\n        },\n        receiveAttack(x, y) {\n            let coordinate = `${x},${y}`;\n\n            if (shotCoordinates.includes(coordinate)) {\n                return \"Coordinates are already shot\";\n            }\n\n            for (const [shipName, positions] of Object.entries(shipCoordinates)) {\n                if (positions.includes(coordinate)) {\n                    shotCoordinates.push(coordinate);\n                    let result = ships[shipName].hit();\n                    if(this.gameOver()) {\n                        return \"Hit! All ships sunk! Game Over!\";\n                    }\n                    return result;\n                }\n            }\n\n            shotCoordinates.push(coordinate);\n            this.missedAttacks++;\n            return \"Miss!\";\n        },\n        gameOver() {\n            return Object.values(ships).every(ship => ship.isSunk());\n        },\n    }\n}\n\nfunction player() {\n    return {\n        gameboard: gameboard(), // Each player gets their own gameboard\n        attack(enemyGameboard, x, y) {\n            return enemyGameboard.receiveAttack(x, y);\n        },\n    };\n}\n\nmodule.exports = {ship, gameboard, player};\n\n\n\n//# sourceURL=webpack://odin-battleship/./src/modules/logic.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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