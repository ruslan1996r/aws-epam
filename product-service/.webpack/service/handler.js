/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common/errors/notFoundError.js":
/*!****************************************!*\
  !*** ./common/errors/notFoundError.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NotFoundError\": () => (/* binding */ NotFoundError)\n/* harmony export */ });\nclass NotFoundError extends Error {\n  constructor(message = \"Not found\") {\n    super(message);\n  }\n\n}\n\n//# sourceURL=webpack://product-service/./common/errors/notFoundError.js?");

/***/ }),

/***/ "./common/responses.js":
/*!*****************************!*\
  !*** ./common/responses.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Responses\": () => (/* binding */ Responses)\n/* harmony export */ });\nconst Responses = {\n  _DefineResponse(statusCode = 500, data = {}) {\n    return {\n      headers: {\n        'Content-Type': 'application/json',\n        'Access-Control-Allow-Methods': '*',\n        'Access-Control-Allow-Origin': '*'\n      },\n      statusCode,\n      body: JSON.stringify(data, null, 2)\n    };\n  },\n\n  _200(data = {}) {\n    return this._DefineResponse(200, data);\n  },\n\n  _400(error = {}) {\n    return this._DefineResponse(400, {\n      error: error.message\n    });\n  },\n\n  _404(error = {}) {\n    return this._DefineResponse(404, {\n      error: error.message\n    });\n  },\n\n  _500(error = {}) {\n    return this._DefineResponse(500, {\n      error: error.message\n    });\n  }\n\n};\n\n//# sourceURL=webpack://product-service/./common/responses.js?");

/***/ }),

/***/ "./mock/index.js":
/*!***********************!*\
  !*** ./mock/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"products\": () => (/* binding */ products)\n/* harmony export */ });\nconst products = Array(10).fill({}).map((_, i) => {\n  return {\n    id: String(i + 1),\n    description: `Description ${i + 1}`,\n    price: (i + 50) * 4,\n    title: `Product ${i + 1}`\n  };\n});\n\n//# sourceURL=webpack://product-service/./mock/index.js?");

/***/ }),

/***/ "./src/handler.js":
/*!************************!*\
  !*** ./src/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProductsById\": () => (/* reexport safe */ _handlers__WEBPACK_IMPORTED_MODULE_0__.getProductsById),\n/* harmony export */   \"getProductsList\": () => (/* reexport safe */ _handlers__WEBPACK_IMPORTED_MODULE_0__.getProductsList)\n/* harmony export */ });\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers */ \"./src/handlers/index.js\");\n\n\n\n\n//# sourceURL=webpack://product-service/./src/handler.js?");

/***/ }),

/***/ "./src/handlers/getProductsById.js":
/*!*****************************************!*\
  !*** ./src/handlers/getProductsById.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProductsById\": () => (/* binding */ getProductsById)\n/* harmony export */ });\n/* harmony import */ var _mock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mock */ \"./mock/index.js\");\n/* harmony import */ var _common_responses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/responses */ \"./common/responses.js\");\n/* harmony import */ var _common_errors_notFoundError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/errors/notFoundError */ \"./common/errors/notFoundError.js\");\n\n\n\n\nconst getProductsById = async event => {\n  try {\n    var _event$pathParameters;\n\n    const productId = (event === null || event === void 0 ? void 0 : (_event$pathParameters = event.pathParameters) === null || _event$pathParameters === void 0 ? void 0 : _event$pathParameters.productId) || null;\n    const productById = _mock__WEBPACK_IMPORTED_MODULE_0__.products.find(product => product.id === productId);\n\n    if (!productById) {\n      throw new _common_errors_notFoundError__WEBPACK_IMPORTED_MODULE_2__.NotFoundError(`Product with id \"${productId}\" was not found`);\n    }\n\n    return _common_responses__WEBPACK_IMPORTED_MODULE_1__.Responses._200(productById);\n  } catch (error) {\n    if (error instanceof _common_errors_notFoundError__WEBPACK_IMPORTED_MODULE_2__.NotFoundError) {\n      return _common_responses__WEBPACK_IMPORTED_MODULE_1__.Responses._404(error);\n    }\n\n    return _common_responses__WEBPACK_IMPORTED_MODULE_1__.Responses._500(error);\n  }\n};\n\n\n\n//# sourceURL=webpack://product-service/./src/handlers/getProductsById.js?");

/***/ }),

/***/ "./src/handlers/getProductsList.js":
/*!*****************************************!*\
  !*** ./src/handlers/getProductsList.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProductsList\": () => (/* binding */ getProductsList)\n/* harmony export */ });\n/* harmony import */ var _common_responses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/responses */ \"./common/responses.js\");\n/* harmony import */ var _mock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mock */ \"./mock/index.js\");\n\n\n\nconst getProductsList = async () => {\n  try {\n    return _common_responses__WEBPACK_IMPORTED_MODULE_0__.Responses._200(_mock__WEBPACK_IMPORTED_MODULE_1__.products);\n  } catch (error) {\n    return _common_responses__WEBPACK_IMPORTED_MODULE_0__.Responses._500(error);\n  }\n};\n\n\n\n//# sourceURL=webpack://product-service/./src/handlers/getProductsList.js?");

/***/ }),

/***/ "./src/handlers/index.js":
/*!*******************************!*\
  !*** ./src/handlers/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProductsById\": () => (/* reexport safe */ _getProductsById__WEBPACK_IMPORTED_MODULE_1__.getProductsById),\n/* harmony export */   \"getProductsList\": () => (/* reexport safe */ _getProductsList__WEBPACK_IMPORTED_MODULE_0__.getProductsList)\n/* harmony export */ });\n/* harmony import */ var _getProductsList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getProductsList */ \"./src/handlers/getProductsList.js\");\n/* harmony import */ var _getProductsById__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getProductsById */ \"./src/handlers/getProductsById.js\");\n\n\n\n//# sourceURL=webpack://product-service/./src/handlers/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/handler.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;