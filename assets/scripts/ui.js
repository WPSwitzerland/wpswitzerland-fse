!function(){var e={197:function(){window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){var o,n=this.length;for(t=t||window,o=0;o<n;o++)e.call(t,this[o],o,this)}),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,o=(this.document||this.ownerDocument).querySelectorAll(e),n=this;do{for(t=o.length;--t>=0&&o.item(t)!==n;);}while(t<0&&(n=n.parentElement));return n})},599:function(){!function(e){const t="c-body--no-outline",o=e("body");e((function(){o.addClass(t),e(window).keydown((function(e){9===(e.keyCode?e.keyCode:e.which)&&o.removeClass(t)})),e(window).mousemove((function(e){o.addClass(t)}))}))}(jQuery)},720:function(){const e=document.querySelectorAll("[aria-controls]:not([data-standalone-controller])");if(e){var t=function(){let e=document.querySelector("#"+this.getAttribute("aria-controls"));if(e){if(e.dataset.closeAll&&""!==e.dataset.closeAll){const t=document.querySelectorAll(e.dataset.closeAll);t&&t.forEach((e=>{e.setAttribute("aria-hidden","true"),document.querySelectorAll(`[aria-controls="${e.id}"]`).forEach((e=>{e.setAttribute("aria-expanded","false")}))}))}if(this.dataset.close?e.setAttribute("aria-hidden","true"):this.dataset.open?e.setAttribute("aria-hidden","false"):e.setAttribute("aria-hidden","false"==this.getAttribute("aria-expanded")?"false":"true"),document.querySelectorAll(`[aria-controls="${e.id}"]`).forEach((t=>{t.setAttribute("aria-expanded","true"===e.getAttribute("aria-hidden")?"false":"true")})),"false"===e.getAttribute("aria-hidden")&&e.querySelectorAll("input,textarea").length){let t=!1,o=e.querySelectorAll("input,textarea");o.length&&o.forEach((o=>{if(t)return;let n=window.getComputedStyle(o);"none"!==n.display&&"hidden"!==n.visibility&&(e.querySelector("input").focus(),t=!0)}))}e.dataset.toggleStyle&&""!==e.dataset.toggleStyle&&("false"===e.getAttribute("aria-hidden")?e.classList.add(e.dataset.toggleStyle):e.classList.remove(e.dataset.toggleStyle)),e.dataset.rootStyle&&""!==e.dataset.rootStyle&&e.dataset.rootStyle.split(" ").forEach((t=>{"false"===e.getAttribute("aria-hidden")?document.documentElement.classList.add(t):document.documentElement.classList.remove(t)})),this.getAttribute("data-blurme")&&this.blur()}else console.error(`Target #${this.getAttribute("aria-controls")} not found`)};e.forEach((e=>{e.addEventListener("click",t)})),document.querySelector("#mobilemenu")&&(document.querySelector("#mobilemenu").dataset.rootStyle="is--mobilemenu--open",document.querySelector("#mobilemenu").setAttribute("data-hidden","true"))}},337:function(){const e=document.querySelector(".c-header");if(e){const t=()=>{window.scrollY>50?e.classList.add("with--background"):e.classList.remove("with--background")},o=()=>{document.documentElement.style.setProperty("--header--height",e.offsetHeight-1+"px")};o(),window.addEventListener("scroll",t),window.addEventListener("resize",o),window.addEventListener("orientationchange",o)}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";o(197),o(599),o(720),o(337),console.log("%cDeveloped by","font-style: italic; font-size: 12px;"),console.log("%cMark Howells-Mead","font-weight: bold; color: #000; font-size: 16px;"),console.log("%chttps://permanenttourist.ch","color: #000; font-size: 12px;")}()}();