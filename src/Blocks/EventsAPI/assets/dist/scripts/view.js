!function(){"use strict";var e=window.wp.element,t=e=>{if(11===e||12===e||13===e)return`${e}th`;switch(e%10){case 1:return`${e}st`;case 2:return`${e}nd`;case 3:return`${e}rd`;default:return`${e}th`}};const a=a=>{let{element:{dataset:n},classNameBase:r}=a;const[o,l]=(0,e.useState)([]),[c,u]=(0,e.useState)(!1),{root:m,nonce:s}=wpApiSettings,{url:i}=n;let g=document.documentElement.lang;const d=g.substring(0,2);return"en"===d&&(g="en-GB"),(0,e.useEffect)((()=>{u(!0),fetch(`${m}sht/v1/events`,{method:"POST",headers:{"X-WP-Nonce":s,"Content-Type":"application/json"},body:JSON.stringify({url:i})}).then((e=>e.json())).then((e=>{const{events:t}=e;l(t),u(!1)}))}),[]),c?"Loading...":o.length?(console.log(o),React.createElement("div",{className:r},React.createElement("div",{className:`${r}__entries`},o.map((e=>{var a;let n=(e=>{const{date_from:a,date_to:n,language_short:r,language_full:o}=e,l=new Date(a),c=new Date(n),u={weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"};let m=(e=>{const{date_from:t,date_to:a,language:n}=e;return{from:t.toLocaleTimeString(n,{hour:"numeric",minute:"numeric",hour12:!1}),to:a.toLocaleTimeString(n,{hour:"numeric",minute:"numeric",hour12:!1})}})({date_from:l,date_to:c,language:o}),s="";if(l.getDate()===c.getDate()&&l.getMonth()===c.getMonth()&&l.getFullYear()===c.getFullYear())s="en"===r?`${t(l.getDate())} ${l.toLocaleDateString(o,{month:"long",year:"numeric"})}, from ${m.from} until ${m.to}`:l.toLocaleDateString(o,u);else if(l.getMonth()===c.getMonth())switch(r){case"de":s=`${l.getDate()}. bis ${c.getDate()}. ${l.toLocaleDateString(o,{month:"long",year:"numeric"})}, von ${m.from} bis ${m.to}`;break;case"fr":s=`${l.getDate()} - ${c.getDate()} ${l.toLocaleDateString(o,{month:"long",year:"numeric"})}, de ${m.from} jusqu'a ${m.to}`;break;default:s=`${t(l.getDate())} - ${t(c.getDate())} ${l.toLocaleDateString(o,{month:"long",year:"numeric"})}, from ${m.from} to ${m.to}`}else switch(r){case"de":s=`${l.toLocaleDateString(o,u)} bis ${c.toLocaleDateString(o,u)}`;break;case"fr":s=`${l.toLocaleDateString(o,u)} jusqu'au ${c.toLocaleDateString(o,u)}`;break;default:s=`${t(l.getDate())} ${l.toLocaleDateString(o,{month:"long",year:"numeric"})} to ${t(c.getDate())} ${c.toLocaleDateString(o,{month:"long",year:"numeric"})}, from ${m.from} to ${m.to}`}return s})({date_from:e.date,date_to:e.end_date,language_full:g,language_short:d});return null!==(a=e.location)&&void 0!==a&&a.location&&(n+=`, ${e.location.location}`),React.createElement("div",{className:`${r}__entry`},React.createElement("div",{className:`${r}__entry-title`},e.url&&React.createElement("a",{target:"_blank",href:e.url,dangerouslySetInnerHTML:{__html:e.title}}),!e.url&&React.createElement("span",{dangerouslySetInnerHTML:{__html:e.title}})),React.createElement("div",{className:`${r}__entry-dates`,dangerouslySetInnerHTML:{__html:n}}),React.createElement("div",{className:`${r}__entry-organizer`},e.meetup_url&&React.createElement("a",{target:"_blank",href:e.meetup_url,dangerouslySetInnerHTML:{__html:e.meetup}}),!e.meetup_url&&React.createElement("span",{dangerouslySetInnerHTML:{__html:e.meetup}})))}))))):"No current events"},{class_name_base:n}=sht_theme,r=document.querySelectorAll(`.${n}`);r&&r.forEach((t=>{(0,e.createRoot)(t).render(React.createElement(a,{element:t,classNameBase:n}))}))}();