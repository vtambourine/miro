parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"t3VO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EmailsEditor=void 0;var t=function(){function t(e,n){var i=escape(e),r=n.prefix+"__email",a=n.prefix+"__email-content",s=n.prefix+"__email-delete",o=document.createRange().createContextualFragment('\n      <span class="'+r+'">\n        <span class="'+a+'"></span>\n        <span class="'+s+'"></span>\n      </span>\n    ');this.container=o.querySelector("."+r),t.validate(i)||this.container.classList.add("emails-editor__email--wrong"),this.content=o.querySelector("."+a),this.content.innerHTML=i,this.deleteActionElement=o.querySelector("."+s),this.attachEventListeners()}return t.prototype.attachEventListeners=function(){this.deleteActionElement&&this.deleteActionElement.addEventListener("click",this.remove.bind(this))},t.prototype.remove=function(){this.container.parentNode&&this.container.parentNode.removeChild(this.container)},t.validate=function(e){return t.EMAIL_REGEXP.test(e)},t.EMAIL_REGEXP=/[a-zA-Z0-9\+]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}/,t}(),e=function(){function t(t){var e=t.prefix+"__input-container",n=t.prefix+"__input-shadow",i=t.prefix+"__input",r=document.createRange().createContextualFragment('\n      <div class="'+e+'">\n        <div class="'+n+'"></div>\n        <input class="'+i+'" />\n      </div>\n    ');this.container=r.querySelector("."+e),this.shadowInput=r.querySelector("."+n),this.input=r.querySelector("."+i),this.attachEventListeners()}return t.prototype.attachEventListeners=function(){var t=this;this.input.addEventListener("keydown",function(e){t.shadowInput.innerText=e.target.value})},Object.defineProperty(t.prototype,"value",{get:function(){return this.input.value},set:function(t){this.input.value=t,this.shadowInput.innerText=t},enumerable:!0,configurable:!0}),t.prototype.addEventListener=function(t,e){this.input.addEventListener.apply(this.input,arguments)},t.prototype.focus=function(){this.input.focus()},t}(),n=function(){function n(t,e,n){void 0===e&&(e=[]),this.rootNode=t,this.emails=e,this.options=Object.assign({prefix:"emails-editor"},n),this.render()}return n.prototype.parseInput=function(){var e=this;this.emailInput.value.trim().split(",").map(function(t){return t.trim()}).filter(function(t){return t.length}).forEach(function(n){e.container.insertBefore(new t(n,e.options).container,e.emailInput.container)})},n.prototype.applyChanges=function(){this.parseInput(),this.emailInput.value=""},n.prototype.render=function(){var n=this;this.container=document.createElement("div"),this.container.classList.add(this.options.prefix),this.container.addEventListener("click",function(){return n.emailInput.focus()}),this.emails.forEach(function(e){var i=new t(e,n.options);n.container.appendChild(i.container)}),this.emailInput=new e(this.options),this.container.appendChild(this.emailInput.container),this.emailInput.addEventListener("keyup",function(t){switch(t.key){case",":case"Enter":t.preventDefault(),n.applyChanges()}}),this.emailInput.addEventListener("blur",function(){n.parseInput(),n.applyChanges()}),this.rootNode.append(this.container)},n}();exports.EmailsEditor=n;
},{}],"fUdq":[function(require,module,exports) {
"use strict";var e=require("./email-editor");new e.EmailsEditor(document.getElementById("email-editor-miro"),["alona@miro.com"]),new e.EmailsEditor(document.getElementById("email-editor-cats"),["rumpleteazer@jellicles.com","old.deuteronomy@jellicles.com","rum.tum.tugger@jellicles.com","gus@jellicles","alonzo"]);
},{"./email-editor":"t3VO"}]},{},["fUdq"], null)
//# sourceMappingURL=/src.6042fa4a.js.map