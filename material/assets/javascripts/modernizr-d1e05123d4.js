!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,a,s;for(var l in E)if(E.hasOwnProperty(l)){if(e=[],t=E[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?b[s[0]]=o:(!b[s[0]]||b[s[0]]instanceof Boolean||(b[s[0]]=new Boolean(b[s[0]])),b[s[0]][s[1]]=o),C.push((o?"":"no-")+s.join("-"))}}function i(e){var t=x.className,n=b._config.classPrefix||"";if(T&&(t=t.baseVal),b._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}b._config.enableClasses&&(t+=" "+n+e.join(" "+n),T?x.className.baseVal=t:x.className=t)}function a(e,t){if("object"==typeof e)for(var n in e)w(e,n)&&a(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=b[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return b;t="function"==typeof t?t():t,1==r.length?b[r[0]]=t:(!b[r[0]]||b[r[0]]instanceof Boolean||(b[r[0]]=new Boolean(b[r[0]])),b[r[0]][r[1]]=t),i([(t&&0!=t?"":"no-")+r.join("-")]),b._trigger(e,t)}return b}function s(e,t){return function(){return e.apply(t,arguments)}}function l(e,t){return!!~(""+e).indexOf(t)}function c(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):T?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function f(){var e=t.body;return e||(e=c(T?"svg":"body"),e.fake=!0),e}function u(e,n,r,o){var i,a,s,l,u="modernizr",d=c("div"),p=f();if(parseInt(r,10))for(;r--;)s=c("div"),s.id=o?o[r]:u+(r+1),d.appendChild(s);return i=c("style"),i.type="text/css",i.id="s"+u,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",l=x.style.overflow,x.style.overflow="hidden",x.appendChild(p)),a=n(d,e),p.fake?(p.parentNode.removeChild(p),x.style.overflow=l,x.offsetHeight):d.parentNode.removeChild(d),!!a}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+d(t[o])+":"+r+")");return i=i.join(" or "),u("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function m(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function h(e,t,o,i){function a(){f&&(delete N.style,delete N.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var s=p(e,o);if(!r(s,"undefined"))return s}for(var f,u,d,h,g,v=["modernizr","tspan"];!N.style;)f=!0,N.modElem=c(v.shift()),N.style=N.modElem.style;for(d=e.length,u=0;d>u;u++)if(h=e[u],g=N.style[h],l(h,"-")&&(h=m(h)),N.style[h]!==n){if(i||r(o,"undefined"))return a(),"pfx"==t?h:!0;try{N.style[h]=o}catch(y){}if(N.style[h]!=g)return a(),"pfx"==t?h:!0}return a(),!1}function g(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?s(o,n||t):o);return!1}function v(e,t,n,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+z.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?h(s,t,o,i):(s=(e+" "+F.join(a+" ")+a).split(" "),g(s,t,n))}function y(e,t,r){return v(e,n,n,t,r)}var E=[],S={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){E.push({name:e,fn:t,options:n})},addAsyncTest:function(e){E.push({name:null,fn:e})}},b=function(){};b.prototype=S,b=new b;var w,C=[],x=t.documentElement,T="svg"===x.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;w=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),S._l={},S.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),b.hasOwnProperty(e)&&setTimeout(function(){b._trigger(e,b[e])},0)},S._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},b._q.push(function(){S.addTest=a});T||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=x.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=x.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),x.elements=n+" "+e,c(t)}function i(e){var t=C[e[b]];return t||(t={},w++,e[b]=w,C[w]=t),t}function a(e,n,r){if(n||(n=t),g)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():S.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||E.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),g)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),a=0,s=r(),l=s.length;l>a;a++)o.createElement(s[a]);return o}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return x.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(x,t.frag)}function c(e){e||(e=t);var r=i(e);return!x.shivCSS||h||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),g||l(e,r),e}function f(e){for(var t,n=e.getElementsByTagName("*"),o=n.length,i=RegExp("^(?:"+r().join("|")+")$","i"),a=[];o--;)t=n[o],i.test(t.nodeName)&&a.push(t.applyElement(u(t)));return a}function u(e){for(var t,n=e.attributes,r=n.length,o=e.ownerDocument.createElement(_+":"+e.nodeName);r--;)t=n[r],t.specified&&o.setAttribute(t.nodeName,t.nodeValue);return o.style.cssText=e.style.cssText,o}function d(e){for(var t,n=e.split("{"),o=n.length,i=RegExp("(^|[\\s,>+~])("+r().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),a="$1"+_+"\\:$2";o--;)t=n[o]=n[o].split("}"),t[t.length-1]=t[t.length-1].replace(i,a),n[o]=t.join("}");return n.join("{")}function p(e){for(var t=e.length;t--;)e[t].removeNode()}function m(e){function t(){clearTimeout(a._removeSheetTimer),r&&r.removeNode(!0),r=null}var r,o,a=i(e),s=e.namespaces,l=e.parentWindow;return!N||e.printShived?e:("undefined"==typeof s[_]&&s.add(_),l.attachEvent("onbeforeprint",function(){t();for(var i,a,s,l=e.styleSheets,c=[],u=l.length,p=Array(u);u--;)p[u]=l[u];for(;s=p.pop();)if(!s.disabled&&T.test(s.media)){try{i=s.imports,a=i.length}catch(m){a=0}for(u=0;a>u;u++)p.push(i[u]);try{c.push(s.cssText)}catch(m){}}c=d(c.reverse().join("")),o=f(e),r=n(e,c)}),l.attachEvent("onafterprint",function(){p(o),clearTimeout(a._removeSheetTimer),a._removeSheetTimer=setTimeout(t,500)}),e.printShived=!0,e)}var h,g,v="3.7.3",y=e.html5||{},E=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,S=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,b="_html5shiv",w=0,C={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",h="hidden"in e,g=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){h=!0,g=!0}}();var x={elements:y.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:v,shivCSS:y.shivCSS!==!1,supportsUnknownElements:g,shivMethods:y.shivMethods!==!1,type:"default",shivDocument:c,createElement:a,createDocumentFragment:s,addElements:o};e.html5=x,c(t);var T=/^$|\b(?:all|print)\b/,_="html5shiv",N=!g&&function(){var n=t.documentElement;return!("undefined"==typeof t.namespaces||"undefined"==typeof t.parentWindow||"undefined"==typeof n.applyElement||"undefined"==typeof n.removeNode||"undefined"==typeof e.attachEvent)}();x.type+=" print",x.shivPrint=m,m(t),"object"==typeof module&&module.exports&&(module.exports=x)}("undefined"!=typeof e?e:this,t);var _={elem:c("modernizr")};b._q.push(function(){delete _.elem});var N={style:_.elem.style};b._q.unshift(function(){delete N.style});var j=(S.testProp=function(e,t,r){return h([e],n,t,r)},S.testStyles=u),P=function(){var e=navigator.userAgent,t=e.match(/applewebkit\/([0-9]+)/gi)&&parseFloat(RegExp.$1),n=e.match(/w(eb)?osbrowser/gi),r=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9,o=533>t&&e.match(/android/gi);return n||o||r}();P?b.addTest("fontface",!1):j('@font-face {font-family:"font";src:url("https://")}',function(e,n){var r=t.getElementById("smodernizr"),o=r.sheet||r.styleSheet,i=o?o.cssRules&&o.cssRules[0]?o.cssRules[0].cssText:o.cssText||"":"",a=/src/i.test(i)&&0===i.indexOf(n.split(" ")[0]);b.addTest("fontface",a)});var k="Moz O ms Webkit",z=S._config.usePrefixes?k.split(" "):[];S._cssomPrefixes=z;var F=S._config.usePrefixes?k.toLowerCase().split(" "):[];S._domPrefixes=F,S.testAllProps=v,S.testAllProps=y;var $="CSS"in e&&"supports"in e.CSS,A="supportsCSS"in e;b.addTest("supports",$||A),b.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=b._config.usePrefixes;if(e&&(!t||"webkitPerspective"in x.style)){var n,r="#modernizr{width:0;height:0}";b.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",j(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),b.addTest("target",function(){var t=e.document;if(!("querySelectorAll"in t))return!1;try{return t.querySelectorAll(":target"),!0}catch(n){return!1}}),b.addTest("contains",r(String.prototype.contains,"function")),o(),i(C),delete S.addTest,delete S.addAsyncTest;for(var q=0;q<b._q.length;q++)b._q[q]();e.Modernizr=b}(window,document);