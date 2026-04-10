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
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

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

/** Resolve a title that may be a plain string (entity fallback) or MediaTitle object. */
function resolveTitle(title, lang = "romaji") {
    if (!title)
        return "Unknown";
    if (typeof title === "string")
        return title;
    return title[lang]
        || title.romaji
        || title.english
        || title.native
        || "Unknown";
}

const VIEWS = [
    { value: "airing", label: "Airing" },
    { value: "watchlist", label: "Watchlist" },
    { value: "season", label: "Season" },
    { value: "profile", label: "Profile" },
    { value: "manga", label: "Manga" },
];
const COVER_SIZES = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
];
const SCORE_DISPLAYS = [
    { value: "stars", label: "★ Stars" },
    { value: "bar", label: "Bar" },
    { value: "number", label: "Number" },
    { value: "none", label: "None" },
];
const COUNTDOWN_FORMATS = [
    { value: "relative", label: "Relative (5h 30m)" },
    { value: "absolute", label: "Absolute (Apr 10, 14:00)" },
    { value: "both", label: "Both" },
];
const LINK_TARGETS = [
    { value: "anilist", label: "Open AniList" },
    { value: "ha_more_info", label: "HA More-Info" },
    { value: "none", label: "No link" },
];
const SORT_OPTIONS = [
    { value: "time", label: "Time" },
    { value: "title", label: "Title" },
    { value: "score", label: "Score" },
];
const PADDING_OPTIONS = [
    { value: "compact", label: "Compact" },
    { value: "normal", label: "Normal" },
    { value: "relaxed", label: "Relaxed" },
];
const CHART_TYPES = [
    { value: "bar", label: "Bar Chart" },
    { value: "donut", label: "Donut Chart" },
    { value: "tags", label: "Tags" },
];
const OVERFLOW_MODES = [
    { value: "scroll", label: "Scrollbar" },
    { value: "limit", label: "Limit items" },
];
const LAYOUT_MODES = [
    { value: "grid", label: "Grid (Covers)" },
    { value: "list", label: "List (Rows)" },
];
const SCORE_SOURCES = [
    { value: "auto", label: "Auto (smart)" },
    { value: "user", label: "My Score" },
    { value: "average", label: "Average Score" },
];
const SCORE_POSITIONS = [
    { value: "top-right", label: "Top Right" },
    { value: "top-left", label: "Top Left" },
    { value: "bottom-right", label: "Bottom Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "inline", label: "Inline" },
    { value: "none", label: "Hidden" },
];
const COVER_QUALITIES = [
    { value: "small", label: "Small (fast)" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large / HD" },
];
const STATUS_OPTIONS = [
    { value: "CURRENT", label: "Current" },
    { value: "PLANNING", label: "Planning" },
    { value: "COMPLETED", label: "Completed" },
    { value: "PAUSED", label: "Paused" },
    { value: "DROPPED", label: "Dropped" },
];
class AniListCardEditor extends i {
    constructor() {
        super(...arguments);
        this._tab = "general";
    }
    setConfig(config) {
        this._config = { ...config };
    }
    _dispatch() {
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        }));
    }
    _set(key, value) {
        this._config = { ...this._config, [key]: value };
        this._dispatch();
    }
    _val(key) {
        return this._config[key];
    }
    render() {
        if (!this._config)
            return A;
        return b `
      <div class="editor">
        <div class="tabs">
          ${["general", "view", "colors"].map((t) => b `
              <button
                class="tab ${this._tab === t ? "active" : ""}"
                @click=${() => { this._tab = t; }}
              >${this._tabLabel(t)}</button>
            `)}
        </div>
        <div class="tab-content">
          ${this._tab === "general" ? this._renderGeneral() : A}
          ${this._tab === "view" ? this._renderViewSettings() : A}
          ${this._tab === "colors" ? this._renderColors() : A}
        </div>
      </div>
    `;
    }
    _tabLabel(t) {
        var _a, _b, _c;
        const view = (_a = this._config.view) !== null && _a !== void 0 ? _a : "airing";
        const viewLabel = (_c = (_b = VIEWS.find((v) => v.value === view)) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : "View";
        const labels = {
            general: "General",
            view: viewLabel,
            colors: "Colors",
        };
        return labels[t];
    }
    // ─── General tab (shared settings) ──────────────────────────────────────
    _renderGeneral() {
        return b `
      <div class="section">
        ${this._select("view", "View", VIEWS)}
        ${this._text("title", "Title (optional)")}
        ${this._text("entry_id", "Config Entry ID (optional, for multi-account)")}
        ${this._select("card_padding", "Card spacing", PADDING_OPTIONS)}
        ${this._select("link_target", "Click action", LINK_TARGETS)}
        ${this._toggle("show_cover", "Show cover images")}
        ${this._config.show_cover !== false ? this._select("cover_size", "Cover size", COVER_SIZES) : A}
        ${this._select("cover_quality", "Cover quality", COVER_QUALITIES)}
        ${this._select("score_position", "Score position", SCORE_POSITIONS)}
        ${this._select("score_source", "Score source", SCORE_SOURCES)}
        ${this._number("visible_items", "Visible items (scroll for more)", 1, 50)}
        ${this._config.visible_items ? this._toggle("scroll_snap", "Snap scroll to items") : A}
        ${this._config.visible_items ? this._toggle("scroll_fade", "Fade at scroll edge") : A}
        ${this._toggle("show_search", "Show search bar")}
        ${this._toggle("show_tooltips", "Show tooltips on hover")}
      </div>
    `;
    }
    // ─── Dynamic view settings tab ──────────────────────────────────────────
    _renderViewSettings() {
        var _a;
        const view = (_a = this._config.view) !== null && _a !== void 0 ? _a : "airing";
        switch (view) {
            case "airing": return this._renderAiringSettings();
            case "watchlist": return this._renderWatchlistSettings();
            case "season": return this._renderSeasonSettings();
            case "profile": return this._renderProfileSettings();
            case "manga": return this._renderMangaSettings();
            default: return A;
        }
    }
    _renderAiringSettings() {
        return b `
      <div class="section">
        <div class="section-header">Airing Settings</div>
        ${this._number("max_airing", "Max items", 1, 50)}
        ${this._select("sort_by", "Sort by", SORT_OPTIONS)}
        ${this._toggle("show_countdown", "Show countdown")}
        ${this._config.show_countdown !== false
            ? this._select("countdown_format", "Countdown format", COUNTDOWN_FORMATS)
            : A}
        ${this._toggle("show_badges", "Show status badges")}
        ${this._toggle("show_duration", "Show episode duration")}
        ${this._toggle("show_genres", "Show genres")}
        ${this._toggle("show_average_score", "Show average score")}
        ${this._toggle("show_format_badge", "Show format badge (TV/Movie)")}
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
      </div>
    `;
    }
    _renderWatchlistSettings() {
        return b `
      <div class="section">
        <div class="section-header">Watchlist Settings</div>
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
        ${this._toggle("show_next_airing", "Show next episode countdown")}
        ${this._number("max_watchlist", "Max items (limit mode)", 1, 50)}
        ${this._select("overflow_mode", "Overflow behavior", OVERFLOW_MODES)}
        ${this._config.overflow_mode === "scroll"
            ? this._number("scroll_height", "Scroll height (px)", 100, 1000)
            : A}
        ${this._select("score_display", "Score display", SCORE_DISPLAYS)}
        ${this._toggle("show_progress", "Show progress")}
        ${this._config.show_progress !== false ? this._toggle("show_progress_bar", "Show progress bar") : A}

        <div class="section-header">Status Tabs</div>
        ${this._toggle("show_status_tabs", "Show status tabs")}
        <label class="field-label">Visible statuses</label>
        <div class="checkbox-group">
          ${STATUS_OPTIONS.map((s) => {
            var _a;
            return b `
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${((_a = this._config.watchlist_statuses) !== null && _a !== void 0 ? _a : ["CURRENT"]).includes(s.value)}
                @change=${(e) => {
                var _a;
                const checked = e.target.checked;
                const current = [...((_a = this._config.watchlist_statuses) !== null && _a !== void 0 ? _a : ["CURRENT"])];
                if (checked && !current.includes(s.value)) {
                    current.push(s.value);
                }
                else if (!checked) {
                    const idx = current.indexOf(s.value);
                    if (idx >= 0)
                        current.splice(idx, 1);
                }
                this._set("watchlist_statuses", current);
            }}
              />
              ${s.label}
            </label>
          `;
        })}
        </div>
      </div>
    `;
    }
    _renderSeasonSettings() {
        var _a, _b;
        return b `
      <div class="section">
        <div class="section-header">Season Settings</div>
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
        ${this._number("max_season", "Max items", 1, 50)}
        ${this._toggle("show_next_season", "Include next season")}
        ${this._select("score_display", "Score display", SCORE_DISPLAYS)}

        <div class="section-header">Filters</div>
        <label class="field-label">Genre filter (comma-separated)</label>
        <input
          class="text-input"
          type="text"
          .value=${((_a = this._config.genre_filter) !== null && _a !== void 0 ? _a : []).join(", ")}
          @change=${(e) => {
            const val = e.target.value;
            this._set("genre_filter", val ? val.split(",").map((s) => s.trim()).filter(Boolean) : []);
        }}
          placeholder="e.g. Action, Romance"
        />
        <label class="field-label">Format filter (comma-separated)</label>
        <input
          class="text-input"
          type="text"
          .value=${((_b = this._config.format_filter) !== null && _b !== void 0 ? _b : []).join(", ")}
          @change=${(e) => {
            const val = e.target.value;
            this._set("format_filter", val ? val.split(",").map((s) => s.trim()).filter(Boolean) : []);
        }}
          placeholder="e.g. TV, MOVIE, OVA"
        />
      </div>
    `;
    }
    _renderProfileSettings() {
        return b `
      <div class="section">
        <div class="section-header">Profile Settings</div>
        ${this._toggle("show_avatar", "Show avatar")}
        ${this._toggle("show_username", "Show username")}
        ${this._toggle("show_anime_stats", "Show anime statistics")}
        ${this._toggle("show_manga_stats", "Show manga statistics")}
        ${this._toggle("show_genre_chart", "Show genre chart")}
        ${this._config.show_genre_chart !== false
            ? this._select("chart_type", "Genre chart type", CHART_TYPES)
            : A}
        ${this._toggle("show_favourites", "Show favourites")}
      </div>
    `;
    }
    _renderMangaSettings() {
        return b `
      <div class="section">
        <div class="section-header">Manga Settings</div>
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
        ${this._number("max_manga", "Max items (limit mode)", 1, 50)}
        ${this._select("overflow_mode", "Overflow behavior", OVERFLOW_MODES)}
        ${this._config.overflow_mode === "scroll"
            ? this._number("scroll_height", "Scroll height (px)", 100, 1000)
            : A}
        ${this._select("score_display", "Score display", SCORE_DISPLAYS)}
        ${this._toggle("show_progress", "Show progress")}
        ${this._config.show_progress !== false ? this._toggle("show_progress_bar", "Show progress bar") : A}

        <div class="section-header">Status Tabs</div>
        ${this._toggle("show_status_tabs", "Show status tabs")}
        <label class="field-label">Visible statuses</label>
        <div class="checkbox-group">
          ${STATUS_OPTIONS.map((s) => {
            var _a;
            return b `
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${((_a = this._config.watchlist_statuses) !== null && _a !== void 0 ? _a : ["CURRENT"]).includes(s.value)}
                @change=${(e) => {
                var _a;
                const checked = e.target.checked;
                const current = [...((_a = this._config.watchlist_statuses) !== null && _a !== void 0 ? _a : ["CURRENT"])];
                if (checked && !current.includes(s.value)) {
                    current.push(s.value);
                }
                else if (!checked) {
                    const idx = current.indexOf(s.value);
                    if (idx >= 0)
                        current.splice(idx, 1);
                }
                this._set("watchlist_statuses", current);
            }}
              />
              ${s.label}
            </label>
          `;
        })}
        </div>
      </div>
    `;
    }
    // ─── Colors tab ─────────────────────────────────────────────────────────
    _renderColors() {
        return b `
      <div class="section">
        ${this._color("accent_color", "Accent color")}
        ${this._color("secondary_color", "Secondary color")}
        ${this._color("card_background", "Card background")}
        ${this._slider("card_opacity", "Card opacity", 0, 100)}
        ${this._color("border_color", "Border color")}
        ${this._number("border_width", "Border width (px)", 0, 10)}
        ${this._number("border_radius", "Border radius (px)", 0, 30)}
      </div>
    `;
    }
    // ─── Form helpers ───────────────────────────────────────────────────────
    _select(key, label, options) {
        var _a, _b;
        return b `
      <div class="field">
        <label class="field-label">${label}</label>
        <select
          class="select-input"
          .value=${String((_a = this._val(key)) !== null && _a !== void 0 ? _a : (_b = options[0]) === null || _b === void 0 ? void 0 : _b.value)}
          @change=${(e) => this._set(key, e.target.value)}
        >
          ${options.map((o) => b `
            <option value=${o.value} ?selected=${this._val(key) === o.value}>${o.label}</option>
          `)}
        </select>
      </div>
    `;
    }
    _text(key, label) {
        var _a;
        return b `
      <div class="field">
        <label class="field-label">${label}</label>
        <input
          class="text-input"
          type="text"
          .value=${String((_a = this._val(key)) !== null && _a !== void 0 ? _a : "")}
          @change=${(e) => {
            const v = e.target.value;
            this._set(key, v || undefined);
        }}
        />
      </div>
    `;
    }
    _number(key, label, min, max) {
        var _a;
        return b `
      <div class="field">
        <label class="field-label">${label}</label>
        <input
          class="text-input"
          type="number"
          min=${min}
          max=${max}
          .value=${String((_a = this._val(key)) !== null && _a !== void 0 ? _a : "")}
          @change=${(e) => {
            const v = e.target.value;
            this._set(key, v ? Number(v) : undefined);
        }}
        />
      </div>
    `;
    }
    _toggle(key, label) {
        return b `
      <div class="field toggle-field">
        <label class="field-label">${label}</label>
        <label class="switch">
          <input
            type="checkbox"
            .checked=${this._val(key) !== false}
            @change=${(e) => this._set(key, e.target.checked)}
          />
          <span class="slider"></span>
        </label>
      </div>
    `;
    }
    _color(key, label) {
        var _a, _b;
        return b `
      <div class="field color-field">
        <label class="field-label">${label}</label>
        <div class="color-input-wrap">
          <input
            type="color"
            class="color-picker"
            .value=${String((_a = this._val(key)) !== null && _a !== void 0 ? _a : "#3DB4F2")}
            @input=${(e) => this._set(key, e.target.value)}
          />
          <input
            class="text-input color-text"
            type="text"
            .value=${String((_b = this._val(key)) !== null && _b !== void 0 ? _b : "")}
            @change=${(e) => {
            const v = e.target.value;
            this._set(key, v || undefined);
        }}
            placeholder="auto"
          />
        </div>
      </div>
    `;
    }
    _slider(key, label, min, max) {
        var _a;
        const val = Number((_a = this._val(key)) !== null && _a !== void 0 ? _a : max);
        return b `
      <div class="field">
        <label class="field-label">${label}: ${val}</label>
        <input
          type="range"
          class="range-input"
          min=${min}
          max=${max}
          .value=${String(val)}
          @input=${(e) => this._set(key, Number(e.target.value))}
        />
      </div>
    `;
    }
}
// ─── Styles ─────────────────────────────────────────────────────────────
AniListCardEditor.styles = i$3 `
    .editor {
      font-family: var(--primary-font-family, sans-serif);
      color: var(--primary-text-color, #e8e8e8);
    }

    .tabs {
      display: flex;
      gap: 2px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.12));
    }

    .tab {
      padding: 8px 14px;
      border: none;
      background: none;
      color: var(--secondary-text-color, #9b9b9b);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .tab.active {
      color: var(--primary-color, #3DB4F2);
      border-bottom-color: var(--primary-color, #3DB4F2);
    }
    .tab:hover:not(.active) {
      color: var(--primary-text-color, #e8e8e8);
    }

    .tab-content { padding: 4px 0; }

    .section { display: flex; flex-direction: column; gap: 10px; }

    .section-header {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--primary-text-color, #e8e8e8);
      margin-top: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }

    .field { display: flex; flex-direction: column; gap: 4px; }

    .field-label {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--secondary-text-color, #9b9b9b);
    }

    .text-input,
    .select-input {
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--input-fill-color, var(--secondary-background-color, #1a1a2e));
      color: var(--primary-text-color, #e8e8e8);
      font-size: 0.85rem;
      outline: none;
    }
    .text-input:focus,
    .select-input:focus {
      border-color: var(--primary-color, #3DB4F2);
    }

    .select-input {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%239b9b9b'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 8px center;
      padding-right: 28px;
    }

    .toggle-field {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .switch {
      position: relative;
      width: 36px;
      height: 20px;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--divider-color, rgba(255,255,255,0.12));
      border-radius: 10px;
      transition: 0.2s;
    }
    .slider::before {
      content: "";
      position: absolute;
      height: 14px; width: 14px;
      left: 3px; bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: 0.2s;
    }
    input:checked + .slider {
      background: var(--primary-color, #3DB4F2);
    }
    input:checked + .slider::before {
      transform: translateX(16px);
    }

    .color-field { }
    .color-input-wrap {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .color-picker {
      width: 32px; height: 32px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      padding: 0;
      background: none;
    }
    .color-text { flex: 1; }

    .range-input {
      width: 100%;
      accent-color: var(--primary-color, #3DB4F2);
    }

    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.82rem;
      color: var(--primary-text-color, #e8e8e8);
      cursor: pointer;
    }
    .checkbox-item input {
      accent-color: var(--primary-color, #3DB4F2);
    }
  `;
__decorate([
    n({ attribute: false })
], AniListCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], AniListCardEditor.prototype, "_config", void 0);
__decorate([
    r()
], AniListCardEditor.prototype, "_tab", void 0);
customElements.define("anilist-card-editor", AniListCardEditor);

// ─── i18n ────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
    en: {
        next_episodes: "Next Episodes",
        watching: "Currently Watching",
        this_season: "This Season",
        profile: "AniList Profile",
        manga: "Manga Reading",
        no_episodes: "No episodes in the coming days.",
        no_watchlist: "No anime in the watchlist.",
        no_season: "No season data available.",
        no_profile: "No profile stats available.",
        no_manga: "No manga in the list.",
        auth_only: "Only for logged-in users.",
        episode: "Episode",
        ep: "Ep.",
        aired: "Aired",
        anime: "Anime",
        episodes: "Episodes",
        hours: "Hours",
        score_avg: "Avg Score",
        watching_now: "Watching",
        chapters: "Chapters",
        volumes: "Volumes",
        manga_count: "Manga",
        manga_score: "Manga Score",
        top_genres: "Top Genres",
        favourites: "Favourites",
        search_placeholder: "Search...",
        current: "Current",
        planning: "Planning",
        completed: "Completed",
        paused: "Paused",
        dropped: "Dropped",
        next_season_label: "Next Season",
    },
    de: {
        next_episodes: "Nächste Episoden",
        watching: "Schaue ich gerade",
        this_season: "Diese Season",
        profile: "AniList Profil",
        manga: "Manga Leseliste",
        no_episodes: "Keine Episoden in den nächsten Tagen.",
        no_watchlist: "Keine Anime in der Watchlist.",
        no_season: "Keine Season-Daten verfügbar.",
        no_profile: "Keine Profil-Statistiken verfügbar.",
        no_manga: "Keine Manga in der Liste.",
        auth_only: "Nur für eingeloggte Nutzer.",
        episode: "Episode",
        ep: "Ep.",
        aired: "Ausgestrahlt",
        anime: "Anime",
        episodes: "Episoden",
        hours: "Stunden",
        score_avg: "Ø Score",
        watching_now: "Schaue ich",
        chapters: "Kapitel",
        volumes: "Bände",
        manga_count: "Manga",
        manga_score: "Manga Score",
        top_genres: "Top Genres",
        favourites: "Favoriten",
        search_placeholder: "Suchen...",
        current: "Aktuell",
        planning: "Geplant",
        completed: "Abgeschlossen",
        paused: "Pausiert",
        dropped: "Abgebrochen",
        next_season_label: "Nächste Season",
    },
    ja: {
        next_episodes: "次のエピソード",
        watching: "視聴中",
        this_season: "今期",
        profile: "AniListプロフィール",
        manga: "読書中",
        no_episodes: "今後のエピソードはありません。",
        no_watchlist: "ウォッチリストにアニメがありません。",
        no_season: "シーズンデータがありません。",
        no_profile: "プロフィール統計がありません。",
        no_manga: "リストにマンガがありません。",
        auth_only: "ログインユーザーのみ。",
        episode: "エピソード",
        ep: "話",
        aired: "放送済み",
        anime: "アニメ",
        episodes: "エピソード",
        hours: "時間",
        score_avg: "平均スコア",
        watching_now: "視聴中",
        chapters: "章",
        volumes: "巻",
        manga_count: "マンガ",
        manga_score: "マンガスコア",
        top_genres: "トップジャンル",
        favourites: "お気に入り",
        search_placeholder: "検索...",
        current: "視聴中",
        planning: "予定",
        completed: "完了",
        paused: "一時停止",
        dropped: "中断",
        next_season_label: "来期",
    },
};
// ─── Helpers ─────────────────────────────────────────────────────────────────
function countdown(isoOrTs, format, lang) {
    const target = typeof isoOrTs === "number" ? isoOrTs * 1000 : new Date(isoOrTs).getTime();
    const diff = target - Date.now();
    const t = TRANSLATIONS[lang] || TRANSLATIONS["en"];
    if (diff <= 0)
        return t.aired;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const relative = h >= 24
        ? `${Math.floor(h / 24)}d ${h % 24}h`
        : h > 0 ? `${h}h ${m}m` : `${m}m`;
    const absolute = new Date(target).toLocaleString(lang, {
        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
    if (format === "absolute")
        return absolute;
    if (format === "both")
        return `${relative} (${absolute})`;
    return relative;
}
function getEntityState(hass, entityId) {
    var _a, _b;
    return (_b = (_a = hass.states[entityId]) === null || _a === void 0 ? void 0 : _a.state) !== null && _b !== void 0 ? _b : "";
}
/** Format a raw 0-100 score to single-digit 0-10 scale. */
function fmtScore(raw) {
    if (!raw)
        return "";
    return (raw / 10).toFixed(1).replace(/\.0$/, "");
}
function renderScoreOverlay(score, position) {
    if (!score || position === "none")
        return A;
    if (position === "inline")
        return A;
    return b `<span class="score-overlay ${position}">★${fmtScore(score)}</span>`;
}
function renderScoreInline(score, position) {
    if (!score || position !== "inline")
        return A;
    return b `<span class="score-inline">★${fmtScore(score)}</span>`;
}
// ─── Card Element ─────────────────────────────────────────────────────────────
class AniListCard extends i {
    constructor() {
        super(...arguments);
        this._activeTab = "CURRENT";
        this._searchQuery = "";
        // WebSocket data cache (null = not yet loaded, use entity fallback)
        this._wsAiring = null;
        this._wsWatchlist = null;
        this._wsSeason = null;
        this._wsManga = null;
        this._wsProfile = null;
        this._wsLoading = false;
        this._lastSensorHash = "";
        this._wsLoadedViews = new Set();
        this._wsLoadPromise = null;
        this._wsInitDone = false;
    }
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
            cover_size: "medium",
            show_countdown: true,
            countdown_format: "relative",
            show_progress: true,
            show_progress_bar: true,
            score_display: "number",
            show_badges: true,
            show_search: false,
            show_tooltips: false,
            link_target: "anilist",
            sort_by: "time",
            card_padding: "normal",
            show_duration: false,
            show_genres: false,
            show_average_score: false,
            show_format_badge: false,
            watchlist_statuses: ["CURRENT", "PLANNING", "COMPLETED", "PAUSED", "DROPPED"],
            show_status_tabs: true,
            genre_filter: [],
            format_filter: [],
            show_next_season: false,
            chart_type: "bar",
            overflow_mode: "scroll",
            scroll_height: 400,
            show_avatar: true,
            show_username: true,
            show_anime_stats: true,
            show_manga_stats: true,
            show_genre_chart: true,
            show_favourites: true,
            // Legacy compat
            link_to_anilist: true,
            ...config,
        };
        // Legacy: map link_to_anilist to link_target if not explicitly set
        if (config.link_to_anilist === false && !config.link_target) {
            this._config.link_target = "none";
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this._tick = setInterval(() => this.requestUpdate(), 60000);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this._tick);
        this._wsInitDone = false;
    }
    updated(changed) {
        var _a;
        super.updated(changed);
        if (!changed.has("hass") || !((_a = this.hass) === null || _a === void 0 ? void 0 : _a.callWS))
            return;
        // First hass assignment → initial WS load
        if (!this._wsInitDone) {
            this._wsInitDone = true;
            this._lastSensorHash = this._sensorHash();
            this._triggerWSLoad();
            return;
        }
        // Subsequent updates: only reload when sensor states actually changed
        // (indicates coordinator refreshed new data from AniList API)
        const hash = this._sensorHash();
        if (hash !== this._lastSensorHash) {
            this._lastSensorHash = hash;
            this._wsLoadedViews.clear();
            this._triggerWSLoad();
        }
    }
    /** Simple hash of anilist sensor states to detect coordinator refreshes. */
    _sensorHash() {
        var _a, _b;
        let h = "";
        for (const [id, s] of Object.entries((_b = (_a = this.hass) === null || _a === void 0 ? void 0 : _a.states) !== null && _b !== void 0 ? _b : {})) {
            if (id.startsWith("sensor.anilist_"))
                h += `${id}:${s.state};`;
        }
        return h;
    }
    _triggerWSLoad() {
        var _a, _b;
        // Prevent overlapping loads
        if (this._wsLoadPromise)
            return;
        const view = (_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.view) !== null && _b !== void 0 ? _b : "airing";
        this._wsLoadPromise = this._loadViewData(view).then(() => {
            this._wsLoadedViews.add(view);
            this._wsLoadPromise = null;
        }).catch(() => {
            this._wsLoadPromise = null;
        });
    }
    async _loadViewData(view) {
        var _a;
        if (!((_a = this.hass) === null || _a === void 0 ? void 0 : _a.callWS))
            return;
        this._wsLoading = true;
        try {
            const entryId = this._config.entry_id; // undefined = auto-detect on server
            if (view === "airing") {
                const r = await this.hass.callWS({
                    type: "anilist/airing_schedule",
                    ...(entryId ? { entry_id: entryId } : {}),
                });
                this._wsAiring = r.items;
            }
            else if (view === "watchlist") {
                const r = await this.hass.callWS({
                    type: "anilist/watchlist",
                    ...(entryId ? { entry_id: entryId } : {}),
                });
                this._wsWatchlist = r.items;
            }
            else if (view === "season") {
                const r = await this.hass.callWS({
                    type: "anilist/season",
                    ...(entryId ? { entry_id: entryId } : {}),
                });
                this._wsSeason = r.items;
            }
            else if (view === "manga") {
                const r = await this.hass.callWS({
                    type: "anilist/manga",
                    ...(entryId ? { entry_id: entryId } : {}),
                });
                this._wsManga = r.items;
            }
            else if (view === "profile") {
                this._wsProfile = await this.hass.callWS({
                    type: "anilist/profile",
                    ...(entryId ? { entry_id: entryId } : {}),
                });
            }
        }
        catch {
            // WS failed — fall back to entity attributes (already rendered)
        }
        finally {
            this._wsLoading = false;
        }
    }
    /** Resolve a title value (string or MediaTitle) to display string. */
    _title(t) {
        return resolveTitle(t, this._lang());
    }
    /** Resolve cover URL with quality preference and fallback. */
    _coverUrl(item) {
        var _a;
        const q = (_a = this._config.cover_quality) !== null && _a !== void 0 ? _a : "large";
        if (item.cover_images) {
            return item.cover_images[q] || item.cover_images.medium || item.cover_images.small;
        }
        return item.cover_image; // entity attribute fallback
    }
    /** Score position config with fallback. */
    _scorePos() {
        var _a;
        return (_a = this._config.score_position) !== null && _a !== void 0 ? _a : "top-right";
    }
    /**
     * Pick the right score for an item based on score_source config.
     * - "user": always user score
     * - "average": always average/community score
     * - "auto": user score if > 0 (rated), otherwise average score
     */
    _pickScore(item, view) {
        var _a;
        const src = (_a = this._config.score_source) !== null && _a !== void 0 ? _a : "auto";
        if (src === "user")
            return item.score || undefined;
        if (src === "average")
            return item.average_score || undefined;
        // Auto logic:
        if (view === "airing" || view === "season")
            return item.average_score || undefined;
        // Watchlist/Manga: user score if rated, otherwise average
        return (item.score && item.score > 0) ? item.score : (item.average_score || undefined);
    }
    /** Default layout mode per view type. */
    _layoutMode() {
        var _a;
        const cfg = this._config;
        if (cfg.layout_mode)
            return cfg.layout_mode;
        const view = (_a = cfg.view) !== null && _a !== void 0 ? _a : "airing";
        if (view === "airing")
            return "list";
        if (view === "season")
            return "list";
        return "grid"; // watchlist, manga
    }
    _t(key) {
        var _a, _b;
        const lang = ((_b = (_a = this.hass) === null || _a === void 0 ? void 0 : _a.language) === null || _b === void 0 ? void 0 : _b.substring(0, 2)) || "en";
        return (TRANSLATIONS[lang] || TRANSLATIONS["en"])[key] || key;
    }
    _lang() {
        var _a, _b;
        return ((_b = (_a = this.hass) === null || _a === void 0 ? void 0 : _a.language) === null || _b === void 0 ? void 0 : _b.substring(0, 2)) || "en";
    }
    _padding() {
        const p = this._config.card_padding;
        if (p === "compact")
            return "8px";
        if (p === "relaxed")
            return "16px";
        return "12px";
    }
    _coverDims() {
        const s = this._config.cover_size;
        if (s === "small")
            return { w: 40, h: 56 };
        if (s === "large")
            return { w: 64, h: 90 };
        return { w: 48, h: 68 };
    }
    /** CSS classes for scroll container. Actual height set by _applyScrollHeight after render. */
    _scrollClasses() {
        const cfg = this._config;
        if (!cfg.visible_items)
            return "";
        const classes = ["scroll-container", "grid-scroll"];
        if (cfg.scroll_snap !== false)
            classes.push("snap-scroll");
        if (cfg.scroll_fade !== false)
            classes.push("scroll-fade-wrap");
        return classes.join(" ");
    }
    /** Measure actual item height after render and set pixel-perfect max-height. */
    _applyScrollHeights() {
        var _a;
        const vis = (_a = this._config) === null || _a === void 0 ? void 0 : _a.visible_items;
        if (!vis || !this.shadowRoot)
            return;
        requestAnimationFrame(() => {
            const containers = this.shadowRoot.querySelectorAll(".scroll-container");
            containers.forEach((c) => {
                const firstChild = c.querySelector(".list-item, .grid-item, .season-item");
                if (!firstChild)
                    return;
                const itemH = firstChild.getBoundingClientRect().height;
                const gap = parseFloat(getComputedStyle(c).gap) || 8;
                const maxH = vis * (itemH + gap) - gap;
                c.style.maxHeight = `${maxH}px`;
                c.style.overflowY = "auto";
            });
        });
    }
    _maxFor(view) {
        var _a;
        const c = this._config;
        if (view === "airing" && c.max_airing)
            return c.max_airing;
        if (view === "watchlist" && c.max_watchlist)
            return c.max_watchlist;
        if (view === "season" && c.max_season)
            return c.max_season;
        if (view === "manga" && c.max_manga)
            return c.max_manga;
        return (_a = c.max_items) !== null && _a !== void 0 ? _a : 5;
    }
    _shouldLink() {
        return this._config.link_target === "anilist";
    }
    _handleClick(url) {
        if (!url || !this._shouldLink())
            return;
        window.open(url, "_blank", "noopener");
    }
    // ─── Custom style vars ──────────────────────────────────────────────────
    _hostStyle() {
        const c = this._config;
        const vars = [];
        if (c.accent_color)
            vars.push(`--al-accent: ${c.accent_color}`);
        if (c.secondary_color)
            vars.push(`--al-secondary: ${c.secondary_color}`);
        if (c.card_background)
            vars.push(`--al-card-bg: ${c.card_background}`);
        if (c.card_opacity !== undefined)
            vars.push(`--al-bg-opacity: ${c.card_opacity / 100}`);
        if (c.border_color)
            vars.push(`--al-border-color: ${c.border_color}`);
        if (c.border_width !== undefined)
            vars.push(`--al-border-width: ${c.border_width}px`);
        if (c.border_radius !== undefined)
            vars.push(`--al-border-radius: ${c.border_radius}px`);
        return vars.join(";");
    }
    // ─── Main render ────────────────────────────────────────────────────────
    render() {
        var _a, _b, _c;
        if (!this._config || !this.hass)
            return A;
        const view = (_a = this._config.view) !== null && _a !== void 0 ? _a : "airing";
        // Lazy-load data for current view via WebSocket (on view switch)
        if (!this._wsLoadedViews.has(view) && !this._wsLoadPromise && ((_b = this.hass) === null || _b === void 0 ? void 0 : _b.callWS)) {
            this._triggerWSLoad();
        }
        // Schedule scroll height measurement after this render cycle
        if (this._config.visible_items) {
            this.updateComplete.then(() => this._applyScrollHeights());
        }
        const title = (_c = this._config.title) !== null && _c !== void 0 ? _c : this._defaultTitle(view);
        const pad = this._padding();
        return b `
      <div class="card" style="${this._hostStyle()}">
        <div class="card-header" style="padding:${pad} ${pad}">
          <span class="brand-dot"></span>
          <span class="header-title">${title}</span>
        </div>
        <div class="card-content" style="padding:${pad}">
          ${this._config.show_search ? this._renderSearch() : A}
          ${this._wsLoading ? b `<div class="loading-bar"></div>` : A}
          ${view === "airing" ? this._renderAiring() : A}
          ${view === "watchlist" ? this._renderWatchlist() : A}
          ${view === "season" ? this._renderSeason() : A}
          ${view === "profile" ? this._renderProfile() : A}
          ${view === "manga" ? this._renderManga() : A}
        </div>
      </div>
    `;
    }
    // ─── Search ─────────────────────────────────────────────────────────────
    _renderSearch() {
        return b `
      <div class="search-bar">
        <input
          type="text"
          placeholder=${this._t("search_placeholder")}
          .value=${this._searchQuery}
          @input=${(e) => {
            this._searchQuery = e.target.value;
        }}
        />
      </div>
    `;
    }
    _matchesSearch(title) {
        if (!this._searchQuery)
            return true;
        return title.toLowerCase().includes(this._searchQuery.toLowerCase());
    }
    // ─── Empty state ────────────────────────────────────────────────────────
    _renderEmpty(messageKey) {
        return b `
      <div class="empty">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm1-5C6.47 2 2 6.5 2 12s4.47 10 10 10 10-4.5 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        <div>${this._t(messageKey)}</div>
      </div>
    `;
    }
    // ─── Status tabs ────────────────────────────────────────────────────────
    _renderStatusTabs(statuses) {
        const tabLabels = {
            CURRENT: this._t("current"),
            PLANNING: this._t("planning"),
            COMPLETED: this._t("completed"),
            PAUSED: this._t("paused"),
            DROPPED: this._t("dropped"),
        };
        return b `
      <div class="status-tabs">
        ${statuses.map((s) => b `
          <button
            class="tab-btn ${this._activeTab === s ? "active" : ""}"
            @click=${() => { this._activeTab = s; }}
          >${tabLabels[s] || s}</button>
        `)}
      </div>
    `;
    }
    // ─── View: Airing ──────────────────────────────────────────────────────
    _renderAiring() {
        let items = this._getAiringItems();
        items = items.filter((i) => this._matchesSearch(this._title(i.title)));
        if (!items.length)
            return this._renderEmpty("no_episodes");
        const { w, h } = this._coverDims();
        const cfg = this._config;
        const lang = this._lang();
        const scrollC = this._scrollClasses();
        const sPos = this._scorePos();
        return b `
      <div class="list ${scrollC}">
        ${items.map((item) => {
            var _a, _b;
            const t = this._title(item.title);
            const cUrl = this._coverUrl(item);
            const sc = this._pickScore(item, "airing");
            return b `
          <div
            class="list-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - ${this._t("episode")} ${item.episode}` : ""}
          >
            ${cfg.show_cover ? b `
              <div class="cover-wrap" style="width:${w}px;height:${h}px">
                ${cUrl
                ? b `<img class="cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w}px;height:${h}px" />`
                : b `<div class="cover cover-placeholder" style="width:${w}px;height:${h}px"><span>?</span></div>`}
                ${renderScoreOverlay(sc, sPos)}
              </div>
            ` : A}
            <div class="item-info">
              <div class="item-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="item-sub">
                ${this._t("episode")} ${item.episode}
                ${cfg.show_duration && item.duration ? b ` · ${item.duration}min` : A}
                ${cfg.show_average_score && item.average_score ? b ` · ★${item.average_score}%` : A}
              </div>
              ${cfg.show_genres && ((_a = item.genres) === null || _a === void 0 ? void 0 : _a.length)
                ? b `<div class="inline-genres">${item.genres.slice(0, 3).map((g) => b `<span class="mini-chip">${g}</span>`)}</div>`
                : A}
              <div class="countdown-row">
                ${cfg.show_countdown
                ? b `<span class="countdown">${countdown(item.airing_at, (_b = cfg.countdown_format) !== null && _b !== void 0 ? _b : "relative", lang)}</span>`
                : A}
                ${cfg.show_format_badge && item.format
                ? b `<span class="format-chip">${item.format}</span>`
                : A}
                ${cfg.show_badges
                ? b `<span class="status-badge airing">Airing</span>`
                : A}
              </div>
            </div>
          </div>
        `;
        })}
      </div>
    `;
    }
    _getAiringItems() {
        const max = this._maxFor("airing");
        let items;
        // Prefer WebSocket data
        if (this._wsAiring) {
            items = [...this._wsAiring];
        }
        else {
            // Fallback: read from entity attributes
            items = [];
            Object.entries(this.hass.states)
                .filter(([id]) => id.startsWith("sensor.anilist_"))
                .forEach(([_id, entity]) => {
                const attrs = entity.attributes;
                if (Array.isArray(attrs["airing_schedule"])) {
                    attrs["airing_schedule"].forEach((ep) => {
                        var _a, _b, _c, _d;
                        items.push({
                            media_id: Number((_a = ep["media_id"]) !== null && _a !== void 0 ? _a : 0),
                            title: String((_b = ep["title"]) !== null && _b !== void 0 ? _b : ""),
                            episode: Number((_c = ep["episode"]) !== null && _c !== void 0 ? _c : 0),
                            airing_at: String((_d = ep["airing_at"]) !== null && _d !== void 0 ? _d : ""),
                            cover_image: ep["cover_image"],
                            site_url: ep["site_url"],
                            duration: ep["duration"],
                            genres: ep["genres"],
                            average_score: ep["average_score"],
                            format: ep["format"],
                        });
                    });
                }
            });
            // Fallback to simple sensors
            if (!items.length) {
                const title = getEntityState(this.hass, "sensor.anilist_nachster_anime") ||
                    getEntityState(this.hass, "sensor.anilist_next_airing_anime");
                const time = getEntityState(this.hass, "sensor.anilist_nachste_episode_um") ||
                    getEntityState(this.hass, "sensor.anilist_next_episode_time");
                if (title && title !== "unknown") {
                    items.push({ media_id: 0, title, episode: 1, airing_at: time });
                }
            }
        }
        // Sort
        const sort = this._config.sort_by;
        if (sort === "title")
            items.sort((a, b) => this._title(a.title).localeCompare(this._title(b.title)));
        else if (sort === "score")
            items.sort((a, b) => { var _a, _b; return ((_a = b.average_score) !== null && _a !== void 0 ? _a : 0) - ((_b = a.average_score) !== null && _b !== void 0 ? _b : 0); });
        return items.slice(0, max);
    }
    // ─── View: Watchlist ────────────────────────────────────────────────────
    _renderWatchlist() {
        var _a;
        const statuses = (_a = this._config.watchlist_statuses) !== null && _a !== void 0 ? _a : ["CURRENT"];
        const showTabs = this._config.show_status_tabs && statuses.length > 1;
        let items = this._getWatchlistItems();
        // Filter by active tab
        if (showTabs) {
            items = items.filter((i) => i.status === this._activeTab);
        }
        else {
            items = items.filter((i) => statuses.includes(i.status));
        }
        items = items.filter((i) => this._matchesSearch(this._title(i.title)));
        // Apply overflow mode
        const useScroll = this._config.overflow_mode === "scroll";
        if (!useScroll) {
            items = items.slice(0, this._maxFor("watchlist"));
        }
        return b `
      ${showTabs ? this._renderStatusTabs(statuses) : A}
      ${items.length
            ? (this._layoutMode() === "list"
                ? this._renderWatchlistList(items)
                : this._renderWatchlistGrid(items))
            : this._renderEmpty("no_watchlist")}
    `;
    }
    _renderWatchlistList(items) {
        const cfg = this._config;
        const scrollC = this._scrollClasses();
        const sPos = this._scorePos();
        const lang = this._lang();
        const { w, h } = this._coverDims();
        return b `
      <div class="list ${scrollC}">
        ${items.map((item) => {
            const t = this._title(item.title);
            const cUrl = this._coverUrl(item);
            const sc = this._pickScore(item, "watchlist");
            return b `
          <div class="list-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}>
            ${cfg.show_cover ? b `
              <div class="cover-wrap" style="width:${w}px;height:${h}px">
                ${cUrl ? b `<img class="cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w}px;height:${h}px" />` : b `<div class="cover cover-placeholder" style="width:${w}px;height:${h}px"><span>${t[0]}</span></div>`}
                ${renderScoreOverlay(sc, sPos)}
              </div>` : A}
            <div class="item-info">
              <div class="item-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="item-sub">
                ${this._t("ep")} ${item.progress}${item.episodes ? `/${item.episodes}` : ""}
                ${cfg.show_next_airing !== false && item.next_airing_episode
                ? b ` · <span class="countdown">${countdown(item.next_airing_episode.airing_at, "relative", lang)}</span>` : A}
              </div>
              ${cfg.show_progress_bar && item.episodes ? b `
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, (item.progress / item.episodes) * 100)}%"></div></div>
              ` : A}
            </div>
          </div>
        `;
        })}
      </div>
    `;
    }
    _renderWatchlistGrid(items) {
        var _a;
        const cfg = this._config;
        const scrollC = this._scrollClasses();
        const fallbackScroll = !cfg.visible_items && cfg.overflow_mode === "scroll"
            ? `max-height:${(_a = cfg.scroll_height) !== null && _a !== void 0 ? _a : 400}px;overflow-y:auto` : "";
        const sPos = this._scorePos();
        const lang = this._lang();
        return b `
      <div class="grid ${scrollC || (fallbackScroll ? "grid-scroll" : "")}"
        style=${fallbackScroll}>
        ${items.map((item) => {
            var _a, _b;
            const t = this._title(item.title);
            const cUrl = this._coverUrl(item);
            const sc = this._pickScore(item, "watchlist");
            return b `
          <div
            class="grid-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - ${item.progress}/${(_a = item.episodes) !== null && _a !== void 0 ? _a : "?"}` : ""}
          >
            <div class="grid-cover-wrap">
              ${cfg.show_cover && cUrl
                ? b `<img class="grid-cover" src=${cUrl} alt=${t} loading="lazy" />`
                : b `<div class="grid-cover cover-placeholder"><span>${(_b = t[0]) !== null && _b !== void 0 ? _b : "?"}</span></div>`}
              ${renderScoreOverlay(sc, sPos)}
              ${cfg.show_next_airing !== false && item.next_airing_episode
                ? b `<div class="next-ep-badge">${countdown(item.next_airing_episode.airing_at, "relative", lang)}</div>`
                : A}
            </div>
            <div class="grid-title">${renderScoreInline(sc, sPos)}${t}</div>
            ${cfg.show_progress && cfg.show_progress_bar && item.episodes
                ? b `
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100, (item.progress / item.episodes) * 100)}%"></div>
                </div>
                <div class="progress-label">${item.progress}/${item.episodes}</div>
              `
                : cfg.show_progress && item.progress
                    ? b `<div class="progress-label">${this._t("ep")} ${item.progress}</div>`
                    : A}
          </div>
        `;
        })}
      </div>
    `;
    }
    _getWatchlistItems() {
        if (this._wsWatchlist)
            return [...this._wsWatchlist];
        // Fallback: entity attributes
        const items = [];
        Object.entries(this.hass.states)
            .filter(([id]) => id.startsWith("sensor.anilist_"))
            .forEach(([_id, entity]) => {
            const attrs = entity.attributes;
            if (Array.isArray(attrs["watchlist"])) {
                attrs["watchlist"].forEach((e) => {
                    var _a, _b, _c, _d;
                    items.push({
                        media_id: Number((_a = e["media_id"]) !== null && _a !== void 0 ? _a : 0),
                        title: String((_b = e["title"]) !== null && _b !== void 0 ? _b : ""),
                        status: String((_c = e["status"]) !== null && _c !== void 0 ? _c : "CURRENT"),
                        progress: Number((_d = e["progress"]) !== null && _d !== void 0 ? _d : 0),
                        episodes: e["episodes"],
                        score: e["score"],
                        cover_image: e["cover_image"],
                        site_url: e["site_url"],
                    });
                });
            }
        });
        return items;
    }
    // ─── View: Season ───────────────────────────────────────────────────────
    _renderSeason() {
        let items = this._getSeasonItems();
        items = items.filter((i) => this._matchesSearch(this._title(i.title)));
        if (!items.length)
            return this._renderEmpty("no_season");
        const cfg = this._config;
        const { w, h } = this._coverDims();
        const scrollC = this._scrollClasses();
        const sPos = this._scorePos();
        return b `
      <div class="season-scroll ${scrollC}">
        ${items.map((item) => {
            var _a, _b;
            const t = this._title(item.title);
            const cUrl = this._coverUrl(item);
            const sc = this._pickScore(item, "season");
            return b `
          <div
            class="season-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - ${(_b = (_a = item.genres) === null || _a === void 0 ? void 0 : _a.join(", ")) !== null && _b !== void 0 ? _b : ""}` : ""}
          >
            ${cfg.show_cover ? b `
              <div class="cover-wrap" style="width:${w - 8}px;height:${h - 12}px">
                ${cUrl
                ? b `<img class="season-cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w - 8}px;height:${h - 12}px" />`
                : b `<div class="season-cover cover-placeholder" style="width:${w - 8}px;height:${h - 12}px"><span>${t[0]}</span></div>`}
                ${renderScoreOverlay(sc, sPos)}
              </div>
            ` : A}
            <div class="season-info">
              <div class="season-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="season-meta">
                ${sPos !== "inline" && sc
                ? b `<span class="score-chip">★${fmtScore(sc)}</span>`
                : A}
                ${item.format
                ? b `<span class="format-chip">${item.format}</span>`
                : A}
              </div>
            </div>
          </div>
        `;
        })}
      </div>
    `;
    }
    _getSeasonItems() {
        var _a, _b;
        const max = this._maxFor("season");
        const cfg = this._config;
        let items;
        if (this._wsSeason) {
            items = [...this._wsSeason];
        }
        else {
            // Fallback: entity attributes
            items = [];
            Object.entries(this.hass.states)
                .filter(([id]) => id.startsWith("sensor.anilist_"))
                .forEach(([_id, entity]) => {
                const attrs = entity.attributes;
                if (Array.isArray(attrs["season_anime"])) {
                    attrs["season_anime"].forEach((a) => {
                        var _a, _b;
                        items.push({
                            id: Number((_a = a["id"]) !== null && _a !== void 0 ? _a : 0),
                            title: String((_b = a["title"]) !== null && _b !== void 0 ? _b : ""),
                            average_score: a["average_score"],
                            episodes: a["episodes"],
                            format: a["format"],
                            genres: a["genres"],
                            cover_image: a["cover_image"],
                            site_url: a["site_url"],
                            next_airing_episode: a["next_airing_episode"],
                        });
                    });
                }
            });
        }
        // Apply genre filter (client-side for WS data too — allows real-time search)
        let filtered = items;
        if ((_a = cfg.genre_filter) === null || _a === void 0 ? void 0 : _a.length) {
            const gf = new Set(cfg.genre_filter);
            filtered = filtered.filter((i) => { var _a; return (_a = i.genres) === null || _a === void 0 ? void 0 : _a.some((g) => gf.has(g)); });
        }
        if ((_b = cfg.format_filter) === null || _b === void 0 ? void 0 : _b.length) {
            const ff = new Set(cfg.format_filter);
            filtered = filtered.filter((i) => i.format && ff.has(i.format));
        }
        return filtered.slice(0, max);
    }
    // ─── View: Manga ────────────────────────────────────────────────────────
    _renderManga() {
        var _a;
        const statuses = (_a = this._config.watchlist_statuses) !== null && _a !== void 0 ? _a : ["CURRENT"];
        const showTabs = this._config.show_status_tabs && statuses.length > 1;
        let items = this._getMangaItems();
        if (showTabs) {
            items = items.filter((i) => i.status === this._activeTab);
        }
        else {
            items = items.filter((i) => statuses.includes(i.status));
        }
        items = items.filter((i) => this._matchesSearch(this._title(i.title)));
        const useScroll = this._config.overflow_mode === "scroll";
        if (!useScroll) {
            items = items.slice(0, this._maxFor("manga"));
        }
        return b `
      ${showTabs ? this._renderStatusTabs(statuses) : A}
      ${items.length
            ? (this._layoutMode() === "list"
                ? this._renderMangaList(items)
                : this._renderMangaGrid(items))
            : this._renderEmpty("no_manga")}
    `;
    }
    _renderMangaList(items) {
        const cfg = this._config;
        const scrollC = this._scrollClasses();
        const sPos = this._scorePos();
        const { w, h } = this._coverDims();
        return b `
      <div class="list ${scrollC}">
        ${items.map((item) => {
            const t = this._title(item.title);
            const cUrl = this._coverUrl(item);
            const sc = this._pickScore(item, "manga");
            return b `
          <div class="list-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}>
            ${cfg.show_cover ? b `
              <div class="cover-wrap" style="width:${w}px;height:${h}px">
                ${cUrl ? b `<img class="cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w}px;height:${h}px" />` : b `<div class="cover cover-placeholder" style="width:${w}px;height:${h}px"><span>${t[0]}</span></div>`}
                ${renderScoreOverlay(sc, sPos)}
              </div>` : A}
            <div class="item-info">
              <div class="item-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="item-sub">Ch. ${item.progress}${item.chapters ? `/${item.chapters}` : ""}${item.volumes ? ` · Vol. ${item.progress_volumes}` : ""}</div>
              ${cfg.show_progress_bar && item.chapters ? b `
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, (item.progress / item.chapters) * 100)}%"></div></div>
              ` : A}
            </div>
          </div>
        `;
        })}
      </div>
    `;
    }
    _renderMangaGrid(items) {
        var _a;
        const cfg = this._config;
        const scrollC = this._scrollClasses();
        const fallbackScroll = !cfg.visible_items && cfg.overflow_mode === "scroll"
            ? `max-height:${(_a = cfg.scroll_height) !== null && _a !== void 0 ? _a : 400}px;overflow-y:auto` : "";
        const sPos = this._scorePos();
        return b `
      <div class="grid ${scrollC || (fallbackScroll ? "grid-scroll" : "")}"
        style=${fallbackScroll}>
        ${items.map((item) => {
            var _a, _b;
            const t = this._title(item.title);
            const cUrl = this._coverUrl(item);
            const sc = this._pickScore(item, "manga");
            return b `
          <div
            class="grid-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - Ch.${item.progress}/${(_a = item.chapters) !== null && _a !== void 0 ? _a : "?"}` : ""}
          >
            <div class="grid-cover-wrap">
              ${cfg.show_cover && cUrl
                ? b `<img class="grid-cover" src=${cUrl} alt=${t} loading="lazy" />`
                : b `<div class="grid-cover cover-placeholder"><span>${(_b = t[0]) !== null && _b !== void 0 ? _b : "?"}</span></div>`}
              ${renderScoreOverlay(sc, sPos)}
            </div>
            <div class="grid-title">${renderScoreInline(sc, sPos)}${t}</div>
            ${cfg.show_progress && cfg.show_progress_bar && item.chapters
                ? b `
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100, (item.progress / item.chapters) * 100)}%"></div>
                </div>
                <div class="progress-label">Ch. ${item.progress}/${item.chapters}</div>
              `
                : cfg.show_progress && item.progress
                    ? b `<div class="progress-label">Ch. ${item.progress}${item.volumes ? ` · Vol. ${item.progress_volumes}` : ""}</div>`
                    : A}
          </div>
        `;
        })}
      </div>
    `;
    }
    _getMangaItems() {
        if (this._wsManga)
            return [...this._wsManga];
        // Fallback: entity attributes
        const items = [];
        Object.entries(this.hass.states)
            .filter(([id]) => id.startsWith("sensor.anilist_"))
            .forEach(([_id, entity]) => {
            const attrs = entity.attributes;
            if (Array.isArray(attrs["manga_list"])) {
                attrs["manga_list"].forEach((e) => {
                    var _a, _b, _c, _d, _e;
                    items.push({
                        media_id: Number((_a = e["media_id"]) !== null && _a !== void 0 ? _a : 0),
                        title: String((_b = e["title"]) !== null && _b !== void 0 ? _b : ""),
                        status: String((_c = e["status"]) !== null && _c !== void 0 ? _c : "CURRENT"),
                        progress: Number((_d = e["progress"]) !== null && _d !== void 0 ? _d : 0),
                        progress_volumes: Number((_e = e["progress_volumes"]) !== null && _e !== void 0 ? _e : 0),
                        chapters: e["chapters"],
                        volumes: e["volumes"],
                        score: e["score"],
                        cover_image: e["cover_image"],
                        site_url: e["site_url"],
                    });
                });
            }
        });
        return items;
    }
    // ─── View: Profile ──────────────────────────────────────────────────────
    _renderProfile() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        // Prefer WebSocket profile data
        const p = this._wsProfile;
        let animeCount;
        let episodes;
        let hours;
        let animeScore;
        let mangaScore;
        let watching;
        let chaptersRead;
        let mangaCount;
        let topGenres;
        let favourites;
        let viewerName;
        let viewerAvatar;
        if (p && p.is_authenticated) {
            const s = p.stats;
            animeCount = String((_a = s.anime_count) !== null && _a !== void 0 ? _a : 0);
            episodes = String((_b = s.episodes_watched) !== null && _b !== void 0 ? _b : 0);
            hours = String(s.minutes_watched ? Math.round(s.minutes_watched / 60 * 10) / 10 : 0);
            animeScore = String(s.anime_mean_score ? Math.round(s.anime_mean_score / 10 * 10) / 10 : 0);
            mangaScore = String(s.manga_mean_score ? Math.round(s.manga_mean_score / 10 * 10) / 10 : 0);
            watching = "";
            chaptersRead = String((_c = s.chapters_read) !== null && _c !== void 0 ? _c : 0);
            mangaCount = String((_d = s.manga_count) !== null && _d !== void 0 ? _d : 0);
            topGenres = p.top_genres.map((g) => g.genre);
            favourites = p.favourite_anime.map((f) => ({
                title: this._title(f.title),
                site_url: f.site_url,
                cover: f.cover_image,
            }));
            viewerName = p.viewer.name;
            viewerAvatar = p.viewer.avatar;
        }
        else {
            // Fallback: entity states
            animeCount =
                getEntityState(this.hass, "sensor.anilist_anime_gesamt_geschaut") ||
                    getEntityState(this.hass, "sensor.anilist_total_anime_watched");
            episodes =
                getEntityState(this.hass, "sensor.anilist_episoden_gesamt") ||
                    getEntityState(this.hass, "sensor.anilist_total_episodes_watched");
            hours =
                getEntityState(this.hass, "sensor.anilist_stunden_gesamt") ||
                    getEntityState(this.hass, "sensor.anilist_total_hours_watched");
            animeScore =
                getEntityState(this.hass, "sensor.anilist_anime_durchschnittsscore") ||
                    getEntityState(this.hass, "sensor.anilist_anime_mean_score");
            mangaScore =
                getEntityState(this.hass, "sensor.anilist_manga_durchschnittsscore") ||
                    getEntityState(this.hass, "sensor.anilist_manga_mean_score");
            watching =
                getEntityState(this.hass, "sensor.anilist_schaue_ich_gerade") ||
                    getEntityState(this.hass, "sensor.anilist_watching_count");
            chaptersRead =
                getEntityState(this.hass, "sensor.anilist_kapitel_gelesen") ||
                    getEntityState(this.hass, "sensor.anilist_chapters_read");
            mangaCount =
                getEntityState(this.hass, "sensor.anilist_manga_lese_ich") ||
                    getEntityState(this.hass, "sensor.anilist_manga_reading_count");
            const topGenreEntity = this.hass.states["sensor.anilist_top_genre"];
            topGenres = ((_f = (_e = topGenreEntity === null || topGenreEntity === void 0 ? void 0 : topGenreEntity.attributes) === null || _e === void 0 ? void 0 : _e["top_genres"]) !== null && _f !== void 0 ? _f : []);
            favourites = ((_h = (_g = topGenreEntity === null || topGenreEntity === void 0 ? void 0 : topGenreEntity.attributes) === null || _g === void 0 ? void 0 : _g["favourite_anime"]) !== null && _h !== void 0 ? _h : []);
            viewerName = (_j = topGenreEntity === null || topGenreEntity === void 0 ? void 0 : topGenreEntity.attributes) === null || _j === void 0 ? void 0 : _j["viewer_name"];
            viewerAvatar = (_k = topGenreEntity === null || topGenreEntity === void 0 ? void 0 : topGenreEntity.attributes) === null || _k === void 0 ? void 0 : _k["viewer_avatar"];
        }
        const hasStats = animeCount && animeCount !== "unknown" && animeCount !== "0" || (p === null || p === void 0 ? void 0 : p.is_authenticated);
        if (!hasStats) {
            return b `
        <div class="empty">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          <div>${this._t("no_profile")}<br/>${this._t("auth_only")}</div>
        </div>
      `;
        }
        const profileUrl = viewerName ? `https://anilist.co/user/${viewerName}` : undefined;
        const cfg = this._config;
        return b `
      <div class="profile">
        <!-- Avatar + Name -->
        ${cfg.show_avatar !== false || cfg.show_username !== false ? b `
          <div class="profile-header-centered"
            @click=${() => profileUrl && this._handleClick(profileUrl)}
            style=${profileUrl && this._shouldLink() ? "cursor:pointer" : ""}
          >
            ${cfg.show_avatar !== false ? (viewerAvatar
            ? b `<img class="avatar" src=${viewerAvatar} alt=${viewerName !== null && viewerName !== void 0 ? viewerName : ""} loading="lazy" />`
            : b `
                <div class="avatar avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              `) : A}
            ${cfg.show_username !== false
            ? b `<div class="profile-name">${viewerName !== null && viewerName !== void 0 ? viewerName : this._t("profile")}</div>`
            : A}
          </div>
        ` : A}

        <!-- Anime Stats -->
        ${cfg.show_anime_stats !== false ? b `
          <div class="stats-grid">
            ${this._statTile(this._t("anime"), animeCount)}
            ${this._statTile(this._t("episodes"), episodes)}
            ${this._statTile(this._t("hours"), hours)}
            ${this._statTile(this._t("score_avg"), animeScore)}
            ${watching && watching !== "unknown"
            ? this._statTile(this._t("watching_now"), watching)
            : A}
          </div>
        ` : A}

        <!-- Manga Stats -->
        ${cfg.show_manga_stats !== false && mangaCount && mangaCount !== "unknown" ? b `
          <div class="stats-grid">
            ${this._statTile(this._t("manga_count"), mangaCount)}
            ${chaptersRead && chaptersRead !== "unknown"
            ? this._statTile(this._t("chapters"), chaptersRead)
            : A}
            ${mangaScore && mangaScore !== "unknown"
            ? this._statTile(this._t("manga_score"), mangaScore)
            : A}
          </div>
        ` : A}

        <!-- Genre chart -->
        ${cfg.show_genre_chart !== false && topGenres.length ? b `
          <div class="section-label">${this._t("top_genres")}</div>
          ${((_l = p === null || p === void 0 ? void 0 : p.top_genres) === null || _l === void 0 ? void 0 : _l.length)
            ? this._renderGenreChartWithCounts(p.top_genres)
            : this._renderGenreChart(topGenres)}
        ` : A}

        <!-- Favourites -->
        ${cfg.show_favourites !== false && favourites.length ? b `
          <div class="section-label">${this._t("favourites")}</div>
          <div class="fav-list">
            ${favourites.slice(0, 5).map((f) => b `
              <div
                class="fav-item"
                @click=${() => this._handleClick(f.site_url)}
                style=${f.site_url && this._shouldLink() ? "cursor:pointer" : ""}
              >
                ${f.cover
            ? b `<img class="fav-cover" src=${f.cover} alt=${f.title} loading="lazy" />`
            : A}
                <span class="fav-title">${f.title}</span>
              </div>
            `)}
          </div>
        ` : A}
      </div>
    `;
    }
    _renderGenreChart(genres) {
        var _a;
        const chartType = (_a = this._config.chart_type) !== null && _a !== void 0 ? _a : "bar";
        const maxCount = 5;
        const sliced = genres.slice(0, maxCount);
        if (chartType === "tags") {
            return b `
        <div class="genre-chips">
          ${sliced.map((g) => b `<span class="genre-chip">${g}</span>`)}
        </div>
      `;
        }
        if (chartType === "donut") {
            const total = sliced.length;
            const colors = ["#3DB4F2", "#C063FF", "#FF6B6B", "#4ECDC4", "#FFE66D"];
            let cumulative = 0;
            const segments = sliced.map((g, i) => {
                const pct = 100 / total;
                const start = cumulative;
                cumulative += pct;
                return { genre: g, start, pct, color: colors[i % colors.length] };
            });
            // Simple donut via conic-gradient
            const gradientParts = segments.map((s) => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(", ");
            return b `
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${gradientParts})"></div>
          <div class="donut-legend">
            ${segments.map((s) => b `
              <div class="legend-item">
                <span class="legend-dot" style="background:${s.color}"></span>
                <span>${s.genre}</span>
              </div>
            `)}
          </div>
        </div>
      `;
        }
        // Default: bar chart
        const weights = sliced.map((_, i) => 100 - i * 15);
        return b `
      <div class="bar-chart">
        ${sliced.map((g, i) => b `
          <div class="bar-row">
            <span class="bar-label">${g}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${weights[i]}%"></div>
            </div>
          </div>
        `)}
      </div>
    `;
    }
    _renderGenreChartWithCounts(genres) {
        var _a, _b;
        const chartType = (_a = this._config.chart_type) !== null && _a !== void 0 ? _a : "bar";
        const maxCount = 5;
        const sliced = genres.slice(0, maxCount);
        if (chartType === "tags") {
            return b `
        <div class="genre-chips">
          ${sliced.map((g) => b `<span class="genre-chip">${g.genre} (${g.count})</span>`)}
        </div>
      `;
        }
        if (chartType === "donut") {
            const total = sliced.reduce((s, g) => s + g.count, 0) || 1;
            const colors = ["#3DB4F2", "#C063FF", "#FF6B6B", "#4ECDC4", "#FFE66D"];
            let cumulative = 0;
            const segments = sliced.map((g, i) => {
                const pct = (g.count / total) * 100;
                const start = cumulative;
                cumulative += pct;
                return { genre: g.genre, count: g.count, start, pct, color: colors[i % colors.length] };
            });
            const gradientParts = segments.map((s) => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(", ");
            return b `
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${gradientParts})"></div>
          <div class="donut-legend">
            ${segments.map((s) => b `
              <div class="legend-item">
                <span class="legend-dot" style="background:${s.color}"></span>
                <span>${s.genre} (${s.count})</span>
              </div>
            `)}
          </div>
        </div>
      `;
        }
        // Default: bar chart with real proportional widths
        const maxVal = ((_b = sliced[0]) === null || _b === void 0 ? void 0 : _b.count) || 1;
        return b `
      <div class="bar-chart">
        ${sliced.map((g) => b `
          <div class="bar-row">
            <span class="bar-label">${g.genre}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${(g.count / maxVal) * 100}%"></div>
            </div>
            <span class="bar-count">${g.count}</span>
          </div>
        `)}
      </div>
    `;
    }
    _statTile(label, value) {
        return b `
      <div class="stat-tile">
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
    }
    _defaultTitle(view) {
        var _a;
        const keys = {
            airing: "next_episodes",
            watchlist: "watching",
            season: "this_season",
            profile: "profile",
            manga: "manga",
        };
        return this._t((_a = keys[view]) !== null && _a !== void 0 ? _a : "next_episodes");
    }
}
// ─── Styles ────────────────────────────────────────────────────────────
AniListCard.styles = i$3 `
    :host {
      display: block;
      --al-accent: var(--primary-color, #3DB4F2);
      --al-secondary: var(--accent-color, #C063FF);
      --al-card-bg: var(--ha-card-background, var(--card-background-color, #1A1A2E));
      --al-card-bg2: var(--secondary-background-color, #16213E);
      --al-text: var(--primary-text-color, #E8E8E8);
      --al-sub: var(--secondary-text-color, #9B9B9B);
      --al-border-color: var(--divider-color, rgba(61,180,242,0.15));
      --al-border-width: 1px;
      --al-border-radius: 12px;
      --al-bg-opacity: 1;
    }

    .card {
      background: rgba(0, 0, 0, 0); /* transparent base — actual bg via ::before */
      position: relative;
      border: var(--al-border-width) solid var(--al-border-color);
      border-radius: var(--al-border-radius);
      overflow: hidden;
      font-family: var(--primary-font-family, sans-serif);
      color: var(--al-text);
    }
    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--al-card-bg);
      opacity: var(--al-bg-opacity);
      z-index: 0;
      border-radius: inherit;
    }
    .card > * {
      position: relative;
      z-index: 1;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--al-card-bg2);
      border-bottom: 1px solid var(--al-border-color);
    }

    .brand-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
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
      color: var(--al-accent);
      text-decoration: none;
      opacity: 0.8;
    }
    .header-link:hover { opacity: 1; }

    .card-content { }

    /* ─── Cover wrap & score overlay ──────────────────────────────── */
    .cover-wrap, .grid-cover-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .score-overlay {
      position: absolute;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
      color: #fff;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 4px;
      z-index: 1;
    }
    .score-overlay.top-left { top: 4px; left: 4px; }
    .score-overlay.top-right { top: 4px; right: 4px; }
    .score-overlay.bottom-left { bottom: 4px; left: 4px; }
    .score-overlay.bottom-right { bottom: 4px; right: 4px; }
    .score-inline {
      font-weight: 700;
      color: var(--al-accent);
      margin-right: 4px;
      font-size: 0.75rem;
    }
    .next-ep-badge {
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: rgba(0,0,0,0.75);
      color: var(--al-accent);
      font-size: 0.6rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      text-align: center;
      backdrop-filter: blur(4px);
      z-index: 1;
    }

    /* ─── Scroll snap & fade ─────────────────────────────────────── */
    .snap-scroll {
      scroll-snap-type: y mandatory;
    }
    .snap-scroll > .list-item,
    .snap-scroll > .season-item,
    .snap-scroll > .grid-item {
      scroll-snap-align: start;
    }

    .scroll-fade-wrap {
      position: relative;
      -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
      mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
    }

    /* ─── Loading ───────────────────────────────────────────────────── */
    .loading-bar {
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--al-accent), transparent);
      animation: loading-slide 1.2s ease-in-out infinite;
      margin-bottom: 4px;
    }
    @keyframes loading-slide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* ─── Search ────────────────────────────────────────────────────── */
    .search-bar { margin-bottom: 8px; }
    .search-bar input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--al-border-color);
      background: var(--al-card-bg2);
      color: var(--al-text);
      font-size: 0.85rem;
      outline: none;
    }
    .search-bar input:focus {
      border-color: var(--al-accent);
    }

    /* ─── Empty state ──────────────────────────────────────────────── */
    .empty {
      text-align: center;
      color: var(--al-sub);
      padding: 24px 12px;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .empty-icon {
      width: 36px; height: 36px;
      margin-bottom: 8px;
      opacity: 0.5;
    }

    /* ─── Status tabs ──────────────────────────────────────────────── */
    .status-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .status-tabs::-webkit-scrollbar { display: none; }

    .tab-btn {
      padding: 4px 8px;
      border-radius: 12px;
      border: 1px solid var(--al-border-color);
      background: transparent;
      color: var(--al-sub);
      font-size: 0.65rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .tab-btn.active {
      background: var(--al-accent);
      color: #fff;
      border-color: var(--al-accent);
    }
    .tab-btn:hover:not(.active) {
      border-color: var(--al-accent);
      color: var(--al-text);
    }

    /* ─── List view (airing) ───────────────────────────────────────── */
    .list { display: flex; flex-direction: column; gap: 8px; }

    .list-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .list-item:hover { border-color: var(--al-accent); }

    .cover {
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .cover-placeholder {
      border-radius: 4px;
      background: linear-gradient(135deg, color-mix(in srgb, var(--al-accent) 15%, transparent), color-mix(in srgb, var(--al-secondary) 15%, transparent));
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

    .countdown-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      flex-wrap: wrap;
    }

    .countdown {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--al-accent);
    }

    .inline-genres {
      display: flex;
      gap: 3px;
      margin-top: 3px;
      flex-wrap: wrap;
    }

    .mini-chip {
      font-size: 0.62rem;
      color: var(--al-sub);
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 0 4px;
      border-radius: 3px;
    }

    .status-badge {
      font-size: 0.6rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 1px 4px;
      border-radius: 3px;
      letter-spacing: 0.03em;
    }
    .status-badge.airing {
      background: color-mix(in srgb, var(--al-accent) 20%, transparent);
      color: var(--al-accent);
    }

    /* ─── Grid view (watchlist/manga) ──────────────────────────────── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 10px;
    }

    .grid-scroll {
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--al-accent) transparent;
    }
    .grid-scroll::-webkit-scrollbar { width: 4px; }
    .grid-scroll::-webkit-scrollbar-thumb {
      background: var(--al-accent);
      border-radius: 2px;
    }

    .grid-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .grid-item:hover { border-color: var(--al-accent); }

    .grid-cover-wrap { position: relative; }

    .grid-cover {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
      display: block;
    }

    .score-badge {
      position: absolute;
      top: 4px; right: 4px;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
      color: #fff;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 4px;
    }

    .score-bar {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 3px;
      background: rgba(0,0,0,0.3);
    }
    .score-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      border-radius: 0 2px 2px 0;
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
      background: var(--al-border-color);
      border-radius: 2px;
      margin: 0 6px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      border-radius: 2px;
      transition: width 0.4s;
    }

    .progress-label {
      font-size: 0.65rem;
      color: var(--al-sub);
      text-align: center;
      padding: 2px 6px 6px;
    }

    /* ─── Season scroll view ──────────────────────────────────────── */
    .season-scroll {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--al-accent) transparent;
    }

    .season-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .season-item:hover { border-color: var(--al-accent); }

    .season-cover {
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
      color: var(--al-accent);
      background: color-mix(in srgb, var(--al-accent) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--al-accent) 25%, transparent);
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

    /* ─── Profile view ────────────────────────────────────────────── */
    .profile { display: flex; flex-direction: column; gap: 12px; }

    .profile-header-centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .avatar {
      width: 64px; height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--al-accent);
    }

    .avatar-placeholder {
      width: 64px; height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .avatar-placeholder svg { width: 32px; height: 32px; }

    .profile-name {
      font-size: 1rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
    }

    .stat-tile {
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
    }

    .stat-value {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--al-accent);
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

    /* Genre chips (tags mode) */
    .genre-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .genre-chip {
      font-size: 0.75rem;
      color: var(--al-secondary);
      background: color-mix(in srgb, var(--al-secondary) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--al-secondary) 25%, transparent);
      padding: 3px 8px;
      border-radius: 12px;
    }

    /* Genre bar chart */
    .bar-chart { display: flex; flex-direction: column; gap: 6px; }
    .bar-row { display: flex; align-items: center; gap: 8px; }
    .bar-label {
      font-size: 0.75rem;
      color: var(--al-text);
      min-width: 70px;
      text-align: right;
    }
    .bar-count {
      font-size: 0.7rem;
      color: var(--al-sub);
      min-width: 24px;
      text-align: right;
    }
    .bar-track {
      flex: 1;
      height: 8px;
      background: var(--al-border-color);
      border-radius: 4px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      border-radius: 4px;
      transition: width 0.4s;
    }

    /* Genre donut chart */
    .donut-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .donut {
      width: 80px; height: 80px;
      border-radius: 50%;
      position: relative;
      flex-shrink: 0;
    }
    .donut::after {
      content: "";
      position: absolute;
      top: 20%; left: 20%;
      width: 60%; height: 60%;
      border-radius: 50%;
      background: var(--al-card-bg);
    }
    .donut-legend { display: flex; flex-direction: column; gap: 4px; }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: var(--al-text);
    }
    .legend-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* Favourites */
    .fav-list { display: flex; flex-direction: column; gap: 6px; }

    .fav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 6px;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .fav-item:hover { border-color: var(--al-secondary); }

    .fav-cover {
      width: 28px; height: 40px;
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
__decorate([
    r()
], AniListCard.prototype, "_activeTab", void 0);
__decorate([
    r()
], AniListCard.prototype, "_searchQuery", void 0);
__decorate([
    r()
], AniListCard.prototype, "_wsAiring", void 0);
__decorate([
    r()
], AniListCard.prototype, "_wsWatchlist", void 0);
__decorate([
    r()
], AniListCard.prototype, "_wsSeason", void 0);
__decorate([
    r()
], AniListCard.prototype, "_wsManga", void 0);
__decorate([
    r()
], AniListCard.prototype, "_wsProfile", void 0);
__decorate([
    r()
], AniListCard.prototype, "_wsLoading", void 0);
customElements.define("anilist-card", AniListCard);
// Register with HA custom card registry
window["customCards"] =
    window["customCards"] || [];
window["customCards"].push({
    type: "anilist-card",
    name: "AniList",
    description: "AniList anime & manga tracker card with airing, watchlist, season, profile and manga views.",
    preview: true,
});
