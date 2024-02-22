!function(){var e={738:function(){window.addEventListener("load",(()=>{let e=document.querySelector("body").classList;if(e.contains("wp-admin")&&e.contains("block-editor-page")){const e=document.querySelector("body").getAttribute("class").match(/post-type-([a-z_]+)--([a-z_]+)/),t=document.querySelector(".block-editor-block-list__layout");if(e&&t){const n=e[1];e[2],t.classList.add(`block-editor-block-list__layout--${n}`)}}}))}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.blocks;window.addEventListener("load",(()=>{(0,e.registerBlockStyle)("core/list",{name:"less-gap",label:"Less gap"}),(0,e.registerBlockStyle)("core/cover",{name:"textured",label:"Textured"})})),window.addEventListener("load",(()=>{(0,e.unregisterBlockStyle)("core/image","default"),(0,e.unregisterBlockStyle)("core/image","rounded")})),n(738);var t=window.wp.apiFetch,r=n.n(t),s=window.wp.data;const o="sht/menu-positions",l={setEntries:e=>({type:"SET_ENTRIES",entries:e}),getEntries:e=>({type:"GET_ENTRIES",path:e})};(0,s.registerStore)(o,{reducer(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{entries:{}},t=arguments.length>1?arguments[1]:void 0;return"SET_ENTRIES"===t.type?{...e,entries:t.entries}:e},actions:l,selectors:{getEntries(e){const{entries:t}=e;return t}},controls:{GET_ENTRIES:e=>r()({path:e.path})},resolvers:{*getEntries(){const e=yield l.getEntries(`/${o}/`);return l.setEntries(e)}}});const a={setEntries:e=>({type:"SET_ENTRIES",entries:e}),getEntries:e=>({type:"GET_ENTRIES",path:e})};(0,s.registerStore)("sht/menus",{reducer(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{entries:{}},t=arguments.length>1?arguments[1]:void 0;return"SET_ENTRIES"===t.type?{...e,entries:t.entries}:e},actions:a,selectors:{getEntries(e){const{entries:t}=e;return t}},controls:{GET_ENTRIES:e=>r()({path:e.path})},resolvers:{*getEntries(){const e=yield a.getEntries("/sht/menus/");return a.setEntries(e)}}}),window.addEventListener("load",(()=>{let t=[];(0,e.getBlockTypes)().forEach((function(e){t.push(e.name)})),["core-embed/instagram"].forEach((n=>{t.includes(n)&&(0,e.unregisterBlockType)(n)}))}));var i=window.wp.blockEditor,c=window.wp.serverSideRender,u=n.n(c),d=window.wp.i18n,p=window.wp.element,m=window.wp.primitives,h=(0,p.createElement)(m.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,p.createElement)(m.Path,{d:"M19 6.2h-5.9l-.6-1.1c-.3-.7-1-1.1-1.8-1.1H5c-1.1 0-2 .9-2 2v11.8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8.2c0-1.1-.9-2-2-2zm.5 11.6c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h5.8c.2 0 .4.1.4.3l1 2H19c.3 0 .5.2.5.5v9.5zM8 12.8h8v-1.5H8v1.5zm0 3h8v-1.5H8v1.5z"}));const E="sht/archive-title-search";(0,e.registerBlockType)(E,{apiVersion:2,title:(0,d._x)("Archive Title (Search)","Block title","sha"),icon:h,category:"sht/blocks",keywords:[(0,d._x)("Bilder","Block keyword","sha"),"image","gallery",(0,d._x)("Impressionen","Block keyword","sha")],supports:{align:["wide","full"],html:!1},edit:()=>{const e=(0,i.useBlockProps)();return React.createElement("div",e,React.createElement(u(),{block:E}))},save:()=>null});var g=(0,p.createElement)(m.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,p.createElement)(m.Path,{d:"M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"})),w=window.wp.components;const v="sht/menu";(0,e.registerBlockType)(v,{title:(0,d._x)("Predefined menu","Block title","sha"),description:(0,d._x)("Adds a pre-defined navigation menu to the page.","Block title","sha"),icon:g,category:"common",supports:{align:!1,mode:!1,html:!1,multiple:!0,reusable:!0,inserter:!0},attributes:{menu:{type:"string"}},edit:(0,s.withSelect)((e=>{const t=e("sht/menu-positions").getEntries();if(!Object.keys(t).length)return t;let n=[{label:(0,d._x)("Keine Auswahl","Default selector label","sha"),value:""}];return t.map((e=>{n.push({value:e.id,label:e.title})})),{menus:n}}))((e=>{let{attributes:t,menus:n,setAttributes:r}=e;const{menu:s}=t;return n?[React.createElement(i.InspectorControls,null,React.createElement(w.PanelBody,{title:(0,d._x)("Block-Optionen","PanelBody Title","sha"),initialOpen:!0},React.createElement(w.SelectControl,{label:(0,d._x)("Vordefinierte Navigation auswählen","Select control label","sha"),value:s,onChange:e=>r({menu:e}),options:n}))),React.createElement(u(),{block:v,attributes:t})]:""}))});var _=(0,p.createElement)(m.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,p.createElement)(m.Path,{d:"M19 6.5H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm.5 9c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v7zM8 12.8h8v-1.5H8v1.5z"}));const y="sht/menu-toggle",k=(0,e.getBlockDefaultClassName)(y);(0,e.registerBlockType)(y,{apiVersion:2,title:(0,d._x)("Menü-Toggle-Schalter","Block title","sha"),icon:_,category:"sht/blocks",keywords:["navigation","toggle"],supports:{anchor:!0,align:!1,html:!1},edit:()=>{const e=(0,i.useBlockProps)();return React.createElement("div",e,React.createElement("span",{className:`${k}__line ${k}__line--1`}),React.createElement("span",{className:`${k}__line ${k}__line--2`}),React.createElement("span",{className:`${k}__line ${k}__line--3`}))},save:e=>{let{attributes:t}=e;const n={"aria-expanded":!1,"data-root-style":"is--mobilemenu--open"};t.anchor&&(n["aria-controls"]=t.anchor);const r=i.useBlockProps.save(n);return React.createElement("button",r,React.createElement("span",{className:`${k}__line ${k}__line--1`}),React.createElement("span",{className:`${k}__line ${k}__line--2`}),React.createElement("span",{className:`${k}__line ${k}__line--3`}))}})}()}();