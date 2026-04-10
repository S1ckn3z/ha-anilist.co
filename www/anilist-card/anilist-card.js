function e(e,t,s,i){var r,a=arguments.length,o=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(o=(a<3?r(o):a>3?r(t,s,o):r(t,s))||o);return a>3&&o&&Object.defineProperty(t,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let a=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new a(s,e,i)},n=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,v=g?g.emptyScript:"",m=_.reactiveElementPolyfillSupport,b=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},$=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const a=i?.call(this);r?.call(this,t),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:f).toAttribute(t,s.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=i;const a=r.fromAttribute(t,e.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(void 0!==e){const a=this.constructor;if(!1===i&&(r=this[e]),s??=a.getPropertyOptions(e),!((s.hasChanged??$)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},a){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==r||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,m?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");const y=globalThis,S=e=>e,k=y.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,L=`<${P}>`,T=document,M=()=>T.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,z="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,O=/>/g,W=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,q=T.createTreeWalker(T,129);function K(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Q=(e,t)=>{const s=e.length-1,i=[];let r,a=2===t?"<svg>":3===t?"<math>":"",o=U;for(let t=0;t<s;t++){const s=e[t];let n,l,c=-1,d=0;for(;d<s.length&&(o.lastIndex=d,l=o.exec(s),null!==l);)d=o.lastIndex,o===U?"!--"===l[1]?o=D:void 0!==l[1]?o=O:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=W):void 0!==l[3]&&(o=W):o===W?">"===l[0]?(o=r??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?W:'"'===l[3]?B:H):o===B||o===H?o=W:o===D||o===O?o=U:(o=W,r=void 0);const h=o===W&&e[t+1].startsWith("/>")?" ":"";a+=o===U?s+L:c>=0?(i.push(n),s.slice(0,c)+E+s.slice(c)+C+h):s+C+(-2===c?t:h)}return[K(e,a+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,a=0;const o=e.length-1,n=this.parts,[l,c]=Q(e,t);if(this.el=X.createElement(l,s),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=q.nextNode())&&n.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=c[a++],s=i.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?te:"?"===o[1]?se:"@"===o[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(C)&&(n.push({type:6,index:r}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],M()),q.nextNode(),n.push({type:2,index:++r});i.append(e[t],M())}}}else if(8===i.nodeType)if(i.data===P)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)n.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const s=T.createElement("template");return s.innerHTML=e,s}}function J(e,t,s=e,i){if(t===I)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const a=N(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=J(e,r._$AS(e,t.values),r,i)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);q.currentNode=i;let r=q.nextNode(),a=0,o=0,n=s[0];for(;void 0!==n;){if(a===n.index){let t;2===n.type?t=new Y(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new re(r,this,e)),this._$AV.push(t),n=s[++o]}a!==n?.index&&(r=q.nextNode(),a++)}return q.currentNode=T,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),N(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==I&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=X.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Z(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new Y(this.O(M()),this.O(M()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(e,t=this,s,i){const r=this.strings;let a=!1;if(void 0===r)e=J(this,e,t,0),a=!N(e)||e!==this._$AH&&e!==I,a&&(this._$AH=e);else{const i=e;let o,n;for(e=r[0],o=0;o<r.length-1;o++)n=J(this,i[s+o],t,o),n===I&&(n=this._$AH[o]),a||=!N(n)||n!==this._$AH[o],n===V?e=V:e!==V&&(e+=(n??"")+r[o+1]),this._$AH[o]=n}a&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class ie extends ee{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??V)===I)return;const s=this._$AH,i=e===V&&s!==V||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const ae=y.litHtmlPolyfillSupport;ae?.(X,Y),(y.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class ne extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new Y(t.insertBefore(M(),e),e,void 0,s??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}ne._$litElement$=!0,ne.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ne});const le=oe.litElementPolyfillSupport;le?.({LitElement:ne}),(oe.litElementVersions??=[]).push("4.2.2");const ce={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:$},de=(e=ce,t,s)=>{const{kind:i,metadata:r}=s;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),a.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const r=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,r,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];t.call(this,s),this.requestUpdate(i,r,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function he(e){return(t,s)=>"object"==typeof s?de(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function pe(e){return he({...e,state:!0,attribute:!1})}const ue=[{value:"airing",label:"Airing"},{value:"watchlist",label:"Watchlist"},{value:"season",label:"Season"},{value:"profile",label:"Profile"},{value:"manga",label:"Manga"}],_e=[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}],ge=[{value:"relative",label:"Relative (5h 30m)"},{value:"absolute",label:"Absolute (Apr 10, 14:00)"},{value:"both",label:"Both"}],ve=[{value:"anilist",label:"Open AniList"},{value:"none",label:"No link"}],me=[{value:"time",label:"Time"},{value:"title",label:"Title"},{value:"score",label:"Score"}],be=[{value:"compact",label:"Compact"},{value:"normal",label:"Normal"},{value:"relaxed",label:"Relaxed"}],fe=[{value:"bar",label:"Bar Chart"},{value:"donut",label:"Donut Chart"},{value:"tags",label:"Tags"}],$e=[{value:"scroll",label:"Scrollbar"},{value:"limit",label:"Limit items"}],we=[{value:"grid",label:"Grid (Covers)"},{value:"list",label:"List (Rows)"}],xe=[{value:"auto",label:"Auto (smart)"},{value:"user",label:"My Score"},{value:"average",label:"Average Score"}],ye=[{value:"top-right",label:"Top Right"},{value:"top-left",label:"Top Left"},{value:"bottom-right",label:"Bottom Right"},{value:"bottom-left",label:"Bottom Left"},{value:"inline",label:"Inline"},{value:"none",label:"Hidden"}],Se=[{value:"small",label:"Small (fast)"},{value:"medium",label:"Medium"},{value:"large",label:"Large / HD"}],ke=[{value:"CURRENT",label:"Current"},{value:"PLANNING",label:"Planning"},{value:"COMPLETED",label:"Completed"},{value:"PAUSED",label:"Paused"},{value:"DROPPED",label:"Dropped"},{value:"REPEATING",label:"Repeating"}];class Ae extends ne{constructor(){super(...arguments),this._tab="general"}setConfig(e){this._config={...e}}_dispatch(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_set(e,t){this._config={...this._config,[e]:t},this._dispatch()}_val(e){return this._config[e]}render(){return this._config?F`
      <div class="editor">
        <div class="tabs">
          ${["general","view","colors"].map(e=>F`
              <button
                class="tab ${this._tab===e?"active":""}"
                @click=${()=>{this._tab=e}}
              >${this._tabLabel(e)}</button>
            `)}
        </div>
        <div class="tab-content">
          ${"general"===this._tab?this._renderGeneral():V}
          ${"view"===this._tab?this._renderViewSettings():V}
          ${"colors"===this._tab?this._renderColors():V}
        </div>
      </div>
    `:V}_tabLabel(e){var t,s,i;const r=null!==(t=this._config.view)&&void 0!==t?t:"airing",a=null!==(i=null===(s=ue.find(e=>e.value===r))||void 0===s?void 0:s.label)&&void 0!==i?i:"View";return{general:"General",view:a,colors:"Colors"}[e]}_renderGeneral(){return F`
      <div class="section">
        ${this._select("view","View",ue)}
        ${this._text("title","Title (optional)")}
        ${this._text("entry_id","Config Entry ID (optional, for multi-account)")}
        ${this._select("card_padding","Card spacing",be)}
        ${this._select("link_target","Click action",ve)}
        ${this._toggle("show_cover","Show cover images")}
        ${!1!==this._config.show_cover?this._select("cover_size","Cover size",_e):V}
        ${this._select("cover_quality","Cover quality",Se)}
        ${this._select("score_position","Score position",ye)}
        ${this._select("score_source","Score source",xe)}
        ${this._number("visible_items","Visible items (scroll for more)",1,50)}
        ${this._config.visible_items?this._toggle("scroll_snap","Snap scroll to items"):V}
        ${this._config.visible_items?this._toggle("scroll_fade","Fade at scroll edge"):V}
        ${this._toggle("show_search","Show search bar")}
        ${this._toggle("show_tooltips","Show tooltips on hover")}
      </div>
    `}_renderViewSettings(){var e;switch(null!==(e=this._config.view)&&void 0!==e?e:"airing"){case"airing":return this._renderAiringSettings();case"watchlist":return this._renderWatchlistSettings();case"season":return this._renderSeasonSettings();case"profile":return this._renderProfileSettings();case"manga":return this._renderMangaSettings();default:return V}}_renderAiringSettings(){return F`
      <div class="section">
        <div class="section-header">Airing Settings</div>
        ${this._number("max_airing","Max items",1,50)}
        ${this._select("sort_by","Sort by",me)}
        ${this._toggle("show_countdown","Show countdown")}
        ${!1!==this._config.show_countdown?this._select("countdown_format","Countdown format",ge):V}
        ${this._toggle("show_badges","Show status badges")}
        ${this._toggle("show_duration","Show episode duration")}
        ${this._toggle("show_genres","Show genres")}
        ${this._toggle("show_average_score","Show average score")}
        ${this._toggle("show_format_badge","Show format badge (TV/Movie)")}
        ${this._select("layout_mode","Layout",we)}
      </div>
    `}_renderWatchlistSettings(){return F`
      <div class="section">
        <div class="section-header">Watchlist Settings</div>
        ${this._select("layout_mode","Layout",we)}
        ${this._toggle("show_next_airing","Show next episode countdown")}
        ${this._number("max_watchlist","Max items (limit mode)",1,50)}
        ${this._select("overflow_mode","Overflow behavior",$e)}
        ${"scroll"===this._config.overflow_mode?this._number("scroll_height","Scroll height (px)",100,1e3):V}
        ${this._toggle("show_progress","Show progress")}
        ${!1!==this._config.show_progress?this._toggle("show_progress_bar","Show progress bar"):V}

        <div class="section-header">Status Tabs</div>
        ${this._toggle("show_status_tabs","Show status tabs")}
        <label class="field-label">Visible statuses</label>
        <div class="checkbox-group">
          ${ke.map(e=>{var t;return F`
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${(null!==(t=this._config.watchlist_statuses)&&void 0!==t?t:["CURRENT"]).includes(e.value)}
                @change=${t=>{var s;const i=t.target.checked,r=[...null!==(s=this._config.watchlist_statuses)&&void 0!==s?s:["CURRENT"]];if(i&&!r.includes(e.value))r.push(e.value);else if(!i){const t=r.indexOf(e.value);t>=0&&r.splice(t,1)}this._set("watchlist_statuses",r)}}
              />
              ${e.label}
            </label>
          `})}
        </div>
      </div>
    `}_renderSeasonSettings(){var e,t;return F`
      <div class="section">
        <div class="section-header">Season Settings</div>
        ${this._select("layout_mode","Layout",we)}
        ${this._number("max_season","Max items",1,50)}
        <div class="section-header">Filters</div>
        <label class="field-label">Genre filter (comma-separated)</label>
        <input
          class="text-input"
          type="text"
          .value=${(null!==(e=this._config.genre_filter)&&void 0!==e?e:[]).join(", ")}
          @change=${e=>{const t=e.target.value;this._set("genre_filter",t?t.split(",").map(e=>e.trim()).filter(Boolean):[])}}
          placeholder="e.g. Action, Romance"
        />
        <label class="field-label">Format filter (comma-separated)</label>
        <input
          class="text-input"
          type="text"
          .value=${(null!==(t=this._config.format_filter)&&void 0!==t?t:[]).join(", ")}
          @change=${e=>{const t=e.target.value;this._set("format_filter",t?t.split(",").map(e=>e.trim()).filter(Boolean):[])}}
          placeholder="e.g. TV, MOVIE, OVA"
        />
      </div>
    `}_renderProfileSettings(){return F`
      <div class="section">
        <div class="section-header">Profile Settings</div>
        ${this._toggle("show_avatar","Show avatar")}
        ${this._toggle("show_username","Show username")}
        ${this._toggle("show_anime_stats","Show anime statistics")}
        ${this._toggle("show_manga_stats","Show manga statistics")}
        ${this._toggle("show_genre_chart","Show genre chart")}
        ${!1!==this._config.show_genre_chart?this._select("chart_type","Genre chart type",fe):V}
        ${this._toggle("show_favourites","Show favourites")}
      </div>
    `}_renderMangaSettings(){return F`
      <div class="section">
        <div class="section-header">Manga Settings</div>
        ${this._select("layout_mode","Layout",we)}
        ${this._number("max_manga","Max items (limit mode)",1,50)}
        ${this._select("overflow_mode","Overflow behavior",$e)}
        ${"scroll"===this._config.overflow_mode?this._number("scroll_height","Scroll height (px)",100,1e3):V}
        ${this._toggle("show_progress","Show progress")}
        ${!1!==this._config.show_progress?this._toggle("show_progress_bar","Show progress bar"):V}

        <div class="section-header">Status Tabs</div>
        ${this._toggle("show_status_tabs","Show status tabs")}
        <label class="field-label">Visible statuses</label>
        <div class="checkbox-group">
          ${ke.map(e=>{var t;return F`
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${(null!==(t=this._config.watchlist_statuses)&&void 0!==t?t:["CURRENT"]).includes(e.value)}
                @change=${t=>{var s;const i=t.target.checked,r=[...null!==(s=this._config.watchlist_statuses)&&void 0!==s?s:["CURRENT"]];if(i&&!r.includes(e.value))r.push(e.value);else if(!i){const t=r.indexOf(e.value);t>=0&&r.splice(t,1)}this._set("watchlist_statuses",r)}}
              />
              ${e.label}
            </label>
          `})}
        </div>
      </div>
    `}_renderColors(){return F`
      <div class="section">
        ${this._color("accent_color","Accent color")}
        ${this._color("secondary_color","Secondary color")}
        ${this._color("card_background","Card background")}
        ${this._slider("card_opacity","Card opacity",0,100)}
        ${this._color("border_color","Border color")}
        ${this._number("border_width","Border width (px)",0,10)}
        ${this._number("border_radius","Border radius (px)",0,30)}
      </div>
    `}_select(e,t,s){var i,r;return F`
      <div class="field">
        <label class="field-label">${t}</label>
        <select
          class="select-input"
          .value=${String(null!==(i=this._val(e))&&void 0!==i?i:null===(r=s[0])||void 0===r?void 0:r.value)}
          @change=${t=>this._set(e,t.target.value)}
        >
          ${s.map(t=>F`
            <option value=${t.value} ?selected=${this._val(e)===t.value}>${t.label}</option>
          `)}
        </select>
      </div>
    `}_text(e,t){var s;return F`
      <div class="field">
        <label class="field-label">${t}</label>
        <input
          class="text-input"
          type="text"
          .value=${String(null!==(s=this._val(e))&&void 0!==s?s:"")}
          @change=${t=>{const s=t.target.value;this._set(e,s||void 0)}}
        />
      </div>
    `}_number(e,t,s,i){var r;return F`
      <div class="field">
        <label class="field-label">${t}</label>
        <input
          class="text-input"
          type="number"
          min=${s}
          max=${i}
          .value=${String(null!==(r=this._val(e))&&void 0!==r?r:"")}
          @change=${t=>{const s=t.target.value;this._set(e,s?Number(s):void 0)}}
        />
      </div>
    `}_toggle(e,t){return F`
      <div class="field toggle-field">
        <label class="field-label">${t}</label>
        <label class="switch">
          <input
            type="checkbox"
            .checked=${!1!==this._val(e)}
            @change=${t=>this._set(e,t.target.checked)}
          />
          <span class="slider"></span>
        </label>
      </div>
    `}_color(e,t){var s,i;return F`
      <div class="field color-field">
        <label class="field-label">${t}</label>
        <div class="color-input-wrap">
          <input
            type="color"
            class="color-picker"
            .value=${String(null!==(s=this._val(e))&&void 0!==s?s:"#3DB4F2")}
            @input=${t=>this._set(e,t.target.value)}
          />
          <input
            class="text-input color-text"
            type="text"
            .value=${String(null!==(i=this._val(e))&&void 0!==i?i:"")}
            @change=${t=>{const s=t.target.value;this._set(e,s||void 0)}}
            placeholder="auto"
          />
        </div>
      </div>
    `}_slider(e,t,s,i){var r;const a=Number(null!==(r=this._val(e))&&void 0!==r?r:i);return F`
      <div class="field">
        <label class="field-label">${t}: ${a}</label>
        <input
          type="range"
          class="range-input"
          min=${s}
          max=${i}
          .value=${String(a)}
          @input=${t=>this._set(e,Number(t.target.value))}
        />
      </div>
    `}}Ae.styles=o`
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
  `,e([he({attribute:!1})],Ae.prototype,"hass",void 0),e([pe()],Ae.prototype,"_config",void 0),e([pe()],Ae.prototype,"_tab",void 0),customElements.define("anilist-card-editor",Ae);const Ee={en:{next_episodes:"Next Episodes",watching:"Currently Watching",this_season:"This Season",profile:"AniList Profile",manga:"Manga Reading",no_episodes:"No episodes in the coming days.",no_watchlist:"No anime in the watchlist.",no_season:"No season data available.",no_profile:"No profile stats available.",no_manga:"No manga in the list.",auth_only:"Only for logged-in users.",episode:"Episode",ep:"Ep.",aired:"Aired",anime:"Anime",episodes:"Episodes",hours:"Hours",score_avg:"Avg Score",watching_now:"Watching",chapters:"Chapters",volumes:"Volumes",manga_count:"Manga",manga_score:"Manga Score",top_genres:"Top Genres",favourites:"Favourites",search_placeholder:"Search...",current:"Current",planning:"Planning",completed:"Completed",paused:"Paused",dropped:"Dropped",repeating:"Repeating",next_season_label:"Next Season"},de:{next_episodes:"Nächste Episoden",watching:"Schaue ich gerade",this_season:"Diese Season",profile:"AniList Profil",manga:"Manga Leseliste",no_episodes:"Keine Episoden in den nächsten Tagen.",no_watchlist:"Keine Anime in der Watchlist.",no_season:"Keine Season-Daten verfügbar.",no_profile:"Keine Profil-Statistiken verfügbar.",no_manga:"Keine Manga in der Liste.",auth_only:"Nur für eingeloggte Nutzer.",episode:"Episode",ep:"Ep.",aired:"Ausgestrahlt",anime:"Anime",episodes:"Episoden",hours:"Stunden",score_avg:"Ø Score",watching_now:"Schaue ich",chapters:"Kapitel",volumes:"Bände",manga_count:"Manga",manga_score:"Manga Score",top_genres:"Top Genres",favourites:"Favoriten",search_placeholder:"Suchen...",current:"Aktuell",planning:"Geplant",completed:"Abgeschlossen",paused:"Pausiert",dropped:"Abgebrochen",repeating:"Wiederholen",next_season_label:"Nächste Season"},ja:{next_episodes:"次のエピソード",watching:"視聴中",this_season:"今期",profile:"AniListプロフィール",manga:"読書中",no_episodes:"今後のエピソードはありません。",no_watchlist:"ウォッチリストにアニメがありません。",no_season:"シーズンデータがありません。",no_profile:"プロフィール統計がありません。",no_manga:"リストにマンガがありません。",auth_only:"ログインユーザーのみ。",episode:"エピソード",ep:"話",aired:"放送済み",anime:"アニメ",episodes:"エピソード",hours:"時間",score_avg:"平均スコア",watching_now:"視聴中",chapters:"章",volumes:"巻",manga_count:"マンガ",manga_score:"マンガスコア",top_genres:"トップジャンル",favourites:"お気に入り",search_placeholder:"検索...",current:"視聴中",planning:"予定",completed:"完了",paused:"一時停止",dropped:"中断",repeating:"リピート",next_season_label:"来期"}};function Ce(e,t,s){const i="number"==typeof e?1e3*e:new Date(e).getTime(),r=i-Date.now();if(r<=0)return(Ee[s]||Ee.en).aired;const a=Math.floor(r/36e5),o=Math.floor(r%36e5/6e4),n=a>=24?`${Math.floor(a/24)}d ${a%24}h`:a>0?`${a}h ${o}m`:`${o}m`,l=new Date(i).toLocaleString(s,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return"absolute"===t?l:"both"===t?`${n} (${l})`:n}function Pe(e,t){var s,i;return null!==(i=null===(s=e.states[t])||void 0===s?void 0:s.state)&&void 0!==i?i:""}function Le(e){return e?(e/10).toFixed(1).replace(/\.0$/,""):""}function Te(e,t){return e&&"none"!==t?"inline"===t?V:F`<span class="score-overlay ${t}">★${Le(e)}</span>`:V}function Me(e,t){return e&&"inline"===t?F`<span class="score-inline">★${Le(e)}</span>`:V}class Ne extends ne{constructor(){super(...arguments),this._activeTab="CURRENT",this._searchQuery="",this._wsAiring=null,this._wsWatchlist=null,this._wsSeason=null,this._wsManga=null,this._wsProfile=null,this._wsLoading=!1,this._lastSensorHash="",this._wsLoadedViews=new Set,this._wsLoadPromise=null,this._wsInitDone=!1}static getConfigElement(){return document.createElement("anilist-card-editor")}static getStubConfig(){return{type:"custom:anilist-card",view:"airing",max_items:5}}setConfig(e){if(!e)throw new Error("Invalid config");this._config={view:"airing",max_items:5,show_cover:!0,cover_size:"medium",show_countdown:!0,countdown_format:"relative",show_progress:!0,show_progress_bar:!0,show_badges:!0,show_search:!1,show_tooltips:!1,link_target:"anilist",sort_by:"time",card_padding:"normal",show_duration:!1,show_genres:!1,show_average_score:!1,show_format_badge:!1,watchlist_statuses:["CURRENT","PLANNING","COMPLETED","PAUSED","DROPPED"],show_status_tabs:!0,genre_filter:[],format_filter:[],chart_type:"bar",overflow_mode:"scroll",scroll_height:400,show_avatar:!0,show_username:!0,show_anime_stats:!0,show_manga_stats:!0,show_genre_chart:!0,show_favourites:!0,link_to_anilist:!0,...e},!1!==e.link_to_anilist||e.link_target||(this._config.link_target="none")}connectedCallback(){super.connectedCallback(),this._tick=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tick),this._wsInitDone=!1}updated(e){var t;if(super.updated(e),!e.has("hass")||!(null===(t=this.hass)||void 0===t?void 0:t.callWS))return;if(!this._wsInitDone)return this._wsInitDone=!0,this._lastSensorHash=this._sensorHash(),void this._triggerWSLoad();const s=this._sensorHash();s!==this._lastSensorHash&&(this._lastSensorHash=s,this._wsLoadedViews.clear(),this._triggerWSLoad())}_sensorHash(){var e,t;let s="";for(const[i,r]of Object.entries(null!==(t=null===(e=this.hass)||void 0===e?void 0:e.states)&&void 0!==t?t:{}))i.startsWith("sensor.anilist_")&&(s+=`${i}:${r.state};`);return s}_triggerWSLoad(){var e,t;if(this._wsLoadPromise)return;const s=null!==(t=null===(e=this._config)||void 0===e?void 0:e.view)&&void 0!==t?t:"airing";this._wsLoadPromise=this._loadViewData(s).then(()=>{this._wsLoadedViews.add(s),this._wsLoadPromise=null}).catch(()=>{this._wsLoadPromise=null})}async _loadViewData(e){var t;if(null===(t=this.hass)||void 0===t?void 0:t.callWS){this._wsLoading=!0;try{const t=this._config.entry_id;if("airing"===e){const e=await this.hass.callWS({type:"anilist/airing_schedule",...t?{entry_id:t}:{}});this._wsAiring=e.items}else if("watchlist"===e){const e=await this.hass.callWS({type:"anilist/watchlist",...t?{entry_id:t}:{}});this._wsWatchlist=e.items}else if("season"===e){const e=await this.hass.callWS({type:"anilist/season",...t?{entry_id:t}:{}});this._wsSeason=e.items}else if("manga"===e){const e=await this.hass.callWS({type:"anilist/manga",...t?{entry_id:t}:{}});this._wsManga=e.items}else"profile"===e&&(this._wsProfile=await this.hass.callWS({type:"anilist/profile",...t?{entry_id:t}:{}}))}catch(t){"airing"===e?this._wsAiring=null:"season"===e&&(this._wsSeason=null),"watchlist"===e?(this._wsWatchlist=[],this._wsLoadedViews.add(e)):"manga"===e?(this._wsManga=[],this._wsLoadedViews.add(e)):"profile"===e&&(this._wsProfile=null,this._wsLoadedViews.add(e))}finally{this._wsLoading=!1}}}_title(e){return function(e,t="romaji"){return e?"string"==typeof e?e:e[t]||e.romaji||e.english||e.native||"Unknown":"Unknown"}(e,this._lang())}_coverUrl(e){var t;const s=null!==(t=this._config.cover_quality)&&void 0!==t?t:"large";return e.cover_images?e.cover_images[s]||e.cover_images.medium||e.cover_images.small:e.cover_image}_scorePos(){var e;return null!==(e=this._config.score_position)&&void 0!==e?e:"top-right"}_pickScore(e,t){var s;const i=null!==(s=this._config.score_source)&&void 0!==s?s:"auto";return"user"===i?e.score||void 0:"average"===i||"airing"===t||"season"===t?e.average_score||void 0:e.score&&e.score>0?e.score:e.average_score||void 0}_layoutMode(){var e;const t=this._config;if(t.layout_mode)return t.layout_mode;const s=null!==(e=t.view)&&void 0!==e?e:"airing";return"airing"===s||"season"===s?"list":"grid"}_t(e){var t,s;const i=(null===(s=null===(t=this.hass)||void 0===t?void 0:t.language)||void 0===s?void 0:s.substring(0,2))||"en";return(Ee[i]||Ee.en)[e]||e}_lang(){var e,t;return(null===(t=null===(e=this.hass)||void 0===e?void 0:e.language)||void 0===t?void 0:t.substring(0,2))||"en"}_padding(){const e=this._config.card_padding;return"compact"===e?"8px":"relaxed"===e?"16px":"12px"}_coverDims(){const e=this._config.cover_size;return"small"===e?{w:40,h:56}:"large"===e?{w:64,h:90}:{w:48,h:68}}_scrollClasses(){const e=this._config;if(!e.visible_items)return"";const t=["scroll-container","grid-scroll"];return!1!==e.scroll_snap&&t.push("snap-scroll"),!1!==e.scroll_fade&&t.push("scroll-fade-wrap"),t.join(" ")}_applyScrollHeights(){var e;const t=null===(e=this._config)||void 0===e?void 0:e.visible_items;t&&this.shadowRoot&&requestAnimationFrame(()=>{this.shadowRoot.querySelectorAll(".scroll-container").forEach(e=>{const s=e.querySelector(".list-item, .grid-item, .season-item");if(!s)return;const i=s.getBoundingClientRect().height,r=parseFloat(getComputedStyle(e).gap)||8,a=t*(i+r)-r;e.style.maxHeight=`${a}px`,e.style.overflowY="auto"})})}_maxFor(e){var t;const s=this._config;return"airing"===e&&s.max_airing?s.max_airing:"watchlist"===e&&s.max_watchlist?s.max_watchlist:"season"===e&&s.max_season?s.max_season:"manga"===e&&s.max_manga?s.max_manga:null!==(t=s.max_items)&&void 0!==t?t:5}_shouldLink(){return"anilist"===this._config.link_target}_handleClick(e){e&&this._shouldLink()&&window.open(e,"_blank","noopener")}_hostStyle(){const e=this._config,t=[];return e.accent_color&&t.push(`--al-accent: ${e.accent_color}`),e.secondary_color&&t.push(`--al-secondary: ${e.secondary_color}`),e.card_background&&t.push(`--al-card-bg: ${e.card_background}`),void 0!==e.card_opacity&&t.push("--al-bg-opacity: "+e.card_opacity/100),e.border_color&&t.push(`--al-border-color: ${e.border_color}`),void 0!==e.border_width&&t.push(`--al-border-width: ${e.border_width}px`),void 0!==e.border_radius&&t.push(`--al-border-radius: ${e.border_radius}px`),t.join(";")}render(){var e,t,s;if(!this._config||!this.hass)return V;const i=null!==(e=this._config.view)&&void 0!==e?e:"airing";this._wsLoadedViews.has(i)||this._wsLoadPromise||!(null===(t=this.hass)||void 0===t?void 0:t.callWS)||this._triggerWSLoad(),this._config.visible_items&&this.updateComplete.then(()=>this._applyScrollHeights());const r=null!==(s=this._config.title)&&void 0!==s?s:this._defaultTitle(i),a=this._padding();return F`
      <div class="card" style="${this._hostStyle()}">
        <div class="card-header" style="padding:${a} ${a}">
          <span class="brand-dot"></span>
          <span class="header-title">${r}</span>
        </div>
        <div class="card-content" style="padding:${a}">
          ${this._config.show_search?this._renderSearch():V}
          ${this._wsLoading?F`<div class="loading-bar"></div>`:V}
          ${"airing"===i?this._renderAiring():V}
          ${"watchlist"===i?this._renderWatchlist():V}
          ${"season"===i?this._renderSeason():V}
          ${"profile"===i?this._renderProfile():V}
          ${"manga"===i?this._renderManga():V}
        </div>
      </div>
    `}_renderSearch(){return F`
      <div class="search-bar">
        <input
          type="text"
          aria-label=${this._t("search_placeholder")}
          placeholder=${this._t("search_placeholder")}
          .value=${this._searchQuery}
          @input=${e=>{this._searchQuery=e.target.value}}
        />
      </div>
    `}_matchesSearch(e){return!this._searchQuery||e.toLowerCase().includes(this._searchQuery.toLowerCase())}_renderEmpty(e){return F`
      <div class="empty">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm1-5C6.47 2 2 6.5 2 12s4.47 10 10 10 10-4.5 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        <div>${this._t(e)}</div>
      </div>
    `}_renderStatusTabs(e){const t={CURRENT:this._t("current"),PLANNING:this._t("planning"),COMPLETED:this._t("completed"),PAUSED:this._t("paused"),DROPPED:this._t("dropped"),REPEATING:this._t("repeating")};return F`
      <div class="status-tabs">
        ${e.map(e=>F`
          <button
            class="tab-btn ${this._activeTab===e?"active":""}"
            @click=${()=>{this._activeTab=e}}
          >${t[e]||e}</button>
        `)}
      </div>
    `}_renderAiring(){let e=this._getAiringItems();if(e=e.filter(e=>this._matchesSearch(this._title(e.title))),!e.length)return this._renderEmpty("no_episodes");const{w:t,h:s}=this._coverDims(),i=this._config,r=this._lang(),a=this._scrollClasses(),o=this._scorePos();return F`
      <div class="list ${a}">
        ${e.map(e=>{var a,n;const l=this._title(e.title),c=this._coverUrl(e),d=this._pickScore(e,"airing");return F`
          <div
            class="list-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":V}
            tabindex=${this._shouldLink()&&e.site_url?"0":V}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${i.show_tooltips?`${l} - ${this._t("episode")} ${e.episode}`:""}
          >
            ${i.show_cover?F`
              <div class="cover-wrap" style="width:${t}px;height:${s}px">
                ${c?F`<img class="cover" src=${c} alt=${l} loading="lazy" style="width:${t}px;height:${s}px" />`:F`<div class="cover cover-placeholder" style="width:${t}px;height:${s}px"><span>?</span></div>`}
                ${Te(d,o)}
              </div>
            `:V}
            <div class="item-info">
              <div class="item-title">${Me(d,o)}${l}</div>
              <div class="item-sub">
                ${this._t("episode")} ${e.episode}
                ${i.show_duration&&e.duration?F` · ${e.duration}min`:V}
                ${i.show_average_score&&e.average_score?F` · ★${e.average_score}%`:V}
              </div>
              ${i.show_genres&&(null===(a=e.genres)||void 0===a?void 0:a.length)?F`<div class="inline-genres">${e.genres.slice(0,3).map(e=>F`<span class="mini-chip">${e}</span>`)}</div>`:V}
              <div class="countdown-row">
                ${i.show_countdown?F`<span class="countdown">${Ce(e.airing_at,null!==(n=i.countdown_format)&&void 0!==n?n:"relative",r)}</span>`:V}
                ${i.show_format_badge&&e.format?F`<span class="format-chip">${e.format}</span>`:V}
                ${i.show_badges?F`<span class="status-badge airing">Airing</span>`:V}
              </div>
            </div>
          </div>
        `})}
      </div>
    `}_getAiringItems(){const e=this._maxFor("airing");let t;if(this._wsAiring)t=[...this._wsAiring];else{if(this._config.entry_id)return[];if(t=[],Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([e,s])=>{const i=s.attributes;Array.isArray(i.airing_schedule)&&i.airing_schedule.forEach(e=>{var s,i,r,a;t.push({media_id:Number(null!==(s=e.media_id)&&void 0!==s?s:0),title:String(null!==(i=e.title)&&void 0!==i?i:""),episode:Number(null!==(r=e.episode)&&void 0!==r?r:0),airing_at:String(null!==(a=e.airing_at)&&void 0!==a?a:""),cover_image:e.cover_image,site_url:e.site_url,duration:e.duration,genres:e.genres,average_score:e.average_score,format:e.format})})}),!t.length){const e=Pe(this.hass,"sensor.anilist_next_airing_anime"),s=Pe(this.hass,"sensor.anilist_next_episode_time");e&&"unknown"!==e&&t.push({media_id:0,title:e,episode:1,airing_at:s})}}const s=this._config.sort_by;return"title"===s?t.sort((e,t)=>this._title(e.title).localeCompare(this._title(t.title))):"score"===s&&t.sort((e,t)=>{var s,i;return(null!==(s=t.average_score)&&void 0!==s?s:0)-(null!==(i=e.average_score)&&void 0!==i?i:0)}),t.slice(0,e)}_renderWatchlist(){var e,t;const s=null!==(e=this._config.watchlist_statuses)&&void 0!==e?e:["CURRENT"],i=this._config.show_status_tabs&&s.length>1;i&&!s.includes(this._activeTab)&&(this._activeTab=null!==(t=s[0])&&void 0!==t?t:"CURRENT");let r=this._getWatchlistItems();r=i?r.filter(e=>e.status===this._activeTab):r.filter(e=>s.includes(e.status)),r=r.filter(e=>this._matchesSearch(this._title(e.title)));return"scroll"===this._config.overflow_mode||(r=r.slice(0,this._maxFor("watchlist"))),F`
      ${i?this._renderStatusTabs(s):V}
      ${r.length?"list"===this._layoutMode()?this._renderWatchlistList(r):this._renderWatchlistGrid(r):this._renderEmpty("no_watchlist")}
    `}_renderWatchlistList(e){const t=this._config,s=this._scrollClasses(),i=this._scorePos(),r=this._lang(),{w:a,h:o}=this._coverDims();return F`
      <div class="list ${s}">
        ${e.map(e=>{const s=this._title(e.title),n=this._coverUrl(e),l=this._pickScore(e,"watchlist");return F`
          <div class="list-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":V}
            tabindex=${this._shouldLink()&&e.site_url?"0":V}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}>
            ${t.show_cover?F`
              <div class="cover-wrap" style="width:${a}px;height:${o}px">
                ${n?F`<img class="cover" src=${n} alt=${s} loading="lazy" style="width:${a}px;height:${o}px" />`:F`<div class="cover cover-placeholder" style="width:${a}px;height:${o}px"><span>${s[0]}</span></div>`}
                ${Te(l,i)}
              </div>`:V}
            <div class="item-info">
              <div class="item-title">${Me(l,i)}${s}</div>
              <div class="item-sub">
                ${this._t("ep")} ${e.progress}${e.episodes?`/${e.episodes}`:""}
                ${!1!==t.show_next_airing&&e.next_airing_episode?F` · <span class="countdown">${Ce(e.next_airing_episode.airing_at,"relative",r)}</span>`:V}
              </div>
              ${t.show_progress_bar&&e.episodes?F`
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,e.progress/e.episodes*100)}%"></div></div>
              `:V}
            </div>
          </div>
        `})}
      </div>
    `}_renderWatchlistGrid(e){var t;const s=this._config,i=this._scrollClasses(),r=s.visible_items||"scroll"!==s.overflow_mode?"":`max-height:${null!==(t=s.scroll_height)&&void 0!==t?t:400}px;overflow-y:auto`,a=this._scorePos(),o=this._lang();return F`
      <div class="grid ${i||(r?"grid-scroll":"")}"
        style=${r}>
        ${e.map(e=>{var t,i;const r=this._title(e.title),n=this._coverUrl(e),l=this._pickScore(e,"watchlist");return F`
          <div
            class="grid-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":V}
            tabindex=${this._shouldLink()&&e.site_url?"0":V}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${s.show_tooltips?`${r} - ${e.progress}/${null!==(t=e.episodes)&&void 0!==t?t:"?"}`:""}
          >
            <div class="grid-cover-wrap">
              ${s.show_cover&&n?F`<img class="grid-cover" src=${n} alt=${r} loading="lazy" />`:F`<div class="grid-cover cover-placeholder"><span>${null!==(i=r[0])&&void 0!==i?i:"?"}</span></div>`}
              ${Te(l,a)}
              ${!1!==s.show_next_airing&&e.next_airing_episode?F`<div class="next-ep-badge">${Ce(e.next_airing_episode.airing_at,"relative",o)}</div>`:V}
            </div>
            <div class="grid-title">${Me(l,a)}${r}</div>
            ${s.show_progress&&s.show_progress_bar&&e.episodes?F`
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100,e.progress/e.episodes*100)}%"></div>
                </div>
                <div class="progress-label">${e.progress}/${e.episodes}</div>
              `:s.show_progress&&e.progress?F`<div class="progress-label">${this._t("ep")} ${e.progress}</div>`:V}
          </div>
        `})}
      </div>
    `}_getWatchlistItems(){if(null!==this._wsWatchlist)return[...this._wsWatchlist];if(this._config.entry_id)return[];const e=[];return Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([t,s])=>{const i=s.attributes;Array.isArray(i.watchlist)&&i.watchlist.forEach(t=>{var s,i,r,a;e.push({media_id:Number(null!==(s=t.media_id)&&void 0!==s?s:0),title:String(null!==(i=t.title)&&void 0!==i?i:""),status:String(null!==(r=t.status)&&void 0!==r?r:"CURRENT"),progress:Number(null!==(a=t.progress)&&void 0!==a?a:0),episodes:t.episodes,score:t.score,cover_image:t.cover_image,site_url:t.site_url})})}),e}_renderSeason(){let e=this._getSeasonItems();if(e=e.filter(e=>this._matchesSearch(this._title(e.title))),!e.length)return this._renderEmpty("no_season");const t=this._config,{w:s,h:i}=this._coverDims(),r=this._scrollClasses(),a=this._scorePos();return F`
      <div class="season-scroll ${r}">
        ${e.map(e=>{var r,o;const n=this._title(e.title),l=this._coverUrl(e),c=this._pickScore(e,"season");return F`
          <div
            class="season-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":V}
            tabindex=${this._shouldLink()&&e.site_url?"0":V}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${t.show_tooltips?`${n} - ${null!==(o=null===(r=e.genres)||void 0===r?void 0:r.join(", "))&&void 0!==o?o:""}`:""}
          >
            ${t.show_cover?F`
              <div class="cover-wrap" style="width:${s-8}px;height:${i-12}px">
                ${l?F`<img class="season-cover" src=${l} alt=${n} loading="lazy" style="width:${s-8}px;height:${i-12}px" />`:F`<div class="season-cover cover-placeholder" style="width:${s-8}px;height:${i-12}px"><span>${n[0]}</span></div>`}
                ${Te(c,a)}
              </div>
            `:V}
            <div class="season-info">
              <div class="season-title">${Me(c,a)}${n}</div>
              <div class="season-meta">
                ${"inline"!==a&&c?F`<span class="score-chip">★${Le(c)}</span>`:V}
                ${e.format?F`<span class="format-chip">${e.format}</span>`:V}
              </div>
            </div>
          </div>
        `})}
      </div>
    `}_getSeasonItems(){var e,t;const s=this._maxFor("season"),i=this._config;let r;if(this._wsSeason)r=[...this._wsSeason];else{if(this._config.entry_id)return[];r=[],Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([e,t])=>{const s=t.attributes;Array.isArray(s.season_anime)&&s.season_anime.forEach(e=>{var t,s;r.push({id:Number(null!==(t=e.id)&&void 0!==t?t:0),title:String(null!==(s=e.title)&&void 0!==s?s:""),average_score:e.average_score,episodes:e.episodes,format:e.format,genres:e.genres,cover_image:e.cover_image,site_url:e.site_url,next_airing_episode:e.next_airing_episode})})})}let a=r;if(null===(e=i.genre_filter)||void 0===e?void 0:e.length){const e=new Set(i.genre_filter);a=a.filter(t=>{var s;return null===(s=t.genres)||void 0===s?void 0:s.some(t=>e.has(t))})}if(null===(t=i.format_filter)||void 0===t?void 0:t.length){const e=new Set(i.format_filter);a=a.filter(t=>t.format&&e.has(t.format))}return a.slice(0,s)}_renderManga(){var e,t;const s=null!==(e=this._config.watchlist_statuses)&&void 0!==e?e:["CURRENT"],i=this._config.show_status_tabs&&s.length>1;i&&!s.includes(this._activeTab)&&(this._activeTab=null!==(t=s[0])&&void 0!==t?t:"CURRENT");let r=this._getMangaItems();r=i?r.filter(e=>e.status===this._activeTab):r.filter(e=>s.includes(e.status)),r=r.filter(e=>this._matchesSearch(this._title(e.title)));return"scroll"===this._config.overflow_mode||(r=r.slice(0,this._maxFor("manga"))),F`
      ${i?this._renderStatusTabs(s):V}
      ${r.length?"list"===this._layoutMode()?this._renderMangaList(r):this._renderMangaGrid(r):this._renderEmpty("no_manga")}
    `}_renderMangaList(e){const t=this._config,s=this._scrollClasses(),i=this._scorePos(),{w:r,h:a}=this._coverDims();return F`
      <div class="list ${s}">
        ${e.map(e=>{const s=this._title(e.title),o=this._coverUrl(e),n=this._pickScore(e,"manga");return F`
          <div class="list-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":V}
            tabindex=${this._shouldLink()&&e.site_url?"0":V}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}>
            ${t.show_cover?F`
              <div class="cover-wrap" style="width:${r}px;height:${a}px">
                ${o?F`<img class="cover" src=${o} alt=${s} loading="lazy" style="width:${r}px;height:${a}px" />`:F`<div class="cover cover-placeholder" style="width:${r}px;height:${a}px"><span>${s[0]}</span></div>`}
                ${Te(n,i)}
              </div>`:V}
            <div class="item-info">
              <div class="item-title">${Me(n,i)}${s}</div>
              <div class="item-sub">Ch. ${e.progress}${e.chapters?`/${e.chapters}`:""}${e.volumes?` · Vol. ${e.progress_volumes}`:""}</div>
              ${t.show_progress_bar&&e.chapters?F`
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,e.progress/e.chapters*100)}%"></div></div>
              `:V}
            </div>
          </div>
        `})}
      </div>
    `}_renderMangaGrid(e){var t;const s=this._config,i=this._scrollClasses(),r=s.visible_items||"scroll"!==s.overflow_mode?"":`max-height:${null!==(t=s.scroll_height)&&void 0!==t?t:400}px;overflow-y:auto`,a=this._scorePos();return F`
      <div class="grid ${i||(r?"grid-scroll":"")}"
        style=${r}>
        ${e.map(e=>{var t,i;const r=this._title(e.title),o=this._coverUrl(e),n=this._pickScore(e,"manga");return F`
          <div
            class="grid-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":V}
            tabindex=${this._shouldLink()&&e.site_url?"0":V}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${s.show_tooltips?`${r} - Ch.${e.progress}/${null!==(t=e.chapters)&&void 0!==t?t:"?"}`:""}
          >
            <div class="grid-cover-wrap">
              ${s.show_cover&&o?F`<img class="grid-cover" src=${o} alt=${r} loading="lazy" />`:F`<div class="grid-cover cover-placeholder"><span>${null!==(i=r[0])&&void 0!==i?i:"?"}</span></div>`}
              ${Te(n,a)}
            </div>
            <div class="grid-title">${Me(n,a)}${r}</div>
            ${s.show_progress&&s.show_progress_bar&&e.chapters?F`
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100,e.progress/e.chapters*100)}%"></div>
                </div>
                <div class="progress-label">Ch. ${e.progress}/${e.chapters}</div>
              `:s.show_progress&&e.progress?F`<div class="progress-label">Ch. ${e.progress}${e.volumes?` · Vol. ${e.progress_volumes}`:""}</div>`:V}
          </div>
        `})}
      </div>
    `}_getMangaItems(){if(null!==this._wsManga)return[...this._wsManga];if(this._config.entry_id)return[];const e=[];return Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([t,s])=>{const i=s.attributes;Array.isArray(i.manga_list)&&i.manga_list.forEach(t=>{var s,i,r,a,o;e.push({media_id:Number(null!==(s=t.media_id)&&void 0!==s?s:0),title:String(null!==(i=t.title)&&void 0!==i?i:""),status:String(null!==(r=t.status)&&void 0!==r?r:"CURRENT"),progress:Number(null!==(a=t.progress)&&void 0!==a?a:0),progress_volumes:Number(null!==(o=t.progress_volumes)&&void 0!==o?o:0),chapters:t.chapters,volumes:t.volumes,score:t.score,cover_image:t.cover_image,site_url:t.site_url})})}),e}_renderProfile(){var e,t,s,i,r,a,o,n,l,c,d;const h=this._wsProfile;let p,u,_,g,v,m,b,f,$,w,x,y;if(h&&h.is_authenticated){const r=h.stats;p=String(null!==(e=r.anime_count)&&void 0!==e?e:0),u=String(null!==(t=r.episodes_watched)&&void 0!==t?t:0),_=String(r.minutes_watched?Math.round(r.minutes_watched/60*10)/10:0),g=String(r.anime_mean_score?Math.round(r.anime_mean_score/10*10)/10:0),v=String(r.manga_mean_score?Math.round(r.manga_mean_score/10*10)/10:0),m="",b=String(null!==(s=r.chapters_read)&&void 0!==s?s:0),f=String(null!==(i=r.manga_count)&&void 0!==i?i:0),$=h.top_genres.map(e=>e.genre),w=h.favourite_anime.map(e=>({title:this._title(e.title),site_url:e.site_url,cover:e.cover_image})),x=h.viewer.name,y=h.viewer.avatar}else{if(this._wsLoadedViews.has("profile")||this._config.entry_id)return this._renderEmpty("no_profile");p=Pe(this.hass,"sensor.anilist_total_anime_watched"),u=Pe(this.hass,"sensor.anilist_total_episodes_watched"),_=Pe(this.hass,"sensor.anilist_total_hours_watched"),g=Pe(this.hass,"sensor.anilist_anime_mean_score"),v=Pe(this.hass,"sensor.anilist_manga_mean_score"),m=Pe(this.hass,"sensor.anilist_watching_count"),b=Pe(this.hass,"sensor.anilist_chapters_read"),f=Pe(this.hass,"sensor.anilist_manga_reading_count");const e=this.hass.states["sensor.anilist_top_genre"];$=null!==(a=null===(r=null==e?void 0:e.attributes)||void 0===r?void 0:r.top_genres)&&void 0!==a?a:[],w=null!==(n=null===(o=null==e?void 0:e.attributes)||void 0===o?void 0:o.favourite_anime)&&void 0!==n?n:[],x=null===(l=null==e?void 0:e.attributes)||void 0===l?void 0:l.viewer_name,y=null===(c=null==e?void 0:e.attributes)||void 0===c?void 0:c.viewer_avatar}if(!(p&&"unknown"!==p&&"0"!==p||(null==h?void 0:h.is_authenticated)))return F`
        <div class="empty">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          <div>${this._t("no_profile")}<br/>${this._t("auth_only")}</div>
        </div>
      `;const S=x?`https://anilist.co/user/${x}`:void 0,k=this._config;return F`
      <div class="profile">
        <!-- Avatar + Name -->
        ${!1!==k.show_avatar||!1!==k.show_username?F`
          <div class="profile-header-centered"
            @click=${()=>S&&this._handleClick(S)}
            style=${S&&this._shouldLink()?"cursor:pointer":""}
          >
            ${!1!==k.show_avatar?y?F`<img class="avatar" src=${y} alt=${null!=x?x:""} loading="lazy" />`:F`
                <div class="avatar avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              `:V}
            ${!1!==k.show_username?F`<div class="profile-name">${null!=x?x:this._t("profile")}</div>`:V}
          </div>
        `:V}

        <!-- Anime Stats -->
        ${!1!==k.show_anime_stats?F`
          <div class="stats-grid">
            ${this._statTile(this._t("anime"),p)}
            ${this._statTile(this._t("episodes"),u)}
            ${this._statTile(this._t("hours"),_)}
            ${this._statTile(this._t("score_avg"),g)}
            ${m&&"unknown"!==m?this._statTile(this._t("watching_now"),m):V}
          </div>
        `:V}

        <!-- Manga Stats -->
        ${!1!==k.show_manga_stats&&f&&"unknown"!==f?F`
          <div class="stats-grid">
            ${this._statTile(this._t("manga_count"),f)}
            ${b&&"unknown"!==b?this._statTile(this._t("chapters"),b):V}
            ${v&&"unknown"!==v?this._statTile(this._t("manga_score"),v):V}
          </div>
        `:V}

        <!-- Genre chart -->
        ${!1!==k.show_genre_chart&&$.length?F`
          <div class="section-label">${this._t("top_genres")}</div>
          ${(null===(d=null==h?void 0:h.top_genres)||void 0===d?void 0:d.length)?this._renderGenreChartWithCounts(h.top_genres):this._renderGenreChart($)}
        `:V}

        <!-- Favourites -->
        ${!1!==k.show_favourites&&w.length?F`
          <div class="section-label">${this._t("favourites")}</div>
          <div class="fav-list">
            ${w.slice(0,5).map(e=>F`
              <div
                class="fav-item"
                @click=${()=>this._handleClick(e.site_url)}
                style=${e.site_url&&this._shouldLink()?"cursor:pointer":""}
              >
                ${e.cover?F`<img class="fav-cover" src=${e.cover} alt=${e.title} loading="lazy" />`:V}
                <span class="fav-title">${e.title}</span>
              </div>
            `)}
          </div>
        `:V}
      </div>
    `}_renderGenreChart(e){var t;const s=null!==(t=this._config.chart_type)&&void 0!==t?t:"bar",i=e.slice(0,5);if("tags"===s)return F`
        <div class="genre-chips">
          ${i.map(e=>F`<span class="genre-chip">${e}</span>`)}
        </div>
      `;if("donut"===s){const e=i.length,t=["#3DB4F2","#C063FF","#FF6B6B","#4ECDC4","#FFE66D"];let s=0;const r=i.map((i,r)=>{const a=100/e,o=s;return s+=a,{genre:i,start:o,pct:a,color:t[r%t.length]}}),a=r.map(e=>`${e.color} ${e.start}% ${e.start+e.pct}%`).join(", ");return F`
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${a})"></div>
          <div class="donut-legend">
            ${r.map(e=>F`
              <div class="legend-item">
                <span class="legend-dot" style="background:${e.color}"></span>
                <span>${e.genre}</span>
              </div>
            `)}
          </div>
        </div>
      `}const r=i.map((e,t)=>100-15*t);return F`
      <div class="bar-chart">
        ${i.map((e,t)=>F`
          <div class="bar-row">
            <span class="bar-label">${e}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${r[t]}%"></div>
            </div>
          </div>
        `)}
      </div>
    `}_renderGenreChartWithCounts(e){var t,s;const i=null!==(t=this._config.chart_type)&&void 0!==t?t:"bar",r=e.slice(0,5);if("tags"===i)return F`
        <div class="genre-chips">
          ${r.map(e=>F`<span class="genre-chip">${e.genre} (${e.count})</span>`)}
        </div>
      `;if("donut"===i){const e=r.reduce((e,t)=>e+t.count,0)||1,t=["#3DB4F2","#C063FF","#FF6B6B","#4ECDC4","#FFE66D"];let s=0;const i=r.map((i,r)=>{const a=i.count/e*100,o=s;return s+=a,{genre:i.genre,count:i.count,start:o,pct:a,color:t[r%t.length]}}),a=i.map(e=>`${e.color} ${e.start}% ${e.start+e.pct}%`).join(", ");return F`
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${a})"></div>
          <div class="donut-legend">
            ${i.map(e=>F`
              <div class="legend-item">
                <span class="legend-dot" style="background:${e.color}"></span>
                <span>${e.genre} (${e.count})</span>
              </div>
            `)}
          </div>
        </div>
      `}const a=(null===(s=r[0])||void 0===s?void 0:s.count)||1;return F`
      <div class="bar-chart">
        ${r.map(e=>F`
          <div class="bar-row">
            <span class="bar-label">${e.genre}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${e.count/a*100}%"></div>
            </div>
            <span class="bar-count">${e.count}</span>
          </div>
        `)}
      </div>
    `}_statTile(e,t){return F`
      <div class="stat-tile">
        <div class="stat-value">${t}</div>
        <div class="stat-label">${e}</div>
      </div>
    `}_defaultTitle(e){var t;return this._t(null!==(t={airing:"next_episodes",watchlist:"watching",season:"this_season",profile:"profile",manga:"manga"}[e])&&void 0!==t?t:"next_episodes")}}Ne.styles=o`
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
  `,e([he({attribute:!1})],Ne.prototype,"hass",void 0),e([pe()],Ne.prototype,"_config",void 0),e([pe()],Ne.prototype,"_activeTab",void 0),e([pe()],Ne.prototype,"_searchQuery",void 0),e([pe()],Ne.prototype,"_wsAiring",void 0),e([pe()],Ne.prototype,"_wsWatchlist",void 0),e([pe()],Ne.prototype,"_wsSeason",void 0),e([pe()],Ne.prototype,"_wsManga",void 0),e([pe()],Ne.prototype,"_wsProfile",void 0),e([pe()],Ne.prototype,"_wsLoading",void 0),customElements.define("anilist-card",Ne),window.customCards=window.customCards||[],window.customCards.push({type:"anilist-card",name:"AniList",description:"AniList anime & manga tracker card with airing, watchlist, season, profile and manga views.",preview:!0});
