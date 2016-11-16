!function(e,t){"object"==typeof exports&&"function"==typeof require?module.exports=t(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],function(r,o){return t(r||e._,o||e.Backbone)}):t(_,Backbone)}(this,function(e,t){function r(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function o(){return r()+r()+"-"+r()+"-"+r()+"-"+r()+"-"+r()+r()+r()}return t.LocalStorage=window.Store=function(e){if(!this.localStorage)throw"Backbone.localStorage: Environment does not support localStorage.";this.name=e;var t=this.localStorage().getItem(this.name);this.records=t&&t.split(",")||[]},e.extend(t.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(e){return e.id||(e.id=o(),e.set(e.idAttribute,e.id)),this.localStorage().setItem(this.name+"-"+e.id,JSON.stringify(e)),this.records.push(e.id.toString()),this.save(),this.find(e)},update:function(t){return this.localStorage().setItem(this.name+"-"+t.id,JSON.stringify(t)),e.include(this.records,t.id.toString())||this.records.push(t.id.toString()),this.save(),this.find(t)},find:function(e){return this.jsonData(this.localStorage().getItem(this.name+"-"+e.id))},findAll:function(){return(e.chain||e)(this.records).map(function(e){return this.jsonData(this.localStorage().getItem(this.name+"-"+e))},this).compact().value()},destroy:function(t){return t.isNew()?!1:(this.localStorage().removeItem(this.name+"-"+t.id),this.records=e.reject(this.records,function(e){return e===t.id.toString()}),this.save(),t)},localStorage:function(){return localStorage},jsonData:function(e){return e&&JSON.parse(e)},_clear:function(){var t=this.localStorage(),r=new RegExp("^"+this.name+"-");t.removeItem(this.name),(e.chain||e)(t).keys().filter(function(e){return r.test(e)}).each(function(e){t.removeItem(e)}),this.records.length=0},_storageSize:function(){return this.localStorage().length}}),t.LocalStorage.sync=window.Store.sync=t.localSync=function(e,r,o){var n,i,c=r.localStorage||r.collection.localStorage,a=t.$.Deferred&&t.$.Deferred();try{switch(e){case"read":n=void 0!=r.id?c.find(r):c.findAll();break;case"create":n=c.create(r);break;case"update":n=c.update(r);break;case"delete":n=c.destroy(r)}}catch(s){i=22===s.code&&0===c._storageSize()?"Private browsing is unsupported":s.message}return n?(o&&o.success&&("0.9.10"===t.VERSION?o.success(r,n,o):o.success(n)),a&&a.resolve(n)):(i=i?i:"Record Not Found",o&&o.error&&("0.9.10"===t.VERSION?o.error(r,i,o):o.error(i)),a&&a.reject(i)),o&&o.complete&&o.complete(n),a&&a.promise()},t.ajaxSync=t.sync,t.getSyncMethod=function(e){return e.localStorage||e.collection&&e.collection.localStorage?t.localSync:t.ajaxSync},t.sync=function(e,r,o){return t.getSyncMethod(r).apply(this,[e,r,o])},t.LocalStorage});