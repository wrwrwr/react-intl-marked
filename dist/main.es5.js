!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-intl"),function(){try{return require("react-intl-ns")}catch(e){}}()):"function"==typeof define&&define.amd?define(["react","react-intl","react-intl-ns"],t):"object"==typeof exports?exports.ReactIntlMarked=t(require("react"),require("react-intl"),function(){try{return require("react-intl-ns")}catch(e){}}()):e.ReactIntlMarked=t(e.React,e.ReactIntl,e.ReactIntlNs)}(this,function(e,t,r){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.oe=function(e){throw e},t.p="dist",t(t.s=3)}([function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){if("undefined"==typeof r){var n=new Error('Cannot find module "undefined"');throw n.code="MODULE_NOT_FOUND",n}e.exports=r},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var f=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=r(0),s=n(l),p=r(1),d=function(e){function t(){var e,r,n,o;i(this,t);for(var a=arguments.length,c=Array(a),f=0;a>f;f++)c[f]=arguments[f];return r=n=u(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),n.marker="|",n.substitutions=/\|(br)\|/g,o=r,u(n,o)}return c(t,e),f(t,[{key:"mark",value:function(e,t){var r="mark-"+t;return s["default"].createElement("span",{key:r,className:"marked"},e)}},{key:"br",value:function(e){var t="br-"+e;return s["default"].createElement("br",{key:t})}},{key:"render",value:function(){function e(e){var t=e.split(p).filter(function(e){return e});return t.map(function(e){return h[e]||e})}var t=this,r=this.context.intl.formatMessage,n=this.props,i=n.values,u=n.tagName,c=n.children,f=a(n,["values","tagName","children"]),s=Math.floor(1099511627776*Math.random()).toString(16),p=new RegExp("(@__ELEMENT-"+s+"-\\d+__@)","g"),d=function(){var e=0;return function(){return"@__ELEMENT-"+s+"-"+(e+=1)+"__@"}}(),y={},h={};Object.keys(i).forEach(function(e){var t=i[e];if((0,l.isValidElement)(t)){var r=d();y[e]=r,h[r]=t}else y[e]=t});var v=r(f,y),m=0,b=v.replace(this.substitutions,function(e,r){var n=d();return h[n]=t[r](m+=1),n}),g=[],_=b.split(this.marker);if(_.length%2===1)for(var k=0,x=0;x<_.length;x+=1){var E=e(_[x]);if(x%2===0){var O;(O=g).push.apply(O,o(E))}else g.push(this.mark(E,k+=1))}else g=e(b);return"function"==typeof c?c.apply(void 0,o(g)):l.createElement.apply(void 0,[u,null].concat(o(g)))}}]),t}(p.FormattedMessage);d.displayName="FormattedMarkedMessage",t["default"]=d;try{var y=r(2),h=y.intlMessageShortcut;e.exports.markedShortcut=h(d)}catch(v){}}])});