(()=>{var e={43:function(e,o,t){var n,l;!function(r,i){"use strict";void 0===(l="function"==typeof(n=function(){var e=function(){},o="undefined",t=typeof window!==o&&typeof window.navigator!==o&&/Trident\/|MSIE /.test(window.navigator.userAgent),n=["trace","debug","info","warn","error"];function l(e,o){var t=e[o];if("function"==typeof t.bind)return t.bind(e);try{return Function.prototype.bind.call(t,e)}catch(o){return function(){return Function.prototype.apply.apply(t,[e,arguments])}}}function r(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function i(n){return"debug"===n&&(n="log"),typeof console!==o&&("trace"===n&&t?r:void 0!==console[n]?l(console,n):void 0!==console.log?l(console,"log"):e)}function c(o,t){for(var l=0;l<n.length;l++){var r=n[l];this[r]=l<o?e:this.methodFactory(r,o,t)}this.log=this.debug}function a(e,t,n){return function(){typeof console!==o&&(c.call(this,t,n),this[e].apply(this,arguments))}}function s(e,o,t){return i(e)||a.apply(this,arguments)}function u(e,t,l){var r,i=this,a="loglevel";function u(){var e;if(typeof window!==o&&a){try{e=window.localStorage[a]}catch(e){}if(typeof e===o)try{var t=window.document.cookie,n=t.indexOf(encodeURIComponent(a)+"=");-1!==n&&(e=/^([^;]+)/.exec(t.slice(n))[1])}catch(e){}return void 0===i.levels[e]&&(e=void 0),e}}"string"==typeof e?a+=":"+e:"symbol"==typeof e&&(a=void 0),i.name=e,i.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},i.methodFactory=l||s,i.getLevel=function(){return r},i.setLevel=function(t,l){if("string"==typeof t&&void 0!==i.levels[t.toUpperCase()]&&(t=i.levels[t.toUpperCase()]),!("number"==typeof t&&t>=0&&t<=i.levels.SILENT))throw"log.setLevel() called with invalid level: "+t;if(r=t,!1!==l&&function(e){var t=(n[e]||"silent").toUpperCase();if(typeof window!==o&&a){try{return void(window.localStorage[a]=t)}catch(e){}try{window.document.cookie=encodeURIComponent(a)+"="+t+";"}catch(e){}}}(t),c.call(i,t,e),typeof console===o&&t<i.levels.SILENT)return"No console available for logging"},i.setDefaultLevel=function(e){u()||i.setLevel(e,!1)},i.enableAll=function(e){i.setLevel(i.levels.TRACE,e)},i.disableAll=function(e){i.setLevel(i.levels.SILENT,e)};var f=u();null==f&&(f=null==t?"WARN":t),i.setLevel(f,!1)}var f=new u,p={};f.getLogger=function(e){if("symbol"!=typeof e&&"string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var o=p[e];return o||(o=p[e]=new u(e,f.getLevel(),f.methodFactory)),o};var v=typeof window!==o?window.log:void 0;return f.noConflict=function(){return typeof window!==o&&window.log===f&&(window.log=v),f},f.getLoggers=function(){return p},f.default=f,f})?n.call(o,t,o,e):n)||(e.exports=l)}()}},o={};function t(n){var l=o[n];if(void 0!==l)return l.exports;var r=o[n]={exports:{}};return e[n].call(r.exports,r,r.exports,t),r.exports}(()=>{"use strict";var e=t(43);e.default.setLevel("info"),e.default.info("Initial Load Ready...")})()})();