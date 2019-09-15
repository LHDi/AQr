(window.webpackJsonpaqr=window.webpackJsonpaqr||[]).push([[0],{13:function(e,t,r){},14:function(e,t,r){},16:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(6),i=r.n(c),o=(r(13),r(14),r(7)),s=r(1),u=r.n(s),l=r(4),d=r(3),m=r(2);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(r,!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=[[640,480,"480p - 4:3"],[1280,720,"720p - 16:9"],[1920,1080,"1080p - 16:9"]],b=function(e){var t=e.height,r=e.width;return v.filter((function(e){return e[0]>=r.min&&e[0]<=r.max&&e[1]>=t.min&&e[1]<=t.max})).map((function(e){return{label:e[2],width:{exact:e[0]},height:{exact:e[1]}}}))};var E=function(e,t){var r=e.cameraList,n=e.selected,a=t.type,c=t.id,i=t.list,o=t.resolution;switch(a){case"SET_LIST":return{cameraList:i,selected:0};case"SELECT":return{cameraList:Object(m.a)(r),selected:c};case"SELECT_RES":return r[n].selectedRes=r[n].resolutions[o],{cameraList:Object(m.a)(r),selected:n};default:return{cameraList:Object(m.a)(r),selected:n}}},g=function(e,t){var r=e.stream,n=e.permitted,a=t.type,c=t.newstream;switch(a){case"SET_STREAM":return{stream:c,permitted:!0};case"RESET_STREAM":return{stream:null,permitted:n};default:return{stream:r,permitted:n}}},h=function(e){var t=e.children,r=Object(n.useReducer)(E,{cameraList:[],selected:null}),c=Object(d.a)(r,2),i=c[0],o=i.selected,s=i.cameraList,m=c[1],f=Object(n.useReducer)(g,{stream:null,permitted:!1}),v=Object(d.a)(f,2),h=v[0],w=h.stream,O=h.permitted,j=v[1],y=Object(n.useState)(null),S=Object(d.a)(y,2),k=S[0],x=S[1],T=Object(n.useCallback)((function(){x(null),w&&w.getTracks().forEach((function(e){return e.stop()}))}),[w]);return Object(n.useEffect)((function(){return function(){var e=Object(l.a)(u.a.mark((function e(){var t,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("mediaDevices"in navigator&&"enumerateDevices"in navigator.mediaDevices)){e.next=13;break}return e.prev=1,e.next=4,navigator.mediaDevices.enumerateDevices();case 4:t=e.sent,r=[],t.forEach((function(e){if("videoinput"===e.kind){var t=b(e.getCapabilities());r.push({label:e.label,deviceId:e.deviceId,resolutions:t,selectedRes:t[t.length-1]})}})),m({type:"SET_LIST",list:r}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),x(new Error("Camera Error!"));case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}()(),T}),[O]),Object(n.useEffect)((function(){var e=s.length&&o>-1?s[o]:void 0;if(e)return function(){var t=Object(l.a)(u.a.mark((function t(){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)||!e){t.next=13;break}return t.prev=1,t.next=4,navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:e.deviceId},width:p({},e.selectedRes.width)}});case 4:r=t.sent,j({type:"SET_STREAM",newstream:r}),t.next=11;break;case 8:return t.prev=8,t.t0=t.catch(1),t.abrupt("return",x(new Error("Please allow us to use the camera.")));case 11:t.next=14;break;case 13:return t.abrupt("return",x(new Error("No camera device was found!")));case 14:case 15:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(){return t.apply(this,arguments)}}()(),T}),[o,s]),k?a.a.createElement("span",null,k.message):a.a.createElement(a.a.Fragment,null,!!s.length&&o>-1&&a.a.createElement(a.a.Fragment,null,a.a.createElement("select",{onChange:function(e){m({type:"SELECT",id:e.target.value}),console.log(w)}},s.map((function(e,t){return a.a.createElement("option",{key:e.deviceId,value:t},e.label)}))),a.a.createElement("select",{defaultValue:s[o].resolutions.indexOf(s[o].selectedRes),onChange:function(e){m({type:"SELECT_RES",id:o,resolution:e.target.value}),console.log(w)}},s[o].resolutions.map((function(e,t){return a.a.createElement("option",{key:e.label,value:t},e.label)})))),t({stream:w}))},w=function(e){var t=e.stream,r=Object(n.useRef)(null);return Object(n.useEffect)((function(){t&&(r.current.srcObject=t)}),[t]),a.a.createElement("div",null,a.a.createElement("video",{ref:r,autoPlay:!0}))};var O=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(h,null,(function(e){var t=e.stream;return a.a.createElement(w,{stream:t})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,r){e.exports=r(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.e02d0898.chunk.js.map