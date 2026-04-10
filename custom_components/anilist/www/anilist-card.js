function e(e,t,o,a){var s,i=arguments.length,l=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(l=(i<3?s(l):i>3?s(t,o,l):s(t,o))||l);return i>3&&l&&Object.defineProperty(t,o,l),l}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let i=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(t,e))}return e}toString(){return this.cssText}};const l=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[a+1],e[0]);return new i(o,e,a)},r=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new i("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:n,defineProperty:_,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:c,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,b=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},w=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),a=this.getPropertyDescriptor(e,o,t);void 0!==a&&_(this.prototype,e,a)}}static getPropertyDescriptor(e,t,o){const{get:a,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const i=a?.call(this);s?.call(this,t),this.requestUpdate(e,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...p(e),...c(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(o)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=o.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,o);if(void 0!==a&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:f).toAttribute(t,o.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const o=this.constructor,a=o._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=o.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const i=s.fromAttribute(t,e.type);this[a]=i??this._$Ej?.get(a)??i,this._$Em=null}}requestUpdate(e,t,o,a=!1,s){if(void 0!==e){const i=this.constructor;if(!1===a&&(s=this[e]),o??=i.getPropertyOptions(e),!((o.hasChanged??w)(s,t)||o.useDefault&&o.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:a,wrapped:s},i){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,i??t??this[e]),!0!==s||void 0!==i)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[v("elementProperties")]=new Map,k[v("finalized")]=new Map,m?.({ReactiveElement:k}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,z=x.trustedTypes,A=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+P,E=`<${M}>`,j=document,V=()=>j.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,O="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,F=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,K=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),G=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),U=new WeakMap,H=j.createTreeWalker(j,129);function W(e,t){if(!C(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Z=(e,t)=>{const o=e.length-1,a=[];let s,i=2===t?"<svg>":3===t?"<math>":"",l=L;for(let t=0;t<o;t++){const o=e[t];let r,n,_=-1,d=0;for(;d<o.length&&(l.lastIndex=d,n=l.exec(o),null!==n);)d=l.lastIndex,l===L?"!--"===n[1]?l=N:void 0!==n[1]?l=R:void 0!==n[2]?(K.test(n[2])&&(s=RegExp("</"+n[2],"g")),l=F):void 0!==n[3]&&(l=F):l===F?">"===n[0]?(l=s??L,_=-1):void 0===n[1]?_=-2:(_=l.lastIndex-n[2].length,r=n[1],l=void 0===n[3]?F:'"'===n[3]?I:D):l===I||l===D?l=F:l===N||l===R?l=L:(l=F,s=void 0);const p=l===F&&e[t+1].startsWith("/>")?" ":"";i+=l===L?o+E:_>=0?(a.push(r),o.slice(0,_)+S+o.slice(_)+P+p):o+P+(-2===_?t:p)}return[W(e,i+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class Q{constructor({strings:e,_$litType$:t},o){let a;this.parts=[];let s=0,i=0;const l=e.length-1,r=this.parts,[n,_]=Z(e,t);if(this.el=Q.createElement(n,o),H.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=H.nextNode())&&r.length<l;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(S)){const t=_[i++],o=a.getAttribute(e).split(P),l=/([.?@])?(.*)/.exec(t);r.push({type:1,index:s,name:l[2],strings:o,ctor:"."===l[1]?te:"?"===l[1]?oe:"@"===l[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(P)&&(r.push({type:6,index:s}),a.removeAttribute(e));if(K.test(a.tagName)){const e=a.textContent.split(P),t=e.length-1;if(t>0){a.textContent=z?z.emptyScript:"";for(let o=0;o<t;o++)a.append(e[o],V()),H.nextNode(),r.push({type:2,index:++s});a.append(e[t],V())}}}else if(8===a.nodeType)if(a.data===M)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(P,e+1));)r.push({type:7,index:s}),e+=P.length-1}s++}}static createElement(e,t){const o=j.createElement("template");return o.innerHTML=e,o}}function J(e,t,o=e,a){if(t===G)return t;let s=void 0!==a?o._$Co?.[a]:o._$Cl;const i=T(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),void 0===i?s=void 0:(s=new i(e),s._$AT(e,o,a)),void 0!==a?(o._$Co??=[])[a]=s:o._$Cl=s),void 0!==s&&(t=J(e,s._$AS(e,t.values),s,a)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,a=(e?.creationScope??j).importNode(t,!0);H.currentNode=a;let s=H.nextNode(),i=0,l=0,r=o[0];for(;void 0!==r;){if(i===r.index){let t;2===r.type?t=new X(s,s.nextSibling,this,e):1===r.type?t=new r.ctor(s,r.name,r.strings,this,e):6===r.type&&(t=new se(s,this,e)),this._$AV.push(t),r=o[++l]}i!==r?.index&&(s=H.nextNode(),i++)}return H.currentNode=j,a}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,a){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),T(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>C(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(j.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,a="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Q.createElement(W(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Y(a,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=U.get(e.strings);return void 0===t&&U.set(e.strings,t=new Q(e)),t}k(e){C(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,a=0;for(const s of e)a===t.length?t.push(o=new X(this.O(V()),this.O(V()),this,this.options)):o=t[a],o._$AI(s),a++;a<t.length&&(this._$AR(o&&o._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,a,s){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=B}_$AI(e,t=this,o,a){const s=this.strings;let i=!1;if(void 0===s)e=J(this,e,t,0),i=!T(e)||e!==this._$AH&&e!==G,i&&(this._$AH=e);else{const a=e;let l,r;for(e=s[0],l=0;l<s.length-1;l++)r=J(this,a[o+l],t,l),r===G&&(r=this._$AH[l]),i||=!T(r)||r!==this._$AH[l],r===B?e=B:e!==B&&(e+=(r??"")+s[l+1]),this._$AH[l]=r}i&&!a&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class oe extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ae extends ee{constructor(e,t,o,a,s){super(e,t,o,a,s),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??B)===G)return;const o=this._$AH,a=e===B&&o!==B||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==B&&(o===B||a);a&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const ie=x.litHtmlPolyfillSupport;ie?.(Q,X),(x.litHtmlVersions??=[]).push("3.3.2");const le=globalThis;class re extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const a=o?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=o?.renderBefore??null;a._$litPart$=s=new X(t.insertBefore(V(),e),e,void 0,o??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}re._$litElement$=!0,re.finalized=!0,le.litElementHydrateSupport?.({LitElement:re});const ne=le.litElementPolyfillSupport;ne?.({LitElement:re}),(le.litElementVersions??=[]).push("4.2.2");const _e={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:w},de=(e=_e,t,o)=>{const{kind:a,metadata:s}=o;let i=globalThis.litPropertyMetadata.get(s);if(void 0===i&&globalThis.litPropertyMetadata.set(s,i=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),i.set(o.name,e),"accessor"===a){const{name:a}=o;return{set(o){const s=t.get.call(this);t.set.call(this,o),this.requestUpdate(a,s,e,!0,o)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=o;return function(o){const s=this[a];t.call(this,o),this.requestUpdate(a,s,e,!0,o)}}throw Error("Unsupported decorator location: "+a)};function pe(e){return(t,o)=>"object"==typeof o?de(e,t,o):((e,t,o)=>{const a=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),a?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function ce(e){return pe({...e,state:!0,attribute:!1})}const he={en:{tab_general:"General",tab_colors:"Colors",view_airing:"Airing",view_watchlist:"Watchlist",view_season:"Season",view_profile:"Profile",view_manga:"Manga",lbl_view:"View",lbl_title:"Title (optional)",lbl_entry_id:"Config Entry ID (optional, for multi-account)",lbl_card_padding:"Card spacing",lbl_link_target:"Click action",lbl_show_cover:"Show cover images",lbl_cover_size:"Cover size",lbl_cover_quality:"Cover quality",lbl_score_position:"Score position",lbl_score_source:"Score source",lbl_visible_items:"Visible items (scroll for more)",lbl_scroll_snap:"Snap scroll to items",lbl_scroll_fade:"Fade at scroll edge",lbl_show_search:"Show search bar",lbl_show_tooltips:"Show tooltips on hover",opt_small:"Small",opt_medium:"Medium",opt_large:"Large",opt_relative:"Relative (5h 30m)",opt_absolute:"Absolute (Apr 10, 14:00)",opt_both:"Both",opt_anilist:"Open AniList",opt_none_link:"No link",opt_time:"Time",opt_title:"Title",opt_score:"Score",opt_compact:"Compact",opt_normal:"Normal",opt_relaxed:"Relaxed",opt_bar:"Bar Chart",opt_donut:"Donut Chart",opt_tags:"Tags",opt_scroll:"Scrollbar",opt_limit:"Limit items",opt_grid:"Grid (Covers)",opt_list:"List (Rows)",opt_auto:"Auto (smart)",opt_user:"My Score",opt_average:"Average Score",opt_top_right:"Top Right",opt_top_left:"Top Left",opt_bottom_right:"Bottom Right",opt_bottom_left:"Bottom Left",opt_inline:"Inline",opt_none_pos:"Hidden",opt_small_quality:"Small (fast)",opt_medium_quality:"Medium",opt_large_quality:"Large / HD",status_current:"Current",status_planning:"Planning",status_completed:"Completed",status_paused:"Paused",status_dropped:"Dropped",status_repeating:"Repeating",hdr_airing:"Airing Settings",hdr_watchlist:"Watchlist Settings",hdr_season:"Season Settings",hdr_profile:"Profile Settings",hdr_manga:"Manga Settings",hdr_status_tabs:"Status Tabs",hdr_filters:"Filters",lbl_max_items:"Max items",lbl_sort_by:"Sort by",lbl_show_countdown:"Show countdown",lbl_countdown_format:"Countdown format",lbl_show_badges:"Show status badges",lbl_show_duration:"Show episode duration",lbl_show_genres:"Show genres",lbl_show_average_score:"Show average score",lbl_show_format_badge:"Show format badge (TV/Movie)",lbl_layout:"Layout",lbl_show_next_airing:"Show next episode countdown",lbl_max_items_limit:"Max items (limit mode)",lbl_overflow_mode:"Overflow behavior",lbl_scroll_height:"Scroll height (px)",lbl_show_progress:"Show progress",lbl_show_progress_bar:"Show progress bar",lbl_show_status_tabs:"Show status tabs",lbl_visible_statuses:"Visible statuses",lbl_genre_filter:"Genre filter (comma-separated)",lbl_format_filter:"Format filter (comma-separated)",placeholder_genre:"e.g. Action, Romance",placeholder_format:"e.g. TV, MOVIE, OVA",lbl_show_avatar:"Show avatar",lbl_show_username:"Show username",lbl_show_anime_stats:"Show anime statistics",lbl_show_manga_stats:"Show manga statistics",lbl_show_genre_chart:"Show genre chart",lbl_chart_type:"Genre chart type",lbl_show_favourites:"Show favourites",lbl_accent_color:"Accent color",lbl_secondary_color:"Secondary color",lbl_card_background:"Card background",lbl_card_opacity:"Card opacity",lbl_border_color:"Border color",lbl_border_width:"Border width (px)",lbl_border_radius:"Border radius (px)"},de:{tab_general:"Allgemein",tab_colors:"Farben",view_airing:"Ausstrahlung",view_watchlist:"Watchlist",view_season:"Season",view_profile:"Profil",view_manga:"Manga",lbl_view:"Ansicht",lbl_title:"Titel (optional)",lbl_entry_id:"Config Entry ID (optional, für Multi-Account)",lbl_card_padding:"Kartenabstand",lbl_link_target:"Klick-Aktion",lbl_show_cover:"Cover-Bilder anzeigen",lbl_cover_size:"Cover-Größe",lbl_cover_quality:"Cover-Qualität",lbl_score_position:"Score-Position",lbl_score_source:"Score-Quelle",lbl_visible_items:"Sichtbare Elemente (scrollen für mehr)",lbl_scroll_snap:"Scroll an Elementen einrasten",lbl_scroll_fade:"Am Scrollrand ausblenden",lbl_show_search:"Suchleiste anzeigen",lbl_show_tooltips:"Tooltips beim Hover anzeigen",opt_small:"Klein",opt_medium:"Mittel",opt_large:"Groß",opt_relative:"Relativ (5h 30m)",opt_absolute:"Absolut (10. Apr, 14:00)",opt_both:"Beide",opt_anilist:"AniList öffnen",opt_none_link:"Kein Link",opt_time:"Zeit",opt_title:"Titel",opt_score:"Score",opt_compact:"Kompakt",opt_normal:"Normal",opt_relaxed:"Entspannt",opt_bar:"Balkendiagramm",opt_donut:"Kreisdiagramm",opt_tags:"Tags",opt_scroll:"Scrollleiste",opt_limit:"Elemente begrenzen",opt_grid:"Raster (Cover)",opt_list:"Liste (Zeilen)",opt_auto:"Auto (smart)",opt_user:"Mein Score",opt_average:"Durchschnittsscore",opt_top_right:"Oben rechts",opt_top_left:"Oben links",opt_bottom_right:"Unten rechts",opt_bottom_left:"Unten links",opt_inline:"Inline",opt_none_pos:"Versteckt",opt_small_quality:"Klein (schnell)",opt_medium_quality:"Mittel",opt_large_quality:"Groß / HD",status_current:"Aktuell",status_planning:"Geplant",status_completed:"Abgeschlossen",status_paused:"Pausiert",status_dropped:"Abgebrochen",status_repeating:"Wiederholen",hdr_airing:"Ausstrahlungs-Einstellungen",hdr_watchlist:"Watchlist-Einstellungen",hdr_season:"Season-Einstellungen",hdr_profile:"Profil-Einstellungen",hdr_manga:"Manga-Einstellungen",hdr_status_tabs:"Status-Tabs",hdr_filters:"Filter",lbl_max_items:"Max. Elemente",lbl_sort_by:"Sortieren nach",lbl_show_countdown:"Countdown anzeigen",lbl_countdown_format:"Countdown-Format",lbl_show_badges:"Status-Badges anzeigen",lbl_show_duration:"Episodendauer anzeigen",lbl_show_genres:"Genres anzeigen",lbl_show_average_score:"Durchschnittsscore anzeigen",lbl_show_format_badge:"Format-Badge anzeigen (TV/Film)",lbl_layout:"Layout",lbl_show_next_airing:"Nächste Episode Countdown anzeigen",lbl_max_items_limit:"Max. Elemente (Limit-Modus)",lbl_overflow_mode:"Überlauf-Verhalten",lbl_scroll_height:"Scrollhöhe (px)",lbl_show_progress:"Fortschritt anzeigen",lbl_show_progress_bar:"Fortschrittsbalken anzeigen",lbl_show_status_tabs:"Status-Tabs anzeigen",lbl_visible_statuses:"Sichtbare Status",lbl_genre_filter:"Genre-Filter (kommagetrennt)",lbl_format_filter:"Format-Filter (kommagetrennt)",placeholder_genre:"z.B. Action, Romance",placeholder_format:"z.B. TV, MOVIE, OVA",lbl_show_avatar:"Avatar anzeigen",lbl_show_username:"Benutzername anzeigen",lbl_show_anime_stats:"Anime-Statistiken anzeigen",lbl_show_manga_stats:"Manga-Statistiken anzeigen",lbl_show_genre_chart:"Genre-Diagramm anzeigen",lbl_chart_type:"Genre-Diagrammtyp",lbl_show_favourites:"Favoriten anzeigen",lbl_accent_color:"Akzentfarbe",lbl_secondary_color:"Sekundärfarbe",lbl_card_background:"Kartenhintergrund",lbl_card_opacity:"Karten-Transparenz",lbl_border_color:"Rahmenfarbe",lbl_border_width:"Rahmenbreite (px)",lbl_border_radius:"Rahmenradius (px)"},ja:{tab_general:"一般",tab_colors:"カラー",view_airing:"放送中",view_watchlist:"ウォッチリスト",view_season:"シーズン",view_profile:"プロフィール",view_manga:"マンガ",lbl_view:"表示",lbl_title:"タイトル（任意）",lbl_entry_id:"設定エントリID（任意、マルチアカウント用）",lbl_card_padding:"カード間隔",lbl_link_target:"クリックアクション",lbl_show_cover:"カバー画像を表示",lbl_cover_size:"カバーサイズ",lbl_cover_quality:"カバー品質",lbl_score_position:"スコア位置",lbl_score_source:"スコアソース",lbl_visible_items:"表示アイテム数（スクロールで表示）",lbl_scroll_snap:"スクロールをアイテムにスナップ",lbl_scroll_fade:"スクロール端でフェード",lbl_show_search:"検索バーを表示",lbl_show_tooltips:"ホバー時にツールチップを表示",opt_small:"小",opt_medium:"中",opt_large:"大",opt_relative:"相対 (5h 30m)",opt_absolute:"絶対 (4月10日 14:00)",opt_both:"両方",opt_anilist:"AniListを開く",opt_none_link:"リンクなし",opt_time:"時間",opt_title:"タイトル",opt_score:"スコア",opt_compact:"コンパクト",opt_normal:"通常",opt_relaxed:"ゆったり",opt_bar:"棒グラフ",opt_donut:"ドーナツチャート",opt_tags:"タグ",opt_scroll:"スクロールバー",opt_limit:"アイテム制限",opt_grid:"グリッド（カバー）",opt_list:"リスト（行）",opt_auto:"自動（スマート）",opt_user:"マイスコア",opt_average:"平均スコア",opt_top_right:"右上",opt_top_left:"左上",opt_bottom_right:"右下",opt_bottom_left:"左下",opt_inline:"インライン",opt_none_pos:"非表示",opt_small_quality:"小（高速）",opt_medium_quality:"中",opt_large_quality:"大 / HD",status_current:"視聴中",status_planning:"予定",status_completed:"完了",status_paused:"一時停止",status_dropped:"中断",status_repeating:"リピート",hdr_airing:"放送設定",hdr_watchlist:"ウォッチリスト設定",hdr_season:"シーズン設定",hdr_profile:"プロフィール設定",hdr_manga:"マンガ設定",hdr_status_tabs:"ステータスタブ",hdr_filters:"フィルター",lbl_max_items:"最大アイテム数",lbl_sort_by:"並べ替え",lbl_show_countdown:"カウントダウンを表示",lbl_countdown_format:"カウントダウン形式",lbl_show_badges:"ステータスバッジを表示",lbl_show_duration:"エピソード時間を表示",lbl_show_genres:"ジャンルを表示",lbl_show_average_score:"平均スコアを表示",lbl_show_format_badge:"フォーマットバッジを表示（TV/映画）",lbl_layout:"レイアウト",lbl_show_next_airing:"次のエピソードカウントダウンを表示",lbl_max_items_limit:"最大アイテム数（制限モード）",lbl_overflow_mode:"オーバーフロー動作",lbl_scroll_height:"スクロール高さ (px)",lbl_show_progress:"進行状況を表示",lbl_show_progress_bar:"プログレスバーを表示",lbl_show_status_tabs:"ステータスタブを表示",lbl_visible_statuses:"表示するステータス",lbl_genre_filter:"ジャンルフィルター（カンマ区切り）",lbl_format_filter:"フォーマットフィルター（カンマ区切り）",placeholder_genre:"例: Action, Romance",placeholder_format:"例: TV, MOVIE, OVA",lbl_show_avatar:"アバターを表示",lbl_show_username:"ユーザー名を表示",lbl_show_anime_stats:"アニメ統計を表示",lbl_show_manga_stats:"マンガ統計を表示",lbl_show_genre_chart:"ジャンルチャートを表示",lbl_chart_type:"ジャンルチャートタイプ",lbl_show_favourites:"お気に入りを表示",lbl_accent_color:"アクセントカラー",lbl_secondary_color:"セカンダリカラー",lbl_card_background:"カード背景",lbl_card_opacity:"カード不透明度",lbl_border_color:"ボーダーカラー",lbl_border_width:"ボーダー幅 (px)",lbl_border_radius:"ボーダー半径 (px)"},es:{tab_general:"General",tab_colors:"Colores",view_airing:"En emisión",view_watchlist:"Lista de seguimiento",view_season:"Temporada",view_profile:"Perfil",view_manga:"Manga",lbl_view:"Vista",lbl_title:"Título (opcional)",lbl_entry_id:"ID de entrada de config (opcional, multi-cuenta)",lbl_card_padding:"Espaciado de tarjeta",lbl_link_target:"Acción al hacer clic",lbl_show_cover:"Mostrar imágenes de portada",lbl_cover_size:"Tamaño de portada",lbl_cover_quality:"Calidad de portada",lbl_score_position:"Posición del puntaje",lbl_score_source:"Fuente del puntaje",lbl_visible_items:"Elementos visibles (desplazar para más)",lbl_scroll_snap:"Ajustar desplazamiento a elementos",lbl_scroll_fade:"Desvanecer en el borde del scroll",lbl_show_search:"Mostrar barra de búsqueda",lbl_show_tooltips:"Mostrar tooltips al pasar el cursor",opt_small:"Pequeño",opt_medium:"Mediano",opt_large:"Grande",opt_relative:"Relativo (5h 30m)",opt_absolute:"Absoluto (10 abr, 14:00)",opt_both:"Ambos",opt_anilist:"Abrir AniList",opt_none_link:"Sin enlace",opt_time:"Tiempo",opt_title:"Título",opt_score:"Puntaje",opt_compact:"Compacto",opt_normal:"Normal",opt_relaxed:"Relajado",opt_bar:"Gráfico de barras",opt_donut:"Gráfico circular",opt_tags:"Etiquetas",opt_scroll:"Barra de desplazamiento",opt_limit:"Limitar elementos",opt_grid:"Cuadrícula (Portadas)",opt_list:"Lista (Filas)",opt_auto:"Auto (inteligente)",opt_user:"Mi puntaje",opt_average:"Puntaje promedio",opt_top_right:"Arriba derecha",opt_top_left:"Arriba izquierda",opt_bottom_right:"Abajo derecha",opt_bottom_left:"Abajo izquierda",opt_inline:"En línea",opt_none_pos:"Oculto",opt_small_quality:"Pequeño (rápido)",opt_medium_quality:"Mediano",opt_large_quality:"Grande / HD",status_current:"Actual",status_planning:"Planeado",status_completed:"Completado",status_paused:"Pausado",status_dropped:"Abandonado",status_repeating:"Repitiendo",hdr_airing:"Configuración de emisión",hdr_watchlist:"Configuración de lista",hdr_season:"Configuración de temporada",hdr_profile:"Configuración de perfil",hdr_manga:"Configuración de manga",hdr_status_tabs:"Pestañas de estado",hdr_filters:"Filtros",lbl_max_items:"Máx. elementos",lbl_sort_by:"Ordenar por",lbl_show_countdown:"Mostrar cuenta regresiva",lbl_countdown_format:"Formato de cuenta regresiva",lbl_show_badges:"Mostrar insignias de estado",lbl_show_duration:"Mostrar duración del episodio",lbl_show_genres:"Mostrar géneros",lbl_show_average_score:"Mostrar puntaje promedio",lbl_show_format_badge:"Mostrar insignia de formato (TV/Película)",lbl_layout:"Diseño",lbl_show_next_airing:"Mostrar cuenta regresiva del próximo episodio",lbl_max_items_limit:"Máx. elementos (modo límite)",lbl_overflow_mode:"Comportamiento de desbordamiento",lbl_scroll_height:"Altura de desplazamiento (px)",lbl_show_progress:"Mostrar progreso",lbl_show_progress_bar:"Mostrar barra de progreso",lbl_show_status_tabs:"Mostrar pestañas de estado",lbl_visible_statuses:"Estados visibles",lbl_genre_filter:"Filtro de género (separado por comas)",lbl_format_filter:"Filtro de formato (separado por comas)",placeholder_genre:"ej. Action, Romance",placeholder_format:"ej. TV, MOVIE, OVA",lbl_show_avatar:"Mostrar avatar",lbl_show_username:"Mostrar nombre de usuario",lbl_show_anime_stats:"Mostrar estadísticas de anime",lbl_show_manga_stats:"Mostrar estadísticas de manga",lbl_show_genre_chart:"Mostrar gráfico de géneros",lbl_chart_type:"Tipo de gráfico de géneros",lbl_show_favourites:"Mostrar favoritos",lbl_accent_color:"Color de acento",lbl_secondary_color:"Color secundario",lbl_card_background:"Fondo de tarjeta",lbl_card_opacity:"Opacidad de tarjeta",lbl_border_color:"Color de borde",lbl_border_width:"Ancho de borde (px)",lbl_border_radius:"Radio de borde (px)"},fr:{tab_general:"Général",tab_colors:"Couleurs",view_airing:"En cours",view_watchlist:"Liste de suivi",view_season:"Saison",view_profile:"Profil",view_manga:"Manga",lbl_view:"Vue",lbl_title:"Titre (optionnel)",lbl_entry_id:"ID d'entrée config (optionnel, multi-compte)",lbl_card_padding:"Espacement de carte",lbl_link_target:"Action au clic",lbl_show_cover:"Afficher les images de couverture",lbl_cover_size:"Taille de couverture",lbl_cover_quality:"Qualité de couverture",lbl_score_position:"Position du score",lbl_score_source:"Source du score",lbl_visible_items:"Éléments visibles (défiler pour plus)",lbl_scroll_snap:"Accrocher le défilement aux éléments",lbl_scroll_fade:"Fondu au bord du défilement",lbl_show_search:"Afficher la barre de recherche",lbl_show_tooltips:"Afficher les infobulles au survol",opt_small:"Petit",opt_medium:"Moyen",opt_large:"Grand",opt_relative:"Relatif (5h 30m)",opt_absolute:"Absolu (10 avr, 14:00)",opt_both:"Les deux",opt_anilist:"Ouvrir AniList",opt_none_link:"Aucun lien",opt_time:"Temps",opt_title:"Titre",opt_score:"Score",opt_compact:"Compact",opt_normal:"Normal",opt_relaxed:"Détendu",opt_bar:"Diagramme en barres",opt_donut:"Diagramme circulaire",opt_tags:"Tags",opt_scroll:"Barre de défilement",opt_limit:"Limiter les éléments",opt_grid:"Grille (Couvertures)",opt_list:"Liste (Lignes)",opt_auto:"Auto (intelligent)",opt_user:"Mon score",opt_average:"Score moyen",opt_top_right:"Haut droite",opt_top_left:"Haut gauche",opt_bottom_right:"Bas droite",opt_bottom_left:"Bas gauche",opt_inline:"En ligne",opt_none_pos:"Masqué",opt_small_quality:"Petit (rapide)",opt_medium_quality:"Moyen",opt_large_quality:"Grand / HD",status_current:"En cours",status_planning:"Planifié",status_completed:"Terminé",status_paused:"En pause",status_dropped:"Abandonné",status_repeating:"En reprise",hdr_airing:"Paramètres de diffusion",hdr_watchlist:"Paramètres de liste de suivi",hdr_season:"Paramètres de saison",hdr_profile:"Paramètres de profil",hdr_manga:"Paramètres de manga",hdr_status_tabs:"Onglets de statut",hdr_filters:"Filtres",lbl_max_items:"Éléments max.",lbl_sort_by:"Trier par",lbl_show_countdown:"Afficher le compte à rebours",lbl_countdown_format:"Format du compte à rebours",lbl_show_badges:"Afficher les badges de statut",lbl_show_duration:"Afficher la durée de l'épisode",lbl_show_genres:"Afficher les genres",lbl_show_average_score:"Afficher le score moyen",lbl_show_format_badge:"Afficher le badge de format (TV/Film)",lbl_layout:"Disposition",lbl_show_next_airing:"Afficher le compte à rebours du prochain épisode",lbl_max_items_limit:"Éléments max. (mode limite)",lbl_overflow_mode:"Comportement de débordement",lbl_scroll_height:"Hauteur de défilement (px)",lbl_show_progress:"Afficher la progression",lbl_show_progress_bar:"Afficher la barre de progression",lbl_show_status_tabs:"Afficher les onglets de statut",lbl_visible_statuses:"Statuts visibles",lbl_genre_filter:"Filtre de genre (séparé par des virgules)",lbl_format_filter:"Filtre de format (séparé par des virgules)",placeholder_genre:"ex. Action, Romance",placeholder_format:"ex. TV, MOVIE, OVA",lbl_show_avatar:"Afficher l'avatar",lbl_show_username:"Afficher le nom d'utilisateur",lbl_show_anime_stats:"Afficher les statistiques anime",lbl_show_manga_stats:"Afficher les statistiques manga",lbl_show_genre_chart:"Afficher le graphique des genres",lbl_chart_type:"Type de graphique des genres",lbl_show_favourites:"Afficher les favoris",lbl_accent_color:"Couleur d'accent",lbl_secondary_color:"Couleur secondaire",lbl_card_background:"Arrière-plan de carte",lbl_card_opacity:"Opacité de carte",lbl_border_color:"Couleur de bordure",lbl_border_width:"Épaisseur de bordure (px)",lbl_border_radius:"Rayon de bordure (px)"},it:{tab_general:"Generale",tab_colors:"Colori",view_airing:"In onda",view_watchlist:"Lista di visione",view_season:"Stagione",view_profile:"Profilo",view_manga:"Manga",lbl_view:"Vista",lbl_title:"Titolo (opzionale)",lbl_entry_id:"ID voce config (opzionale, multi-account)",lbl_card_padding:"Spaziatura scheda",lbl_link_target:"Azione clic",lbl_show_cover:"Mostra immagini di copertina",lbl_cover_size:"Dimensione copertina",lbl_cover_quality:"Qualità copertina",lbl_score_position:"Posizione punteggio",lbl_score_source:"Fonte punteggio",lbl_visible_items:"Elementi visibili (scorri per altri)",lbl_scroll_snap:"Agganciare lo scorrimento agli elementi",lbl_scroll_fade:"Dissolvenza al bordo dello scroll",lbl_show_search:"Mostra barra di ricerca",lbl_show_tooltips:"Mostra tooltip al passaggio del mouse",opt_small:"Piccolo",opt_medium:"Medio",opt_large:"Grande",opt_relative:"Relativo (5h 30m)",opt_absolute:"Assoluto (10 apr, 14:00)",opt_both:"Entrambi",opt_anilist:"Apri AniList",opt_none_link:"Nessun link",opt_time:"Tempo",opt_title:"Titolo",opt_score:"Punteggio",opt_compact:"Compatto",opt_normal:"Normale",opt_relaxed:"Rilassato",opt_bar:"Grafico a barre",opt_donut:"Grafico a ciambella",opt_tags:"Tag",opt_scroll:"Barra di scorrimento",opt_limit:"Limita elementi",opt_grid:"Griglia (Copertine)",opt_list:"Lista (Righe)",opt_auto:"Auto (smart)",opt_user:"Il mio punteggio",opt_average:"Punteggio medio",opt_top_right:"In alto a destra",opt_top_left:"In alto a sinistra",opt_bottom_right:"In basso a destra",opt_bottom_left:"In basso a sinistra",opt_inline:"Inline",opt_none_pos:"Nascosto",opt_small_quality:"Piccolo (veloce)",opt_medium_quality:"Medio",opt_large_quality:"Grande / HD",status_current:"In corso",status_planning:"Pianificato",status_completed:"Completato",status_paused:"In pausa",status_dropped:"Abbandonato",status_repeating:"In ripetizione",hdr_airing:"Impostazioni trasmissione",hdr_watchlist:"Impostazioni lista di visione",hdr_season:"Impostazioni stagione",hdr_profile:"Impostazioni profilo",hdr_manga:"Impostazioni manga",hdr_status_tabs:"Schede stato",hdr_filters:"Filtri",lbl_max_items:"Elementi max.",lbl_sort_by:"Ordina per",lbl_show_countdown:"Mostra conto alla rovescia",lbl_countdown_format:"Formato conto alla rovescia",lbl_show_badges:"Mostra badge di stato",lbl_show_duration:"Mostra durata episodio",lbl_show_genres:"Mostra generi",lbl_show_average_score:"Mostra punteggio medio",lbl_show_format_badge:"Mostra badge formato (TV/Film)",lbl_layout:"Layout",lbl_show_next_airing:"Mostra conto alla rovescia prossimo episodio",lbl_max_items_limit:"Elementi max. (modalità limite)",lbl_overflow_mode:"Comportamento overflow",lbl_scroll_height:"Altezza scorrimento (px)",lbl_show_progress:"Mostra progresso",lbl_show_progress_bar:"Mostra barra di progresso",lbl_show_status_tabs:"Mostra schede stato",lbl_visible_statuses:"Stati visibili",lbl_genre_filter:"Filtro genere (separato da virgole)",lbl_format_filter:"Filtro formato (separato da virgole)",placeholder_genre:"es. Action, Romance",placeholder_format:"es. TV, MOVIE, OVA",lbl_show_avatar:"Mostra avatar",lbl_show_username:"Mostra nome utente",lbl_show_anime_stats:"Mostra statistiche anime",lbl_show_manga_stats:"Mostra statistiche manga",lbl_show_genre_chart:"Mostra grafico generi",lbl_chart_type:"Tipo grafico generi",lbl_show_favourites:"Mostra preferiti",lbl_accent_color:"Colore d'accento",lbl_secondary_color:"Colore secondario",lbl_card_background:"Sfondo scheda",lbl_card_opacity:"Opacità scheda",lbl_border_color:"Colore bordo",lbl_border_width:"Larghezza bordo (px)",lbl_border_radius:"Raggio bordo (px)"},pt:{tab_general:"Geral",tab_colors:"Cores",view_airing:"Em exibição",view_watchlist:"Lista de acompanhamento",view_season:"Temporada",view_profile:"Perfil",view_manga:"Manga",lbl_view:"Visualização",lbl_title:"Título (opcional)",lbl_entry_id:"ID de entrada config (opcional, multi-conta)",lbl_card_padding:"Espaçamento do cartão",lbl_link_target:"Ação ao clicar",lbl_show_cover:"Mostrar imagens de capa",lbl_cover_size:"Tamanho da capa",lbl_cover_quality:"Qualidade da capa",lbl_score_position:"Posição da pontuação",lbl_score_source:"Fonte da pontuação",lbl_visible_items:"Itens visíveis (role para mais)",lbl_scroll_snap:"Encaixar rolagem nos itens",lbl_scroll_fade:"Desvanecimento na borda da rolagem",lbl_show_search:"Mostrar barra de pesquisa",lbl_show_tooltips:"Mostrar dicas ao passar o mouse",opt_small:"Pequeno",opt_medium:"Médio",opt_large:"Grande",opt_relative:"Relativo (5h 30m)",opt_absolute:"Absoluto (10 abr, 14:00)",opt_both:"Ambos",opt_anilist:"Abrir AniList",opt_none_link:"Sem link",opt_time:"Tempo",opt_title:"Título",opt_score:"Pontuação",opt_compact:"Compacto",opt_normal:"Normal",opt_relaxed:"Relaxado",opt_bar:"Gráfico de barras",opt_donut:"Gráfico de rosca",opt_tags:"Tags",opt_scroll:"Barra de rolagem",opt_limit:"Limitar itens",opt_grid:"Grade (Capas)",opt_list:"Lista (Linhas)",opt_auto:"Auto (inteligente)",opt_user:"Minha pontuação",opt_average:"Pontuação média",opt_top_right:"Superior direito",opt_top_left:"Superior esquerdo",opt_bottom_right:"Inferior direito",opt_bottom_left:"Inferior esquerdo",opt_inline:"Inline",opt_none_pos:"Oculto",opt_small_quality:"Pequeno (rápido)",opt_medium_quality:"Médio",opt_large_quality:"Grande / HD",status_current:"Atual",status_planning:"Planejado",status_completed:"Concluído",status_paused:"Pausado",status_dropped:"Abandonado",status_repeating:"Repetindo",hdr_airing:"Configurações de exibição",hdr_watchlist:"Configurações da lista",hdr_season:"Configurações de temporada",hdr_profile:"Configurações de perfil",hdr_manga:"Configurações de manga",hdr_status_tabs:"Abas de status",hdr_filters:"Filtros",lbl_max_items:"Itens máx.",lbl_sort_by:"Ordenar por",lbl_show_countdown:"Mostrar contagem regressiva",lbl_countdown_format:"Formato da contagem regressiva",lbl_show_badges:"Mostrar emblemas de status",lbl_show_duration:"Mostrar duração do episódio",lbl_show_genres:"Mostrar gêneros",lbl_show_average_score:"Mostrar pontuação média",lbl_show_format_badge:"Mostrar emblema de formato (TV/Filme)",lbl_layout:"Layout",lbl_show_next_airing:"Mostrar contagem regressiva do próximo episódio",lbl_max_items_limit:"Itens máx. (modo limite)",lbl_overflow_mode:"Comportamento de overflow",lbl_scroll_height:"Altura de rolagem (px)",lbl_show_progress:"Mostrar progresso",lbl_show_progress_bar:"Mostrar barra de progresso",lbl_show_status_tabs:"Mostrar abas de status",lbl_visible_statuses:"Status visíveis",lbl_genre_filter:"Filtro de gênero (separado por vírgulas)",lbl_format_filter:"Filtro de formato (separado por vírgulas)",placeholder_genre:"ex. Action, Romance",placeholder_format:"ex. TV, MOVIE, OVA",lbl_show_avatar:"Mostrar avatar",lbl_show_username:"Mostrar nome de usuário",lbl_show_anime_stats:"Mostrar estatísticas de anime",lbl_show_manga_stats:"Mostrar estatísticas de manga",lbl_show_genre_chart:"Mostrar gráfico de gêneros",lbl_chart_type:"Tipo de gráfico de gêneros",lbl_show_favourites:"Mostrar favoritos",lbl_accent_color:"Cor de destaque",lbl_secondary_color:"Cor secundária",lbl_card_background:"Fundo do cartão",lbl_card_opacity:"Opacidade do cartão",lbl_border_color:"Cor da borda",lbl_border_width:"Largura da borda (px)",lbl_border_radius:"Raio da borda (px)"},nl:{tab_general:"Algemeen",tab_colors:"Kleuren",view_airing:"Uitzending",view_watchlist:"Volglijst",view_season:"Seizoen",view_profile:"Profiel",view_manga:"Manga",lbl_view:"Weergave",lbl_title:"Titel (optioneel)",lbl_entry_id:"Config Entry ID (optioneel, multi-account)",lbl_card_padding:"Kaartafstand",lbl_link_target:"Klikactie",lbl_show_cover:"Omslagafbeeldingen tonen",lbl_cover_size:"Omslaggrootte",lbl_cover_quality:"Omslagkwaliteit",lbl_score_position:"Scorepositie",lbl_score_source:"Scorebron",lbl_visible_items:"Zichtbare items (scroll voor meer)",lbl_scroll_snap:"Scroll naar items uitlijnen",lbl_scroll_fade:"Vervagen bij scrollrand",lbl_show_search:"Zoekbalk tonen",lbl_show_tooltips:"Tooltips tonen bij hover",opt_small:"Klein",opt_medium:"Middel",opt_large:"Groot",opt_relative:"Relatief (5u 30m)",opt_absolute:"Absoluut (10 apr, 14:00)",opt_both:"Beide",opt_anilist:"AniList openen",opt_none_link:"Geen link",opt_time:"Tijd",opt_title:"Titel",opt_score:"Score",opt_compact:"Compact",opt_normal:"Normaal",opt_relaxed:"Ruim",opt_bar:"Staafdiagram",opt_donut:"Ringdiagram",opt_tags:"Tags",opt_scroll:"Scrollbalk",opt_limit:"Items beperken",opt_grid:"Raster (Omslagen)",opt_list:"Lijst (Rijen)",opt_auto:"Auto (slim)",opt_user:"Mijn score",opt_average:"Gemiddelde score",opt_top_right:"Rechtsboven",opt_top_left:"Linksboven",opt_bottom_right:"Rechtsonder",opt_bottom_left:"Linksonder",opt_inline:"Inline",opt_none_pos:"Verborgen",opt_small_quality:"Klein (snel)",opt_medium_quality:"Middel",opt_large_quality:"Groot / HD",status_current:"Huidig",status_planning:"Gepland",status_completed:"Voltooid",status_paused:"Gepauzeerd",status_dropped:"Gestopt",status_repeating:"Herhalend",hdr_airing:"Uitzending-instellingen",hdr_watchlist:"Volglijst-instellingen",hdr_season:"Seizoen-instellingen",hdr_profile:"Profiel-instellingen",hdr_manga:"Manga-instellingen",hdr_status_tabs:"Statustabbladen",hdr_filters:"Filters",lbl_max_items:"Max. items",lbl_sort_by:"Sorteren op",lbl_show_countdown:"Aftelling tonen",lbl_countdown_format:"Aftelformaat",lbl_show_badges:"Statusbadges tonen",lbl_show_duration:"Afleveringsduur tonen",lbl_show_genres:"Genres tonen",lbl_show_average_score:"Gemiddelde score tonen",lbl_show_format_badge:"Formaatbadge tonen (TV/Film)",lbl_layout:"Lay-out",lbl_show_next_airing:"Aftelling volgende aflevering tonen",lbl_max_items_limit:"Max. items (limietmodus)",lbl_overflow_mode:"Overloopgedrag",lbl_scroll_height:"Scrollhoogte (px)",lbl_show_progress:"Voortgang tonen",lbl_show_progress_bar:"Voortgangsbalk tonen",lbl_show_status_tabs:"Statustabbladen tonen",lbl_visible_statuses:"Zichtbare statussen",lbl_genre_filter:"Genrefilter (kommagescheiden)",lbl_format_filter:"Formaatfilter (kommagescheiden)",placeholder_genre:"bijv. Action, Romance",placeholder_format:"bijv. TV, MOVIE, OVA",lbl_show_avatar:"Avatar tonen",lbl_show_username:"Gebruikersnaam tonen",lbl_show_anime_stats:"Anime-statistieken tonen",lbl_show_manga_stats:"Manga-statistieken tonen",lbl_show_genre_chart:"Genregrafiek tonen",lbl_chart_type:"Type genregrafiek",lbl_show_favourites:"Favorieten tonen",lbl_accent_color:"Accentkleur",lbl_secondary_color:"Secundaire kleur",lbl_card_background:"Kaartachtergrond",lbl_card_opacity:"Kaartdekking",lbl_border_color:"Randkleur",lbl_border_width:"Randbreedte (px)",lbl_border_radius:"Randradius (px)"},pl:{tab_general:"Ogólne",tab_colors:"Kolory",view_airing:"Emitowane",view_watchlist:"Lista obserwowanych",view_season:"Sezon",view_profile:"Profil",view_manga:"Manga",lbl_view:"Widok",lbl_title:"Tytuł (opcjonalnie)",lbl_entry_id:"ID wpisu konfiguracji (opcjonalnie, multi-konto)",lbl_card_padding:"Odstępy karty",lbl_link_target:"Akcja kliknięcia",lbl_show_cover:"Pokaż obrazy okładek",lbl_cover_size:"Rozmiar okładki",lbl_cover_quality:"Jakość okładki",lbl_score_position:"Pozycja oceny",lbl_score_source:"Źródło oceny",lbl_visible_items:"Widoczne elementy (przewiń aby zobaczyć więcej)",lbl_scroll_snap:"Przyciąganie przewijania do elementów",lbl_scroll_fade:"Zanikanie na krawędzi przewijania",lbl_show_search:"Pokaż pasek wyszukiwania",lbl_show_tooltips:"Pokaż podpowiedzi po najechaniu",opt_small:"Mały",opt_medium:"Średni",opt_large:"Duży",opt_relative:"Względny (5h 30m)",opt_absolute:"Bezwzględny (10 kwi, 14:00)",opt_both:"Oba",opt_anilist:"Otwórz AniList",opt_none_link:"Brak linku",opt_time:"Czas",opt_title:"Tytuł",opt_score:"Ocena",opt_compact:"Kompaktowy",opt_normal:"Normalny",opt_relaxed:"Luźny",opt_bar:"Wykres słupkowy",opt_donut:"Wykres pierścieniowy",opt_tags:"Tagi",opt_scroll:"Pasek przewijania",opt_limit:"Ogranicz elementy",opt_grid:"Siatka (Okładki)",opt_list:"Lista (Wiersze)",opt_auto:"Auto (inteligentny)",opt_user:"Moja ocena",opt_average:"Średnia ocena",opt_top_right:"Prawy górny",opt_top_left:"Lewy górny",opt_bottom_right:"Prawy dolny",opt_bottom_left:"Lewy dolny",opt_inline:"W linii",opt_none_pos:"Ukryty",opt_small_quality:"Mały (szybki)",opt_medium_quality:"Średni",opt_large_quality:"Duży / HD",status_current:"Bieżący",status_planning:"Planowany",status_completed:"Ukończony",status_paused:"Wstrzymany",status_dropped:"Porzucony",status_repeating:"Powtarzany",hdr_airing:"Ustawienia emisji",hdr_watchlist:"Ustawienia listy obserwowanych",hdr_season:"Ustawienia sezonu",hdr_profile:"Ustawienia profilu",hdr_manga:"Ustawienia mangi",hdr_status_tabs:"Karty statusu",hdr_filters:"Filtry",lbl_max_items:"Maks. elementów",lbl_sort_by:"Sortuj wg",lbl_show_countdown:"Pokaż odliczanie",lbl_countdown_format:"Format odliczania",lbl_show_badges:"Pokaż odznaki statusu",lbl_show_duration:"Pokaż czas trwania odcinka",lbl_show_genres:"Pokaż gatunki",lbl_show_average_score:"Pokaż średnią ocenę",lbl_show_format_badge:"Pokaż odznakę formatu (TV/Film)",lbl_layout:"Układ",lbl_show_next_airing:"Pokaż odliczanie do następnego odcinka",lbl_max_items_limit:"Maks. elementów (tryb limitu)",lbl_overflow_mode:"Zachowanie przy przepełnieniu",lbl_scroll_height:"Wysokość przewijania (px)",lbl_show_progress:"Pokaż postęp",lbl_show_progress_bar:"Pokaż pasek postępu",lbl_show_status_tabs:"Pokaż karty statusu",lbl_visible_statuses:"Widoczne statusy",lbl_genre_filter:"Filtr gatunków (oddzielone przecinkami)",lbl_format_filter:"Filtr formatów (oddzielone przecinkami)",placeholder_genre:"np. Action, Romance",placeholder_format:"np. TV, MOVIE, OVA",lbl_show_avatar:"Pokaż avatar",lbl_show_username:"Pokaż nazwę użytkownika",lbl_show_anime_stats:"Pokaż statystyki anime",lbl_show_manga_stats:"Pokaż statystyki mangi",lbl_show_genre_chart:"Pokaż wykres gatunków",lbl_chart_type:"Typ wykresu gatunków",lbl_show_favourites:"Pokaż ulubione",lbl_accent_color:"Kolor akcentu",lbl_secondary_color:"Kolor drugorzędny",lbl_card_background:"Tło karty",lbl_card_opacity:"Przezroczystość karty",lbl_border_color:"Kolor obramowania",lbl_border_width:"Szerokość obramowania (px)",lbl_border_radius:"Promień obramowania (px)"},sv:{tab_general:"Allmänt",tab_colors:"Färger",view_airing:"Sänds",view_watchlist:"Bevakningslista",view_season:"Säsong",view_profile:"Profil",view_manga:"Manga",lbl_view:"Vy",lbl_title:"Titel (valfri)",lbl_entry_id:"Config Entry ID (valfri, multi-konto)",lbl_card_padding:"Kortavstånd",lbl_link_target:"Klickåtgärd",lbl_show_cover:"Visa omslagsbilder",lbl_cover_size:"Omslagsstorlek",lbl_cover_quality:"Omslagskvalitet",lbl_score_position:"Betygsposition",lbl_score_source:"Betygskälla",lbl_visible_items:"Synliga objekt (scrolla för fler)",lbl_scroll_snap:"Fäst scrollning till objekt",lbl_scroll_fade:"Tona ut vid scrollkant",lbl_show_search:"Visa sökfält",lbl_show_tooltips:"Visa verktygstips vid hovring",opt_small:"Liten",opt_medium:"Medel",opt_large:"Stor",opt_relative:"Relativ (5t 30m)",opt_absolute:"Absolut (10 apr, 14:00)",opt_both:"Båda",opt_anilist:"Öppna AniList",opt_none_link:"Ingen länk",opt_time:"Tid",opt_title:"Titel",opt_score:"Betyg",opt_compact:"Kompakt",opt_normal:"Normal",opt_relaxed:"Avslappnad",opt_bar:"Stapeldiagram",opt_donut:"Munkdiagram",opt_tags:"Taggar",opt_scroll:"Rullningslist",opt_limit:"Begränsa objekt",opt_grid:"Rutnät (Omslag)",opt_list:"Lista (Rader)",opt_auto:"Auto (smart)",opt_user:"Mitt betyg",opt_average:"Medelbetyg",opt_top_right:"Uppe höger",opt_top_left:"Uppe vänster",opt_bottom_right:"Nere höger",opt_bottom_left:"Nere vänster",opt_inline:"Inline",opt_none_pos:"Dold",opt_small_quality:"Liten (snabb)",opt_medium_quality:"Medel",opt_large_quality:"Stor / HD",status_current:"Pågående",status_planning:"Planerad",status_completed:"Avslutad",status_paused:"Pausad",status_dropped:"Avbruten",status_repeating:"Upprepar",hdr_airing:"Sändningsinställningar",hdr_watchlist:"Bevakningslisteinställningar",hdr_season:"Säsongsinställningar",hdr_profile:"Profilinställningar",hdr_manga:"Mangainställningar",hdr_status_tabs:"Statusflikar",hdr_filters:"Filter",lbl_max_items:"Max objekt",lbl_sort_by:"Sortera efter",lbl_show_countdown:"Visa nedräkning",lbl_countdown_format:"Nedräkningsformat",lbl_show_badges:"Visa statusmärken",lbl_show_duration:"Visa avsnittslängd",lbl_show_genres:"Visa genrer",lbl_show_average_score:"Visa medelbetyg",lbl_show_format_badge:"Visa formatmärke (TV/Film)",lbl_layout:"Layout",lbl_show_next_airing:"Visa nedräkning för nästa avsnitt",lbl_max_items_limit:"Max objekt (begränsningsläge)",lbl_overflow_mode:"Överflödesbeteende",lbl_scroll_height:"Rullningshöjd (px)",lbl_show_progress:"Visa framsteg",lbl_show_progress_bar:"Visa framstegsrad",lbl_show_status_tabs:"Visa statusflikar",lbl_visible_statuses:"Synliga statusar",lbl_genre_filter:"Genrefilter (kommaseparerat)",lbl_format_filter:"Formatfilter (kommaseparerat)",placeholder_genre:"t.ex. Action, Romance",placeholder_format:"t.ex. TV, MOVIE, OVA",lbl_show_avatar:"Visa avatar",lbl_show_username:"Visa användarnamn",lbl_show_anime_stats:"Visa anime-statistik",lbl_show_manga_stats:"Visa manga-statistik",lbl_show_genre_chart:"Visa genrediagram",lbl_chart_type:"Typ av genrediagram",lbl_show_favourites:"Visa favoriter",lbl_accent_color:"Accentfärg",lbl_secondary_color:"Sekundärfärg",lbl_card_background:"Kortbakgrund",lbl_card_opacity:"Kortopacitet",lbl_border_color:"Kantfärg",lbl_border_width:"Kantbredd (px)",lbl_border_radius:"Kantradie (px)"},da:{tab_general:"Generelt",tab_colors:"Farver",view_airing:"Sendes",view_watchlist:"Følgeliste",view_season:"Sæson",view_profile:"Profil",view_manga:"Manga",lbl_view:"Visning",lbl_title:"Titel (valgfri)",lbl_entry_id:"Config Entry ID (valgfri, multi-konto)",lbl_card_padding:"Kortafstand",lbl_link_target:"Klikhandling",lbl_show_cover:"Vis forsidebilleder",lbl_cover_size:"Forsidestørrelse",lbl_cover_quality:"Forsidekvalitet",lbl_score_position:"Score-position",lbl_score_source:"Score-kilde",lbl_visible_items:"Synlige elementer (rul for flere)",lbl_scroll_snap:"Fastgør rulning til elementer",lbl_scroll_fade:"Udtoning ved rullekant",lbl_show_search:"Vis søgefelt",lbl_show_tooltips:"Vis tooltips ved hover",opt_small:"Lille",opt_medium:"Medium",opt_large:"Stor",opt_relative:"Relativ (5t 30m)",opt_absolute:"Absolut (10. apr, 14:00)",opt_both:"Begge",opt_anilist:"Åbn AniList",opt_none_link:"Intet link",opt_time:"Tid",opt_title:"Titel",opt_score:"Score",opt_compact:"Kompakt",opt_normal:"Normal",opt_relaxed:"Afslappet",opt_bar:"Søjlediagram",opt_donut:"Cirkeldiagram",opt_tags:"Tags",opt_scroll:"Rullebjælke",opt_limit:"Begræns elementer",opt_grid:"Gitter (Forsider)",opt_list:"Liste (Rækker)",opt_auto:"Auto (smart)",opt_user:"Min score",opt_average:"Gennemsnitsscore",opt_top_right:"Øverst til højre",opt_top_left:"Øverst til venstre",opt_bottom_right:"Nederst til højre",opt_bottom_left:"Nederst til venstre",opt_inline:"Inline",opt_none_pos:"Skjult",opt_small_quality:"Lille (hurtig)",opt_medium_quality:"Medium",opt_large_quality:"Stor / HD",status_current:"Igangværende",status_planning:"Planlagt",status_completed:"Afsluttet",status_paused:"Pauset",status_dropped:"Droppet",status_repeating:"Gentager",hdr_airing:"Sendeindstillinger",hdr_watchlist:"Følgelisteindstillinger",hdr_season:"Sæsonindstillinger",hdr_profile:"Profilindstillinger",hdr_manga:"Mangaindstillinger",hdr_status_tabs:"Statusfaner",hdr_filters:"Filtre",lbl_max_items:"Maks. elementer",lbl_sort_by:"Sorter efter",lbl_show_countdown:"Vis nedtælling",lbl_countdown_format:"Nedtællingsformat",lbl_show_badges:"Vis statusmærker",lbl_show_duration:"Vis episodens varighed",lbl_show_genres:"Vis genrer",lbl_show_average_score:"Vis gennemsnitsscore",lbl_show_format_badge:"Vis formatmærke (TV/Film)",lbl_layout:"Layout",lbl_show_next_airing:"Vis nedtælling for næste episode",lbl_max_items_limit:"Maks. elementer (begrænsningsmode)",lbl_overflow_mode:"Overløbsadfærd",lbl_scroll_height:"Rullehøjde (px)",lbl_show_progress:"Vis fremskridt",lbl_show_progress_bar:"Vis fremskridtsbjælke",lbl_show_status_tabs:"Vis statusfaner",lbl_visible_statuses:"Synlige statusser",lbl_genre_filter:"Genrefilter (kommasepareret)",lbl_format_filter:"Formatfilter (kommasepareret)",placeholder_genre:"f.eks. Action, Romance",placeholder_format:"f.eks. TV, MOVIE, OVA",lbl_show_avatar:"Vis avatar",lbl_show_username:"Vis brugernavn",lbl_show_anime_stats:"Vis anime-statistikker",lbl_show_manga_stats:"Vis manga-statistikker",lbl_show_genre_chart:"Vis genrediagram",lbl_chart_type:"Type genrediagram",lbl_show_favourites:"Vis favoritter",lbl_accent_color:"Accentfarve",lbl_secondary_color:"Sekundær farve",lbl_card_background:"Kortbaggrund",lbl_card_opacity:"Kortgennemsigtighed",lbl_border_color:"Kantfarve",lbl_border_width:"Kantbredde (px)",lbl_border_radius:"Kantradius (px)"},nb:{tab_general:"Generelt",tab_colors:"Farger",view_airing:"Sendes",view_watchlist:"Følgeliste",view_season:"Sesong",view_profile:"Profil",view_manga:"Manga",lbl_view:"Visning",lbl_title:"Tittel (valgfri)",lbl_entry_id:"Config Entry ID (valgfri, multi-konto)",lbl_card_padding:"Kortavstand",lbl_link_target:"Klikkhandling",lbl_show_cover:"Vis forsidebilder",lbl_cover_size:"Forsidestørrelse",lbl_cover_quality:"Forsidekvalitet",lbl_score_position:"Poengposisjon",lbl_score_source:"Poengkilde",lbl_visible_items:"Synlige elementer (rull for flere)",lbl_scroll_snap:"Fest rulling til elementer",lbl_scroll_fade:"Uttoning ved rullekant",lbl_show_search:"Vis søkefelt",lbl_show_tooltips:"Vis verktøytips ved hover",opt_small:"Liten",opt_medium:"Middels",opt_large:"Stor",opt_relative:"Relativ (5t 30m)",opt_absolute:"Absolutt (10. apr, 14:00)",opt_both:"Begge",opt_anilist:"Åpne AniList",opt_none_link:"Ingen lenke",opt_time:"Tid",opt_title:"Tittel",opt_score:"Poeng",opt_compact:"Kompakt",opt_normal:"Normal",opt_relaxed:"Avslappet",opt_bar:"Stolpediagram",opt_donut:"Smultringdiagram",opt_tags:"Tagger",opt_scroll:"Rullefelt",opt_limit:"Begrens elementer",opt_grid:"Rutenett (Forsider)",opt_list:"Liste (Rader)",opt_auto:"Auto (smart)",opt_user:"Min poengsum",opt_average:"Gjennomsnittspoeng",opt_top_right:"Øverst til høyre",opt_top_left:"Øverst til venstre",opt_bottom_right:"Nederst til høyre",opt_bottom_left:"Nederst til venstre",opt_inline:"Inline",opt_none_pos:"Skjult",opt_small_quality:"Liten (rask)",opt_medium_quality:"Middels",opt_large_quality:"Stor / HD",status_current:"Pågående",status_planning:"Planlagt",status_completed:"Fullført",status_paused:"Pauset",status_dropped:"Droppet",status_repeating:"Gjentar",hdr_airing:"Sendeinnstillinger",hdr_watchlist:"Følgelisteinnstillinger",hdr_season:"Sesonginnstillinger",hdr_profile:"Profilinnstillinger",hdr_manga:"Mangainnstillinger",hdr_status_tabs:"Statusfaner",hdr_filters:"Filtre",lbl_max_items:"Maks. elementer",lbl_sort_by:"Sorter etter",lbl_show_countdown:"Vis nedtelling",lbl_countdown_format:"Nedtellingsformat",lbl_show_badges:"Vis statusmerker",lbl_show_duration:"Vis episodens varighet",lbl_show_genres:"Vis sjangre",lbl_show_average_score:"Vis gjennomsnittspoeng",lbl_show_format_badge:"Vis formatmerke (TV/Film)",lbl_layout:"Layout",lbl_show_next_airing:"Vis nedtelling for neste episode",lbl_max_items_limit:"Maks. elementer (grensemodus)",lbl_overflow_mode:"Overflytadferd",lbl_scroll_height:"Rullehøyde (px)",lbl_show_progress:"Vis fremgang",lbl_show_progress_bar:"Vis fremdriftslinje",lbl_show_status_tabs:"Vis statusfaner",lbl_visible_statuses:"Synlige statuser",lbl_genre_filter:"Sjangerfilter (kommaseparert)",lbl_format_filter:"Formatfilter (kommaseparert)",placeholder_genre:"f.eks. Action, Romance",placeholder_format:"f.eks. TV, MOVIE, OVA",lbl_show_avatar:"Vis avatar",lbl_show_username:"Vis brukernavn",lbl_show_anime_stats:"Vis anime-statistikk",lbl_show_manga_stats:"Vis manga-statistikk",lbl_show_genre_chart:"Vis sjangerdiagram",lbl_chart_type:"Type sjangerdiagram",lbl_show_favourites:"Vis favoritter",lbl_accent_color:"Aksentfarge",lbl_secondary_color:"Sekundærfarge",lbl_card_background:"Kortbakgrunn",lbl_card_opacity:"Kortopasitet",lbl_border_color:"Kantfarge",lbl_border_width:"Kantbredde (px)",lbl_border_radius:"Kantradius (px)"},fi:{tab_general:"Yleiset",tab_colors:"Värit",view_airing:"Esitetään",view_watchlist:"Seurantalista",view_season:"Kausi",view_profile:"Profiili",view_manga:"Manga",lbl_view:"Näkymä",lbl_title:"Otsikko (valinnainen)",lbl_entry_id:"Konfig. merkintä-ID (valinnainen, monitili)",lbl_card_padding:"Kortin välit",lbl_link_target:"Klikkaus-toiminto",lbl_show_cover:"Näytä kansikuvat",lbl_cover_size:"Kansikoko",lbl_cover_quality:"Kansilaatu",lbl_score_position:"Pistemäärän sijainti",lbl_score_source:"Pistemäärän lähde",lbl_visible_items:"Näkyvät kohteet (vieritä lisää)",lbl_scroll_snap:"Kohdista vieritys kohteisiin",lbl_scroll_fade:"Häivytys vieritysreunassa",lbl_show_search:"Näytä hakupalkki",lbl_show_tooltips:"Näytä työkaluvihjeet kohdistettaessa",opt_small:"Pieni",opt_medium:"Keskikokoinen",opt_large:"Suuri",opt_relative:"Suhteellinen (5t 30m)",opt_absolute:"Absoluuttinen (10. huhti, 14:00)",opt_both:"Molemmat",opt_anilist:"Avaa AniList",opt_none_link:"Ei linkkiä",opt_time:"Aika",opt_title:"Otsikko",opt_score:"Pisteet",opt_compact:"Tiivis",opt_normal:"Normaali",opt_relaxed:"Väljä",opt_bar:"Pylväsdiagrammi",opt_donut:"Rengasdiagrammi",opt_tags:"Tunnisteet",opt_scroll:"Vierityspalkki",opt_limit:"Rajoita kohteita",opt_grid:"Ruudukko (Kannet)",opt_list:"Lista (Rivit)",opt_auto:"Auto (älykäs)",opt_user:"Oma pisteet",opt_average:"Keskiarvo",opt_top_right:"Yläoikea",opt_top_left:"Ylävasen",opt_bottom_right:"Alaoikea",opt_bottom_left:"Alavasen",opt_inline:"Rivillä",opt_none_pos:"Piilotettu",opt_small_quality:"Pieni (nopea)",opt_medium_quality:"Keskikokoinen",opt_large_quality:"Suuri / HD",status_current:"Käynnissä",status_planning:"Suunniteltu",status_completed:"Valmis",status_paused:"Tauolla",status_dropped:"Keskeytetty",status_repeating:"Toistuu",hdr_airing:"Lähetysasetukset",hdr_watchlist:"Seurantalista-asetukset",hdr_season:"Kausiasetukset",hdr_profile:"Profiiliasetukset",hdr_manga:"Manga-asetukset",hdr_status_tabs:"Tilavälilehdet",hdr_filters:"Suodattimet",lbl_max_items:"Enint. kohteita",lbl_sort_by:"Lajittele",lbl_show_countdown:"Näytä lähtölaskenta",lbl_countdown_format:"Lähtölaskennan muoto",lbl_show_badges:"Näytä tilamerkit",lbl_show_duration:"Näytä jakson kesto",lbl_show_genres:"Näytä genret",lbl_show_average_score:"Näytä keskiarvo",lbl_show_format_badge:"Näytä formaattimerkki (TV/Elokuva)",lbl_layout:"Asettelu",lbl_show_next_airing:"Näytä seuraavan jakson lähtölaskenta",lbl_max_items_limit:"Enint. kohteita (rajoitustila)",lbl_overflow_mode:"Ylivuotokäyttäytyminen",lbl_scroll_height:"Vierityksen korkeus (px)",lbl_show_progress:"Näytä edistyminen",lbl_show_progress_bar:"Näytä edistymispalkki",lbl_show_status_tabs:"Näytä tilavälilehdet",lbl_visible_statuses:"Näkyvät tilat",lbl_genre_filter:"Genresuodatin (pilkuilla erotettu)",lbl_format_filter:"Formaattisuodatin (pilkuilla erotettu)",placeholder_genre:"esim. Action, Romance",placeholder_format:"esim. TV, MOVIE, OVA",lbl_show_avatar:"Näytä avatar",lbl_show_username:"Näytä käyttäjänimi",lbl_show_anime_stats:"Näytä anime-tilastot",lbl_show_manga_stats:"Näytä manga-tilastot",lbl_show_genre_chart:"Näytä genrekaavio",lbl_chart_type:"Genrekaavion tyyppi",lbl_show_favourites:"Näytä suosikit",lbl_accent_color:"Korostusväri",lbl_secondary_color:"Toissijainen väri",lbl_card_background:"Kortin tausta",lbl_card_opacity:"Kortin läpinäkyvyys",lbl_border_color:"Reunaväri",lbl_border_width:"Reunan leveys (px)",lbl_border_radius:"Reunan pyöristys (px)"},cs:{tab_general:"Obecné",tab_colors:"Barvy",view_airing:"Vysílání",view_watchlist:"Seznam sledovaných",view_season:"Sezóna",view_profile:"Profil",view_manga:"Manga",lbl_view:"Zobrazení",lbl_title:"Název (volitelný)",lbl_entry_id:"ID konfigurace (volitelné, multi-účet)",lbl_card_padding:"Odsazení karty",lbl_link_target:"Akce kliknutí",lbl_show_cover:"Zobrazit obrázky obálek",lbl_cover_size:"Velikost obálky",lbl_cover_quality:"Kvalita obálky",lbl_score_position:"Pozice skóre",lbl_score_source:"Zdroj skóre",lbl_visible_items:"Viditelné položky (posuňte pro více)",lbl_scroll_snap:"Přichytit posouvání k položkám",lbl_scroll_fade:"Ztlumení na okraji posouvání",lbl_show_search:"Zobrazit vyhledávací lištu",lbl_show_tooltips:"Zobrazit nápovědy při najetí myší",opt_small:"Malý",opt_medium:"Střední",opt_large:"Velký",opt_relative:"Relativní (5h 30m)",opt_absolute:"Absolutní (10. dub, 14:00)",opt_both:"Obojí",opt_anilist:"Otevřít AniList",opt_none_link:"Žádný odkaz",opt_time:"Čas",opt_title:"Název",opt_score:"Skóre",opt_compact:"Kompaktní",opt_normal:"Normální",opt_relaxed:"Volný",opt_bar:"Sloupcový graf",opt_donut:"Prstencový graf",opt_tags:"Štítky",opt_scroll:"Posuvník",opt_limit:"Omezit položky",opt_grid:"Mřížka (Obálky)",opt_list:"Seznam (Řádky)",opt_auto:"Auto (chytrý)",opt_user:"Mé skóre",opt_average:"Průměrné skóre",opt_top_right:"Vpravo nahoře",opt_top_left:"Vlevo nahoře",opt_bottom_right:"Vpravo dole",opt_bottom_left:"Vlevo dole",opt_inline:"V řádku",opt_none_pos:"Skrytý",opt_small_quality:"Malý (rychlý)",opt_medium_quality:"Střední",opt_large_quality:"Velký / HD",status_current:"Aktuální",status_planning:"Plánovaný",status_completed:"Dokončený",status_paused:"Pozastavený",status_dropped:"Opuštěný",status_repeating:"Opakující",hdr_airing:"Nastavení vysílání",hdr_watchlist:"Nastavení seznamu sledovaných",hdr_season:"Nastavení sezóny",hdr_profile:"Nastavení profilu",hdr_manga:"Nastavení mangy",hdr_status_tabs:"Karty stavu",hdr_filters:"Filtry",lbl_max_items:"Max. položek",lbl_sort_by:"Řadit podle",lbl_show_countdown:"Zobrazit odpočet",lbl_countdown_format:"Formát odpočtu",lbl_show_badges:"Zobrazit stavové odznaky",lbl_show_duration:"Zobrazit délku epizody",lbl_show_genres:"Zobrazit žánry",lbl_show_average_score:"Zobrazit průměrné skóre",lbl_show_format_badge:"Zobrazit odznak formátu (TV/Film)",lbl_layout:"Rozložení",lbl_show_next_airing:"Zobrazit odpočet další epizody",lbl_max_items_limit:"Max. položek (limitovaný režim)",lbl_overflow_mode:"Chování přetečení",lbl_scroll_height:"Výška posouvání (px)",lbl_show_progress:"Zobrazit postup",lbl_show_progress_bar:"Zobrazit ukazatel postupu",lbl_show_status_tabs:"Zobrazit karty stavu",lbl_visible_statuses:"Viditelné stavy",lbl_genre_filter:"Filtr žánrů (oddělené čárkami)",lbl_format_filter:"Filtr formátů (oddělené čárkami)",placeholder_genre:"např. Action, Romance",placeholder_format:"např. TV, MOVIE, OVA",lbl_show_avatar:"Zobrazit avatar",lbl_show_username:"Zobrazit uživatelské jméno",lbl_show_anime_stats:"Zobrazit anime statistiky",lbl_show_manga_stats:"Zobrazit manga statistiky",lbl_show_genre_chart:"Zobrazit graf žánrů",lbl_chart_type:"Typ grafu žánrů",lbl_show_favourites:"Zobrazit oblíbené",lbl_accent_color:"Barva zvýraznění",lbl_secondary_color:"Sekundární barva",lbl_card_background:"Pozadí karty",lbl_card_opacity:"Průhlednost karty",lbl_border_color:"Barva okraje",lbl_border_width:"Šířka okraje (px)",lbl_border_radius:"Poloměr okraje (px)"},ro:{tab_general:"General",tab_colors:"Culori",view_airing:"În difuzare",view_watchlist:"Lista de vizionare",view_season:"Sezon",view_profile:"Profil",view_manga:"Manga",lbl_view:"Vizualizare",lbl_title:"Titlu (opțional)",lbl_entry_id:"ID intrare config (opțional, multi-cont)",lbl_card_padding:"Spațiere card",lbl_link_target:"Acțiune clic",lbl_show_cover:"Afișare imagini de copertă",lbl_cover_size:"Dimensiune copertă",lbl_cover_quality:"Calitate copertă",lbl_score_position:"Poziția scorului",lbl_score_source:"Sursa scorului",lbl_visible_items:"Elemente vizibile (derulați pentru mai multe)",lbl_scroll_snap:"Fixare derulare la elemente",lbl_scroll_fade:"Estompare la marginea derulării",lbl_show_search:"Afișare bară de căutare",lbl_show_tooltips:"Afișare indicii la trecerea cursorului",opt_small:"Mic",opt_medium:"Mediu",opt_large:"Mare",opt_relative:"Relativ (5h 30m)",opt_absolute:"Absolut (10 apr, 14:00)",opt_both:"Ambele",opt_anilist:"Deschide AniList",opt_none_link:"Fără link",opt_time:"Timp",opt_title:"Titlu",opt_score:"Scor",opt_compact:"Compact",opt_normal:"Normal",opt_relaxed:"Relaxat",opt_bar:"Grafic cu bare",opt_donut:"Grafic inel",opt_tags:"Etichete",opt_scroll:"Bară de derulare",opt_limit:"Limitare elemente",opt_grid:"Grilă (Coperți)",opt_list:"Listă (Rânduri)",opt_auto:"Auto (inteligent)",opt_user:"Scorul meu",opt_average:"Scor mediu",opt_top_right:"Sus dreapta",opt_top_left:"Sus stânga",opt_bottom_right:"Jos dreapta",opt_bottom_left:"Jos stânga",opt_inline:"Inline",opt_none_pos:"Ascuns",opt_small_quality:"Mic (rapid)",opt_medium_quality:"Mediu",opt_large_quality:"Mare / HD",status_current:"Curent",status_planning:"Planificat",status_completed:"Finalizat",status_paused:"În pauză",status_dropped:"Abandonat",status_repeating:"Repetat",hdr_airing:"Setări difuzare",hdr_watchlist:"Setări listă de vizionare",hdr_season:"Setări sezon",hdr_profile:"Setări profil",hdr_manga:"Setări manga",hdr_status_tabs:"File de stare",hdr_filters:"Filtre",lbl_max_items:"Max. elemente",lbl_sort_by:"Sortare după",lbl_show_countdown:"Afișare numărătoare inversă",lbl_countdown_format:"Format numărătoare inversă",lbl_show_badges:"Afișare insigne de stare",lbl_show_duration:"Afișare durată episod",lbl_show_genres:"Afișare genuri",lbl_show_average_score:"Afișare scor mediu",lbl_show_format_badge:"Afișare insignă format (TV/Film)",lbl_layout:"Aspect",lbl_show_next_airing:"Afișare numărătoare inversă episod următor",lbl_max_items_limit:"Max. elemente (mod limită)",lbl_overflow_mode:"Comportament la depășire",lbl_scroll_height:"Înălțime derulare (px)",lbl_show_progress:"Afișare progres",lbl_show_progress_bar:"Afișare bară de progres",lbl_show_status_tabs:"Afișare file de stare",lbl_visible_statuses:"Stări vizibile",lbl_genre_filter:"Filtru gen (separate prin virgulă)",lbl_format_filter:"Filtru format (separate prin virgulă)",placeholder_genre:"ex. Action, Romance",placeholder_format:"ex. TV, MOVIE, OVA",lbl_show_avatar:"Afișare avatar",lbl_show_username:"Afișare nume utilizator",lbl_show_anime_stats:"Afișare statistici anime",lbl_show_manga_stats:"Afișare statistici manga",lbl_show_genre_chart:"Afișare grafic genuri",lbl_chart_type:"Tip grafic genuri",lbl_show_favourites:"Afișare favorite",lbl_accent_color:"Culoare accent",lbl_secondary_color:"Culoare secundară",lbl_card_background:"Fundal card",lbl_card_opacity:"Opacitate card",lbl_border_color:"Culoare bordură",lbl_border_width:"Lățime bordură (px)",lbl_border_radius:"Rază bordură (px)"},hu:{tab_general:"Általános",tab_colors:"Színek",view_airing:"Sugárzás",view_watchlist:"Figyelőlista",view_season:"Évad",view_profile:"Profil",view_manga:"Manga",lbl_view:"Nézet",lbl_title:"Cím (opcionális)",lbl_entry_id:"Konfig. bejegyzés ID (opcionális, többfiókos)",lbl_card_padding:"Kártyatávolság",lbl_link_target:"Kattintási művelet",lbl_show_cover:"Borítóképek megjelenítése",lbl_cover_size:"Borítóméret",lbl_cover_quality:"Borítóminőség",lbl_score_position:"Pontszám pozíció",lbl_score_source:"Pontszám forrás",lbl_visible_items:"Látható elemek (görgessen többért)",lbl_scroll_snap:"Görgetés rögzítése elemekhez",lbl_scroll_fade:"Halványítás a görgetés szélén",lbl_show_search:"Keresősáv megjelenítése",lbl_show_tooltips:"Eszköztippek megjelenítése rámutatáskor",opt_small:"Kicsi",opt_medium:"Közepes",opt_large:"Nagy",opt_relative:"Relatív (5ó 30p)",opt_absolute:"Abszolút (ápr. 10, 14:00)",opt_both:"Mindkettő",opt_anilist:"AniList megnyitása",opt_none_link:"Nincs hivatkozás",opt_time:"Idő",opt_title:"Cím",opt_score:"Pontszám",opt_compact:"Kompakt",opt_normal:"Normál",opt_relaxed:"Laza",opt_bar:"Oszlopdiagram",opt_donut:"Fánkdiagram",opt_tags:"Címkék",opt_scroll:"Görgetősáv",opt_limit:"Elemek korlátozása",opt_grid:"Rács (Borítók)",opt_list:"Lista (Sorok)",opt_auto:"Auto (okos)",opt_user:"Saját pontszám",opt_average:"Átlagos pontszám",opt_top_right:"Jobb felső",opt_top_left:"Bal felső",opt_bottom_right:"Jobb alsó",opt_bottom_left:"Bal alsó",opt_inline:"Soron belül",opt_none_pos:"Rejtett",opt_small_quality:"Kicsi (gyors)",opt_medium_quality:"Közepes",opt_large_quality:"Nagy / HD",status_current:"Jelenlegi",status_planning:"Tervezett",status_completed:"Befejezett",status_paused:"Szüneteltetve",status_dropped:"Elhagyott",status_repeating:"Ismétlés",hdr_airing:"Sugárzási beállítások",hdr_watchlist:"Figyelőlista beállítások",hdr_season:"Évadbeállítások",hdr_profile:"Profilbeállítások",hdr_manga:"Manga beállítások",hdr_status_tabs:"Állapotfülek",hdr_filters:"Szűrők",lbl_max_items:"Max. elem",lbl_sort_by:"Rendezés",lbl_show_countdown:"Visszaszámlálás megjelenítése",lbl_countdown_format:"Visszaszámlálás formátum",lbl_show_badges:"Állapotjelvények megjelenítése",lbl_show_duration:"Epizód időtartam megjelenítése",lbl_show_genres:"Műfajok megjelenítése",lbl_show_average_score:"Átlagos pontszám megjelenítése",lbl_show_format_badge:"Formátumjelvény megjelenítése (TV/Film)",lbl_layout:"Elrendezés",lbl_show_next_airing:"Következő epizód visszaszámlálás megjelenítése",lbl_max_items_limit:"Max. elem (korlát mód)",lbl_overflow_mode:"Túlcsordulási viselkedés",lbl_scroll_height:"Görgetési magasság (px)",lbl_show_progress:"Haladás megjelenítése",lbl_show_progress_bar:"Haladássáv megjelenítése",lbl_show_status_tabs:"Állapotfülek megjelenítése",lbl_visible_statuses:"Látható állapotok",lbl_genre_filter:"Műfaj szűrő (vesszővel elválasztva)",lbl_format_filter:"Formátum szűrő (vesszővel elválasztva)",placeholder_genre:"pl. Action, Romance",placeholder_format:"pl. TV, MOVIE, OVA",lbl_show_avatar:"Avatar megjelenítése",lbl_show_username:"Felhasználónév megjelenítése",lbl_show_anime_stats:"Anime statisztikák megjelenítése",lbl_show_manga_stats:"Manga statisztikák megjelenítése",lbl_show_genre_chart:"Műfaj diagram megjelenítése",lbl_chart_type:"Műfaj diagram típusa",lbl_show_favourites:"Kedvencek megjelenítése",lbl_accent_color:"Kiemelő szín",lbl_secondary_color:"Másodlagos szín",lbl_card_background:"Kártya háttér",lbl_card_opacity:"Kártya átlátszóság",lbl_border_color:"Szegélyszín",lbl_border_width:"Szegélyszélesség (px)",lbl_border_radius:"Szegélysugár (px)"},el:{tab_general:"Γενικά",tab_colors:"Χρώματα",view_airing:"Μετάδοση",view_watchlist:"Λίστα παρακολούθησης",view_season:"Σεζόν",view_profile:"Προφίλ",view_manga:"Manga",lbl_view:"Προβολή",lbl_title:"Τίτλος (προαιρετικά)",lbl_entry_id:"ID εγγραφής ρυθμίσεων (προαιρετικά, πολυ-λογαριασμός)",lbl_card_padding:"Αποστάσεις κάρτας",lbl_link_target:"Ενέργεια κλικ",lbl_show_cover:"Εμφάνιση εικόνων εξωφύλλου",lbl_cover_size:"Μέγεθος εξωφύλλου",lbl_cover_quality:"Ποιότητα εξωφύλλου",lbl_score_position:"Θέση βαθμολογίας",lbl_score_source:"Πηγή βαθμολογίας",lbl_visible_items:"Ορατά στοιχεία (κύλιση για περισσότερα)",lbl_scroll_snap:"Κούμπωμα κύλισης σε στοιχεία",lbl_scroll_fade:"Εξασθένιση στο άκρο κύλισης",lbl_show_search:"Εμφάνιση γραμμής αναζήτησης",lbl_show_tooltips:"Εμφάνιση συμβουλών κατά την αιώρηση",opt_small:"Μικρό",opt_medium:"Μεσαίο",opt_large:"Μεγάλο",opt_relative:"Σχετικό (5ω 30λ)",opt_absolute:"Απόλυτο (10 Απρ, 14:00)",opt_both:"Και τα δύο",opt_anilist:"Άνοιγμα AniList",opt_none_link:"Χωρίς σύνδεσμο",opt_time:"Χρόνος",opt_title:"Τίτλος",opt_score:"Βαθμολογία",opt_compact:"Συμπαγές",opt_normal:"Κανονικό",opt_relaxed:"Χαλαρό",opt_bar:"Ραβδόγραμμα",opt_donut:"Κυκλικό γράφημα",opt_tags:"Ετικέτες",opt_scroll:"Γραμμή κύλισης",opt_limit:"Περιορισμός στοιχείων",opt_grid:"Πλέγμα (Εξώφυλλα)",opt_list:"Λίστα (Γραμμές)",opt_auto:"Αυτόματο (έξυπνο)",opt_user:"Η βαθμολογία μου",opt_average:"Μέση βαθμολογία",opt_top_right:"Πάνω δεξιά",opt_top_left:"Πάνω αριστερά",opt_bottom_right:"Κάτω δεξιά",opt_bottom_left:"Κάτω αριστερά",opt_inline:"Ενσωματωμένο",opt_none_pos:"Κρυφό",opt_small_quality:"Μικρό (γρήγορο)",opt_medium_quality:"Μεσαίο",opt_large_quality:"Μεγάλο / HD",status_current:"Τρέχον",status_planning:"Προγραμματισμένο",status_completed:"Ολοκληρωμένο",status_paused:"Σε παύση",status_dropped:"Εγκαταλελειμμένο",status_repeating:"Επανάληψη",hdr_airing:"Ρυθμίσεις μετάδοσης",hdr_watchlist:"Ρυθμίσεις λίστας παρακολούθησης",hdr_season:"Ρυθμίσεις σεζόν",hdr_profile:"Ρυθμίσεις προφίλ",hdr_manga:"Ρυθμίσεις manga",hdr_status_tabs:"Καρτέλες κατάστασης",hdr_filters:"Φίλτρα",lbl_max_items:"Μέγ. στοιχεία",lbl_sort_by:"Ταξινόμηση κατά",lbl_show_countdown:"Εμφάνιση αντίστροφης μέτρησης",lbl_countdown_format:"Μορφή αντίστροφης μέτρησης",lbl_show_badges:"Εμφάνιση σημάτων κατάστασης",lbl_show_duration:"Εμφάνιση διάρκειας επεισοδίου",lbl_show_genres:"Εμφάνιση ειδών",lbl_show_average_score:"Εμφάνιση μέσης βαθμολογίας",lbl_show_format_badge:"Εμφάνιση σήματος μορφής (TV/Ταινία)",lbl_layout:"Διάταξη",lbl_show_next_airing:"Εμφάνιση αντίστρ. μέτρησης επόμενου επεισοδίου",lbl_max_items_limit:"Μέγ. στοιχεία (λειτουργία ορίου)",lbl_overflow_mode:"Συμπεριφορά υπερχείλισης",lbl_scroll_height:"Ύψος κύλισης (px)",lbl_show_progress:"Εμφάνιση προόδου",lbl_show_progress_bar:"Εμφάνιση μπάρας προόδου",lbl_show_status_tabs:"Εμφάνιση καρτελών κατάστασης",lbl_visible_statuses:"Ορατές καταστάσεις",lbl_genre_filter:"Φίλτρο ειδών (χωρισμένα με κόμμα)",lbl_format_filter:"Φίλτρο μορφής (χωρισμένα με κόμμα)",placeholder_genre:"π.χ. Action, Romance",placeholder_format:"π.χ. TV, MOVIE, OVA",lbl_show_avatar:"Εμφάνιση avatar",lbl_show_username:"Εμφάνιση ονόματος χρήστη",lbl_show_anime_stats:"Εμφάνιση στατιστικών anime",lbl_show_manga_stats:"Εμφάνιση στατιστικών manga",lbl_show_genre_chart:"Εμφάνιση γραφήματος ειδών",lbl_chart_type:"Τύπος γραφήματος ειδών",lbl_show_favourites:"Εμφάνιση αγαπημένων",lbl_accent_color:"Χρώμα τονισμού",lbl_secondary_color:"Δευτερεύον χρώμα",lbl_card_background:"Φόντο κάρτας",lbl_card_opacity:"Αδιαφάνεια κάρτας",lbl_border_color:"Χρώμα περιγράμματος",lbl_border_width:"Πλάτος περιγράμματος (px)",lbl_border_radius:"Ακτίνα περιγράμματος (px)"},tr:{tab_general:"Genel",tab_colors:"Renkler",view_airing:"Yayında",view_watchlist:"İzleme listesi",view_season:"Sezon",view_profile:"Profil",view_manga:"Manga",lbl_view:"Görünüm",lbl_title:"Başlık (isteğe bağlı)",lbl_entry_id:"Yapılandırma giriş ID (isteğe bağlı, çoklu hesap)",lbl_card_padding:"Kart aralığı",lbl_link_target:"Tıklama eylemi",lbl_show_cover:"Kapak resimlerini göster",lbl_cover_size:"Kapak boyutu",lbl_cover_quality:"Kapak kalitesi",lbl_score_position:"Puan konumu",lbl_score_source:"Puan kaynağı",lbl_visible_items:"Görünür öğeler (daha fazlası için kaydırın)",lbl_scroll_snap:"Kaydırmayı öğelere sabitle",lbl_scroll_fade:"Kaydırma kenarında soldur",lbl_show_search:"Arama çubuğunu göster",lbl_show_tooltips:"Üzerine gelince araç ipuçlarını göster",opt_small:"Küçük",opt_medium:"Orta",opt_large:"Büyük",opt_relative:"Göreceli (5sa 30dk)",opt_absolute:"Mutlak (10 Nis, 14:00)",opt_both:"Her ikisi",opt_anilist:"AniList'i aç",opt_none_link:"Bağlantı yok",opt_time:"Zaman",opt_title:"Başlık",opt_score:"Puan",opt_compact:"Kompakt",opt_normal:"Normal",opt_relaxed:"Rahat",opt_bar:"Çubuk grafik",opt_donut:"Halka grafik",opt_tags:"Etiketler",opt_scroll:"Kaydırma çubuğu",opt_limit:"Öğeleri sınırla",opt_grid:"Izgara (Kapaklar)",opt_list:"Liste (Satırlar)",opt_auto:"Otomatik (akıllı)",opt_user:"Benim puanım",opt_average:"Ortalama puan",opt_top_right:"Sağ üst",opt_top_left:"Sol üst",opt_bottom_right:"Sağ alt",opt_bottom_left:"Sol alt",opt_inline:"Satır içi",opt_none_pos:"Gizli",opt_small_quality:"Küçük (hızlı)",opt_medium_quality:"Orta",opt_large_quality:"Büyük / HD",status_current:"Mevcut",status_planning:"Planlanmış",status_completed:"Tamamlandı",status_paused:"Duraklatıldı",status_dropped:"Bırakıldı",status_repeating:"Tekrarlanıyor",hdr_airing:"Yayın ayarları",hdr_watchlist:"İzleme listesi ayarları",hdr_season:"Sezon ayarları",hdr_profile:"Profil ayarları",hdr_manga:"Manga ayarları",hdr_status_tabs:"Durum sekmeleri",hdr_filters:"Filtreler",lbl_max_items:"Maks. öğe",lbl_sort_by:"Sıralama",lbl_show_countdown:"Geri sayımı göster",lbl_countdown_format:"Geri sayım formatı",lbl_show_badges:"Durum rozetlerini göster",lbl_show_duration:"Bölüm süresini göster",lbl_show_genres:"Türleri göster",lbl_show_average_score:"Ortalama puanı göster",lbl_show_format_badge:"Format rozetini göster (TV/Film)",lbl_layout:"Düzen",lbl_show_next_airing:"Sonraki bölüm geri sayımını göster",lbl_max_items_limit:"Maks. öğe (sınır modu)",lbl_overflow_mode:"Taşma davranışı",lbl_scroll_height:"Kaydırma yüksekliği (px)",lbl_show_progress:"İlerlemeyi göster",lbl_show_progress_bar:"İlerleme çubuğunu göster",lbl_show_status_tabs:"Durum sekmelerini göster",lbl_visible_statuses:"Görünür durumlar",lbl_genre_filter:"Tür filtresi (virgülle ayrılmış)",lbl_format_filter:"Format filtresi (virgülle ayrılmış)",placeholder_genre:"ör. Action, Romance",placeholder_format:"ör. TV, MOVIE, OVA",lbl_show_avatar:"Avatarı göster",lbl_show_username:"Kullanıcı adını göster",lbl_show_anime_stats:"Anime istatistiklerini göster",lbl_show_manga_stats:"Manga istatistiklerini göster",lbl_show_genre_chart:"Tür grafiğini göster",lbl_chart_type:"Tür grafik tipi",lbl_show_favourites:"Favorileri göster",lbl_accent_color:"Vurgu rengi",lbl_secondary_color:"İkincil renk",lbl_card_background:"Kart arka planı",lbl_card_opacity:"Kart opaklığı",lbl_border_color:"Kenarlık rengi",lbl_border_width:"Kenarlık genişliği (px)",lbl_border_radius:"Kenarlık yarıçapı (px)"},uk:{tab_general:"Загальне",tab_colors:"Кольори",view_airing:"В ефірі",view_watchlist:"Список перегляду",view_season:"Сезон",view_profile:"Профіль",view_manga:"Манга",lbl_view:"Вигляд",lbl_title:"Назва (необов'язково)",lbl_entry_id:"ID запису конфігурації (необов'язково, мультиакаунт)",lbl_card_padding:"Відступи картки",lbl_link_target:"Дія при натисканні",lbl_show_cover:"Показувати зображення обкладинок",lbl_cover_size:"Розмір обкладинки",lbl_cover_quality:"Якість обкладинки",lbl_score_position:"Позиція оцінки",lbl_score_source:"Джерело оцінки",lbl_visible_items:"Видимі елементи (прокрутіть для більшого)",lbl_scroll_snap:"Прив'язка прокрутки до елементів",lbl_scroll_fade:"Згасання на краю прокрутки",lbl_show_search:"Показувати панель пошуку",lbl_show_tooltips:"Показувати підказки при наведенні",opt_small:"Малий",opt_medium:"Середній",opt_large:"Великий",opt_relative:"Відносний (5г 30хв)",opt_absolute:"Абсолютний (10 кві, 14:00)",opt_both:"Обидва",opt_anilist:"Відкрити AniList",opt_none_link:"Без посилання",opt_time:"Час",opt_title:"Назва",opt_score:"Оцінка",opt_compact:"Компактний",opt_normal:"Звичайний",opt_relaxed:"Вільний",opt_bar:"Стовпчаста діаграма",opt_donut:"Кільцева діаграма",opt_tags:"Теги",opt_scroll:"Смуга прокрутки",opt_limit:"Обмежити елементи",opt_grid:"Сітка (Обкладинки)",opt_list:"Список (Рядки)",opt_auto:"Авто (розумний)",opt_user:"Моя оцінка",opt_average:"Середня оцінка",opt_top_right:"Зверху справа",opt_top_left:"Зверху зліва",opt_bottom_right:"Знизу справа",opt_bottom_left:"Знизу зліва",opt_inline:"В рядку",opt_none_pos:"Прихований",opt_small_quality:"Малий (швидкий)",opt_medium_quality:"Середній",opt_large_quality:"Великий / HD",status_current:"Поточний",status_planning:"Заплановано",status_completed:"Завершено",status_paused:"На паузі",status_dropped:"Покинуто",status_repeating:"Повторення",hdr_airing:"Налаштування ефіру",hdr_watchlist:"Налаштування списку перегляду",hdr_season:"Налаштування сезону",hdr_profile:"Налаштування профілю",hdr_manga:"Налаштування манги",hdr_status_tabs:"Вкладки статусу",hdr_filters:"Фільтри",lbl_max_items:"Макс. елементів",lbl_sort_by:"Сортувати за",lbl_show_countdown:"Показувати зворотній відлік",lbl_countdown_format:"Формат зворотнього відліку",lbl_show_badges:"Показувати значки статусу",lbl_show_duration:"Показувати тривалість епізоду",lbl_show_genres:"Показувати жанри",lbl_show_average_score:"Показувати середню оцінку",lbl_show_format_badge:"Показувати значок формату (TV/Фільм)",lbl_layout:"Макет",lbl_show_next_airing:"Показувати відлік наступного епізоду",lbl_max_items_limit:"Макс. елементів (режим обмеження)",lbl_overflow_mode:"Поведінка при переповненні",lbl_scroll_height:"Висота прокрутки (px)",lbl_show_progress:"Показувати прогрес",lbl_show_progress_bar:"Показувати смугу прогресу",lbl_show_status_tabs:"Показувати вкладки статусу",lbl_visible_statuses:"Видимі статуси",lbl_genre_filter:"Фільтр жанрів (через кому)",lbl_format_filter:"Фільтр форматів (через кому)",placeholder_genre:"напр. Action, Romance",placeholder_format:"напр. TV, MOVIE, OVA",lbl_show_avatar:"Показувати аватар",lbl_show_username:"Показувати ім'я користувача",lbl_show_anime_stats:"Показувати статистику аніме",lbl_show_manga_stats:"Показувати статистику манги",lbl_show_genre_chart:"Показувати діаграму жанрів",lbl_chart_type:"Тип діаграми жанрів",lbl_show_favourites:"Показувати улюблені",lbl_accent_color:"Колір акценту",lbl_secondary_color:"Вторинний колір",lbl_card_background:"Фон картки",lbl_card_opacity:"Прозорість картки",lbl_border_color:"Колір рамки",lbl_border_width:"Ширина рамки (px)",lbl_border_radius:"Радіус рамки (px)"},ru:{tab_general:"Общее",tab_colors:"Цвета",view_airing:"В эфире",view_watchlist:"Список просмотра",view_season:"Сезон",view_profile:"Профиль",view_manga:"Манга",lbl_view:"Вид",lbl_title:"Заголовок (необязательно)",lbl_entry_id:"ID записи конфигурации (необязательно, мультиаккаунт)",lbl_card_padding:"Отступы карточки",lbl_link_target:"Действие при клике",lbl_show_cover:"Показывать обложки",lbl_cover_size:"Размер обложки",lbl_cover_quality:"Качество обложки",lbl_score_position:"Позиция оценки",lbl_score_source:"Источник оценки",lbl_visible_items:"Видимые элементы (прокрутите для большего)",lbl_scroll_snap:"Привязка прокрутки к элементам",lbl_scroll_fade:"Затухание на краю прокрутки",lbl_show_search:"Показывать панель поиска",lbl_show_tooltips:"Показывать подсказки при наведении",opt_small:"Маленький",opt_medium:"Средний",opt_large:"Большой",opt_relative:"Относительный (5ч 30м)",opt_absolute:"Абсолютный (10 апр, 14:00)",opt_both:"Оба",opt_anilist:"Открыть AniList",opt_none_link:"Без ссылки",opt_time:"Время",opt_title:"Заголовок",opt_score:"Оценка",opt_compact:"Компактный",opt_normal:"Обычный",opt_relaxed:"Свободный",opt_bar:"Столбчатая диаграмма",opt_donut:"Кольцевая диаграмма",opt_tags:"Теги",opt_scroll:"Полоса прокрутки",opt_limit:"Ограничить элементы",opt_grid:"Сетка (Обложки)",opt_list:"Список (Строки)",opt_auto:"Авто (умный)",opt_user:"Моя оценка",opt_average:"Средняя оценка",opt_top_right:"Сверху справа",opt_top_left:"Сверху слева",opt_bottom_right:"Снизу справа",opt_bottom_left:"Снизу слева",opt_inline:"В строке",opt_none_pos:"Скрытый",opt_small_quality:"Маленький (быстрый)",opt_medium_quality:"Средний",opt_large_quality:"Большой / HD",status_current:"Текущий",status_planning:"Запланировано",status_completed:"Завершено",status_paused:"На паузе",status_dropped:"Брошено",status_repeating:"Повтор",hdr_airing:"Настройки эфира",hdr_watchlist:"Настройки списка просмотра",hdr_season:"Настройки сезона",hdr_profile:"Настройки профиля",hdr_manga:"Настройки манги",hdr_status_tabs:"Вкладки статуса",hdr_filters:"Фильтры",lbl_max_items:"Макс. элементов",lbl_sort_by:"Сортировать по",lbl_show_countdown:"Показывать обратный отсчёт",lbl_countdown_format:"Формат обратного отсчёта",lbl_show_badges:"Показывать значки статуса",lbl_show_duration:"Показывать длительность эпизода",lbl_show_genres:"Показывать жанры",lbl_show_average_score:"Показывать среднюю оценку",lbl_show_format_badge:"Показывать значок формата (TV/Фильм)",lbl_layout:"Макет",lbl_show_next_airing:"Показывать отсчёт следующего эпизода",lbl_max_items_limit:"Макс. элементов (режим лимита)",lbl_overflow_mode:"Поведение при переполнении",lbl_scroll_height:"Высота прокрутки (px)",lbl_show_progress:"Показывать прогресс",lbl_show_progress_bar:"Показывать полосу прогресса",lbl_show_status_tabs:"Показывать вкладки статуса",lbl_visible_statuses:"Видимые статусы",lbl_genre_filter:"Фильтр жанров (через запятую)",lbl_format_filter:"Фильтр форматов (через запятую)",placeholder_genre:"напр. Action, Romance",placeholder_format:"напр. TV, MOVIE, OVA",lbl_show_avatar:"Показывать аватар",lbl_show_username:"Показывать имя пользователя",lbl_show_anime_stats:"Показывать статистику аниме",lbl_show_manga_stats:"Показывать статистику манги",lbl_show_genre_chart:"Показывать диаграмму жанров",lbl_chart_type:"Тип диаграммы жанров",lbl_show_favourites:"Показывать избранное",lbl_accent_color:"Цвет акцента",lbl_secondary_color:"Вторичный цвет",lbl_card_background:"Фон карточки",lbl_card_opacity:"Прозрачность карточки",lbl_border_color:"Цвет рамки",lbl_border_width:"Ширина рамки (px)",lbl_border_radius:"Радиус рамки (px)"},sk:{tab_general:"Všeobecné",tab_colors:"Farby",view_airing:"Vysielanie",view_watchlist:"Zoznam sledovaných",view_season:"Sezóna",view_profile:"Profil",view_manga:"Manga",lbl_view:"Zobrazenie",lbl_title:"Názov (voliteľný)",lbl_entry_id:"ID konfiguračného záznamu (voliteľné, multi-účet)",lbl_card_padding:"Odsadenie karty",lbl_link_target:"Akcia kliknutia",lbl_show_cover:"Zobraziť obrázky obálok",lbl_cover_size:"Veľkosť obálky",lbl_cover_quality:"Kvalita obálky",lbl_score_position:"Pozícia skóre",lbl_score_source:"Zdroj skóre",lbl_visible_items:"Viditeľné položky (posúvajte pre viac)",lbl_scroll_snap:"Prichytiť posúvanie k položkám",lbl_scroll_fade:"Stlmenie na okraji posúvania",lbl_show_search:"Zobraziť vyhľadávací lištu",lbl_show_tooltips:"Zobraziť nápovedy pri nabehnutí myšou",opt_small:"Malý",opt_medium:"Stredný",opt_large:"Veľký",opt_relative:"Relatívny (5h 30m)",opt_absolute:"Absolútny (10. apr, 14:00)",opt_both:"Oboje",opt_anilist:"Otvoriť AniList",opt_none_link:"Žiadny odkaz",opt_time:"Čas",opt_title:"Názov",opt_score:"Skóre",opt_compact:"Kompaktný",opt_normal:"Normálny",opt_relaxed:"Voľný",opt_bar:"Stĺpcový graf",opt_donut:"Prstencový graf",opt_tags:"Štítky",opt_scroll:"Posúvač",opt_limit:"Obmedziť položky",opt_grid:"Mriežka (Obálky)",opt_list:"Zoznam (Riadky)",opt_auto:"Auto (inteligentný)",opt_user:"Moje skóre",opt_average:"Priemerné skóre",opt_top_right:"Vpravo hore",opt_top_left:"Vľavo hore",opt_bottom_right:"Vpravo dole",opt_bottom_left:"Vľavo dole",opt_inline:"V riadku",opt_none_pos:"Skrytý",opt_small_quality:"Malý (rýchly)",opt_medium_quality:"Stredný",opt_large_quality:"Veľký / HD",status_current:"Aktuálny",status_planning:"Plánovaný",status_completed:"Dokončený",status_paused:"Pozastavený",status_dropped:"Opustený",status_repeating:"Opakujúci",hdr_airing:"Nastavenia vysielania",hdr_watchlist:"Nastavenia zoznamu sledovaných",hdr_season:"Nastavenia sezóny",hdr_profile:"Nastavenia profilu",hdr_manga:"Nastavenia mangy",hdr_status_tabs:"Karty stavu",hdr_filters:"Filtre",lbl_max_items:"Max. položiek",lbl_sort_by:"Radiť podľa",lbl_show_countdown:"Zobraziť odpočet",lbl_countdown_format:"Formát odpočtu",lbl_show_badges:"Zobraziť stavové odznaky",lbl_show_duration:"Zobraziť dĺžku epizódy",lbl_show_genres:"Zobraziť žánre",lbl_show_average_score:"Zobraziť priemerné skóre",lbl_show_format_badge:"Zobraziť odznak formátu (TV/Film)",lbl_layout:"Rozloženie",lbl_show_next_airing:"Zobraziť odpočet ďalšej epizódy",lbl_max_items_limit:"Max. položiek (limitovaný režim)",lbl_overflow_mode:"Správanie pri pretečení",lbl_scroll_height:"Výška posúvania (px)",lbl_show_progress:"Zobraziť postup",lbl_show_progress_bar:"Zobraziť ukazovateľ postupu",lbl_show_status_tabs:"Zobraziť karty stavu",lbl_visible_statuses:"Viditeľné stavy",lbl_genre_filter:"Filter žánrov (oddelené čiarkami)",lbl_format_filter:"Filter formátov (oddelené čiarkami)",placeholder_genre:"napr. Action, Romance",placeholder_format:"napr. TV, MOVIE, OVA",lbl_show_avatar:"Zobraziť avatar",lbl_show_username:"Zobraziť používateľské meno",lbl_show_anime_stats:"Zobraziť anime štatistiky",lbl_show_manga_stats:"Zobraziť manga štatistiky",lbl_show_genre_chart:"Zobraziť graf žánrov",lbl_chart_type:"Typ grafu žánrov",lbl_show_favourites:"Zobraziť obľúbené",lbl_accent_color:"Farba zvýraznenia",lbl_secondary_color:"Sekundárna farba",lbl_card_background:"Pozadie karty",lbl_card_opacity:"Priehľadnosť karty",lbl_border_color:"Farba okraja",lbl_border_width:"Šírka okraja (px)",lbl_border_radius:"Polomer okraja (px)"},hr:{tab_general:"Općenito",tab_colors:"Boje",view_airing:"Emitiranje",view_watchlist:"Lista za gledanje",view_season:"Sezona",view_profile:"Profil",view_manga:"Manga",lbl_view:"Prikaz",lbl_title:"Naslov (neobavezno)",lbl_entry_id:"ID konfiguracijske stavke (neobavezno, više računa)",lbl_card_padding:"Razmak kartice",lbl_link_target:"Radnja klika",lbl_show_cover:"Prikaži slike naslovnice",lbl_cover_size:"Veličina naslovnice",lbl_cover_quality:"Kvaliteta naslovnice",lbl_score_position:"Pozicija ocjene",lbl_score_source:"Izvor ocjene",lbl_visible_items:"Vidljive stavke (pomičite za više)",lbl_scroll_snap:"Pričvrsti pomicanje na stavke",lbl_scroll_fade:"Blijeđenje na rubu pomicanja",lbl_show_search:"Prikaži traku za pretraživanje",lbl_show_tooltips:"Prikaži savjete pri prelasku",opt_small:"Mali",opt_medium:"Srednji",opt_large:"Veliki",opt_relative:"Relativno (5h 30m)",opt_absolute:"Apsolutno (10. tra, 14:00)",opt_both:"Oboje",opt_anilist:"Otvori AniList",opt_none_link:"Bez veze",opt_time:"Vrijeme",opt_title:"Naslov",opt_score:"Ocjena",opt_compact:"Kompaktno",opt_normal:"Normalno",opt_relaxed:"Opušteno",opt_bar:"Stupčasti grafikon",opt_donut:"Prstenasti grafikon",opt_tags:"Oznake",opt_scroll:"Traka za pomicanje",opt_limit:"Ograniči stavke",opt_grid:"Mreža (Naslovnice)",opt_list:"Popis (Redovi)",opt_auto:"Automatski (pametno)",opt_user:"Moja ocjena",opt_average:"Prosječna ocjena",opt_top_right:"Gore desno",opt_top_left:"Gore lijevo",opt_bottom_right:"Dolje desno",opt_bottom_left:"Dolje lijevo",opt_inline:"U redu",opt_none_pos:"Skriveno",opt_small_quality:"Mali (brzo)",opt_medium_quality:"Srednji",opt_large_quality:"Veliki / HD",status_current:"Trenutno",status_planning:"Planirano",status_completed:"Završeno",status_paused:"Pauzirano",status_dropped:"Napušteno",status_repeating:"Ponavljanje",hdr_airing:"Postavke emitiranja",hdr_watchlist:"Postavke liste za gledanje",hdr_season:"Postavke sezone",hdr_profile:"Postavke profila",hdr_manga:"Postavke mange",hdr_status_tabs:"Kartice statusa",hdr_filters:"Filteri",lbl_max_items:"Maks. stavki",lbl_sort_by:"Sortiraj po",lbl_show_countdown:"Prikaži odbrojavanje",lbl_countdown_format:"Format odbrojavanja",lbl_show_badges:"Prikaži značke statusa",lbl_show_duration:"Prikaži trajanje epizode",lbl_show_genres:"Prikaži žanrove",lbl_show_average_score:"Prikaži prosječnu ocjenu",lbl_show_format_badge:"Prikaži značku formata (TV/Film)",lbl_layout:"Raspored",lbl_show_next_airing:"Prikaži odbrojavanje sljedeće epizode",lbl_max_items_limit:"Maks. stavki (ograničeni način)",lbl_overflow_mode:"Ponašanje pri preljevu",lbl_scroll_height:"Visina pomicanja (px)",lbl_show_progress:"Prikaži napredak",lbl_show_progress_bar:"Prikaži traku napretka",lbl_show_status_tabs:"Prikaži kartice statusa",lbl_visible_statuses:"Vidljivi statusi",lbl_genre_filter:"Filter žanrova (odvojeni zarezom)",lbl_format_filter:"Filter formata (odvojeni zarezom)",placeholder_genre:"npr. Action, Romance",placeholder_format:"npr. TV, MOVIE, OVA",lbl_show_avatar:"Prikaži avatar",lbl_show_username:"Prikaži korisničko ime",lbl_show_anime_stats:"Prikaži anime statistike",lbl_show_manga_stats:"Prikaži manga statistike",lbl_show_genre_chart:"Prikaži grafikon žanrova",lbl_chart_type:"Vrsta grafikona žanrova",lbl_show_favourites:"Prikaži favorite",lbl_accent_color:"Boja naglaska",lbl_secondary_color:"Sekundarna boja",lbl_card_background:"Pozadina kartice",lbl_card_opacity:"Prozirnost kartice",lbl_border_color:"Boja obruba",lbl_border_width:"Širina obruba (px)",lbl_border_radius:"Polumjer obruba (px)"},bg:{tab_general:"Общи",tab_colors:"Цветове",view_airing:"В ефир",view_watchlist:"Списък за гледане",view_season:"Сезон",view_profile:"Профил",view_manga:"Манга",lbl_view:"Изглед",lbl_title:"Заглавие (по избор)",lbl_entry_id:"ID на конф. запис (по избор, мулти-акаунт)",lbl_card_padding:"Разстояние на картата",lbl_link_target:"Действие при клик",lbl_show_cover:"Показване на корици",lbl_cover_size:"Размер на корица",lbl_cover_quality:"Качество на корица",lbl_score_position:"Позиция на оценка",lbl_score_source:"Източник на оценка",lbl_visible_items:"Видими елементи (превъртете за повече)",lbl_scroll_snap:"Прилепване на превъртане към елементи",lbl_scroll_fade:"Избледняване в края на превъртане",lbl_show_search:"Показване на лента за търсене",lbl_show_tooltips:"Показване на подсказки при задържане",opt_small:"Малък",opt_medium:"Среден",opt_large:"Голям",opt_relative:"Относително (5ч 30м)",opt_absolute:"Абсолютно (10 апр, 14:00)",opt_both:"И двете",opt_anilist:"Отвори AniList",opt_none_link:"Без връзка",opt_time:"Време",opt_title:"Заглавие",opt_score:"Оценка",opt_compact:"Компактен",opt_normal:"Нормален",opt_relaxed:"Свободен",opt_bar:"Стълбовидна диаграма",opt_donut:"Кръгова диаграма",opt_tags:"Тагове",opt_scroll:"Лента за превъртане",opt_limit:"Ограничаване на елементи",opt_grid:"Решетка (Корици)",opt_list:"Списък (Редове)",opt_auto:"Авто (умен)",opt_user:"Моята оценка",opt_average:"Средна оценка",opt_top_right:"Горе вдясно",opt_top_left:"Горе вляво",opt_bottom_right:"Долу вдясно",opt_bottom_left:"Долу вляво",opt_inline:"В реда",opt_none_pos:"Скрит",opt_small_quality:"Малък (бърз)",opt_medium_quality:"Среден",opt_large_quality:"Голям / HD",status_current:"Текущ",status_planning:"Планиран",status_completed:"Завършен",status_paused:"На пауза",status_dropped:"Изоставен",status_repeating:"Повторение",hdr_airing:"Настройки на ефир",hdr_watchlist:"Настройки на списък за гледане",hdr_season:"Настройки на сезон",hdr_profile:"Настройки на профил",hdr_manga:"Настройки на манга",hdr_status_tabs:"Раздели за статус",hdr_filters:"Филтри",lbl_max_items:"Макс. елементи",lbl_sort_by:"Сортиране по",lbl_show_countdown:"Показване на обратно броене",lbl_countdown_format:"Формат на обратно броене",lbl_show_badges:"Показване на значки за статус",lbl_show_duration:"Показване на продължителност на епизод",lbl_show_genres:"Показване на жанрове",lbl_show_average_score:"Показване на средна оценка",lbl_show_format_badge:"Показване на значка за формат (TV/Филм)",lbl_layout:"Оформление",lbl_show_next_airing:"Показване на обратно броене за следващ епизод",lbl_max_items_limit:"Макс. елементи (режим на лимит)",lbl_overflow_mode:"Поведение при препълване",lbl_scroll_height:"Височина на превъртане (px)",lbl_show_progress:"Показване на прогрес",lbl_show_progress_bar:"Показване на лента за прогрес",lbl_show_status_tabs:"Показване на раздели за статус",lbl_visible_statuses:"Видими статуси",lbl_genre_filter:"Филтър по жанр (разделени със запетая)",lbl_format_filter:"Филтър по формат (разделени със запетая)",placeholder_genre:"напр. Action, Romance",placeholder_format:"напр. TV, MOVIE, OVA",lbl_show_avatar:"Показване на аватар",lbl_show_username:"Показване на потребителско име",lbl_show_anime_stats:"Показване на аниме статистики",lbl_show_manga_stats:"Показване на манга статистики",lbl_show_genre_chart:"Показване на диаграма за жанрове",lbl_chart_type:"Тип диаграма за жанрове",lbl_show_favourites:"Показване на любими",lbl_accent_color:"Цвят на акцент",lbl_secondary_color:"Вторичен цвят",lbl_card_background:"Фон на карта",lbl_card_opacity:"Прозрачност на карта",lbl_border_color:"Цвят на рамка",lbl_border_width:"Ширина на рамка (px)",lbl_border_radius:"Радиус на рамка (px)"}},ue=["airing","watchlist","season","profile","manga"],ge=["small","medium","large"],be=["relative","absolute","both"],me=["anilist","none"],ve=["time","title","score"],fe=["compact","normal","relaxed"],we=["bar","donut","tags"],ye=["scroll","limit"],ke=["grid","list"],xe=["auto","user","average"],$e=["top-right","top-left","bottom-right","bottom-left","inline","none"],ze=["small","medium","large"],Ae=["CURRENT","PLANNING","COMPLETED","PAUSED","DROPPED","REPEATING"],Se={airing:"view_airing",watchlist:"view_watchlist",season:"view_season",profile:"view_profile",manga:"view_manga",small:"opt_small",medium:"opt_medium",large:"opt_large",relative:"opt_relative",absolute:"opt_absolute",both:"opt_both",anilist:"opt_anilist",none_link:"opt_none_link",time:"opt_time",title:"opt_title",score:"opt_score",compact:"opt_compact",normal:"opt_normal",relaxed:"opt_relaxed",bar:"opt_bar",donut:"opt_donut",tags:"opt_tags",scroll:"opt_scroll",limit:"opt_limit",grid:"opt_grid",list:"opt_list",auto:"opt_auto",user:"opt_user",average:"opt_average","top-right":"opt_top_right","top-left":"opt_top_left","bottom-right":"opt_bottom_right","bottom-left":"opt_bottom_left",inline:"opt_inline",none_pos:"opt_none_pos",small_quality:"opt_small_quality",medium_quality:"opt_medium_quality",large_quality:"opt_large_quality",CURRENT:"status_current",PLANNING:"status_planning",COMPLETED:"status_completed",PAUSED:"status_paused",DROPPED:"status_dropped",REPEATING:"status_repeating"};class Pe extends re{constructor(){super(...arguments),this._tab="general"}setConfig(e){this._config={...e}}_t(e){var t,o;const a=(null===(o=null===(t=this.hass)||void 0===t?void 0:t.language)||void 0===o?void 0:o.substring(0,2))||"en";return(he[a]||he.en)[e]||he.en[e]||e}_viewOptions(){return ue.map(e=>({value:e,label:this._t(`view_${e}`)}))}_coverSizeOptions(){return ge.map(e=>({value:e,label:this._t(Se[e])}))}_countdownFormatOptions(){return be.map(e=>({value:e,label:this._t(Se[e])}))}_linkTargetOptions(){return me.map(e=>({value:e,label:this._t("none"===e?"opt_none_link":Se[e])}))}_sortOptions(){return ve.map(e=>({value:e,label:this._t(Se[e])}))}_paddingOptions(){return fe.map(e=>({value:e,label:this._t(Se[e])}))}_chartTypeOptions(){return we.map(e=>({value:e,label:this._t(Se[e])}))}_overflowModeOptions(){return ye.map(e=>({value:e,label:this._t(Se[e])}))}_layoutModeOptions(){return ke.map(e=>({value:e,label:this._t(Se[e])}))}_scoreSourceOptions(){return xe.map(e=>({value:e,label:this._t(Se[e])}))}_scorePositionOptions(){return $e.map(e=>({value:e,label:this._t("none"===e?"opt_none_pos":Se[e])}))}_coverQualityOptions(){return ze.map(e=>({value:e,label:this._t(Se[`${e}_quality`])}))}_statusOptions(){return Ae.map(e=>({value:e,label:this._t(Se[e])}))}_dispatch(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_set(e,t){this._config={...this._config,[e]:t},this._dispatch()}_val(e){return this._config[e]}render(){return this._config?q`
      <div class="editor">
        <div class="tabs">
          ${["general","view","colors"].map(e=>q`
              <button
                class="tab ${this._tab===e?"active":""}"
                @click=${()=>{this._tab=e}}
              >${this._tabLabel(e)}</button>
            `)}
        </div>
        <div class="tab-content">
          ${"general"===this._tab?this._renderGeneral():B}
          ${"view"===this._tab?this._renderViewSettings():B}
          ${"colors"===this._tab?this._renderColors():B}
        </div>
      </div>
    `:B}_tabLabel(e){var t;const o=null!==(t=this._config.view)&&void 0!==t?t:"airing",a=this._t(`view_${o}`);return{general:this._t("tab_general"),view:a,colors:this._t("tab_colors")}[e]}_renderGeneral(){return q`
      <div class="section">
        ${this._select("view",this._t("lbl_view"),this._viewOptions())}
        ${this._text("title",this._t("lbl_title"))}
        ${this._text("entry_id",this._t("lbl_entry_id"))}
        ${this._select("card_padding",this._t("lbl_card_padding"),this._paddingOptions())}
        ${this._select("link_target",this._t("lbl_link_target"),this._linkTargetOptions())}
        ${this._toggle("show_cover",this._t("lbl_show_cover"))}
        ${!1!==this._config.show_cover?this._select("cover_size",this._t("lbl_cover_size"),this._coverSizeOptions()):B}
        ${this._select("cover_quality",this._t("lbl_cover_quality"),this._coverQualityOptions())}
        ${this._select("score_position",this._t("lbl_score_position"),this._scorePositionOptions())}
        ${this._select("score_source",this._t("lbl_score_source"),this._scoreSourceOptions())}
        ${this._number("visible_items",this._t("lbl_visible_items"),1,50)}
        ${this._config.visible_items?this._toggle("scroll_snap",this._t("lbl_scroll_snap")):B}
        ${this._config.visible_items?this._toggle("scroll_fade",this._t("lbl_scroll_fade")):B}
        ${this._toggle("show_search",this._t("lbl_show_search"))}
        ${this._toggle("show_tooltips",this._t("lbl_show_tooltips"))}
      </div>
    `}_renderViewSettings(){var e;switch(null!==(e=this._config.view)&&void 0!==e?e:"airing"){case"airing":return this._renderAiringSettings();case"watchlist":return this._renderWatchlistSettings();case"season":return this._renderSeasonSettings();case"profile":return this._renderProfileSettings();case"manga":return this._renderMangaSettings();default:return B}}_renderAiringSettings(){return q`
      <div class="section">
        <div class="section-header">${this._t("hdr_airing")}</div>
        ${this._number("max_airing",this._t("lbl_max_items"),1,50)}
        ${this._select("sort_by",this._t("lbl_sort_by"),this._sortOptions())}
        ${this._toggle("show_countdown",this._t("lbl_show_countdown"))}
        ${!1!==this._config.show_countdown?this._select("countdown_format",this._t("lbl_countdown_format"),this._countdownFormatOptions()):B}
        ${this._toggle("show_badges",this._t("lbl_show_badges"))}
        ${this._toggle("show_duration",this._t("lbl_show_duration"))}
        ${this._toggle("show_genres",this._t("lbl_show_genres"))}
        ${this._toggle("show_average_score",this._t("lbl_show_average_score"))}
        ${this._toggle("show_format_badge",this._t("lbl_show_format_badge"))}
        ${this._select("layout_mode",this._t("lbl_layout"),this._layoutModeOptions())}
      </div>
    `}_renderWatchlistSettings(){const e=this._statusOptions();return q`
      <div class="section">
        <div class="section-header">${this._t("hdr_watchlist")}</div>
        ${this._select("layout_mode",this._t("lbl_layout"),this._layoutModeOptions())}
        ${this._toggle("show_next_airing",this._t("lbl_show_next_airing"))}
        ${this._number("max_watchlist",this._t("lbl_max_items_limit"),1,50)}
        ${this._select("overflow_mode",this._t("lbl_overflow_mode"),this._overflowModeOptions())}
        ${"scroll"===this._config.overflow_mode?this._number("scroll_height",this._t("lbl_scroll_height"),100,1e3):B}
        ${this._toggle("show_progress",this._t("lbl_show_progress"))}
        ${!1!==this._config.show_progress?this._toggle("show_progress_bar",this._t("lbl_show_progress_bar")):B}

        <div class="section-header">${this._t("hdr_status_tabs")}</div>
        ${this._toggle("show_status_tabs",this._t("lbl_show_status_tabs"))}
        <label class="field-label">${this._t("lbl_visible_statuses")}</label>
        <div class="checkbox-group">
          ${e.map(e=>{var t;return q`
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${(null!==(t=this._config.watchlist_statuses)&&void 0!==t?t:["CURRENT"]).includes(e.value)}
                @change=${t=>{var o;const a=t.target.checked,s=[...null!==(o=this._config.watchlist_statuses)&&void 0!==o?o:["CURRENT"]];if(a&&!s.includes(e.value))s.push(e.value);else if(!a){const t=s.indexOf(e.value);t>=0&&s.splice(t,1)}this._set("watchlist_statuses",s)}}
              />
              ${e.label}
            </label>
          `})}
        </div>
      </div>
    `}_renderSeasonSettings(){var e,t;return q`
      <div class="section">
        <div class="section-header">${this._t("hdr_season")}</div>
        ${this._select("layout_mode",this._t("lbl_layout"),this._layoutModeOptions())}
        ${this._number("max_season",this._t("lbl_max_items"),1,50)}
        <div class="section-header">${this._t("hdr_filters")}</div>
        <label class="field-label">${this._t("lbl_genre_filter")}</label>
        <input
          class="text-input"
          type="text"
          .value=${(null!==(e=this._config.genre_filter)&&void 0!==e?e:[]).join(", ")}
          @change=${e=>{const t=e.target.value;this._set("genre_filter",t?t.split(",").map(e=>e.trim()).filter(Boolean):[])}}
          placeholder=${this._t("placeholder_genre")}
        />
        <label class="field-label">${this._t("lbl_format_filter")}</label>
        <input
          class="text-input"
          type="text"
          .value=${(null!==(t=this._config.format_filter)&&void 0!==t?t:[]).join(", ")}
          @change=${e=>{const t=e.target.value;this._set("format_filter",t?t.split(",").map(e=>e.trim()).filter(Boolean):[])}}
          placeholder=${this._t("placeholder_format")}
        />
      </div>
    `}_renderProfileSettings(){return q`
      <div class="section">
        <div class="section-header">${this._t("hdr_profile")}</div>
        ${this._toggle("show_avatar",this._t("lbl_show_avatar"))}
        ${this._toggle("show_username",this._t("lbl_show_username"))}
        ${this._toggle("show_anime_stats",this._t("lbl_show_anime_stats"))}
        ${this._toggle("show_manga_stats",this._t("lbl_show_manga_stats"))}
        ${this._toggle("show_genre_chart",this._t("lbl_show_genre_chart"))}
        ${!1!==this._config.show_genre_chart?this._select("chart_type",this._t("lbl_chart_type"),this._chartTypeOptions()):B}
        ${this._toggle("show_favourites",this._t("lbl_show_favourites"))}
      </div>
    `}_renderMangaSettings(){const e=this._statusOptions();return q`
      <div class="section">
        <div class="section-header">${this._t("hdr_manga")}</div>
        ${this._select("layout_mode",this._t("lbl_layout"),this._layoutModeOptions())}
        ${this._number("max_manga",this._t("lbl_max_items_limit"),1,50)}
        ${this._select("overflow_mode",this._t("lbl_overflow_mode"),this._overflowModeOptions())}
        ${"scroll"===this._config.overflow_mode?this._number("scroll_height",this._t("lbl_scroll_height"),100,1e3):B}
        ${this._toggle("show_progress",this._t("lbl_show_progress"))}
        ${!1!==this._config.show_progress?this._toggle("show_progress_bar",this._t("lbl_show_progress_bar")):B}

        <div class="section-header">${this._t("hdr_status_tabs")}</div>
        ${this._toggle("show_status_tabs",this._t("lbl_show_status_tabs"))}
        <label class="field-label">${this._t("lbl_visible_statuses")}</label>
        <div class="checkbox-group">
          ${e.map(e=>{var t;return q`
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${(null!==(t=this._config.watchlist_statuses)&&void 0!==t?t:["CURRENT"]).includes(e.value)}
                @change=${t=>{var o;const a=t.target.checked,s=[...null!==(o=this._config.watchlist_statuses)&&void 0!==o?o:["CURRENT"]];if(a&&!s.includes(e.value))s.push(e.value);else if(!a){const t=s.indexOf(e.value);t>=0&&s.splice(t,1)}this._set("watchlist_statuses",s)}}
              />
              ${e.label}
            </label>
          `})}
        </div>
      </div>
    `}_renderColors(){return q`
      <div class="section">
        ${this._color("accent_color",this._t("lbl_accent_color"))}
        ${this._color("secondary_color",this._t("lbl_secondary_color"))}
        ${this._color("card_background",this._t("lbl_card_background"))}
        ${this._slider("card_opacity",this._t("lbl_card_opacity"),0,100)}
        ${this._color("border_color",this._t("lbl_border_color"))}
        ${this._number("border_width",this._t("lbl_border_width"),0,10)}
        ${this._number("border_radius",this._t("lbl_border_radius"),0,30)}
      </div>
    `}_select(e,t,o){var a,s;return q`
      <div class="field">
        <label class="field-label">${t}</label>
        <select
          class="select-input"
          .value=${String(null!==(a=this._val(e))&&void 0!==a?a:null===(s=o[0])||void 0===s?void 0:s.value)}
          @change=${t=>this._set(e,t.target.value)}
        >
          ${o.map(t=>q`
            <option value=${t.value} ?selected=${this._val(e)===t.value}>${t.label}</option>
          `)}
        </select>
      </div>
    `}_text(e,t){var o;return q`
      <div class="field">
        <label class="field-label">${t}</label>
        <input
          class="text-input"
          type="text"
          .value=${String(null!==(o=this._val(e))&&void 0!==o?o:"")}
          @change=${t=>{const o=t.target.value;this._set(e,o||void 0)}}
        />
      </div>
    `}_number(e,t,o,a){var s;return q`
      <div class="field">
        <label class="field-label">${t}</label>
        <input
          class="text-input"
          type="number"
          min=${o}
          max=${a}
          .value=${String(null!==(s=this._val(e))&&void 0!==s?s:"")}
          @change=${t=>{const o=t.target.value;this._set(e,o?Number(o):void 0)}}
        />
      </div>
    `}_toggle(e,t){return q`
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
    `}_color(e,t){var o,a;return q`
      <div class="field color-field">
        <label class="field-label">${t}</label>
        <div class="color-input-wrap">
          <input
            type="color"
            class="color-picker"
            .value=${String(null!==(o=this._val(e))&&void 0!==o?o:"#3DB4F2")}
            @input=${t=>this._set(e,t.target.value)}
          />
          <input
            class="text-input color-text"
            type="text"
            .value=${String(null!==(a=this._val(e))&&void 0!==a?a:"")}
            @change=${t=>{const o=t.target.value;this._set(e,o||void 0)}}
            placeholder="auto"
          />
        </div>
      </div>
    `}_slider(e,t,o,a){var s;const i=Number(null!==(s=this._val(e))&&void 0!==s?s:a);return q`
      <div class="field">
        <label class="field-label">${t}: ${i}</label>
        <input
          type="range"
          class="range-input"
          min=${o}
          max=${a}
          .value=${String(i)}
          @input=${t=>this._set(e,Number(t.target.value))}
        />
      </div>
    `}}Pe.styles=l`
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
  `,e([pe({attribute:!1})],Pe.prototype,"hass",void 0),e([ce()],Pe.prototype,"_config",void 0),e([ce()],Pe.prototype,"_tab",void 0),customElements.define("anilist-card-editor",Pe);const Me={en:{next_episodes:"Next Episodes",watching:"Currently Watching",this_season:"This Season",profile:"AniList Profile",manga:"Manga Reading",no_episodes:"No episodes in the coming days.",no_watchlist:"No anime in the watchlist.",no_season:"No season data available.",no_profile:"No profile stats available.",no_manga:"No manga in the list.",auth_only:"Only for logged-in users.",episode:"Episode",ep:"Ep.",aired:"Aired",anime:"Anime",episodes:"Episodes",hours:"Hours",score_avg:"Avg Score",watching_now:"Watching",chapters:"Chapters",volumes:"Volumes",manga_count:"Manga",manga_score:"Manga Score",top_genres:"Top Genres",favourites:"Favourites",search_placeholder:"Search...",current:"Current",planning:"Planning",completed:"Completed",paused:"Paused",dropped:"Dropped",repeating:"Repeating",next_season_label:"Next Season",airing:"Airing",min:"min",ch:"Ch.",vol:"Vol."},de:{next_episodes:"Nächste Episoden",watching:"Schaue ich gerade",this_season:"Diese Season",profile:"AniList Profil",manga:"Manga Leseliste",no_episodes:"Keine Episoden in den nächsten Tagen.",no_watchlist:"Keine Anime in der Watchlist.",no_season:"Keine Season-Daten verfügbar.",no_profile:"Keine Profil-Statistiken verfügbar.",no_manga:"Keine Manga in der Liste.",auth_only:"Nur für eingeloggte Nutzer.",episode:"Episode",ep:"Ep.",aired:"Ausgestrahlt",anime:"Anime",episodes:"Episoden",hours:"Stunden",score_avg:"Ø Score",watching_now:"Schaue ich",chapters:"Kapitel",volumes:"Bände",manga_count:"Manga",manga_score:"Manga Score",top_genres:"Top Genres",favourites:"Favoriten",search_placeholder:"Suchen...",current:"Aktuell",planning:"Geplant",completed:"Abgeschlossen",paused:"Pausiert",dropped:"Abgebrochen",repeating:"Wiederholen",next_season_label:"Nächste Season",airing:"Läuft",min:"Min.",ch:"Kap.",vol:"Bd."},ja:{next_episodes:"次のエピソード",watching:"視聴中",this_season:"今期",profile:"AniListプロフィール",manga:"読書中",no_episodes:"今後のエピソードはありません。",no_watchlist:"ウォッチリストにアニメがありません。",no_season:"シーズンデータがありません。",no_profile:"プロフィール統計がありません。",no_manga:"リストにマンガがありません。",auth_only:"ログインユーザーのみ。",episode:"エピソード",ep:"話",aired:"放送済み",anime:"アニメ",episodes:"エピソード",hours:"時間",score_avg:"平均スコア",watching_now:"視聴中",chapters:"章",volumes:"巻",manga_count:"マンガ",manga_score:"マンガスコア",top_genres:"トップジャンル",favourites:"お気に入り",search_placeholder:"検索...",current:"視聴中",planning:"予定",completed:"完了",paused:"一時停止",dropped:"中断",repeating:"リピート",next_season_label:"来期",airing:"放送中",min:"分",ch:"話",vol:"巻"},es:{next_episodes:"Próximos episodios",watching:"Viendo actualmente",this_season:"Esta temporada",profile:"Perfil de AniList",manga:"Lectura de Manga",no_episodes:"No hay episodios en los próximos días.",no_watchlist:"No hay anime en la lista.",no_season:"No hay datos de temporada disponibles.",no_profile:"No hay estadísticas de perfil disponibles.",no_manga:"No hay manga en la lista.",auth_only:"Solo para usuarios registrados.",episode:"Episodio",ep:"Ep.",aired:"Emitido",anime:"Anime",episodes:"Episodios",hours:"Horas",score_avg:"Puntuación media",watching_now:"Viendo",chapters:"Capítulos",volumes:"Volúmenes",manga_count:"Manga",manga_score:"Puntuación Manga",top_genres:"Géneros principales",favourites:"Favoritos",search_placeholder:"Buscar...",current:"Actual",planning:"Planeado",completed:"Completado",paused:"Pausado",dropped:"Abandonado",repeating:"Repitiendo",next_season_label:"Próxima temporada",airing:"En emisión",min:"min",ch:"Cap.",vol:"Vol."},fr:{next_episodes:"Prochains épisodes",watching:"En cours de visionnage",this_season:"Cette saison",profile:"Profil AniList",manga:"Lecture Manga",no_episodes:"Aucun épisode dans les prochains jours.",no_watchlist:"Aucun anime dans la liste.",no_season:"Aucune donnée de saison disponible.",no_profile:"Aucune statistique de profil disponible.",no_manga:"Aucun manga dans la liste.",auth_only:"Réservé aux utilisateurs connectés.",episode:"Épisode",ep:"Ép.",aired:"Diffusé",anime:"Anime",episodes:"Épisodes",hours:"Heures",score_avg:"Score moyen",watching_now:"En cours",chapters:"Chapitres",volumes:"Volumes",manga_count:"Manga",manga_score:"Score Manga",top_genres:"Genres principaux",favourites:"Favoris",search_placeholder:"Rechercher...",current:"En cours",planning:"Planifié",completed:"Terminé",paused:"En pause",dropped:"Abandonné",repeating:"En reprise",next_season_label:"Prochaine saison",airing:"En diffusion",min:"min",ch:"Ch.",vol:"Vol."},it:{next_episodes:"Prossimi episodi",watching:"In visione",this_season:"Questa stagione",profile:"Profilo AniList",manga:"Lettura Manga",no_episodes:"Nessun episodio nei prossimi giorni.",no_watchlist:"Nessun anime nella lista.",no_season:"Nessun dato stagionale disponibile.",no_profile:"Nessuna statistica del profilo disponibile.",no_manga:"Nessun manga nella lista.",auth_only:"Solo per utenti registrati.",episode:"Episodio",ep:"Ep.",aired:"Trasmesso",anime:"Anime",episodes:"Episodi",hours:"Ore",score_avg:"Punteggio medio",watching_now:"In visione",chapters:"Capitoli",volumes:"Volumi",manga_count:"Manga",manga_score:"Punteggio Manga",top_genres:"Generi principali",favourites:"Preferiti",search_placeholder:"Cerca...",current:"In corso",planning:"Pianificato",completed:"Completato",paused:"In pausa",dropped:"Abbandonato",repeating:"In ripetizione",next_season_label:"Prossima stagione",airing:"In onda",min:"min",ch:"Cap.",vol:"Vol."},pt:{next_episodes:"Próximos episódios",watching:"Assistindo atualmente",this_season:"Esta temporada",profile:"Perfil AniList",manga:"Leitura de Manga",no_episodes:"Nenhum episódio nos próximos dias.",no_watchlist:"Nenhum anime na lista.",no_season:"Nenhum dado de temporada disponível.",no_profile:"Nenhuma estatística de perfil disponível.",no_manga:"Nenhum manga na lista.",auth_only:"Apenas para utilizadores autenticados.",episode:"Episódio",ep:"Ep.",aired:"Exibido",anime:"Anime",episodes:"Episódios",hours:"Horas",score_avg:"Pontuação média",watching_now:"A ver",chapters:"Capítulos",volumes:"Volumes",manga_count:"Manga",manga_score:"Pontuação Manga",top_genres:"Géneros principais",favourites:"Favoritos",search_placeholder:"Pesquisar...",current:"Atual",planning:"Planeado",completed:"Concluído",paused:"Pausado",dropped:"Abandonado",repeating:"A repetir",next_season_label:"Próxima temporada",airing:"Em exibição",min:"min",ch:"Cap.",vol:"Vol."},nl:{next_episodes:"Volgende afleveringen",watching:"Nu aan het kijken",this_season:"Dit seizoen",profile:"AniList Profiel",manga:"Manga leeslijst",no_episodes:"Geen afleveringen de komende dagen.",no_watchlist:"Geen anime in de kijklijst.",no_season:"Geen seizoensdata beschikbaar.",no_profile:"Geen profielstatistieken beschikbaar.",no_manga:"Geen manga in de lijst.",auth_only:"Alleen voor ingelogde gebruikers.",episode:"Aflevering",ep:"Afl.",aired:"Uitgezonden",anime:"Anime",episodes:"Afleveringen",hours:"Uren",score_avg:"Gem. score",watching_now:"Kijkend",chapters:"Hoofdstukken",volumes:"Volumes",manga_count:"Manga",manga_score:"Manga Score",top_genres:"Topgenres",favourites:"Favorieten",search_placeholder:"Zoeken...",current:"Huidig",planning:"Gepland",completed:"Voltooid",paused:"Gepauzeerd",dropped:"Gestopt",repeating:"Opnieuw",next_season_label:"Volgend seizoen",airing:"In uitzending",min:"min",ch:"Hfst.",vol:"Vol."},pl:{next_episodes:"Następne odcinki",watching:"Obecnie oglądam",this_season:"Ten sezon",profile:"Profil AniList",manga:"Czytanie Mangi",no_episodes:"Brak odcinków w najbliższych dniach.",no_watchlist:"Brak anime na liście.",no_season:"Brak danych o sezonie.",no_profile:"Brak statystyk profilu.",no_manga:"Brak mangi na liście.",auth_only:"Tylko dla zalogowanych użytkowników.",episode:"Odcinek",ep:"Odc.",aired:"Wyemitowano",anime:"Anime",episodes:"Odcinki",hours:"Godziny",score_avg:"Średnia ocena",watching_now:"Oglądam",chapters:"Rozdziały",volumes:"Tomy",manga_count:"Manga",manga_score:"Ocena Mangi",top_genres:"Popularne gatunki",favourites:"Ulubione",search_placeholder:"Szukaj...",current:"Bieżące",planning:"Planowane",completed:"Ukończone",paused:"Wstrzymane",dropped:"Porzucone",repeating:"Powtarzane",next_season_label:"Następny sezon",airing:"Emitowane",min:"min",ch:"Rozdz.",vol:"Tom"},sv:{next_episodes:"Nästa avsnitt",watching:"Tittar just nu",this_season:"Denna säsong",profile:"AniList-profil",manga:"Manga-läsning",no_episodes:"Inga avsnitt de kommande dagarna.",no_watchlist:"Ingen anime i listan.",no_season:"Ingen säsongsdata tillgänglig.",no_profile:"Ingen profilstatistik tillgänglig.",no_manga:"Ingen manga i listan.",auth_only:"Endast för inloggade användare.",episode:"Avsnitt",ep:"Avs.",aired:"Sänt",anime:"Anime",episodes:"Avsnitt",hours:"Timmar",score_avg:"Medelbetyg",watching_now:"Tittar",chapters:"Kapitel",volumes:"Volymer",manga_count:"Manga",manga_score:"Manga-betyg",top_genres:"Toppgenrer",favourites:"Favoriter",search_placeholder:"Sök...",current:"Pågående",planning:"Planerad",completed:"Avslutad",paused:"Pausad",dropped:"Avbruten",repeating:"Ompågående",next_season_label:"Nästa säsong",airing:"Sänds",min:"min",ch:"Kap.",vol:"Vol."},da:{next_episodes:"Næste episoder",watching:"Ser nu",this_season:"Denne sæson",profile:"AniList-profil",manga:"Manga-læsning",no_episodes:"Ingen episoder de kommende dage.",no_watchlist:"Ingen anime på listen.",no_season:"Ingen sæsondata tilgængelig.",no_profile:"Ingen profilstatistik tilgængelig.",no_manga:"Ingen manga på listen.",auth_only:"Kun for indloggede brugere.",episode:"Episode",ep:"Ep.",aired:"Sendt",anime:"Anime",episodes:"Episoder",hours:"Timer",score_avg:"Gns. score",watching_now:"Ser",chapters:"Kapitler",volumes:"Bind",manga_count:"Manga",manga_score:"Manga-score",top_genres:"Topgenrer",favourites:"Favoritter",search_placeholder:"Søg...",current:"Igangværende",planning:"Planlagt",completed:"Færdig",paused:"Sat på pause",dropped:"Droppet",repeating:"Gentager",next_season_label:"Næste sæson",airing:"Sendes",min:"min",ch:"Kap.",vol:"Bind"},nb:{next_episodes:"Neste episoder",watching:"Ser nå",this_season:"Denne sesongen",profile:"AniList-profil",manga:"Manga-lesing",no_episodes:"Ingen episoder de kommende dagene.",no_watchlist:"Ingen anime på listen.",no_season:"Ingen sesongdata tilgjengelig.",no_profile:"Ingen profilstatistikk tilgjengelig.",no_manga:"Ingen manga på listen.",auth_only:"Kun for innloggede brukere.",episode:"Episode",ep:"Ep.",aired:"Sendt",anime:"Anime",episodes:"Episoder",hours:"Timer",score_avg:"Gj.snitt",watching_now:"Ser",chapters:"Kapitler",volumes:"Bind",manga_count:"Manga",manga_score:"Manga-poeng",top_genres:"Toppsjangre",favourites:"Favoritter",search_placeholder:"Søk...",current:"Pågående",planning:"Planlagt",completed:"Fullført",paused:"Pauset",dropped:"Droppet",repeating:"Gjentar",next_season_label:"Neste sesong",airing:"Sendes",min:"min",ch:"Kap.",vol:"Bind"},fi:{next_episodes:"Seuraavat jaksot",watching:"Katselen parhaillaan",this_season:"Tämä kausi",profile:"AniList-profiili",manga:"Manga-lukeminen",no_episodes:"Ei jaksoja lähipäivinä.",no_watchlist:"Ei animea listalla.",no_season:"Ei kausitietoja saatavilla.",no_profile:"Ei profiilitilastoja saatavilla.",no_manga:"Ei mangaa listalla.",auth_only:"Vain kirjautuneille käyttäjille.",episode:"Jakso",ep:"Jakso",aired:"Esitetty",anime:"Anime",episodes:"Jaksot",hours:"Tunnit",score_avg:"Keskiarvo",watching_now:"Katselen",chapters:"Luvut",volumes:"Osat",manga_count:"Manga",manga_score:"Manga-arvosana",top_genres:"Suosituimmat lajityypit",favourites:"Suosikit",search_placeholder:"Hae...",current:"Käynnissä",planning:"Suunniteltu",completed:"Valmis",paused:"Tauolla",dropped:"Keskeytetty",repeating:"Uudelleen",next_season_label:"Seuraava kausi",airing:"Esitetään",min:"min",ch:"Luku",vol:"Osa"},cs:{next_episodes:"Další epizody",watching:"Právě sleduji",this_season:"Tato sezóna",profile:"Profil AniList",manga:"Čtení Mangy",no_episodes:"Žádné epizody v nejbližších dnech.",no_watchlist:"Žádné anime v seznamu.",no_season:"Žádná data o sezóně.",no_profile:"Žádné statistiky profilu.",no_manga:"Žádná manga v seznamu.",auth_only:"Pouze pro přihlášené uživatele.",episode:"Epizoda",ep:"Ep.",aired:"Odvysíláno",anime:"Anime",episodes:"Epizody",hours:"Hodiny",score_avg:"Prům. skóre",watching_now:"Sleduji",chapters:"Kapitoly",volumes:"Svazky",manga_count:"Manga",manga_score:"Skóre Mangy",top_genres:"Oblíbené žánry",favourites:"Oblíbené",search_placeholder:"Hledat...",current:"Aktuální",planning:"Plánované",completed:"Dokončené",paused:"Pozastavené",dropped:"Zahozené",repeating:"Opakované",next_season_label:"Další sezóna",airing:"Vysílá se",min:"min",ch:"Kap.",vol:"Sv."},ro:{next_episodes:"Următoarele episoade",watching:"Vizionez acum",this_season:"Acest sezon",profile:"Profil AniList",manga:"Lectură Manga",no_episodes:"Niciun episod în zilele următoare.",no_watchlist:"Niciun anime în listă.",no_season:"Nu sunt date de sezon disponibile.",no_profile:"Nu sunt statistici de profil disponibile.",no_manga:"Niciun manga în listă.",auth_only:"Doar pentru utilizatori autentificați.",episode:"Episod",ep:"Ep.",aired:"Difuzat",anime:"Anime",episodes:"Episoade",hours:"Ore",score_avg:"Scor mediu",watching_now:"Vizionez",chapters:"Capitole",volumes:"Volume",manga_count:"Manga",manga_score:"Scor Manga",top_genres:"Genuri populare",favourites:"Favorite",search_placeholder:"Caută...",current:"Curent",planning:"Planificat",completed:"Finalizat",paused:"Pauză",dropped:"Abandonat",repeating:"Repetat",next_season_label:"Sezonul următor",airing:"În difuzare",min:"min",ch:"Cap.",vol:"Vol."},hu:{next_episodes:"Következő epizódok",watching:"Jelenleg nézem",this_season:"Ez az évad",profile:"AniList Profil",manga:"Manga olvasás",no_episodes:"Nincs epizód a következő napokban.",no_watchlist:"Nincs anime a listán.",no_season:"Nincs elérhető évad adat.",no_profile:"Nincs elérhető profil statisztika.",no_manga:"Nincs manga a listán.",auth_only:"Csak bejelentkezett felhasználóknak.",episode:"Epizód",ep:"Ep.",aired:"Adásba került",anime:"Anime",episodes:"Epizódok",hours:"Órák",score_avg:"Átl. pontszám",watching_now:"Nézem",chapters:"Fejezetek",volumes:"Kötetek",manga_count:"Manga",manga_score:"Manga pontszám",top_genres:"Népszerű műfajok",favourites:"Kedvencek",search_placeholder:"Keresés...",current:"Folyamatban",planning:"Tervezett",completed:"Befejezett",paused:"Szüneteltetve",dropped:"Eldobva",repeating:"Újranézés",next_season_label:"Következő évad",airing:"Adásban",min:"perc",ch:"Fej.",vol:"Köt."},el:{next_episodes:"Επόμενα επεισόδια",watching:"Παρακολουθώ τώρα",this_season:"Αυτή η σεζόν",profile:"Προφίλ AniList",manga:"Ανάγνωση Manga",no_episodes:"Δεν υπάρχουν επεισόδια τις επόμενες μέρες.",no_watchlist:"Δεν υπάρχει anime στη λίστα.",no_season:"Δεν υπάρχουν δεδομένα σεζόν.",no_profile:"Δεν υπάρχουν στατιστικά προφίλ.",no_manga:"Δεν υπάρχει manga στη λίστα.",auth_only:"Μόνο για συνδεδεμένους χρήστες.",episode:"Επεισόδιο",ep:"Επ.",aired:"Προβλήθηκε",anime:"Anime",episodes:"Επεισόδια",hours:"Ώρες",score_avg:"Μέσος όρος",watching_now:"Παρακολουθώ",chapters:"Κεφάλαια",volumes:"Τόμοι",manga_count:"Manga",manga_score:"Βαθμολογία Manga",top_genres:"Κορυφαία είδη",favourites:"Αγαπημένα",search_placeholder:"Αναζήτηση...",current:"Τρέχον",planning:"Προγραμματισμένο",completed:"Ολοκληρωμένο",paused:"Σε παύση",dropped:"Εγκαταλελειμμένο",repeating:"Επανάληψη",next_season_label:"Επόμενη σεζόν",airing:"Σε μετάδοση",min:"λεπ.",ch:"Κεφ.",vol:"Τόμ."},tr:{next_episodes:"Sonraki bölümler",watching:"Şu an izleniyor",this_season:"Bu sezon",profile:"AniList Profili",manga:"Manga Okuma",no_episodes:"Önümüzdeki günlerde bölüm yok.",no_watchlist:"Listede anime yok.",no_season:"Sezon verisi mevcut değil.",no_profile:"Profil istatistiği mevcut değil.",no_manga:"Listede manga yok.",auth_only:"Sadece giriş yapan kullanıcılar için.",episode:"Bölüm",ep:"Böl.",aired:"Yayınlandı",anime:"Anime",episodes:"Bölümler",hours:"Saat",score_avg:"Ort. puan",watching_now:"İzleniyor",chapters:"Bölümler",volumes:"Ciltler",manga_count:"Manga",manga_score:"Manga Puanı",top_genres:"Popüler türler",favourites:"Favoriler",search_placeholder:"Ara...",current:"Devam eden",planning:"Planlanan",completed:"Tamamlanan",paused:"Duraklatılan",dropped:"Bırakılan",repeating:"Tekrar edilen",next_season_label:"Sonraki sezon",airing:"Yayında",min:"dk",ch:"Böl.",vol:"Cilt"},uk:{next_episodes:"Наступні епізоди",watching:"Зараз дивлюсь",this_season:"Цей сезон",profile:"Профіль AniList",manga:"Читання Манги",no_episodes:"Немає епізодів найближчими днями.",no_watchlist:"Немає аніме у списку.",no_season:"Немає даних про сезон.",no_profile:"Немає статистики профілю.",no_manga:"Немає манги у списку.",auth_only:"Лише для авторизованих користувачів.",episode:"Епізод",ep:"Еп.",aired:"Вийшов",anime:"Аніме",episodes:"Епізоди",hours:"Години",score_avg:"Сер. оцінка",watching_now:"Дивлюсь",chapters:"Розділи",volumes:"Томи",manga_count:"Манга",manga_score:"Оцінка Манги",top_genres:"Топ жанри",favourites:"Обране",search_placeholder:"Пошук...",current:"Поточне",planning:"Заплановане",completed:"Завершене",paused:"Призупинене",dropped:"Закинуте",repeating:"Повторюю",next_season_label:"Наступний сезон",airing:"В ефірі",min:"хв",ch:"Розд.",vol:"Том"},ru:{next_episodes:"Следующие эпизоды",watching:"Сейчас смотрю",this_season:"Этот сезон",profile:"Профиль AniList",manga:"Чтение Манги",no_episodes:"Нет эпизодов в ближайшие дни.",no_watchlist:"Нет аниме в списке.",no_season:"Нет данных о сезоне.",no_profile:"Нет статистики профиля.",no_manga:"Нет манги в списке.",auth_only:"Только для авторизованных пользователей.",episode:"Эпизод",ep:"Эп.",aired:"Вышел",anime:"Аниме",episodes:"Эпизоды",hours:"Часы",score_avg:"Ср. оценка",watching_now:"Смотрю",chapters:"Главы",volumes:"Тома",manga_count:"Манга",manga_score:"Оценка Манги",top_genres:"Топ жанры",favourites:"Избранное",search_placeholder:"Поиск...",current:"Текущее",planning:"Запланировано",completed:"Завершено",paused:"На паузе",dropped:"Брошено",repeating:"Пересматриваю",next_season_label:"Следующий сезон",airing:"В эфире",min:"мин",ch:"Гл.",vol:"Том"},sk:{next_episodes:"Ďalšie epizódy",watching:"Práve sledujem",this_season:"Táto sezóna",profile:"Profil AniList",manga:"Čítanie Mangy",no_episodes:"Žiadne epizódy v najbližších dňoch.",no_watchlist:"Žiadne anime v zozname.",no_season:"Žiadne údaje o sezóne.",no_profile:"Žiadne štatistiky profilu.",no_manga:"Žiadna manga v zozname.",auth_only:"Iba pre prihlásených používateľov.",episode:"Epizóda",ep:"Ep.",aired:"Odvysielané",anime:"Anime",episodes:"Epizódy",hours:"Hodiny",score_avg:"Priem. skóre",watching_now:"Sledujem",chapters:"Kapitoly",volumes:"Zväzky",manga_count:"Manga",manga_score:"Skóre Mangy",top_genres:"Obľúbené žánre",favourites:"Obľúbené",search_placeholder:"Hľadať...",current:"Aktuálne",planning:"Plánované",completed:"Dokončené",paused:"Pozastavené",dropped:"Zahodené",repeating:"Opakované",next_season_label:"Ďalšia sezóna",airing:"Vysiela sa",min:"min",ch:"Kap.",vol:"Zv."},hr:{next_episodes:"Sljedeće epizode",watching:"Trenutno gledam",this_season:"Ova sezona",profile:"AniList Profil",manga:"Čitanje Mange",no_episodes:"Nema epizoda u sljedećim danima.",no_watchlist:"Nema animea na popisu.",no_season:"Nema podataka o sezoni.",no_profile:"Nema statistike profila.",no_manga:"Nema mange na popisu.",auth_only:"Samo za prijavljene korisnike.",episode:"Epizoda",ep:"Ep.",aired:"Emitirano",anime:"Anime",episodes:"Epizode",hours:"Sati",score_avg:"Prosj. ocjena",watching_now:"Gledam",chapters:"Poglavlja",volumes:"Svesci",manga_count:"Manga",manga_score:"Ocjena Mange",top_genres:"Popularni žanrovi",favourites:"Favoriti",search_placeholder:"Traži...",current:"Trenutno",planning:"Planirano",completed:"Završeno",paused:"Pauzirano",dropped:"Napušteno",repeating:"Ponavlja se",next_season_label:"Sljedeća sezona",airing:"Emitira se",min:"min",ch:"Pogl.",vol:"Sv."},bg:{next_episodes:"Следващи епизоди",watching:"Гледам в момента",this_season:"Този сезон",profile:"Профил в AniList",manga:"Четене на Манга",no_episodes:"Няма епизоди в следващите дни.",no_watchlist:"Няма аниме в списъка.",no_season:"Няма налични данни за сезона.",no_profile:"Няма налична статистика на профила.",no_manga:"Няма манга в списъка.",auth_only:"Само за влезли потребители.",episode:"Епизод",ep:"Еп.",aired:"Излъчен",anime:"Аниме",episodes:"Епизоди",hours:"Часове",score_avg:"Ср. оценка",watching_now:"Гледам",chapters:"Глави",volumes:"Томове",manga_count:"Манга",manga_score:"Оценка на Манга",top_genres:"Топ жанрове",favourites:"Любими",search_placeholder:"Търсене...",current:"Текущо",planning:"Планирано",completed:"Завършено",paused:"На пауза",dropped:"Изоставено",repeating:"Повторение",next_season_label:"Следващ сезон",airing:"В ефир",min:"мин",ch:"Гл.",vol:"Том"}};function Ee(e,t,o){const a="number"==typeof e?1e3*e:new Date(e).getTime(),s=a-Date.now();if(s<=0)return(Me[o]||Me.en).aired;const i=Math.floor(s/36e5),l=Math.floor(s%36e5/6e4),r=i>=24?`${Math.floor(i/24)}d ${i%24}h`:i>0?`${i}h ${l}m`:`${l}m`,n=new Date(a).toLocaleString(o,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return"absolute"===t?n:"both"===t?`${r} (${n})`:r}function je(e,t){var o,a;return null!==(a=null===(o=e.states[t])||void 0===o?void 0:o.state)&&void 0!==a?a:""}function Ve(e){return e?(e/10).toFixed(1).replace(/\.0$/,""):""}function Te(e,t){return e&&"none"!==t?"inline"===t?B:q`<span class="score-overlay ${t}">★${Ve(e)}</span>`:B}function Ce(e,t){return e&&"inline"===t?q`<span class="score-inline">★${Ve(e)}</span>`:B}class Oe extends re{constructor(){super(...arguments),this._activeTab="CURRENT",this._searchQuery="",this._wsAiring=null,this._wsWatchlist=null,this._wsSeason=null,this._wsManga=null,this._wsProfile=null,this._wsLoading=!1,this._lastSensorHash="",this._wsLoadedViews=new Set,this._wsLoadPromise=null,this._wsInitDone=!1}static getConfigElement(){return document.createElement("anilist-card-editor")}static getStubConfig(){return{type:"custom:anilist-card",view:"airing",max_items:5}}setConfig(e){if(!e)throw new Error("Invalid config");this._config={view:"airing",max_items:5,show_cover:!0,cover_size:"medium",show_countdown:!0,countdown_format:"relative",show_progress:!0,show_progress_bar:!0,show_badges:!0,show_search:!1,show_tooltips:!1,link_target:"anilist",sort_by:"time",card_padding:"normal",show_duration:!1,show_genres:!1,show_average_score:!1,show_format_badge:!1,watchlist_statuses:["CURRENT","PLANNING","COMPLETED","PAUSED","DROPPED"],show_status_tabs:!0,genre_filter:[],format_filter:[],chart_type:"bar",overflow_mode:"scroll",scroll_height:400,show_avatar:!0,show_username:!0,show_anime_stats:!0,show_manga_stats:!0,show_genre_chart:!0,show_favourites:!0,link_to_anilist:!0,...e},!1!==e.link_to_anilist||e.link_target||(this._config.link_target="none")}connectedCallback(){super.connectedCallback(),this._tick=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tick),this._wsInitDone=!1}updated(e){var t;if(super.updated(e),!e.has("hass")||!(null===(t=this.hass)||void 0===t?void 0:t.callWS))return;if(!this._wsInitDone)return this._wsInitDone=!0,this._lastSensorHash=this._sensorHash(),void this._triggerWSLoad();const o=this._sensorHash();o!==this._lastSensorHash&&(this._lastSensorHash=o,this._wsLoadedViews.clear(),this._triggerWSLoad())}_sensorHash(){var e,t;let o="";for(const[a,s]of Object.entries(null!==(t=null===(e=this.hass)||void 0===e?void 0:e.states)&&void 0!==t?t:{}))a.startsWith("sensor.anilist_")&&(o+=`${a}:${s.state};`);return o}_triggerWSLoad(){var e,t;if(this._wsLoadPromise)return;const o=null!==(t=null===(e=this._config)||void 0===e?void 0:e.view)&&void 0!==t?t:"airing";this._wsLoadPromise=this._loadViewData(o).then(()=>{this._wsLoadedViews.add(o),this._wsLoadPromise=null}).catch(()=>{this._wsLoadPromise=null})}async _loadViewData(e){var t;if(null===(t=this.hass)||void 0===t?void 0:t.callWS){this._wsLoading=!0;try{const t=this._config.entry_id;if("airing"===e){const e=await this.hass.callWS({type:"anilist/airing_schedule",...t?{entry_id:t}:{}});this._wsAiring=e.items}else if("watchlist"===e){const e=await this.hass.callWS({type:"anilist/watchlist",...t?{entry_id:t}:{}});this._wsWatchlist=e.items}else if("season"===e){const e=await this.hass.callWS({type:"anilist/season",...t?{entry_id:t}:{}});this._wsSeason=e.items}else if("manga"===e){const e=await this.hass.callWS({type:"anilist/manga",...t?{entry_id:t}:{}});this._wsManga=e.items}else"profile"===e&&(this._wsProfile=await this.hass.callWS({type:"anilist/profile",...t?{entry_id:t}:{}}))}catch(t){"airing"===e?this._wsAiring=null:"season"===e&&(this._wsSeason=null),"watchlist"===e?(this._wsWatchlist=[],this._wsLoadedViews.add(e)):"manga"===e?(this._wsManga=[],this._wsLoadedViews.add(e)):"profile"===e&&(this._wsProfile=null,this._wsLoadedViews.add(e))}finally{this._wsLoading=!1}}}_title(e){return function(e,t="romaji"){return e?"string"==typeof e?e:e[t]||e.romaji||e.english||e.native||"Unknown":"Unknown"}(e,this._lang())}_coverUrl(e){var t;const o=null!==(t=this._config.cover_quality)&&void 0!==t?t:"large";return e.cover_images?e.cover_images[o]||e.cover_images.medium||e.cover_images.small:e.cover_image}_scorePos(){var e;return null!==(e=this._config.score_position)&&void 0!==e?e:"top-right"}_pickScore(e,t){var o;const a=null!==(o=this._config.score_source)&&void 0!==o?o:"auto";return"user"===a?e.score||void 0:"average"===a||"airing"===t||"season"===t?e.average_score||void 0:e.score&&e.score>0?e.score:e.average_score||void 0}_layoutMode(){var e;const t=this._config;if(t.layout_mode)return t.layout_mode;const o=null!==(e=t.view)&&void 0!==e?e:"airing";return"airing"===o||"season"===o?"list":"grid"}_t(e){var t,o;const a=(null===(o=null===(t=this.hass)||void 0===t?void 0:t.language)||void 0===o?void 0:o.substring(0,2))||"en";return(Me[a]||Me.en)[e]||e}_lang(){var e,t;return(null===(t=null===(e=this.hass)||void 0===e?void 0:e.language)||void 0===t?void 0:t.substring(0,2))||"en"}_padding(){const e=this._config.card_padding;return"compact"===e?"8px":"relaxed"===e?"16px":"12px"}_coverDims(){const e=this._config.cover_size;return"small"===e?{w:40,h:56}:"large"===e?{w:64,h:90}:{w:48,h:68}}_scrollClasses(){const e=this._config;if(!e.visible_items)return"";const t=["scroll-container","grid-scroll"];return!1!==e.scroll_snap&&t.push("snap-scroll"),!1!==e.scroll_fade&&t.push("scroll-fade-wrap"),t.join(" ")}_applyScrollHeights(){var e;const t=null===(e=this._config)||void 0===e?void 0:e.visible_items;t&&this.shadowRoot&&requestAnimationFrame(()=>{this.shadowRoot.querySelectorAll(".scroll-container").forEach(e=>{const o=e.querySelector(".list-item, .grid-item, .season-item");if(!o)return;const a=o.getBoundingClientRect().height,s=parseFloat(getComputedStyle(e).gap)||8,i=t*(a+s)-s;e.style.maxHeight=`${i}px`,e.style.overflowY="auto"})})}_maxFor(e){var t;const o=this._config;return"airing"===e&&o.max_airing?o.max_airing:"watchlist"===e&&o.max_watchlist?o.max_watchlist:"season"===e&&o.max_season?o.max_season:"manga"===e&&o.max_manga?o.max_manga:null!==(t=o.max_items)&&void 0!==t?t:5}_shouldLink(){return"anilist"===this._config.link_target}_handleClick(e){e&&this._shouldLink()&&window.open(e,"_blank","noopener")}_hostStyle(){const e=this._config,t=[];return e.accent_color&&t.push(`--al-accent: ${e.accent_color}`),e.secondary_color&&t.push(`--al-secondary: ${e.secondary_color}`),e.card_background&&t.push(`--al-card-bg: ${e.card_background}`),void 0!==e.card_opacity&&t.push("--al-bg-opacity: "+e.card_opacity/100),e.border_color&&t.push(`--al-border-color: ${e.border_color}`),void 0!==e.border_width&&t.push(`--al-border-width: ${e.border_width}px`),void 0!==e.border_radius&&t.push(`--al-border-radius: ${e.border_radius}px`),t.join(";")}render(){var e,t,o;if(!this._config||!this.hass)return B;const a=null!==(e=this._config.view)&&void 0!==e?e:"airing";this._wsLoadedViews.has(a)||this._wsLoadPromise||!(null===(t=this.hass)||void 0===t?void 0:t.callWS)||this._triggerWSLoad(),this._config.visible_items&&this.updateComplete.then(()=>this._applyScrollHeights());const s=null!==(o=this._config.title)&&void 0!==o?o:this._defaultTitle(a),i=this._padding();return q`
      <div class="card" style="${this._hostStyle()}">
        <div class="card-header" style="padding:${i} ${i}">
          <span class="brand-dot"></span>
          <span class="header-title">${s}</span>
        </div>
        <div class="card-content" style="padding:${i}">
          ${this._config.show_search?this._renderSearch():B}
          ${this._wsLoading?q`<div class="loading-bar"></div>`:B}
          ${"airing"===a?this._renderAiring():B}
          ${"watchlist"===a?this._renderWatchlist():B}
          ${"season"===a?this._renderSeason():B}
          ${"profile"===a?this._renderProfile():B}
          ${"manga"===a?this._renderManga():B}
        </div>
      </div>
    `}_renderSearch(){return q`
      <div class="search-bar">
        <input
          type="text"
          aria-label=${this._t("search_placeholder")}
          placeholder=${this._t("search_placeholder")}
          .value=${this._searchQuery}
          @input=${e=>{this._searchQuery=e.target.value}}
        />
      </div>
    `}_matchesSearch(e){return!this._searchQuery||e.toLowerCase().includes(this._searchQuery.toLowerCase())}_renderEmpty(e){return q`
      <div class="empty">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm1-5C6.47 2 2 6.5 2 12s4.47 10 10 10 10-4.5 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        <div>${this._t(e)}</div>
      </div>
    `}_renderStatusTabs(e){const t={CURRENT:this._t("current"),PLANNING:this._t("planning"),COMPLETED:this._t("completed"),PAUSED:this._t("paused"),DROPPED:this._t("dropped"),REPEATING:this._t("repeating")};return q`
      <div class="status-tabs">
        ${e.map(e=>q`
          <button
            class="tab-btn ${this._activeTab===e?"active":""}"
            @click=${()=>{this._activeTab=e}}
          >${t[e]||e}</button>
        `)}
      </div>
    `}_renderAiring(){let e=this._getAiringItems();if(e=e.filter(e=>this._matchesSearch(this._title(e.title))),!e.length)return this._renderEmpty("no_episodes");const{w:t,h:o}=this._coverDims(),a=this._config,s=this._lang(),i=this._scrollClasses(),l=this._scorePos();return q`
      <div class="list ${i}">
        ${e.map(e=>{var i,r;const n=this._title(e.title),_=this._coverUrl(e),d=this._pickScore(e,"airing");return q`
          <div
            class="list-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":B}
            tabindex=${this._shouldLink()&&e.site_url?"0":B}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${a.show_tooltips?`${n} - ${this._t("episode")} ${e.episode}`:""}
          >
            ${a.show_cover?q`
              <div class="cover-wrap" style="width:${t}px;height:${o}px">
                ${_?q`<img class="cover" src=${_} alt=${n} loading="lazy" style="width:${t}px;height:${o}px" />`:q`<div class="cover cover-placeholder" style="width:${t}px;height:${o}px"><span>?</span></div>`}
                ${Te(d,l)}
              </div>
            `:B}
            <div class="item-info">
              <div class="item-title">${Ce(d,l)}${n}</div>
              <div class="item-sub">
                ${this._t("episode")} ${e.episode}
                ${a.show_duration&&e.duration?q` · ${e.duration}${this._t("min")}`:B}
                ${a.show_average_score&&e.average_score?q` · ★${e.average_score}%`:B}
              </div>
              ${a.show_genres&&(null===(i=e.genres)||void 0===i?void 0:i.length)?q`<div class="inline-genres">${e.genres.slice(0,3).map(e=>q`<span class="mini-chip">${e}</span>`)}</div>`:B}
              <div class="countdown-row">
                ${a.show_countdown?q`<span class="countdown">${Ee(e.airing_at,null!==(r=a.countdown_format)&&void 0!==r?r:"relative",s)}</span>`:B}
                ${a.show_format_badge&&e.format?q`<span class="format-chip">${e.format}</span>`:B}
                ${a.show_badges?q`<span class="status-badge airing">${this._t("airing")}</span>`:B}
              </div>
            </div>
          </div>
        `})}
      </div>
    `}_getAiringItems(){const e=this._maxFor("airing");let t;if(this._wsAiring)t=[...this._wsAiring];else{if(this._config.entry_id)return[];if(t=[],Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([e,o])=>{const a=o.attributes;Array.isArray(a.airing_schedule)&&a.airing_schedule.forEach(e=>{var o,a,s,i;t.push({media_id:Number(null!==(o=e.media_id)&&void 0!==o?o:0),title:String(null!==(a=e.title)&&void 0!==a?a:""),episode:Number(null!==(s=e.episode)&&void 0!==s?s:0),airing_at:String(null!==(i=e.airing_at)&&void 0!==i?i:""),cover_image:e.cover_image,site_url:e.site_url,duration:e.duration,genres:e.genres,average_score:e.average_score,format:e.format})})}),!t.length){const e=je(this.hass,"sensor.anilist_next_airing_anime"),o=je(this.hass,"sensor.anilist_next_episode_time");e&&"unknown"!==e&&t.push({media_id:0,title:e,episode:1,airing_at:o})}}const o=this._config.sort_by;return"title"===o?t.sort((e,t)=>this._title(e.title).localeCompare(this._title(t.title))):"score"===o&&t.sort((e,t)=>{var o,a;return(null!==(o=t.average_score)&&void 0!==o?o:0)-(null!==(a=e.average_score)&&void 0!==a?a:0)}),t.slice(0,e)}_renderWatchlist(){var e,t;const o=null!==(e=this._config.watchlist_statuses)&&void 0!==e?e:["CURRENT"],a=this._config.show_status_tabs&&o.length>1;a&&!o.includes(this._activeTab)&&(this._activeTab=null!==(t=o[0])&&void 0!==t?t:"CURRENT");let s=this._getWatchlistItems();s=a?s.filter(e=>e.status===this._activeTab):s.filter(e=>o.includes(e.status)),s=s.filter(e=>this._matchesSearch(this._title(e.title)));return"scroll"===this._config.overflow_mode||(s=s.slice(0,this._maxFor("watchlist"))),q`
      ${a?this._renderStatusTabs(o):B}
      ${s.length?"list"===this._layoutMode()?this._renderWatchlistList(s):this._renderWatchlistGrid(s):this._renderEmpty("no_watchlist")}
    `}_renderWatchlistList(e){const t=this._config,o=this._scrollClasses(),a=this._scorePos(),s=this._lang(),{w:i,h:l}=this._coverDims();return q`
      <div class="list ${o}">
        ${e.map(e=>{const o=this._title(e.title),r=this._coverUrl(e),n=this._pickScore(e,"watchlist");return q`
          <div class="list-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":B}
            tabindex=${this._shouldLink()&&e.site_url?"0":B}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}>
            ${t.show_cover?q`
              <div class="cover-wrap" style="width:${i}px;height:${l}px">
                ${r?q`<img class="cover" src=${r} alt=${o} loading="lazy" style="width:${i}px;height:${l}px" />`:q`<div class="cover cover-placeholder" style="width:${i}px;height:${l}px"><span>${o[0]}</span></div>`}
                ${Te(n,a)}
              </div>`:B}
            <div class="item-info">
              <div class="item-title">${Ce(n,a)}${o}</div>
              <div class="item-sub">
                ${this._t("ep")} ${e.progress}${e.episodes?`/${e.episodes}`:""}
                ${!1!==t.show_next_airing&&e.next_airing_episode?q` · <span class="countdown">${Ee(e.next_airing_episode.airing_at,"relative",s)}</span>`:B}
              </div>
              ${t.show_progress_bar&&e.episodes?q`
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,e.progress/e.episodes*100)}%"></div></div>
              `:B}
            </div>
          </div>
        `})}
      </div>
    `}_renderWatchlistGrid(e){var t;const o=this._config,a=this._scrollClasses(),s=o.visible_items||"scroll"!==o.overflow_mode?"":`max-height:${null!==(t=o.scroll_height)&&void 0!==t?t:400}px;overflow-y:auto`,i=this._scorePos(),l=this._lang();return q`
      <div class="grid ${a||(s?"grid-scroll":"")}"
        style=${s}>
        ${e.map(e=>{var t,a;const s=this._title(e.title),r=this._coverUrl(e),n=this._pickScore(e,"watchlist");return q`
          <div
            class="grid-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":B}
            tabindex=${this._shouldLink()&&e.site_url?"0":B}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${o.show_tooltips?`${s} - ${e.progress}/${null!==(t=e.episodes)&&void 0!==t?t:"?"}`:""}
          >
            <div class="grid-cover-wrap">
              ${o.show_cover&&r?q`<img class="grid-cover" src=${r} alt=${s} loading="lazy" />`:q`<div class="grid-cover cover-placeholder"><span>${null!==(a=s[0])&&void 0!==a?a:"?"}</span></div>`}
              ${Te(n,i)}
              ${!1!==o.show_next_airing&&e.next_airing_episode?q`<div class="next-ep-badge">${Ee(e.next_airing_episode.airing_at,"relative",l)}</div>`:B}
            </div>
            <div class="grid-title">${Ce(n,i)}${s}</div>
            ${o.show_progress&&o.show_progress_bar&&e.episodes?q`
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100,e.progress/e.episodes*100)}%"></div>
                </div>
                <div class="progress-label">${e.progress}/${e.episodes}</div>
              `:o.show_progress&&e.progress?q`<div class="progress-label">${this._t("ep")} ${e.progress}</div>`:B}
          </div>
        `})}
      </div>
    `}_getWatchlistItems(){if(null!==this._wsWatchlist)return[...this._wsWatchlist];if(this._config.entry_id)return[];const e=[];return Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([t,o])=>{const a=o.attributes;Array.isArray(a.watchlist)&&a.watchlist.forEach(t=>{var o,a,s,i;e.push({media_id:Number(null!==(o=t.media_id)&&void 0!==o?o:0),title:String(null!==(a=t.title)&&void 0!==a?a:""),status:String(null!==(s=t.status)&&void 0!==s?s:"CURRENT"),progress:Number(null!==(i=t.progress)&&void 0!==i?i:0),episodes:t.episodes,score:t.score,cover_image:t.cover_image,site_url:t.site_url})})}),e}_renderSeason(){let e=this._getSeasonItems();if(e=e.filter(e=>this._matchesSearch(this._title(e.title))),!e.length)return this._renderEmpty("no_season");const t=this._config,{w:o,h:a}=this._coverDims(),s=this._scrollClasses(),i=this._scorePos();return q`
      <div class="season-scroll ${s}">
        ${e.map(e=>{var s,l;const r=this._title(e.title),n=this._coverUrl(e),_=this._pickScore(e,"season");return q`
          <div
            class="season-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":B}
            tabindex=${this._shouldLink()&&e.site_url?"0":B}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${t.show_tooltips?`${r} - ${null!==(l=null===(s=e.genres)||void 0===s?void 0:s.join(", "))&&void 0!==l?l:""}`:""}
          >
            ${t.show_cover?q`
              <div class="cover-wrap" style="width:${o-8}px;height:${a-12}px">
                ${n?q`<img class="season-cover" src=${n} alt=${r} loading="lazy" style="width:${o-8}px;height:${a-12}px" />`:q`<div class="season-cover cover-placeholder" style="width:${o-8}px;height:${a-12}px"><span>${r[0]}</span></div>`}
                ${Te(_,i)}
              </div>
            `:B}
            <div class="season-info">
              <div class="season-title">${Ce(_,i)}${r}</div>
              <div class="season-meta">
                ${"inline"!==i&&_?q`<span class="score-chip">★${Ve(_)}</span>`:B}
                ${e.format?q`<span class="format-chip">${e.format}</span>`:B}
              </div>
            </div>
          </div>
        `})}
      </div>
    `}_getSeasonItems(){var e,t;const o=this._maxFor("season"),a=this._config;let s;if(this._wsSeason)s=[...this._wsSeason];else{if(this._config.entry_id)return[];s=[],Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([e,t])=>{const o=t.attributes;Array.isArray(o.season_anime)&&o.season_anime.forEach(e=>{var t,o;s.push({id:Number(null!==(t=e.id)&&void 0!==t?t:0),title:String(null!==(o=e.title)&&void 0!==o?o:""),average_score:e.average_score,episodes:e.episodes,format:e.format,genres:e.genres,cover_image:e.cover_image,site_url:e.site_url,next_airing_episode:e.next_airing_episode})})})}let i=s;if(null===(e=a.genre_filter)||void 0===e?void 0:e.length){const e=new Set(a.genre_filter);i=i.filter(t=>{var o;return null===(o=t.genres)||void 0===o?void 0:o.some(t=>e.has(t))})}if(null===(t=a.format_filter)||void 0===t?void 0:t.length){const e=new Set(a.format_filter);i=i.filter(t=>t.format&&e.has(t.format))}return i.slice(0,o)}_renderManga(){var e,t;const o=null!==(e=this._config.watchlist_statuses)&&void 0!==e?e:["CURRENT"],a=this._config.show_status_tabs&&o.length>1;a&&!o.includes(this._activeTab)&&(this._activeTab=null!==(t=o[0])&&void 0!==t?t:"CURRENT");let s=this._getMangaItems();s=a?s.filter(e=>e.status===this._activeTab):s.filter(e=>o.includes(e.status)),s=s.filter(e=>this._matchesSearch(this._title(e.title)));return"scroll"===this._config.overflow_mode||(s=s.slice(0,this._maxFor("manga"))),q`
      ${a?this._renderStatusTabs(o):B}
      ${s.length?"list"===this._layoutMode()?this._renderMangaList(s):this._renderMangaGrid(s):this._renderEmpty("no_manga")}
    `}_renderMangaList(e){const t=this._config,o=this._scrollClasses(),a=this._scorePos(),{w:s,h:i}=this._coverDims();return q`
      <div class="list ${o}">
        ${e.map(e=>{const o=this._title(e.title),l=this._coverUrl(e),r=this._pickScore(e,"manga");return q`
          <div class="list-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":B}
            tabindex=${this._shouldLink()&&e.site_url?"0":B}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}>
            ${t.show_cover?q`
              <div class="cover-wrap" style="width:${s}px;height:${i}px">
                ${l?q`<img class="cover" src=${l} alt=${o} loading="lazy" style="width:${s}px;height:${i}px" />`:q`<div class="cover cover-placeholder" style="width:${s}px;height:${i}px"><span>${o[0]}</span></div>`}
                ${Te(r,a)}
              </div>`:B}
            <div class="item-info">
              <div class="item-title">${Ce(r,a)}${o}</div>
              <div class="item-sub">${this._t("ch")} ${e.progress}${e.chapters?`/${e.chapters}`:""}${e.volumes?` · ${this._t("vol")} ${e.progress_volumes}`:""}</div>
              ${t.show_progress_bar&&e.chapters?q`
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,e.progress/e.chapters*100)}%"></div></div>
              `:B}
            </div>
          </div>
        `})}
      </div>
    `}_renderMangaGrid(e){var t;const o=this._config,a=this._scrollClasses(),s=o.visible_items||"scroll"!==o.overflow_mode?"":`max-height:${null!==(t=o.scroll_height)&&void 0!==t?t:400}px;overflow-y:auto`,i=this._scorePos();return q`
      <div class="grid ${a||(s?"grid-scroll":"")}"
        style=${s}>
        ${e.map(e=>{var t,a;const s=this._title(e.title),l=this._coverUrl(e),r=this._pickScore(e,"manga");return q`
          <div
            class="grid-item"
            @click=${()=>this._handleClick(e.site_url)}
            @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||!this._shouldLink()||(t.preventDefault(),this._handleClick(e.site_url))}}
            role=${this._shouldLink()&&e.site_url?"button":B}
            tabindex=${this._shouldLink()&&e.site_url?"0":B}
            style=${this._shouldLink()&&e.site_url?"cursor:pointer":""}
            title=${o.show_tooltips?`${s} - ${this._t("ch")}${e.progress}/${null!==(t=e.chapters)&&void 0!==t?t:"?"}`:""}
          >
            <div class="grid-cover-wrap">
              ${o.show_cover&&l?q`<img class="grid-cover" src=${l} alt=${s} loading="lazy" />`:q`<div class="grid-cover cover-placeholder"><span>${null!==(a=s[0])&&void 0!==a?a:"?"}</span></div>`}
              ${Te(r,i)}
            </div>
            <div class="grid-title">${Ce(r,i)}${s}</div>
            ${o.show_progress&&o.show_progress_bar&&e.chapters?q`
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100,e.progress/e.chapters*100)}%"></div>
                </div>
                <div class="progress-label">${this._t("ch")} ${e.progress}/${e.chapters}</div>
              `:o.show_progress&&e.progress?q`<div class="progress-label">${this._t("ch")} ${e.progress}${e.volumes?` · ${this._t("vol")} ${e.progress_volumes}`:""}</div>`:B}
          </div>
        `})}
      </div>
    `}_getMangaItems(){if(null!==this._wsManga)return[...this._wsManga];if(this._config.entry_id)return[];const e=[];return Object.entries(this.hass.states).filter(([e])=>e.startsWith("sensor.anilist_")).forEach(([t,o])=>{const a=o.attributes;Array.isArray(a.manga_list)&&a.manga_list.forEach(t=>{var o,a,s,i,l;e.push({media_id:Number(null!==(o=t.media_id)&&void 0!==o?o:0),title:String(null!==(a=t.title)&&void 0!==a?a:""),status:String(null!==(s=t.status)&&void 0!==s?s:"CURRENT"),progress:Number(null!==(i=t.progress)&&void 0!==i?i:0),progress_volumes:Number(null!==(l=t.progress_volumes)&&void 0!==l?l:0),chapters:t.chapters,volumes:t.volumes,score:t.score,cover_image:t.cover_image,site_url:t.site_url})})}),e}_renderProfile(){var e,t,o,a,s,i,l,r,n,_,d;const p=this._wsProfile;let c,h,u,g,b,m,v,f,w,y,k,x;if(p&&p.is_authenticated){const s=p.stats;c=String(null!==(e=s.anime_count)&&void 0!==e?e:0),h=String(null!==(t=s.episodes_watched)&&void 0!==t?t:0),u=String(s.minutes_watched?Math.round(s.minutes_watched/60*10)/10:0),g=String(s.anime_mean_score?Math.round(s.anime_mean_score/10*10)/10:0),b=String(s.manga_mean_score?Math.round(s.manga_mean_score/10*10)/10:0),m="",v=String(null!==(o=s.chapters_read)&&void 0!==o?o:0),f=String(null!==(a=s.manga_count)&&void 0!==a?a:0),w=p.top_genres.map(e=>e.genre),y=p.favourite_anime.map(e=>({title:this._title(e.title),site_url:e.site_url,cover:e.cover_image})),k=p.viewer.name,x=p.viewer.avatar}else{if(this._wsLoadedViews.has("profile")||this._config.entry_id)return this._renderEmpty("no_profile");c=je(this.hass,"sensor.anilist_total_anime_watched"),h=je(this.hass,"sensor.anilist_total_episodes_watched"),u=je(this.hass,"sensor.anilist_total_hours_watched"),g=je(this.hass,"sensor.anilist_anime_mean_score"),b=je(this.hass,"sensor.anilist_manga_mean_score"),m=je(this.hass,"sensor.anilist_watching_count"),v=je(this.hass,"sensor.anilist_chapters_read"),f=je(this.hass,"sensor.anilist_manga_reading_count");const e=this.hass.states["sensor.anilist_top_genre"];w=null!==(i=null===(s=null==e?void 0:e.attributes)||void 0===s?void 0:s.top_genres)&&void 0!==i?i:[],y=null!==(r=null===(l=null==e?void 0:e.attributes)||void 0===l?void 0:l.favourite_anime)&&void 0!==r?r:[],k=null===(n=null==e?void 0:e.attributes)||void 0===n?void 0:n.viewer_name,x=null===(_=null==e?void 0:e.attributes)||void 0===_?void 0:_.viewer_avatar}if(!(c&&"unknown"!==c&&"0"!==c||(null==p?void 0:p.is_authenticated)))return q`
        <div class="empty">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          <div>${this._t("no_profile")}<br/>${this._t("auth_only")}</div>
        </div>
      `;const $=k?`https://anilist.co/user/${k}`:void 0,z=this._config;return q`
      <div class="profile">
        <!-- Avatar + Name -->
        ${!1!==z.show_avatar||!1!==z.show_username?q`
          <div class="profile-header-centered"
            @click=${()=>$&&this._handleClick($)}
            style=${$&&this._shouldLink()?"cursor:pointer":""}
          >
            ${!1!==z.show_avatar?x?q`<img class="avatar" src=${x} alt=${null!=k?k:""} loading="lazy" />`:q`
                <div class="avatar avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              `:B}
            ${!1!==z.show_username?q`<div class="profile-name">${null!=k?k:this._t("profile")}</div>`:B}
          </div>
        `:B}

        <!-- Anime Stats -->
        ${!1!==z.show_anime_stats?q`
          <div class="stats-grid">
            ${this._statTile(this._t("anime"),c)}
            ${this._statTile(this._t("episodes"),h)}
            ${this._statTile(this._t("hours"),u)}
            ${this._statTile(this._t("score_avg"),g)}
            ${m&&"unknown"!==m?this._statTile(this._t("watching_now"),m):B}
          </div>
        `:B}

        <!-- Manga Stats -->
        ${!1!==z.show_manga_stats&&f&&"unknown"!==f?q`
          <div class="stats-grid">
            ${this._statTile(this._t("manga_count"),f)}
            ${v&&"unknown"!==v?this._statTile(this._t("chapters"),v):B}
            ${b&&"unknown"!==b?this._statTile(this._t("manga_score"),b):B}
          </div>
        `:B}

        <!-- Genre chart -->
        ${!1!==z.show_genre_chart&&w.length?q`
          <div class="section-label">${this._t("top_genres")}</div>
          ${(null===(d=null==p?void 0:p.top_genres)||void 0===d?void 0:d.length)?this._renderGenreChartWithCounts(p.top_genres):this._renderGenreChart(w)}
        `:B}

        <!-- Favourites -->
        ${!1!==z.show_favourites&&y.length?q`
          <div class="section-label">${this._t("favourites")}</div>
          <div class="fav-list">
            ${y.slice(0,5).map(e=>q`
              <div
                class="fav-item"
                @click=${()=>this._handleClick(e.site_url)}
                style=${e.site_url&&this._shouldLink()?"cursor:pointer":""}
              >
                ${e.cover?q`<img class="fav-cover" src=${e.cover} alt=${e.title} loading="lazy" />`:B}
                <span class="fav-title">${e.title}</span>
              </div>
            `)}
          </div>
        `:B}
      </div>
    `}_renderGenreChart(e){var t;const o=null!==(t=this._config.chart_type)&&void 0!==t?t:"bar",a=e.slice(0,5);if("tags"===o)return q`
        <div class="genre-chips">
          ${a.map(e=>q`<span class="genre-chip">${e}</span>`)}
        </div>
      `;if("donut"===o){const e=a.length,t=["#3DB4F2","#C063FF","#FF6B6B","#4ECDC4","#FFE66D"];let o=0;const s=a.map((a,s)=>{const i=100/e,l=o;return o+=i,{genre:a,start:l,pct:i,color:t[s%t.length]}}),i=s.map(e=>`${e.color} ${e.start}% ${e.start+e.pct}%`).join(", ");return q`
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${i})"></div>
          <div class="donut-legend">
            ${s.map(e=>q`
              <div class="legend-item">
                <span class="legend-dot" style="background:${e.color}"></span>
                <span>${e.genre}</span>
              </div>
            `)}
          </div>
        </div>
      `}const s=a.map((e,t)=>100-15*t);return q`
      <div class="bar-chart">
        ${a.map((e,t)=>q`
          <div class="bar-row">
            <span class="bar-label">${e}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${s[t]}%"></div>
            </div>
          </div>
        `)}
      </div>
    `}_renderGenreChartWithCounts(e){var t,o;const a=null!==(t=this._config.chart_type)&&void 0!==t?t:"bar",s=e.slice(0,5);if("tags"===a)return q`
        <div class="genre-chips">
          ${s.map(e=>q`<span class="genre-chip">${e.genre} (${e.count})</span>`)}
        </div>
      `;if("donut"===a){const e=s.reduce((e,t)=>e+t.count,0)||1,t=["#3DB4F2","#C063FF","#FF6B6B","#4ECDC4","#FFE66D"];let o=0;const a=s.map((a,s)=>{const i=a.count/e*100,l=o;return o+=i,{genre:a.genre,count:a.count,start:l,pct:i,color:t[s%t.length]}}),i=a.map(e=>`${e.color} ${e.start}% ${e.start+e.pct}%`).join(", ");return q`
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${i})"></div>
          <div class="donut-legend">
            ${a.map(e=>q`
              <div class="legend-item">
                <span class="legend-dot" style="background:${e.color}"></span>
                <span>${e.genre} (${e.count})</span>
              </div>
            `)}
          </div>
        </div>
      `}const i=(null===(o=s[0])||void 0===o?void 0:o.count)||1;return q`
      <div class="bar-chart">
        ${s.map(e=>q`
          <div class="bar-row">
            <span class="bar-label">${e.genre}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${e.count/i*100}%"></div>
            </div>
            <span class="bar-count">${e.count}</span>
          </div>
        `)}
      </div>
    `}_statTile(e,t){return q`
      <div class="stat-tile">
        <div class="stat-value">${t}</div>
        <div class="stat-label">${e}</div>
      </div>
    `}_defaultTitle(e){var t;return this._t(null!==(t={airing:"next_episodes",watchlist:"watching",season:"this_season",profile:"profile",manga:"manga"}[e])&&void 0!==t?t:"next_episodes")}}Oe.styles=l`
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
  `,e([pe({attribute:!1})],Oe.prototype,"hass",void 0),e([ce()],Oe.prototype,"_config",void 0),e([ce()],Oe.prototype,"_activeTab",void 0),e([ce()],Oe.prototype,"_searchQuery",void 0),e([ce()],Oe.prototype,"_wsAiring",void 0),e([ce()],Oe.prototype,"_wsWatchlist",void 0),e([ce()],Oe.prototype,"_wsSeason",void 0),e([ce()],Oe.prototype,"_wsManga",void 0),e([ce()],Oe.prototype,"_wsProfile",void 0),e([ce()],Oe.prototype,"_wsLoading",void 0),customElements.define("anilist-card",Oe),window.customCards=window.customCards||[],window.customCards.push({type:"anilist-card",name:"AniList",description:"AniList anime & manga tracker card with airing, watchlist, season, profile and manga views.",preview:!0});
