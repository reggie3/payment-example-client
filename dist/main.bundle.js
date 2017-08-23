/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _reactNativeWebviewMessaging=__webpack_require__(1);var _reactNativeWebviewMessaging2=_interopRequireDefault(_reactNativeWebviewMessaging);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var helloBtn=document.querySelector('#hello');
var jsonBtn=document.querySelector('#json');
var eventBtn=document.querySelector('#event');
var messagesContainer=document.querySelector('p');

helloBtn.addEventListener('click',function(){
_reactNativeWebviewMessaging2.default.send('hello');
});

jsonBtn.addEventListener('click',function(){
_reactNativeWebviewMessaging2.default.sendJSON({
payload:'hello'});

});

eventBtn.addEventListener('click',function(){
_reactNativeWebviewMessaging2.default.emit('greetingFromWebview',{
payload:'hello'});

});

_reactNativeWebviewMessaging2.default.on('text',function(text){
messagesContainer.innerHTML='Received text from RN: '+text;
});

_reactNativeWebviewMessaging2.default.on('json',function(text){
messagesContainer.innerHTML='Received json from RN: '+JSON.stringify(text);
});

_reactNativeWebviewMessaging2.default.on('greetingFromRN',function(event){
messagesContainer.innerHTML='Received "greetingFromRN" event: '+JSON.stringify(event);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==="function"?Symbol.iterator:"@@iterator")==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==="function"?Symbol.prototype:"@@prototype")?"symbol":typeof obj;};!function(e,t){"object"==( false?"undefined":_typeof(exports))&&"object"==( false?"undefined":_typeof(module))?module.exports=t(): true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?exports["react-native-webview-messaging"]=t():e["react-native-webview-messaging"]=t();}(undefined,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports;}var n={};return t.m=e,t.c=n,t.i=function(e){return e;},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var n=e&&e.__esModule?function(){return e.default;}:function(){return e;};return t.d(n,"a",n),n;},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t);},t.p="",t(t.s=1);}([function(e,t,n){"use strict";function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0;}function i(e){return"function"==typeof e;}function s(e){return"number"==typeof e;}function o(e){return"object"===(void 0===e?"undefined":f(e))&&null!==e;}function u(e){return void 0===e;}var f="function"==typeof Symbol&&"symbol"==_typeof(typeof Symbol==="function"?Symbol.iterator:"@@iterator")?function(e){return typeof e==="undefined"?"undefined":_typeof(e);}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==(typeof Symbol==="function"?Symbol.prototype:"@@prototype")?"symbol":typeof e==="undefined"?"undefined":_typeof(e);};e.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!s(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this;},r.prototype.emit=function(e){var t,n,r,s,f,l;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var a=new Error('Uncaught, unspecified "error" event. ('+t+")");throw a.context=t,a;}if(n=this._events[e],u(n))return!1;if(i(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),n.apply(this,s);}else if(o(n))for(s=Array.prototype.slice.call(arguments,1),l=n.slice(),r=l.length,f=0;f<r;f++){l[f].apply(this,s);}return!0;},r.prototype.addListener=function(e,t){var n;if(!i(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned&&(n=u(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this;},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments));}if(!i(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this;},r.prototype.removeListener=function(e,t){var n,r,s,u;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],s=n.length,r=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(n)){for(u=s;u-->0;){if(n[u]===t||n[u].listener&&n[u].listener===t){r=u;break;}}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t);}return this;},r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events){"removeListener"!==t&&this.removeAllListeners(t);}return this.removeAllListeners("removeListener"),this._events={},this;}if(n=this._events[e],i(n))this.removeListener(e,n);else if(n)for(;n.length;){this.removeListener(e,n[n.length-1]);}return delete this._events[e],this;},r.prototype.listeners=function(e){return this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[];},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(i(t))return 1;if(t)return t.length;}return 0;},r.listenerCount=function(e,t){return e.listenerCount(t);};},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=(typeof t==="undefined"?"undefined":_typeof(t))&&"function"!=typeof t?e:t;}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(typeof t==="undefined"?"undefined":_typeof(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}(),u=function e(t,n,r){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,n,r);}if("value"in i)return i.value;var o=i.get;if(void 0!==o)return o.call(r);},f=n(0),l=function(e){return e&&e.__esModule?e:{default:e};}(f),a=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));}return s(t,e),o(t,[{key:"sendJSON",value:function value(e){window.postMessage(JSON.stringify({type:"json",payload:e}));}},{key:"send",value:function value(e){window.postMessage(JSON.stringify({type:"text",payload:e}));}},{key:"emit",value:function value(e,n,r){u(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"emit",this).call(this,e,n),r||window.postMessage(JSON.stringify({type:"event",meta:{eventName:e},payload:n}));}}]),t;}(l.default);window.RNMessagesChannel=new a(),e.exports=window.RNMessagesChannel;}]);});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
module.exports=function(module){
if(!module.webpackPolyfill){
module.deprecate=function(){};
module.paths=[];

if(!module.children)module.children=[];
Object.defineProperty(module,"loaded",{
enumerable:true,
get:function get(){
return module.l;
}});

Object.defineProperty(module,"id",{
enumerable:true,
get:function get(){
return module.i;
}});

module.webpackPolyfill=1;
}
return module;
};

/***/ })
/******/ ]);