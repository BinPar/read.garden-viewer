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

/***/ "./dist/config/default.js":
/*!********************************!*\
  !*** ./dist/config/default.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nexports.__esModule = true;\nvar viewerSettings_1 = __webpack_require__(/*! ../model/viewerSettings */ \"./dist/model/viewerSettings.js\");\nvar defaultConfig = {\n    debugViewerSafeArea: false,\n    initialFixedMode: viewerSettings_1.ViewerMode.WithScroll,\n    initialFitMode: viewerSettings_1.FitMode.Height,\n    initialReadMode: true,\n    showPageSeparation: false,\n    zoom: {\n        max: 4,\n        min: 0.1,\n        steps: [\n            0.1,\n            0.2,\n            0.3,\n            0.4,\n            0.5,\n            0.75,\n            1,\n            1.25,\n            1.5,\n            1.75,\n            2,\n            2.5,\n            3,\n            3.5,\n            4,\n        ]\n    },\n    loadedContentsNumber: 5,\n    fontSize: {\n        min: 8,\n        max: 32,\n        step: 2\n    },\n    columnGap: 216,\n    pageChangeThreshold: 40,\n    chapterChangeThreshold: 40,\n    minCharsPerColumn: 50,\n    maxCharsPerColumn: 70,\n    initialFontSize: 16,\n    initialScale: 1,\n    readModeMargin: {\n        top: 0,\n        right: 0,\n        bottom: 0,\n        left: 0\n    },\n    uiModeMargin: {\n        top: 20,\n        right: 40,\n        left: 40,\n        bottom: 20\n    }\n};\nexports.default = defaultConfig;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/config/default.js?");

/***/ }),

/***/ "./dist/config/index.js":
/*!******************************!*\
  !*** ./dist/config/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nexports.__esModule = true;\nexports.setConfig = exports.getConfig = void 0;\nvar config;\nvar getConfig = function () { return config; };\nexports.getConfig = getConfig;\nvar setConfig = function (newConfig) {\n    config = __assign(__assign({}, (config || {})), newConfig);\n    return config;\n};\nexports.setConfig = setConfig;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/config/index.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nexports.__esModule = true;\nvar loglevel_1 = __webpack_require__(/*! loglevel */ \"./node_modules/loglevel/lib/loglevel.js\");\nvar viewer_1 = __webpack_require__(/*! ./viewer */ \"./dist/viewer/index.js\");\nloglevel_1[\"default\"].setLevel('info');\nwindow.readGardenViewer = viewer_1[\"default\"];\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/index.js?");

/***/ }),

/***/ "./dist/lib/actions/actionDispatchers.js":
/*!***********************************************!*\
  !*** ./dist/lib/actions/actionDispatchers.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nexports.__esModule = true;\nvar setScrollMode_1 = __webpack_require__(/*! ./setScrollMode */ \"./dist/lib/actions/setScrollMode.js\");\nvar setDebugViewerSafeArea_1 = __webpack_require__(/*! ./setDebugViewerSafeArea */ \"./dist/lib/actions/setDebugViewerSafeArea.js\");\n/**\n * List of all action dispatchers\n */\nvar actionDispatchers = {\n    setScrollMode: setScrollMode_1[\"default\"],\n    setDebugViewerSafeArea: setDebugViewerSafeArea_1[\"default\"]\n};\nexports.default = actionDispatchers;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/actions/actionDispatchers.js?");

/***/ }),

/***/ "./dist/lib/actions/setDebugViewerSafeArea.js":
/*!****************************************************!*\
  !*** ./dist/lib/actions/setDebugViewerSafeArea.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nvar setCSSProperty_1 = __webpack_require__(/*! ../../viewer/setCSSProperty */ \"./dist/viewer/setCSSProperty.js\");\n/**\n * Draws a red border around the viewer\n * @param action action value\n * @returns state update\n */\nvar setDebugViewerSafeArea = function (action) { return __awaiter(void 0, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        setCSSProperty_1[\"default\"]('debug-viewer-safe-area', \"\" + (action.value ? 1 : 0));\n        return [2 /*return*/, {\n                debugViewerSafeArea: action.value\n            }];\n    });\n}); };\nexports.default = setDebugViewerSafeArea;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/actions/setDebugViewerSafeArea.js?");

/***/ }),

/***/ "./dist/lib/actions/setScrollMode.js":
/*!*******************************************!*\
  !*** ./dist/lib/actions/setScrollMode.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nvar setScrollMode = function (action, state) { return __awaiter(void 0, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        if (state.scrollMode === 'fixed') {\n            throw new Error('Action not allowed in fixed mode');\n        }\n        return [2 /*return*/, {\n                scrollMode: action.scrollMode,\n                layoutResetRequired: true\n            }];\n    });\n}); };\nexports.default = setScrollMode;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/actions/setScrollMode.js?");

/***/ }),

/***/ "./dist/lib/state/defaultFixed.js":
/*!****************************************!*\
  !*** ./dist/lib/state/defaultFixed.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nexports.__esModule = true;\nvar state_1 = __webpack_require__(/*! ../../model/state */ \"./dist/model/state.js\");\nvar defaultFixed = {\n    layout: state_1.LayoutTypes.Fixed,\n    hasHorizontalScroll: false,\n    hasVerticalScroll: false,\n    horizontalTranslate: 0,\n    maxHorizontalTranslate: 0,\n    maxVerticalTranslate: 0,\n    minHorizontalTranslate: 0,\n    minVerticalTranslate: 0,\n    verticalTranslate: 0\n};\nexports.default = defaultFixed;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/defaultFixed.js?");

/***/ }),

/***/ "./dist/lib/state/defaultFlow.js":
/*!***************************************!*\
  !*** ./dist/lib/state/defaultFlow.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nexports.__esModule = true;\nvar state_1 = __webpack_require__(/*! ../../model/state */ \"./dist/model/state.js\");\nvar defaultFlow = {\n    layout: state_1.LayoutTypes.Flow,\n    columnsInViewport: 2,\n    fontFamily: 'Helvetica',\n    fontSize: 18,\n    textAlign: null,\n    labels: [],\n    snaps: [],\n    totalChapterWidth: 0,\n    totalColumnWidth: 0,\n    totalColumns: 0\n};\nexports.default = defaultFlow;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/defaultFlow.js?");

/***/ }),

/***/ "./dist/lib/state/defaultGlobal.js":
/*!*****************************************!*\
  !*** ./dist/lib/state/defaultGlobal.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nexports.__esModule = true;\nvar defaultGlobal = {\n    scale: 1,\n    debugViewerSafeArea: false,\n    basicDOMElementsCreated: false\n};\nexports.default = defaultGlobal;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/defaultGlobal.js?");

/***/ }),

/***/ "./dist/lib/state/defaultPaginated.js":
/*!********************************************!*\
  !*** ./dist/lib/state/defaultPaginated.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nexports.__esModule = true;\nvar defaultPaginated = {\n    scrollMode: 'fixed',\n    doublePage: false\n};\nexports.default = defaultPaginated;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/defaultPaginated.js?");

/***/ }),

/***/ "./dist/lib/state/defaultScrolled.js":
/*!*******************************************!*\
  !*** ./dist/lib/state/defaultScrolled.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nexports.__esModule = true;\nvar defaultScrolled = {\n    scrollMode: 'horizontal',\n    left: 0,\n    maxLeft: 0,\n    totalWidth: 0,\n    totalHeight: 0,\n    showPageSeparation: false\n};\nexports.default = defaultScrolled;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/defaultScrolled.js?");

/***/ }),

/***/ "./dist/lib/state/dispatch.js":
/*!************************************!*\
  !*** ./dist/lib/state/dispatch.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nvar index_1 = __webpack_require__(/*! ./index */ \"./dist/lib/state/index.js\");\nvar reducer_1 = __webpack_require__(/*! ./reducer */ \"./dist/lib/state/reducer.js\");\nvar dispatch = function (action) { return __awaiter(void 0, void 0, void 0, function () {\n    var state, update;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                state = index_1.getState();\n                return [4 /*yield*/, reducer_1[\"default\"](state, action)];\n            case 1:\n                update = _a.sent();\n                index_1.updateState(update);\n                return [2 /*return*/];\n        }\n    });\n}); };\nexports.default = dispatch;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/dispatch.js?");

/***/ }),

/***/ "./dist/lib/state/index.js":
/*!*********************************!*\
  !*** ./dist/lib/state/index.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nexports.__esModule = true;\nexports.updateState = exports.getState = exports.initializeState = void 0;\nvar viewerSettings_1 = __webpack_require__(/*! ../../model/viewerSettings */ \"./dist/model/viewerSettings.js\");\nvar defaultGlobal_1 = __webpack_require__(/*! ./defaultGlobal */ \"./dist/lib/state/defaultGlobal.js\");\nvar defaultFlow_1 = __webpack_require__(/*! ./defaultFlow */ \"./dist/lib/state/defaultFlow.js\");\nvar defaultScrolled_1 = __webpack_require__(/*! ./defaultScrolled */ \"./dist/lib/state/defaultScrolled.js\");\nvar defaultFixed_1 = __webpack_require__(/*! ./defaultFixed */ \"./dist/lib/state/defaultFixed.js\");\nvar defaultPaginated_1 = __webpack_require__(/*! ./defaultPaginated */ \"./dist/lib/state/defaultPaginated.js\");\nvar default_1 = __webpack_require__(/*! ../../config/default */ \"./dist/config/default.js\");\nvar config_1 = __webpack_require__(/*! ../../config */ \"./dist/config/index.js\");\nvar state;\nvar initializeState = function (initialConfig) {\n    var config = config_1.setConfig(__assign(__assign(__assign({}, default_1[\"default\"]), initialConfig), { zoom: __assign(__assign({}, default_1[\"default\"].zoom), (initialConfig.zoom || {})), fontSize: __assign(__assign({}, default_1[\"default\"].fontSize), (initialConfig.fontSize || {})) }));\n    var defaultInitialMargins = config.initialReadMode\n        ? default_1[\"default\"].readModeMargin\n        : default_1[\"default\"].uiModeMargin;\n    var initialMargins = config.initialReadMode\n        ? config.readModeMargin\n        : config.uiModeMargin;\n    var globalState = __assign(__assign({}, defaultGlobal_1[\"default\"]), { config: config, margin: __assign(__assign({}, defaultInitialMargins), (initialMargins || {})), title: 'Title', pageLabel: '1', pageNumber: 1, scale: config.initialScale || defaultGlobal_1[\"default\"].scale, searchTerms: [] });\n    if (config.layoutType === 'flow') {\n        state = __assign(__assign(__assign(__assign({}, globalState), defaultFlow_1[\"default\"]), defaultScrolled_1[\"default\"]), { columnGap: config.columnGap, readMode: config.initialReadMode });\n    }\n    if (config.layoutType === 'fixed') {\n        var fixedState = __assign(__assign({}, defaultFixed_1[\"default\"]), { fitMode: config.initialFitMode });\n        if (config.initialFixedMode === viewerSettings_1.ViewerMode.Paginated) {\n            state = __assign(__assign(__assign({}, globalState), fixedState), defaultPaginated_1[\"default\"]);\n        }\n        if (config.initialFixedMode === viewerSettings_1.ViewerMode.WithScroll) {\n            state = __assign(__assign(__assign({}, globalState), fixedState), defaultScrolled_1[\"default\"]);\n        }\n    }\n};\nexports.initializeState = initializeState;\nvar getState = function () { return state; };\nexports.getState = getState;\nvar updateState = function (newState) {\n    var updatableState = state;\n    Object.keys(newState).forEach(function (key) {\n        updatableState[key] = newState[key];\n    });\n};\nexports.updateState = updateState;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/index.js?");

/***/ }),

/***/ "./dist/lib/state/reducer.js":
/*!***********************************!*\
  !*** ./dist/lib/state/reducer.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nvar actionDispatchers_1 = __webpack_require__(/*! ../actions/actionDispatchers */ \"./dist/lib/actions/actionDispatchers.js\");\nvar reducer = function (state, action) { return __awaiter(void 0, void 0, void 0, function () {\n    var dispatcher;\n    return __generator(this, function (_a) {\n        dispatcher = actionDispatchers_1[\"default\"][action.type];\n        if (dispatcher) {\n            return [2 /*return*/, dispatcher(action, state)];\n        }\n        throw Error(\"There is no dispatcher for the action \\\"\" + action.type + \"\\\"\");\n    });\n}); };\nexports.default = reducer;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/lib/state/reducer.js?");

/***/ }),

/***/ "./dist/model/state.js":
/*!*****************************!*\
  !*** ./dist/model/state.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nexports.__esModule = true;\nexports.LayoutTypes = void 0;\n/**\n * Layout types\n */\nvar LayoutTypes;\n(function (LayoutTypes) {\n    LayoutTypes[\"Fixed\"] = \"fixed\";\n    LayoutTypes[\"Flow\"] = \"flow\";\n})(LayoutTypes = exports.LayoutTypes || (exports.LayoutTypes = {}));\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/model/state.js?");

/***/ }),

/***/ "./dist/model/viewerSettings.js":
/*!**************************************!*\
  !*** ./dist/model/viewerSettings.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nexports.__esModule = true;\nexports.FitMode = exports.ViewerMode = void 0;\n/**\n * Viewer mode\n */\nvar ViewerMode;\n(function (ViewerMode) {\n    /**\n     * Paginated viewer. One page shown at the same time.\n     */\n    ViewerMode[\"Paginated\"] = \"paginated\";\n    /**\n     * Viewer with scroll. All content shown, scrollable.\n     */\n    ViewerMode[\"WithScroll\"] = \"withScroll\";\n    /**\n     * Flow viewer.\n     */\n    ViewerMode[\"Flow\"] = \"flow\";\n})(ViewerMode = exports.ViewerMode || (exports.ViewerMode = {}));\n/**\n * Possible fit modes\n */\nvar FitMode;\n(function (FitMode) {\n    /**\n     * Fit width\n     */\n    FitMode[\"Width\"] = \"width\";\n    /**\n     * Fit height\n     */\n    FitMode[\"Height\"] = \"height\";\n})(FitMode = exports.FitMode || (exports.FitMode = {}));\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/model/viewerSettings.js?");

/***/ }),

/***/ "./dist/viewer/createBasicDOMElements.js":
/*!***********************************************!*\
  !*** ./dist/viewer/createBasicDOMElements.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nexports.__esModule = true;\nvar state_1 = __webpack_require__(/*! ../lib/state */ \"./dist/lib/state/index.js\");\nvar setCSSProperty_1 = __webpack_require__(/*! ./setCSSProperty */ \"./dist/viewer/setCSSProperty.js\");\nvar endingAdditionalPages = 10;\nvar createBasicDOMElements = function (state) {\n    // #region Main node\n    var readGardenViewer = document.createElement('div');\n    readGardenViewer.id = 'rg-viewer';\n    document.body.appendChild(readGardenViewer);\n    // #endregion Main node\n    // #region Content Wrapper and child nodes\n    var contentWrapper = document.createElement('div');\n    contentWrapper.classList.add('rg-content-wrapper');\n    readGardenViewer.appendChild(contentWrapper);\n    var totalColumnWidthCalculator = document.createElement('div');\n    totalColumnWidthCalculator.classList.add('rg-total-width-calculator');\n    contentWrapper.appendChild(totalColumnWidthCalculator);\n    var backgroundCleaner = document.createElement('div');\n    backgroundCleaner.classList.add('rg-bg-cleaner');\n    contentWrapper.appendChild(backgroundCleaner);\n    var additionalPage = document.createElement('div');\n    additionalPage.classList.add('rg-additional-page');\n    contentWrapper.appendChild(additionalPage.cloneNode(true));\n    var contentPlaceholder = document.createElement('div');\n    contentWrapper.appendChild(contentPlaceholder);\n    var endOfChapterCalculator = document.createElement('div');\n    endOfChapterCalculator.classList.add('rg-end-of-chapter-calculator');\n    endOfChapterCalculator.dataset.page = '-';\n    contentWrapper.appendChild(endOfChapterCalculator);\n    for (var i = 0; i < endingAdditionalPages; i++) {\n        var clone = additionalPage.cloneNode(true);\n        if (i === endingAdditionalPages - 1) {\n            clone.classList.add('rg-real-end-of-chapter');\n            clone.textContent = 'realEndOfChapter';\n        }\n        contentWrapper.appendChild(clone);\n    }\n    // #endregion Content Wrapper and child nodes\n    // #region Content Wrapper Siblings\n    var pagesLabelsElement = document.createElement('div');\n    pagesLabelsElement.classList.add('rg-pages-labels');\n    readGardenViewer.appendChild(pagesLabelsElement);\n    var selectionHighlights = document.createElement('div');\n    selectionHighlights.classList.add('rg-highlights rg-selection');\n    readGardenViewer.appendChild(selectionHighlights);\n    var selectionSelectors = document.createElement('div');\n    selectionSelectors.classList.add('rg-highlights rg-selectors');\n    readGardenViewer.appendChild(selectionSelectors);\n    var searchTermsHighlights = document.createElement('div');\n    searchTermsHighlights.classList.add('rg-highlights rg-search');\n    readGardenViewer.appendChild(searchTermsHighlights);\n    // #endregion Content Wrapper Siblings\n    setCSSProperty_1[\"default\"]('debug-viewer-safe-area', \"\" + (state.debugViewerSafeArea ? 1 : 0));\n    state_1.updateState({ basicDOMElementsCreated: true, readGardenViewer: readGardenViewer });\n};\nexports.default = createBasicDOMElements;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/viewer/createBasicDOMElements.js?");

/***/ }),

/***/ "./dist/viewer/index.js":
/*!******************************!*\
  !*** ./dist/viewer/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nexports.__esModule = true;\nvar loglevel_1 = __webpack_require__(/*! loglevel */ \"./node_modules/loglevel/lib/loglevel.js\");\nvar state_1 = __webpack_require__(/*! ../lib/state */ \"./dist/lib/state/index.js\");\nvar dispatch_1 = __webpack_require__(/*! ../lib/state/dispatch */ \"./dist/lib/state/dispatch.js\");\nvar createBasicDOMElements_1 = __webpack_require__(/*! ./createBasicDOMElements */ \"./dist/viewer/createBasicDOMElements.js\");\nvar viewer = function (config) {\n    state_1.initializeState(config);\n    var api = {\n        dispatch: dispatch_1[\"default\"],\n        state: state_1.getState()\n    };\n    createBasicDOMElements_1[\"default\"](api.state);\n    loglevel_1[\"default\"].info('Viewer Initialized');\n    return api;\n};\nexports.default = viewer;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/viewer/index.js?");

/***/ }),

/***/ "./dist/viewer/setCSSProperty.js":
/*!***************************************!*\
  !*** ./dist/viewer/setCSSProperty.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nexports.__esModule = true;\nvar setCSSProperty = function (property, value) {\n    document.documentElement.style.setProperty(\"--\" + property, value);\n};\nexports.default = setCSSProperty;\n\n\n//# sourceURL=webpack://read.garden-viewer/./dist/viewer/setCSSProperty.js?");

/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\n* loglevel - https://github.com/pimterry/loglevel\n*\n* Copyright (c) 2013 Tim Perry\n* Licensed under the MIT license.\n*/\n(function (root, definition) {\n    \"use strict\";\n    if (true) {\n        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    } else {}\n}(this, function () {\n    \"use strict\";\n\n    // Slightly dubious tricks to cut down minimized file size\n    var noop = function() {};\n    var undefinedType = \"undefined\";\n    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (\n        /Trident\\/|MSIE /.test(window.navigator.userAgent)\n    );\n\n    var logMethods = [\n        \"trace\",\n        \"debug\",\n        \"info\",\n        \"warn\",\n        \"error\"\n    ];\n\n    // Cross-browser bind equivalent that works at least back to IE6\n    function bindMethod(obj, methodName) {\n        var method = obj[methodName];\n        if (typeof method.bind === 'function') {\n            return method.bind(obj);\n        } else {\n            try {\n                return Function.prototype.bind.call(method, obj);\n            } catch (e) {\n                // Missing bind shim or IE8 + Modernizr, fallback to wrapping\n                return function() {\n                    return Function.prototype.apply.apply(method, [obj, arguments]);\n                };\n            }\n        }\n    }\n\n    // Trace() doesn't print the message in IE, so for that case we need to wrap it\n    function traceForIE() {\n        if (console.log) {\n            if (console.log.apply) {\n                console.log.apply(console, arguments);\n            } else {\n                // In old IE, native console methods themselves don't have apply().\n                Function.prototype.apply.apply(console.log, [console, arguments]);\n            }\n        }\n        if (console.trace) console.trace();\n    }\n\n    // Build the best logging method possible for this env\n    // Wherever possible we want to bind, not wrap, to preserve stack traces\n    function realMethod(methodName) {\n        if (methodName === 'debug') {\n            methodName = 'log';\n        }\n\n        if (typeof console === undefinedType) {\n            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives\n        } else if (methodName === 'trace' && isIE) {\n            return traceForIE;\n        } else if (console[methodName] !== undefined) {\n            return bindMethod(console, methodName);\n        } else if (console.log !== undefined) {\n            return bindMethod(console, 'log');\n        } else {\n            return noop;\n        }\n    }\n\n    // These private functions always need `this` to be set properly\n\n    function replaceLoggingMethods(level, loggerName) {\n        /*jshint validthis:true */\n        for (var i = 0; i < logMethods.length; i++) {\n            var methodName = logMethods[i];\n            this[methodName] = (i < level) ?\n                noop :\n                this.methodFactory(methodName, level, loggerName);\n        }\n\n        // Define log.log as an alias for log.debug\n        this.log = this.debug;\n    }\n\n    // In old IE versions, the console isn't present until you first open it.\n    // We build realMethod() replacements here that regenerate logging methods\n    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {\n        return function () {\n            if (typeof console !== undefinedType) {\n                replaceLoggingMethods.call(this, level, loggerName);\n                this[methodName].apply(this, arguments);\n            }\n        };\n    }\n\n    // By default, we use closely bound real methods wherever possible, and\n    // otherwise we wait for a console to appear, and then try again.\n    function defaultMethodFactory(methodName, level, loggerName) {\n        /*jshint validthis:true */\n        return realMethod(methodName) ||\n               enableLoggingWhenConsoleArrives.apply(this, arguments);\n    }\n\n    function Logger(name, defaultLevel, factory) {\n      var self = this;\n      var currentLevel;\n\n      var storageKey = \"loglevel\";\n      if (typeof name === \"string\") {\n        storageKey += \":\" + name;\n      } else if (typeof name === \"symbol\") {\n        storageKey = undefined;\n      }\n\n      function persistLevelIfPossible(levelNum) {\n          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();\n\n          if (typeof window === undefinedType || !storageKey) return;\n\n          // Use localStorage if available\n          try {\n              window.localStorage[storageKey] = levelName;\n              return;\n          } catch (ignore) {}\n\n          // Use session cookie as fallback\n          try {\n              window.document.cookie =\n                encodeURIComponent(storageKey) + \"=\" + levelName + \";\";\n          } catch (ignore) {}\n      }\n\n      function getPersistedLevel() {\n          var storedLevel;\n\n          if (typeof window === undefinedType || !storageKey) return;\n\n          try {\n              storedLevel = window.localStorage[storageKey];\n          } catch (ignore) {}\n\n          // Fallback to cookies if local storage gives us nothing\n          if (typeof storedLevel === undefinedType) {\n              try {\n                  var cookie = window.document.cookie;\n                  var location = cookie.indexOf(\n                      encodeURIComponent(storageKey) + \"=\");\n                  if (location !== -1) {\n                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];\n                  }\n              } catch (ignore) {}\n          }\n\n          // If the stored level is not valid, treat it as if nothing was stored.\n          if (self.levels[storedLevel] === undefined) {\n              storedLevel = undefined;\n          }\n\n          return storedLevel;\n      }\n\n      /*\n       *\n       * Public logger API - see https://github.com/pimterry/loglevel for details\n       *\n       */\n\n      self.name = name;\n\n      self.levels = { \"TRACE\": 0, \"DEBUG\": 1, \"INFO\": 2, \"WARN\": 3,\n          \"ERROR\": 4, \"SILENT\": 5};\n\n      self.methodFactory = factory || defaultMethodFactory;\n\n      self.getLevel = function () {\n          return currentLevel;\n      };\n\n      self.setLevel = function (level, persist) {\n          if (typeof level === \"string\" && self.levels[level.toUpperCase()] !== undefined) {\n              level = self.levels[level.toUpperCase()];\n          }\n          if (typeof level === \"number\" && level >= 0 && level <= self.levels.SILENT) {\n              currentLevel = level;\n              if (persist !== false) {  // defaults to true\n                  persistLevelIfPossible(level);\n              }\n              replaceLoggingMethods.call(self, level, name);\n              if (typeof console === undefinedType && level < self.levels.SILENT) {\n                  return \"No console available for logging\";\n              }\n          } else {\n              throw \"log.setLevel() called with invalid level: \" + level;\n          }\n      };\n\n      self.setDefaultLevel = function (level) {\n          if (!getPersistedLevel()) {\n              self.setLevel(level, false);\n          }\n      };\n\n      self.enableAll = function(persist) {\n          self.setLevel(self.levels.TRACE, persist);\n      };\n\n      self.disableAll = function(persist) {\n          self.setLevel(self.levels.SILENT, persist);\n      };\n\n      // Initialize with the right level\n      var initialLevel = getPersistedLevel();\n      if (initialLevel == null) {\n          initialLevel = defaultLevel == null ? \"WARN\" : defaultLevel;\n      }\n      self.setLevel(initialLevel, false);\n    }\n\n    /*\n     *\n     * Top-level API\n     *\n     */\n\n    var defaultLogger = new Logger();\n\n    var _loggersByName = {};\n    defaultLogger.getLogger = function getLogger(name) {\n        if ((typeof name !== \"symbol\" && typeof name !== \"string\") || name === \"\") {\n          throw new TypeError(\"You must supply a name when creating a logger.\");\n        }\n\n        var logger = _loggersByName[name];\n        if (!logger) {\n          logger = _loggersByName[name] = new Logger(\n            name, defaultLogger.getLevel(), defaultLogger.methodFactory);\n        }\n        return logger;\n    };\n\n    // Grab the current global log variable in case of overwrite\n    var _log = (typeof window !== undefinedType) ? window.log : undefined;\n    defaultLogger.noConflict = function() {\n        if (typeof window !== undefinedType &&\n               window.log === defaultLogger) {\n            window.log = _log;\n        }\n\n        return defaultLogger;\n    };\n\n    defaultLogger.getLoggers = function getLoggers() {\n        return _loggersByName;\n    };\n\n    // ES6 default export, for compatibility\n    defaultLogger['default'] = defaultLogger;\n\n    return defaultLogger;\n}));\n\n\n//# sourceURL=webpack://read.garden-viewer/./node_modules/loglevel/lib/loglevel.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;