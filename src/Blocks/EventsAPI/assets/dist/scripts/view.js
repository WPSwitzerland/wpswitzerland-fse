!function(){"use strict";var e=window.wp.element,t=e=>{if(11===e||12===e||13===e)return`${e}th`;switch(e%10){case 1:return`${e}st`;case 2:return`${e}nd`;case 3:return`${e}rd`;default:return`${e}th`}};const a=a=>{let{element:{dataset:n},classNameBase:r}=a;const[o,l]=(0,e.useState)([]),[c,u]=(0,e.useState)(!1),{root:s}=wpApiSettings,{url:m}=n;let i=document.documentElement.lang;const g=i.substring(0,2);if("en"===g&&(i="en-GB"),(0,e.useEffect)((()=>{u(!0),fetch(`${s}sht/v1/events?url=${m}&per_page=100`,{headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{l(e),u(!1)}))}),[]),c)return"Loading...";if(!o||!o.length)return"No current events";let $=1;return o.length>6&&($=2),o.length>10&&($=3),React.createElement("div",{className:r},React.createElement("div",{className:`${r}__entries ${r}__entries--cols-${$}`},o.map((e=>{var a;let n=(e=>{const{date_from:a,date_to:n,language_short:r,language_full:o}=e,l=a.split(" "),c=l[0].split("-"),u=l[1].split(":"),s=n.split(" "),m=s[0].split("-"),i=s[1].split(":"),g=new Date(c[0],c[1]-1,c[2],u[0],u[1]),$=new Date(m[0],m[1]-1,m[2],i[0],i[1]),_={weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"};let d=(e=>{const{date_from:t,date_to:a,language:n}=e;return{from:t.toLocaleTimeString(n,{hour:"numeric",minute:"numeric",hour12:!1}),to:a.toLocaleTimeString(n,{hour:"numeric",minute:"numeric",hour12:!1})}})({date_from:g,date_to:$,language:o}),h="";if(g.getDate()===$.getDate()&&g.getMonth()===$.getMonth()&&g.getFullYear()===$.getFullYear())h="en"===r?`${t(g.getDate())} ${g.toLocaleDateString(o,{month:"long",year:"numeric"})}, ${d.from}-${d.to}`:g.toLocaleDateString(o,_);else if(g.getMonth()===$.getMonth())switch(r){case"de":h=`${g.getDate()}. bis ${$.getDate()}. ${g.toLocaleDateString(o,{month:"long",year:"numeric"})}, von ${d.from} bis ${d.to}`;break;case"fr":h=`${g.getDate()} - ${$.getDate()} ${g.toLocaleDateString(o,{month:"long",year:"numeric"})}, de ${d.from} jusqu'a ${d.to}`;break;default:h=`${t(g.getDate())} - ${t($.getDate())} ${g.toLocaleDateString(o,{month:"long",year:"numeric"})}, from ${d.from} to ${d.to}`}else switch(r){case"de":h=`${g.toLocaleDateString(o,_)} bis ${$.toLocaleDateString(o,_)}`;break;case"fr":h=`${g.toLocaleDateString(o,_)} jusqu'au ${$.toLocaleDateString(o,_)}`;break;default:h=`${t(g.getDate())} ${g.toLocaleDateString(o,{month:"long",year:"numeric"})} to ${t($.getDate())} ${$.toLocaleDateString(o,{month:"long",year:"numeric"})}, from ${d.from} to ${d.to}`}return h})({date_from:e.date,date_to:e.end_date,language_full:i,language_short:g});return null!==(a=e.location)&&void 0!==a&&a.location&&(n+=`, ${e.location.location}`),React.createElement("div",{className:`${r}__entry`},React.createElement("div",{className:`${r}__entry-title`},e.url&&React.createElement("a",{target:"_blank",href:e.url,dangerouslySetInnerHTML:{__html:e.title}}),!e.url&&React.createElement("span",{dangerouslySetInnerHTML:{__html:e.title}})),React.createElement("div",{className:`${r}__entry-dates`,dangerouslySetInnerHTML:{__html:n}}),React.createElement("div",{className:`${r}__entry-organizer`},e.meetup_url&&React.createElement("a",{target:"_blank",href:e.meetup_url,dangerouslySetInnerHTML:{__html:e.meetup}}),!e.meetup_url&&React.createElement("span",{dangerouslySetInnerHTML:{__html:e.meetup}})))}))))},{class_name_base:n}=sht_theme,r=document.querySelectorAll(`.${n}`);r&&r.forEach((t=>{(0,e.createRoot)(t).render(React.createElement(a,{element:t,classNameBase:n}))}))}();