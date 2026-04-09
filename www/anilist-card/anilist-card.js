/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C$1=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C$1.get(t.strings);return void 0===i&&C$1.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

// ─── AniList Brand Colors ────────────────────────────────────────────────────
const C = {
    blue: "#3DB4F2",
    purple: "#C063FF",
    dark: "#0D1117",
    cardBg: "#1A1A2E",
    cardBg2: "#16213E",
    text: "#E8E8E8",
    subtext: "#9B9B9B",
    border: "rgba(61,180,242,0.15)"};
// ─── Helpers ─────────────────────────────────────────────────────────────────
function countdown(isoOrTs) {
    const target = typeof isoOrTs === "number" ? isoOrTs * 1000 : new Date(isoOrTs).getTime();
    const diff = target - Date.now();
    if (diff <= 0)
        return "Aired";
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    if (h >= 24) {
        const d = Math.floor(h / 24);
        return `in ${d}d ${h % 24}h`;
    }
    return h > 0 ? `in ${h}h ${m}m` : `in ${m}m`;
}
function getEntityAttr(hass, entityId, attr) {
    var _a, _b;
    return (_b = (_a = hass.states[entityId]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b[attr];
}
function getEntityState(hass, entityId) {
    var _a, _b;
    return (_b = (_a = hass.states[entityId]) === null || _a === void 0 ? void 0 : _a.state) !== null && _b !== void 0 ? _b : "";
}
// ─── Card Element ─────────────────────────────────────────────────────────────
class AniListCard extends i {
    static getConfigElement() {
        return document.createElement("anilist-card-editor");
    }
    static getStubConfig() {
        return { type: "custom:anilist-card", view: "airing", max_items: 5 };
    }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid config");
        this._config = {
            view: "airing",
            max_items: 5,
            show_cover: true,
            show_countdown: true,
            show_progress: true,
            link_to_anilist: true,
            ...config,
        };
    }
    connectedCallback() {
        super.connectedCallback();
        // Refresh countdown every minute
        this._tick = setInterval(() => this.requestUpdate(), 60000);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this._tick);
    }
    render() {
        var _a, _b;
        if (!this._config || !this.hass)
            return A;
        const view = (_a = this._config.view) !== null && _a !== void 0 ? _a : "airing";
        const title = (_b = this._config.title) !== null && _b !== void 0 ? _b : this._defaultTitle(view);
        return b `
      <div class="card">
        <div class="card-header">
          <span class="brand-dot"></span>
          <span class="header-title">${title}</span>
          <a
            class="header-link"
            href="https://anilist.co"
            target="_blank"
            rel="noopener"
          >AniList ↗</a>
        </div>
        <div class="card-content">
          ${view === "airing" ? this._renderAiring() : A}
          ${view === "watchlist" ? this._renderWatchlist() : A}
          ${view === "season" ? this._renderSeason() : A}
          ${view === "profile" ? this._renderProfile() : A}
        </div>
      </div>
    `;
    }
    // ─── View: Airing ──────────────────────────────────────────────────────────
    _renderAiring() {
        // Collect all airing entities from the coordinator via calendar events
        // We read from the airing_schedule sensor attribute if available,
        // falling back to individual sensor states
        const items = this._getAiringItems();
        if (!items.length) {
            return b `<div class="empty">Keine Episoden in den nächsten Tagen.</div>`;
        }
        return b `
      <div class="list">
        ${items.map((item) => b `
          <div
            class="list-item"
            @click=${() => item.site_url && this._config.link_to_anilist
            ? window.open(item.site_url, "_blank", "noopener")
            : undefined}
            style=${item.site_url && this._config.link_to_anilist ? "cursor:pointer" : ""}
          >
            ${this._config.show_cover && item.cover_image
            ? b `<img class="cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
            : b `<div class="cover cover-placeholder"><span>?</span></div>`}
            <div class="item-info">
              <div class="item-title">${item.title}</div>
              <div class="item-sub">Episode ${item.episode}</div>
              ${this._config.show_countdown
            ? b `<div class="countdown">${countdown(item.airing_at)}</div>`
            : A}
            </div>
          </div>
        `)}
      </div>
    `;
    }
    _getAiringItems() {
        var _a;
        const max = (_a = this._config.max_items) !== null && _a !== void 0 ? _a : 5;
        // Try to get next_episode data from HA entities
        const items = [];
        // Primary: check if there's a next_episode_title sensor with extra attrs
        Object.entries(this.hass.states)
            .filter(([id]) => id.startsWith("sensor.anilist_"))
            .forEach(([_id, entity]) => {
            const attrs = entity.attributes;
            // Look for airing_schedule attribute (list of upcoming episodes)
            if (Array.isArray(attrs["airing_schedule"])) {
                attrs["airing_schedule"]
                    .slice(0, max)
                    .forEach((ep) => {
                    var _a, _b, _c;
                    items.push({
                        title: String((_a = ep["title"]) !== null && _a !== void 0 ? _a : ""),
                        episode: Number((_b = ep["episode"]) !== null && _b !== void 0 ? _b : 0),
                        airing_at: String((_c = ep["airing_at"]) !== null && _c !== void 0 ? _c : ""),
                        cover_image: ep["cover_image"],
                        site_url: ep["site_url"],
                    });
                });
            }
        });
        // Fallback: use next_episode_title + next_episode_time sensors
        if (!items.length) {
            const title = getEntityState(this.hass, "sensor.anilist_nachster_anime") ||
                getEntityState(this.hass, "sensor.anilist_next_airing_anime");
            const time = getEntityState(this.hass, "sensor.anilist_nachste_episode_um") ||
                getEntityState(this.hass, "sensor.anilist_next_episode_time");
            if (title && title !== "unknown") {
                items.push({ title, episode: 1, airing_at: time });
            }
        }
        return items.slice(0, max);
    }
    // ─── View: Watchlist ────────────────────────────────────────────────────────
    _renderWatchlist() {
        const items = this._getWatchlistItems();
        if (!items.length) {
            return b `<div class="empty">Keine Anime in der Watchlist.</div>`;
        }
        return b `
      <div class="grid">
        ${items.map((item) => b `
          <div
            class="grid-item"
            @click=${() => item.site_url && this._config.link_to_anilist
            ? window.open(item.site_url, "_blank", "noopener")
            : undefined}
            style=${item.site_url && this._config.link_to_anilist ? "cursor:pointer" : ""}
          >
            <div class="grid-cover-wrap">
              ${item.cover_image
            ? b `<img class="grid-cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
            : b `<div class="grid-cover cover-placeholder"><span>${item.title[0]}</span></div>`}
              ${item.score
            ? b `<span class="score-badge">${item.score}</span>`
            : A}
            </div>
            <div class="grid-title">${item.title}</div>
            ${this._config.show_progress && item.episodes
            ? b `
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    style="width:${Math.min(100, (item.progress / item.episodes) * 100)}%"
                  ></div>
                </div>
                <div class="progress-label">${item.progress}/${item.episodes}</div>
              `
            : item.progress
                ? b `<div class="progress-label">Ep. ${item.progress}</div>`
                : A}
          </div>
        `)}
      </div>
    `;
    }
    _getWatchlistItems() {
        var _a;
        const max = (_a = this._config.max_items) !== null && _a !== void 0 ? _a : 10;
        const items = [];
        Object.entries(this.hass.states)
            .filter(([id]) => id.startsWith("sensor.anilist_"))
            .forEach(([_id, entity]) => {
            const attrs = entity.attributes;
            if (Array.isArray(attrs["watchlist"])) {
                attrs["watchlist"]
                    .filter((e) => e["status"] === "CURRENT")
                    .slice(0, max)
                    .forEach((e) => {
                    var _a, _b;
                    items.push({
                        title: String((_a = e["title"]) !== null && _a !== void 0 ? _a : ""),
                        progress: Number((_b = e["progress"]) !== null && _b !== void 0 ? _b : 0),
                        episodes: e["episodes"],
                        score: e["score"],
                        cover_image: e["cover_image"],
                        site_url: e["site_url"],
                    });
                });
            }
        });
        // Fallback: show watching_count sensor info
        if (!items.length) {
            const count = getEntityState(this.hass, "sensor.anilist_schaue_ich_gerade") ||
                getEntityState(this.hass, "sensor.anilist_watching_count");
            if (count && count !== "unknown") {
                return [{
                        title: `${count} Anime in der Watchlist`,
                        progress: 0,
                    }];
            }
        }
        return items.slice(0, max);
    }
    // ─── View: Season ───────────────────────────────────────────────────────────
    _renderSeason() {
        const items = this._getSeasonItems();
        if (!items.length) {
            return b `<div class="empty">Keine Season-Daten verfügbar.</div>`;
        }
        return b `
      <div class="season-scroll">
        ${items.map((item) => b `
          <div
            class="season-item"
            @click=${() => item.site_url && this._config.link_to_anilist
            ? window.open(item.site_url, "_blank", "noopener")
            : undefined}
            style=${item.site_url && this._config.link_to_anilist ? "cursor:pointer" : ""}
          >
            ${item.cover_image
            ? b `<img class="season-cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
            : b `<div class="season-cover cover-placeholder"><span>${item.title[0]}</span></div>`}
            <div class="season-info">
              <div class="season-title">${item.title}</div>
              <div class="season-meta">
                ${item.average_score
            ? b `<span class="score-chip">${item.average_score}%</span>`
            : A}
                ${item.format ? b `<span class="format-chip">${item.format}</span>` : A}
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
    }
    _getSeasonItems() {
        var _a;
        const max = (_a = this._config.max_items) !== null && _a !== void 0 ? _a : 10;
        const items = [];
        Object.entries(this.hass.states)
            .filter(([id]) => id.startsWith("sensor.anilist_"))
            .forEach(([_id, entity]) => {
            const attrs = entity.attributes;
            if (Array.isArray(attrs["season_anime"])) {
                attrs["season_anime"]
                    .slice(0, max)
                    .forEach((a) => {
                    var _a;
                    items.push({
                        title: String((_a = a["title"]) !== null && _a !== void 0 ? _a : ""),
                        average_score: a["average_score"],
                        format: a["format"],
                        cover_image: a["cover_image"],
                        site_url: a["site_url"],
                    });
                });
            }
        });
        return items.slice(0, max);
    }
    // ─── View: Profile ──────────────────────────────────────────────────────────
    _renderProfile() {
        const animeCount = getEntityState(this.hass, "sensor.anilist_anime_gesamt_geschaut") ||
            getEntityState(this.hass, "sensor.anilist_total_anime_watched");
        const episodes = getEntityState(this.hass, "sensor.anilist_episoden_gesamt") ||
            getEntityState(this.hass, "sensor.anilist_total_episodes_watched");
        const hours = getEntityState(this.hass, "sensor.anilist_stunden_gesamt") ||
            getEntityState(this.hass, "sensor.anilist_total_hours_watched");
        const score = getEntityState(this.hass, "sensor.anilist_anime_durchschnittsscore") ||
            getEntityState(this.hass, "sensor.anilist_anime_mean_score");
        const topGenres = (getEntityAttr(this.hass, "sensor.anilist_top_genre", "top_genres") ||
            getEntityAttr(this.hass, "sensor.anilist_top_genre", "top_genres") ||
            []);
        const favourites = (getEntityAttr(this.hass, "sensor.anilist_top_genre", "favourite_anime") ||
            []);
        const watching = getEntityState(this.hass, "sensor.anilist_schaue_ich_gerade") ||
            getEntityState(this.hass, "sensor.anilist_watching_count");
        const hasStats = animeCount && animeCount !== "unknown";
        if (!hasStats) {
            return b `
        <div class="empty">Keine Profil-Statistiken verfügbar.<br />Nur für eingeloggte Nutzer.</div>
      `;
        }
        return b `
      <div class="profile">
        <div class="profile-header">
          <div class="profile-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <div class="profile-title">AniList Profil</div>
        </div>

        <div class="stats-grid">
          ${this._statTile("Anime", animeCount, "mdi:television-classic")}
          ${this._statTile("Episoden", episodes, "mdi:play-circle")}
          ${this._statTile("Stunden", hours, "mdi:clock")}
          ${this._statTile("Score Ø", score, "mdi:star")}
          ${watching && watching !== "unknown"
            ? this._statTile("Schaue ich", watching, "mdi:eye")
            : A}
        </div>

        ${topGenres.length
            ? b `
            <div class="section-label">Top Genres</div>
            <div class="genre-chips">
              ${topGenres.slice(0, 5).map((g) => b `<span class="genre-chip">${g}</span>`)}
            </div>
          `
            : A}

        ${favourites.length
            ? b `
            <div class="section-label">Favoriten</div>
            <div class="fav-list">
              ${favourites.slice(0, 3).map((f) => b `
                <div
                  class="fav-item"
                  @click=${() => f.site_url && this._config.link_to_anilist
                ? window.open(f.site_url, "_blank", "noopener")
                : undefined}
                  style=${f.site_url ? "cursor:pointer" : ""}
                >
                  ${f.cover
                ? b `<img class="fav-cover" src=${f.cover} alt=${f.title} loading="lazy" />`
                : A}
                  <span class="fav-title">${f.title}</span>
                </div>
              `)}
            </div>
          `
            : A}
      </div>
    `;
    }
    _statTile(label, value, _icon) {
        return b `
      <div class="stat-tile">
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
    }
    _defaultTitle(view) {
        var _a;
        const titles = {
            airing: "Nächste Episoden",
            watchlist: "Schaue ich gerade",
            season: "Diese Season",
            profile: "AniList Profil",
        };
        return (_a = titles[view]) !== null && _a !== void 0 ? _a : "AniList";
    }
}
// ─── Styles ────────────────────────────────────────────────────────────────
AniListCard.styles = i$3 `
    :host {
      display: block;
      --al-blue: ${r$4(C.blue)};
      --al-purple: ${r$4(C.purple)};
      --al-dark: ${r$4(C.dark)};
      --al-bg: ${r$4(C.cardBg)};
      --al-bg2: ${r$4(C.cardBg2)};
      --al-text: ${r$4(C.text)};
      --al-sub: ${r$4(C.subtext)};
      --al-border: ${r$4(C.border)};
    }

    .card {
      background: var(--al-bg);
      border: 1px solid var(--al-border);
      border-radius: 12px;
      overflow: hidden;
      font-family: var(--primary-font-family, sans-serif);
      color: var(--al-text);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: var(--al-bg2);
      border-bottom: 1px solid var(--al-border);
    }

    .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-blue), var(--al-purple));
      flex-shrink: 0;
    }

    .header-title {
      flex: 1;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--al-text);
    }

    .header-link {
      font-size: 0.75rem;
      color: var(--al-blue);
      text-decoration: none;
      opacity: 0.8;
    }
    .header-link:hover { opacity: 1; }

    .card-content { padding: 12px; }

    .empty {
      text-align: center;
      color: var(--al-sub);
      padding: 24px 12px;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    /* ─── List view (airing) ───────────────────────────────────────────── */
    .list { display: flex; flex-direction: column; gap: 8px; }

    .list-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .list-item:hover { border-color: rgba(61,180,242,0.4); }

    .cover {
      width: 48px;
      height: 68px;
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .cover-placeholder {
      width: 48px;
      height: 68px;
      border-radius: 4px;
      background: linear-gradient(135deg, var(--al-blue)22, var(--al-purple)22);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--al-sub);
      font-weight: bold;
      flex-shrink: 0;
    }

    .item-info { flex: 1; min-width: 0; }

    .item-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--al-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-sub {
      font-size: 0.78rem;
      color: var(--al-sub);
      margin-top: 2px;
    }

    .countdown {
      margin-top: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--al-blue);
    }

    /* ─── Grid view (watchlist) ───────────────────────────────────────── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 10px;
    }

    .grid-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .grid-item:hover { border-color: rgba(61,180,242,0.4); }

    .grid-cover-wrap { position: relative; }

    .grid-cover {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
      display: block;
    }

    .score-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background: linear-gradient(135deg, var(--al-blue), var(--al-purple));
      color: #fff;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 4px;
    }

    .grid-title {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0 6px;
      color: var(--al-text);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .progress-bar {
      height: 3px;
      background: var(--al-border);
      border-radius: 2px;
      margin: 0 6px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-blue), var(--al-purple));
      border-radius: 2px;
      transition: width 0.4s;
    }

    .progress-label {
      font-size: 0.65rem;
      color: var(--al-sub);
      text-align: center;
      padding: 2px 6px 6px;
    }

    /* ─── Season scroll view ──────────────────────────────────────────── */
    .season-scroll {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--al-blue) transparent;
    }

    .season-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .season-item:hover { border-color: rgba(61,180,242,0.4); }

    .season-cover {
      width: 40px;
      height: 56px;
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .season-info { flex: 1; min-width: 0; }

    .season-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--al-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .season-meta {
      display: flex;
      gap: 4px;
      margin-top: 4px;
      flex-wrap: wrap;
    }

    .score-chip {
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--al-blue);
      background: rgba(61,180,242,0.12);
      border: 1px solid rgba(61,180,242,0.25);
      padding: 1px 5px;
      border-radius: 4px;
    }

    .format-chip {
      font-size: 0.68rem;
      color: var(--al-sub);
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 1px 5px;
      border-radius: 4px;
    }

    /* ─── Profile view ────────────────────────────────────────────────── */
    .profile { display: flex; flex-direction: column; gap: 12px; }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .profile-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-blue), var(--al-purple));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .profile-icon svg { width: 22px; height: 22px; }

    .profile-title {
      font-size: 1rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--al-blue), var(--al-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
    }

    .stat-tile {
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
    }

    .stat-value {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--al-blue);
    }

    .stat-label {
      font-size: 0.68rem;
      color: var(--al-sub);
      margin-top: 2px;
    }

    .section-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--al-sub);
    }

    .genre-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .genre-chip {
      font-size: 0.75rem;
      color: var(--al-purple);
      background: rgba(192,99,255,0.1);
      border: 1px solid rgba(192,99,255,0.25);
      padding: 3px 8px;
      border-radius: 12px;
    }

    .fav-list { display: flex; flex-direction: column; gap: 6px; }

    .fav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 6px;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .fav-item:hover { border-color: rgba(192,99,255,0.4); }

    .fav-cover {
      width: 28px;
      height: 40px;
      border-radius: 3px;
      object-fit: cover;
    }

    .fav-title {
      font-size: 0.82rem;
      color: var(--al-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
__decorate([
    n({ attribute: false })
], AniListCard.prototype, "hass", void 0);
__decorate([
    r()
], AniListCard.prototype, "_config", void 0);
customElements.define("anilist-card", AniListCard);
// Register with HA's custom card registry
window["customCards"] =
    window["customCards"] || [];
window["customCards"].push({
    type: "anilist-card",
    name: "AniList Card",
    description: "Zeigt AniList-Daten: Airing, Watchlist, Season und Profil.",
    preview: true,
});
