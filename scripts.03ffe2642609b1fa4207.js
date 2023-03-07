function replaceRestrictedSymbolsInner(t){return t.replaceAll(".","").replaceAll("#","").replaceAll("$","").replaceAll("[","").replaceAll("]","").replaceAll("/","").replaceAll("\\n","").replaceAll("&quot;").replaceAll("'")}!function(t,e,n,i){"use strict";function r(t,e,n){return setTimeout(u(t,n),e)}function s(t,e,n){return!!Array.isArray(t)&&(o(t,n[e],n),!0)}function o(t,e,n){var r;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==i)for(r=0;r<t.length;)e.call(n,t[r],r,t),r++;else for(r in t)t.hasOwnProperty(r)&&e.call(n,t[r],r,t)}function a(e,n,i){var r="DEPRECATED METHOD: "+n+"\n"+i+" AT \n";return function(){var n=new Error("get-stack-trace"),i=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=t.console&&(t.console.warn||t.console.log);return s&&s.call(t.console,r,i),e.apply(this,arguments)}}function h(t,e,n){var i,r=e.prototype;(i=t.prototype=Object.create(r)).constructor=t,i._super=r,n&&it(i,n)}function u(t,e){return function(){return t.apply(e,arguments)}}function c(t,e){return typeof t==ot?t.apply(e&&e[0]||i,e):t}function l(t,e){return t===i?e:t}function p(t,e,n){o(m(e),(function(e){t.addEventListener(e,n,!1)}))}function f(t,e,n){o(m(e),(function(e){t.removeEventListener(e,n,!1)}))}function d(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function v(t,e){return t.indexOf(e)>-1}function m(t){return t.trim().split(/\s+/g)}function g(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function T(t){return Array.prototype.slice.call(t,0)}function y(t,e,n){for(var i=[],r=[],s=0;s<t.length;){var o=e?t[s][e]:t[s];g(r,o)<0&&i.push(t[s]),r[s]=o,s++}return n&&(i=e?i.sort((function(t,n){return t[e]>n[e]})):i.sort()),i}function E(t,e){for(var n,r,s=e[0].toUpperCase()+e.slice(1),o=0;o<rt.length;){if((r=(n=rt[o])?n+s:e)in t)return r;o++}return i}function A(e){var n=e.ownerDocument||e;return n.defaultView||n.parentWindow||t}function I(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){c(t.options.enable,[t])&&n.handler(e)},this.init()}function S(t,e,n){var i=n.pointers.length,r=n.changedPointers.length,s=e&yt&&i-r==0,o=e&(At|It)&&i-r==0;n.isFirst=!!s,n.isFinal=!!o,s&&(t.session={}),n.eventType=e,function(t,e){var n=t.session,i=e.pointers,r=i.length;n.firstInput||(n.firstInput=b(e)),r>1&&!n.firstMultiple?n.firstMultiple=b(e):1===r&&(n.firstMultiple=!1);var s=n.firstInput,o=n.firstMultiple,a=o?o.center:s.center,h=e.center=C(i);e.timeStamp=ut(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=w(a,h),e.distance=x(a,h),function(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};e.eventType!==yt&&s.eventType!==At||(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}(n,e),e.offsetDirection=D(e.deltaX,e.deltaY);var u=P(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=u.x,e.overallVelocityY=u.y,e.overallVelocity=ht(u.x)>ht(u.y)?u.x:u.y,e.scale=o?function(t,e){return x(e[0],e[1],Ot)/x(t[0],t[1],Ot)}(o.pointers,i):1,e.rotation=o?function(t,e){return w(e[1],e[0],Ot)+w(t[1],t[0],Ot)}(o.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,_(n,e);var c=t.element;d(e.srcEvent.target,c)&&(c=e.srcEvent.target),e.target=c}(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function _(t,e){var n,r,s,o,a=t.lastInterval||e,h=e.timeStamp-a.timeStamp;if(e.eventType!=It&&(h>Tt||a.velocity===i)){var u=e.deltaX-a.deltaX,c=e.deltaY-a.deltaY,l=P(h,u,c);r=l.x,s=l.y,n=ht(l.x)>ht(l.y)?l.x:l.y,o=D(u,c),t.lastInterval=e}else n=a.velocity,r=a.velocityX,s=a.velocityY,o=a.direction;e.velocity=n,e.velocityX=r,e.velocityY=s,e.direction=o}function b(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:at(t.pointers[n].clientX),clientY:at(t.pointers[n].clientY)},n++;return{timeStamp:ut(),pointers:e,center:C(e),deltaX:t.deltaX,deltaY:t.deltaY}}function C(t){var e=t.length;if(1===e)return{x:at(t[0].clientX),y:at(t[0].clientY)};for(var n=0,i=0,r=0;e>r;)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:at(n/e),y:at(i/e)}}function P(t,e,n){return{x:e/t||0,y:n/t||0}}function D(t,e){return t===e?St:ht(t)>=ht(e)?0>t?_t:bt:0>e?Ct:Pt}function x(t,e,n){n||(n=Rt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function w(t,e,n){return n||(n=Rt),180*Math.atan2(e[n[1]]-t[n[1]],e[n[0]]-t[n[0]])/Math.PI}function R(){this.evEl=zt,this.evWin=Nt,this.pressed=!1,I.apply(this,arguments)}function O(){this.evEl=Ft,this.evWin=qt,I.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function M(){this.evTarget=kt,this.evWin=Ht,this.started=!1,I.apply(this,arguments)}function z(t,e){var n=T(t.touches),i=T(t.changedTouches);return e&(At|It)&&(n=y(n.concat(i),"identifier",!0)),[n,i]}function N(){this.evTarget=Ut,this.targetIds={},I.apply(this,arguments)}function X(t,e){var n=T(t.touches),i=this.targetIds;if(e&(yt|Et)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,s,o=T(t.changedTouches),a=[],h=this.target;if(s=n.filter((function(t){return d(t.target,h)})),e===yt)for(r=0;r<s.length;)i[s[r].identifier]=!0,r++;for(r=0;r<o.length;)i[o[r].identifier]&&a.push(o[r]),e&(At|It)&&delete i[o[r].identifier],r++;return a.length?[y(s.concat(a),"identifier",!0),a]:void 0}function Y(){I.apply(this,arguments);var t=u(this.handler,this);this.touch=new N(this.manager,t),this.mouse=new R(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function F(t,e){t&yt?(this.primaryTouch=e.changedPointers[0].identifier,q.call(this,e)):t&(At|It)&&q.call(this,e)}function q(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches;setTimeout((function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)}),Vt)}}function W(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var r=this.lastTouches[i],s=Math.abs(e-r.x),o=Math.abs(n-r.y);if(jt>=s&&jt>=o)return!0}return!1}function k(t,e){this.manager=t,this.set(e)}function H(t){this.options=it({},this.defaults,t||{}),this.id=pt++,this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=ee,this.simultaneous={},this.requireFail=[]}function L(t){return t&oe?"cancel":t&re?"end":t&ie?"move":t&ne?"start":""}function U(t){return t==Pt?"down":t==Ct?"up":t==_t?"left":t==bt?"right":""}function V(t,e){var n=e.manager;return n?n.get(t):t}function j(){H.apply(this,arguments)}function G(){j.apply(this,arguments),this.pX=null,this.pY=null}function Z(){j.apply(this,arguments)}function B(){H.apply(this,arguments),this._timer=null,this._input=null}function $(){j.apply(this,arguments)}function J(){j.apply(this,arguments)}function K(){H.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function Q(t,e){return(e=e||{}).recognizers=l(e.recognizers,Q.defaults.preset),new tt(t,e)}function tt(t,e){this.options=it({},Q.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=function(t){return new(t.options.inputClass||(dt?O:vt?N:ft?Y:R))(t,S)}(this),this.touchAction=new k(this,this.options.touchAction),et(this,!0),o(this.options.recognizers,(function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])}),this)}function et(t,e){var n,i=t.element;i.style&&(o(t.options.cssProps,(function(r,s){n=E(i.style,s),e?(t.oldCssProps[n]=i.style[n],i.style[n]=r):i.style[n]=t.oldCssProps[n]||""})),e||(t.oldCssProps={}))}function nt(t,n){var i=e.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=n,n.target.dispatchEvent(i)}var it,rt=["","webkit","Moz","MS","ms","o"],st=e.createElement("div"),ot="function",at=Math.round,ht=Math.abs,ut=Date.now;it="function"!=typeof Object.assign?function(t){if(t===i||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(r!==i&&null!==r)for(var s in r)r.hasOwnProperty(s)&&(e[s]=r[s])}return e}:Object.assign;var ct=a((function(t,e,n){for(var r=Object.keys(e),s=0;s<r.length;)(!n||n&&t[r[s]]===i)&&(t[r[s]]=e[r[s]]),s++;return t}),"extend","Use `assign`."),lt=a((function(t,e){return ct(t,e,!0)}),"merge","Use `assign`."),pt=1,ft="ontouchstart"in t,dt=E(t,"PointerEvent")!==i,vt=ft&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),mt="touch",gt="mouse",Tt=25,yt=1,Et=2,At=4,It=8,St=1,_t=2,bt=4,Ct=8,Pt=16,Dt=_t|bt,xt=Ct|Pt,wt=Dt|xt,Rt=["x","y"],Ot=["clientX","clientY"];I.prototype={handler:function(){},init:function(){this.evEl&&p(this.element,this.evEl,this.domHandler),this.evTarget&&p(this.target,this.evTarget,this.domHandler),this.evWin&&p(A(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(A(this.element),this.evWin,this.domHandler)}};var Mt={mousedown:yt,mousemove:Et,mouseup:At},zt="mousedown",Nt="mousemove mouseup";h(R,I,{handler:function(t){var e=Mt[t.type];e&yt&&0===t.button&&(this.pressed=!0),e&Et&&1!==t.which&&(e=At),this.pressed&&(e&At&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:gt,srcEvent:t}))}});var Xt={pointerdown:yt,pointermove:Et,pointerup:At,pointercancel:It,pointerout:It},Yt={2:mt,3:"pen",4:gt,5:"kinect"},Ft="pointerdown",qt="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(Ft="MSPointerDown",qt="MSPointerMove MSPointerUp MSPointerCancel"),h(O,I,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=Xt[i],s=Yt[t.pointerType]||t.pointerType,o=s==mt,a=g(e,t.pointerId,"pointerId");r&yt&&(0===t.button||o)?0>a&&(e.push(t),a=e.length-1):r&(At|It)&&(n=!0),0>a||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),n&&e.splice(a,1))}});var Wt={touchstart:yt,touchmove:Et,touchend:At,touchcancel:It},kt="touchstart",Ht="touchstart touchmove touchend touchcancel";h(M,I,{handler:function(t){var e=Wt[t.type];if(e===yt&&(this.started=!0),this.started){var n=z.call(this,t,e);e&(At|It)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:mt,srcEvent:t})}}});var Lt={touchstart:yt,touchmove:Et,touchend:At,touchcancel:It},Ut="touchstart touchmove touchend touchcancel";h(N,I,{handler:function(t){var e=Lt[t.type],n=X.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:mt,srcEvent:t})}});var Vt=2500,jt=25;h(Y,I,{handler:function(t,e,n){var i=n.pointerType==gt;if(!(i&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(n.pointerType==mt)F.call(this,e,n);else if(i&&W.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Gt=E(st.style,"touchAction"),Zt=Gt!==i,Bt="compute",$t="manipulation",Jt="none",Kt="pan-x",Qt="pan-y",te=function(){if(!Zt)return!1;var e={},n=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach((function(i){e[i]=!n||t.CSS.supports("touch-action",i)})),e}();k.prototype={set:function(t){t==Bt&&(t=this.compute()),Zt&&this.manager.element.style&&te[t]&&(this.manager.element.style[Gt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return o(this.manager.recognizers,(function(e){c(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))})),function(t){if(v(t,Jt))return Jt;var e=v(t,Kt),n=v(t,Qt);return e&&n?Jt:e||n?e?Kt:Qt:v(t,$t)?$t:"auto"}(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(!this.manager.session.prevented){var i=this.actions,r=v(i,Jt)&&!te[Jt],s=v(i,Qt)&&!te[Qt],o=v(i,Kt)&&!te[Kt];if(r&&1===t.pointers.length&&t.distance<2&&t.deltaTime<250)return;return o&&s?void 0:r||s&&n&Dt||o&&n&xt?this.preventSrc(e):void 0}e.preventDefault()},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ee=1,ne=2,ie=4,re=8,se=re,oe=16;H.prototype={defaults:{},set:function(t){return it(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(s(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=V(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return s(t,"dropRecognizeWith",this)?this:(t=V(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(s(t,"requireFailure",this))return this;var e=this.requireFail;return-1===g(e,t=V(t,this))&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(s(t,"dropRequireFailure",this))return this;t=V(t,this);var e=g(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;re>i&&e(n.options.event+L(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=re&&e(n.options.event+L(i))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=32)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|ee)))return!1;t++}return!0},recognize:function(t){var e=it({},t);return c(this.options.enable,[this,e])?(this.state&(se|oe|32)&&(this.state=ee),this.state=this.process(e),void(this.state&(ne|ie|re|oe)&&this.tryEmit(e))):(this.reset(),void(this.state=32))},process:function(t){},getTouchAction:function(){},reset:function(){}},h(j,H,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(ne|ie),r=this.attrTest(t);return i&&(n&It||!r)?e|oe:i||r?n&At?e|re:e&ne?e|ie:ne:32}}),h(G,j,{defaults:{event:"pan",threshold:10,pointers:1,direction:wt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Dt&&e.push(Qt),t&xt&&e.push(Kt),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&Dt?(r=0===s?St:0>s?_t:bt,n=s!=this.pX,i=Math.abs(t.deltaX)):(r=0===o?St:0>o?Ct:Pt,n=o!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return j.prototype.attrTest.call(this,t)&&(this.state&ne||!(this.state&ne)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=U(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),h(Z,j,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Jt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ne)},emit:function(t){1!==t.scale&&(t.additionalEvent=this.options.event+(t.scale<1?"in":"out")),this._super.emit.call(this,t)}}),h(B,H,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return["auto"]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,s=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(At|It)&&!s)this.reset();else if(t.eventType&yt)this.reset(),this._timer=r((function(){this.state=se,this.tryEmit()}),e.time,this);else if(t.eventType&At)return se;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===se&&(t&&t.eventType&At?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=ut(),this.manager.emit(this.options.event,this._input)))}}),h($,j,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Jt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ne)}}),h(J,j,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Dt|xt,pointers:1},getTouchAction:function(){return G.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Dt|xt)?e=t.overallVelocity:n&Dt?e=t.overallVelocityX:n&xt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&ht(e)>this.options.velocity&&t.eventType&At},emit:function(t){var e=U(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),h(K,H,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[$t]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,s=t.deltaTime<e.time;if(this.reset(),t.eventType&yt&&0===this.count)return this.failTimeout();if(i&&s&&n){if(t.eventType!=At)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||x(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,a&&o?this.count+=1:this.count=1,this._input=t,0==this.count%e.taps)return this.hasRequireFailures()?(this._timer=r((function(){this.state=se,this.tryEmit()}),e.interval,this),ne):se}return 32},failTimeout:function(){return this._timer=r((function(){this.state=32}),this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==se&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),Q.VERSION="2.0.7",Q.defaults={domEvents:!1,touchAction:Bt,enable:!0,inputTarget:null,inputClass:null,preset:[[$,{enable:!1}],[Z,{enable:!1},["rotate"]],[J,{direction:Dt}],[G,{direction:Dt},["swipe"]],[K],[K,{event:"doubletap",taps:2},["tap"]],[B]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},tt.prototype={set:function(t){return it(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&se)&&(r=e.curRecognizer=null);for(var s=0;s<i.length;)n=i[s],2===e.stopped||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(ne|ie|re)&&(r=e.curRecognizer=n),s++}},get:function(t){if(t instanceof H)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(s(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(s(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=g(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==i&&e!==i){var n=this.handlers;return o(m(t),(function(t){n[t]=n[t]||[],n[t].push(e)})),this}},off:function(t,e){if(t!==i){var n=this.handlers;return o(m(t),(function(t){e?n[t]&&n[t].splice(g(n[t],e),1):delete n[t]})),this}},emit:function(t,e){this.options.domEvents&&nt(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&et(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},it(Q,{INPUT_START:yt,INPUT_MOVE:Et,INPUT_END:At,INPUT_CANCEL:It,STATE_POSSIBLE:ee,STATE_BEGAN:ne,STATE_CHANGED:ie,STATE_ENDED:re,STATE_RECOGNIZED:se,STATE_CANCELLED:oe,STATE_FAILED:32,DIRECTION_NONE:St,DIRECTION_LEFT:_t,DIRECTION_RIGHT:bt,DIRECTION_UP:Ct,DIRECTION_DOWN:Pt,DIRECTION_HORIZONTAL:Dt,DIRECTION_VERTICAL:xt,DIRECTION_ALL:wt,Manager:tt,Input:I,TouchAction:k,TouchInput:N,MouseInput:R,PointerEventInput:O,TouchMouseInput:Y,SingleTouchInput:M,Recognizer:H,AttrRecognizer:j,Tap:K,Pan:G,Swipe:J,Pinch:Z,Rotate:$,Press:B,on:p,off:f,each:o,merge:lt,extend:ct,assign:it,inherit:h,bindFn:u,prefixed:E}),(void 0!==t?t:"undefined"!=typeof self?self:{}).Hammer=Q,"function"==typeof define&&define.amd?define((function(){return Q})):"undefined"!=typeof module&&module.exports?module.exports=Q:t.Hammer=Q}(window,document),String.prototype.replaceAll=function(t,e){return this.split(t).join(e)};