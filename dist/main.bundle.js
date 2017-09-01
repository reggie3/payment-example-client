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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==="function"?Symbol.iterator:"@@iterator")==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==="function"?Symbol.prototype:"@@prototype")?"symbol":typeof obj;};var g;


g=function(){
return this;
}();

try{

g=g||Function("return this")()||(1,eval)("this");
}catch(e){

if((typeof window==="undefined"?"undefined":_typeof(window))==="object")
g=window;
}





module.exports=g;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
paymentOptionIDs:{
card:'card',
paypal:'paypal',
paypalCredit:'paypalCredit'},

paymentMethodTypes:{
card:'CreditCard',
paypal:'PayPalAccount',
paypalCredit:'PayPalAccount'},

analyticsKinds:{
CreditCard:'card',
PayPalAccount:'paypal'},

paymentMethodCardTypes:{
Visa:'visa',
MasterCard:'master-card',
'American Express':'american-express',
'Diners Club':'diners-club',
Discover:'discover',
JCB:'jcb',
UnionPay:'unionpay',
Maestro:'maestro'},

configurationCardTypes:{
visa:'Visa',
'master-card':'MasterCard',
'american-express':'American Express',
'diners-club':'Discover',
discover:'Discover',
jcb:'JCB',
unionpay:'UnionPay',
maestro:'Maestro'},

errors:{
NO_PAYMENT_METHOD_ERROR:'No payment method is available.',
PAYPAL_NON_LINKED_SANDBOX:'A <a href="https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing" target="_blank" rel="nofollow">linked sandbox account</a> is required to use PayPal Checkout in sandbox.'},

ANALYTICS_REQUEST_TIMEOUT_MS:2000,
ANALYTICS_PREFIX:'web.dropin.',
CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT:200,
CHECKOUT_JS_SOURCE:'https://www.paypalobjects.com/api/checkout.4.0.95.min.js',
INTEGRATION:'dropin2',
PAYPAL_CHECKOUT_SCRIPT_ID:'braintree-dropin-paypal-checkout-script',
STYLESHEET_ID:'braintree-dropin-stylesheet'};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enumerate=__webpack_require__(13);








function BraintreeError(options){
if(!BraintreeError.types.hasOwnProperty(options.type)){
throw new Error(options.type+' is not a valid type.');
}

if(!options.code){
throw new Error('Error code required.');
}

if(!options.message){
throw new Error('Error message required.');
}

this.name='BraintreeError';





this.code=options.code;





this.message=options.message;





this.type=options.type;





this.details=options.details;
}

BraintreeError.prototype=Object.create(Error.prototype);
BraintreeError.prototype.constructor=BraintreeError;













BraintreeError.types=enumerate([
'CUSTOMER',
'MERCHANT',
'NETWORK',
'INTERNAL',
'UNKNOWN']);


BraintreeError.findRootError=function(err){
if(err instanceof BraintreeError&&err.details&&err.details.originalError){
return BraintreeError.findRootError(err.details.originalError);
}

return err;
};

module.exports=BraintreeError;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deferred=__webpack_require__(64);
var once=__webpack_require__(65);
var promiseOrCallback=__webpack_require__(66);

function wrapPromise(fn){
return function(){
var callback;
var args=Array.prototype.slice.call(arguments);
var lastArg=args[args.length-1];

if(typeof lastArg==='function'){
callback=args.pop();
callback=once(deferred(callback));
}
return promiseOrCallback(fn.apply(this,args),callback);
};
}

wrapPromise.wrapPrototype=function(target,options){
var methods,ignoreMethods,includePrivateMethods;

options=options||{};
ignoreMethods=options.ignoreMethods||[];
includePrivateMethods=options.transformPrivateMethods===true;

methods=Object.getOwnPropertyNames(target.prototype).filter(function(method){
var isNotPrivateMethod;
var isNonConstructorFunction=method!=='constructor'&&
typeof target.prototype[method]==='function';
var isNotAnIgnoredMethod=ignoreMethods.indexOf(method)===-1;

if(includePrivateMethods){
isNotPrivateMethod=true;
}else{
isNotPrivateMethod=method.charAt(0)!=='_';
}

return isNonConstructorFunction&&
isNotPrivateMethod&&
isNotAnIgnoredMethod;
});

methods.forEach(function(method){
var original=target.prototype[method];

target.prototype[method]=wrapPromise(original);
});

return target;
};

module.exports=wrapPromise;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isBraintreeWebError(err){
return err.name==='BraintreeError';
}

function DropinError(err){
this.name='DropinError';

if(typeof err==='string'){
this.message=err;
}else{
this.message=err.message;
}

if(isBraintreeWebError(err)){
this._braintreeWebError=err;
}else{
this._braintreeWebError=err.braintreeWebError;
}
}

DropinError.prototype=Object.create(Error.prototype);
DropinError.prototype.constructor=DropinError;

module.exports=DropinError;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Promise=global.Promise||__webpack_require__(31);

module.exports=Promise;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign=__webpack_require__(11).assign;
var DropinError=__webpack_require__(4);
var errors=__webpack_require__(1).errors;
var Promise=__webpack_require__(7);

function BaseView(options){
options=options||{};

assign(this,options);
}

BaseView.prototype.getElementById=function(id){
if(!this.element){return null;}

return this.element.querySelector('[data-braintree-id="'+id+'"]');
};

BaseView.prototype.requestPaymentMethod=function(){
return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
};

BaseView.prototype.getPaymentMethod=function(){
return this.activeMethodView&&this.activeMethodView.paymentMethod;
};

BaseView.prototype.onSelection=function(){};

BaseView.prototype.teardown=function(){
return Promise.resolve();
};

module.exports=BaseView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Promise=global.Promise||__webpack_require__(31);

module.exports=Promise;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob=__webpack_require__(22).atob;
var constants=__webpack_require__(1);
var braintreeClientVersion=__webpack_require__(23).VERSION;

function _millisToSeconds(millis){
return Math.floor(millis/1000);
}

function sendAnalyticsEvent(client,kind,callback){
var configuration=client.getConfiguration();
var analyticsRequest=client._request;
var timestamp=_millisToSeconds(Date.now());
var url=configuration.gatewayConfiguration.analytics.url;
var data={
analytics:[{
kind:constants.ANALYTICS_PREFIX+kind,
timestamp:timestamp}],

_meta:configuration.analyticsMetadata,
braintreeLibraryVersion:braintreeClientVersion};


if(configuration.authorizationType==='TOKENIZATION_KEY'){
data.tokenizationKey=configuration.authorization;
}else{
data.authorizationFingerprint=JSON.parse(atob(configuration.authorization)).authorizationFingerprint;
}

analyticsRequest({
url:url,
method:'post',
data:data,
timeout:constants.ANALYTICS_REQUEST_TIMEOUT_MS},
callback);
}

module.exports={
sendEvent:sendAnalyticsEvent};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION="3.22.0";
var PLATFORM='web';

module.exports={
ANALYTICS_PREFIX:'web.',
ANALYTICS_REQUEST_TIMEOUT_MS:2000,
INTEGRATION_TIMEOUT_MS:60000,
VERSION:VERSION,
INTEGRATION:'custom',
SOURCE:'client',
PLATFORM:PLATFORM,
BRAINTREE_LIBRARY_VERSION:'braintree/'+PLATFORM+'/'+VERSION};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);

module.exports={
CALLBACK_REQUIRED:{
type:BraintreeError.types.MERCHANT,
code:'CALLBACK_REQUIRED'},

INSTANTIATION_OPTION_REQUIRED:{
type:BraintreeError.types.MERCHANT,
code:'INSTANTIATION_OPTION_REQUIRED'},

INVALID_OPTION:{
type:BraintreeError.types.MERCHANT,
code:'INVALID_OPTION'},

INCOMPATIBLE_VERSIONS:{
type:BraintreeError.types.MERCHANT,
code:'INCOMPATIBLE_VERSIONS'},

METHOD_CALLED_AFTER_TEARDOWN:{
type:BraintreeError.types.MERCHANT,
code:'METHOD_CALLED_AFTER_TEARDOWN'},

BRAINTREE_API_ACCESS_RESTRICTED:{
type:BraintreeError.types.MERCHANT,
code:'BRAINTREE_API_ACCESS_RESTRICTED',
message:'Your access is restricted and cannot use this part of the Braintree API.'}};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignNormalized=typeof Object.assign==='function'?Object.assign:assignPolyfill;

function assignPolyfill(destination){
var i,source,key;

for(i=1;i<arguments.length;i++){
source=arguments[i];
for(key in source){
if(source.hasOwnProperty(key)){
destination[key]=source[key];
}
}
}

return destination;
}

module.exports={
assign:assignNormalized,
_assign:assignPolyfill};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classesOf(element){
return element.className.trim().split(/\s+/);
}

function _hasClass(element,classname){
return new RegExp('\\b'+classname+'\\b').test(element.className);
}

function add(element){
var toAdd=Array.prototype.slice.call(arguments,1);
var className=_classesOf(element).filter(function(classname){
return toAdd.indexOf(classname)===-1;
}).concat(toAdd).join(' ');

element.className=className;
}

function remove(element){
var toRemove=Array.prototype.slice.call(arguments,1);
var className=_classesOf(element).filter(function(classname){
return toRemove.indexOf(classname)===-1;
}).join(' ');

element.className=className;
}

function toggle(element,classname,adding){
if(arguments.length<3){
if(_hasClass(element,classname)){
remove(element,classname);
}else{
add(element,classname);
}
}else if(adding){
add(element,classname);
}else{
remove(element,classname);
}
}

module.exports={
add:add,
remove:remove,
toggle:toggle};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function enumerate(values,prefix){
prefix=prefix==null?'':prefix;

return values.reduce(function(enumeration,value){
enumeration[value]=prefix+value;
return enumeration;
},{});
}

module.exports=enumerate;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function once(fn){
var called=false;

return function(){
if(!called){
called=true;
fn.apply(null,arguments);
}
};
}

module.exports=once;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uuid(){
return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
var r=Math.random()*16|0;
var v=c==='x'?r:r&0x3|0x8;

return v.toString(16);
});
}

module.exports=uuid;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var enumerate=__webpack_require__(13);
var errors=__webpack_require__(17);
var VERSION="3.22.0";

var constants={
VERSION:VERSION,
maxExpirationYearAge:19,
externalEvents:{
FOCUS:'focus',
BLUR:'blur',
EMPTY:'empty',
NOT_EMPTY:'notEmpty',
VALIDITY_CHANGE:'validityChange',
CARD_TYPE_CHANGE:'cardTypeChange'},

defaultMaxLengths:{
number:19,
postalCode:8,
expirationDate:7,
expirationMonth:2,
expirationYear:4,
cvv:3},

externalClasses:{
FOCUSED:'braintree-hosted-fields-focused',
INVALID:'braintree-hosted-fields-invalid',
VALID:'braintree-hosted-fields-valid'},

defaultIFrameStyle:{
border:'none',
width:'100%',
height:'100%',
'float':'left'},

tokenizationErrorCodes:{
81724:errors.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
81736:errors.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED},

whitelistedStyles:[
'-moz-appearance',
'-moz-osx-font-smoothing',
'-moz-tap-highlight-color',
'-moz-transition',
'-webkit-appearance',
'-webkit-font-smoothing',
'-webkit-tap-highlight-color',
'-webkit-transition',
'appearance',
'color',
'direction',
'font',
'font-family',
'font-size',
'font-size-adjust',
'font-stretch',
'font-style',
'font-variant',
'font-variant-alternates',
'font-variant-caps',
'font-variant-east-asian',
'font-variant-ligatures',
'font-variant-numeric',
'font-weight',
'letter-spacing',
'line-height',
'opacity',
'outline',
'text-shadow',
'transition'],

whitelistedFields:{
number:{
name:'credit-card-number',
label:'Credit Card Number'},

cvv:{
name:'cvv',
label:'CVV'},

expirationDate:{
name:'expiration',
label:'Expiration Date'},

expirationMonth:{
name:'expiration-month',
label:'Expiration Month'},

expirationYear:{
name:'expiration-year',
label:'Expiration Year'},

postalCode:{
name:'postal-code',
label:'Postal Code'}},


whitelistedAttributes:{
'aria-invalid':'boolean',
'aria-required':'boolean',
disabled:'boolean',
placeholder:'string'}};



constants.events=enumerate([
'FRAME_READY',
'VALIDATE_STRICT',
'CONFIGURATION',
'TOKENIZATION_REQUEST',
'INPUT_EVENT',
'TRIGGER_INPUT_FOCUS',
'ADD_CLASS',
'REMOVE_CLASS',
'SET_ATTRIBUTE',
'REMOVE_ATTRIBUTE',
'CLEAR_FIELD',
'AUTOFILL_EXPIRATION_DATE'],
'hosted-fields:');

module.exports=constants;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);

module.exports={
HOSTED_FIELDS_INVALID_FIELD_KEY:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_INVALID_FIELD_KEY'},

HOSTED_FIELDS_INVALID_FIELD_SELECTOR:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_INVALID_FIELD_SELECTOR',
message:'Selector does not reference a valid DOM node.'},

HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME',
message:'Element already contains a Braintree iframe.'},

HOSTED_FIELDS_FIELD_INVALID:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_FIELD_INVALID'},

HOSTED_FIELDS_FIELD_NOT_PRESENT:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_FIELD_NOT_PRESENT'},

HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR:{
type:BraintreeError.types.NETWORK,
code:'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR',
message:'A tokenization network error occurred.'},

HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE:{
type:BraintreeError.types.CUSTOMER,
code:'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE',
message:'This credit card already exists in the merchant\'s vault.'},

HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED:{
type:BraintreeError.types.CUSTOMER,
code:'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED',
message:'CVV verification failed during tokenization.'},

HOSTED_FIELDS_FAILED_TOKENIZATION:{
type:BraintreeError.types.CUSTOMER,
code:'HOSTED_FIELDS_FAILED_TOKENIZATION',
message:'The supplied card data failed tokenization.'},

HOSTED_FIELDS_FIELDS_EMPTY:{
type:BraintreeError.types.CUSTOMER,
code:'HOSTED_FIELDS_FIELDS_EMPTY',
message:'All fields are empty. Cannot tokenize empty card fields.'},

HOSTED_FIELDS_FIELDS_INVALID:{
type:BraintreeError.types.CUSTOMER,
code:'HOSTED_FIELDS_FIELDS_INVALID',
message:'Some payment input fields are invalid. Cannot tokenize invalid card fields.'},

HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED'},

HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED'},

HOSTED_FIELDS_FIELD_PROPERTY_INVALID:{
type:BraintreeError.types.MERCHANT,
code:'HOSTED_FIELDS_FIELD_PROPERTY_INVALID'}};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function isIe9(ua){
ua=ua||navigator.userAgent;
return ua.indexOf('MSIE 9')!==-1;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports=function isIos(ua){
ua=ua||global.navigator.userAgent;
return /iPhone|iPod|iPad/i.test(ua);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants=__webpack_require__(9);
var addMetadata=__webpack_require__(29);

function _millisToSeconds(millis){
return Math.floor(millis/1000);
}

function sendAnalyticsEvent(client,kind,callback){
var configuration=client.getConfiguration();
var request=client._request;
var timestamp=_millisToSeconds(Date.now());
var url=configuration.gatewayConfiguration.analytics.url;
var data={
analytics:[{
kind:constants.ANALYTICS_PREFIX+kind,
timestamp:timestamp}]};



request({
url:url,
method:'post',
data:addMetadata(configuration,data),
timeout:constants.ANALYTICS_REQUEST_TIMEOUT_MS},
callback);
}

module.exports={
sendEvent:sendAnalyticsEvent};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function addSelectionEventHandler(element,func){
element.addEventListener('click',func);
element.addEventListener('keyup',function(event){
if(event.keyCode===13){
func();
}
});
}

module.exports=addSelectionEventHandler;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var atobNormalized=typeof global.atob==='function'?global.atob:atob;

function atob(base64String){
var a,b,c,b1,b2,b3,b4,i;
var base64Matcher=new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var result='';

if(!base64Matcher.test(base64String)){
throw new Error('Non base64 encoded input passed to window.atob polyfill');
}

i=0;
do{
b1=characters.indexOf(base64String.charAt(i++));
b2=characters.indexOf(base64String.charAt(i++));
b3=characters.indexOf(base64String.charAt(i++));
b4=characters.indexOf(base64String.charAt(i++));

a=(b1&0x3F)<<2|b2>>4&0x3;
b=(b2&0xF)<<4|b3>>2&0xF;
c=(b3&0x3)<<6|b4&0x3F;

result+=String.fromCharCode(a)+(b?String.fromCharCode(b):'')+(c?String.fromCharCode(c):'');
}while(i<base64String.length);

return result;
}

module.exports={
atob:atobNormalized,
_atob:atob};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);
var Client=__webpack_require__(46);
var getConfiguration=__webpack_require__(63).getConfiguration;
var VERSION="3.22.0";
var Promise=__webpack_require__(5);
var wrapPromise=__webpack_require__(3);
var sharedErrors=__webpack_require__(10);

var cachedClients={};




















function create(options){
if(!options.authorization){
return Promise.reject(new BraintreeError({
type:sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
code:sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
message:'options.authorization is required when instantiating a client.'}));

}

if(cachedClients[options.authorization]){
return Promise.resolve(cachedClients[options.authorization]);
}

return getConfiguration(options).then(function(configuration){
var client;

if(options.debug){
configuration.isDebug=true;
}

client=new Client(configuration);

cachedClients[options.authorization]=client;

return client;
});
}


function clearCache(){
cachedClients={};
}

module.exports={
create:wrapPromise(create),




VERSION:VERSION,
_clearCache:clearCache};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ajaxIsAvaliable;
var once=__webpack_require__(14);
var JSONPDriver=__webpack_require__(47);
var AJAXDriver=__webpack_require__(48);
var getUserAgent=__webpack_require__(54);
var isHTTP=__webpack_require__(55);

function isAjaxAvailable(){
if(ajaxIsAvaliable==null){
ajaxIsAvaliable=!(isHTTP()&&/MSIE\s(8|9)/.test(getUserAgent()));
}

return ajaxIsAvaliable;
}

module.exports=function(options,cb){
cb=once(cb||Function.prototype);
options.method=(options.method||'GET').toUpperCase();
options.timeout=options.timeout==null?60000:options.timeout;
options.data=options.data||{};

if(isAjaxAvailable()){
AJAXDriver.request(options,cb);
}else{
JSONPDriver.request(options,cb);
}
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==='function'?Symbol.prototype:'@@prototype')?"symbol":typeof obj;};

function _notEmpty(obj){
var key;

for(key in obj){
if(obj.hasOwnProperty(key)){return true;}
}

return false;
}

function _isArray(value){
return value&&(typeof value==='undefined'?'undefined':_typeof(value))==='object'&&typeof value.length==='number'&&
Object.prototype.toString.call(value)==='[object Array]'||false;
}

function parse(url){
var query,params;

url=url||global.location.href;

if(!/\?/.test(url)){
return{};
}

query=url.replace(/#.*$/,'').replace(/^.*\?/,'').split('&');

params=query.reduce(function(toReturn,keyValue){
var parts=keyValue.split('=');
var key=decodeURIComponent(parts[0]);
var value=decodeURIComponent(parts[1]);

toReturn[key]=value;
return toReturn;
},{});

return params;
}

function stringify(params,namespace){
var k,v,p;
var query=[];

for(p in params){
if(!params.hasOwnProperty(p)){
continue;
}

v=params[p];

if(namespace){
if(_isArray(params)){
k=namespace+'[]';
}else{
k=namespace+'['+p+']';
}
}else{
k=p;
}
if((typeof v==='undefined'?'undefined':_typeof(v))==='object'){
query.push(stringify(v,k));
}else{
query.push(encodeURIComponent(k)+'='+encodeURIComponent(v));
}
}

return query.join('&');
}

function queryify(url,params){
url=url||'';

if(params!=null&&(typeof params==='undefined'?'undefined':_typeof(params))==='object'&&_notEmpty(params)){
url+=url.indexOf('?')===-1?'?':'';
url+=url.indexOf('=')!==-1?'&':'';
url+=stringify(params);
}

return url;
}

module.exports={
parse:parse,
stringify:stringify,
queryify:queryify};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignNormalized=typeof Object.assign==='function'?Object.assign:assignPolyfill;

function assignPolyfill(destination){
var i,source,key;

for(i=1;i<arguments.length;i++){
source=arguments[i];
for(key in source){
if(source.hasOwnProperty(key)){
destination[key]=source[key];
}
}
}

return destination;
}

module.exports={
assign:assignNormalized,
_assign:assignPolyfill};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parser;
var legalHosts={
'paypal.com':1,
'braintreepayments.com':1,
'braintreegateway.com':1,
'braintree-api.com':1};


function stripSubdomains(domain){
return domain.split('.').slice(-2).join('.');
}

function isWhitelistedDomain(url){
var mainDomain;

url=url.toLowerCase();

if(!/^https:/.test(url)){
return false;
}

parser=parser||document.createElement('a');
parser.href=url;
mainDomain=stripSubdomains(parser.hostname);

return legalHosts.hasOwnProperty(mainDomain);
}

module.exports=isWhitelistedDomain;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);

function convertToBraintreeError(originalErr,btErrorObject){
if(originalErr instanceof BraintreeError){
return originalErr;
}

return new BraintreeError({
type:btErrorObject.type,
code:btErrorObject.code,
message:btErrorObject.message,
details:{
originalError:originalErr}});


}

module.exports=convertToBraintreeError;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createAuthorizationData=__webpack_require__(30);
var jsonClone=__webpack_require__(57);
var constants=__webpack_require__(9);

function addMetadata(configuration,data){
var key;
var attrs=data?jsonClone(data):{};
var authAttrs=createAuthorizationData(configuration.authorization).attrs;
var _meta=jsonClone(configuration.analyticsMetadata);

attrs.braintreeLibraryVersion=constants.BRAINTREE_LIBRARY_VERSION;

for(key in attrs._meta){
if(attrs._meta.hasOwnProperty(key)){
_meta[key]=attrs._meta[key];
}
}

attrs._meta=_meta;

if(authAttrs.tokenizationKey){
attrs.tokenizationKey=authAttrs.tokenizationKey;
}else{
attrs.authorizationFingerprint=authAttrs.authorizationFingerprint;
}

return attrs;
}

module.exports=addMetadata;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob=__webpack_require__(56).atob;

var apiUrls={
production:'https://api.braintreegateway.com:443',
sandbox:'https://api.sandbox.braintreegateway.com:443'};


function _isTokenizationKey(str){
return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
}

function _parseTokenizationKey(tokenizationKey){
var tokens=tokenizationKey.split('_');
var environment=tokens[0];
var merchantId=tokens.slice(2).join('_');

return{
merchantId:merchantId,
environment:environment};

}

function createAuthorizationData(authorization){
var parsedClientToken,parsedTokenizationKey;
var data={
attrs:{},
configUrl:''};


if(_isTokenizationKey(authorization)){
parsedTokenizationKey=_parseTokenizationKey(authorization);
data.attrs.tokenizationKey=authorization;
data.configUrl=apiUrls[parsedTokenizationKey.environment]+'/merchants/'+parsedTokenizationKey.merchantId+'/client_api/v1/configuration';
}else{
parsedClientToken=JSON.parse(atob(authorization));
data.attrs.authorizationFingerprint=parsedClientToken.authorizationFingerprint;
data.configUrl=parsedClientToken.configUrl;
}

return data;
}

module.exports=createAuthorizationData;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==='function'?Symbol.prototype:'@@prototype')?"symbol":typeof obj;};(function(root){



var setTimeoutFunc=setTimeout;

function noop(){}


function bind(fn,thisArg){
return function(){
fn.apply(thisArg,arguments);
};
}

function Promise(fn){
if(_typeof(this)!=='object')throw new TypeError('Promises must be constructed via new');
if(typeof fn!=='function')throw new TypeError('not a function');
this._state=0;
this._handled=false;
this._value=undefined;
this._deferreds=[];

doResolve(fn,this);
}

function handle(self,deferred){
while(self._state===3){
self=self._value;
}
if(self._state===0){
self._deferreds.push(deferred);
return;
}
self._handled=true;
Promise._immediateFn(function(){
var cb=self._state===1?deferred.onFulfilled:deferred.onRejected;
if(cb===null){
(self._state===1?resolve:reject)(deferred.promise,self._value);
return;
}
var ret;
try{
ret=cb(self._value);
}catch(e){
reject(deferred.promise,e);
return;
}
resolve(deferred.promise,ret);
});
}

function resolve(self,newValue){
try{

if(newValue===self)throw new TypeError('A promise cannot be resolved with itself.');
if(newValue&&((typeof newValue==='undefined'?'undefined':_typeof(newValue))==='object'||typeof newValue==='function')){
var then=newValue.then;
if(newValue instanceof Promise){
self._state=3;
self._value=newValue;
finale(self);
return;
}else if(typeof then==='function'){
doResolve(bind(then,newValue),self);
return;
}
}
self._state=1;
self._value=newValue;
finale(self);
}catch(e){
reject(self,e);
}
}

function reject(self,newValue){
self._state=2;
self._value=newValue;
finale(self);
}

function finale(self){
if(self._state===2&&self._deferreds.length===0){
Promise._immediateFn(function(){
if(!self._handled){
Promise._unhandledRejectionFn(self._value);
}
});
}

for(var i=0,len=self._deferreds.length;i<len;i++){
handle(self,self._deferreds[i]);
}
self._deferreds=null;
}

function Handler(onFulfilled,onRejected,promise){
this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;
this.onRejected=typeof onRejected==='function'?onRejected:null;
this.promise=promise;
}







function doResolve(fn,self){
var done=false;
try{
fn(function(value){
if(done)return;
done=true;
resolve(self,value);
},function(reason){
if(done)return;
done=true;
reject(self,reason);
});
}catch(ex){
if(done)return;
done=true;
reject(self,ex);
}
}

Promise.prototype['catch']=function(onRejected){
return this.then(null,onRejected);
};

Promise.prototype.then=function(onFulfilled,onRejected){
var prom=new this.constructor(noop);

handle(this,new Handler(onFulfilled,onRejected,prom));
return prom;
};

Promise.all=function(arr){
var args=Array.prototype.slice.call(arr);

return new Promise(function(resolve,reject){
if(args.length===0)return resolve([]);
var remaining=args.length;

function res(i,val){
try{
if(val&&((typeof val==='undefined'?'undefined':_typeof(val))==='object'||typeof val==='function')){
var then=val.then;
if(typeof then==='function'){
then.call(val,function(val){
res(i,val);
},reject);
return;
}
}
args[i]=val;
if(--remaining===0){
resolve(args);
}
}catch(ex){
reject(ex);
}
}

for(var i=0;i<args.length;i++){
res(i,args[i]);
}
});
};

Promise.resolve=function(value){
if(value&&(typeof value==='undefined'?'undefined':_typeof(value))==='object'&&value.constructor===Promise){
return value;
}

return new Promise(function(resolve){
resolve(value);
});
};

Promise.reject=function(value){
return new Promise(function(resolve,reject){
reject(value);
});
};

Promise.race=function(values){
return new Promise(function(resolve,reject){
for(var i=0,len=values.length;i<len;i++){
values[i].then(resolve,reject);
}
});
};


Promise._immediateFn=typeof setImmediate==='function'&&function(fn){setImmediate(fn);}||
function(fn){
setTimeoutFunc(fn,0);
};

Promise._unhandledRejectionFn=function _unhandledRejectionFn(err){
if(typeof console!=='undefined'&&console){
console.warn('Possible Unhandled Promise Rejection:',err);
}
};






Promise._setImmediateFn=function _setImmediateFn(fn){
Promise._immediateFn=fn;
};






Promise._setUnhandledRejectionFn=function _setUnhandledRejectionFn(fn){
Promise._unhandledRejectionFn=fn;
};

if(typeof module!=='undefined'&&module.exports){
module.exports=Promise;
}else if(!root.Promise){
root.Promise=Promise;
}

})(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58).setImmediate))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);

module.exports={
CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN:{
type:BraintreeError.types.MERCHANT,
code:'CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN'},

CLIENT_OPTION_REQUIRED:{
type:BraintreeError.types.MERCHANT,
code:'CLIENT_OPTION_REQUIRED'},

CLIENT_OPTION_INVALID:{
type:BraintreeError.types.MERCHANT,
code:'CLIENT_OPTION_INVALID'},

CLIENT_MISSING_GATEWAY_CONFIGURATION:{
type:BraintreeError.types.INTERNAL,
code:'CLIENT_MISSING_GATEWAY_CONFIGURATION',
message:'Missing gatewayConfiguration.'},

CLIENT_INVALID_AUTHORIZATION:{
type:BraintreeError.types.MERCHANT,
code:'CLIENT_INVALID_AUTHORIZATION',
message:'Authorization is invalid. Make sure your client token or tokenization key is valid.'},

CLIENT_GATEWAY_NETWORK:{
type:BraintreeError.types.NETWORK,
code:'CLIENT_GATEWAY_NETWORK',
message:'Cannot contact the gateway at this time.'},

CLIENT_REQUEST_TIMEOUT:{
type:BraintreeError.types.NETWORK,
code:'CLIENT_REQUEST_TIMEOUT',
message:'Request timed out waiting for a reply.'},

CLIENT_REQUEST_ERROR:{
type:BraintreeError.types.NETWORK,
code:'CLIENT_REQUEST_ERROR',
message:'There was a problem with your request.'},

CLIENT_RATE_LIMITED:{
type:BraintreeError.types.MERCHANT,
code:'CLIENT_RATE_LIMITED',
message:'You are being rate-limited; please try again in a few minutes.'},

CLIENT_AUTHORIZATION_INSUFFICIENT:{
type:BraintreeError.types.MERCHANT,
code:'CLIENT_AUTHORIZATION_INSUFFICIENT',
message:'The authorization used has insufficient privileges.'}};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function EventEmitter(){
this._events={};
}

EventEmitter.prototype.on=function(event,callback){
if(this._events[event]){
this._events[event].push(callback);
}else{
this._events[event]=[callback];
}
};

EventEmitter.prototype._emit=function(event){
var i,args;
var callbacks=this._events[event];

if(!callbacks){return;}

args=Array.prototype.slice.call(arguments,1);

for(i=0;i<callbacks.length;i++){
callbacks[i].apply(null,args);
}
};

module.exports=EventEmitter;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob=__webpack_require__(22).atob;

module.exports=function(client){
var authorizationFingerprint;
var configuration=client.getConfiguration();

if(configuration.authorizationType!=='TOKENIZATION_KEY'){
authorizationFingerprint=JSON.parse(atob(configuration.authorization)).authorizationFingerprint;
return!authorizationFingerprint||authorizationFingerprint.indexOf('customer_id=')===-1;
}
return true;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browserDetection=__webpack_require__(101);

function isHidden(element){
if(!element){
return false;
}

if(element.style.display==='none'){
return true;
}

return isHidden(element.parentNode);
}

function onTransitionEnd(element,propertyName,callback){
if(browserDetection.isIe9()||isHidden(element)){
callback();
return;
}

function transitionEventListener(event){
if(event.propertyName===propertyName){
element.removeEventListener('transitionend',transitionEventListener);
callback();
}
}

element.addEventListener('transitionend',transitionEventListener);
}

module.exports={
onTransitionEnd:onTransitionEnd};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var assign=__webpack_require__(11).assign;
var BaseView=__webpack_require__(6);
var btPaypal=__webpack_require__(103);
var DropinError=__webpack_require__(4);

var ASYNC_DEPENDENCY_TIMEOUT=30000;
var READ_ONLY_CONFIGURATION_OPTIONS=['offerCredit','locale'];

function BasePayPalView(){
BaseView.apply(this,arguments);
}

BasePayPalView.prototype=Object.create(BaseView.prototype);

BasePayPalView.prototype._initialize=function(isCredit){
var asyncDependencyTimeoutHandler;
var setupComplete=false;
var self=this;
var paypalType=isCredit?'paypalCredit':'paypal';
var paypalConfiguration=this.model.merchantConfiguration[paypalType];

this.paypalConfiguration=assign({},paypalConfiguration);

this.model.asyncDependencyStarting();
asyncDependencyTimeoutHandler=setTimeout(function(){
self.model.asyncDependencyFailed({
view:self.ID,
error:new DropinError('There was an error connecting to PayPal.')});

},ASYNC_DEPENDENCY_TIMEOUT);

btPaypal.create({client:this.client},function(err,paypalInstance){
var checkoutJSConfiguration;
var buttonSelector='[data-braintree-id="paypal-button"]';
var environment=self.client.getConfiguration().gatewayConfiguration.environment==='production'?'production':'sandbox';
var locale=self.model.merchantConfiguration.locale;

if(err){
self.model.asyncDependencyFailed({
view:self.ID,
error:err});

return;
}

self.paypalInstance=paypalInstance;

self.paypalConfiguration.offerCredit=Boolean(isCredit);
checkoutJSConfiguration={
env:environment,
style:self.paypalConfiguration.buttonStyle||{},
locale:locale,
payment:function payment(){
return paypalInstance.createPayment(self.paypalConfiguration).catch(reportError);
},
onAuthorize:function onAuthorize(data){
return paypalInstance.tokenizePayment(data).then(function(tokenizePayload){
if(self.paypalConfiguration.flow==='vault'&&!self.model.isGuestCheckout){
tokenizePayload.vaulted=true;
}
self.model.addPaymentMethod(tokenizePayload);
}).catch(reportError);
},
onError:reportError};


if(locale){
self.paypalConfiguration.locale=locale;
}

if(isCredit){
buttonSelector='[data-braintree-id="paypal-credit-button"]';
checkoutJSConfiguration.style.label='credit';
}

global.paypal.Button.render(checkoutJSConfiguration,buttonSelector).then(function(){
self.model.asyncDependencyReady();
setupComplete=true;
clearTimeout(asyncDependencyTimeoutHandler);
}).catch(reportError);
});

function reportError(err){
if(setupComplete){
self.model.reportError(err);
}else{
self.model.asyncDependencyFailed({
view:self.ID,
error:new DropinError(err)});

clearTimeout(asyncDependencyTimeoutHandler);
}
}
};

BasePayPalView.prototype.updateConfiguration=function(key,value){
if(READ_ONLY_CONFIGURATION_OPTIONS.indexOf(key)===-1){
this.paypalConfiguration[key]=value;
}
};

module.exports=BasePayPalView;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);

module.exports={
PAYPAL_NOT_ENABLED:{
type:BraintreeError.types.MERCHANT,
code:'PAYPAL_NOT_ENABLED',
message:'PayPal is not enabled for this merchant.'},

PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED:{
type:BraintreeError.types.MERCHANT,
code:'PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED',
message:'A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing for details on linking your PayPal sandbox with Braintree.'},

PAYPAL_TOKENIZATION_REQUEST_ACTIVE:{
type:BraintreeError.types.MERCHANT,
code:'PAYPAL_TOKENIZATION_REQUEST_ACTIVE',
message:'Another tokenization request is active.'},

PAYPAL_ACCOUNT_TOKENIZATION_FAILED:{
type:BraintreeError.types.NETWORK,
code:'PAYPAL_ACCOUNT_TOKENIZATION_FAILED',
message:'Could not tokenize user\'s PayPal account.'},

PAYPAL_FLOW_FAILED:{
type:BraintreeError.types.NETWORK,
code:'PAYPAL_FLOW_FAILED',
message:'Could not initialize PayPal flow.'},

PAYPAL_FLOW_OPTION_REQUIRED:{
type:BraintreeError.types.MERCHANT,
code:'PAYPAL_FLOW_OPTION_REQUIRED',
message:'PayPal flow property is invalid or missing.'},

PAYPAL_POPUP_OPEN_FAILED:{
type:BraintreeError.types.MERCHANT,
code:'PAYPAL_POPUP_OPEN_FAILED',
message:'PayPal popup failed to open, make sure to tokenize in response to a user action.'},

PAYPAL_POPUP_CLOSED:{
type:BraintreeError.types.CUSTOMER,
code:'PAYPAL_POPUP_CLOSED',
message:'Customer closed PayPal popup before authorizing.'},

PAYPAL_INVALID_PAYMENT_OPTION:{
type:BraintreeError.types.MERCHANT,
code:'PAYPAL_INVALID_PAYMENT_OPTION',
message:'PayPal payment options are invalid.'}};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseView=__webpack_require__(6);
var PaymentMethodView=__webpack_require__(107);
var DropinError=__webpack_require__(4);
var classlist=__webpack_require__(12);
var errors=__webpack_require__(1).errors;
var Promise=__webpack_require__(7);

var PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING={
CreditCard:'Card',
PayPalAccount:'PayPal'};


function PaymentMethodsView(){
BaseView.apply(this,arguments);

this._initialize();
}

PaymentMethodsView.prototype=Object.create(BaseView.prototype);
PaymentMethodsView.prototype.constructor=PaymentMethodsView;
PaymentMethodsView.ID=PaymentMethodsView.prototype.ID='methods';

PaymentMethodsView.prototype._initialize=function(){
var i;
var paymentMethods=this.model.getPaymentMethods();

this.views=[];
this.container=this.getElementById('methods-container');
this._headingLabel=this.getElementById('methods-label');

this.model.on('addPaymentMethod',this._addPaymentMethod.bind(this));
this.model.on('removePaymentMethod',this._removePaymentMethod.bind(this));
this.model.on('changeActivePaymentMethod',this._changeActivePaymentMethodView.bind(this));

for(i=paymentMethods.length-1;i>=0;i--){
this._addPaymentMethod(paymentMethods[i]);
}
};

PaymentMethodsView.prototype.removeActivePaymentMethod=function(){
if(!this.activeMethodView){
return;
}
this.activeMethodView.setActive(false);
this.activeMethodView=null;
classlist.add(this._headingLabel,'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype._getPaymentMethodString=function(){
var stringKey=PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING[this.activeMethodView.paymentMethod.type];
var paymentMethodTypeString=this.strings[stringKey];

return this.strings.payingWith.replace('{{paymentSource}}',paymentMethodTypeString);
};

PaymentMethodsView.prototype._addPaymentMethod=function(paymentMethod){
var paymentMethodView=new PaymentMethodView({
model:this.model,
paymentMethod:paymentMethod,
strings:this.strings});


if(this.model.isGuestCheckout&&this.container.firstChild){
this.container.removeChild(this.container.firstChild);
this.views.pop();
}

if(this.container.firstChild){
this.container.insertBefore(paymentMethodView.element,this.container.firstChild);
}else{
this.container.appendChild(paymentMethodView.element);
}

this.views.push(paymentMethodView);
};

PaymentMethodsView.prototype._removePaymentMethod=function(paymentMethod){
var i;

for(i=0;i<this.views.length;i++){
if(this.views[i].paymentMethod===paymentMethod){
this.container.removeChild(this.views[i].element);
this._headingLabel.innerHTML='&nbsp;';
this.views.splice(i,1);
break;
}
}
};

PaymentMethodsView.prototype._changeActivePaymentMethodView=function(paymentMethod){
var i;
var previousActiveMethodView=this.activeMethodView;

for(i=0;i<this.views.length;i++){
if(this.views[i].paymentMethod===paymentMethod){
this.activeMethodView=this.views[i];
this._headingLabel.textContent=this._getPaymentMethodString();
break;
}
}

if(previousActiveMethodView){
previousActiveMethodView.setActive(false);
}
this.activeMethodView.setActive(true);
classlist.remove(this._headingLabel,'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype.requestPaymentMethod=function(){
if(!this.activeMethodView){
return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
}
return Promise.resolve(this.activeMethodView.paymentMethod);
};

module.exports=PaymentMethodsView;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics=__webpack_require__(8);
var addSelectionEventHandler=__webpack_require__(21);
var BaseView=__webpack_require__(6);

var paymentOptionIDs=__webpack_require__(1).paymentOptionIDs;

var paymentMethodOptionHTML="<div class=\"braintree-option__logo\">\n  <svg width=\"48\" height=\"29\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-option__label\" aria-label=\"@OPTION_LABEL\">\n  @OPTION_TITLE\n  <div class=\"braintree-option__disabled-message\"></div>\n</div>\n";

function PaymentOptionsView(){
BaseView.apply(this,arguments);

this._initialize();
}

PaymentOptionsView.prototype=Object.create(BaseView.prototype);
PaymentOptionsView.prototype.constructor=PaymentOptionsView;
PaymentOptionsView.ID=PaymentOptionsView.prototype.ID='options';

PaymentOptionsView.prototype._initialize=function(){
this.container=this.getElementById('payment-options-container');
this.elements={};

this.model.supportedPaymentOptions.forEach(function(paymentOptionID){
this._addPaymentOption(paymentOptionID);
}.bind(this));
};

PaymentOptionsView.prototype._addPaymentOption=function(paymentOptionID){
var paymentSource;
var div=document.createElement('div');
var html=paymentMethodOptionHTML;
var clickHandler=function clickHandler(){
this.mainView.setPrimaryView(paymentOptionID);
this.model.selectPaymentOption(paymentOptionID);
analytics.sendEvent(this.client,'selected.'+paymentOptionIDs[paymentOptionID]);
}.bind(this);

div.className='braintree-option braintree-option__'+paymentOptionID;
div.setAttribute('tabindex','0');

switch(paymentOptionID){
case paymentOptionIDs.card:
paymentSource=this.strings.Card;
html=html.replace(/@ICON/g,'iconCardFront');
html=html.replace(/@OPTION_LABEL/g,this._generateOptionLabel(paymentSource));
html=html.replace(/@OPTION_TITLE/g,paymentSource);
html=html.replace(/@CLASSNAME/g,'braintree-icon--bordered');
break;
case paymentOptionIDs.paypal:
paymentSource=this.strings.PayPal;
html=html.replace(/@ICON/g,'logoPayPal');
html=html.replace(/@OPTION_LABEL/g,this._generateOptionLabel(this.strings.PayPal));
html=html.replace(/@OPTION_TITLE/g,this.strings.PayPal);
html=html.replace(/@CLASSNAME/g,'');
break;
case paymentOptionIDs.paypalCredit:
paymentSource=this.strings['PayPal Credit'];
html=html.replace(/@ICON/g,'logoPayPalCredit');
html=html.replace(/@OPTION_LABEL/g,this._generateOptionLabel(paymentSource));
html=html.replace(/@OPTION_TITLE/g,paymentSource);
html=html.replace(/@CLASSNAME/g,'');
break;
default:
break;}


div.innerHTML=html;

addSelectionEventHandler(div,clickHandler);

this.container.appendChild(div);
this.elements[paymentOptionID]={
div:div,
clickHandler:clickHandler};

};

PaymentOptionsView.prototype._generateOptionLabel=function(paymentSourceString){
return this.strings.payingWith.replace('{{paymentSource}}',paymentSourceString);
};

module.exports=PaymentOptionsView;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uuid(){
return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
var r=Math.random()*16|0;
var v=c==='x'?r:r&0x3|0x8;

return v.toString(16);
});
}

module.exports=uuid;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _reactNativeWebviewMessaging=__webpack_require__(42);var _reactNativeWebviewMessaging2=_interopRequireDefault(_reactNativeWebviewMessaging);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}
var dropin=__webpack_require__(44);

var submitButton=document.querySelector("#submit-button");
var clientToken="";
var goBackButton=document.querySelector("#go-back-button");
var noticeBox=document.querySelector("#notice-box");
var loader=document.querySelector("#loader");

_reactNativeWebviewMessaging2.default.on("tokenReceived",function(event){
clientToken=event.payload.clientToken;

dropin.
create({
authorization:clientToken,
container:"#dropin-container"}).

then(function(instance){

submitButton.addEventListener("click",function(){
instance.requestPaymentMethod(function(err,payload){
if(err){
_reactNativeWebviewMessaging2.default.emit("nonceObtained",{
payload:{
type:"error",
err:err}});


}else{

_reactNativeWebviewMessaging2.default.emit("nonceObtained",{
payload:{
type:"success",
payload:payload}});


}
});
});
}).
catch(function(err){

_reactNativeWebviewMessaging2.default.sendJSON({
type:"error",
err:err});

});
});

_reactNativeWebviewMessaging2.default.on("purchasing",function(event){
submitButton.style.display="none";
noticeBox.style.display="inline";
loader.style.display="inline";
noticeBox.innerHTML="Making Purchase";
});

_reactNativeWebviewMessaging2.default.on("purchaseSuccess",function(event){
goBackButton.style.display="inline";
loader.style.display="none";
noticeBox.innerHTML="Thank You For Your Purchase";
});

_reactNativeWebviewMessaging2.default.on("purchaseFailure",function(event){
goBackButton.style.display="inline";
loader.style.display="none";
noticeBox.innerHTML="Purchase Error "+event.payload;
});

goBackButton.addEventListener("click",function(){
_reactNativeWebviewMessaging2.default.emit("goBack");
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};var _events=__webpack_require__(43);var _events2=_interopRequireDefault(_events);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

RNMessagesChannel=function(_EventEmitter){_inherits(RNMessagesChannel,_EventEmitter);function RNMessagesChannel(){_classCallCheck(this,RNMessagesChannel);return _possibleConstructorReturn(this,(RNMessagesChannel.__proto__||Object.getPrototypeOf(RNMessagesChannel)).apply(this,arguments));}_createClass(RNMessagesChannel,[{key:'sendJSON',value:function sendJSON(
json){
window.postMessage(JSON.stringify({
type:'json',
payload:json}));

}},{key:'send',value:function send(

string){
window.postMessage(JSON.stringify({
type:'text',
payload:string}));

}},{key:'emit',value:function emit(

eventName,eventData,fromRN){
_get(RNMessagesChannel.prototype.__proto__||Object.getPrototypeOf(RNMessagesChannel.prototype),'emit',this).call(this,eventName,eventData);

if(fromRN){
return;
}

window.postMessage(JSON.stringify({
type:'event',
meta:{
eventName:eventName},

payload:eventData}));

}}]);return RNMessagesChannel;}(_events2.default);


window.RNMessagesChannel=new RNMessagesChannel();

module.exports=window.RNMessagesChannel;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==='function'?Symbol.prototype:'@@prototype')?"symbol":typeof obj;};




















function EventEmitter(){
this._events=this._events||{};
this._maxListeners=this._maxListeners||undefined;
}
module.exports=EventEmitter;


EventEmitter.EventEmitter=EventEmitter;

EventEmitter.prototype._events=undefined;
EventEmitter.prototype._maxListeners=undefined;



EventEmitter.defaultMaxListeners=10;



EventEmitter.prototype.setMaxListeners=function(n){
if(!isNumber(n)||n<0||isNaN(n))
throw TypeError('n must be a positive number');
this._maxListeners=n;
return this;
};

EventEmitter.prototype.emit=function(type){
var er,handler,len,args,i,listeners;

if(!this._events)
this._events={};


if(type==='error'){
if(!this._events.error||
isObject(this._events.error)&&!this._events.error.length){
er=arguments[1];
if(er instanceof Error){
throw er;
}else{

var err=new Error('Uncaught, unspecified "error" event. ('+er+')');
err.context=er;
throw err;
}
}
}

handler=this._events[type];

if(isUndefined(handler))
return false;

if(isFunction(handler)){
switch(arguments.length){

case 1:
handler.call(this);
break;
case 2:
handler.call(this,arguments[1]);
break;
case 3:
handler.call(this,arguments[1],arguments[2]);
break;

default:
args=Array.prototype.slice.call(arguments,1);
handler.apply(this,args);}

}else if(isObject(handler)){
args=Array.prototype.slice.call(arguments,1);
listeners=handler.slice();
len=listeners.length;
for(i=0;i<len;i++){
listeners[i].apply(this,args);}
}

return true;
};

EventEmitter.prototype.addListener=function(type,listener){
var m;

if(!isFunction(listener))
throw TypeError('listener must be a function');

if(!this._events)
this._events={};



if(this._events.newListener)
this.emit('newListener',type,
isFunction(listener.listener)?
listener.listener:listener);

if(!this._events[type])

this._events[type]=listener;else
if(isObject(this._events[type]))

this._events[type].push(listener);else


this._events[type]=[this._events[type],listener];


if(isObject(this._events[type])&&!this._events[type].warned){
if(!isUndefined(this._maxListeners)){
m=this._maxListeners;
}else{
m=EventEmitter.defaultMaxListeners;
}

if(m&&m>0&&this._events[type].length>m){
this._events[type].warned=true;
console.error('(node) warning: possible EventEmitter memory '+
'leak detected. %d listeners added. '+
'Use emitter.setMaxListeners() to increase limit.',
this._events[type].length);
if(typeof console.trace==='function'){

console.trace();
}
}
}

return this;
};

EventEmitter.prototype.on=EventEmitter.prototype.addListener;

EventEmitter.prototype.once=function(type,listener){
if(!isFunction(listener))
throw TypeError('listener must be a function');

var fired=false;

function g(){
this.removeListener(type,g);

if(!fired){
fired=true;
listener.apply(this,arguments);
}
}

g.listener=listener;
this.on(type,g);

return this;
};


EventEmitter.prototype.removeListener=function(type,listener){
var list,position,length,i;

if(!isFunction(listener))
throw TypeError('listener must be a function');

if(!this._events||!this._events[type])
return this;

list=this._events[type];
length=list.length;
position=-1;

if(list===listener||
isFunction(list.listener)&&list.listener===listener){
delete this._events[type];
if(this._events.removeListener)
this.emit('removeListener',type,listener);

}else if(isObject(list)){
for(i=length;i-->0;){
if(list[i]===listener||
list[i].listener&&list[i].listener===listener){
position=i;
break;
}
}

if(position<0)
return this;

if(list.length===1){
list.length=0;
delete this._events[type];
}else{
list.splice(position,1);
}

if(this._events.removeListener)
this.emit('removeListener',type,listener);
}

return this;
};

EventEmitter.prototype.removeAllListeners=function(type){
var key,listeners;

if(!this._events)
return this;


if(!this._events.removeListener){
if(arguments.length===0)
this._events={};else
if(this._events[type])
delete this._events[type];
return this;
}


if(arguments.length===0){
for(key in this._events){
if(key==='removeListener')continue;
this.removeAllListeners(key);
}
this.removeAllListeners('removeListener');
this._events={};
return this;
}

listeners=this._events[type];

if(isFunction(listeners)){
this.removeListener(type,listeners);
}else if(listeners){

while(listeners.length){
this.removeListener(type,listeners[listeners.length-1]);}
}
delete this._events[type];

return this;
};

EventEmitter.prototype.listeners=function(type){
var ret;
if(!this._events||!this._events[type])
ret=[];else
if(isFunction(this._events[type]))
ret=[this._events[type]];else

ret=this._events[type].slice();
return ret;
};

EventEmitter.prototype.listenerCount=function(type){
if(this._events){
var evlistener=this._events[type];

if(isFunction(evlistener))
return 1;else
if(evlistener)
return evlistener.length;
}
return 0;
};

EventEmitter.listenerCount=function(emitter,type){
return emitter.listenerCount(type);
};

function isFunction(arg){
return typeof arg==='function';
}

function isNumber(arg){
return typeof arg==='number';
}

function isObject(arg){
return(typeof arg==='undefined'?'undefined':_typeof(arg))==='object'&&arg!==null;
}

function isUndefined(arg){
return arg===void 0;
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";






































































































var Dropin=__webpack_require__(45);
var client=__webpack_require__(23);
var createFromScriptTag=__webpack_require__(133);
var constants=__webpack_require__(1);
var analytics=__webpack_require__(8);
var DropinError=__webpack_require__(4);
var Promise=__webpack_require__(7);
var wrapPromise=__webpack_require__(3);

var VERSION="1.6.1";














































































































































































































































































function create(options){
if(!options.authorization){
return Promise.reject(new DropinError('options.authorization is required.'));
}

return client.create({
authorization:options.authorization}).
catch(function(err){
return Promise.reject(new DropinError({
message:'There was an error creating Drop-in.',
braintreeWebError:err}));

}).then(function(clientInstance){
clientInstance=setAnalyticsIntegration(clientInstance);

if(clientInstance.getConfiguration().authorizationType==='TOKENIZATION_KEY'){
analytics.sendEvent(clientInstance,'started.tokenization-key');
}else{
analytics.sendEvent(clientInstance,'started.client-token');
}

return new Promise(function(resolve,reject){
new Dropin({
merchantConfiguration:options,
client:clientInstance}).
_initialize(function(err,instance){
if(err){
reject(err);
return;
}

resolve(instance);
});
});
});
}

function setAnalyticsIntegration(clientInstance){
var configuration=clientInstance.getConfiguration();

configuration.analyticsMetadata.integration=constants.INTEGRATION;
configuration.analyticsMetadata.integrationType=constants.INTEGRATION;
configuration.analyticsMetadata.dropinVersion=VERSION;

clientInstance.getConfiguration=function(){
return configuration;
};

return clientInstance;
}


createFromScriptTag(create,typeof document!=='undefined'&&document.querySelector('script[data-braintree-dropin-authorization]'));

module.exports={
create:wrapPromise(create),




VERSION:VERSION};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign=__webpack_require__(11).assign;
var analytics=__webpack_require__(8);
var constants=__webpack_require__(1);
var DropinError=__webpack_require__(4);
var DropinModel=__webpack_require__(67);
var EventEmitter=__webpack_require__(33);
var isGuestCheckout=__webpack_require__(34);

var MainView=__webpack_require__(68);
var paymentMethodsViewID=__webpack_require__(38).ID;
var paymentOptionsViewID=__webpack_require__(39).ID;
var paymentOptionIDs=constants.paymentOptionIDs;
var translations=__webpack_require__(109);
var uuid=__webpack_require__(40);
var Promise=__webpack_require__(7);
var wrapPrototype=__webpack_require__(3).wrapPrototype;

var mainHTML="<div class=\"braintree-dropin\">\n  <div data-braintree-id=\"methods-label\" class=\"braintree-heading\">&nbsp;</div>\n  <div data-braintree-id=\"choose-a-way-to-pay\" class=\"braintree-heading\">{{chooseAWayToPay}}</div>\n  <div class=\"braintree-placeholder\">&nbsp;</div>\n\n  <div data-braintree-id=\"upper-container\" class=\"braintree-upper-container\">\n    <div data-braintree-id=\"loading-container\" class=\"braintree-loader__container\">\n      <div data-braintree-id=\"loading-indicator\" class=\"braintree-loader__indicator\">\n        <svg width=\"14\" height=\"16\" class=\"braintree-loader__lock\">\n          <use xlink:href=\"#iconLockLoader\"></use>\n        </svg>\n      </div>\n    </div>\n\n    <div data-braintree-id=\"methods\" class=\"braintree-methods braintree-methods-initial\">\n      <div data-braintree-id=\"methods-container\"></div>\n    </div>\n\n    <div data-braintree-id=\"options\" class=\"braintree-test-class braintree-options braintree-options-initial\">\n      <div data-braintree-id=\"payment-options-container\" class=\"braintree-options-list\"></div>\n    </div>\n\n    <div data-braintree-id=\"sheet-container\" class=\"braintree-sheet__container\">\n      <div data-braintree-id=\"paypal\" class=\"braintree-paypal braintree-sheet\">\n        <div data-braintree-id=\"paypal-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPal\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"paypalCredit\" class=\"braintree-paypalCredit braintree-sheet\">\n        <div data-braintree-id=\"paypal-credit-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPalCredit\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal Credit}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-credit-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"card\" class=\"braintree-card braintree-form braintree-sheet\">\n        <div data-braintree-id=\"card-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                <use xlink:href=\"#iconCardFront\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__text\">{{payWithCard}}</div>\n          </div>\n          <div data-braintree-id=\"card-view-icons\" class=\"braintree-sheet__icons\"></div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--form\">\n          <div data-braintree-id=\"cardholder-name-field-group\" class=\"braintree-form__field-group\">\n            <div class=\"braintree-form__label\">{{cardholderNameLabel}}</div>\n            <div class=\"braintree-form__field\">\n              <div class=\"braintree-form-cardholder-name braintree-form__hosted-field\">\n                <input id=\"braintree__card-view-input__cardholder-name\" type=\"text\" placeholder=\"{{cardholderNamePlaceholder}}\"/>\n              </div>\n              <div class=\"braintree-form__icon-container\">\n                <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                  <svg width=\"24\" height=\"24\">\n                    <use xlink:href=\"#iconError\"></use>\n                  </svg>\n                </div>\n              </div>\n            </div>\n            <div data-braintree-id=\"cardholder-name-field-error\" class=\"braintree-form__field-error\">{{fieldEmptyForCardholderName}}</div>\n          </div>\n          <div data-braintree-id=\"number-field-group\" class=\"braintree-form__field-group\">\n            <div class=\"braintree-form__label\">{{cardNumberLabel}}</div>\n            <div class=\"braintree-form__field\">\n              <div class=\"braintree-form-number braintree-form__hosted-field\"></div>\n              <div class=\"braintree-form__icon-container\">\n                <div data-braintree-id=\"card-number-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                  <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                  <use data-braintree-id=\"card-number-icon-svg\" xlink:href=\"#iconCardFront\"></use>\n                  </svg>\n                </div>\n                <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                  <svg width=\"24\" height=\"24\">\n                    <use xlink:href=\"#iconError\"></use>\n                  </svg>\n                </div>\n              </div>\n            </div>\n            <div data-braintree-id=\"number-field-error\" class=\"braintree-form__field-error\"></div>\n          </div>\n\n          <div class=\"braintree-form__flexible-fields\">\n            <div data-braintree-id=\"expiration-date-field-group\" class=\"braintree-form__field-group\">\n              <div class=\"braintree-form__label\">{{expirationDateLabel}}\n                <span class=\"braintree-form__descriptor\">{{expirationDateLabelSubheading}}</span>\n              </div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form__hosted-field braintree-form-expiration\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n\n              <div data-braintree-id=\"expiration-date-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n\n            <div data-braintree-id=\"cvv-field-group\" class=\"braintree-form__field-group\">\n              <div class=\"braintree-form__label\">{{cvvLabel}}\n                <span data-braintree-id=\"cvv-label-descriptor\" class=\"braintree-form__descriptor\">{{cvvThreeDigitLabelSubheading}}</span>\n              </div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form__hosted-field braintree-form-cvv\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div data-braintree-id=\"cvv-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                    <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                    <use data-braintree-id=\"cvv-icon-svg\" xlink:href=\"#iconCVVBack\"></use>\n                    </svg>\n                  </div>\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n              <div data-braintree-id=\"cvv-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n\n            <div data-braintree-id=\"postal-code-field-group\" class=\"braintree-form__field-group\">\n              <div class=\"braintree-form__label\">{{postalCodeLabel}}</div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form__hosted-field braintree-form-postal-code\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n              <div data-braintree-id=\"postal-code-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div data-braintree-id=\"sheet-error\" class=\"braintree-sheet__error\">\n        <div class=\"braintree-form__icon braintree-sheet__error-icon\">\n          <svg width=\"24\" height=\"24\">\n            <use xlink:href=\"#iconError\"></use>\n          </svg>\n        </div>\n        <div data-braintree-id=\"sheet-error-text\" class=\"braintree-sheet__error-text\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div data-braintree-id=\"lower-container\" class=\"braintree-test-class braintree-options braintree-hidden\">\n    <div data-braintree-id=\"other-ways-to-pay\" class=\"braintree-heading\">{{otherWaysToPay}}</div>\n  </div>\n\n  <div data-braintree-id=\"toggle\" class=\"braintree-toggle braintree-hidden\" tabindex=\"0\">\n    <span>{{chooseAnotherWayToPay}}</span>\n  </div>\n</div>\n";
var svgHTML="<svg data-braintree-id=\"svgs\" style=\"display: none\">\n  <defs>\n    <symbol id=\"icon-visa\" viewBox=\"0 0 40 24\">\n      <title>Visa</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M0 22.033C0 23.12.892 24 1.992 24h36.016c1.1 0 1.992-.88 1.992-1.967V20.08H0v1.953z\" style=\"fill: #F8B600\" />\n      <path d=\"M0 3.92h40V1.967C40 .88 39.108 0 38.008 0H1.992C.892 0 0 .88 0 1.967V3.92zM19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z\" style=\"fill: #1A1F71\" />\n    </symbol>\n\n    <symbol id=\"icon-master-card\" viewBox=\"0 0 40 24\">\n      <title>MasterCard</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M11.085 22.2v-1.36c0-.522-.318-.863-.864-.863-.272 0-.568.09-.773.386-.16-.25-.386-.386-.727-.386-.228 0-.455.068-.637.318v-.272h-.478V22.2h.478v-1.202c0-.386.204-.567.523-.567.318 0 .478.205.478.568V22.2h.477v-1.202c0-.386.23-.567.524-.567.32 0 .478.205.478.568V22.2h.523zm7.075-2.177h-.774v-.658h-.478v.658h-.432v.43h.432v.998c0 .5.205.795.75.795.206 0 .433-.068.592-.16l-.136-.407c-.136.09-.296.114-.41.114-.227 0-.318-.137-.318-.363v-.976h.774v-.43zm4.048-.046c-.273 0-.454.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .204.023.295.046l.137-.454c-.09-.023-.228-.023-.32-.023zm-6.118.227c-.228-.16-.546-.227-.888-.227-.546 0-.91.272-.91.703 0 .363.274.567.75.635l.23.023c.25.045.385.113.385.227 0 .16-.182.272-.5.272-.32 0-.57-.113-.728-.227l-.228.363c.25.18.59.272.932.272.637 0 1-.295 1-.703 0-.385-.295-.59-.75-.658l-.227-.022c-.205-.023-.364-.068-.364-.204 0-.16.16-.25.41-.25.272 0 .545.114.682.182l.205-.386zm12.692-.227c-.273 0-.455.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .203.023.294.046L29.1 20c-.09-.023-.227-.023-.318-.023zm-6.096 1.134c0 .66.455 1.135 1.16 1.135.32 0 .546-.068.774-.25l-.228-.385c-.182.136-.364.204-.57.204-.385 0-.658-.272-.658-.703 0-.407.273-.68.66-.702.204 0 .386.068.568.204l.228-.385c-.228-.182-.455-.25-.774-.25-.705 0-1.16.477-1.16 1.134zm4.413 0v-1.087h-.48v.272c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.317 0 .545-.113.68-.317v.272h.48v-1.09zm-1.753 0c0-.384.25-.702.66-.702.387 0 .66.295.66.703 0 .387-.273.704-.66.704-.41-.022-.66-.317-.66-.703zm-5.71-1.133c-.636 0-1.09.454-1.09 1.134 0 .682.454 1.135 1.114 1.135.32 0 .638-.09.888-.295l-.228-.34c-.18.136-.41.227-.636.227-.296 0-.592-.136-.66-.522h1.615v-.18c.022-.704-.388-1.158-1.002-1.158zm0 .41c.297 0 .502.18.547.52h-1.137c.045-.295.25-.52.59-.52zm11.852.724v-1.95h-.48v1.135c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.68-.317v.272h.48v-1.09zm-1.752 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703zm-15.97 0v-1.087h-.476v.272c-.16-.204-.387-.318-.683-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.682-.317v.272h.477v-1.09zm-1.773 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703z\" style=\"fill: #000\" />\n      <path style=\"fill: #FF5F00\" d=\"M23.095 3.49H15.93v12.836h7.165\" />\n      <path d=\"M16.382 9.91c0-2.61 1.23-4.922 3.117-6.42-1.39-1.087-3.14-1.745-5.05-1.745-4.528 0-8.19 3.65-8.19 8.164 0 4.51 3.662 8.162 8.19 8.162 1.91 0 3.66-.657 5.05-1.746-1.89-1.474-3.118-3.81-3.118-6.417z\" style=\"fill: #EB001B\" />\n      <path d=\"M32.76 9.91c0 4.51-3.664 8.162-8.19 8.162-1.91 0-3.662-.657-5.05-1.746 1.91-1.496 3.116-3.81 3.116-6.417 0-2.61-1.228-4.922-3.116-6.42 1.388-1.087 3.14-1.745 5.05-1.745 4.526 0 8.19 3.674 8.19 8.164z\" style=\"fill: #F79E1B\" />\n    </symbol>\n\n    <symbol id=\"icon-unionpay\" viewBox=\"0 0 40 24\">\n      <title>Union Pay</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.877 2h8.126c1.135 0 1.84.93 1.575 2.077l-3.783 16.35c-.267 1.142-1.403 2.073-2.538 2.073H5.13c-1.134 0-1.84-.93-1.574-2.073L7.34 4.076C7.607 2.93 8.74 2 9.878 2z\" style=\"fill: #E21836\" />\n      <path d=\"M17.325 2h9.345c1.134 0 .623.93.356 2.077l-3.783 16.35c-.265 1.142-.182 2.073-1.32 2.073H12.58c-1.137 0-1.84-.93-1.574-2.073l3.783-16.35C15.056 2.93 16.19 2 17.324 2z\" style=\"fill: #00447B\" />\n      <path d=\"M26.3 2h8.126c1.136 0 1.84.93 1.575 2.077l-3.782 16.35c-.266 1.142-1.402 2.073-2.54 2.073h-8.122c-1.137 0-1.842-.93-1.574-2.073l3.78-16.35C24.03 2.93 25.166 2 26.303 2z\" style=\"fill: #007B84\" />\n      <path d=\"M27.633 14.072l-.99 3.3h.266l-.208.68h-.266l-.062.212h-.942l.064-.21H23.58l.193-.632h.194l1.005-3.35.2-.676h.962l-.1.34s.255-.184.498-.248c.242-.064 1.636-.088 1.636-.088l-.206.672h-.33zm-1.695 0l-.254.843s.285-.13.44-.172c.16-.04.395-.057.395-.057l.182-.614h-.764zm-.38 1.262l-.263.877s.29-.15.447-.196c.157-.037.396-.066.396-.066l.185-.614h-.766zm-.614 2.046h.767l.222-.74h-.765l-.223.74z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M28.055 13.4h1.027l.01.385c-.005.065.05.096.17.096h.208l-.19.637h-.555c-.48.035-.662-.172-.65-.406l-.02-.71zM28.193 16.415h-.978l.167-.566H28.5l.16-.517h-1.104l.19-.638h3.072l-.193.638h-1.03l-.16.516h1.032l-.17.565H29.18l-.2.24h.454l.11.712c.013.07.014.116.036.147.023.026.158.038.238.038h.137l-.21.694h-.348c-.054 0-.133-.004-.243-.01-.105-.008-.18-.07-.25-.105-.064-.03-.16-.11-.182-.24l-.11-.712-.507.7c-.162.222-.38.39-.748.39h-.712l.186-.62h.273c.078 0 .15-.03.2-.056.052-.023.098-.05.15-.126l.74-1.05zM17.478 14.867h2.59l-.19.622H18.84l-.16.53h1.06l-.194.64h-1.06l-.256.863c-.03.095.25.108.353.108l.53-.072-.212.71h-1.193c-.096 0-.168-.013-.272-.037-.1-.023-.145-.07-.19-.138-.043-.07-.11-.128-.064-.278l.343-1.143h-.588l.195-.65h.592l.156-.53h-.588l.188-.623zM19.223 13.75h1.063l-.194.65H18.64l-.157.136c-.067.066-.09.038-.18.087-.08.04-.254.123-.477.123h-.466l.19-.625h.14c.118 0 .198-.01.238-.036.046-.03.098-.096.157-.203l.267-.487h1.057l-.187.356zM20.74 13.4h.905l-.132.46s.286-.23.487-.313c.2-.075.65-.143.65-.143l1.464-.007-.498 1.672c-.085.286-.183.472-.244.555-.055.087-.12.16-.248.23-.124.066-.236.104-.34.115-.096.007-.244.01-.45.012h-1.41l-.4 1.324c-.037.13-.055.194-.03.23.02.03.068.066.135.066l.62-.06-.21.726h-.698c-.22 0-.383-.004-.495-.013-.108-.01-.22 0-.295-.058-.065-.058-.164-.133-.162-.21.007-.073.037-.192.082-.356l1.268-4.23zm1.922 1.69h-1.484l-.09.3h1.283c.152-.018.184.004.196-.003l.096-.297zm-1.402-.272s.29-.266.786-.353c.112-.022.82-.015.82-.015l.106-.357h-1.496l-.216.725z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M23.382 16.1l-.084.402c-.036.125-.067.22-.16.302-.1.084-.216.172-.488.172l-.502.02-.004.455c-.006.13.028.117.048.138.024.022.045.032.067.04l.157-.008.48-.028-.198.663h-.552c-.385 0-.67-.008-.765-.084-.092-.057-.105-.132-.103-.26l.035-1.77h.88l-.013.362h.212c.072 0 .12-.007.15-.026.027-.02.047-.048.06-.093l.087-.282h.692zM10.84 7.222c-.032.143-.596 2.763-.598 2.764-.12.53-.21.91-.508 1.152-.172.14-.37.21-.6.21-.37 0-.587-.185-.624-.537l-.007-.12.113-.712s.593-2.388.7-2.703c.002-.017.005-.026.007-.035-1.152.01-1.357 0-1.37-.018-.007.024-.037.173-.037.173l-.605 2.688-.05.23-.1.746c0 .22.042.4.13.553.275.485 1.06.557 1.504.557.573 0 1.11-.123 1.47-.345.63-.375.797-.962.944-1.48l.067-.267s.61-2.48.716-2.803c.003-.017.006-.026.01-.035-.835.01-1.08 0-1.16-.018zM14.21 12.144c-.407-.006-.55-.006-1.03.018l-.018-.036c.042-.182.087-.363.127-.548l.06-.25c.086-.39.173-.843.184-.98.007-.084.036-.29-.2-.29-.1 0-.203.048-.307.096-.058.207-.174.79-.23 1.055-.118.558-.126.62-.178.897l-.036.037c-.42-.006-.566-.006-1.05.018l-.024-.04c.08-.332.162-.668.24-.998.203-.9.25-1.245.307-1.702l.04-.028c.47-.067.585-.08 1.097-.185l.043.047-.077.287c.086-.052.168-.104.257-.15.242-.12.51-.155.658-.155.223 0 .468.062.57.323.098.232.034.52-.094 1.084l-.066.287c-.13.627-.152.743-.225 1.174l-.05.036zM15.87 12.144c-.245 0-.405-.006-.56 0-.153 0-.303.008-.532.018l-.013-.02-.015-.02c.062-.238.097-.322.128-.406.03-.084.06-.17.115-.41.072-.315.116-.535.147-.728.033-.187.052-.346.075-.53l.02-.014.02-.018c.244-.036.4-.057.56-.082.16-.024.32-.055.574-.103l.008.023.008.022c-.047.195-.094.39-.14.588-.047.197-.094.392-.137.587-.093.414-.13.57-.152.68-.02.105-.026.163-.063.377l-.022.02-.023.017zM19.542 10.728c.143-.633.033-.928-.108-1.11-.213-.273-.59-.36-.978-.36-.235 0-.793.023-1.23.43-.312.29-.458.687-.546 1.066-.088.387-.19 1.086.447 1.344.198.085.48.108.662.108.466 0 .945-.13 1.304-.513.278-.312.405-.775.448-.965zm-1.07-.046c-.02.106-.113.503-.24.673-.086.123-.19.198-.305.198-.033 0-.235 0-.238-.3-.003-.15.027-.304.063-.47.108-.478.236-.88.56-.88.255 0 .27.298.16.78zM29.536 12.187c-.493-.004-.635-.004-1.09.015l-.03-.037c.124-.472.248-.943.358-1.42.142-.62.175-.882.223-1.244l.037-.03c.49-.07.625-.09 1.135-.186l.015.044c-.093.388-.186.777-.275 1.166-.19.816-.258 1.23-.33 1.658l-.044.035z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M29.77 10.784c.144-.63-.432-.056-.525-.264-.14-.323-.052-.98-.62-1.2-.22-.085-.732.025-1.17.428-.31.29-.458.683-.544 1.062-.088.38-.19 1.078.444 1.328.2.085.384.11.567.103.638-.034 1.124-1.002 1.483-1.386.277-.303.326.115.368-.07zm-.974-.047c-.024.1-.117.503-.244.67-.083.117-.283.192-.397.192-.032 0-.232 0-.24-.3 0-.146.03-.3.067-.467.11-.47.235-.87.56-.87.254 0 .363.293.254.774zM22.332 12.144c-.41-.006-.55-.006-1.03.018l-.018-.036c.04-.182.087-.363.13-.548l.057-.25c.09-.39.176-.843.186-.98.008-.084.036-.29-.198-.29-.1 0-.203.048-.308.096-.057.207-.175.79-.232 1.055-.115.558-.124.62-.176.897l-.035.037c-.42-.006-.566-.006-1.05.018l-.022-.04.238-.998c.203-.9.25-1.245.307-1.702l.038-.028c.472-.067.587-.08 1.098-.185l.04.047-.073.287c.084-.052.17-.104.257-.15.24-.12.51-.155.655-.155.224 0 .47.062.575.323.095.232.03.52-.098 1.084l-.065.287c-.133.627-.154.743-.225 1.174l-.05.036zM26.32 8.756c-.07.326-.282.603-.554.736-.225.114-.498.123-.78.123h-.183l.013-.074.336-1.468.01-.076.007-.058.132.015.71.062c.275.105.388.38.31.74zM25.88 7.22l-.34.003c-.883.01-1.238.006-1.383-.012l-.037.182-.315 1.478-.793 3.288c.77-.01 1.088-.01 1.22.004l.21-1.024s.153-.644.163-.667c0 0 .047-.066.096-.092h.07c.665 0 1.417 0 2.005-.437.4-.298.675-.74.797-1.274.03-.132.054-.29.054-.446 0-.205-.04-.41-.16-.568-.3-.423-.896-.43-1.588-.433zM33.572 9.28l-.04-.043c-.502.1-.594.118-1.058.18l-.034.034-.005.023-.003-.007c-.345.803-.334.63-.615 1.26-.003-.03-.003-.048-.004-.077l-.07-1.37-.044-.043c-.53.1-.542.118-1.03.18l-.04.034-.006.056.003.007c.06.315.047.244.108.738.03.244.065.49.093.73.05.4.077.6.134 1.21-.328.55-.408.757-.722 1.238l.017.044c.478-.018.587-.018.94-.018l.08-.088c.265-.578 2.295-4.085 2.295-4.085zM16.318 9.62c.27-.19.304-.45.076-.586-.23-.137-.634-.094-.906.095-.273.186-.304.45-.075.586.228.134.633.094.905-.096z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M31.238 13.415l-.397.684c-.124.232-.357.407-.728.41l-.632-.01.184-.618h.124c.064 0 .11-.004.148-.022.03-.01.054-.035.08-.072l.233-.373h.988z\" style=\"fill: #FEFEFE\" />\n    </symbol>\n\n    <symbol id=\"icon-american-express\" viewBox=\"0 0 40 24\">\n      <title>American Express</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path style=\"fill: #1478BE\" d=\"M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z\" />\n      <path d=\"M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z\" style=\"fill: #1478BE\" />\n    </symbol>\n\n    <symbol id=\"icon-jcb\" viewBox=\"0 0 40 24\">\n      <title>JCB</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M33.273 2.01h.013v17.062c-.004 1.078-.513 2.103-1.372 2.746-.63.47-1.366.67-2.14.67-.437 0-4.833.026-4.855 0-.01-.01 0-.07 0-.082v-6.82c0-.04.004-.064.033-.064h5.253c.867 0 1.344-.257 1.692-.61.44-.448.574-1.162.294-1.732-.24-.488-.736-.78-1.244-.913-.158-.04-.32-.068-.483-.083-.01 0-.064 0-.07-.006-.03-.034.023-.04.038-.046.102-.033.215-.042.32-.073.532-.164.993-.547 1.137-1.105.15-.577-.05-1.194-.524-1.552-.34-.257-.768-.376-1.187-.413-.43-.038-4.774-.022-5.21-.022-.072 0-.05-.02-.05-.09V5.63c0-.31.01-.616.073-.92.126-.592.41-1.144.815-1.59.558-.615 1.337-1.01 2.16-1.093.478-.048 4.89-.017 5.305-.017zm-4.06 8.616c.06.272-.01.567-.204.77-.173.176-.407.25-.648.253-.195.003-1.725 0-1.788 0l.003-1.645c.012-.027.02-.018.06-.018.097 0 1.713-.004 1.823.005.232.02.45.12.598.306.076.096.128.208.155.328zm-2.636 2.038h1.944c.242.002.47.063.652.228.226.204.327.515.283.815-.04.263-.194.5-.422.634-.187.112-.39.125-.6.125h-1.857v-1.8z\" style=\"fill: #53B230\" />\n      <path d=\"M6.574 13.89c-.06-.03-.06-.018-.07-.06-.006-.026-.005-8.365.003-8.558.04-.95.487-1.857 1.21-2.47.517-.434 1.16-.71 1.83-.778.396-.04.803-.018 1.2-.018.69 0 4.11-.013 4.12 0 .008.008.002 16.758 0 17.074-.003.956-.403 1.878-1.105 2.523-.506.465-1.15.77-1.83.86-.41.056-5.02.032-5.363.032-.066 0-.054.013-.066-.024-.01-.025 0-7 0-7.17.66.178 1.35.28 2.03.348.662.067 1.33.093 1.993.062.93-.044 1.947-.192 2.712-.762.32-.238.574-.553.73-.922.148-.353.2-.736.2-1.117 0-.348.006-3.93-.016-3.942-.023-.014-2.885-.015-2.9.012-.012.022 0 3.87 0 3.95-.003.47-.16.933-.514 1.252-.468.42-1.11.47-1.707.423-.687-.055-1.357-.245-1.993-.508-.157-.065-.312-.135-.466-.208z\" style=\"fill: #006CB9\" />\n      <path d=\"M15.95 9.835c-.025.02-.05.04-.072.06V6.05c0-.295-.012-.594.01-.888.12-1.593 1.373-2.923 2.944-3.126.382-.05 5.397-.042 5.41-.026.01.01 0 .062 0 .074v16.957c0 1.304-.725 2.52-1.89 3.1-.504.25-1.045.35-1.605.35-.322 0-4.757.015-4.834 0-.05-.01-.023.01-.035-.02-.007-.022 0-6.548 0-7.44v-.422c.554.48 1.256.75 1.96.908.536.12 1.084.176 1.63.196.537.02 1.076.01 1.61-.037.546-.05 1.088-.136 1.625-.244.137-.028.274-.057.41-.09.033-.006.17-.017.187-.044.013-.02 0-.097 0-.12v-1.324c-.582.292-1.19.525-1.83.652-.778.155-1.64.198-2.385-.123-.752-.326-1.2-1.024-1.274-1.837-.076-.837.173-1.716.883-2.212.736-.513 1.7-.517 2.553-.38.634.1 1.245.305 1.825.58.078.037.154.075.23.113V9.322c0-.02.013-.1 0-.118-.02-.028-.152-.038-.188-.046-.066-.016-.133-.03-.2-.045C22.38 9 21.84 8.908 21.3 8.85c-.533-.06-1.068-.077-1.603-.066-.542.01-1.086.054-1.62.154-.662.125-1.32.337-1.883.716-.085.056-.167.117-.245.18z\" style=\"fill: #E20138\" />\n    </symbol>\n\n    <symbol id=\"icon-discover\" viewBox=\"0 0 40 24\">\n      <title>Discover</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M38.995 11.75S27.522 20.1 6.5 23.5h31.495c.552 0 1-.448 1-1V11.75z\" style=\"fill: #F48024\" />\n      <path d=\"M5.332 11.758c-.338.305-.776.438-1.47.438h-.29V8.55h.29c.694 0 1.115.124 1.47.446.37.33.595.844.595 1.372 0 .53-.224 1.06-.595 1.39zM4.077 7.615H2.5v5.515h1.57c.833 0 1.435-.197 1.963-.637.63-.52 1-1.305 1-2.116 0-1.628-1.214-2.762-2.956-2.762zM7.53 13.13h1.074V7.616H7.53M11.227 9.732c-.645-.24-.834-.397-.834-.695 0-.347.338-.61.8-.61.322 0 .587.132.867.446l.562-.737c-.462-.405-1.015-.612-1.618-.612-.975 0-1.718.678-1.718 1.58 0 .76.346 1.15 1.355 1.513.42.148.635.247.743.314.215.14.322.34.322.57 0 .448-.354.78-.834.78-.51 0-.924-.258-1.17-.736l-.695.67c.495.726 1.09 1.05 1.907 1.05 1.116 0 1.9-.745 1.9-1.812 0-.876-.363-1.273-1.585-1.72zM13.15 10.377c0 1.62 1.27 2.877 2.907 2.877.462 0 .858-.09 1.347-.32v-1.267c-.43.43-.81.604-1.297.604-1.082 0-1.85-.785-1.85-1.9 0-1.06.792-1.895 1.8-1.895.512 0 .9.183 1.347.62V7.83c-.472-.24-.86-.34-1.322-.34-1.627 0-2.932 1.283-2.932 2.887zM25.922 11.32l-1.468-3.705H23.28l2.337 5.656h.578l2.38-5.655H27.41M29.06 13.13h3.046v-.934h-1.973v-1.488h1.9v-.934h-1.9V8.55h1.973v-.935H29.06M34.207 10.154h-.314v-1.67h.33c.67 0 1.034.28 1.034.818 0 .554-.364.852-1.05.852zm2.155-.91c0-1.033-.71-1.628-1.95-1.628H32.82v5.514h1.073v-2.215h.14l1.487 2.215h1.32l-1.733-2.323c.81-.165 1.255-.72 1.255-1.563z\" style=\"fill: #221F20\" />\n      <path d=\"M23.6 10.377c0 1.62-1.31 2.93-2.927 2.93-1.617.002-2.928-1.31-2.928-2.93s1.31-2.932 2.928-2.932c1.618 0 2.928 1.312 2.928 2.932z\" style=\"fill: #F48024\" />\n    </symbol>\n\n    <symbol id=\"icon-diners-club\" viewBox=\"0 0 40 24\">\n      <title>Diners Club</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.02 11.83c0-5.456 4.54-9.88 10.14-9.88 5.6 0 10.139 4.424 10.139 9.88-.002 5.456-4.54 9.88-10.14 9.88-5.6 0-10.14-4.424-10.14-9.88z\" style=\"fill: #FEFEFE\" />\n      <path style=\"fill: #FFF\" d=\"M32.522 22H8.5V1.5h24.022\" />\n      <path d=\"M25.02 11.732c-.003-2.534-1.607-4.695-3.868-5.55v11.102c2.26-.857 3.865-3.017 3.87-5.552zm-8.182 5.55V6.18c-2.26.86-3.86 3.017-3.867 5.55.007 2.533 1.61 4.69 3.868 5.55zm2.158-14.934c-5.25.002-9.503 4.202-9.504 9.384 0 5.182 4.254 9.38 9.504 9.382 5.25 0 9.504-4.2 9.505-9.382 0-5.182-4.254-9.382-9.504-9.384zM18.973 22C13.228 22.027 8.5 17.432 8.5 11.84 8.5 5.726 13.228 1.5 18.973 1.5h2.692c5.677 0 10.857 4.225 10.857 10.34 0 5.59-5.18 10.16-10.857 10.16h-2.692z\" style=\"fill: #004A97\" />\n    </symbol>\n\n    <symbol id=\"icon-maestro\" viewBox=\"0 0 40 24\">\n      <title>Maestro</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M14.67 22.39V21c.022-.465-.303-.86-.767-.882h-.116c-.3-.023-.603.14-.788.394-.164-.255-.442-.417-.743-.394-.256-.023-.51.116-.65.324v-.278h-.487v2.203h.487v-1.183c-.046-.278.162-.533.44-.58h.094c.325 0 .488.21.488.58v1.23h.487v-1.23c-.047-.278.162-.556.44-.58h.093c.325 0 .487.21.487.58v1.23l.534-.024zm2.712-1.09v-1.113h-.487v.28c-.162-.21-.417-.326-.695-.326-.65 0-1.16.51-1.16 1.16 0 .65.51 1.16 1.16 1.16.278 0 .533-.117.695-.325v.278h.487V21.3zm-1.786 0c.024-.37.348-.65.72-.626.37.023.65.348.626.72-.023.347-.302.625-.673.625-.372 0-.674-.28-.674-.65-.023-.047-.023-.047 0-.07zm12.085-1.16c.163 0 .325.024.465.094.14.046.278.14.37.255.117.115.186.23.256.37.117.3.117.626 0 .927-.046.14-.138.255-.254.37-.116.117-.232.186-.37.256-.303.116-.65.116-.952 0-.14-.046-.28-.14-.37-.255-.118-.116-.187-.232-.257-.37-.116-.302-.116-.627 0-.928.047-.14.14-.255.256-.37.115-.117.23-.187.37-.256.163-.07.325-.116.488-.093zm0 .465c-.092 0-.185.023-.278.046-.092.024-.162.094-.232.14-.07.07-.116.14-.14.232-.068.185-.068.394 0 .58.024.092.094.162.14.23.07.07.14.117.232.14.186.07.37.07.557 0 .092-.023.16-.092.23-.14.07-.068.117-.138.14-.23.07-.186.07-.395 0-.58-.023-.093-.093-.162-.14-.232-.07-.07-.138-.116-.23-.14-.094-.045-.187-.07-.28-.045zm-7.677.695c0-.695-.44-1.16-1.043-1.16-.65 0-1.16.534-1.137 1.183.023.65.534 1.16 1.183 1.136.325 0 .65-.093.905-.302l-.23-.348c-.187.14-.42.232-.65.232-.326.023-.627-.21-.673-.533h1.646v-.21zm-1.646-.21c.023-.3.278-.532.58-.532.3 0 .556.232.556.533h-1.136zm3.664-.346c-.207-.116-.44-.186-.695-.186-.255 0-.417.093-.417.255 0 .163.162.186.37.21l.233.022c.488.07.766.278.766.672 0 .395-.37.72-1.02.72-.348 0-.673-.094-.95-.28l.23-.37c.21.162.465.232.743.232.324 0 .51-.094.51-.28 0-.115-.117-.185-.395-.23l-.232-.024c-.487-.07-.765-.302-.765-.65 0-.44.37-.718.927-.718.325 0 .627.07.905.232l-.21.394zm2.32-.116h-.788v.997c0 .23.07.37.325.37.14 0 .3-.046.417-.115l.14.417c-.186.116-.395.162-.604.162-.58 0-.765-.302-.765-.812v-1.02h-.44v-.44h.44v-.673h.487v.672h.79v.44zm1.67-.51c.117 0 .233.023.35.07l-.14.463c-.093-.045-.21-.045-.302-.045-.325 0-.464.208-.464.58v1.25h-.487v-2.2h.487v.277c.116-.255.325-.37.557-.394z\" style=\"fill: #000\" />\n      <path style=\"fill: #7673C0\" d=\"M23.64 3.287h-7.305V16.41h7.306\" />\n      <path d=\"M16.8 9.848c0-2.55 1.183-4.985 3.2-6.56C16.384.435 11.12 1.06 8.29 4.7 5.435 8.32 6.06 13.58 9.703 16.41c3.038 2.387 7.283 2.387 10.32 0-2.04-1.578-3.223-3.99-3.223-6.562z\" style=\"fill: #EB001B\" />\n      <path d=\"M33.5 9.848c0 4.613-3.735 8.346-8.35 8.346-1.88 0-3.69-.626-5.15-1.785 3.618-2.83 4.245-8.092 1.415-11.71-.418-.532-.882-.996-1.415-1.413C23.618.437 28.883 1.06 31.736 4.7 32.873 6.163 33.5 7.994 33.5 9.85z\" style=\"fill: #00A1DF\" />\n    </symbol>\n\n    <symbol id=\"logoPayPal\" viewBox=\"0 0 48 29\">\n      <title>PayPal Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" />\n      <path d=\"M31.216 16.4c.394-.7.69-1.5.886-2.4.196-.8.196-1.6.1-2.2-.1-.7-.396-1.2-.79-1.7-.195-.3-.59-.5-.885-.7.1-.8.1-1.5 0-2.1-.1-.6-.394-1.1-.886-1.6-.885-1-2.56-1.6-4.922-1.6h-6.4c-.492 0-.787.3-.886.8l-2.658 17.2c0 .2 0 .3.1.4.097.1.294.2.393.2h4.036l-.295 1.8c0 .1 0 .3.1.4.098.1.195.2.393.2h3.35c.393 0 .688-.3.786-.7v-.2l.59-4.1v-.2c.1-.4.395-.7.788-.7h.59c1.675 0 3.152-.4 4.137-1.1.59-.5 1.083-1 1.478-1.7h-.002z\" style=\"fill: #263B80\" />\n      <path d=\"M21.364 9.4c0-.3.196-.5.492-.6.098-.1.196-.1.394-.1h5.02c.592 0 1.183 0 1.675.1.1 0 .295.1.394.1.098 0 .294.1.393.1.1 0 .1 0 .197.102.295.1.492.2.69.3.295-1.6 0-2.7-.887-3.8-.985-1.1-2.658-1.6-4.923-1.6h-6.4c-.49 0-.885.3-.885.8l-2.758 17.3c-.098.3.197.6.59.6h3.94l.985-6.4 1.083-6.9z\" style=\"fill: #263B80\" />\n      <path d=\"M30.523 9.4c0 .1 0 .3-.098.4-.887 4.4-3.742 5.9-7.484 5.9h-1.87c-.492 0-.787.3-.886.8l-.985 6.2-.296 1.8c0 .3.196.6.492.6h3.348c.394 0 .69-.3.787-.7v-.2l.592-4.1v-.2c.1-.4.394-.7.787-.7h.69c3.248 0 5.808-1.3 6.497-5.2.296-1.6.197-3-.69-3.9-.196-.3-.49-.5-.885-.7z\" style=\"fill: #159BD7\" />\n      <path d=\"M29.635 9c-.098 0-.295-.1-.394-.1-.098 0-.294-.1-.393-.1-.492-.102-1.083-.102-1.673-.102h-5.022c-.1 0-.197 0-.394.1-.198.1-.394.3-.492.6l-1.083 6.9v.2c.1-.5.492-.8.886-.8h1.87c3.742 0 6.598-1.5 7.484-5.9 0-.1 0-.3.098-.4-.196-.1-.492-.2-.69-.3 0-.1-.098-.1-.196-.1z\" style=\"fill: #232C65\" />\n    </symbol>\n\n    <symbol id=\"logoPayPalCredit\" viewBox=\"0 0 48 29\">\n      <title>PayPal Credit Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" fill-rule=\"nonzero\" />\n      <path d=\"M27.44 21.6h.518c1.377 0 2.67-.754 2.953-2.484.248-1.588-.658-2.482-2.14-2.482h-.38c-.093 0-.172.067-.187.16l-.763 4.805zm-1.254-6.646c.024-.158.16-.273.32-.273h2.993c2.47 0 4.2 1.942 3.81 4.436-.4 2.495-2.752 4.436-5.21 4.436h-3.05c-.116 0-.205-.104-.187-.218l1.323-8.38zM22.308 16.907l-.192 1.21h2.38c.116 0 .204.103.186.217l-.23 1.462c-.023.157-.16.273-.318.273h-2.048c-.16 0-.294.114-.32.27l-.203 1.26h2.52c.117 0 .205.102.187.217l-.228 1.46c-.025.16-.16.275-.32.275h-4.55c-.116 0-.204-.104-.186-.218l1.322-8.38c.025-.158.16-.273.32-.273h4.55c.116 0 .205.104.187.22l-.23 1.46c-.024.158-.16.274-.32.274H22.63c-.16 0-.295.115-.32.273M35.325 23.552h-1.81c-.115 0-.203-.104-.185-.218l1.322-8.38c.025-.158.16-.273.32-.273h1.81c.115 0 .203.104.185.22l-1.322 8.38c-.025.156-.16.272-.32.272M14.397 18.657h.224c.754 0 1.62-.14 1.777-1.106.158-.963-.345-1.102-1.15-1.104h-.326c-.097 0-.18.07-.197.168l-.326 2.043zm3.96 4.895h-2.37c-.102 0-.194-.058-.238-.15l-1.565-3.262h-.023l-.506 3.19c-.02.128-.13.222-.26.222h-1.86c-.116 0-.205-.104-.187-.218l1.33-8.432c.02-.128.13-.22.26-.22h3.222c1.753 0 2.953.834 2.66 2.728-.2 1.224-1.048 2.283-2.342 2.506l2.037 3.35c.076.125-.014.286-.16.286zM40.216 23.552h-1.808c-.116 0-.205-.104-.187-.218l1.06-6.7h-1.684c-.116 0-.205-.104-.187-.218l.228-1.462c.025-.157.16-.273.32-.273h5.62c.116 0 .205.104.186.22l-.228 1.46c-.025.158-.16.274-.32.274h-1.63l-1.05 6.645c-.025.156-.16.272-.32.272M11.467 17.202c-.027.164-.228.223-.345.104-.395-.405-.975-.62-1.6-.62-1.41 0-2.526 1.083-2.75 2.458-.21 1.4.588 2.41 2.022 2.41.592 0 1.22-.225 1.74-.6.144-.105.34.02.313.194l-.328 2.03c-.02.12-.108.22-.226.254-.702.207-1.24.355-1.9.355-3.823 0-4.435-3.266-4.238-4.655.553-3.894 3.712-4.786 5.65-4.678.623.034 1.182.117 1.73.323.177.067.282.25.252.436l-.32 1.99\" style=\"fill: #21306F\" />\n      <path d=\"M23.184 7.67c-.11.717-.657.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.105.123.137.305.097.557zm-.23-1.87h-1.998c-.137 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h1.024c.095 0 .177-.07.192-.164l.23-1.452c.02-.135.136-.235.273-.235h.63c1.317 0 2.076-.636 2.275-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51z\" style=\"fill: #0093C7\" />\n      <path d=\"M8.936 7.67c-.11.717-.656.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.104.123.136.305.096.557zm-.23-1.87H6.708c-.136 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h.955c.136 0 .252-.1.274-.234l.217-1.382c.02-.135.137-.235.274-.235h.633c1.316 0 2.075-.636 2.274-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51zM13.343 9.51c-.092.545-.526.912-1.08.912-.277 0-.5-.09-.642-.258-.14-.168-.193-.406-.148-.672.086-.542.527-.92 1.072-.92.27 0 .492.09.637.26.148.172.205.412.163.677zm1.334-1.863h-.957c-.082 0-.152.06-.164.14l-.042.268-.067-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.135 1.923-.092.56.038 1.097.356 1.47.29.344.708.487 1.204.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.017-.102-.06-.193-.163-.193z\" style=\"fill: #21306F\" />\n      <path d=\"M27.59 9.51c-.09.545-.525.912-1.078.912-.278 0-.5-.09-.643-.258-.142-.168-.195-.406-.15-.672.086-.542.526-.92 1.07-.92.273 0 .494.09.64.26.146.172.203.412.16.677zm1.334-1.863h-.956c-.082 0-.152.06-.164.14l-.043.268-.065-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.136 1.923-.092.56.038 1.097.355 1.47.292.344.71.487 1.205.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.015-.102-.063-.193-.166-.193z\" style=\"fill: #0093C7\" />\n      <path d=\"M19.77 7.647h-.96c-.092 0-.178.045-.23.122L17.254 9.72l-.562-1.877c-.035-.118-.143-.198-.266-.198h-.945c-.113 0-.194.112-.157.22l1.06 3.108-.997 1.404c-.078.11 0 .262.136.262h.96c.092 0 .177-.044.23-.12l3.196-4.614c.077-.11-.002-.26-.137-.26\" style=\"fill: #21306F\" />\n      <path d=\"M30.052 5.94l-.82 5.216c-.016.1.062.192.165.192h.824c.138 0 .254-.1.275-.234l.81-5.122c.015-.1-.064-.193-.166-.193h-.924c-.082 0-.15.06-.164.14\" style=\"fill: #0093C7\" />\n    </symbol>\n\n    <symbol id=\"iconCardFront\" viewBox=\"0 0 48 29\">\n      <title>Generic Card</title>\n      <path d=\"M46.177 29H1.823C.9 29 0 28.13 0 27.187V1.813C0 .87.9 0 1.823 0h44.354C47.1 0 48 .87 48 1.813v25.375C48 28.13 47.1 29 46.177 29z\" style=\"fill: #FFF\" />\n      <path d=\"M4.8 9.14c0-.427.57-.973 1.067-.973h7.466c.496 0 1.067.546 1.067.972v3.888c0 .425-.57.972-1.067.972H5.867c-.496 0-1.067-.547-1.067-.972v-3.89z\" style=\"fill: #828282\" />\n      <rect style=\"fill: #828282\" x=\"10.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <rect style=\"fill: #828282\" x=\"4.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <path d=\"M6.55 16.333h34.9c.966 0 1.75.784 1.75 1.75 0 .967-.784 1.75-1.75 1.75H6.55c-.966 0-1.75-.783-1.75-1.75 0-.966.784-1.75 1.75-1.75z\" style=\"fill: #828282\" />\n      <ellipse style=\"fill: #828282\" cx=\"40.2\" cy=\"6.417\" rx=\"3\" ry=\"2.917\" />\n    </symbol>\n\n    <symbol id=\"iconCVVBack\" viewBox=\"0 0 40 24\">\n      <title>CVV Back</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\"/>\n      <path style=\"fill: #828282\" d=\"M0 5h40v4H0z\" />\n      <path d=\"M20 13.772v5.456c0 .423.37.772.82.772h13.36c.45 0 .82-.35.82-.772v-5.456c0-.423-.37-.772-.82-.772H20.82c-.45 0-.82.35-.82.772zm-1-.142c0-.9.76-1.63 1.68-1.63h13.64c.928 0 1.68.737 1.68 1.63v5.74c0 .9-.76 1.63-1.68 1.63H20.68c-.928 0-1.68-.737-1.68-1.63v-5.74z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"16.5\" r=\"1.5\" />\n    </symbol>\n\n    <symbol id=\"iconCVVFront\" viewBox=\"0 0 40 24\">\n      <title>CVV Front</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\" />\n      <path d=\"M16 5.772v5.456c0 .423.366.772.81.772h17.38c.444 0 .81-.348.81-.772V5.772C35 5.35 34.634 5 34.19 5H16.81c-.444 0-.81.348-.81.772zm-1-.142c0-.9.75-1.63 1.66-1.63h17.68c.917 0 1.66.737 1.66 1.63v5.74c0 .9-.75 1.63-1.66 1.63H16.66c-.917 0-1.66-.737-1.66-1.63V5.63z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"19.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"8.5\" r=\"1.5\" />\n      <path d=\"M4 7.833C4 7.47 4.476 7 4.89 7h6.22c.414 0 .89.47.89.833v3.334c0 .364-.476.833-.89.833H4.89c-.414 0-.89-.47-.89-.833V7.833zM4 18.5c0-.828.668-1.5 1.5-1.5h29c.828 0 1.5.666 1.5 1.5 0 .828-.668 1.5-1.5 1.5h-29c-.828 0-1.5-.666-1.5-1.5z\" style=\"fill: #828282\" />\n    </symbol>\n\n    <symbol id=\"iconCheck\" viewBox=\"0 0 42 32\">\n      <title>Check</title>\n      <path class=\"path1\" d=\"M14.379 29.76L39.741 3.415 36.194.001l-21.815 22.79-10.86-11.17L0 15.064z\" />\n    </symbol>\n\n    <symbol id=\"iconLockLoader\" viewBox=\"0 0 28 32\">\n      <title>Lock Loader</title>\n      <path d=\"M6 10V8c0-4.422 3.582-8 8-8 4.41 0 8 3.582 8 8v2h-4V7.995C18 5.79 16.205 4 14 4c-2.21 0-4 1.792-4 3.995V10H6zM.997 14c-.55 0-.997.445-.997.993v16.014c0 .548.44.993.997.993h26.006c.55 0 .997-.445.997-.993V14.993c0-.548-.44-.993-.997-.993H.997z\" />\n    </symbol>\n\n    <symbol id=\"iconError\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n      <path d=\"M0 0h24v24H0z\" style=\"fill: none\" />\n      <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\" />\n    </symbol>\n  </defs>\n</svg>\n";

var UPDATABLE_CONFIGURATION_OPTIONS=[
paymentOptionIDs.paypal,
paymentOptionIDs.paypalCredit];

var UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED=[
paymentOptionIDs.paypal,
paymentOptionIDs.paypalCredit];

var DEFAULT_CHECKOUTJS_LOG_LEVEL='warn';
var VERSION="1.6.1";







































































































































function Dropin(options){
this._client=options.client;
this._componentID=uuid();
this._dropinWrapper=document.createElement('div');
this._dropinWrapper.id='braintree--dropin__'+this._componentID;
this._dropinWrapper.setAttribute('data-braintree-id','wrapper');
this._dropinWrapper.style.display='none';
this._dropinWrapper.className='braintree-loading';
this._merchantConfiguration=options.merchantConfiguration;

EventEmitter.call(this);
}

Dropin.prototype=Object.create(EventEmitter.prototype,{
constructor:Dropin});


Dropin.prototype._initialize=function(callback){
var localizedStrings,localizedHTML,strings;
var dropinInstance=this;
var container=this._merchantConfiguration.container||this._merchantConfiguration.selector;

this._injectStylesheet();

if(!container){
analytics.sendEvent(this._client,'configuration-error');
callback(new DropinError('options.container is required.'));
return;
}else if(this._merchantConfiguration.container&&this._merchantConfiguration.selector){
analytics.sendEvent(this._client,'configuration-error');
callback(new DropinError('Must only have one options.selector or options.container.'));
return;
}

if(typeof container==='string'){
container=document.querySelector(container);
}

if(!container||container.nodeType!==1){
analytics.sendEvent(this._client,'configuration-error');
callback(new DropinError('options.selector or options.container must reference a valid DOM node.'));
return;
}

if(container.innerHTML.trim()){
analytics.sendEvent(this._client,'configuration-error');
callback(new DropinError('options.selector or options.container must reference an empty DOM node.'));
return;
}


strings=assign({},translations.en);
if(this._merchantConfiguration.locale){
localizedStrings=translations[this._merchantConfiguration.locale]||translations[this._merchantConfiguration.locale.split('_')[0]];

strings=assign(strings,localizedStrings);
}

if(this._merchantConfiguration.translations){
strings=assign(strings,this._merchantConfiguration.translations);
}

localizedHTML=Object.keys(strings).reduce(function(result,stringKey){
var stringValue=strings[stringKey];

return result.replace(RegExp('{{'+stringKey+'}}','g'),stringValue);
},mainHTML);

this._dropinWrapper.innerHTML=svgHTML+localizedHTML;
container.appendChild(this._dropinWrapper);

this._getVaultedPaymentMethods(function(paymentMethods){
var paypalRequired;

try{
this._model=new DropinModel({
client:this._client,
componentID:this._componentID,
merchantConfiguration:this._merchantConfiguration,
paymentMethods:paymentMethods});

}catch(modelError){
dropinInstance.teardown().then(function(){
callback(modelError);
});
return;
}

this._model.on('asyncDependenciesReady',function(){
if(this._model.dependencySuccessCount>=1){
analytics.sendEvent(this._client,'appeared');
this._disableErroredPaymentMethods();
callback(null,dropinInstance);
}else{
analytics.sendEvent(this._client,'load-error');
this._dropinWrapper.innerHTML='';
callback(new DropinError('All payment options failed to load.'));
}
}.bind(this));

this._model.on('paymentMethodRequestable',function(event){
this._emit('paymentMethodRequestable',event);
}.bind(this));

this._model.on('noPaymentMethodRequestable',function(){
this._emit('noPaymentMethodRequestable');
}.bind(this));

this._model.on('paymentOptionSelected',function(event){
this._emit('paymentOptionSelected',event);
}.bind(this));

function createMainView(){
dropinInstance._mainView=new MainView({
client:dropinInstance._client,
element:dropinInstance._dropinWrapper,
model:dropinInstance._model,
strings:strings});

}

paypalRequired=this._supportsPaymentOption(paymentOptionIDs.paypal)||this._supportsPaymentOption(paymentOptionIDs.paypalCredit);

if(paypalRequired&&!document.querySelector('#'+constants.PAYPAL_CHECKOUT_SCRIPT_ID)){
this._loadPayPalScript(createMainView);
}else{
createMainView();
}
}.bind(this));
};













Dropin.prototype.updateConfiguration=function(property,key,value){
if(UPDATABLE_CONFIGURATION_OPTIONS.indexOf(property)===-1){
return;
}

this._mainView.getView(property).updateConfiguration(key,value);

if(UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED.indexOf(property)===-1){
return;
}

this._removeUnvaultedPaymentMethods(function(paymentMethod){
return paymentMethod.type===constants.paymentMethodTypes[property];
});
this._navigateToInitialView();
};

























Dropin.prototype.clearSelectedPaymentMethod=function(){
this._removeUnvaultedPaymentMethods();

this._navigateToInitialView();

this._model.removeActivePaymentMethod();
};

Dropin.prototype._removeUnvaultedPaymentMethods=function(filter){
filter=filter||function(){return true;};

this._model.getPaymentMethods().forEach(function(paymentMethod){
if(filter(paymentMethod)&&!paymentMethod.vaulted){
this._model.removePaymentMethod(paymentMethod);
}
}.bind(this));
};

Dropin.prototype._navigateToInitialView=function(){
var hasNoSavedPaymentMethods,hasOnlyOneSupportedPaymentOption;
var isOnMethodsView=this._mainView.primaryView.ID===paymentMethodsViewID;

if(isOnMethodsView){
hasNoSavedPaymentMethods=this._model.getPaymentMethods().length===0;

if(hasNoSavedPaymentMethods){
hasOnlyOneSupportedPaymentOption=this._model.supportedPaymentOptions.length===1;

if(hasOnlyOneSupportedPaymentOption){
this._mainView.setPrimaryView(this._model.supportedPaymentOptions[0]);
}else{
this._mainView.setPrimaryView(paymentOptionsViewID);
}
}
}
};

Dropin.prototype._supportsPaymentOption=function(paymentOption){
return this._model.supportedPaymentOptions.indexOf(paymentOption)!==-1;
};

Dropin.prototype._loadPayPalScript=function(callback){
var script=document.createElement('script');

script.src=constants.CHECKOUT_JS_SOURCE;
script.id=constants.PAYPAL_CHECKOUT_SCRIPT_ID;
script.async=true;
script.addEventListener('load',callback);
script.setAttribute('data-log-level',this._merchantConfiguration.paypal.logLevel||DEFAULT_CHECKOUTJS_LOG_LEVEL);
this._dropinWrapper.appendChild(script);
};

Dropin.prototype._disableErroredPaymentMethods=function(){
var paymentMethodOptionsElements;
var failedDependencies=Object.keys(this._model.failedDependencies);

if(failedDependencies.length===0){
return;
}

paymentMethodOptionsElements=this._mainView.getOptionsElements();

failedDependencies.forEach(function(paymentMethodId){
var element=paymentMethodOptionsElements[paymentMethodId];
var div=element.div;
var clickHandler=element.clickHandler;
var error=this._model.failedDependencies[paymentMethodId];
var errorMessageDiv=div.querySelector('.braintree-option__disabled-message');

div.classList.add('braintree-disabled');
div.removeEventListener('click',clickHandler);
if(error.code==='PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED'){
errorMessageDiv.innerHTML=constants.errors.PAYPAL_NON_LINKED_SANDBOX;
}else{
errorMessageDiv.textContent=error.message;
}
}.bind(this));
};









Dropin.prototype.requestPaymentMethod=function(){
return this._mainView.requestPaymentMethod();
};

Dropin.prototype._removeStylesheet=function(){
var stylesheet=document.getElementById(constants.STYLESHEET_ID);

if(stylesheet){
stylesheet.parentNode.removeChild(stylesheet);
}
};

Dropin.prototype._injectStylesheet=function(){
var stylesheet,stylesheetUrl,head,assetsUrl;

if(document.getElementById(constants.STYLESHEET_ID)){return;}

assetsUrl=this._client.getConfiguration().gatewayConfiguration.assetsUrl;
stylesheetUrl=assetsUrl+'/web/dropin/'+VERSION+'/css/dropin.css';
stylesheet=document.createElement('link');
head=document.head;

stylesheet.setAttribute('rel','stylesheet');
stylesheet.setAttribute('type','text/css');
stylesheet.setAttribute('href',stylesheetUrl);
stylesheet.setAttribute('id',constants.STYLESHEET_ID);

if(head.firstChild){
head.insertBefore(stylesheet,head.firstChild);
}else{
head.appendChild(stylesheet);
}
};

Dropin.prototype._getVaultedPaymentMethods=function(callback){
if(isGuestCheckout(this._client)){
callback([]);
}else{
this._client.request({
endpoint:'payment_methods',
method:'get',
data:{
defaultFirst:1}},

function(err,paymentMethodsPayload){
var paymentMethods;

if(err){
paymentMethods=[];
}else{
paymentMethods=paymentMethodsPayload.paymentMethods.map(formatPaymentMethodPayload);
}

callback(paymentMethods);
});
}
};







Dropin.prototype.teardown=function(){
var mainviewTeardownError;
var promise=Promise.resolve();
var self=this;

this._removeStylesheet();

if(this._mainView){
promise.then(function(){
return self._mainView.teardown().catch(function(err){
mainviewTeardownError=err;
});
});
}

return promise.then(function(){
return self._removeDropinWrapper();
}).then(function(){
if(mainviewTeardownError){
return Promise.reject(mainviewTeardownError);
}

return Promise.resolve();
});
};






Dropin.prototype.isPaymentMethodRequestable=function(){
return this._model.isPaymentMethodRequestable();
};

Dropin.prototype._removeDropinWrapper=function(){
this._dropinWrapper.parentNode.removeChild(this._dropinWrapper);

return Promise.resolve();
};

function formatPaymentMethodPayload(paymentMethod){
var formattedPaymentMethod={
nonce:paymentMethod.nonce,
details:paymentMethod.details,
type:paymentMethod.type,
vaulted:true};


if(paymentMethod.type===constants.paymentMethodTypes.card){
formattedPaymentMethod.description=paymentMethod.description;
}

return formattedPaymentMethod;
}

module.exports=wrapPrototype(Dropin);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var request=__webpack_require__(24);
var isWhitelistedDomain=__webpack_require__(27);
var BraintreeError=__webpack_require__(2);
var convertToBraintreeError=__webpack_require__(28);
var addMetadata=__webpack_require__(29);
var Promise=__webpack_require__(5);
var once=__webpack_require__(14);
var deferred=__webpack_require__(61);
var assign=__webpack_require__(26).assign;
var constants=__webpack_require__(62);
var errors=__webpack_require__(32);
var sharedErrors=__webpack_require__(10);
var VERSION=__webpack_require__(9).VERSION;



















function Client(configuration){
var configurationJSON,gatewayConfiguration,braintreeApiConfiguration;

configuration=configuration||{};

configurationJSON=JSON.stringify(configuration);
gatewayConfiguration=configuration.gatewayConfiguration;

if(!gatewayConfiguration){
throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
}

[
'assetsUrl',
'clientApiUrl',
'configUrl'].
forEach(function(property){
if(property in gatewayConfiguration&&!isWhitelistedDomain(gatewayConfiguration[property])){
throw new BraintreeError({
type:errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
code:errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
message:property+' property is on an invalid domain.'});

}
});






this.getConfiguration=function(){
return JSON.parse(configurationJSON);
};

this._request=request;
this._configuration=this.getConfiguration();

this._clientApiBaseUrl=gatewayConfiguration.clientApiUrl+'/v1/';

braintreeApiConfiguration=gatewayConfiguration.braintreeApi;
if(braintreeApiConfiguration){
this._braintreeApi={
baseUrl:braintreeApiConfiguration.url+'/',
accessToken:braintreeApiConfiguration.accessToken};


if(!isWhitelistedDomain(this._braintreeApi.baseUrl)){
throw new BraintreeError({
type:errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
code:errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
message:'braintreeApi URL is on an invalid domain.'});

}
}
}



























































































Client.prototype.request=function(options,callback){
var self=this;
var requestPromise=new Promise(function(resolve,reject){
var optionName,api,baseUrl,requestOptions;

if(!options.method){
optionName='options.method';
}else if(!options.endpoint){
optionName='options.endpoint';
}

if(optionName){
throw new BraintreeError({
type:errors.CLIENT_OPTION_REQUIRED.type,
code:errors.CLIENT_OPTION_REQUIRED.code,
message:optionName+' is required when making a request.'});

}

if('api'in options){
api=options.api;
}else{
api='clientApi';
}

requestOptions={
method:options.method,
timeout:options.timeout};


if(api==='clientApi'){
baseUrl=self._clientApiBaseUrl;

requestOptions.data=addMetadata(self._configuration,options.data);
}else if(api==='braintreeApi'){
if(!self._braintreeApi){
throw new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED);
}

baseUrl=self._braintreeApi.baseUrl;

requestOptions.data=options.data;

requestOptions.headers={
'Braintree-Version':constants.BRAINTREE_API_VERSION_HEADER,
Authorization:'Bearer '+self._braintreeApi.accessToken};

}else{
throw new BraintreeError({
type:errors.CLIENT_OPTION_INVALID.type,
code:errors.CLIENT_OPTION_INVALID.code,
message:'options.api is invalid.'});

}

requestOptions.url=baseUrl+options.endpoint;

self._request(requestOptions,function(err,data,status){
var resolvedData,requestError;

requestError=formatRequestError(status,err);

if(requestError){
reject(requestError);
return;
}

resolvedData=assign({_httpStatus:status},data);

resolve(resolvedData);
});
});

if(typeof callback==='function'){
callback=once(deferred(callback));

requestPromise.then(function(response){
callback(null,response,response._httpStatus);
}).catch(function(err){
var status=err&&err.details&&err.details.httpStatus;

callback(err,null,status);
});
return;
}

return requestPromise;
};

function formatRequestError(status,err){
var requestError;

if(status===-1){
requestError=new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
}else if(status===403){
requestError=new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
}else if(status===429){
requestError=new BraintreeError(errors.CLIENT_RATE_LIMITED);
}else if(status>=500){
requestError=new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
}else if(status<200||status>=400){
requestError=convertToBraintreeError(err,{
type:errors.CLIENT_REQUEST_ERROR.type,
code:errors.CLIENT_REQUEST_ERROR.code,
message:errors.CLIENT_REQUEST_ERROR.message});

}

if(requestError){
requestError.details=requestError.details||{};
requestError.details.httpStatus=status;

return requestError;
}
}

Client.prototype.toJSON=function(){
return this.getConfiguration();
};















Client.prototype.getVersion=function(){
return VERSION;
};

module.exports=Client;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var head;
var uuid=__webpack_require__(15);
var querystring=__webpack_require__(25);
var timeouts={};

function _removeScript(script){
if(script&&script.parentNode){
script.parentNode.removeChild(script);
}
}

function _createScriptTag(url,callbackName){
var script=document.createElement('script');
var done=false;

script.src=url;
script.async=true;
script.onerror=function(){
global[callbackName]({message:'error',status:500});
};

script.onload=script.onreadystatechange=function(){
if(done){return;}

if(!this.readyState||this.readyState==='loaded'||this.readyState==='complete'){
done=true;
script.onload=script.onreadystatechange=null;
}
};

return script;
}

function _cleanupGlobal(callbackName){
try{
delete global[callbackName];
}catch(_){
global[callbackName]=null;
}
}

function _setupTimeout(timeout,callbackName){
timeouts[callbackName]=setTimeout(function(){
timeouts[callbackName]=null;

global[callbackName]({
error:'timeout',
status:-1});


global[callbackName]=function(){
_cleanupGlobal(callbackName);
};
},timeout);
}

function _setupGlobalCallback(script,callback,callbackName){
global[callbackName]=function(response){
var status=response.status||500;
var err=null;
var data=null;

delete response.status;

if(status>=400||status<200){
err=response;
}else{
data=response;
}

_cleanupGlobal(callbackName);
_removeScript(script);

clearTimeout(timeouts[callbackName]);
callback(err,data,status);
};
}

function request(options,callback){
var script;
var callbackName='callback_json_'+uuid().replace(/-/g,'');
var url=options.url;
var attrs=options.data;
var method=options.method;
var timeout=options.timeout;

url=querystring.queryify(url,attrs);
url=querystring.queryify(url,{
_method:method,
callback:callbackName});


script=_createScriptTag(url,callbackName);
_setupGlobalCallback(script,callback,callbackName);
_setupTimeout(timeout,callbackName);

if(!head){
head=document.getElementsByTagName('head')[0];
}

head.appendChild(script);
}

module.exports={
request:request};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var querystring=__webpack_require__(25);
var browserDetection=__webpack_require__(49);
var assign=__webpack_require__(26).assign;
var prepBody=__webpack_require__(52);
var parseBody=__webpack_require__(53);
var isXHRAvailable=global.XMLHttpRequest&&'withCredentials'in new global.XMLHttpRequest();

var MAX_TCP_RETRYCOUNT=1;
var TCP_PRECONNECT_BUG_STATUS_CODE=408;

function getRequestObject(){
return isXHRAvailable?new XMLHttpRequest():new XDomainRequest();
}

function requestShouldRetry(status){
return(!status||status===TCP_PRECONNECT_BUG_STATUS_CODE)&&browserDetection.isIe();
}

function _requestWithRetry(options,tcpRetryCount,cb){
var status,resBody;
var method=options.method;
var url=options.url;
var body=options.data;
var timeout=options.timeout;
var headers=assign({
'Content-Type':'application/json'},
options.headers);
var req=getRequestObject();
var callback=cb;

if(method==='GET'){
url=querystring.queryify(url,body);
body=null;
}

if(isXHRAvailable){
req.onreadystatechange=function(){
if(req.readyState!==4){return;}

status=req.status;
resBody=parseBody(req.responseText);

if(status>=400||status<200){
if(tcpRetryCount<MAX_TCP_RETRYCOUNT&&requestShouldRetry(status)){
tcpRetryCount++;
_requestWithRetry(options,tcpRetryCount,cb);
return;
}
callback(resBody||'error',null,status||500);
}else{
callback(null,resBody,status);
}
};
}else{
if(options.headers){
url=querystring.queryify(url,headers);
}

req.onload=function(){
callback(null,parseBody(req.responseText),req.status);
};

req.onerror=function(){


callback('error',null,500);
};


req.onprogress=function(){};

req.ontimeout=function(){
callback('timeout',null,-1);
};
}

req.open(method,url,true);
req.timeout=timeout;

if(isXHRAvailable){
Object.keys(headers).forEach(function(headerKey){
req.setRequestHeader(headerKey,headers[headerKey]);
});
}

try{
req.send(prepBody(method,body));
}catch(e){}
}

function request(options,cb){
_requestWithRetry(options,0,cb);
}

module.exports={
request:request};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIe=__webpack_require__(50);

module.exports={
isIe:isIe};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isIE11=__webpack_require__(51);

module.exports=function isIE(ua){
ua=ua||global.navigator.userAgent;
return ua.indexOf('MSIE')!==-1||isIE11(ua);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function isIe11(ua){
ua=ua||navigator.userAgent;
return ua.indexOf('Trident/7')!==-1;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function(method,body){
if(typeof method!=='string'){
throw new Error('Method must be a string');
}

if(method.toLowerCase()!=='get'&&body!=null){
body=typeof body==='string'?body:JSON.stringify(body);
}

return body;
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function(body){
try{
body=JSON.parse(body);
}catch(e){}

return body;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports=function getUserAgent(){
return global.navigator.userAgent;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports=function(){
return global.location.protocol==='http:';
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var atobNormalized=typeof global.atob==='function'?global.atob:atob;

function atob(base64String){
var a,b,c,b1,b2,b3,b4,i;
var base64Matcher=new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var result='';

if(!base64Matcher.test(base64String)){
throw new Error('Non base64 encoded input passed to window.atob polyfill');
}

i=0;
do{
b1=characters.indexOf(base64String.charAt(i++));
b2=characters.indexOf(base64String.charAt(i++));
b3=characters.indexOf(base64String.charAt(i++));
b4=characters.indexOf(base64String.charAt(i++));

a=(b1&0x3F)<<2|b2>>4&0x3;
b=(b2&0xF)<<4|b3>>2&0xF;
c=(b3&0x3)<<6|b4&0x3F;

result+=String.fromCharCode(a)+(b?String.fromCharCode(b):'')+(c?String.fromCharCode(c):'');
}while(i<base64String.length);

return result;
}

module.exports={
atob:function atob(base64String){
return atobNormalized.call(global,base64String);
},
_atob:atob};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function(value){
return JSON.parse(JSON.stringify(value));
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var apply=Function.prototype.apply;



exports.setTimeout=function(){
return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout);
};
exports.setInterval=function(){
return new Timeout(apply.call(setInterval,window,arguments),clearInterval);
};
exports.clearTimeout=
exports.clearInterval=function(timeout){
if(timeout){
timeout.close();
}
};

function Timeout(id,clearFn){
this._id=id;
this._clearFn=clearFn;
}
Timeout.prototype.unref=Timeout.prototype.ref=function(){};
Timeout.prototype.close=function(){
this._clearFn.call(window,this._id);
};


exports.enroll=function(item,msecs){
clearTimeout(item._idleTimeoutId);
item._idleTimeout=msecs;
};

exports.unenroll=function(item){
clearTimeout(item._idleTimeoutId);
item._idleTimeout=-1;
};

exports._unrefActive=exports.active=function(item){
clearTimeout(item._idleTimeoutId);

var msecs=item._idleTimeout;
if(msecs>=0){
item._idleTimeoutId=setTimeout(function onTimeout(){
if(item._onTimeout)
item._onTimeout();
},msecs);
}
};


__webpack_require__(59);
exports.setImmediate=setImmediate;
exports.clearImmediate=clearImmediate;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {(function(global,undefined){
"use strict";

if(global.setImmediate){
return;
}

var nextHandle=1;
var tasksByHandle={};
var currentlyRunningATask=false;
var doc=global.document;
var registerImmediate;

function setImmediate(callback){

if(typeof callback!=="function"){
callback=new Function(""+callback);
}

var args=new Array(arguments.length-1);
for(var i=0;i<args.length;i++){
args[i]=arguments[i+1];
}

var task={callback:callback,args:args};
tasksByHandle[nextHandle]=task;
registerImmediate(nextHandle);
return nextHandle++;
}

function clearImmediate(handle){
delete tasksByHandle[handle];
}

function run(task){
var callback=task.callback;
var args=task.args;
switch(args.length){
case 0:
callback();
break;
case 1:
callback(args[0]);
break;
case 2:
callback(args[0],args[1]);
break;
case 3:
callback(args[0],args[1],args[2]);
break;
default:
callback.apply(undefined,args);
break;}

}

function runIfPresent(handle){


if(currentlyRunningATask){


setTimeout(runIfPresent,0,handle);
}else{
var task=tasksByHandle[handle];
if(task){
currentlyRunningATask=true;
try{
run(task);
}finally{
clearImmediate(handle);
currentlyRunningATask=false;
}
}
}
}

function installNextTickImplementation(){
registerImmediate=function registerImmediate(handle){
process.nextTick(function(){runIfPresent(handle);});
};
}

function canUsePostMessage(){


if(global.postMessage&&!global.importScripts){
var postMessageIsAsynchronous=true;
var oldOnMessage=global.onmessage;
global.onmessage=function(){
postMessageIsAsynchronous=false;
};
global.postMessage("","*");
global.onmessage=oldOnMessage;
return postMessageIsAsynchronous;
}
}

function installPostMessageImplementation(){




var messagePrefix="setImmediate$"+Math.random()+"$";
var onGlobalMessage=function onGlobalMessage(event){
if(event.source===global&&
typeof event.data==="string"&&
event.data.indexOf(messagePrefix)===0){
runIfPresent(+event.data.slice(messagePrefix.length));
}
};

if(global.addEventListener){
global.addEventListener("message",onGlobalMessage,false);
}else{
global.attachEvent("onmessage",onGlobalMessage);
}

registerImmediate=function registerImmediate(handle){
global.postMessage(messagePrefix+handle,"*");
};
}

function installMessageChannelImplementation(){
var channel=new MessageChannel();
channel.port1.onmessage=function(event){
var handle=event.data;
runIfPresent(handle);
};

registerImmediate=function registerImmediate(handle){
channel.port2.postMessage(handle);
};
}

function installReadyStateChangeImplementation(){
var html=doc.documentElement;
registerImmediate=function registerImmediate(handle){


var script=doc.createElement("script");
script.onreadystatechange=function(){
runIfPresent(handle);
script.onreadystatechange=null;
html.removeChild(script);
script=null;
};
html.appendChild(script);
};
}

function installSetTimeoutImplementation(){
registerImmediate=function registerImmediate(handle){
setTimeout(runIfPresent,0,handle);
};
}


var attachTo=Object.getPrototypeOf&&Object.getPrototypeOf(global);
attachTo=attachTo&&attachTo.setTimeout?attachTo:global;


if({}.toString.call(global.process)==="[object process]"){

installNextTickImplementation();

}else if(canUsePostMessage()){

installPostMessageImplementation();

}else if(global.MessageChannel){

installMessageChannelImplementation();

}else if(doc&&"onreadystatechange"in doc.createElement("script")){

installReadyStateChangeImplementation();

}else{

installSetTimeoutImplementation();
}

attachTo.setImmediate=setImmediate;
attachTo.clearImmediate=clearImmediate;
})(typeof self==="undefined"?typeof global==="undefined"?undefined:global:self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(60)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var process=module.exports={};






var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout(){
throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout(){
throw new Error('clearTimeout has not been defined');
}
(function(){
try{
if(typeof setTimeout==='function'){
cachedSetTimeout=setTimeout;
}else{
cachedSetTimeout=defaultSetTimout;
}
}catch(e){
cachedSetTimeout=defaultSetTimout;
}
try{
if(typeof clearTimeout==='function'){
cachedClearTimeout=clearTimeout;
}else{
cachedClearTimeout=defaultClearTimeout;
}
}catch(e){
cachedClearTimeout=defaultClearTimeout;
}
})();
function runTimeout(fun){
if(cachedSetTimeout===setTimeout){

return setTimeout(fun,0);
}

if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){
cachedSetTimeout=setTimeout;
return setTimeout(fun,0);
}
try{

return cachedSetTimeout(fun,0);
}catch(e){
try{

return cachedSetTimeout.call(null,fun,0);
}catch(e){

return cachedSetTimeout.call(this,fun,0);
}
}


}
function runClearTimeout(marker){
if(cachedClearTimeout===clearTimeout){

return clearTimeout(marker);
}

if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){
cachedClearTimeout=clearTimeout;
return clearTimeout(marker);
}
try{

return cachedClearTimeout(marker);
}catch(e){
try{

return cachedClearTimeout.call(null,marker);
}catch(e){


return cachedClearTimeout.call(this,marker);
}
}



}
var queue=[];
var draining=false;
var currentQueue;
var queueIndex=-1;

function cleanUpNextTick(){
if(!draining||!currentQueue){
return;
}
draining=false;
if(currentQueue.length){
queue=currentQueue.concat(queue);
}else{
queueIndex=-1;
}
if(queue.length){
drainQueue();
}
}

function drainQueue(){
if(draining){
return;
}
var timeout=runTimeout(cleanUpNextTick);
draining=true;

var len=queue.length;
while(len){
currentQueue=queue;
queue=[];
while(++queueIndex<len){
if(currentQueue){
currentQueue[queueIndex].run();
}
}
queueIndex=-1;
len=queue.length;
}
currentQueue=null;
draining=false;
runClearTimeout(timeout);
}

process.nextTick=function(fun){
var args=new Array(arguments.length-1);
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args[i-1]=arguments[i];
}
}
queue.push(new Item(fun,args));
if(queue.length===1&&!draining){
runTimeout(drainQueue);
}
};


function Item(fun,array){
this.fun=fun;
this.array=array;
}
Item.prototype.run=function(){
this.fun.apply(null,this.array);
};
process.title='browser';
process.browser=true;
process.env={};
process.argv=[];
process.version='';
process.versions={};

function noop(){}

process.on=noop;
process.addListener=noop;
process.once=noop;
process.off=noop;
process.removeListener=noop;
process.removeAllListeners=noop;
process.emit=noop;
process.prependListener=noop;
process.prependOnceListener=noop;

process.listeners=function(name){return[];};

process.binding=function(name){
throw new Error('process.binding is not supported');
};

process.cwd=function(){return'/';};
process.chdir=function(dir){
throw new Error('process.chdir is not supported');
};
process.umask=function(){return 0;};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function(fn){
return function(){

var args=arguments;

setTimeout(function(){
fn.apply(null,args);
},1);
};
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
BRAINTREE_API_VERSION_HEADER:'2017-04-03'};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var BraintreeError=__webpack_require__(2);
var Promise=__webpack_require__(5);
var wrapPromise=__webpack_require__(3);
var request=__webpack_require__(24);
var uuid=__webpack_require__(15);
var constants=__webpack_require__(9);
var createAuthorizationData=__webpack_require__(30);
var errors=__webpack_require__(32);

function getConfiguration(options){
return new Promise(function(resolve,reject){
var configuration,authData,attrs,configUrl;
var sessionId=uuid();
var analyticsMetadata={
merchantAppId:global.location.host,
platform:constants.PLATFORM,
sdkVersion:constants.VERSION,
source:constants.SOURCE,
integration:constants.INTEGRATION,
integrationType:constants.INTEGRATION,
sessionId:sessionId};


try{
authData=createAuthorizationData(options.authorization);
}catch(err){
reject(new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION));
return;
}
attrs=authData.attrs;
configUrl=authData.configUrl;

attrs._meta=analyticsMetadata;
attrs.braintreeLibraryVersion=constants.BRAINTREE_LIBRARY_VERSION;
attrs.configVersion='3';

request({
url:configUrl,
method:'GET',
data:attrs},
function(err,response,status){
var errorTemplate;

if(err){
if(status===403){
errorTemplate=errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
}else{
errorTemplate=errors.CLIENT_GATEWAY_NETWORK;
}

reject(new BraintreeError({
type:errorTemplate.type,
code:errorTemplate.code,
message:errorTemplate.message,
details:{
originalError:err}}));


return;
}

configuration={
authorization:options.authorization,
authorizationType:attrs.tokenizationKey?'TOKENIZATION_KEY':'CLIENT_TOKEN',
analyticsMetadata:analyticsMetadata,
gatewayConfiguration:response};


resolve(configuration);
});
});
}

module.exports={
getConfiguration:wrapPromise(getConfiguration)};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function deferred(fn){
return function(){

var args=arguments;

setTimeout(function(){
fn.apply(null,args);
},1);
};
}

module.exports=deferred;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function once(fn){
var called=false;

return function(){
if(!called){
called=true;
fn.apply(null,arguments);
}
};
}

module.exports=once;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function promiseOrCallback(promise,callback){
if(callback){
promise.
then(function(data){
callback(null,data);
}).
catch(function(err){
callback(err);
});
}else{
return promise;
}
}

module.exports=promiseOrCallback;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DropinError=__webpack_require__(4);
var EventEmitter=__webpack_require__(33);
var constants=__webpack_require__(1);
var paymentMethodTypes=constants.paymentMethodTypes;
var paymentOptionIDs=constants.paymentOptionIDs;
var isGuestCheckout=__webpack_require__(34);

function DropinModel(options){
this.componentID=options.componentID;
this.merchantConfiguration=options.merchantConfiguration;

this.isGuestCheckout=isGuestCheckout(options.client);

this.dependenciesInitializing=0;
this.dependencySuccessCount=0;
this.failedDependencies={};

this.supportedPaymentOptions=getSupportedPaymentOptions(options);
this._paymentMethods=this._getSupportedPaymentMethods(options.paymentMethods);
this._paymentMethodIsRequestable=this._paymentMethods.length>0;

EventEmitter.call(this);
}

DropinModel.prototype=Object.create(EventEmitter.prototype,{
constructor:DropinModel});


DropinModel.prototype.isPaymentMethodRequestable=function(){
return Boolean(this._paymentMethodIsRequestable);
};

DropinModel.prototype.addPaymentMethod=function(paymentMethod){
this._paymentMethods.push(paymentMethod);
this._emit('addPaymentMethod',paymentMethod);
this.changeActivePaymentMethod(paymentMethod);
};

DropinModel.prototype.removePaymentMethod=function(paymentMethod){
var paymentMethodLocation=this._paymentMethods.indexOf(paymentMethod);

if(paymentMethodLocation===-1){
return;
}

this._paymentMethods.splice(paymentMethodLocation,1);
this._emit('removePaymentMethod',paymentMethod);
};

DropinModel.prototype.changeActivePaymentMethod=function(paymentMethod){
this._activePaymentMethod=paymentMethod;
this._emit('changeActivePaymentMethod',paymentMethod);
};

DropinModel.prototype.changeActivePaymentView=function(paymentViewID){
this._activePaymentView=paymentViewID;
this._emit('changeActivePaymentView',paymentViewID);
};

DropinModel.prototype.removeActivePaymentMethod=function(){
this._activePaymentMethod=null;
this._emit('removeActivePaymentMethod');
this.setPaymentMethodRequestable({
isRequestable:false});

};

DropinModel.prototype.selectPaymentOption=function(paymentViewID){
this._emit('paymentOptionSelected',{
paymentOption:paymentViewID});

};

DropinModel.prototype._shouldEmitRequestableEvent=function(options){
var requestableStateHasNotChanged=this.isPaymentMethodRequestable()===options.isRequestable;
var typeHasNotChanged=options.type===this._paymentMethodRequestableType;

if(requestableStateHasNotChanged&&(!options.isRequestable||typeHasNotChanged)){
return false;
}

return true;
};

DropinModel.prototype.setPaymentMethodRequestable=function(options){
var shouldEmitEvent=this._shouldEmitRequestableEvent(options);
var paymentMethodRequestableResponse={
paymentMethodIsSelected:Boolean(options.selectedPaymentMethod),
type:options.type};


this._paymentMethodIsRequestable=options.isRequestable;

if(options.isRequestable){
this._paymentMethodRequestableType=options.type;
}else{
delete this._paymentMethodRequestableType;
}

if(!shouldEmitEvent){
return;
}

if(options.isRequestable){
this._emit('paymentMethodRequestable',paymentMethodRequestableResponse);
}else{
this._emit('noPaymentMethodRequestable');
}
};

DropinModel.prototype.getPaymentMethods=function(){




return this._paymentMethods.slice();
};

DropinModel.prototype.getActivePaymentMethod=function(){
return this._activePaymentMethod;
};

DropinModel.prototype.getActivePaymentView=function(){
return this._activePaymentView;
};

DropinModel.prototype.asyncDependencyStarting=function(){
this.dependenciesInitializing++;
};

DropinModel.prototype.asyncDependencyReady=function(){
this.dependencySuccessCount++;
this.dependenciesInitializing--;
this._checkAsyncDependencyFinished();
};

DropinModel.prototype.asyncDependencyFailed=function(options){
if(this.failedDependencies.hasOwnProperty(options.view)){
return;
}
this.failedDependencies[options.view]=options.error;
this.dependenciesInitializing--;
this._checkAsyncDependencyFinished();
};

DropinModel.prototype._checkAsyncDependencyFinished=function(){
if(this.dependenciesInitializing===0){
this._emit('asyncDependenciesReady');
}
};

DropinModel.prototype.reportError=function(error){
this._emit('errorOccurred',error);
};

DropinModel.prototype.clearError=function(){
this._emit('errorCleared');
};

DropinModel.prototype._getSupportedPaymentMethods=function(paymentMethods){
var supportedPaymentMethods=this.supportedPaymentOptions.reduce(function(array,key){
var paymentMethodType=paymentMethodTypes[key];

if(paymentMethodType){
array.push(paymentMethodType);
}

return array;
},[]);

return paymentMethods.filter(function(paymentMethod){
return supportedPaymentMethods.indexOf(paymentMethod.type)>-1;
});
};

function getSupportedPaymentOptions(options){
var result=[];
var paymentOptionPriority=options.merchantConfiguration.paymentOptionPriority||['card','paypal','paypalCredit'];

if(!(paymentOptionPriority instanceof Array)){
throw new DropinError('paymentOptionPriority must be an array.');
}


paymentOptionPriority=paymentOptionPriority.filter(function(item,pos){return paymentOptionPriority.indexOf(item)===pos;});

paymentOptionPriority.forEach(function(paymentOption){
if(isPaymentOptionEnabled(paymentOption,options)){
result.push(paymentOptionIDs[paymentOption]);
}
});

if(result.length===0){
throw new DropinError('No valid payment options available.');
}

return result;
}

function isPaymentOptionEnabled(paymentOption,options){
var gatewayConfiguration=options.client.getConfiguration().gatewayConfiguration;

if(paymentOption==='card'){
return gatewayConfiguration.creditCards.supportedCardTypes.length>0;
}else if(paymentOption==='paypal'){
return gatewayConfiguration.paypalEnabled&&Boolean(options.merchantConfiguration.paypal);
}else if(paymentOption==='paypalCredit'){
return gatewayConfiguration.paypalEnabled&&Boolean(options.merchantConfiguration.paypalCredit);
}
throw new DropinError('paymentOptionPriority: Invalid payment option specified.');
}

module.exports=DropinModel;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics=__webpack_require__(8);
var analyticsKinds=__webpack_require__(1).analyticsKinds;
var BaseView=__webpack_require__(6);
var classlist=__webpack_require__(12);
var sheetViews=__webpack_require__(69);
var PaymentMethodsView=__webpack_require__(38);
var PaymentOptionsView=__webpack_require__(39);
var addSelectionEventHandler=__webpack_require__(21);
var Promise=__webpack_require__(7);
var supportsFlexbox=__webpack_require__(108);
var transitionHelper=__webpack_require__(35);

var CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT=__webpack_require__(1).CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT;

function MainView(){
BaseView.apply(this,arguments);

this.dependenciesInitializing=0;

this._initialize();
}

MainView.prototype=Object.create(BaseView.prototype);
MainView.prototype.constructor=MainView;

MainView.prototype._initialize=function(){
var paymentOptionsView;
var hasMultiplePaymentOptions=this.model.supportedPaymentOptions.length>1;
var paymentMethods=this.model.getPaymentMethods();

this._views={};

this.sheetContainer=this.getElementById('sheet-container');
this.sheetErrorText=this.getElementById('sheet-error-text');

this.toggle=this.getElementById('toggle');
this.lowerContainer=this.getElementById('lower-container');

this.loadingContainer=this.getElementById('loading-container');
this.loadingIndicator=this.getElementById('loading-indicator');
this.dropinContainer=this.element.querySelector('.braintree-dropin');

this.supportsFlexbox=supportsFlexbox();

this.model.on('asyncDependenciesReady',this.hideLoadingIndicator.bind(this));

this.model.on('errorOccurred',this.showSheetError.bind(this));
this.model.on('errorCleared',this.hideSheetError.bind(this));

this.paymentSheetViewIDs=Object.keys(sheetViews).reduce(function(ids,sheetViewKey){
var PaymentSheetView,paymentSheetView;

if(this.model.supportedPaymentOptions.indexOf(sheetViewKey)!==-1){
PaymentSheetView=sheetViews[sheetViewKey];

paymentSheetView=new PaymentSheetView({
element:this.getElementById(PaymentSheetView.ID),
mainView:this,
model:this.model,
client:this.client,
strings:this.strings});


this.addView(paymentSheetView);
ids.push(paymentSheetView.ID);
}

return ids;
}.bind(this),[]);

this.paymentMethodsViews=new PaymentMethodsView({
element:this.element,
model:this.model,
strings:this.strings});

this.addView(this.paymentMethodsViews);

addSelectionEventHandler(this.toggle,this.toggleAdditionalOptions.bind(this));

this.model.on('changeActivePaymentMethod',function(){
setTimeout(function(){
this.setPrimaryView(PaymentMethodsView.ID);
}.bind(this),CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT);
}.bind(this));

this.model.on('changeActivePaymentView',function(id){
var activePaymentView=this.getView(id);

if(id===PaymentMethodsView.ID){
classlist.add(this.paymentMethodsViews.container,'braintree-methods--active');
classlist.remove(this.sheetContainer,'braintree-sheet--active');
}else{
setTimeout(function(){
classlist.add(this.sheetContainer,'braintree-sheet--active');
}.bind(this),0);
classlist.remove(this.paymentMethodsViews.container,'braintree-methods--active');
if(!this.getView(id).getPaymentMethod()){
this.model.setPaymentMethodRequestable({
isRequestable:false});

}
}

activePaymentView.onSelection();
}.bind(this));

this.model.on('removeActivePaymentMethod',function(){
var activePaymentView=this.getView(this.model.getActivePaymentView());

if(activePaymentView&&typeof activePaymentView.removeActivePaymentMethod==='function'){
activePaymentView.removeActivePaymentMethod();
}
}.bind(this));

if(hasMultiplePaymentOptions){
paymentOptionsView=new PaymentOptionsView({
client:this.client,
element:this.getElementById(PaymentOptionsView.ID),
mainView:this,
model:this.model,
strings:this.strings});


this.addView(paymentOptionsView);
}

if(paymentMethods.length>0){
this.model.changeActivePaymentMethod(paymentMethods[0]);
}else if(hasMultiplePaymentOptions){
this.setPrimaryView(paymentOptionsView.ID);
}else{
this.setPrimaryView(this.paymentSheetViewIDs[0]);
}
};

MainView.prototype.addView=function(view){
this._views[view.ID]=view;
};

MainView.prototype.getView=function(id){
return this._views[id];
};

MainView.prototype.setPrimaryView=function(id,secondaryViewId){
var paymentMethod;

setTimeout(function(){
this.element.className=prefixShowClass(id);
if(secondaryViewId){
classlist.add(this.element,prefixShowClass(secondaryViewId));
}
}.bind(this),0);

this.primaryView=this.getView(id);
this.model.changeActivePaymentView(id);

if(this.paymentSheetViewIDs.indexOf(id)!==-1){
if(this.model.getPaymentMethods().length>0||this.getView(PaymentOptionsView.ID)){
this.showToggle();
}else{
this.hideToggle();
}
}else if(id===PaymentMethodsView.ID){
this.showToggle();

this.getElementById('lower-container').appendChild(this.getElementById('options'));
}else if(id===PaymentOptionsView.ID){
this.hideToggle();
}

if(!this.supportsFlexbox){
this.element.setAttribute('data-braintree-no-flexbox',true);
}

paymentMethod=this.primaryView.getPaymentMethod();

this.model.setPaymentMethodRequestable({
isRequestable:Boolean(paymentMethod),
type:paymentMethod&&paymentMethod.type,
selectedPaymentMethod:paymentMethod});


this.model.clearError();
};

MainView.prototype.requestPaymentMethod=function(){
var activePaymentView=this.getView(this.model.getActivePaymentView());

return activePaymentView.requestPaymentMethod().then(function(payload){
analytics.sendEvent(this.client,'request-payment-method.'+analyticsKinds[payload.type]);

return payload;
}.bind(this)).catch(function(err){
analytics.sendEvent(this.client,'request-payment-method.error');
return Promise.reject(err);
}.bind(this));
};

MainView.prototype.hideLoadingIndicator=function(){
classlist.add(this.dropinContainer,'braintree-loaded');
transitionHelper.onTransitionEnd(this.loadingIndicator,'transform',function(){
this.loadingContainer.parentNode.removeChild(this.loadingContainer);
}.bind(this));
};

MainView.prototype.toggleAdditionalOptions=function(){
var sheetViewID;
var hasMultiplePaymentOptions=this.model.supportedPaymentOptions.length>1;
var isPaymentSheetView=this.paymentSheetViewIDs.indexOf(this.primaryView.ID)!==-1;

this.hideToggle();

if(!hasMultiplePaymentOptions){
sheetViewID=this.paymentSheetViewIDs[0];

classlist.add(this.element,prefixShowClass(sheetViewID));
this.model.changeActivePaymentView(sheetViewID);
}else if(isPaymentSheetView){
if(this.model.getPaymentMethods().length===0){
this.setPrimaryView(PaymentOptionsView.ID);
}else{
this.setPrimaryView(PaymentMethodsView.ID,PaymentOptionsView.ID);
this.hideToggle();
}
}else{
classlist.add(this.element,prefixShowClass(PaymentOptionsView.ID));
}
};

MainView.prototype.showToggle=function(){
classlist.remove(this.toggle,'braintree-hidden');
classlist.add(this.lowerContainer,'braintree-hidden');
};

MainView.prototype.hideToggle=function(){
classlist.add(this.toggle,'braintree-hidden');
classlist.remove(this.lowerContainer,'braintree-hidden');
};

MainView.prototype.showSheetError=function(error){
var translatedErrorMessage;
var errorMessage=this.strings.genericError;

if(this.strings.hasOwnProperty(error)){
translatedErrorMessage=this.strings[error];
}else if(error&&error.code){
translatedErrorMessage=this.strings[snakeCaseToCamelCase(error.code)+'Error'];
}

if(translatedErrorMessage){
errorMessage=translatedErrorMessage;
}

classlist.add(this.sheetContainer,'braintree-sheet--has-error');
this.sheetErrorText.textContent=errorMessage;
};

MainView.prototype.hideSheetError=function(){
classlist.remove(this.sheetContainer,'braintree-sheet--has-error');
};

MainView.prototype.getOptionsElements=function(){
return this._views.options.elements;
};

MainView.prototype.teardown=function(){
var error;
var viewNames=Object.keys(this._views);
var teardownPromises=viewNames.map(function(view){
return this._views[view].teardown().catch(function(err){
error=err;
});
}.bind(this));

return Promise.all(teardownPromises).then(function(){
if(error){
return Promise.reject(error);
}

return Promise.resolve();
});
};

function snakeCaseToCamelCase(s){
return s.toLowerCase().replace(/(\_\w)/g,function(m){
return m[1].toUpperCase();
});
}

function prefixShowClass(classname){
return'braintree-show-'+classname;
}

module.exports=MainView;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs=__webpack_require__(1).paymentOptionIDs;

var result={};

result[paymentOptionIDs.card]=__webpack_require__(70);
result[paymentOptionIDs.paypal]=__webpack_require__(102);
result[paymentOptionIDs.paypalCredit]=__webpack_require__(106);

module.exports=result;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign=__webpack_require__(11).assign;

var BaseView=__webpack_require__(6);
var classlist=__webpack_require__(12);
var constants=__webpack_require__(1);
var DropinError=__webpack_require__(4);
var hostedFields=__webpack_require__(71);
var transitionHelper=__webpack_require__(35);
var Promise=__webpack_require__(7);

var cardIconHTML="<div data-braintree-id=\"visa-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-visa\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"master-card-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-master-card\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"unionpay-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-unionpay\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"american-express-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-american-express\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"jcb-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-jcb\"></use>\n    </svg>\n</div>\n<!-- Remove braintree-hidden class when supportedCardType accurately indicates Diners Club support -->\n<div data-braintree-id=\"diners-club-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-diners-club\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"discover-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-discover\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"maestro-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-maestro\"></use>\n    </svg>\n</div>\n";

function CardView(){
BaseView.apply(this,arguments);

this._initialize();
}

CardView.prototype=Object.create(BaseView.prototype);
CardView.prototype.constructor=CardView;
CardView.ID=CardView.prototype.ID=constants.paymentOptionIDs.card;

CardView.prototype._initialize=function(){
var cvvFieldGroup,postalCodeFieldGroup;
var cardholderNameField=this.getElementById('cardholder-name-field-group');
var cardIcons=this.getElementById('card-view-icons');
var hfOptions=this._generateHostedFieldsOptions();

cardIcons.innerHTML=cardIconHTML;
this._hideUnsupportedCardIcons();

this.hasCVV=hfOptions.fields.cvv;
this.hasCardholderName=Boolean(this.model.merchantConfiguration.card&&this.model.merchantConfiguration.card.cardholderName);
this.cardholderNameInput=cardholderNameField.querySelector('input');
this.cardNumberIcon=this.getElementById('card-number-icon');
this.cardNumberIconSvg=this.getElementById('card-number-icon-svg');
this.cvvIcon=this.getElementById('cvv-icon');
this.cvvIconSvg=this.getElementById('cvv-icon-svg');
this.cvvLabelDescriptor=this.getElementById('cvv-label-descriptor');
this.fieldErrors={};

if(!this.hasCVV){
cvvFieldGroup=this.getElementById('cvv-field-group');
cvvFieldGroup.parentNode.removeChild(cvvFieldGroup);
}

if(!hfOptions.fields.postalCode){
postalCodeFieldGroup=this.getElementById('postal-code-field-group');
postalCodeFieldGroup.parentNode.removeChild(postalCodeFieldGroup);
}

if(this.hasCardholderName){
this._setupCardholderName(cardholderNameField);
}else{
cardholderNameField.parentNode.removeChild(cardholderNameField);
}

this.model.asyncDependencyStarting();

hostedFields.create(hfOptions,function(err,hostedFieldsInstance){
if(err){
this.model.asyncDependencyFailed({
view:this.ID,
error:err});

return;
}

this.hostedFieldsInstance=hostedFieldsInstance;
this.hostedFieldsInstance.on('blur',this._onBlurEvent.bind(this));
this.hostedFieldsInstance.on('cardTypeChange',this._onCardTypeChangeEvent.bind(this));
this.hostedFieldsInstance.on('focus',this._onFocusEvent.bind(this));
this.hostedFieldsInstance.on('notEmpty',this._onNotEmptyEvent.bind(this));
this.hostedFieldsInstance.on('validityChange',this._onValidityChangeEvent.bind(this));

this.model.asyncDependencyReady();
}.bind(this));
};

CardView.prototype._setupCardholderName=function(cardholderNameField){
var cardholderNameOptions=this.model.merchantConfiguration.card&&this.model.merchantConfiguration.card.cardholderName;
var cardholderNameContainer=cardholderNameField.querySelector('.braintree-form__hosted-field');

this.cardholderNameInput.addEventListener('keyup',function(){
var hasContent=this.cardholderNameInput.value.length>0;

classlist.toggle(cardholderNameContainer,'braintree-form__field--valid',hasContent);

if(!cardholderNameOptions.required){
return;
}

if(hasContent){
classlist.remove(cardholderNameField,'braintree-form__field-group--has-error');
}

this._sendRequestableEvent();
}.bind(this),false);

if(cardholderNameOptions.required){
this.cardholderNameInput.addEventListener('blur',function(){



setTimeout(function(){
if(isCardViewElement()&&this.cardholderNameInput.value.length===0){
classlist.add(cardholderNameField,'braintree-form__field-group--has-error');
}
}.bind(this),0);
}.bind(this),false);
}
};

CardView.prototype._sendRequestableEvent=function(){
if(!this._isTokenizing){
this.model.setPaymentMethodRequestable({
isRequestable:this._validateForm(),
type:constants.paymentMethodTypes.card});

}
};

CardView.prototype._generateHostedFieldsOptions=function(){
var challenges=this.client.getConfiguration().gatewayConfiguration.challenges;
var hasCVVChallenge=challenges.indexOf('cvv')!==-1;
var hasPostalCodeChallenge=challenges.indexOf('postal_code')!==-1;
var overrides=this.model.merchantConfiguration.card&&this.model.merchantConfiguration.card.overrides;
var options={
client:this.client,
fields:{
number:{
selector:this._generateFieldSelector('number'),
placeholder:'•••• •••• •••• ••••'},

expirationDate:{
selector:this._generateFieldSelector('expiration'),
placeholder:this.strings.expirationDatePlaceholder},

cvv:{
selector:this._generateFieldSelector('cvv'),
placeholder:'•••'},

postalCode:{
selector:this._generateFieldSelector('postal-code')}},


styles:{
input:{
'font-size':'16px',
'font-family':'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
color:'#000'},

':focus':{
color:'black'},

'::-webkit-input-placeholder':{
color:'#6a6a6a'},

':-moz-placeholder':{
color:'#6a6a6a'},

'::-moz-placeholder':{
color:'#6a6a6a'},

':-ms-input-placeholder ':{
color:'#6a6a6a'},

'input::-ms-clear':{
color:'transparent'}}};




if(!hasCVVChallenge){
delete options.fields.cvv;
}

if(!hasPostalCodeChallenge){
delete options.fields.postalCode;
}

if(!overrides){return options;}

if(overrides.fields){
if(overrides.fields.cvv&&overrides.fields.cvv.placeholder){
this._hasCustomCVVPlaceholder=true;
}

Object.keys(overrides.fields).forEach(function(field){
if((field==='cvv'||field==='postalCode')&&overrides.fields[field]===null){
delete options.fields[field];
return;
}

if(!options.fields[field]){
return;
}

assign(options.fields[field],overrides.fields[field],{
selector:options.fields[field].selector});

});
}

if(overrides.styles){
Object.keys(overrides.styles).forEach(function(style){
if(overrides.styles[style]===null){
delete options.styles[style];
return;
}

normalizeStyles(overrides.styles[style]);

assign(options.styles[style],overrides.styles[style]);
});
}

return options;
};

CardView.prototype._validateForm=function(showFieldErrors){
var cardType,cardTypeSupported,state;
var isValid=true;
var supportedCardTypes=this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

if(!this.hostedFieldsInstance){
return false;
}

state=this.hostedFieldsInstance.getState();

Object.keys(state.fields).forEach(function(key){
var field=state.fields[key];

if(!showFieldErrors&&!isValid){


return;
}

if(field.isEmpty){
isValid=false;

if(showFieldErrors){
this.showFieldError(key,this.strings['fieldEmptyFor'+capitalize(key)]);
}
}else if(!field.isValid){
isValid=false;

if(showFieldErrors){
this.showFieldError(key,this.strings['fieldInvalidFor'+capitalize(key)]);
}
}
}.bind(this));

if(state.fields.number.isValid){
cardType=constants.configurationCardTypes[state.cards[0].type];
cardTypeSupported=supportedCardTypes.indexOf(cardType)!==-1;

if(!cardTypeSupported){
isValid=false;

if(showFieldErrors){
this.showFieldError('number',this.strings.unsupportedCardTypeError);
}
}
}

if(!this._validateCardholderName()){
isValid=false;
}

return isValid;
};

CardView.prototype.getPaymentMethod=function(){
var formIsValid=this._validateForm();

if(formIsValid){
return{
type:constants.paymentMethodTypes.card};

}
};

CardView.prototype.tokenize=function(){
var transitionCallback;
var self=this;
var state=self.hostedFieldsInstance.getState();
var tokenizeOptions={
vault:!self.model.isGuestCheckout};


this.model.clearError();

if(!this._validateForm(true)){
self.model.reportError('hostedFieldsFieldsInvalidError');
classlist.remove(self.element,'braintree-sheet--loading');

return Promise.reject(new DropinError(constants.errors.NO_PAYMENT_METHOD_ERROR));
}

if(this.hasCardholderName){
tokenizeOptions.cardholderName=this.cardholderNameInput.value;
}

self._isTokenizing=true;

return self.hostedFieldsInstance.tokenize(tokenizeOptions).then(function(payload){
Object.keys(state.fields).forEach(function(field){
self.hostedFieldsInstance.clear(field);
});

if(!self.model.isGuestCheckout){
payload.vaulted=true;
}

return new Promise(function(resolve){
transitionCallback=function transitionCallback(){


setTimeout(function(){
self.model.addPaymentMethod(payload);
resolve(payload);
classlist.remove(self.element,'braintree-sheet--tokenized');
},0);
self._isTokenizing=false;
};

transitionHelper.onTransitionEnd(self.element,'max-height',transitionCallback);

setTimeout(function(){
classlist.remove(self.element,'braintree-sheet--loading');
},constants.CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT);

classlist.add(self.element,'braintree-sheet--tokenized');
});
}).catch(function(err){
self._isTokenizing=false;
self.model.reportError(err);
classlist.remove(self.element,'braintree-sheet--loading');
return Promise.reject(new DropinError({
message:constants.errors.NO_PAYMENT_METHOD_ERROR,
braintreeWebError:err}));

});
};

CardView.prototype.showFieldError=function(field,errorMessage){
var fieldError;
var fieldGroup=this.getElementById(camelCaseToKebabCase(field)+'-field-group');

if(!this.fieldErrors.hasOwnProperty(field)){
this.fieldErrors[field]=this.getElementById(camelCaseToKebabCase(field)+'-field-error');
}

classlist.add(fieldGroup,'braintree-form__field-group--has-error');

fieldError=this.fieldErrors[field];
fieldError.textContent=errorMessage;

this.hostedFieldsInstance.setAttribute({
field:field,
attribute:'aria-invalid',
value:true});

};

CardView.prototype.hideFieldError=function(field){
var fieldGroup=this.getElementById(camelCaseToKebabCase(field)+'-field-group');

if(!this.fieldErrors.hasOwnProperty(field)){
this.fieldErrors[field]=this.getElementById(camelCaseToKebabCase(field)+'-field-error');
}

classlist.remove(fieldGroup,'braintree-form__field-group--has-error');

this.hostedFieldsInstance.removeAttribute({
field:field,
attribute:'aria-invalid'});

};

CardView.prototype.teardown=function(){
return this.hostedFieldsInstance.teardown();
};

CardView.prototype._generateFieldSelector=function(field){
return'#braintree--dropin__'+this.model.componentID+' .braintree-form-'+field;
};

CardView.prototype._validateCardholderName=function(){
if(!this.hasCardholderName||!this.model.merchantConfiguration.card.cardholderName.required){
return true;
}

return this.cardholderNameInput.value.length>0;
};

CardView.prototype._onBlurEvent=function(event){
var field=event.fields[event.emittedBy];
var fieldGroup=this.getElementById(camelCaseToKebabCase(event.emittedBy)+'-field-group');

classlist.remove(fieldGroup,'braintree-form__field-group--is-focused');

if(isCardViewElement()&&field.isEmpty){
this.showFieldError(event.emittedBy,this.strings['fieldEmptyFor'+capitalize(event.emittedBy)]);
}else if(!field.isEmpty&&!field.isValid){
this.showFieldError(event.emittedBy,this.strings['fieldInvalidFor'+capitalize(event.emittedBy)]);
}else if(event.emittedBy==='number'&&!this._isCardTypeSupported(event.cards[0].type)){
this.showFieldError('number',this.strings.unsupportedCardTypeError);
}
};

CardView.prototype._onCardTypeChangeEvent=function(event){
var cardType;
var cardNumberHrefLink='#iconCardFront';
var cvvHrefLink='#iconCVVBack';
var cvvDescriptor=this.strings.cvvThreeDigitLabelSubheading;
var cvvPlaceholder='•••';
var numberFieldGroup=this.getElementById('number-field-group');

if(event.cards.length===1){
cardType=event.cards[0].type;
cardNumberHrefLink='#icon-'+cardType;
if(cardType==='american-express'){
cvvHrefLink='#iconCVVFront';
cvvDescriptor=this.strings.cvvFourDigitLabelSubheading;
cvvPlaceholder='••••';
}

classlist.add(numberFieldGroup,'braintree-form__field-group--card-type-known');
}else{
classlist.remove(numberFieldGroup,'braintree-form__field-group--card-type-known');
}

this.cardNumberIconSvg.setAttribute('xlink:href',cardNumberHrefLink);

if(this.hasCVV){
this.cvvIconSvg.setAttribute('xlink:href',cvvHrefLink);
this.cvvLabelDescriptor.textContent=cvvDescriptor;

if(!this._hasCustomCVVPlaceholder){
this.hostedFieldsInstance.setAttribute({
field:'cvv',
attribute:'placeholder',
value:cvvPlaceholder});

}
}
};

CardView.prototype._onFocusEvent=function(event){
var fieldGroup=this.getElementById(camelCaseToKebabCase(event.emittedBy)+'-field-group');

classlist.add(fieldGroup,'braintree-form__field-group--is-focused');
};

CardView.prototype._onNotEmptyEvent=function(event){
this.hideFieldError(event.emittedBy);
};

CardView.prototype._onValidityChangeEvent=function(event){
var isValid;
var field=event.fields[event.emittedBy];

if(event.emittedBy==='number'&&event.cards[0]){
isValid=field.isValid&&this._isCardTypeSupported(event.cards[0].type);
}else{
isValid=field.isValid;
}

classlist.toggle(field.container,'braintree-form__field--valid',isValid);

if(field.isPotentiallyValid){
this.hideFieldError(event.emittedBy);
}

this._sendRequestableEvent();
};

CardView.prototype.requestPaymentMethod=function(){
classlist.add(this.element,'braintree-sheet--loading');
return this.tokenize();
};

CardView.prototype.onSelection=function(){
if(!this.hostedFieldsInstance){
return;
}

if(this.hasCardholderName){
setTimeout(function(){
this.cardholderNameInput.focus();
}.bind(this),1);
}else{
this.hostedFieldsInstance.focus('number');
}
};

CardView.prototype._hideUnsupportedCardIcons=function(){
var supportedCardTypes=this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

Object.keys(constants.configurationCardTypes).forEach(function(paymentMethodCardType){
var cardIcon;
var configurationCardType=constants.configurationCardTypes[paymentMethodCardType];

if(supportedCardTypes.indexOf(configurationCardType)===-1){
cardIcon=this.getElementById(paymentMethodCardType+'-card-icon');
classlist.add(cardIcon,'braintree-hidden');
}
}.bind(this));
};

CardView.prototype._isCardTypeSupported=function(cardType){
var configurationCardType=constants.configurationCardTypes[cardType];
var supportedCardTypes=this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

return supportedCardTypes.indexOf(configurationCardType)!==-1;
};

function isCardViewElement(){
var activeId=document.activeElement&&document.activeElement.id;
var isHostedFieldsElement=document.activeElement instanceof HTMLIFrameElement&&activeId.indexOf('braintree-hosted-field')!==-1;
var isNormalFieldElement=activeId.indexOf('braintree__card-view-input')!==-1;

return isHostedFieldsElement||isNormalFieldElement;
}

function camelCaseToKebabCase(string){
return string.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();
}

function capitalize(string){
return string[0].toUpperCase()+string.substr(1);
}

function normalizeStyles(styles){
Object.keys(styles).forEach(function(style){
var transformedKeyName=camelCaseToKebabCase(style);

styles[transformedKeyName]=styles[style];
});
}

module.exports=CardView;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var HostedFields=__webpack_require__(72);
var supportsInputFormatting=__webpack_require__(95);
var wrapPromise=__webpack_require__(3);
var Promise=__webpack_require__(5);
var VERSION="3.22.0";



































































































































function create(options){
var integration;

return new Promise(function(resolve){
integration=new HostedFields(options);

integration.on('ready',function(){
resolve(integration);
});
});
}

module.exports={








































supportsInputFormatting:supportsInputFormatting,
create:wrapPromise(create),




VERSION:VERSION};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Destructor=__webpack_require__(73);
var classlist=__webpack_require__(75);
var iFramer=__webpack_require__(76);
var Bus=__webpack_require__(80);
var BraintreeError=__webpack_require__(2);
var composeUrl=__webpack_require__(84);
var constants=__webpack_require__(16);
var errors=__webpack_require__(17);
var INTEGRATION_TIMEOUT_MS=__webpack_require__(9).INTEGRATION_TIMEOUT_MS;
var uuid=__webpack_require__(15);
var findParentTags=__webpack_require__(86);
var browserDetection=__webpack_require__(87);
var events=constants.events;
var EventEmitter=__webpack_require__(89);
var injectFrame=__webpack_require__(90);
var analytics=__webpack_require__(20);
var whitelistedFields=constants.whitelistedFields;
var VERSION="3.22.0";
var methods=__webpack_require__(91);
var convertMethodsToError=__webpack_require__(92);
var sharedErrors=__webpack_require__(10);
var getCardTypes=__webpack_require__(93);
var attributeValidationError=__webpack_require__(94);
var Promise=__webpack_require__(5);
var wrapPromise=__webpack_require__(3);





















































































































































































































function createInputEventHandler(fields){
return function(eventData){
var field;
var merchantPayload=eventData.merchantPayload;
var emittedBy=merchantPayload.emittedBy;
var container=fields[emittedBy].containerElement;

Object.keys(merchantPayload.fields).forEach(function(key){
merchantPayload.fields[key].container=fields[key].containerElement;
});

field=merchantPayload.fields[emittedBy];

if(eventData.type==='blur'){
performBlurFixForIos(container);
}

classlist.toggle(container,constants.externalClasses.FOCUSED,field.isFocused);
classlist.toggle(container,constants.externalClasses.VALID,field.isValid);
classlist.toggle(container,constants.externalClasses.INVALID,!field.isPotentiallyValid);

this._state={
cards:merchantPayload.cards,
fields:merchantPayload.fields};


this._emit(eventData.type,merchantPayload);
};
}






function performBlurFixForIos(container){
var hiddenInput;

if(!browserDetection.isIos()){
return;
}

if(document.activeElement===document.body){
hiddenInput=container.querySelector('input');

if(!hiddenInput){
hiddenInput=document.createElement('input');

hiddenInput.type='button';
hiddenInput.style.height='0px';
hiddenInput.style.width='0px';
hiddenInput.style.opacity='0';
hiddenInput.style.padding='0';
hiddenInput.style.position='absolute';
hiddenInput.style.left='-200%';
hiddenInput.style.top='0px';

container.insertBefore(hiddenInput,container.firstChild);
}

hiddenInput.focus();
hiddenInput.blur();
}
}







function HostedFields(options){
var failureTimeout,clientVersion,clientConfig;
var self=this;
var fields={};
var fieldCount=0;
var componentId=uuid();

if(!options.client){
throw new BraintreeError({
type:sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
code:sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
message:'options.client is required when instantiating Hosted Fields.'});

}

clientConfig=options.client.getConfiguration();
clientVersion=options.client.getVersion();
if(clientVersion!==VERSION){
throw new BraintreeError({
type:sharedErrors.INCOMPATIBLE_VERSIONS.type,
code:sharedErrors.INCOMPATIBLE_VERSIONS.code,
message:'Client (version '+clientVersion+') and Hosted Fields (version '+VERSION+') components must be from the same SDK version.'});

}

if(!options.fields){
throw new BraintreeError({
type:sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
code:sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
message:'options.fields is required when instantiating Hosted Fields.'});

}

EventEmitter.call(this);

this._injectedNodes=[];
this._destructor=new Destructor();
this._fields=fields;
this._state={
fields:{},
cards:getCardTypes('')};


this._bus=new Bus({
channel:componentId,
merchantUrl:location.href});


this._destructor.registerFunctionForTeardown(function(){
self._bus.teardown();
});

this._client=options.client;

analytics.sendEvent(this._client,'custom.hosted-fields.initialized');

Object.keys(options.fields).forEach(function(key){
var field,container,frame;

if(!constants.whitelistedFields.hasOwnProperty(key)){
throw new BraintreeError({
type:errors.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
code:errors.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
message:'"'+key+'" is not a valid field.'});

}

field=options.fields[key];

container=document.querySelector(field.selector);

if(!container){
throw new BraintreeError({
type:errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
code:errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
message:errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
details:{
fieldSelector:field.selector,
fieldKey:key}});


}else if(container.querySelector('iframe[name^="braintree-"]')){
throw new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
code:errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
message:errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
details:{
fieldSelector:field.selector,
fieldKey:key}});


}

if(field.maxlength&&typeof field.maxlength!=='number'){
throw new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
message:'The value for maxlength must be a number.',
details:{
fieldKey:key}});


}

if(field.minlength&&typeof field.minlength!=='number'){
throw new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
message:'The value for minlength must be a number.',
details:{
fieldKey:key}});


}

frame=iFramer({
type:key,
name:'braintree-hosted-field-'+key,
style:constants.defaultIFrameStyle});


this._injectedNodes=this._injectedNodes.concat(injectFrame(frame,container));
this._setupLabelFocus(key,container);
fields[key]={
frameElement:frame,
containerElement:container};

fieldCount++;

this._state.fields[key]={
isEmpty:true,
isValid:false,
isPotentiallyValid:true,
isFocused:false,
container:container};


setTimeout(function(){













if(global.navigator&&global.navigator.vendor&&global.navigator.vendor.indexOf('Apple')===-1){
frame.src='about:blank';
}
setTimeout(function(){
frame.src=composeUrl(clientConfig.gatewayConfiguration.assetsUrl,componentId,clientConfig.isDebug);
},0);
},0);
}.bind(this));

failureTimeout=setTimeout(function(){
analytics.sendEvent(self._client,'custom.hosted-fields.load.timed-out');
},INTEGRATION_TIMEOUT_MS);

this._bus.on(events.FRAME_READY,function(reply){
fieldCount--;
if(fieldCount===0){
clearTimeout(failureTimeout);
reply(options);
self._emit('ready');
}
});

this._bus.on(
events.INPUT_EVENT,
createInputEventHandler(fields).bind(this));


this._destructor.registerFunctionForTeardown(function(){
var j,node,parent;

for(j=0;j<self._injectedNodes.length;j++){
node=self._injectedNodes[j];
parent=node.parentNode;

parent.removeChild(node);

classlist.remove(
parent,
constants.externalClasses.FOCUSED,
constants.externalClasses.INVALID,
constants.externalClasses.VALID);

}
});

this._destructor.registerFunctionForTeardown(function(){
var methodNames=methods(HostedFields.prototype).concat(methods(EventEmitter.prototype));

convertMethodsToError(self,methodNames);
});
}

HostedFields.prototype=Object.create(EventEmitter.prototype,{
constructor:HostedFields});


HostedFields.prototype._setupLabelFocus=function(type,container){
var labels,i;
var shouldSkipLabelFocus=browserDetection.isIos();
var bus=this._bus;

if(shouldSkipLabelFocus){return;}
if(container.id==null){return;}

function triggerFocus(){
bus.emit(events.TRIGGER_INPUT_FOCUS,type);
}

labels=Array.prototype.slice.call(document.querySelectorAll('label[for="'+container.id+'"]'));
labels=labels.concat(findParentTags(container,'label'));

for(i=0;i<labels.length;i++){
labels[i].addEventListener('click',triggerFocus,false);
}

this._destructor.registerFunctionForTeardown(function(){
for(i=0;i<labels.length;i++){
labels[i].removeEventListener('click',triggerFocus,false);
}
});
};















HostedFields.prototype.teardown=function(){
var self=this;

return new Promise(function(resolve,reject){
self._destructor.teardown(function(err){
analytics.sendEvent(self._client,'custom.hosted-fields.teardown-completed');

if(err){
reject(err);
}else{
resolve();
}
});
});
};



















































































































HostedFields.prototype.tokenize=function(options){
var self=this;

if(!options){
options={};
}

return new Promise(function(resolve,reject){
self._bus.emit(events.TOKENIZATION_REQUEST,options,function(response){
var err=response[0];
var payload=response[1];

if(err){
reject(err);
}else{
resolve(payload);
}
});
});
};
















HostedFields.prototype.addClass=function(field,classname){
var err;

if(!whitelistedFields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_INVALID.code,
message:'"'+field+'" is not a valid field. You must use a valid field option when adding a class.'});

}else if(!this._fields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
code:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
message:'Cannot add class to "'+field+'" field because it is not part of the current Hosted Fields options.'});

}else{
this._bus.emit(events.ADD_CLASS,field,classname);
}

if(err){
return Promise.reject(err);
}

return Promise.resolve();
};




















HostedFields.prototype.removeClass=function(field,classname){
var err;

if(!whitelistedFields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_INVALID.code,
message:'"'+field+'" is not a valid field. You must use a valid field option when removing a class.'});

}else if(!this._fields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
code:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
message:'Cannot remove class from "'+field+'" field because it is not part of the current Hosted Fields options.'});

}else{
this._bus.emit(events.REMOVE_CLASS,field,classname);
}

if(err){
return Promise.reject(err);
}

return Promise.resolve();
};




































HostedFields.prototype.setAttribute=function(options){
var attributeErr,err;

if(!whitelistedFields.hasOwnProperty(options.field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_INVALID.code,
message:'"'+options.field+'" is not a valid field. You must use a valid field option when setting an attribute.'});

}else if(!this._fields.hasOwnProperty(options.field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
code:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
message:'Cannot set attribute for "'+options.field+'" field because it is not part of the current Hosted Fields options.'});

}else{
attributeErr=attributeValidationError(options.attribute,options.value);

if(attributeErr){
err=attributeErr;
}else{
this._bus.emit(events.SET_ATTRIBUTE,options.field,options.attribute,options.value);
}
}

if(err){
return Promise.reject(err);
}

return Promise.resolve();
};






















HostedFields.prototype.removeAttribute=function(options){
var attributeErr,err;

if(!whitelistedFields.hasOwnProperty(options.field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_INVALID.code,
message:'"'+options.field+'" is not a valid field. You must use a valid field option when removing an attribute.'});

}else if(!this._fields.hasOwnProperty(options.field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
code:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
message:'Cannot remove attribute for "'+options.field+'" field because it is not part of the current Hosted Fields options.'});

}else{
attributeErr=attributeValidationError(options.attribute);

if(attributeErr){
err=attributeErr;
}else{
this._bus.emit(events.REMOVE_ATTRIBUTE,options.field,options.attribute);
}
}

if(err){
return Promise.reject(err);
}

return Promise.resolve();
};











HostedFields.prototype.setPlaceholder=function(field,placeholder){
return this.setAttribute({
field:field,
attribute:'placeholder',
value:placeholder});

};



















HostedFields.prototype.clear=function(field){
var err;

if(!whitelistedFields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_INVALID.code,
message:'"'+field+'" is not a valid field. You must use a valid field option when clearing a field.'});

}else if(!this._fields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
code:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
message:'Cannot clear "'+field+'" field because it is not part of the current Hosted Fields options.'});

}else{
this._bus.emit(events.CLEAR_FIELD,field);
}

if(err){
return Promise.reject(err);
}

return Promise.resolve();
};






















HostedFields.prototype.focus=function(field){
var err;

if(!whitelistedFields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_INVALID.type,
code:errors.HOSTED_FIELDS_FIELD_INVALID.code,
message:'"'+field+'" is not a valid field. You must use a valid field option when focusing a field.'});

}else if(!this._fields.hasOwnProperty(field)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
code:errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
message:'Cannot focus "'+field+'" field because it is not part of the current Hosted Fields options.'});

}else{
this._bus.emit(events.TRIGGER_INPUT_FOCUS,field);
}

if(err){
return Promise.reject(err);
}

return Promise.resolve();
};












HostedFields.prototype.getState=function(){
return this._state;
};

module.exports=wrapPromise.wrapPrototype(HostedFields);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var batchExecuteFunctions=__webpack_require__(74);

function Destructor(){
this._teardownRegistry=[];

this._isTearingDown=false;
}

Destructor.prototype.registerFunctionForTeardown=function(fn){
if(typeof fn==='function'){
this._teardownRegistry.push(fn);
}
};

Destructor.prototype.teardown=function(callback){
if(this._isTearingDown){
callback(new Error('Destructor is already tearing down'));
return;
}

this._isTearingDown=true;

batchExecuteFunctions(this._teardownRegistry,function(err){
this._teardownRegistry=[];
this._isTearingDown=false;

if(typeof callback==='function'){
callback(err);
}
}.bind(this));
};

module.exports=Destructor;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var once=__webpack_require__(14);

function call(fn,callback){
var isSync=fn.length===0;

if(isSync){
fn();
callback(null);
}else{
fn(callback);
}
}

module.exports=function(functions,cb){
var i;
var length=functions.length;
var remaining=length;
var callback=once(cb);

if(length===0){
callback(null);
return;
}

function finish(err){
if(err){
callback(err);
return;
}

remaining-=1;
if(remaining===0){
callback(null);
}
}

for(i=0;i<length;i++){
call(functions[i],finish);
}
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classesOf(element){
return element.className.trim().split(/\s+/);
}

function add(element){
var toAdd=Array.prototype.slice.call(arguments,1);
var className=_classesOf(element).filter(function(classname){
return toAdd.indexOf(classname)===-1;
}).concat(toAdd).join(' ');

element.className=className;
}

function remove(element){
var toRemove=Array.prototype.slice.call(arguments,1);
var className=_classesOf(element).filter(function(classname){
return toRemove.indexOf(classname)===-1;
}).join(' ');

element.className=className;
}

function toggle(element,classname,adding){
if(adding){
add(element,classname);
}else{
remove(element,classname);
}
}

module.exports={
add:add,
remove:remove,
toggle:toggle};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setAttributes=__webpack_require__(77);
var defaultAttributes=__webpack_require__(78);
var assign=__webpack_require__(79);

module.exports=function createFrame(options){
var iframe=document.createElement('iframe');
var config=assign({},defaultAttributes,options);

if(config.style&&typeof config.style!=='string'){
assign(iframe.style,config.style);
delete config.style;
}

setAttributes(iframe,config);

if(!iframe.getAttribute('id')){
iframe.id=iframe.name;
}

return iframe;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function setAttributes(element,attributes){
var value;

for(var key in attributes){
if(attributes.hasOwnProperty(key)){
value=attributes[key];

if(value==null){
element.removeAttribute(key);
}else{
element.setAttribute(key,value);
}
}
}
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
src:'about:blank',
frameBorder:0,
allowtransparency:true,
scrolling:'no'};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==='function'?Symbol.prototype:'@@prototype')?"symbol":typeof obj;};

module.exports=function assign(target){
var objs=Array.prototype.slice.call(arguments,1);

objs.forEach(function(obj){
if((typeof obj==='undefined'?'undefined':_typeof(obj))!=='object'){return;}

Object.keys(obj).forEach(function(key){
target[key]=obj[key];
});
});

return target;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bus=__webpack_require__(81);
var events=__webpack_require__(82);
var checkOrigin=__webpack_require__(83).checkOrigin;
var BraintreeError=__webpack_require__(2);

function BraintreeBus(options){
options=options||{};

this.channel=options.channel;
if(!this.channel){
throw new BraintreeError({
type:BraintreeError.types.INTERNAL,
code:'MISSING_CHANNEL_ID',
message:'Channel ID must be specified.'});

}

this.merchantUrl=options.merchantUrl;

this._isDestroyed=false;
this._isVerbose=false;

this._listeners=[];

this._log('new bus on channel '+this.channel,[location.href]);
}

BraintreeBus.prototype.on=function(eventName,originalHandler){
var namespacedEvent,args;
var handler=originalHandler;
var self=this;

if(this._isDestroyed){return;}

if(this.merchantUrl){
handler=function handler(){

if(checkOrigin(this.origin,self.merchantUrl)){
originalHandler.apply(this,arguments);
}

};
}

namespacedEvent=this._namespaceEvent(eventName);
args=Array.prototype.slice.call(arguments);
args[0]=namespacedEvent;
args[1]=handler;

this._log('on',args);
bus.on.apply(bus,args);

this._listeners.push({
eventName:eventName,
handler:handler,
originalHandler:originalHandler});

};

BraintreeBus.prototype.emit=function(eventName){
var args;

if(this._isDestroyed){return;}

args=Array.prototype.slice.call(arguments);
args[0]=this._namespaceEvent(eventName);

this._log('emit',args);
bus.emit.apply(bus,args);
};

BraintreeBus.prototype._offDirect=function(eventName){
var args=Array.prototype.slice.call(arguments);

if(this._isDestroyed){return;}

args[0]=this._namespaceEvent(eventName);

this._log('off',args);
bus.off.apply(bus,args);
};

BraintreeBus.prototype.off=function(eventName,originalHandler){
var i,listener;
var handler=originalHandler;

if(this._isDestroyed){return;}

if(this.merchantUrl){
for(i=0;i<this._listeners.length;i++){
listener=this._listeners[i];

if(listener.originalHandler===originalHandler){
handler=listener.handler;
}
}
}

this._offDirect(eventName,handler);
};

BraintreeBus.prototype._namespaceEvent=function(eventName){
return['braintree',this.channel,eventName].join(':');
};

BraintreeBus.prototype.teardown=function(){
var listener,i;

for(i=0;i<this._listeners.length;i++){
listener=this._listeners[i];
this._offDirect(listener.eventName,listener.handler);
}

this._listeners.length=0;

this._isDestroyed=true;
};

BraintreeBus.prototype._log=function(functionName,args){
if(this._isVerbose){
console.log(functionName,args);
}
};

BraintreeBus.events=events;

module.exports=BraintreeBus;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==='function'?Symbol.prototype:'@@prototype')?"symbol":typeof obj;};
(function(root,factory){
if(( false?'undefined':_typeof(exports))==='object'&&typeof module!=='undefined'){
module.exports=factory(typeof global==='undefined'?root:global);
}else if(true){
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return factory(root);}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}else{
root.framebus=factory(root);
}
})(undefined,function(root){
var win,framebus;
var popups=[];
var subscribers={};
var prefix='/*framebus*/';

function include(popup){
if(popup==null){return false;}
if(popup.Window==null){return false;}
if(popup.constructor!==popup.Window){return false;}

popups.push(popup);
return true;
}

function target(origin){
var key;
var targetedFramebus={};

for(key in framebus){
if(!framebus.hasOwnProperty(key)){continue;}

targetedFramebus[key]=framebus[key];
}

targetedFramebus._origin=origin||'*';

return targetedFramebus;
}

function publish(event){
var payload,args;
var origin=_getOrigin(this);

if(_isntString(event)){return false;}
if(_isntString(origin)){return false;}

args=Array.prototype.slice.call(arguments,1);

payload=_packagePayload(event,args,origin);
if(payload===false){return false;}

_broadcast(win.top||win.self,payload,origin);

return true;
}

function subscribe(event,fn){
var origin=_getOrigin(this);

if(_subscriptionArgsInvalid(event,fn,origin)){return false;}

subscribers[origin]=subscribers[origin]||{};
subscribers[origin][event]=subscribers[origin][event]||[];
subscribers[origin][event].push(fn);

return true;
}

function unsubscribe(event,fn){
var i,subscriberList;
var origin=_getOrigin(this);

if(_subscriptionArgsInvalid(event,fn,origin)){return false;}

subscriberList=subscribers[origin]&&subscribers[origin][event];
if(!subscriberList){return false;}

for(i=0;i<subscriberList.length;i++){
if(subscriberList[i]===fn){
subscriberList.splice(i,1);
return true;
}
}

return false;
}

function _getOrigin(scope){
return scope&&scope._origin||'*';
}

function _isntString(string){
return typeof string!=='string';
}

function _packagePayload(event,args,origin){
var packaged=false;
var payload={
event:event,
origin:origin};

var reply=args[args.length-1];

if(typeof reply==='function'){
payload.reply=_subscribeReplier(reply,origin);
args=args.slice(0,-1);
}

payload.args=args;

try{
packaged=prefix+JSON.stringify(payload);
}catch(e){
throw new Error('Could not stringify event: '+e.message);
}
return packaged;
}

function _unpackPayload(e){
var payload,replyOrigin,replySource,replyEvent;

if(e.data.slice(0,prefix.length)!==prefix){return false;}

try{
payload=JSON.parse(e.data.slice(prefix.length));
}catch(err){
return false;
}

if(payload.reply!=null){
replyOrigin=e.origin;
replySource=e.source;
replyEvent=payload.reply;

payload.reply=function reply(data){
var replyPayload=_packagePayload(replyEvent,[data],replyOrigin);

if(replyPayload===false){return false;}

replySource.postMessage(replyPayload,replyOrigin);
};

payload.args.push(payload.reply);
}

return payload;
}

function _attach(w){
if(win){return;}
win=w||root;

if(win.addEventListener){
win.addEventListener('message',_onmessage,false);
}else if(win.attachEvent){
win.attachEvent('onmessage',_onmessage);
}else if(win.onmessage===null){
win.onmessage=_onmessage;
}else{
win=null;
}
}

function _uuid(){
return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
var r=Math.random()*16|0;
var v=c==='x'?r:r&0x3|0x8;

return v.toString(16);
});
}

function _onmessage(e){
var payload;

if(_isntString(e.data)){return;}

payload=_unpackPayload(e);
if(!payload){return;}

_dispatch('*',payload.event,payload.args,e);
_dispatch(e.origin,payload.event,payload.args,e);
_broadcastPopups(e.data,payload.origin,e.source);
}

function _dispatch(origin,event,args,e){
var i;

if(!subscribers[origin]){return;}
if(!subscribers[origin][event]){return;}

for(i=0;i<subscribers[origin][event].length;i++){
subscribers[origin][event][i].apply(e,args);
}
}

function _hasOpener(frame){
if(frame.top!==frame){return false;}
if(frame.opener==null){return false;}
if(frame.opener===frame){return false;}
if(frame.opener.closed===true){return false;}

return true;
}

function _broadcast(frame,payload,origin){
var i;

try{
frame.postMessage(payload,origin);

if(_hasOpener(frame)){
_broadcast(frame.opener.top,payload,origin);
}

for(i=0;i<frame.frames.length;i++){
_broadcast(frame.frames[i],payload,origin);
}
}catch(_){}
}

function _broadcastPopups(payload,origin,source){
var i,popup;

for(i=popups.length-1;i>=0;i--){
popup=popups[i];

if(popup.closed===true){
popups=popups.slice(i,1);
}else if(source!==popup){
_broadcast(popup.top,payload,origin);
}
}
}

function _subscribeReplier(fn,origin){
var uuid=_uuid();

function replier(d,o){
fn(d,o);
framebus.target(origin).unsubscribe(uuid,replier);
}

framebus.target(origin).subscribe(uuid,replier);
return uuid;
}

function _subscriptionArgsInvalid(event,fn,origin){
if(_isntString(event)){return true;}
if(typeof fn!=='function'){return true;}
if(_isntString(origin)){return true;}

return false;
}

_attach();

framebus={
target:target,
include:include,
publish:publish,
pub:publish,
trigger:publish,
emit:publish,
subscribe:subscribe,
sub:subscribe,
on:subscribe,
unsubscribe:unsubscribe,
unsub:unsubscribe,
off:unsubscribe};


return framebus;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enumerate=__webpack_require__(13);

module.exports=enumerate([
'CONFIGURATION_REQUEST'],
'bus:');

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isWhitelistedDomain=__webpack_require__(27);

function checkOrigin(postMessageOrigin,merchantUrl){
var merchantOrigin,merchantHost;
var a=document.createElement('a');

a.href=merchantUrl;

if(a.protocol==='https:'){
merchantHost=a.host.replace(/:443$/,'');
}else if(a.protocol==='http:'){
merchantHost=a.host.replace(/:80$/,'');
}else{
merchantHost=a.host;
}

merchantOrigin=a.protocol+'//'+merchantHost;

if(merchantOrigin===postMessageOrigin){return true;}

a.href=postMessageOrigin;

return isWhitelistedDomain(postMessageOrigin);
}

module.exports={
checkOrigin:checkOrigin};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants=__webpack_require__(16);
var useMin=__webpack_require__(85);

module.exports=function composeUrl(assetsUrl,componentId,isDebug){
return assetsUrl+
'/web/'+
constants.VERSION+
'/html/hosted-fields-frame'+useMin(isDebug)+'.html#'+
componentId;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function useMin(isDebug){
return isDebug?'':'.min';
}

module.exports=useMin;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findParentTags(element,tag){
var parent=element.parentNode;
var parents=[];

while(parent!=null){
if(parent.tagName!=null&&parent.tagName.toLowerCase()===tag){
parents.push(parent);
}

parent=parent.parentNode;
}

return parents;
}

module.exports=findParentTags;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
isIe9:__webpack_require__(18),
isIos:__webpack_require__(19),
isIosWebview:__webpack_require__(88)};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isIos=__webpack_require__(19);


function isGoogleSearchApp(ua){
return /\bGSA\b/.test(ua);
}

module.exports=function isIosWebview(ua){
ua=ua||global.navigator.userAgent;
if(isIos(ua)){
if(isGoogleSearchApp(ua)){
return true;
}
return /.+AppleWebKit(?!.*Safari)/.test(ua);
}
return false;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function EventEmitter(){
this._events={};
}

EventEmitter.prototype.on=function(event,callback){
if(this._events[event]){
this._events[event].push(callback);
}else{
this._events[event]=[callback];
}
};

EventEmitter.prototype._emit=function(event){
var i,args;
var callbacks=this._events[event];

if(!callbacks){return;}

args=Array.prototype.slice.call(arguments,1);

for(i=0;i<callbacks.length;i++){
callbacks[i].apply(null,args);
}
};

module.exports=EventEmitter;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function injectFrame(frame,container){
var clearboth=document.createElement('div');
var fragment=document.createDocumentFragment();

clearboth.style.clear='both';

fragment.appendChild(frame);
fragment.appendChild(clearboth);

container.appendChild(fragment);

return[frame,clearboth];
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function(obj){
return Object.keys(obj).filter(function(key){
return typeof obj[key]==='function';
});
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);
var sharedErrors=__webpack_require__(10);

module.exports=function(instance,methodNames){
methodNames.forEach(function(methodName){
instance[methodName]=function(){
throw new BraintreeError({
type:sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
code:sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
message:methodName+' cannot be called after teardown.'});

};
});
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types={};
var VISA='visa';
var MASTERCARD='master-card';
var AMERICAN_EXPRESS='american-express';
var DINERS_CLUB='diners-club';
var DISCOVER='discover';
var JCB='jcb';
var UNIONPAY='unionpay';
var MAESTRO='maestro';
var CVV='CVV';
var CID='CID';
var CVC='CVC';
var CVN='CVN';
var testOrder=[
VISA,
MASTERCARD,
AMERICAN_EXPRESS,
DINERS_CLUB,
DISCOVER,
JCB,
UNIONPAY,
MAESTRO];


function clone(x){
var prefixPattern,exactPattern,dupe;

if(!x){return null;}

prefixPattern=x.prefixPattern.source;
exactPattern=x.exactPattern.source;
dupe=JSON.parse(JSON.stringify(x));
dupe.prefixPattern=prefixPattern;
dupe.exactPattern=exactPattern;

return dupe;
}

types[VISA]={
niceType:'Visa',
type:VISA,
prefixPattern:/^4$/,
exactPattern:/^4\d*$/,
gaps:[4,8,12],
lengths:[16,18,19],
code:{
name:CVV,
size:3}};



types[MASTERCARD]={
niceType:'MasterCard',
type:MASTERCARD,
prefixPattern:/^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
exactPattern:/^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
gaps:[4,8,12],
lengths:[16],
code:{
name:CVC,
size:3}};



types[AMERICAN_EXPRESS]={
niceType:'American Express',
type:AMERICAN_EXPRESS,
prefixPattern:/^(3|34|37)$/,
exactPattern:/^3[47]\d*$/,
isAmex:true,
gaps:[4,10],
lengths:[15],
code:{
name:CID,
size:4}};



types[DINERS_CLUB]={
niceType:'Diners Club',
type:DINERS_CLUB,
prefixPattern:/^(3|3[0689]|30[0-5])$/,
exactPattern:/^3(0[0-5]|[689])\d*$/,
gaps:[4,10],
lengths:[14],
code:{
name:CVV,
size:3}};



types[DISCOVER]={
niceType:'Discover',
type:DISCOVER,
prefixPattern:/^(6|60|601|6011|65|64|64[4-9])$/,
exactPattern:/^(6011|65|64[4-9])\d*$/,
gaps:[4,8,12],
lengths:[16,19],
code:{
name:CID,
size:3}};



types[JCB]={
niceType:'JCB',
type:JCB,
prefixPattern:/^(2|21|213|2131|1|18|180|1800|3|35)$/,
exactPattern:/^(2131|1800|35)\d*$/,
gaps:[4,8,12],
lengths:[16],
code:{
name:CVV,
size:3}};



types[UNIONPAY]={
niceType:'UnionPay',
type:UNIONPAY,
prefixPattern:/^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[02,06,07]|628(?!0|1)|629[1,2])|622018)$/,
exactPattern:/^(((620|(621(?!83|88|98|99))|622(?!06|018)|62[3-6]|627[02,06,07]|628(?!0|1)|629[1,2]))\d*|622018\d{12})$/,
gaps:[4,8,12],
lengths:[16,17,18,19],
code:{
name:CVN,
size:3}};



types[MAESTRO]={
niceType:'Maestro',
type:MAESTRO,
prefixPattern:/^(5|5[06-9]|6\d*)$/,
exactPattern:/^5[06-9]\d*$/,
gaps:[4,8,12],
lengths:[12,13,14,15,16,17,18,19],
code:{
name:CVC,
size:3}};



function creditCardType(cardNumber){
var type,value,i;
var prefixResults=[];
var exactResults=[];

if(!(typeof cardNumber==='string'||cardNumber instanceof String)){
return[];
}

for(i=0;i<testOrder.length;i++){
type=testOrder[i];
value=types[type];

if(cardNumber.length===0){
prefixResults.push(clone(value));
continue;
}

if(value.exactPattern.test(cardNumber)){
exactResults.push(clone(value));
}else if(value.prefixPattern.test(cardNumber)){
prefixResults.push(clone(value));
}
}

return exactResults.length?exactResults:prefixResults;
}

creditCardType.getTypeInfo=function(type){
return clone(types[type]);
};

creditCardType.types={
VISA:VISA,
MASTERCARD:MASTERCARD,
AMERICAN_EXPRESS:AMERICAN_EXPRESS,
DINERS_CLUB:DINERS_CLUB,
DISCOVER:DISCOVER,
JCB:JCB,
UNIONPAY:UNIONPAY,
MAESTRO:MAESTRO};


module.exports=creditCardType;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError=__webpack_require__(2);
var errors=__webpack_require__(17);
var whitelist=__webpack_require__(16).whitelistedAttributes;

function attributeValidationError(attribute,value){
var err;

if(!whitelist.hasOwnProperty(attribute)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
code:errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
message:'The "'+attribute+'" attribute is not supported in Hosted Fields.'});

}else if(value!=null&&!_isValid(attribute,value)){
err=new BraintreeError({
type:errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
code:errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
message:'Value "'+value+'" is not allowed for "'+attribute+'" attribute.'});

}

return err;
}

function _isValid(attribute,value){
if(whitelist[attribute]==='string'){
return typeof value==='string'||typeof value==='number';
}else if(whitelist[attribute]==='boolean'){
return String(value)==='true'||String(value)==='false';
}

return false;
}

module.exports=attributeValidationError;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var device=__webpack_require__(96);

module.exports=function(){

return!device.isSamsungBrowser();
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var UA=global.navigator&&global.navigator.userAgent;

var isAndroid=__webpack_require__(97);
var isChrome=__webpack_require__(98);
var isIos=__webpack_require__(19);
var isIE9=__webpack_require__(18);



var KITKAT_WEBVIEW_REGEX=/Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;

function _isOldSamsungBrowserOrSamsungWebview(ua){
return!isChrome(ua)&&ua.indexOf('Samsung')>-1;
}

function isKitKatWebview(uaArg){
var ua=uaArg||UA;

return isAndroid(ua)&&KITKAT_WEBVIEW_REGEX.test(ua);
}

function isAndroidChrome(uaArg){
var ua=uaArg||UA;

return isAndroid(ua)&&isChrome(ua);
}

function isSamsungBrowser(ua){
ua=ua||UA;
return /SamsungBrowser/.test(ua)||_isOldSamsungBrowserOrSamsungWebview(ua);
}

module.exports={
isIE9:isIE9,
isAndroidChrome:isAndroidChrome,
isIos:isIos,
isKitKatWebview:isKitKatWebview,
isSamsungBrowser:isSamsungBrowser};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports=function isAndroid(ua){
ua=ua||global.navigator.userAgent;
return /Android/.test(ua);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isEdge=__webpack_require__(99);
var isSamsung=__webpack_require__(100);

module.exports=function isChrome(ua){
ua=ua||navigator.userAgent;
return(ua.indexOf('Chrome')!==-1||ua.indexOf('CriOS')!==-1)&&!isEdge(ua)&&!isSamsung(ua);
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function isEdge(ua){
ua=ua||navigator.userAgent;
return ua.indexOf('Edge/')!==-1;
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports=function isSamsungBrowser(ua){
ua=ua||global.navigator.userAgent;
return /SamsungBrowser/i.test(ua);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIe9=__webpack_require__(18);

module.exports={
isIe9:isIe9};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs=__webpack_require__(1).paymentOptionIDs;
var BasePayPalView=__webpack_require__(36);

function PayPalView(){
BasePayPalView.apply(this,arguments);

this._initialize(false);
}

PayPalView.prototype=Object.create(BasePayPalView.prototype);
PayPalView.prototype.constructor=PayPalView;
PayPalView.ID=PayPalView.prototype.ID=paymentOptionIDs.paypal;

module.exports=PayPalView;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";






var BraintreeError=__webpack_require__(2);
var analytics=__webpack_require__(20);
var errors=__webpack_require__(37);
var Promise=__webpack_require__(5);
var wrapPromise=__webpack_require__(3);
var PayPalCheckout=__webpack_require__(104);
var sharedErrors=__webpack_require__(10);
var VERSION="3.22.0";

















































function create(options){
var config,clientVersion;

if(options.client==null){
return Promise.reject(new BraintreeError({
type:sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
code:sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
message:'options.client is required when instantiating PayPal Checkout.'}));

}

config=options.client.getConfiguration();
clientVersion=options.client.getVersion();

if(clientVersion!==VERSION){
return Promise.reject(new BraintreeError({
type:sharedErrors.INCOMPATIBLE_VERSIONS.type,
code:sharedErrors.INCOMPATIBLE_VERSIONS.code,
message:'Client (version '+clientVersion+') and PayPal Checkout (version '+VERSION+') components must be from the same SDK version.'}));

}

if(!config.gatewayConfiguration.paypalEnabled){
return Promise.reject(new BraintreeError(errors.PAYPAL_NOT_ENABLED));
}

if(!config.gatewayConfiguration.paypal.clientId){
return Promise.reject(new BraintreeError(errors.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED));
}

analytics.sendEvent(options.client,'paypal-checkout.initialized');

return Promise.resolve(new PayPalCheckout(options));
}














function isSupported(){
return true;
}

module.exports={
create:wrapPromise(create),
isSupported:isSupported,




VERSION:VERSION};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics=__webpack_require__(20);
var Promise=__webpack_require__(5);
var wrapPromise=__webpack_require__(3);
var BraintreeError=__webpack_require__(2);
var convertToBraintreeError=__webpack_require__(28);
var errors=__webpack_require__(37);
var constants=__webpack_require__(105);





















































function PayPalCheckout(options){
this._client=options.client;
}













































































PayPalCheckout.prototype.createPayment=function(options){
var endpoint;

if(!options||!constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)){
return Promise.reject(new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED));
}

endpoint='paypal_hermes/'+constants.FLOW_ENDPOINTS[options.flow];

analytics.sendEvent(this._client,'paypal-checkout.createPayment');
if(options.offerCredit===true){
analytics.sendEvent(this._client,'paypal-checkout.credit.offered');
}

return this._client.request({
endpoint:endpoint,
method:'post',
data:this._formatPaymentResourceData(options)}).
then(function(response){
var flowToken;

if(options.flow==='checkout'){
flowToken=response.paymentResource.paymentToken;
}else{
flowToken=response.agreementSetup.tokenId;
}

return flowToken;
}).catch(function(err){
var status=err.details&&err.details.httpStatus;

if(status===422){
return Promise.reject(new BraintreeError({
type:errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
code:errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
message:errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
details:{
originalError:err}}));


}

return Promise.reject(convertToBraintreeError(err,{
type:errors.PAYPAL_FLOW_FAILED.type,
code:errors.PAYPAL_FLOW_FAILED.code,
message:errors.PAYPAL_FLOW_FAILED.message}));

});
};

























PayPalCheckout.prototype.tokenizePayment=function(tokenizeOptions){
var self=this;
var payload;
var client=this._client;
var options={
flow:tokenizeOptions.billingToken?'vault':'checkout',
intent:tokenizeOptions.intent};

var params={

ecToken:tokenizeOptions.paymentToken,
billingToken:tokenizeOptions.billingToken,
payerId:tokenizeOptions.payerID,
paymentId:tokenizeOptions.paymentID};


analytics.sendEvent(client,'paypal-checkout.tokenization.started');

return client.request({
endpoint:'payment_methods/paypal_accounts',
method:'post',
data:self._formatTokenizeData(options,params)}).
then(function(response){
payload=self._formatTokenizePayload(response);

analytics.sendEvent(client,'paypal-checkout.tokenization.success');
if(payload.creditFinancingOffered){
analytics.sendEvent(client,'paypal-checkout.credit.accepted');
}

return payload;
}).catch(function(err){
analytics.sendEvent(client,'paypal-checkout.tokenization.failed');

return Promise.reject(convertToBraintreeError(err,{
type:errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
code:errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
message:errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message}));

});
};

PayPalCheckout.prototype._formatPaymentResourceData=function(options){
var key;
var gatewayConfiguration=this._client.getConfiguration().gatewayConfiguration;
var paymentResource={


returnUrl:'x',
cancelUrl:'x',
offerPaypalCredit:options.offerCredit===true,
experienceProfile:{
brandName:options.displayName||gatewayConfiguration.paypal.displayName,
localeCode:options.locale,
noShipping:(!options.enableShippingAddress).toString(),
addressOverride:options.shippingAddressEditable===false,
landingPageType:options.landingPageType}};



if(options.flow==='checkout'){
paymentResource.amount=options.amount;
paymentResource.currencyIsoCode=options.currency;

if(options.hasOwnProperty('intent')){
paymentResource.intent=options.intent;
}

for(key in options.shippingAddressOverride){
if(options.shippingAddressOverride.hasOwnProperty(key)){
paymentResource[key]=options.shippingAddressOverride[key];
}
}
}else{
paymentResource.shippingAddress=options.shippingAddressOverride;

if(options.billingAgreementDescription){
paymentResource.description=options.billingAgreementDescription;
}
}

return paymentResource;
};

PayPalCheckout.prototype._formatTokenizeData=function(options,params){
var clientConfiguration=this._client.getConfiguration();
var gatewayConfiguration=clientConfiguration.gatewayConfiguration;
var isTokenizationKey=clientConfiguration.authorizationType==='TOKENIZATION_KEY';
var data={
paypalAccount:{
correlationId:params.billingToken||params.ecToken,
options:{
validate:options.flow==='vault'&&!isTokenizationKey}}};




if(params.billingToken){
data.paypalAccount.billingAgreementToken=params.billingToken;
}else{
data.paypalAccount.paymentToken=params.paymentId;
data.paypalAccount.payerId=params.payerId;
data.paypalAccount.unilateral=gatewayConfiguration.paypal.unvettedMerchant;

if(options.intent){
data.paypalAccount.intent=options.intent;
}
}

return data;
};

PayPalCheckout.prototype._formatTokenizePayload=function(response){
var payload;
var account={};

if(response.paypalAccounts){
account=response.paypalAccounts[0];
}

payload={
nonce:account.nonce,
details:{},
type:account.type};


if(account.details&&account.details.payerInfo){
payload.details=account.details.payerInfo;
}

if(account.details&&account.details.creditFinancingOffered){
payload.creditFinancingOffered=account.details.creditFinancingOffered;
}

return payload;
};

module.exports=wrapPromise.wrapPrototype(PayPalCheckout);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
LANDING_FRAME_NAME:'braintreepaypallanding',
FLOW_ENDPOINTS:{
checkout:'create_payment_resource',
vault:'setup_billing_agreement'}};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs=__webpack_require__(1).paymentOptionIDs;
var BasePayPalView=__webpack_require__(36);

function PayPalCreditView(){
BasePayPalView.apply(this,arguments);

this._initialize(true);
}

PayPalCreditView.prototype=Object.create(BasePayPalView.prototype);
PayPalCreditView.prototype.constructor=PayPalCreditView;
PayPalCreditView.ID=PayPalCreditView.prototype.ID=paymentOptionIDs.paypalCredit;

module.exports=PayPalCreditView;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseView=__webpack_require__(6);
var classlist=__webpack_require__(12);
var constants=__webpack_require__(1);

var addSelectionEventHandler=__webpack_require__(21);

var paymentMethodHTML="<div class=\"braintree-method__logo\">\n  <svg width=\"40\" height=\"24\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-method__label\">@TITLE<br><div class=\"braintree-method__label--small\">@SUBTITLE</div></div>\n\n<div class=\"braintree-method__check-container\">\n  <div class=\"braintree-method__check\">\n    <svg height=\"100%\" width=\"100%\">\n      <use xlink:href=\"#iconCheck\"></use>\n    </svg>\n  </div>\n</div>\n";

function PaymentMethodView(){
BaseView.apply(this,arguments);

this._initialize();
}

PaymentMethodView.prototype=Object.create(BaseView.prototype);
PaymentMethodView.prototype.constructor=PaymentMethodView;

PaymentMethodView.prototype._initialize=function(){
var endingInText;
var html=paymentMethodHTML;
var paymentMethodCardTypes=constants.paymentMethodCardTypes;
var paymentMethodTypes=constants.paymentMethodTypes;

this.element=document.createElement('div');
this.element.className='braintree-method';
this.element.setAttribute('tabindex','0');

addSelectionEventHandler(this.element,function(){
this.model.changeActivePaymentMethod(this.paymentMethod);
}.bind(this));

switch(this.paymentMethod.type){
case paymentMethodTypes.card:
endingInText=this.strings.endingIn.replace('{{lastTwoCardDigits}}',this.paymentMethod.details.lastTwo);
html=html.replace(/@ICON/g,'icon-'+paymentMethodCardTypes[this.paymentMethod.details.cardType]).
replace(/@CLASSNAME/g,' braintree-icon--bordered').
replace(/@TITLE/g,endingInText).
replace(/@SUBTITLE/g,this.strings[this.paymentMethod.details.cardType]);
break;
case paymentMethodTypes.paypal:
html=html.replace(/@ICON/g,'logoPayPal').
replace(/@CLASSNAME/g,'').
replace(/@TITLE/g,this.paymentMethod.details.email).
replace(/@SUBTITLE/g,this.strings.PayPal);
break;
default:
break;}


this.element.innerHTML=html;
};

PaymentMethodView.prototype.setActive=function(isActive){

setTimeout(function(){
classlist.toggle(this.element,'braintree-method--active',isActive);
}.bind(this),0);
};

module.exports=PaymentMethodView;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports=function(){
var el=document.createElement('div');
var prop='flex-basis: 1px';
var prefixes=[
'-webkit-',
'-moz-',
'-ms-',
'-o-',
''];


prefixes.forEach(function(prefix){
el.style.cssText+=prefix+prop;
});

return Boolean(el.style.length);
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports={
da:__webpack_require__(110),
de:__webpack_require__(111),
en:__webpack_require__(112),
en_AU:__webpack_require__(113),
en_GB:__webpack_require__(114),
es:__webpack_require__(115),
fr_CA:__webpack_require__(116),
fr:__webpack_require__(117),
id:__webpack_require__(118),
it:__webpack_require__(119),
ja:__webpack_require__(120),
ko:__webpack_require__(121),
nl:__webpack_require__(122),
no:__webpack_require__(123),
pl:__webpack_require__(124),
pt_BR:__webpack_require__(125),
pt:__webpack_require__(126),
ru:__webpack_require__(127),
sv:__webpack_require__(128),
th:__webpack_require__(129),
zh:__webpack_require__(130),
zh_HK:__webpack_require__(131),
zh_TW:__webpack_require__(132)};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Skift betalingsmetode",
"choosePaymentMethod":"Vælg en betalingsmetode",
"savedPaymentMethods":"Gemte betalingsmetoder",
"payingWith":"Betaler med {{paymentSource}}",
"chooseAnotherWayToPay":"Vælg en anden betalingsmetode",
"chooseAWayToPay":"Vælg, hvordan du vil betale",
"otherWaysToPay":"Andre betalingsmetoder",
"fieldEmptyForCvv":"Du skal angive kontrolcifrene.",
"fieldEmptyForExpirationDate":"Du skal angive udløbsdatoen.",
"fieldEmptyForCardholderName":"Du skal angive kortindehaverens navn.",
"fieldEmptyForNumber":"Du skal angive et nummer.",
"fieldEmptyForPostalCode":"Du skal angive et postnummer.",
"fieldInvalidForCvv":"Sikkerhedskoden er ugyldig.",
"fieldInvalidForExpirationDate":"Udløbsdatoen er ugyldig.",
"fieldInvalidForNumber":"Kortnummeret er ugyldigt.",
"fieldInvalidForPostalCode":"Postnummeret er ugyldigt.",
"genericError":"Der opstod fejl i vores system.",
"hostedFieldsFailedTokenizationError":"Kontroller oplysningerne, og prøv igen.",
"hostedFieldTokenizationNetworkError":"Netværksfejl. Prøv igen.",
"hostedFieldsFieldsInvalidError":"Kontroller oplysningerne, og prøv igen.",
"paypalAccountTokenizationFailed":"PayPal-kontoen blev ikke tilføjet. Prøv igen.",
"paypalFlowFailedError":"Der kunne ikke oprettes forbindelse til PayPal. Prøv igen.",
"paypalTokenizationRequestActiveError":"PayPal-betalingen er i gang med at blive autoriseret.",
"unsupportedCardTypeError":"Korttypen understøttes ikke. Prøv et andet kort.",
"cardholderNameLabel":"Kortindehaverens navn",
"cardNumberLabel":"Kortnummer",
"cvvLabel":"Kontrolcifre",
"cvvThreeDigitLabelSubheading":"(3 cifre)",
"cvvFourDigitLabelSubheading":"(4 cifre)",
"cardholderNamePlaceholder":"Kortindehaverens navn",
"expirationDateLabel":"Udløbsdato",
"expirationDateLabelSubheading":"(MM/ÅÅ)",
"expirationDatePlaceholder":"MM/ÅÅ",
"postalCodeLabel":"Postnummer",
"payWithCard":"Betal med kort",
"endingIn":"Slutter med ••{{lastTwoCardDigits}}",
"Card":"Kort",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Zahlungsquelle ändern",
"choosePaymentMethod":"Zahlungsquelle auswählen",
"savedPaymentMethods":"Gespeicherte Zahlungsquellen",
"payingWith":"Zahlen mit {{paymentSource}}",
"chooseAnotherWayToPay":"Andere Zahlungsmethode wählen",
"chooseAWayToPay":"Wie möchten Sie bezahlen?",
"otherWaysToPay":"Andere Zahlungsmethoden",
"fieldEmptyForCvv":"Geben Sie die Kartenprüfnummer ein.",
"fieldEmptyForExpirationDate":"Geben Sie das Ablaufdatum ein.",
"fieldEmptyForCardholderName":"Geben Sie den Name des Karteninhabers ein.",
"fieldEmptyForNumber":"Geben Sie die Nummer ein.",
"fieldEmptyForPostalCode":"Geben Sie die PLZ ein.",
"fieldInvalidForCvv":"Die Kartenprüfnummer ist ungültig.",
"fieldInvalidForExpirationDate":"Das Ablaufdatum ist ungültig.",
"fieldInvalidForNumber":"Die Kreditkartennummer ist ungültig.",
"fieldInvalidForPostalCode":"Die PLZ ist ungültig.",
"genericError":"Bei uns ist ein Problem aufgetreten.",
"hostedFieldsFailedTokenizationError":"Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
"hostedFieldTokenizationNetworkError":"Netzwerkfehler. Versuchen Sie es erneut.",
"hostedFieldsFieldsInvalidError":"Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
"paypalAccountTokenizationFailed":"Beim Hinzufügen des PayPal-Kontos ist ein Problem aufgetreten. Versuchen Sie es erneut.",
"paypalFlowFailedError":"Beim Verbinden mit PayPal ist ein Problem aufgetreten. Versuchen Sie es erneut.",
"paypalTokenizationRequestActiveError":"Die PayPal-Zahlung wird bereits autorisiert.",
"unsupportedCardTypeError":"Dieser Kreditkartentyp wird nicht unterstützt. Versuchen Sie es mit einer anderen Karte.",
"cardholderNameLabel":"Name des Karteninhabers",
"cardNumberLabel":"Kartennummer",
"cvvLabel":"Prüfnr.",
"cvvThreeDigitLabelSubheading":"(3-stellig)",
"cvvFourDigitLabelSubheading":"(4-stellig)",
"cardholderNamePlaceholder":"Name des Karteninhabers",
"expirationDateLabel":"Gültig bis",
"expirationDateLabelSubheading":"(MM/JJ)",
"expirationDatePlaceholder":"MM/JJ",
"postalCodeLabel":"PLZ",
"payWithCard":"Mit Kreditkarte zahlen",
"endingIn":"Mit den Endziffern ••{{lastTwoCardDigits}}",
"Card":"Kreditkarte",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
payingWith:'Paying with {{paymentSource}}',
chooseAnotherWayToPay:'Choose another way to pay',
chooseAWayToPay:'Choose a way to pay',
otherWaysToPay:'Other ways to pay',

browserNotSupported:'Browser not supported.',
fieldEmptyForCvv:'Please fill out a CVV.',
fieldEmptyForExpirationDate:'Please fill out an expiration date.',
fieldEmptyForCardholderName:'Please fill out a cardholder name.',
fieldEmptyForNumber:'Please fill out a card number.',
fieldEmptyForPostalCode:'Please fill out a postal code.',
fieldInvalidForCvv:'This security code is not valid.',
fieldInvalidForExpirationDate:'This expiration date is not valid.',
fieldInvalidForNumber:'This card number is not valid.',
fieldInvalidForPostalCode:'This postal code is not valid.',
genericError:'Something went wrong on our end.',
hostedFieldsFailedTokenizationError:'Please check your information and try again.',
hostedFieldsTokenizationCvvVerificationFailedError:'Credit card verification failed. Please check your information and try again.',
hostedFieldsTokenizationNetworkErrorError:'Network error. Please try again.',
hostedFieldsFieldsInvalidError:'Please check your information and try again.',
paypalAccountTokenizationFailedError:'Something went wrong adding the PayPal account. Please try again.',
paypalFlowFailedError:'Something went wrong connecting to PayPal. Please try again.',
paypalTokenizationRequestActiveError:'PayPal payment authorization is already in progress.',
unsupportedCardTypeError:'This card type is not supported. Please try another card.',

cardholderNameLabel:'Cardholder Name',
cardNumberLabel:'Card Number',
cvvLabel:'CVV',
cvvThreeDigitLabelSubheading:'(3 digits)',
cvvFourDigitLabelSubheading:'(4 digits)',
expirationDateLabel:'Expiration Date',
expirationDateLabelSubheading:'(MM/YY)',
cardholderNamePlaceholder:'Cardholder Name',
expirationDatePlaceholder:'MM/YY',
postalCodeLabel:'Postal Code',
payWithCard:'Pay with card',

endingIn:'Ending in ••{{lastTwoCardDigits}}',
Card:'Card',
PayPal:'PayPal',
'PayPal Credit':'PayPal Credit',
'American Express':'American Express',
Discover:'Discover',
'Diners Club':'Diners Club',
MasterCard:'MasterCard',
Visa:'Visa',
JCB:'JCB',
Maestro:'Maestro',
UnionPay:'UnionPay'};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Change Payment Method",
"choosePaymentMethod":"Choose a payment method",
"savedPaymentMethods":"Saved payment methods",
"payingWith":"Paying with {{paymentSource}}",
"chooseAnotherWayToPay":"Choose another way to pay",
"chooseAWayToPay":"Choose a way to pay",
"otherWaysToPay":"Other ways to pay",
"fieldEmptyForCvv":"Please fill out a CVV.",
"fieldEmptyForExpirationDate":"Please fill out an expiry date.",
"fieldEmptyForCardholderName":"Please fill out a cardholder name.",
"fieldEmptyForNumber":"Please fill out a number.",
"fieldEmptyForPostalCode":"Please fill out a postcode.",
"fieldInvalidForCvv":"This security code is not valid.",
"fieldInvalidForExpirationDate":"This expiry date is not valid.",
"fieldInvalidForNumber":"This card number is not valid.",
"fieldInvalidForPostalCode":"This postcode is not valid.",
"genericError":"Something went wrong on our end.",
"hostedFieldsFailedTokenizationError":"Please check your information and try again.",
"hostedFieldTokenizationNetworkError":"Network error. Please try again.",
"hostedFieldsFieldsInvalidError":"Please check your information and try again.",
"paypalAccountTokenizationFailed":"Something went wrong while adding the PayPal account. Please try again.",
"paypalFlowFailedError":"Something went wrong while connecting to PayPal. Please try again.",
"paypalTokenizationRequestActiveError":"PayPal payment authorisation is already in progress.",
"unsupportedCardTypeError":"This card type is not supported. Please try another card.",
"cardholderNameLabel":"Cardholder Name",
"cardNumberLabel":"Card Number",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 digits)",
"cvvFourDigitLabelSubheading":"(4 digits)",
"cardholderNamePlaceholder":"Cardholder Name",
"expirationDateLabel":"Expiry date",
"expirationDateLabelSubheading":"(MM/YY)",
"expirationDatePlaceholder":"MM/YY",
"postalCodeLabel":"Postcode",
"payWithCard":"Pay with credit or debit card",
"endingIn":"Ending in ••{{lastTwoCardDigits}}",
"Card":"Card",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Change Funding Source",
"choosePaymentMethod":"Choose a funding source",
"savedPaymentMethods":"Saved payment methods",
"payingWith":"Paying with {{paymentSource}}",
"chooseAnotherWayToPay":"Choose another way to pay",
"chooseAWayToPay":"Choose a way to pay",
"otherWaysToPay":"Other ways to pay",
"fieldEmptyForCvv":"Please fill in a CSC.",
"fieldEmptyForExpirationDate":"Please fill in an expiry date.",
"fieldEmptyForCardholderName":"Please fill in a cardholder name.",
"fieldEmptyForNumber":"Please fill in a number.",
"fieldEmptyForPostalCode":"Please fill in a postcode.",
"fieldInvalidForCvv":"This security code is not valid.",
"fieldInvalidForExpirationDate":"This expiry date is not valid.",
"fieldInvalidForNumber":"This card number is not valid.",
"fieldInvalidForPostalCode":"This postcode is not valid.",
"genericError":"Something went wrong on our end.",
"hostedFieldsFailedTokenizationError":"Please check your information and try again.",
"hostedFieldTokenizationNetworkError":"Network error. Please try again.",
"hostedFieldsFieldsInvalidError":"Please check your information and try again.",
"paypalAccountTokenizationFailed":"Something went wrong while adding the PayPal account. Please try again.",
"paypalFlowFailedError":"Something went wrong while connecting to PayPal. Please try again.",
"paypalTokenizationRequestActiveError":"PayPal payment authorisation is already in progress.",
"unsupportedCardTypeError":"This card type is not supported. Please try another card.",
"cardholderNameLabel":"Cardholder Name",
"cardNumberLabel":"Card Number",
"cvvLabel":"CSC",
"cvvThreeDigitLabelSubheading":"(3 digits)",
"cvvFourDigitLabelSubheading":"(4 digits)",
"cardholderNamePlaceholder":"Cardholder Name",
"expirationDateLabel":"Expiry Date",
"expirationDateLabelSubheading":"(MM/YY)",
"expirationDatePlaceholder":"MM/YY",
"postalCodeLabel":"Postcode",
"payWithCard":"Pay with card",
"endingIn":"Ending in ••{{lastTwoCardDigits}}",
"Card":"Card",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Cambiar forma de pago",
"choosePaymentMethod":"Seleccionar forma de pago",
"savedPaymentMethods":"Formas de pago guardadas",
"payingWith":"Pago con {{paymentSource}}",
"chooseAnotherWayToPay":"Selecciona otra forma de pago.",
"chooseAWayToPay":"Selecciona una forma de pago.",
"otherWaysToPay":"Otras formas de pago",
"fieldEmptyForCvv":"Escribe el código CVV.",
"fieldEmptyForExpirationDate":"Escribe la fecha de vencimiento.",
"fieldEmptyForCardholderName":"Escribe el nombre de un titular de la tarjeta.",
"fieldEmptyForNumber":"Escribe un número.",
"fieldEmptyForPostalCode":"Escribe el código postal.",
"fieldInvalidForCvv":"Este código de seguridad no es válido.",
"fieldInvalidForExpirationDate":"Esta fecha de vencimiento no es válida.",
"fieldInvalidForNumber":"Este número de tarjeta no es válido.",
"fieldInvalidForPostalCode":"Este código postal no es válido.",
"genericError":"Hemos tenido algún problema.",
"hostedFieldsFailedTokenizationError":"Comprueba la información e inténtalo de nuevo.",
"hostedFieldTokenizationNetworkError":"Error de red. Inténtalo de nuevo.",
"hostedFieldsFieldsInvalidError":"Comprueba la información e inténtalo de nuevo.",
"paypalAccountTokenizationFailed":"Se ha producido un error al vincular la cuenta PayPal. Inténtalo de nuevo.",
"paypalFlowFailedError":"Se ha producido un error al conectarse a PayPal. Inténtalo de nuevo.",
"paypalTokenizationRequestActiveError":"Ya hay una autorización de pago de PayPal en curso.",
"unsupportedCardTypeError":"No se admite este tipo de tarjeta. Prueba con otra tarjeta.",
"cardholderNameLabel":"Nombre del titular de la tarjeta",
"cardNumberLabel":"Número de tarjeta",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 dígitos)",
"cvvFourDigitLabelSubheading":"(4 dígitos)",
"cardholderNamePlaceholder":"Nombre del titular de la tarjeta",
"expirationDateLabel":"Fecha de vencimiento",
"expirationDateLabelSubheading":"(MM/AA)",
"expirationDatePlaceholder":"MM/AA",
"postalCodeLabel":"Código postal",
"payWithCard":"Pagar con tarjeta",
"endingIn":"Terminada en •• {{lastTwoCardDigits}}",
"Card":"Tarjeta",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Modifier le mode de paiement ",
"choosePaymentMethod":"Choisir un mode de paiement",
"savedPaymentMethods":"Modes de paiement enregistrés",
"payingWith":"Payer avec {{paymentSource}}",
"chooseAnotherWayToPay":"Choisir un autre mode de paiement",
"chooseAWayToPay":"Choisir le mode de paiement",
"otherWaysToPay":"Autres modes de paiement",
"fieldEmptyForCvv":"Veuillez saisir un cryptogramme visuel.",
"fieldEmptyForExpirationDate":"Veuillez saisir une date d'expiration.",
"fieldEmptyForCardholderName":"Veuillez saisir un nom de titulaire de la carte.",
"fieldEmptyForNumber":"Veuillez saisir un numéro.",
"fieldEmptyForPostalCode":"Veuillez saisir un code postal.",
"fieldInvalidForCvv":"Ce cryptogramme visuel n'est pas valide.",
"fieldInvalidForExpirationDate":"Cette date d'expiration n'est pas valide.",
"fieldInvalidForNumber":"Ce numéro de carte n'est pas valide.",
"fieldInvalidForPostalCode":"Ce code postal n'est pas valide.",
"genericError":"Une erreur s'est produite de notre côté.",
"hostedFieldsFailedTokenizationError":"Vérifiez vos informations, puis réessayez.",
"hostedFieldTokenizationNetworkError":"Erreur réseau. Veuillez réessayer.",
"hostedFieldsFieldsInvalidError":"Vérifiez vos informations, puis réessayez.",
"paypalAccountTokenizationFailed":"Une erreur s'est produite au cours de l'enregistrement du compte PayPal. Veuillez réessayer.",
"paypalFlowFailedError":"Une erreur s'est produite au cours de la connexion à PayPal. Veuillez réessayer.",
"paypalTokenizationRequestActiveError":"L'autorisation de paiement PayPal est déjà en cours.",
"unsupportedCardTypeError":"Ce type de carte n'est pas pris en charge. Veuillez essayer une autre carte.",
"cardholderNameLabel":"Nom du titulaire de la carte",
"cardNumberLabel":"Numéro de carte ",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 chiffres)",
"cvvFourDigitLabelSubheading":"(4 chiffres)",
"cardholderNamePlaceholder":"Nom du titulaire de la carte",
"expirationDateLabel":"Date d\\'expiration ",
"expirationDateLabelSubheading":"(MM/AA)",
"expirationDatePlaceholder":"MM/AA",
"postalCodeLabel":"Code postal",
"payWithCard":"Payer par carte",
"endingIn":"Se terminant par ••{{lastTwoCardDigits}}",
"Card":"Carte",
"PayPal":"PayPal",
"PayPal Credit":"Crédit PayPal",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Modifier le mode de paiement",
"choosePaymentMethod":"Choisir un mode de paiement",
"savedPaymentMethods":"Modes de paiement enregistrés",
"payingWith":"Payer avec {{paymentSource}}",
"chooseAnotherWayToPay":"Choisissez une autre façon de payer.",
"chooseAWayToPay":"Choisissez comment payer.",
"otherWaysToPay":"Autres façons de payer",
"fieldEmptyForCvv":"Entrez un cryptogramme visuel.",
"fieldEmptyForExpirationDate":"Entrez une date d'expiration.",
"fieldEmptyForCardholderName":"Entrez un nom du titulaire de la carte.",
"fieldEmptyForNumber":"Entrez un numéro.",
"fieldEmptyForPostalCode":"Entrez un code postal.",
"fieldInvalidForCvv":"Ce cryptogramme visuel n'est pas valide.",
"fieldInvalidForExpirationDate":"Cette date d'expiration n'est pas valide.",
"fieldInvalidForNumber":"Ce numéro de carte n'est pas valide.",
"fieldInvalidForPostalCode":"Ce code postal n'est pas valide.",
"genericError":"Une erreur est survenue.",
"hostedFieldsFailedTokenizationError":"Vérifiez vos informations et réessayez.",
"hostedFieldTokenizationNetworkError":"Erreur réseau. Réessayez.",
"hostedFieldsFieldsInvalidError":"Vérifiez vos informations et réessayez.",
"paypalAccountTokenizationFailed":"Une erreur est survenue lors de l'ajout du compte PayPal. Réessayez.",
"paypalFlowFailedError":"Une erreur est survenue lors de la connexion à PayPal. Réessayez.",
"paypalTokenizationRequestActiveError":"L'autorisation de paiement PayPal est déjà en cours.",
"unsupportedCardTypeError":"Ce type de carte n'est pas pris en charge. Essayez une autre carte.",
"cardholderNameLabel":"Nom du titulaire de la carte",
"cardNumberLabel":"Nº de carte",
"cvvLabel":"Cryptogramme visuel",
"cvvThreeDigitLabelSubheading":"(3 chiffres)",
"cvvFourDigitLabelSubheading":"(4 chiffres)",
"cardholderNamePlaceholder":"Nom du titulaire de la carte",
"expirationDateLabel":"Date d'expiration",
"expirationDateLabelSubheading":"(MM/AA)",
"expirationDatePlaceholder":"MM/AA",
"postalCodeLabel":"Code postal",
"payWithCard":"Payer par carte",
"endingIn":"Se terminant par ••{{lastTwoCardDigits}}",
"Card":"Carte",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Ubah Metode Pembayaran",
"choosePaymentMethod":"Pilih metode pembayaran",
"savedPaymentMethods":"Metode Pembayaran Tersimpan",
"payingWith":"Membayar dengan {{paymentSource}}",
"chooseAnotherWayToPay":"Pilih metode pembayaran lain",
"chooseAWayToPay":"Pilih metode pembayaran",
"otherWaysToPay":"Metode pembayaran lain",
"fieldEmptyForCvv":"Masukkan CVV.",
"fieldEmptyForExpirationDate":"Masukkan tanggal akhir berlaku.",
"fieldEmptyForCardholderName":"Masukkan nama pemegang kartu.",
"fieldEmptyForNumber":"Masukkan nomor.",
"fieldEmptyForPostalCode":"Masukkan kode pos.",
"fieldInvalidForCvv":"Kode keamanan ini tidak valid.",
"fieldInvalidForExpirationDate":"Tanggal akhir berlaku ini tidak valid.",
"fieldInvalidForNumber":"Nomor kartu ini tidak valid.",
"fieldInvalidForPostalCode":"Kode pos ini tidak valid.",
"genericError":"Terjadi kesalahan pada sistem kami. ",
"hostedFieldsFailedTokenizationError":"Periksa informasi Anda dan coba lagi.",
"hostedFieldTokenizationNetworkError":"Masalah jaringan. Coba lagi.",
"hostedFieldsFieldsInvalidError":"Periksa informasi Anda dan coba lagi.",
"paypalAccountTokenizationFailed":"Terjadi kesalahan saat menambahkan rekening PayPal. Coba lagi.",
"paypalFlowFailedError":"Terjadi kesalahan saat menyambung ke PayPal. Coba lagi.",
"paypalTokenizationRequestActiveError":"Otorisasi pembayaran PayPal sedang diproses.",
"unsupportedCardTypeError":"Jenis kartu ini tidak didukung. Coba kartu lainnya.",
"cardholderNameLabel":"Nama Pemegang Kartu",
"cardNumberLabel":"Nomor Kartu",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 angka)",
"cvvFourDigitLabelSubheading":"(4 angka)",
"cardholderNamePlaceholder":"Nama Pemegang Kartu",
"expirationDateLabel":"Tanggal Kedaluwarsa",
"expirationDateLabelSubheading":"(BB/TT)",
"expirationDatePlaceholder":"BB/TT",
"postalCodeLabel":"Kode Pos",
"payWithCard":"Bayar dengan kartu",
"endingIn":"Berakhiran ••{{lastTwoCardDigits}}",
"Card":"Kartu",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Modifica metodo di pagamento",
"choosePaymentMethod":"Scegli un metodo di pagamento",
"savedPaymentMethods":"Metodi di pagamento salvati",
"payingWith":"Pagamento con {{paymentSource}}",
"chooseAnotherWayToPay":"Scegli di pagare in un altro modo",
"chooseAWayToPay":"Scegli come pagare",
"otherWaysToPay":"Altri modi di pagare",
"fieldEmptyForCvv":"Immetti il codice di sicurezza (CVV).",
"fieldEmptyForExpirationDate":"Immetti la data di scadenza.",
"fieldEmptyForCardholderName":"Immetti il nome del titolare della carta.",
"fieldEmptyForNumber":"Immetti il numero di carta.",
"fieldEmptyForPostalCode":"Immetti il CAP.",
"fieldInvalidForCvv":"Il codice di sicurezza non è valido.",
"fieldInvalidForExpirationDate":"La data di scadenza non è valida.",
"fieldInvalidForNumber":"Il numero di carta non è valido.",
"fieldInvalidForPostalCode":"Il CAP non è valido.",
"genericError":"Si è verificato un errore nei nostri sistemi.",
"hostedFieldsFailedTokenizationError":"Controlla e riprova.",
"hostedFieldTokenizationNetworkError":"Errore di rete. Riprova.",
"hostedFieldsFieldsInvalidError":"Controlla e riprova.",
"paypalAccountTokenizationFailed":"Si è verificato un errore collegando il conto PayPal. Riprova.",
"paypalFlowFailedError":"Si è verificato un errore di connessione a PayPal. Riprova.",
"paypalTokenizationRequestActiveError":"L'autorizzazione di pagamento PayPal è già in corso.",
"unsupportedCardTypeError":"Questo tipo di carta non è supportato. Prova con un'altra carta.",
"cardholderNameLabel":"Titolare della carta",
"cardNumberLabel":"Numero di carta",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 cifre)",
"cvvFourDigitLabelSubheading":"(4 cifre)",
"cardholderNamePlaceholder":"Titolare della carta",
"expirationDateLabel":"Data di scadenza",
"expirationDateLabelSubheading":"(MM/AA)",
"expirationDatePlaceholder":"MM/AA",
"postalCodeLabel":"CAP",
"payWithCard":"Paga con una carta",
"endingIn":"Le cui ultime cifre sono ••{{lastTwoCardDigits}}",
"Card":"Carta",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"支払方法を変更する",
"choosePaymentMethod":"支払方法を選択する",
"savedPaymentMethods":"保存済みの支払方法",
"payingWith":"{{paymentSource}}で支払う",
"chooseAnotherWayToPay":"別の支払方法を選択する",
"chooseAWayToPay":"支払方法を選択する",
"otherWaysToPay":"その他の支払方法",
"fieldEmptyForCvv":"カード確認コードを入力してください。",
"fieldEmptyForExpirationDate":"有効期限を入力してください。",
"fieldEmptyForCardholderName":"カード保有者の名前を入力してください。",
"fieldEmptyForNumber":"番号を入力してください。",
"fieldEmptyForPostalCode":"郵便番号を入力してください。",
"fieldInvalidForCvv":"このセキュリティコードは無効です。",
"fieldInvalidForExpirationDate":"この有効期限は無効です。",
"fieldInvalidForNumber":"このカード番号は無効です。",
"fieldInvalidForPostalCode":"この郵便番号は無効です。",
"genericError":"弊社側で問題が発生しました。",
"hostedFieldsFailedTokenizationError":"情報を確認してもう一度お試しください。",
"hostedFieldTokenizationNetworkError":"ネットワークエラーです。もう一度お試しください。",
"hostedFieldsFieldsInvalidError":"情報を確認してもう一度お試しください。",
"paypalAccountTokenizationFailed":"PayPalアカウントの追加で問題が発生しました。もう一度お試しください。",
"paypalFlowFailedError":"PayPalへの接続に問題が発生しました。もう一度お試しください。",
"paypalTokenizationRequestActiveError":"PayPal支払いの承認はすでに処理中です。",
"unsupportedCardTypeError":"このカードタイプはサポートされていません。別のカードをご使用ください。",
"cardholderNameLabel":"カード保有者の名前",
"cardNumberLabel":"カード番号",
"cvvLabel":"カード確認コード",
"cvvThreeDigitLabelSubheading":"(3桁)",
"cvvFourDigitLabelSubheading":"(4桁)",
"cardholderNamePlaceholder":"カード保有者の名前",
"expirationDateLabel":"有効期限",
"expirationDateLabelSubheading":"(MM/YY)",
"expirationDatePlaceholder":"MM/YY",
"postalCodeLabel":"郵便番号",
"payWithCard":"カードで支払う",
"endingIn":"x-{{lastTwoCardDigits}}",
"Card":"カード",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"銀聯(UnionPay)"};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"결제수단 변경",
"choosePaymentMethod":"결제수단 선택",
"savedPaymentMethods":"저장된 결제수단",
"payingWith":"{{paymentSource}}(으)로 결제",
"chooseAnotherWayToPay":"다른 결제수단 선택",
"chooseAWayToPay":"결제수단 선택",
"otherWaysToPay":"다른 방법으로 결제",
"fieldEmptyForCvv":"CVV를 입력하세요.",
"fieldEmptyForExpirationDate":"만료일을 입력하세요.",
"fieldEmptyForCardholderName":"카드 소유자 이름을 입력하세요.",
"fieldEmptyForNumber":"번호를 입력하세요.",
"fieldEmptyForPostalCode":"우편번호를 입력하세요.",
"fieldInvalidForCvv":"이 보안 코드가 올바르지 않습니다.",
"fieldInvalidForExpirationDate":"이 만료일이 올바르지 않습니다.",
"fieldInvalidForNumber":"이 카드 번호가 올바르지 않습니다.",
"fieldInvalidForPostalCode":"이 우편번호가 올바르지 않습니다.",
"genericError":"저희 쪽에 문제가 발생했습니다.",
"hostedFieldsFailedTokenizationError":"정보를 확인하고 다시 시도해 주세요.",
"hostedFieldTokenizationNetworkError":"네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
"hostedFieldsFieldsInvalidError":"정보를 확인하고 다시 시도해 주세요.",
"paypalAccountTokenizationFailed":"PayPal 계정을 추가하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
"paypalFlowFailedError":"PayPal 계정을 연결하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
"paypalTokenizationRequestActiveError":"PayPal 결제 승인이 이미 진행 중입니다.",
"unsupportedCardTypeError":"이 카드 형식은 지원되지 않습니다. 다른 카드로 시도해 주세요.",
"cardholderNameLabel":"카드 소유자 이름",
"cardNumberLabel":"카드 번호",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3자리)",
"cvvFourDigitLabelSubheading":"(4자리)",
"cardholderNamePlaceholder":"카드 소유자 이름",
"expirationDateLabel":"만료일",
"expirationDateLabelSubheading":"(MM/YY)",
"expirationDatePlaceholder":"MM/YY",
"postalCodeLabel":"우편번호",
"payWithCard":"카드로 결제",
"endingIn":"끝 번호: ••{{lastTwoCardDigits}}",
"Card":"카드",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Betaalmethode wijzigen",
"choosePaymentMethod":"Kies een betaalmethode",
"savedPaymentMethods":"Opgeslagen betaalmethoden",
"payingWith":"Betalen met {{paymentSource}}",
"chooseAnotherWayToPay":"Kies een andere betaalmethode",
"chooseAWayToPay":"Kies een betaalwijze",
"otherWaysToPay":"Andere manieren om te betalen",
"fieldEmptyForCvv":"Vul een CSC in.",
"fieldEmptyForExpirationDate":"Vul een vervaldatum in.",
"fieldEmptyForCardholderName":"Vul een naam voor de kaarthouder in.",
"fieldEmptyForNumber":"Vul een nummer in.",
"fieldEmptyForPostalCode":"Vul een postcode in.",
"fieldInvalidForCvv":"Deze CSC is ongeldig.",
"fieldInvalidForExpirationDate":"Deze vervaldatum is ongeldig.",
"fieldInvalidForNumber":"Dit creditcardnummer is ongeldig.",
"fieldInvalidForPostalCode":"Deze postcode is ongeldig.",
"genericError":"Er is iets fout gegaan.",
"hostedFieldsFailedTokenizationError":"Controleer uw gegevens en probeer het opnieuw.",
"hostedFieldTokenizationNetworkError":"Netwerkfout. Probeer het opnieuw.",
"hostedFieldsFieldsInvalidError":"Controleer uw gegevens en probeer het opnieuw.",
"paypalAccountTokenizationFailed":"Er is iets misgegaan bij het toevoegen van de PayPal-rekening. Probeer het opnieuw.",
"paypalFlowFailedError":"Er is iets misgegaan bij de verbinding met PayPal. Probeer het opnieuw.",
"paypalTokenizationRequestActiveError":"De autorisatie van de PayPal-betaling is al in behandeling.",
"unsupportedCardTypeError":"Dit type creditcard wordt niet ondersteund. Gebruik een andere creditcard.",
"cardholderNameLabel":"Naam kaarthouder",
"cardNumberLabel":"Creditcardnummer",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 cijfers)",
"cvvFourDigitLabelSubheading":"(4 cijfers)",
"cardholderNamePlaceholder":"Naam kaarthouder",
"expirationDateLabel":"Vervaldatum",
"expirationDateLabelSubheading":"(MM/JJ)",
"expirationDatePlaceholder":"MM/JJ",
"postalCodeLabel":"Postcode",
"payWithCard":"Betalen met creditcard",
"endingIn":"Eindigend op •• {{lastTwoCardDigits}}",
"Card":"Creditcard",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Endre betalingsmetode",
"choosePaymentMethod":"Velg en betalingsmetode",
"savedPaymentMethods":"Lagrede betalingsmetoder",
"payingWith":"Betaling med {{paymentSource}}",
"chooseAnotherWayToPay":"Velg en annen måte å betale på",
"chooseAWayToPay":"Velg betalingsmåte",
"otherWaysToPay":"Andre måter å betale på",
"fieldEmptyForCvv":"Oppgi en kortsikkerhetskode (CVV).",
"fieldEmptyForExpirationDate":"Oppgi en utløpsdato.",
"fieldEmptyForCardholderName":"Oppgi et navn for kortinnehaveren.",
"fieldEmptyForNumber":"Oppgi et nummer.",
"fieldEmptyForPostalCode":"Oppgi et postnummer.",
"fieldInvalidForCvv":"Denne sikkerhetskoden er ikke gyldig.",
"fieldInvalidForExpirationDate":"Denne utløpsdatoen er ikke gyldig.",
"fieldInvalidForNumber":"Dette kortnummeret er ikke gyldig.",
"fieldInvalidForPostalCode":"Dette postnummeret er ikke gyldig.",
"genericError":"Noe gikk galt hos oss.",
"hostedFieldsFailedTokenizationError":"Kontroller informasjonen og prøv på nytt.",
"hostedFieldTokenizationNetworkError":"Nettverksfeil. Prøv på nytt.",
"hostedFieldsFieldsInvalidError":"Kontroller informasjonen og prøv på nytt.",
"paypalAccountTokenizationFailed":"Noe gikk galt da PayPal-kontoen ble lagt til. Prøv på nytt.",
"paypalFlowFailedError":"Det oppsto et problem med tilkoblingen til PayPal. Prøv på nytt.",
"paypalTokenizationRequestActiveError":"Godkjenning av PayPal-betalingen pågår allerede",
"unsupportedCardTypeError":"Denne korttypen støttes ikke. Prøv med et annet kort.",
"cardholderNameLabel":"Kortinnehaverens navn",
"cardNumberLabel":"Kortnummer",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 siffer)",
"cvvFourDigitLabelSubheading":"(4 siffer)",
"cardholderNamePlaceholder":"Kortinnehaverens navn",
"expirationDateLabel":"Utløpsdato",
"expirationDateLabelSubheading":"(MM/ÅÅ)",
"expirationDatePlaceholder":"MM/ÅÅ",
"postalCodeLabel":"Postnummer",
"payWithCard":"Betal med kort",
"endingIn":"Som slutter på •• {{lastTwoCardDigits}}",
"Card":"Kort",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Zmień formę płatności",
"choosePaymentMethod":"Wybierz formę płatności",
"savedPaymentMethods":"Zapisane formy płatności",
"payingWith":"Forma płatności: {{paymentSource}}",
"chooseAnotherWayToPay":"Wybierz inną formę płatności",
"chooseAWayToPay":"Wybierz sposób płatności",
"otherWaysToPay":"Inne formy płatności",
"fieldEmptyForCvv":"Podaj kod bezpieczeństwa.",
"fieldEmptyForExpirationDate":"Podaj datę ważności.",
"fieldEmptyForCardholderName":"Podaj imię i nazwisko posiadacza karty.",
"fieldEmptyForNumber":"Podaj numer.",
"fieldEmptyForPostalCode":"Podaj kod pocztowy.",
"fieldInvalidForCvv":"Podany kod bezpieczeństwa jest nieprawidłowy.",
"fieldInvalidForExpirationDate":"Podana data ważności jest nieprawidłowa.",
"fieldInvalidForNumber":"Podany numer karty jest nieprawidłowy.",
"fieldInvalidForPostalCode":"Podany kod pocztowy jest nieprawidłowy.",
"genericError":"Wystąpił błąd po naszej stronie. ",
"hostedFieldsFailedTokenizationError":"Sprawdź swoje informacje i spróbuj ponownie.",
"hostedFieldTokenizationNetworkError":"Błąd sieci. Spróbuj ponownie.",
"hostedFieldsFieldsInvalidError":"Sprawdź swoje informacje i spróbuj ponownie.",
"paypalAccountTokenizationFailed":"Coś poszło nie tak podczas dodawania konta PayPal. Spróbuj ponownie.",
"paypalFlowFailedError":"Coś poszło nie tak podczas łączenia z systemem PayPal. Spróbuj ponownie.",
"paypalTokenizationRequestActiveError":"Autoryzacja płatności PayPal jest już w trakcie realizacji.",
"unsupportedCardTypeError":"Ten typ karty nie jest obsługiwany. Spróbuj użyć innej karty.",
"cardholderNameLabel":"Imię i nazwisko posiadacza karty",
"cardNumberLabel":"Numer karty",
"cvvLabel":"Kod CVC",
"cvvThreeDigitLabelSubheading":"(3 cyfry)",
"cvvFourDigitLabelSubheading":"(4 cyfry)",
"cardholderNamePlaceholder":"Imię i nazwisko posiadacza karty",
"expirationDateLabel":"Data ważności",
"expirationDateLabelSubheading":"(MM/RR)",
"expirationDatePlaceholder":"MM/RR",
"postalCodeLabel":"Kod pocztowy",
"payWithCard":"Zapłać kartą",
"endingIn":"O numerze zakończonym cyframi •• {{lastTwoCardDigits}}",
"Card":"Karta",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Alterar meio de pagamento",
"choosePaymentMethod":"Escolha um meio de pagamento",
"savedPaymentMethods":"Meios de pagamento salvos",
"payingWith":"Pagando com {{paymentSource}}",
"chooseAnotherWayToPay":"Escolher outro meio de pagamento",
"chooseAWayToPay":"Escolher um meio de pagamento",
"otherWaysToPay":"Outro meio de pagamento",
"fieldEmptyForCvv":"Informe o Código de Segurança.",
"fieldEmptyForExpirationDate":"Informe a data de vencimento.",
"fieldEmptyForCardholderName":"Informe o nome do titular do cartão.",
"fieldEmptyForNumber":"Informe um número.",
"fieldEmptyForPostalCode":"Informe um CEP.",
"fieldInvalidForCvv":"Este código de segurança não é válido.",
"fieldInvalidForExpirationDate":"Esta data de vencimento não é válida.",
"fieldInvalidForNumber":"O número do cartão não é válido.",
"fieldInvalidForPostalCode":"Este CEP não é válido.",
"genericError":"Ocorreu um erro.",
"hostedFieldsFailedTokenizationError":"Verifique as informações e tente novamente.",
"hostedFieldTokenizationNetworkError":"Erro de rede. Tente novamente.",
"hostedFieldsFieldsInvalidError":"Verifique as informações e tente novamente.",
"paypalAccountTokenizationFailed":"Ocorreu um erro ao adicionar a conta do PayPal. Tente novamente.",
"paypalFlowFailedError":"Ocorreu um erro de conexão com o PayPal. Tente novamente.",
"paypalTokenizationRequestActiveError":"A autorização de pagamento do PayPal já está em andamento.",
"unsupportedCardTypeError":"Este tipo de cartão não é aceito. Experimente outro cartão.",
"cardholderNameLabel":"Nome do titular do cartão",
"cardNumberLabel":"Número do cartão",
"cvvLabel":"Cód. Seg.",
"cvvThreeDigitLabelSubheading":"(3 dígitos)",
"cvvFourDigitLabelSubheading":"(4 dígitos)",
"cardholderNamePlaceholder":"Nome do titular do cartão",
"expirationDateLabel":"Data de vencimento",
"expirationDateLabelSubheading":"(MM/AA)",
"expirationDatePlaceholder":"MM/AA",
"postalCodeLabel":"CEP",
"payWithCard":"Pague com seu cartão",
"endingIn":"Com final ••{{lastTwoCardDigits}}",
"Card":"Cartão",
"PayPal":"PayPal",
"PayPal Credit":"Crédito do PayPal",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Alterar meio de pagamento",
"choosePaymentMethod":"Escolha um meio de pagamento",
"savedPaymentMethods":"Formas de pagamento guardadas",
"payingWith":"Pagar com {{paymentSource}}",
"chooseAnotherWayToPay":"Escolher outra forma de pagamento",
"chooseAWayToPay":"Escolha um meio de pagamento",
"otherWaysToPay":"Outras formas de pagamento",
"fieldEmptyForCvv":"Introduza o código CVV.",
"fieldEmptyForExpirationDate":"Introduza a data de validade.",
"fieldEmptyForCardholderName":"Introduza um nome do titular do cartão.",
"fieldEmptyForNumber":"Introduza um número.",
"fieldEmptyForPostalCode":"Introduza o código postal.",
"fieldInvalidForCvv":"Este código de segurança não é válido.",
"fieldInvalidForExpirationDate":"Esta data de validade não é correta.",
"fieldInvalidForNumber":"Este número de cartão não é válido.",
"fieldInvalidForPostalCode":"Este código postal não é válido.",
"genericError":"Tudo indica que ocorreu um problema.",
"hostedFieldsFailedTokenizationError":"Verifique os dados e tente novamente.",
"hostedFieldTokenizationNetworkError":"Erro de rede. Tente novamente.",
"hostedFieldsFieldsInvalidError":"Verifique os dados e tente novamente.",
"paypalAccountTokenizationFailed":"Ocorreu um erro ao associar a conta PayPal. Tente novamente.",
"paypalFlowFailedError":"Ocorreu um erro na ligação com PayPal. Tente novamente.",
"paypalTokenizationRequestActiveError":"Já há uma autorização de pagamento PayPal em curso.",
"unsupportedCardTypeError":"Este tipo de cartão não é suportado. Tente usar outro cartão.",
"cardholderNameLabel":"Nome do titular do cartão",
"cardNumberLabel":"Número do cartão",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 dígitos)",
"cvvFourDigitLabelSubheading":"(4 dígitos)",
"cardholderNamePlaceholder":"Nome do titular do cartão",
"expirationDateLabel":"Data de validade",
"expirationDateLabelSubheading":"(MM/AA)",
"expirationDatePlaceholder":"MM/AA",
"postalCodeLabel":"Código postal",
"payWithCard":"Pagar com cartão",
"endingIn":"Terminado em ••{{lastTwoCardDigits}}",
"Card":"Cartão",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Изменить способ оплаты",
"choosePaymentMethod":"Выберите способ оплаты",
"savedPaymentMethods":"Сохраненные способы оплаты",
"payingWith":"Способы оплаты: {{paymentSource}}",
"chooseAnotherWayToPay":"Выберите другой способ оплаты",
"chooseAWayToPay":"Выберите способ оплаты",
"otherWaysToPay":"Другие способы оплаты",
"fieldEmptyForCvv":"Укажите код безопасности.",
"fieldEmptyForExpirationDate":"Укажите дату окончания срока действия.",
"fieldEmptyForCardholderName":"Введите имя и фамилию владельца карты.",
"fieldEmptyForNumber":"Введите номер.",
"fieldEmptyForPostalCode":"Укажите почтовый индекс.",
"fieldInvalidForCvv":"Этот код безопасности недействителен.",
"fieldInvalidForExpirationDate":"Эта дата окончания срока действия недействительна.",
"fieldInvalidForNumber":"Этот номер карты недействителен.",
"fieldInvalidForPostalCode":"Этот почтовый индекс недействителен.",
"genericError":"Возникла проблема с нашей стороны.",
"hostedFieldsFailedTokenizationError":"Проверьте правильность ввода данных и повторите попытку.",
"hostedFieldTokenizationNetworkError":"Ошибка сети. Повторите попытку.",
"hostedFieldsFieldsInvalidError":"Проверьте правильность ввода данных и повторите попытку.",
"paypalAccountTokenizationFailed":"Что-то пошло не так — не удалось добавить учетную запись PayPal. Повторите попытку.",
"paypalFlowFailedError":"Что-то пошло не так — не удалось подключиться к системе PayPal. Повторите попытку.",
"paypalTokenizationRequestActiveError":"Выполняется авторизация платежа PayPal.",
"unsupportedCardTypeError":"Этот тип карты не поддерживается. Попробуйте воспользоваться другой картой.",
"cardholderNameLabel":"Имя и фамилия владельца",
"cardNumberLabel":"Номер карты",
"cvvLabel":"Код безопасности",
"cvvThreeDigitLabelSubheading":"(3 цифры)",
"cvvFourDigitLabelSubheading":"(4 цифры)",
"cardholderNamePlaceholder":"Имя и фамилия владельца",
"expirationDateLabel":"Действует до",
"expirationDateLabelSubheading":"(ММ/ГГ)",
"expirationDatePlaceholder":"ММ/ГГ",
"postalCodeLabel":"Индекс",
"payWithCard":"Оплатить картой",
"endingIn":"Последние две цифры номера карты: ••{{lastTwoCardDigits}}",
"Card":"Карта",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"Ändra betalningsmetod",
"choosePaymentMethod":"Välj betalningsmetod",
"savedPaymentMethods":"Sparade betalningsmetoder",
"payingWith":"Betalas med {{paymentSource}}",
"chooseAnotherWayToPay":"Välj ett annat sätt att betala",
"chooseAWayToPay":"Välj hur du vill betala",
"otherWaysToPay":"Andra sätt att betala",
"fieldEmptyForCvv":"Fyll i en CVV-kod.",
"fieldEmptyForExpirationDate":"Fyll i ett utgångsdatum.",
"fieldEmptyForCardholderName":"Fyll i kortinnehavarens namn.",
"fieldEmptyForNumber":"Fyll i ett nummer.",
"fieldEmptyForPostalCode":"Fyll i ett postnummer.",
"fieldInvalidForCvv":"Den här säkerhetskoden är inte giltig.",
"fieldInvalidForExpirationDate":"Det här utgångsdatumet är inte giltigt.",
"fieldInvalidForNumber":"Det här kortnumret är inte giltigt.",
"fieldInvalidForPostalCode":"Det här postnumret är inte giltigt.",
"genericError":"Ett fel uppstod.",
"hostedFieldsFailedTokenizationError":"Kontrollera uppgifterna och försök igen.",
"hostedFieldTokenizationNetworkError":"Nätverksfel. Försök igen.",
"hostedFieldsFieldsInvalidError":"Kontrollera uppgifterna och försök igen.",
"paypalAccountTokenizationFailed":"Ett fel uppstod när PayPal-kontot skulle läggas till. Försök igen.",
"paypalFlowFailedError":"Ett fel uppstod när anslutningen till PayPal skulle upprättas. Försök igen.",
"paypalTokenizationRequestActiveError":"Betalningsgodkännandet för PayPal behandlas redan.",
"unsupportedCardTypeError":"Den här korttypen stöds inte. Pröva med ett annat kort.",
"cardholderNameLabel":"Kortinnehavarens namn",
"cardNumberLabel":"Kortnummer",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 siffror)",
"cvvFourDigitLabelSubheading":"(4 siffror)",
"cardholderNamePlaceholder":"Kortinnehavarens namn",
"expirationDateLabel":"Utgångsdatum",
"expirationDateLabelSubheading":"(MM/ÅÅ)",
"expirationDatePlaceholder":"MM/ÅÅ",
"postalCodeLabel":"Postnummer",
"payWithCard":"Betala med kort",
"endingIn":"Slutar på ••{{lastTwoCardDigits}}",
"Card":"Kort",
"PayPal":"PayPal",
"PayPal Credit":"PayPal-kredit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"เปลี่ยนวิธีการชำระเงิน",
"choosePaymentMethod":"เลือกวิธีชำระเงิน",
"savedPaymentMethods":"วิธีการชำระเงินที่บันทึกไว้",
"payingWith":"การชำระเงินด้วย {{paymentSource}}",
"chooseAnotherWayToPay":"เลือกวิธีอื่นเพื่อชำระเงิน",
"chooseAWayToPay":"เลือกวิธีชำระเงิน",
"otherWaysToPay":"วิธีอื่นๆ ในการชำระเงิน",
"fieldEmptyForCvv":"โปรดกรอก CVV (รหัสการตรวจสอบยืนยันบัตร)",
"fieldEmptyForExpirationDate":"โปรดกรอกวันที่หมดอายุ",
"fieldEmptyForCardholderName":"โปรดกรอกชื่อเจ้าของบัตร",
"fieldEmptyForNumber":"โปรดกรอกหมายเลข",
"fieldEmptyForPostalCode":"โปรดกรอกรหัสไปรษณีย์",
"fieldInvalidForCvv":"รหัสความปลอดภัยนี้ไม่ถูกต้อง",
"fieldInvalidForExpirationDate":"วันที่หมดอายุนี้ไม่ถูกต้อง",
"fieldInvalidForNumber":"หมายเลขบัตรนี้ไม่ถูกต้อง",
"fieldInvalidForPostalCode":"รหัสไปรษณีย์นี้ไม่ถูกต้อง",
"genericError":"เกิดข้อผิดพลาดขึ้นในระบบของเรา",
"hostedFieldsFailedTokenizationError":"โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",
"hostedFieldTokenizationNetworkError":"ข้อผิดพลาดด้านเครือข่าย โปรดลองอีกครั้ง",
"hostedFieldsFieldsInvalidError":"โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",
"paypalAccountTokenizationFailed":"เกิดข้อผิดพลาดในการเพิ่มบัญชี PayPal โปรดลองอีกครั้ง",
"paypalFlowFailedError":"เกิดข้อผิดพลาดในการเชื่อมต่อกับ PayPal โปรดลองอีกครั้ง",
"paypalTokenizationRequestActiveError":"การอนุญาตการชำระเงินของ PayPal อยู่ในระหว่างดำเนินการ",
"unsupportedCardTypeError":"ไม่รองรับบัตรประเภทนี้ โปรดลองใช้บัตรใบอื่น",
"cardholderNameLabel":"ชื่อเจ้าของบัตร",
"cardNumberLabel":"หมายเลขบัตร",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"(3 หลัก)",
"cvvFourDigitLabelSubheading":"(4 หลัก)",
"cardholderNamePlaceholder":"ชื่อเจ้าของบัตร",
"expirationDateLabel":"วันหมดอายุ",
"expirationDateLabelSubheading":"(ดด/ปป)",
"expirationDatePlaceholder":"ดด/ปป",
"postalCodeLabel":"รหัสไปรษณีย์",
"payWithCard":"ชำระเงินด้วยบัตร",
"endingIn":"ลงท้ายด้วย ••{{lastTwoCardDigits}}",
"Card":"บัตร",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"更改付款方式",
"choosePaymentMethod":"选择付款方式",
"savedPaymentMethods":"已保存的付款方式",
"payingWith":"正在使用{{paymentSource}}付款",
"chooseAnotherWayToPay":"选择其他付款方式",
"chooseAWayToPay":"选择付款方式",
"otherWaysToPay":"其他付款方式",
"fieldEmptyForCvv":"请填写CVV。",
"fieldEmptyForExpirationDate":"请填写有效期限。",
"fieldEmptyForCardholderName":"请填写持卡人的姓名。",
"fieldEmptyForNumber":"请填写一个号码。",
"fieldEmptyForPostalCode":"请填写邮政编码。",
"fieldInvalidForCvv":"此安全代码无效。",
"fieldInvalidForExpirationDate":"此有效期限无效。",
"fieldInvalidForNumber":"此卡号无效。",
"fieldInvalidForPostalCode":"此邮政编码无效。",
"genericError":"我们遇到了一些问题",
"hostedFieldsFailedTokenizationError":"请检查您的信息，然后重试。",
"hostedFieldTokenizationNetworkError":"网络错误。请重试。",
"hostedFieldsFieldsInvalidError":"请检查您的信息，然后重试。",
"paypalAccountTokenizationFailed":"添加PayPal账户时出错。请重试。",
"paypalFlowFailedError":"连接到PayPal时出错。请重试。",
"paypalTokenizationRequestActiveError":"PayPal付款授权已在进行中。",
"unsupportedCardTypeError":"不支持该卡类型。请尝试其他卡。",
"cardholderNameLabel":"持卡人姓名",
"cardNumberLabel":"卡号",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"（3位数）",
"cvvFourDigitLabelSubheading":"（4位数）",
"cardholderNamePlaceholder":"持卡人姓名",
"expirationDateLabel":"有效期限",
"expirationDateLabelSubheading":"（MM/YY）",
"expirationDatePlaceholder":"MM/YY",
"postalCodeLabel":"邮政编码",
"payWithCard":"用卡付款",
"endingIn":"尾号为{{lastTwoCardDigits}}",
"Card":"卡",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"American Express",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"银联"};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"變更付款方式",
"choosePaymentMethod":"選擇付款方式",
"savedPaymentMethods":"已儲存的付款方式",
"payingWith":"付款方式為 {{paymentSource}}",
"chooseAnotherWayToPay":"選擇其他付款方式",
"chooseAWayToPay":"選擇付款方式",
"otherWaysToPay":"其他付款方式",
"fieldEmptyForCvv":"請填寫信用卡認證碼。",
"fieldEmptyForExpirationDate":"請填寫到期日。",
"fieldEmptyForCardholderName":"請填寫持卡人的名字。",
"fieldEmptyForNumber":"請填寫號碼。",
"fieldEmptyForPostalCode":"請填寫郵遞區號。",
"fieldInvalidForCvv":"此安全代碼無效。",
"fieldInvalidForExpirationDate":"此到期日無效。",
"fieldInvalidForNumber":"此卡號無效。",
"fieldInvalidForPostalCode":"此郵遞區號無效。",
"genericError":"系統發生錯誤。",
"hostedFieldsFailedTokenizationError":"請檢查你的資料並再試一次。",
"hostedFieldTokenizationNetworkError":"網絡錯誤。請重試。",
"hostedFieldsFieldsInvalidError":"請檢查你的資料並再試一次。",
"paypalAccountTokenizationFailed":"加入 PayPal 帳戶時發生錯誤。請重試。",
"paypalFlowFailedError":"連接 PayPal 時發生錯誤。請重試。",
"paypalTokenizationRequestActiveError":"PayPal 付款授權已在處理中。",
"unsupportedCardTypeError":"不可使用此信用卡類型。請改用其他信用卡。",
"cardholderNameLabel":"持卡人名字",
"cardNumberLabel":"卡號",
"cvvLabel":"信用卡認證碼",
"cvvThreeDigitLabelSubheading":"（3 位數）",
"cvvFourDigitLabelSubheading":"（4 位數）",
"cardholderNamePlaceholder":"持卡人名字",
"expirationDateLabel":"到期日",
"expirationDateLabelSubheading":"(MM/YY)",
"expirationDatePlaceholder":"MM/YY",
"postalCodeLabel":"郵遞區號",
"payWithCard":"使用信用卡付款",
"endingIn":"最後兩位數為••{{lastTwoCardDigits}}",
"Card":"信用卡",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"美國運通",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports={
"changePaymentMethod":"變更支付購物款項方式",
"choosePaymentMethod":"選擇付款方式",
"savedPaymentMethods":"已儲存的付款方式",
"payingWith":"以 {{paymentSource}} 付款",
"chooseAnotherWayToPay":"選擇支付款項的以其他方式付款",
"chooseAWayToPay":"選擇支付款項的方式",
"otherWaysToPay":"其他付款方式",
"fieldEmptyForCvv":"請填妥信用卡驗證碼。",
"fieldEmptyForExpirationDate":"請填妥到期日。",
"fieldEmptyForCardholderName":"請填妥持卡人姓名。",
"fieldEmptyForNumber":"請填妥號碼。",
"fieldEmptyForPostalCode":"請填寫郵遞區號。",
"fieldInvalidForCvv":"這組安全代碼無效。",
"fieldInvalidForExpirationDate":"此到期日無效。",
"fieldInvalidForNumber":"此卡號無效。",
"fieldInvalidForPostalCode":"此郵遞區號無效。",
"genericError":"我們的系統發生問題。",
"hostedFieldsFailedTokenizationError":"請檢查你的資料並重試。",
"hostedFieldTokenizationNetworkError":"網路錯誤。請重試。",
"hostedFieldsFieldsInvalidError":"請檢查你的資料並重試。",
"paypalAccountTokenizationFailed":"新增 PayPal 帳戶時，系統發生錯誤。請重試。",
"paypalFlowFailedError":"連結至 PayPal 時，系統發生錯誤。請重試。",
"paypalTokenizationRequestActiveError":"PayPal 支付款項的授權已在處理中。",
"unsupportedCardTypeError":"不支援此卡片類型。請嘗試其他卡片。",
"cardholderNameLabel":"持卡人姓名",
"cardNumberLabel":"卡號",
"cvvLabel":"CVV",
"cvvThreeDigitLabelSubheading":"（3 位數）",
"cvvFourDigitLabelSubheading":"（4 位數）",
"cardholderNamePlaceholder":"持卡人姓名",
"expirationDateLabel":"到期日",
"expirationDateLabelSubheading":"（月 / 年）",
"expirationDatePlaceholder":"月 / 年",
"postalCodeLabel":"郵遞區號",
"payWithCard":"使用信用卡 / 扣帳卡付款",
"endingIn":"你的末兩碼為 •• {{lastTwoCardDigits}}",
"Card":"信用卡或扣帳卡",
"PayPal":"PayPal",
"PayPal Credit":"PayPal Credit",
"American Express":"美國運通",
"Discover":"Discover",
"Diners Club":"Diners Club",
"MasterCard":"Mastercard",
"Visa":"Visa",
"JCB":"JCB",
"Maestro":"Maestro",
"UnionPay":"UnionPay"};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics=__webpack_require__(8);
var find=__webpack_require__(134);
var uuid=__webpack_require__(40);
var DropinError=__webpack_require__(4);
var kebabCaseToCamelCase=__webpack_require__(135);
var WHITELISTED_DATA_ATTRIBUTES=[
'locale',
'payment-option-priority',

'card.cardholderName',
'card.cardholderName.required',

'paypal.amount',
'paypal.currency',
'paypal.flow',

'paypal-credit.amount',
'paypal-credit.currency',
'paypal-credit.flow'];


function addCompositeKeyValuePairToObject(obj,key,value){
var decomposedKeys=key.split('.');
var topLevelKey=kebabCaseToCamelCase(decomposedKeys[0]);

if(decomposedKeys.length===1){
obj[topLevelKey]=deserialize(value);
}else{
obj[topLevelKey]=obj[topLevelKey]||{};
addCompositeKeyValuePairToObject(obj[topLevelKey],decomposedKeys.slice(1).join('.'),value);
}
}

function deserialize(value){
try{
return JSON.parse(value);
}catch(e){
return value;
}
}

function createFromScriptTag(createFunction,scriptTag){
var authorization,container,createOptions,form;

if(!scriptTag){
return;
}

authorization=scriptTag.getAttribute('data-braintree-dropin-authorization');

if(!authorization){
throw new DropinError('Authorization not found in data-braintree-dropin-authorization attribute');
}

container=document.createElement('div');
container.id='braintree-dropin-'+uuid();

form=find.findParentForm(scriptTag);

if(!form){
throw new DropinError('No form found for script tag integration.');
}

form.addEventListener('submit',function(event){
event.preventDefault();
});

form.insertBefore(container,scriptTag);

createOptions={
authorization:authorization,
container:container};


WHITELISTED_DATA_ATTRIBUTES.forEach(function(compositeKey){
var value=scriptTag.getAttribute('data-'+compositeKey);

if(value==null){
return;
}

addCompositeKeyValuePairToObject(createOptions,compositeKey,value);
});

createFunction(createOptions).then(function(instance){
analytics.sendEvent(instance._client,'integration-type.script-tag');
form.addEventListener('submit',function(){
instance.requestPaymentMethod(function(requestPaymentError,payload){
var paymentMethodNonce;

if(requestPaymentError){
return;
}

paymentMethodNonce=form.querySelector('[name="payment_method_nonce"]');

if(!paymentMethodNonce){
paymentMethodNonce=document.createElement('input');
paymentMethodNonce.type='hidden';
paymentMethodNonce.name='payment_method_nonce';
form.appendChild(paymentMethodNonce);
}

paymentMethodNonce.value=payload.nonce;

form.submit();
});
});
});
}

module.exports=createFromScriptTag;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findParentForm(element){
var parentNode=element.parentNode;

if(!parentNode||parentNode.nodeName==='FORM'){
return parentNode;
}

return findParentForm(parentNode);
}

module.exports={
findParentForm:findParentForm};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function kebabCaseToCamelCase(kebab){
var parts=kebab.split('-');
var first=parts.shift();
var capitalizedParts=parts.map(function(part){
return part.charAt(0).toUpperCase()+part.substring(1);
});

return[first].concat(capitalizedParts).join('');
}

module.exports=kebabCaseToCamelCase;

/***/ })
/******/ ]);