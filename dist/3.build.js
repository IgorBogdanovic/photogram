webpackJsonp([3],{123:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.regex=e.ref=e.len=e.req=e.withParams=void 0;var m=n(126),a=function(t){return t&&t.__esModule?t:{default:t}}(m);e.withParams=a.default;var i=e.req=function(t){if(Array.isArray(t))return!!t.length;if(void 0===t||null===t||!1===t)return!1;if(t instanceof Date)return!isNaN(t.getTime());if("object"==typeof t){for(var e in t)return!0;return!1}return!!String(t).length};e.len=function(t){return Array.isArray(t)?t.length:"object"==typeof t?Object.keys(t).length:String(t).length},e.ref=function(t,e,n){return"function"==typeof t?t.call(e,n):n[t]},e.regex=function(t,e){return(0,a.default)({type:t},function(t){return!i(t)||e.test(t)})}},124:function(t,e,n){"use strict";function m(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.maxValue=e.minValue=e.and=e.or=e.url=e.sameAs=e.requiredUnless=e.requiredIf=e.required=e.minLength=e.maxLength=e.macAddress=e.ipAddress=e.email=e.between=e.numeric=e.alphaNum=e.alpha=void 0;var a=n(125),i=m(a),o=n(127),r=m(o),s=n(128),c=m(s),d=n(129),l=m(d),u=n(130),f=m(u),_=n(131),p=m(_),h=n(132),v=m(h),g=n(133),b=m(g),w=n(134),k=m(w),y=n(135),x=m(y),C=n(136),P=m(C),A=n(137),$=m(A),j=n(138),M=m(j),O=n(139),q=m(O),z=n(140),B=m(z),S=n(141),I=m(S),F=n(142),L=m(F),D=n(143),U=m(D);e.alpha=i.default,e.alphaNum=r.default,e.numeric=c.default,e.between=l.default,e.email=f.default,e.ipAddress=p.default,e.macAddress=v.default,e.maxLength=b.default,e.minLength=k.default,e.required=x.default,e.requiredIf=P.default,e.requiredUnless=$.default,e.sameAs=M.default,e.url=q.default,e.or=B.default,e.and=I.default,e.minValue=L.default,e.maxValue=U.default},125:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=(0,m.regex)("alpha",/^[a-zA-Z]*$/)},126:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(29).withParams;e.default=m},127:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=(0,m.regex)("alphaNum",/^[a-zA-Z0-9]*$/)},128:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=(0,m.regex)("numeric",/^[0-9]*$/)},129:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t,e){return(0,m.withParams)({type:"between",min:t,max:e},function(n){return!(0,m.req)(n)||(!/\s/.test(n)||n instanceof Date)&&+t<=+n&&+e>=+n})}},130:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123),a=/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;e.default=(0,m.regex)("email",a)},131:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=(0,m.withParams)({type:"ipAddress"},function(t){if(!(0,m.req)(t))return!0;if("string"!=typeof t)return!1;var e=t.split(".");return 4===e.length&&e.every(a)});var a=function(t){if(t.length>3||0===t.length)return!1;if("0"===t[0]&&"0"!==t)return!1;if(!t.match(/^\d+$/))return!1;var e=0|+t;return e>=0&&e<=255}},132:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,m.withParams)({type:"macAddress"},function(e){if(!(0,m.req)(e))return!0;if("string"!=typeof e)return!1;var n="string"==typeof t&&""!==t?e.split(t):12===e.length||16===e.length?e.match(/.{2}/g):null;return null!==n&&(6===n.length||8===n.length)&&n.every(a)})};var a=function(t){return t.toLowerCase().match(/^[0-9a-f]{2}$/)}},133:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t){return(0,m.withParams)({type:"maxLength",max:t},function(e){return!(0,m.req)(e)||(0,m.len)(e)<=t})}},134:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t){return(0,m.withParams)({type:"minLength",min:t},function(e){return!(0,m.req)(e)||(0,m.len)(e)>=t})}},135:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=(0,m.withParams)({type:"required"},m.req)},136:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t){return(0,m.withParams)({type:"requiredIf",prop:t},function(e,n){return!(0,m.ref)(t,this,n)||(0,m.req)(e)})}},137:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t){return(0,m.withParams)({type:"requiredUnless",prop:t},function(e,n){return!!(0,m.ref)(t,this,n)||(0,m.req)(e)})}},138:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t){return(0,m.withParams)({type:"sameAs",eq:t},function(e,n){return e===(0,m.ref)(t,this,n)})}},139:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123),a=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[\/?#]\S*)?$/;e.default=(0,m.regex)("url",a)},140:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return(0,m.withParams)({type:"or"},function(){for(var t=this,n=arguments.length,m=Array(n),a=0;a<n;a++)m[a]=arguments[a];return e.length>0&&e.reduce(function(e,n){return e||n.apply(t,m)},!1)})}},141:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return(0,m.withParams)({type:"and"},function(){for(var t=this,n=arguments.length,m=Array(n),a=0;a<n;a++)m[a]=arguments[a];return e.length>0&&e.reduce(function(e,n){return e&&n.apply(t,m)},!0)})}},142:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t){return(0,m.withParams)({type:"minValue",min:t},function(e){return!(0,m.req)(e)||(!/\s/.test(e)||e instanceof Date)&&+e>=+t})}},143:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var m=n(123);e.default=function(t){return(0,m.withParams)({type:"maxValue",max:t},function(e){return!(0,m.req)(e)||(!/\s/.test(e)||e instanceof Date)&&+e<=+t})}},144:function(t,e,n){"use strict";var m=n(124);n.n(m);e.a={props:["postId"],data:function(){return{comment:""}},validations:{comment:{required:m.required}},computed:{newsFeedPost:function(){return this.$store.getters["nfPosts/newsFeedPost"]}},methods:{submitComment:function(){for(var t=this,e=this.comment.split(" "),n=0;e.length>n;n++)if(e[n].indexOf("@")>-1)var m=e[n].replace("@","");var a,i=e.join(" ");a=this.newsFeedPost.id?this.newsFeedPost.id:this.postId;var o={post_id:a,reply_username:m,body:i};this.$store.dispatch("nfPosts/postComment",o).then(function(e){t.$emit("commentSubmited"),t.comment=""}).catch(function(t){console.log(t)})}}}},145:function(t,e,n){"use strict";function m(t){n(146)}var a=n(148),i=n(6),o=m,r=i(null,a.a,!1,o,"data-v-6e487a42",null);e.a=r.exports},146:function(t,e,n){var m=n(147);"string"==typeof m&&(m=[[t.i,m,""]]),m.locals&&(t.exports=m.locals);n(5)("b572295c",m,!0,{})},147:function(t,e,n){e=t.exports=n(2)(!1),e.push([t.i,".a-spinner[data-v-6e487a42]{position:relative;top:0;left:50%;transform:translateX(-50%);width:10%;height:auto;margin:5% 0 3%;color:#232429}.a-spinner svg[data-v-6e487a42]{width:100%;height:100%}",""])},148:function(t,e,n){"use strict";var m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"a-spinner"},[n("icon",{attrs:{name:"spinner",pulse:""}})],1)},a=[],i={render:m,staticRenderFns:a};e.a=i},149:function(t,e,n){"use strict";function m(t){n(150)}var a=n(144),i=n(152),o=n(6),r=m,s=o(a.a,i.a,!1,r,"data-v-11ec7c52",null);e.a=s.exports},150:function(t,e,n){var m=n(151);"string"==typeof m&&(m=[[t.i,m,""]]),m.locals&&(t.exports=m.locals);n(5)("8d797fb4",m,!0,{})},151:function(t,e,n){e=t.exports=n(2)(!1),e.push([t.i,".m-make-comment[data-v-11ec7c52]{position:fixed;bottom:4.1rem;left:0;width:100%;padding-top:.1rem;background-color:#fff;border-top:1px solid hsla(204,2%,59%,.5)}@media (min-width:768px){.m-make-comment[data-v-11ec7c52]{position:absolute;bottom:0;padding-top:.5rem;padding-bottom:.2rem}}.m-make-comment svg[data-v-11ec7c52]{width:100%;height:100%;stroke:#232429;stroke-width:.1rem;fill:#fff}@media (min-width:768px){.m-make-comment svg[data-v-11ec7c52]{stroke-width:.2rem}}.m-make-comment[data-v-11ec7c52] ::placeholder{color:#232429;opacity:.5}.m-make-comment[data-v-11ec7c52] :-ms-input-placeholder,.m-make-comment[data-v-11ec7c52] ::-ms-input-placeholder{color:#232429;opacity:.5}.m-make-comment__icon[data-v-11ec7c52]{display:inline-block;width:3.2rem;height:3.2rem;margin-bottom:.5rem;margin-left:1.4rem}@media (min-width:768px){.m-make-comment__icon[data-v-11ec7c52]{width:3.6rem;height:3.6rem;margin-bottom:.8rem;margin-left:3.1rem}}.m-make-comment__input[data-v-11ec7c52]{color:#232429;position:relative;bottom:.8rem;width:68%;margin-left:.2rem;border:none;border-radius:5px}@media (max-width:767px){.m-make-comment__input[data-v-11ec7c52]{font-size:1.6rem}}@media (min-width:768px){.m-make-comment__input[data-v-11ec7c52]{font-size:1.6rem}}@media (max-width:767px){.m-make-comment__input[data-v-11ec7c52]{line-height:1.9rem}}@media (min-width:768px){.m-make-comment__input[data-v-11ec7c52]{line-height:1.9rem;width:73%;bottom:1.2rem;margin-left:.7rem}}.m-make-comment__input[data-v-11ec7c52]:focus{background-color:#d2d2d3}.m-make-comment__submit[data-v-11ec7c52]{position:relative;top:.2rem;width:3.5rem;height:3.5rem;background-color:transparent;cursor:pointer}@media (min-width:768px){.m-make-comment__submit[data-v-11ec7c52]{width:3.8rem;height:3.8rem;margin-left:.4rem}}.m-make-comment__submit svg[data-v-11ec7c52]{stroke:#fff;fill:#232429}.m-make-comment__submit[disabled][data-v-11ec7c52],.m-make-comment__submit[disabled][data-v-11ec7c52]:active,.m-make-comment__submit[disabled][data-v-11ec7c52]:hover{cursor:not-allowed}.m-make-comment__submit[disabled]:active svg[data-v-11ec7c52],.m-make-comment__submit[disabled]:hover svg[data-v-11ec7c52],.m-make-comment__submit[disabled] svg[data-v-11ec7c52]{fill:#ccc}.m-bar__make-comment .m-make-comment[data-v-11ec7c52],.m-detail-bar__make-comment .m-make-comment[data-v-11ec7c52]{opacity:0;position:absolute;bottom:-.6rem;border-top:none;border-bottom:1px solid hsla(204,2%,59%,.5)}@media (max-width:767px){.m-bar__make-comment .m-make-comment__icon[data-v-11ec7c52],.m-detail-bar__make-comment .m-make-comment__icon[data-v-11ec7c52]{transform:scale(.78);transition:transform .5s ease-in-out}.m-bar__make-comment .m-make-comment__icon.is-visible[data-v-11ec7c52],.m-detail-bar__make-comment .m-make-comment__icon.is-visible[data-v-11ec7c52]{transform:scale(1)}}@media (min-width:768px){.m-bar__make-comment .m-make-comment__icon[data-v-11ec7c52],.m-detail-bar__make-comment .m-make-comment__icon[data-v-11ec7c52]{width:2.5rem;height:2.5rem;margin-left:1rem;margin-bottom:.5rem}}@media (min-width:768px){.m-bar__make-comment .m-make-comment__input[data-v-11ec7c52],.m-detail-bar__make-comment .m-make-comment__input[data-v-11ec7c52]{width:71%;bottom:.5rem}}@media (min-width:768px){.m-bar__make-comment .m-make-comment__submit[data-v-11ec7c52],.m-detail-bar__make-comment .m-make-comment__submit[data-v-11ec7c52]{width:2.5rem;height:2.5rem}}@media (min-width:768px){.m-detail-bar__make-comment .m-make-comment__input[data-v-11ec7c52]{width:82%}}",""])},152:function(t,e,n){"use strict";var m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"o-all-comments__make-comment  m-make-comment"},[n("form",{on:{submit:function(e){e.preventDefault(),t.submitComment(e)}}},[n("div",{staticClass:"m-make-comment__icon"},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"2736.636 282 25.678 23.277"}},[n("path",{staticClass:"cls-1",attrs:{id:"Union_15","data-name":"Union 15",d:"M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z",transform:"translate(2739 283)"}})])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],staticClass:"m-make-comment__input",attrs:{type:"text",placeholder:"Comment"},domProps:{value:t.comment},on:{blur:function(e){t.$v.comment.$touch()},input:function(e){e.target.composing||(t.comment=e.target.value)}}}),t._v(" "),n("button",{staticClass:"m-make-comment__submit",attrs:{type:"submit",disabled:t.$v.$invalid}},[n("icon",{staticClass:"icon",attrs:{name:"check-circle"}})],1)])])},a=[],i={render:m,staticRenderFns:a};e.a=i},154:function(t,e,n){"use strict";(function(t){var m=n(3),a=n(10);e.a={mixins:[a.b],props:["postComment"],data:function(){return{comment:this.postComment,commentBody:this.postComment.body}},computed:{token:function(){return this.$store.getters["login/token"]},idUser:function(){return this.$store.getters["login/idUser"]},postCommentsAll:function(){return this.$store.getters["nfPosts/postCommentsAll"]}},methods:{deleteComment:function(){var t=this,e=this.comment.id;this.$store.dispatch("nfPosts/deleteComment",e).then(function(e){t.$emit("commentEdited")}).catch(function(t){console.log(t)})},unLikeComment:function(){var t=this,e=this.comment.id,n=this.comment.auth_like_id,m={type:2,id:e,likeId:n};this.$store.dispatch("nfPosts/unLike",m).then(function(n){var m=n.data.data,a=t.postCommentsAll,i=a.map(function(t){return t.id}).indexOf(e),o=void 0;o=m?{index:i,value:{auth_like_id:m.id}}:{index:i,value:{auth_like_id:null}},t.$store.dispatch("nfPosts/updatePostCommentsAll",o),t.comment=a[i]}).catch(function(t){console.log(t)})},submitComment:function(e){var n=this,a=t(e.target);m.b.patch(""+this.comment.id,{body:this.commentBody},{headers:{Authorization:"Bearer "+this.token}}).then(function(t){a.find(".m-comment__body--input").off("focus"),a.siblings(".m-comment__submit-notification").show(0).animate({opacity:1,top:"-2rem"},1500,function(){a.siblings(".m-comment__submit-notification").hide(0).css({opacity:0,top:"2rem"}),a.find(".m-comment__body--input").hide(0),a.siblings(".m-comment__body--txt").show(0)}),setTimeout(function(){n.$emit("commentEdited")},1600)}).catch(function(t){console.log(t)})},commentEdit:function(e){var n=t(e.target);n.hasClass("js-active")?(n.removeClass("js-active"),n.parents(".m-comment__content").find(".m-comment__form").find(".m-comment__body--input").hide(0).off("focus"),n.parents(".m-comment__content").find(".m-comment__body--txt").show(0)):(n.addClass("js-active"),n.parents(".m-comment__content").find(".m-comment__body--txt").hide(0),n.parents(".m-comment__content").find(".m-comment__form").find(".m-comment__body--input").show(0).focus())},commentReply:function(){t(".m-make-comment__input").focus().val("@"+this.comment.username+" ")}}}}).call(e,n(28))},159:function(t,e,n){"use strict";function m(t){n(160)}var a=n(154),i=n(162),o=n(6),r=m,s=o(a.a,i.a,!1,r,"data-v-6d17d2c8",null);e.a=s.exports},160:function(t,e,n){var m=n(161);"string"==typeof m&&(m=[[t.i,m,""]]),m.locals&&(t.exports=m.locals);n(5)("be22a594",m,!0,{})},161:function(t,e,n){e=t.exports=n(2)(!1),e.push([t.i,".m-comment[data-v-6d17d2c8]:last-child{margin-bottom:6rem}@media (min-width:768px){.m-comment[data-v-6d17d2c8]:last-child{margin-bottom:8rem}}.m-comment__user-img[data-v-6d17d2c8]{display:inline-block;width:4.1rem;height:4.1rem;margin-top:.9rem;margin-left:1.5rem;cursor:pointer}@media (min-width:768px){.m-comment__user-img[data-v-6d17d2c8]{width:4.6rem;height:4.6rem;margin-top:4.8rem;margin-left:3.5rem}}.m-comment__user-img img[data-v-6d17d2c8]{width:100%;height:100%;border-radius:50%}.m-comment__content[data-v-6d17d2c8]{position:relative;display:inline-block;width:55%;margin-top:2.2rem;margin-left:.6rem;vertical-align:top}@media (max-width:767px){.m-comment__content[data-v-6d17d2c8]{font-size:1.4rem}}@media (min-width:768px){.m-comment__content[data-v-6d17d2c8]{font-size:1.6rem}}@media (max-width:767px){.m-comment__content[data-v-6d17d2c8]{line-height:1.7rem}}@media (min-width:768px){.m-comment__content[data-v-6d17d2c8]{line-height:1.9rem;width:65%;margin-top:5.6rem}}.m-comment__username[data-v-6d17d2c8]{font-family:Roboto-Bold,sans-serif;margin-right:.5rem;cursor:pointer}.m-comment__form[data-v-6d17d2c8]{display:inline}.m-comment__body--input[data-v-6d17d2c8]{display:none;width:80%;outline:none;background-color:#fff;border-radius:5px}@media (max-width:767px){.m-comment__body--input[data-v-6d17d2c8]{font-size:1.4rem}}@media (min-width:768px){.m-comment__body--input[data-v-6d17d2c8]{font-size:1.6rem}}@media (max-width:767px){.m-comment__body--input[data-v-6d17d2c8]{line-height:1.7rem}}@media (min-width:768px){.m-comment__body--input[data-v-6d17d2c8]{line-height:1.9rem;width:85%}}.m-comment__body--input[data-v-6d17d2c8]:focus{background-color:#d2d2d3}.m-comment__body--txt[data-v-6d17d2c8]{display:inline}.m-comment__body--txt span[data-v-6d17d2c8]{font-family:Roboto-Bold,sans-serif;color:blue;cursor:pointer}.m-comment__submit-notification[data-v-6d17d2c8]{display:none;position:absolute;top:2rem;width:75vw;opacity:0;color:#09f3a2}.m-comment__links span[data-v-6d17d2c8]{color:#232429;opacity:.5;float:right;margin-top:1rem;margin-right:1rem;cursor:pointer}@media (max-width:767px){.m-comment__links span[data-v-6d17d2c8]{font-size:1rem}}@media (min-width:768px){.m-comment__links span[data-v-6d17d2c8]{font-size:1.6rem}}@media (max-width:767px){.m-comment__links span[data-v-6d17d2c8]{line-height:1.2rem}}@media (min-width:768px){.m-comment__links span[data-v-6d17d2c8]{line-height:1.9rem}}.m-comment__icons[data-v-6d17d2c8]{display:inline-block;margin-right:.5rem;margin-bottom:.3rem;width:6.2rem}@media (min-width:768px){.m-comment__icons[data-v-6d17d2c8]{position:relative;top:-1.5rem;width:8.6rem}}.m-comment__icons svg[data-v-6d17d2c8]{width:100%;height:100%}.m-comment__delete[data-v-6d17d2c8],.m-comment__edit[data-v-6d17d2c8]{float:right;width:2.7rem;height:2.7rem;cursor:pointer}@media (min-width:768px){.m-comment__delete[data-v-6d17d2c8],.m-comment__edit[data-v-6d17d2c8]{width:2.9rem;height:2.9rem}}.m-comment__like[data-v-6d17d2c8]{float:right;width:2.5rem;height:2.5rem;margin-right:.5rem;cursor:pointer}@media (min-width:768px){.m-comment__like[data-v-6d17d2c8]{width:2.7rem;height:2.7rem}}.m-comment__like svg[data-v-6d17d2c8]{stroke:#232429;stroke-width:.1rem;fill:#fff}@media (min-width:768px){.m-comment__like svg[data-v-6d17d2c8]{stroke-width:.2rem}}.m-comment__like.is-active svg[data-v-6d17d2c8]{stroke:#09f3a2;stroke-width:.1rem;fill:#09f3a2}@media (min-width:768px){.m-comment__like.is-active svg[data-v-6d17d2c8]{stroke-width:.2rem}}",""])},162:function(t,e,n){"use strict";var m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"m-comment"},[n("router-link",{staticClass:"m-comment__user-img",attrs:{to:{name:"user",params:{userId:t.comment.user_id}},tag:"div"}},[n("img",{attrs:{src:t.storage+t.comment.user_image.avatar,alt:"user avatar that made this comment"}})]),t._v(" "),n("div",{staticClass:"m-comment__content"},[n("router-link",{staticClass:"m-comment__username",attrs:{to:{name:"user",params:{userId:t.comment.user_id}},tag:"span"}},[t._v("\n            "+t._s(t.comment.username)+"\n        ")]),t._v(" "),t.idUser===t.comment.user_id||"edit-post"===t.$route.name?n("form",{staticClass:"m-comment__form",on:{submit:function(e){e.preventDefault(),t.submitComment(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.commentBody,expression:"commentBody"}],staticClass:"m-comment__body--input",attrs:{type:"text",placeholder:"Comment"},domProps:{value:t.commentBody},on:{input:function(e){e.target.composing||(t.commentBody=e.target.value)}}})]):t._e(),t._v(" "),t.idUser===t.comment.user_id||"edit-post"===t.$route.name?n("p",{staticClass:"m-comment__submit-notification"},[t._v("Comment change successfull")]):t._e(),t._v(" "),n("p",{staticClass:"m-comment__body--txt"},[t.comment.reply_username?n("router-link",{attrs:{to:{name:"user",params:{userId:t.comment.reply_user_id}},tag:"span"}},[t._v("\n                @"+t._s(t.comment.reply_username)+"\n            ")]):t._e(),t._v(" "),t.comment.reply_username?[t._v("\n                "+t._s(t.commentBody.replace(t.commentBody.match(new RegExp("@"+t.comment.reply_username,"i")),""))+"\n            ")]:[t._v("\n                "+t._s(t.commentBody)+"\n            ")]],2),t._v(" "),n("div",{staticClass:"m-comment__links  u-clearfix"},[n("span",{staticClass:"m-comment__reply-link",on:{click:t.commentReply}},[t._v("reply")]),t._v(" "),t.idUser===t.comment.user_id?n("span",{staticClass:"m-comment__edit-link",on:{click:function(e){t.commentEdit(e)}}},[t._v("edit")]):t._e()])],1),t._v(" "),n("div",{staticClass:"m-comment__icons"},[t.idUser===t.comment.user_id||"edit-post"===t.$route.name?n("div",{staticClass:"m-comment__delete",on:{click:t.deleteComment}},[n("icon",{staticClass:"icon",attrs:{name:"times-circle"}})],1):t._e(),t._v(" "),n("div",{staticClass:"m-comment__like",class:{"is-active":t.comment.auth_like_id},on:{click:t.unLikeComment}},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"2700.998 281.935 22.901 23.092"}},[n("path",{staticClass:"cls-1",attrs:{id:"Path_79","data-name":"Path 79",d:"M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z",transform:"translate(2702.004 283.205)"}})])])])],1)},a=[],i={render:m,staticRenderFns:a};e.a=i},168:function(t,e,n){"use strict";(function(t){var m=n(3),a=n(10),i=n(159),o=n(149),r=n(145);e.a={props:["postId"],mixins:[a.a],data:function(){return{comments:[],loading:!1,infScrollDisable:!1,commentAmount:12,commentPage:1}},computed:{token:function(){return this.$store.getters["login/token"]},newsFeedPostsAll:function(){return this.$store.getters["nfPosts/newsFeedPostsAll"]},postCommentsAll:function(){return this.$store.getters["nfPosts/postCommentsAll"]}},methods:{axiosGetComments:function(){var t=this;this.loading=!0,this.infScrollDisable=!0,m.b.get("",{headers:{Authorization:"Bearer "+this.token},params:{post_id:this.postId,amount:this.commentAmount,page:this.commentPage}}).then(function(e){if(e.data.data.length>0){for(var n=0;n<e.data.data.length;n++)t.comments.push(e.data.data[n]);t.commentPage++,t.$store.dispatch("nfPosts/pushPostCommentsAll",t.comments),t.loading=!1,t.infScrollDisable=!1}else t.loading=!1,t.infScrollDisable=!0,console.log("empty array")})},refreshComments:function(){var e=this;t(".m-make-comment__input").blur(),this.comments.length=0,this.commentPage=1,this.loading=!0;var n=this;setTimeout(function(){n.axiosGetComments()},300),m.e.get(""+this.postId,{headers:{Authorization:"Bearer "+this.token}}).then(function(t){var n=t.data.data,m=n.id,a=e.newsFeedPostsAll,i=a.map(function(t){return t.id}).indexOf(m),o={index:i,value:n};e.$store.dispatch("nfPosts/updateNewsFeedPostsAll",o),e.$store.dispatch("nfPosts/changeNewsFeedPost",o.value)}).catch(function(t){console.log(t)})},closeAllComments:function(){var t=this;setTimeout(function(){t.$store.dispatch("nfPosts/pushPostCommentsAll",[])},300)}},components:{appComment:i.a,appMakeComment:o.a,appSpinner:r.a},beforeCreate:function(){this.$store.dispatch("nfPosts/pushPostCommentsAll",[])},created:function(){this.windowWidth>this.breakpoint?this.$store.dispatch("headings/actSetHeading","photogram"):this.$store.dispatch("headings/actSetHeading","Comments")},destroyed:function(){t(".m-make-comment__input").val(""),this.$store.dispatch("nfPosts/pushPostCommentsAll",[])}}}).call(e,n(28))},193:function(t,e,n){var m=n(194);"string"==typeof m&&(m=[[t.i,m,""]]),m.locals&&(t.exports=m.locals);n(5)("24376efe",m,!0,{})},194:function(t,e,n){e=t.exports=n(2)(!1),e.push([t.i,".o-all-comments[data-v-47127c9e]{font-family:Roboto,sans-serif;width:100%;height:100%;background-color:#fff;z-index:9}@media (min-width:768px){.o-all-comments[data-v-47127c9e]{position:fixed;top:0;left:0;background-color:rgba(35,36,41,.9)}}.o-all-comments__wrapper--main[data-v-47127c9e]{background-color:#fff}@media (min-width:768px){.o-all-comments__wrapper--main[data-v-47127c9e]{position:absolute;width:57rem;height:74vh;top:55%;left:50%;transform:translate(-50%,-50%)}}@media (min-width:768px){.o-all-comments__wrapper--sub[data-v-47127c9e]{position:absolute;width:57rem;height:74vh;overflow-y:auto}}.o-all-comments__close[data-v-47127c9e]{position:absolute;width:4rem;height:4rem;color:#fff;top:-5%;right:-7%;cursor:pointer}.o-all-comments__close svg[data-v-47127c9e]{width:100%;height:100%}",""])},195:function(t,e,n){"use strict";var m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"o-all-comments"},[n("div",{staticClass:"o-all-comments__wrapper--main"},[n("a",{staticClass:"o-all-comments__close  u-only-desktop",attrs:{href:"javascript:history.go(-1)"},on:{click:t.closeAllComments}},[n("icon",{staticClass:"icon",attrs:{name:"close"}})],1),t._v(" "),n("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.axiosGetComments,expression:"axiosGetComments"}],staticClass:"o-all-comments__wrapper--sub",attrs:{"infinite-scroll-disabled":"infScrollDisable","infinite-scroll-distance":t.windowHeight/3}},[t._l(t.postCommentsAll,function(e,m){return n("app-comment",{key:e.id+"-"+m,staticClass:"o-all-comments__comment",attrs:{postComment:e},on:{commentEdited:t.refreshComments}})}),t._v(" "),t.loading?n("app-spinner"):t._e()],2),t._v(" "),n("app-make-comment",{staticClass:"o-all-comments__make-comment",attrs:{postId:t.postId},on:{commentSubmited:t.refreshComments}})],1)])},a=[],i={render:m,staticRenderFns:a};e.a=i},36:function(t,e,n){"use strict";function m(t){n(193)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(168),i=n(195),o=n(6),r=m,s=o(a.a,i.a,!1,r,"data-v-47127c9e",null);e.default=s.exports}});
//# sourceMappingURL=3.build.js.map