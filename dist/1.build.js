webpackJsonp([1],{123:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.regex=t.ref=t.len=t.req=t.withParams=void 0;var i=a(126),s=function(e){return e&&e.__esModule?e:{default:e}}(i);t.withParams=s.default;var o=t.req=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e||!1===e)return!1;if(e instanceof Date)return!isNaN(e.getTime());if("object"==typeof e){for(var t in e)return!0;return!1}return!!String(e).length};t.len=function(e){return Array.isArray(e)?e.length:"object"==typeof e?Object.keys(e).length:String(e).length},t.ref=function(e,t,a){return"function"==typeof e?e.call(t,a):a[e]},t.regex=function(e,t){return(0,s.default)({type:e},function(e){return!o(e)||t.test(e)})}},124:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.maxValue=t.minValue=t.and=t.or=t.url=t.sameAs=t.requiredUnless=t.requiredIf=t.required=t.minLength=t.maxLength=t.macAddress=t.ipAddress=t.email=t.between=t.numeric=t.alphaNum=t.alpha=void 0;var s=a(125),o=i(s),n=a(127),r=i(n),m=a(128),d=i(m),l=a(129),c=i(l),u=a(130),h=i(u),p=a(131),f=i(p),_=a(132),v=i(_),b=a(133),w=i(b),g=a(134),k=i(g),x=a(135),P=i(x),y=a(136),C=i(y),V=a(137),F=i(V),$=a(138),D=i($),A=a(139),S=i(A),j=a(140),O=i(j),M=a(141),q=i(M),I=a(142),z=i(I),L=a(143),W=i(L);t.alpha=o.default,t.alphaNum=r.default,t.numeric=d.default,t.between=c.default,t.email=h.default,t.ipAddress=f.default,t.macAddress=v.default,t.maxLength=w.default,t.minLength=k.default,t.required=P.default,t.requiredIf=C.default,t.requiredUnless=F.default,t.sameAs=D.default,t.url=S.default,t.or=O.default,t.and=q.default,t.minValue=z.default,t.maxValue=W.default},125:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=(0,i.regex)("alpha",/^[a-zA-Z]*$/)},126:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(30).withParams;t.default=i},127:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=(0,i.regex)("alphaNum",/^[a-zA-Z0-9]*$/)},128:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=(0,i.regex)("numeric",/^[0-9]*$/)},129:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e,t){return(0,i.withParams)({type:"between",min:e,max:t},function(a){return!(0,i.req)(a)||(!/\s/.test(a)||a instanceof Date)&&+e<=+a&&+t>=+a})}},130:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123),s=/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;t.default=(0,i.regex)("email",s)},131:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=(0,i.withParams)({type:"ipAddress"},function(e){if(!(0,i.req)(e))return!0;if("string"!=typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(s)});var s=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},132:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,i.withParams)({type:"macAddress"},function(t){if(!(0,i.req)(t))return!0;if("string"!=typeof t)return!1;var a="string"==typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==a&&(6===a.length||8===a.length)&&a.every(s)})};var s=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},133:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e){return(0,i.withParams)({type:"maxLength",max:e},function(t){return!(0,i.req)(t)||(0,i.len)(t)<=e})}},134:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e){return(0,i.withParams)({type:"minLength",min:e},function(t){return!(0,i.req)(t)||(0,i.len)(t)>=e})}},135:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=(0,i.withParams)({type:"required"},i.req)},136:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e){return(0,i.withParams)({type:"requiredIf",prop:e},function(t,a){return!(0,i.ref)(e,this,a)||(0,i.req)(t)})}},137:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e){return(0,i.withParams)({type:"requiredUnless",prop:e},function(t,a){return!!(0,i.ref)(e,this,a)||(0,i.req)(t)})}},138:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e){return(0,i.withParams)({type:"sameAs",eq:e},function(t,a){return t===(0,i.ref)(e,this,a)})}},139:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123),s=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[\/?#]\S*)?$/;t.default=(0,i.regex)("url",s)},140:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,i.withParams)({type:"or"},function(){for(var e=this,a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return t.length>0&&t.reduce(function(t,a){return t||a.apply(e,i)},!1)})}},141:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,i.withParams)({type:"and"},function(){for(var e=this,a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return t.length>0&&t.reduce(function(t,a){return t&&a.apply(e,i)},!0)})}},142:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e){return(0,i.withParams)({type:"minValue",min:e},function(t){return!(0,i.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e})}},143:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(123);t.default=function(e){return(0,i.withParams)({type:"maxValue",max:e},function(t){return!(0,i.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e})}},144:function(e,t,a){"use strict";var i=a(124),s=(a.n(i),a(7));t.a={props:["postId"],data:function(){return{comment:""}},validations:{comment:{required:i.required}},computed:Object(s.b)({newsFeedPost:function(e){return e.nfPosts.newsFeedPost}}),methods:{submitComment:function(){for(var e=this,t=this.comment.split(" "),a=0;t.length>a;a++)if(t[a].indexOf("@")>-1)var i=t[a].replace("@","");var s,o=t.join(" ");s=this.newsFeedPost.id?this.newsFeedPost.id:this.postId;var n={post_id:s,reply_username:i,body:o};this.$store.dispatch("nfPosts/postComment",n).then(function(t){e.$emit("commentSubmited"),e.comment=""}).catch(function(e){console.log(e)})}}}},145:function(e,t,a){"use strict";function i(e){a(146)}var s=a(148),o=a(6),n=i,r=o(null,s.a,!1,n,"data-v-6e487a42",null);t.a=r.exports},146:function(e,t,a){var i=a(147);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(5)("b572295c",i,!0,{})},147:function(e,t,a){t=e.exports=a(2)(!1),t.push([e.i,".a-spinner[data-v-6e487a42]{position:relative;top:0;left:50%;transform:translateX(-50%);width:10%;height:auto;margin:5% 0 3%;color:#232429}.a-spinner svg[data-v-6e487a42]{width:100%;height:100%}",""])},148:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"a-spinner"},[a("icon",{attrs:{name:"spinner",pulse:""}})],1)},s=[],o={render:i,staticRenderFns:s};t.a=o},149:function(e,t,a){"use strict";function i(e){a(150)}var s=a(144),o=a(152),n=a(6),r=i,m=n(s.a,o.a,!1,r,"data-v-aabbf3d0",null);t.a=m.exports},150:function(e,t,a){var i=a(151);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(5)("2d688158",i,!0,{})},151:function(e,t,a){t=e.exports=a(2)(!1),t.push([e.i,".m-make-comment[data-v-aabbf3d0]{position:fixed;bottom:4.1rem;left:0;width:100%;padding-top:.1rem;background-color:#fff;border-top:1px solid hsla(204,2%,59%,.5)}@media (min-width:768px){.m-make-comment[data-v-aabbf3d0]{position:absolute;bottom:0;padding-top:.5rem;padding-bottom:.2rem}}.m-make-comment svg[data-v-aabbf3d0]{width:100%;height:100%;stroke:#232429;stroke-width:.1rem;fill:#fff}@media (min-width:768px){.m-make-comment svg[data-v-aabbf3d0]{stroke-width:.2rem}}.m-make-comment[data-v-aabbf3d0] ::placeholder{color:#232429;opacity:.5}.m-make-comment[data-v-aabbf3d0] :-ms-input-placeholder,.m-make-comment[data-v-aabbf3d0] ::-ms-input-placeholder{color:#232429;opacity:.5}.m-make-comment__icon[data-v-aabbf3d0]{display:inline-block;width:3.2rem;height:3.2rem;margin-bottom:.5rem;margin-left:1.4rem}@media (min-width:768px){.m-make-comment__icon[data-v-aabbf3d0]{width:3.6rem;height:3.6rem;margin-bottom:.8rem;margin-left:3.1rem}}.m-make-comment__input[data-v-aabbf3d0]{color:#232429;position:relative;bottom:.8rem;width:68%;margin-left:.2rem;border:none;border-radius:5px}@media (max-width:767px){.m-make-comment__input[data-v-aabbf3d0]{font-size:1.6rem}}@media (min-width:768px){.m-make-comment__input[data-v-aabbf3d0]{font-size:1.6rem}}@media (max-width:767px){.m-make-comment__input[data-v-aabbf3d0]{line-height:1.9rem}}@media (min-width:768px){.m-make-comment__input[data-v-aabbf3d0]{line-height:1.9rem;width:73%;bottom:1.2rem;margin-left:.7rem}}.m-make-comment__input[data-v-aabbf3d0]:focus{background-color:#d2d2d3}.m-make-comment__submit[data-v-aabbf3d0]{position:relative;top:.2rem;width:3.5rem;height:3.5rem;background-color:transparent;cursor:pointer}@media (min-width:768px){.m-make-comment__submit[data-v-aabbf3d0]{width:3.8rem;height:3.8rem;margin-left:.4rem}}.m-make-comment__submit svg[data-v-aabbf3d0]{stroke:#fff;fill:#232429}.m-make-comment__submit[disabled][data-v-aabbf3d0],.m-make-comment__submit[disabled][data-v-aabbf3d0]:active,.m-make-comment__submit[disabled][data-v-aabbf3d0]:hover{cursor:not-allowed}.m-make-comment__submit[disabled]:active svg[data-v-aabbf3d0],.m-make-comment__submit[disabled]:hover svg[data-v-aabbf3d0],.m-make-comment__submit[disabled] svg[data-v-aabbf3d0]{fill:#ccc}.m-bar__make-comment .m-make-comment[data-v-aabbf3d0],.m-detail-bar__make-comment .m-make-comment[data-v-aabbf3d0]{opacity:0;position:absolute;bottom:-.6rem;border-top:none;border-bottom:1px solid hsla(204,2%,59%,.5)}@media (max-width:767px){.m-bar__make-comment .m-make-comment__icon[data-v-aabbf3d0],.m-detail-bar__make-comment .m-make-comment__icon[data-v-aabbf3d0]{transform:scale(.78);transition:transform .5s ease-in-out}.m-bar__make-comment .m-make-comment__icon.is-visible[data-v-aabbf3d0],.m-detail-bar__make-comment .m-make-comment__icon.is-visible[data-v-aabbf3d0]{transform:scale(1)}}@media (min-width:768px){.m-bar__make-comment .m-make-comment__icon[data-v-aabbf3d0],.m-detail-bar__make-comment .m-make-comment__icon[data-v-aabbf3d0]{width:2.5rem;height:2.5rem;margin-left:1rem;margin-bottom:.5rem}}@media (min-width:768px){.m-bar__make-comment .m-make-comment__input[data-v-aabbf3d0],.m-detail-bar__make-comment .m-make-comment__input[data-v-aabbf3d0]{width:71%;bottom:.5rem}}@media (min-width:768px){.m-bar__make-comment .m-make-comment__submit[data-v-aabbf3d0],.m-detail-bar__make-comment .m-make-comment__submit[data-v-aabbf3d0]{width:2.5rem;height:2.5rem}}@media (min-width:768px){.m-detail-bar__make-comment .m-make-comment__input[data-v-aabbf3d0]{width:82%}}",""])},152:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"o-all-comments__make-comment  m-make-comment"},[a("form",{on:{submit:function(t){t.preventDefault(),e.submitComment(t)}}},[a("div",{staticClass:"m-make-comment__icon"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"2736.636 282 25.678 23.277"}},[a("path",{staticClass:"cls-1",attrs:{id:"Union_15","data-name":"Union 15",d:"M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z",transform:"translate(2739 283)"}})])]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.comment,expression:"comment"}],staticClass:"m-make-comment__input",attrs:{type:"text",placeholder:"Comment"},domProps:{value:e.comment},on:{blur:function(t){e.$v.comment.$touch()},input:function(t){t.target.composing||(e.comment=t.target.value)}}}),e._v(" "),a("button",{staticClass:"m-make-comment__submit",attrs:{type:"submit",disabled:e.$v.$invalid}},[a("icon",{staticClass:"icon",attrs:{name:"check-circle"}})],1)])])},s=[],o={render:i,staticRenderFns:s};t.a=o},153:function(e,t,a){"use strict";(function(e){var i=a(3),s=a(11),o=a(149),n=a(7);t.a={props:["post"],mixins:[s.b,s.a],data:function(){return{newsFeedPost:this.post}},watch:{post:function(){this.newsFeedPost=this.post}},computed:Object(n.b)({token:function(e){return e.login.idToken},loggedUserId:function(e){return e.login.idUser},newsFeedPostsAll:function(e){return e.nfPosts.newsFeedPostsAll}}),methods:{openList:function(t){t.stopPropagation();var a=e(".m-media__post-edit"),i=e(t.currentTarget);a.hasClass("js-active")&&!i.hasClass("js-active")&&a.removeClass("js-active").find(".m-media__icon").slideUp(300),i.addClass("js-active").find(".m-media__icon").slideToggle(300)},deletePost:function(){var e=this,t=this.newsFeedPost.id;this.$store.dispatch("nfPosts/deletePost",t).then(function(a){var i=e.newsFeedPostsAll,s=i.map(function(e){return e.id}).indexOf(t);s>-1&&i.splice(s,1)}).catch(function(e){console.log(e)})},openMakeComment:function(t){var a=e(".m-bar__icon--comment"),i=e(t.currentTarget);if(i.hasClass("js-active"))i.next().find(".m-make-comment__icon").removeClass("is-visible"),i.next().children().animate({opacity:0,bottom:"-.6rem"},500,function(){i.next().find(".m-make-comment__input").off("focus"),i.next().hide(0),i.removeClass("js-active"),i.removeClass("is-active")});else{a.hasClass("js-active")&&(a.next().find(".m-make-comment__icon").removeClass("is-visible"),a.next().children().css({opacity:0,bottom:"-.6rem"}),a.next().find(".m-make-comment__input").off("focus"),a.next().hide(0),a.removeClass("js-active"),a.removeClass("is-active"));var s=this.newsFeedPost;this.$store.dispatch("nfPosts/changeNewsFeedPost",s),i.addClass("is-active"),i.next().show(0),i.next().find(".m-make-comment__icon").addClass("is-visible"),i.next().children().animate({opacity:1,bottom:"3.65rem"},500,function(){i.addClass("js-active"),i.next().find(".m-make-comment__input").focus()})}},refreshComments:function(){var t=this,a=e(".js-active");a.next().children().animate({opacity:0,bottom:"-.6rem"},500,function(){a.next().find(".m-make-comment__input").off("focus"),a.next().hide(0),a.removeClass("js-active"),a.removeClass("is-active")}),i.e.get(""+this.newsFeedPost.id,{headers:{Authorization:"Bearer "+this.token}}).then(function(e){var a=e.data.data,i=a.id,s=t.newsFeedPostsAll,o=s.map(function(e){return e.id}).indexOf(i),n={index:o,value:a};t.newsFeedPost=a,t.$store.dispatch("nfPosts/updateNewsFeedPostsAll",n)}).catch(function(e){console.log(e)})},unLikePost:function(){var e=this,t=this.newsFeedPost.id,a=this.newsFeedPost.auth_like_id,i={type:1,id:t,likeId:a};this.$store.dispatch("nfPosts/unLike",i).then(function(a){var i=a.data.data,s=e.newsFeedPostsAll,o=e.newsFeedPost.likes_count,n=s.map(function(e){return e.id}).indexOf(t),r=void 0;r=i?{index:n,value:{auth_like_id:i.id,likes_count:o+1}}:{index:n,value:{auth_like_id:null,likes_count:o-1}},e.$store.dispatch("nfPosts/updateNewsFeedPostsAll",r),e.newsFeedPost=s[n]}).catch(function(e){console.log(e)})}},components:{appMakeComment:o.a}}}).call(t,a(29))},155:function(e,t,a){"use strict";function i(e){a(156)}var s=a(153),o=a(158),n=a(6),r=i,m=n(s.a,o.a,!1,r,"data-v-7827b813",null);t.a=m.exports},156:function(e,t,a){var i=a(157);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(5)("161b814e",i,!0,{})},157:function(e,t,a){t=e.exports=a(2)(!1),t.push([e.i,'.o-news-feed-post[data-v-7827b813]{font-family:Roboto,sans-serif;margin-bottom:2.8rem}@media (min-width:768px){.o-news-feed-post[data-v-7827b813]{float:left;max-width:32rem;width:21.6%;flex-grow:1;overflow:hidden}.o-news-feed-post[data-v-7827b813]:not(:nth-child(4n)){margin-right:4.5%}}.o-news-feed-post img[data-v-7827b813]{width:100%;height:100%}.m-user[data-v-7827b813]{height:7.5rem}.m-user__link[data-v-7827b813]{display:inline-block;cursor:pointer}.m-user__avatar[data-v-7827b813]{float:left;width:4.4rem;height:4.4rem;margin-top:1.7rem;margin-left:1.7rem}.m-user__avatar img[data-v-7827b813]{border-radius:50%}@media (min-width:768px){.m-user__avatar[data-v-7827b813]{margin-left:0}}.m-user__username[data-v-7827b813]{color:#232429;display:inline-block;height:4rem;margin-top:1.7rem;margin-left:1rem}@media (max-width:767px){.m-user__username[data-v-7827b813]{font-size:1.4rem}}@media (min-width:768px){.m-user__username[data-v-7827b813]{font-size:2rem}}@media (max-width:767px){.m-user__username[data-v-7827b813]{line-height:4.5rem}}@media (min-width:768px){.m-user__username[data-v-7827b813]{line-height:2.4rem;margin-top:2.7rem}}.m-media[data-v-7827b813]{position:relative;width:100%;cursor:pointer}.m-media[data-v-7827b813]:after{content:"";display:block;padding-top:100%}.m-media img[data-v-7827b813],.m-media video[data-v-7827b813]{position:absolute;top:0;left:0;bottom:0;right:0}.m-media video[data-v-7827b813]{width:100%;height:100%;object-fit:fill}.m-bar[data-v-7827b813]{position:relative;height:4.2rem;border-bottom:1px solid hsla(204,2%,59%,.5);-webkit-background-clip:padding-box;background-clip:padding-box}.m-bar__icon[data-v-7827b813]{display:inline-block;width:2.5rem;height:2.5rem;margin-top:.9rem;margin-left:1.3rem;cursor:pointer}@media (min-width:768px){.m-bar__icon[data-v-7827b813]{margin-left:1rem}.m-bar__icon[data-v-7827b813]:first-child{margin-left:0}}.m-bar__icon svg[data-v-7827b813]{stroke:#232429;stroke-width:.1rem;fill:#fff}@media (min-width:768px){.m-bar__icon svg[data-v-7827b813]{stroke-width:.2rem}}.m-bar__icon--like.is-active svg[data-v-7827b813]{stroke:#09f3a2;fill:#09f3a2}.m-bar__icon--comment.is-active svg[data-v-7827b813]{stroke:#ccc;fill:#ccc}.m-bar__make-comment[data-v-7827b813]{display:none;position:absolute;right:0;width:88%}@media (min-width:768px){.m-bar__make-comment[data-v-7827b813]{width:91%}}.m-bar__info-likes[data-v-7827b813]{float:right;margin-top:1.7rem;margin-right:2rem;cursor:pointer}@media (min-width:768px){.m-bar__info-likes[data-v-7827b813]{margin-right:0}}.m-bar__info-icon[data-v-7827b813]{display:inline-block;width:1.3rem;height:1.3rem;fill:#09f3a2;margin-right:.5rem}.m-bar__likes-count[data-v-7827b813]{color:#232429;display:inline-block;vertical-align:top;opacity:.4}@media (max-width:767px){.m-bar__likes-count[data-v-7827b813]{font-size:1rem}}@media (min-width:768px){.m-bar__likes-count[data-v-7827b813]{font-size:1.6rem}}@media (max-width:767px){.m-bar__likes-count[data-v-7827b813]{line-height:1.2rem}}@media (min-width:768px){.m-bar__likes-count[data-v-7827b813]{line-height:1.1rem}}.m-media-descrpt[data-v-7827b813]{width:89%;margin:.9rem auto 1.7rem}@media (min-width:768px){.m-media-descrpt[data-v-7827b813]{width:100%;margin-top:2rem;margin-bottom:2.6rem}}.m-media-descrpt__avatar[data-v-7827b813]{float:left;width:1.8rem;height:1.8rem;cursor:pointer}.m-media-descrpt__avatar img[data-v-7827b813]{border-radius:50%}@media (min-width:768px){.m-media-descrpt__avatar[data-v-7827b813]{width:3.2rem;height:3.2rem}}.m-media-descrpt__txt[data-v-7827b813]{width:90%;color:#232429;display:inline-block;margin-top:.3rem;margin-left:1rem}@media (max-width:767px){.m-media-descrpt__txt[data-v-7827b813]{font-size:1rem}}@media (min-width:768px){.m-media-descrpt__txt[data-v-7827b813]{font-size:1.6rem}}@media (max-width:767px){.m-media-descrpt__txt[data-v-7827b813]{line-height:1.2rem}}@media (min-width:768px){.m-media-descrpt__txt[data-v-7827b813]{line-height:1.9rem;width:83%;margin-top:.7rem;margin-left:.7rem}}.m-comments[data-v-7827b813]{width:89%;margin:0 auto}@media (min-width:768px){.m-comments[data-v-7827b813]{width:100%}}.m-comments__comment-block[data-v-7827b813]{margin-top:.9rem;margin-bottom:1.7rem}@media (min-width:768px){.m-comments__comment-block[data-v-7827b813]{margin-top:2rem;margin-bottom:2.6rem}}.m-comments__avatar[data-v-7827b813]{float:left;width:1.8rem;height:1.8rem;cursor:pointer}.m-comments__avatar img[data-v-7827b813]{border-radius:50%}@media (min-width:768px){.m-comments__avatar[data-v-7827b813]{width:3.2rem;height:3.2rem}}.m-comments__txt[data-v-7827b813]{width:90%;color:#232429;display:inline-block;margin-top:.3rem;margin-left:1rem}@media (max-width:767px){.m-comments__txt[data-v-7827b813]{font-size:1rem}}@media (min-width:768px){.m-comments__txt[data-v-7827b813]{font-size:1.6rem}}@media (max-width:767px){.m-comments__txt[data-v-7827b813]{line-height:1.2rem}}@media (min-width:768px){.m-comments__txt[data-v-7827b813]{line-height:1.9rem;width:83%;margin-top:.7rem;margin-left:.7rem}}.m-comments__txt span[data-v-7827b813]{font-family:Roboto-Bold,sans-serif;color:blue;cursor:pointer}.m-comments__view-all[data-v-7827b813]{color:#232429;opacity:.5;cursor:pointer}@media (max-width:767px){.m-comments__view-all[data-v-7827b813]{font-size:1rem}}@media (min-width:768px){.m-comments__view-all[data-v-7827b813]{font-size:1.4rem}}@media (max-width:767px){.m-comments__view-all[data-v-7827b813]{line-height:1.2rem}}@media (min-width:768px){.m-comments__view-all[data-v-7827b813]{line-height:1.7rem;margin-left:.5rem}}@media (max-width:767px){.o-user__posts-wrapper.grid-view .o-news-feed-post[data-v-7827b813]{float:left;width:33%;margin-bottom:.5%}.o-user__posts-wrapper.grid-view .o-news-feed-post[data-v-7827b813]:not(:nth-child(3n)){margin-right:.5%}.o-user__posts-wrapper.grid-view .o-news-feed-post__bar[data-v-7827b813],.o-user__posts-wrapper.grid-view .o-news-feed-post__comments[data-v-7827b813],.o-user__posts-wrapper.grid-view .o-news-feed-post__media-descrpt[data-v-7827b813]{display:none}}',""])},158:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"o-news-feed-post"},["homepage"===e.$route.name||"photo"===e.$route.name||"comments"===e.$route.name||"likes"===e.$route.name?a("div",{staticClass:"o-news-feed-post__user  m-user"},[a("router-link",{staticClass:"m-user__link",attrs:{to:{name:"user",params:{userId:e.newsFeedPost.user_id}},tag:"div"}},[a("div",{staticClass:"m-user__avatar"},[a("img",{attrs:{src:e.storage+e.newsFeedPost.user_image.avatar,alt:"avatar"}})]),e._v(" "),a("p",{staticClass:"m-user__username"},[e._v(e._s(e.newsFeedPost.username))])])],1):e._e(),e._v(" "),"homepage"===e.$route.name||"photo"===e.$route.name||"comments"===e.$route.name||"likes"===e.$route.name?a("router-link",{staticClass:"o-news-feed-post__media  m-media",attrs:{to:{name:"photo",params:{postId:e.newsFeedPost.id}},tag:"div"}},[1==e.newsFeedPost.type_id?[a("img",{attrs:{src:e.storage+e.newsFeedPost.media.large,alt:"news feed post image"}})]:[a("video",{attrs:{controls:""}},[a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/mp4"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/flv"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/wmv"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/avi"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/mpeg"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/qt"}})])]],2):e._e(),e._v(" "),"user"===e.$route.name||"photo-detail"===e.$route.name||"comments-view"===e.$route.name||"likes-view"===e.$route.name||"upload"===e.$route.name?a("router-link",{staticClass:"o-news-feed-post__media  m-media",attrs:{to:{name:"photo-detail",params:{postId:e.newsFeedPost.id}},tag:"div"}},[e.$route.params.userId==e.loggedUserId?a("ul",{staticClass:"m-media__post-edit  c-post-edit",on:{click:e.openList}},[a("icon",{staticClass:"icon",attrs:{name:"ellipsis-h"}}),e._v(" "),a("router-link",{staticClass:"m-media__icon  m-media__icon--edit  c-post-edit__icon  c-post-edit__icon--edit",attrs:{to:{name:"edit-post",params:{postId:e.newsFeedPost.id}},tag:"li"}},[a("icon",{staticClass:"icon",attrs:{name:"edit"}})],1),e._v(" "),a("li",{staticClass:"m-media__icon  m-media__icon--delete  c-post-edit__icon  c-post-edit__icon--delete",on:{click:e.deletePost}},[a("icon",{staticClass:"icon",attrs:{name:"trash-o"}})],1)],1):e._e(),e._v(" "),1==e.newsFeedPost.type_id?[a("img",{attrs:{src:e.storage+e.newsFeedPost.media.large,alt:"news feed post image"}})]:[a("video",{attrs:{controls:""}},[a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/mp4"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/flv"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/wmv"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/avi"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/mpeg"}}),e._v(" "),a("source",{attrs:{src:e.storage+e.newsFeedPost.media,type:"video/qt"}})])]],2):e._e(),e._v(" "),a("div",{staticClass:"o-news-feed-post__bar  m-bar"},[a("div",{staticClass:"m-bar__icon  m-bar__icon--like",class:{"is-active":e.newsFeedPost.auth_like_id},on:{click:e.unLikePost}},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"2700.998 281.935 22.901 23.092"}},[a("path",{staticClass:"cls-1",attrs:{id:"Path_79","data-name":"Path 79",d:"M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z",transform:"translate(2702.004 283.205)"}})])]),e._v(" "),a("div",{staticClass:"m-bar__icon  m-bar__icon--comment",on:{click:function(t){t.stopPropagation(),e.openMakeComment(t)}}},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"2736.636 282 25.678 23.277"}},[a("path",{staticClass:"cls-1",attrs:{id:"Union_15","data-name":"Union 15",d:"M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z",transform:"translate(2739 283)"}})])]),e._v(" "),a("div",{staticClass:"m-bar__make-comment"},[a("app-make-comment",{on:{commentSubmited:e.refreshComments}})],1),e._v(" "),"homepage"===e.$route.name||"photo"===e.$route.name||"comments"===e.$route.name||"likes"===e.$route.name?a("router-link",{staticClass:"m-bar__info-likes",attrs:{to:{name:"likes",params:{postId:e.newsFeedPost.id,typeId:1}},tag:"div"}},[a("div",{staticClass:"m-bar__info-icon"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"2700.998 281.935 22.901 23.092"}},[a("path",{staticClass:"cls-1",attrs:{id:"Path_79","data-name":"Path 79",d:"M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z",transform:"translate(2702.004 283.205)"}})])]),e._v(" "),a("p",{staticClass:"m-bar__likes-count"},[e._v(e._s(e.newsFeedPost.likes_count))])]):e._e(),e._v(" "),"user"===e.$route.name||"photo-detail"===e.$route.name||"comments-view"===e.$route.name||"likes-view"===e.$route.name||"upload"===e.$route.name?a("router-link",{staticClass:"m-bar__info-likes",attrs:{to:{name:"likes-view",params:{postId:e.newsFeedPost.id,typeId:1}},tag:"div"}},[a("div",{staticClass:"m-bar__info-icon"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"2700.998 281.935 22.901 23.092"}},[a("path",{staticClass:"cls-1",attrs:{id:"Path_79","data-name":"Path 79",d:"M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z",transform:"translate(2702.004 283.205)"}})])]),e._v(" "),a("p",{staticClass:"m-bar__likes-count"},[e._v(e._s(e.newsFeedPost.likes_count))])]):e._e()],1),e._v(" "),e.newsFeedPost.description?a("div",{staticClass:"o-news-feed-post__media-descrpt  m-media-descrpt"},[a("router-link",{staticClass:"m-media-descrpt__avatar",attrs:{to:{name:"user",params:{userId:e.newsFeedPost.user_id}},tag:"div"}},[a("img",{attrs:{src:e.storage+e.newsFeedPost.user_image.avatar,alt:"this user avatar"}})]),e._v(" "),a("p",{staticClass:"m-media-descrpt__txt"},[e._v(e._s(e.newsFeedPost.description))])],1):e._e(),e._v(" "),e.newsFeedPost.comments_count>=0?a("div",{staticClass:"o-news-feed-post__comments  m-comments"},[e._l(e.newsFeedPost.comments,function(t,i){return i<1?a("div",{key:t.id,staticClass:"m-comments__comment-block"},[a("router-link",{staticClass:"m-comments__avatar",attrs:{to:{name:"user",params:{userId:t.user_id}},tag:"div"}},[a("img",{attrs:{src:e.storage+t.user_image.avatar,alt:"user avatar that made this comment"}})]),e._v(" "),a("p",{staticClass:"m-comments__txt"},[t.reply_username?a("router-link",{attrs:{to:{name:"user",params:{userId:t.reply_user_id}},tag:"span"}},[e._v("\n\t\t\t\t\t\t@"+e._s(t.reply_username)+"\n\t\t\t\t\t")]):e._e(),e._v(" "),t.reply_username?[e._v("\n\t\t\t\t\t\t"+e._s(t.body.replace(t.body.match(new RegExp("@"+t.reply_username,"i")),""))+"\n\t\t\t\t\t")]:[e._v("\n\t\t\t\t\t\t"+e._s(t.body)+"\n\t\t\t\t\t")]],2)],1):e._e()}),e._v(" "),("homepage"===e.$route.name||"photo"===e.$route.name||"comments"===e.$route.name||"likes"===e.$route.name)&&e.newsFeedPost.comments_count>0?a("router-link",{staticClass:"m-comments__view-all",attrs:{to:{name:"comments",params:{postId:e.newsFeedPost.id}},tag:"span"}},[e._v("view all comments")]):e._e(),e._v(" "),("user"===e.$route.name||"photo-detail"===e.$route.name||"comments-view"===e.$route.name||"likes-view"===e.$route.name||"upload"===e.$route.name)&&e.newsFeedPost.comments_count>0?a("router-link",{staticClass:"m-comments__view-all",attrs:{to:{name:"comments-view",params:{postId:e.newsFeedPost.id}},tag:"span"}},[e._v("view all comments")]):e._e()],2):e._e()],1)},s=[],o={render:i,staticRenderFns:s};t.a=o},165:function(e,t,a){"use strict";(function(e){var i=a(3),s=a(11),o=a(155),n=a(145),r=a(7);t.a={mixins:[s.a],data:function(){return{followedUsersPosts:[],postDetailView:!1,allCommentsView:!1,likesView:!1,loading:!1,infScrollDisable:!1,postAmount:8,postPage:1}},computed:Object(r.b)({token:function(e){return e.login.idToken},newsFeedPostsAll:function(e){return e.nfPosts.newsFeedPostsAll}}),watch:{"$route.name":function(){switch(this.$route.name){case"photo":this.windowWidth>this.breakpoint&&e("body").addClass("u-overflow-disabled"),this.infScrollDisable||(this.infScrollDisable=!this.infScrollDisable),this.allCommentsView&&(this.allCommentsView=!this.allCommentsView),this.likesView&&(this.likesView=!this.likesView),this.postDetailView=!this.postDetailView,this.$store.dispatch("headings/actSetHeading","Photo");break;case"comments":this.windowWidth>this.breakpoint&&e("body").addClass("u-overflow-disabled"),this.infScrollDisable||(this.infScrollDisable=!this.infScrollDisable),this.postDetailView&&(this.postDetailView=!this.postDetailView),this.likesView&&(this.likesView=!this.likesView),this.allCommentsView=!this.allCommentsView,this.$store.dispatch("headings/actSetHeading","Comments");break;case"likes":this.windowWidth>this.breakpoint&&e("body").addClass("u-overflow-disabled"),this.infScrollDisable||(this.infScrollDisable=!this.infScrollDisable),this.postDetailView&&(this.postDetailView=!this.postDetailView),this.allCommentsView&&(this.allCommentsView=!this.allCommentsView),this.likesView=!this.likesView,this.$store.dispatch("headings/actSetHeading","Likes");break;case"homepage":this.windowWidth>this.breakpoint&&e("body").removeClass("u-overflow-disabled"),this.infScrollDisable&&(this.infScrollDisable=!this.infScrollDisable),this.postDetailView?this.postDetailView=!this.postDetailView:this.allCommentsView?this.allCommentsView=!this.allCommentsView:this.likesView&&(this.likesView=!this.likesView),this.$store.dispatch("headings/actSetHeading","photogram")}}},methods:{axiosGetPosts:function(){var e=this;this.loading=!0,this.infScrollDisable=!0,i.e.get("",{headers:{Authorization:"Bearer "+this.token},params:{amount:this.postAmount,page:this.postPage,news_feed:1}}).then(function(t){if(t.data.data.length>0){for(var a=0;a<t.data.data.length;a++)e.followedUsersPosts.push(t.data.data[a]);e.postPage++,e.$store.dispatch("nfPosts/pushNewsFeedPostsAll",e.followedUsersPosts),e.infScrollDisable=!1,e.loading=!1}else e.loading=!1,console.log("empty array")})}},components:{appNewsFeedPost:o.a,appSpinner:n.a},beforeCreate:function(){this.$store.dispatch("nfPosts/pushNewsFeedPostsAll",[])},created:function(){switch(this.$route.name){case"photo":this.windowWidth>this.breakpoint&&(e("body").addClass("u-overflow-disabled"),this.axiosGetPosts()),this.infScrollDisable||(this.infScrollDisable=!this.infScrollDisable),this.allCommentsView&&(this.allCommentsView=!this.allCommentsView),this.likesView&&(this.likesView=!this.likesView),this.postDetailView=!this.postDetailView,this.$store.dispatch("headings/actSetHeading","Photo");break;case"comments":this.windowWidth>this.breakpoint&&(e("body").addClass("u-overflow-disabled"),this.axiosGetPosts()),this.infScrollDisable||(this.infScrollDisable=!this.infScrollDisable),this.postDetailView&&(this.postDetailView=!this.postDetailView),this.likesView&&(this.likesView=!this.likesView),this.allCommentsView=!this.allCommentsView,this.$store.dispatch("headings/actSetHeading","Comments");break;case"likes":this.windowWidth>this.breakpoint&&(e("body").addClass("u-overflow-disabled"),this.axiosGetPosts()),this.infScrollDisable||(this.infScrollDisable=!this.infScrollDisable),this.postDetailView&&(this.postDetailView=!this.postDetailView),this.allCommentsView&&(this.allCommentsView=!this.allCommentsView),this.likesView=!this.likesView,this.$store.dispatch("headings/actSetHeading","Likes");break;case"homepage":this.windowWidth>this.breakpoint&&e("body").removeClass("u-overflow-disabled"),this.infScrollDisable&&(this.infScrollDisable=!this.infScrollDisable),this.postDetailView?this.postDetailView=!this.postDetailView:this.allCommentsView?this.allCommentsView=!this.allCommentsView:this.likesView&&(this.likesView=!this.likesView),this.$store.dispatch("headings/actSetHeading","photogram")}},destroyed:function(){this.$store.dispatch("nfPosts/pushNewsFeedPostsAll",[])}}}).call(t,a(29))},184:function(e,t,a){var i=a(185);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(5)("158e3b28",i,!0,{})},185:function(e,t,a){t=e.exports=a(2)(!1),t.push([e.i,".o-homepage[data-v-b51fb64a]{width:100%;height:100vh;background-color:#fff}.o-homepage__content[data-v-b51fb64a]{overflow:hidden;padding-top:4.76rem;padding-bottom:4.2rem}@media (min-width:768px){.o-homepage__content[data-v-b51fb64a]{width:148rem;margin:0 auto;padding-top:13.7rem}}@media (min-width:768px){.o-homepage__posts-wrapper[data-v-b51fb64a]{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-wrap:wrap}}",""])},186:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"o-homepage  u-clearfix"},[a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.axiosGetPosts,expression:"axiosGetPosts"}],staticClass:"o-homepage__content",attrs:{"infinite-scroll-disabled":"infScrollDisable","infinite-scroll-distance":e.windowHeight/3}},[!e.postDetailView&&!e.allCommentsView&&!e.likesView||e.windowWidth>e.breakpoint?a("div",{staticClass:"o-homepage__posts-wrapper"},e._l(e.newsFeedPostsAll,function(e,t){return a("app-news-feed-post",{key:e.id+"-"+t,attrs:{post:e}})})):e._e(),e._v(" "),a("transition",{attrs:{mode:"out-in","enter-active-class":"animated fadeIn"}},[e.postDetailView&&e.windowWidth<e.breakpoint?a("router-view"):e._e()],1),e._v(" "),e.allCommentsView&&e.windowWidth<e.breakpoint?a("router-view"):e._e(),e._v(" "),e.likesView&&e.windowWidth<e.breakpoint?a("router-view"):e._e(),e._v(" "),a("transition",{attrs:{mode:"out-in","enter-active-class":"animated slideInLeft","leave-active-class":"animated slideOutRight"}},[e.postDetailView&&e.windowWidth>e.breakpoint?a("router-view"):e._e()],1),e._v(" "),a("transition",{attrs:{mode:"out-in","enter-active-class":"animated slideInLeft","leave-active-class":"animated slideOutRight"}},[e.allCommentsView&&e.windowWidth>e.breakpoint?a("router-view"):e._e()],1),e._v(" "),a("transition",{attrs:{mode:"out-in","enter-active-class":"animated slideInLeft","leave-active-class":"animated slideOutRight"}},[e.likesView&&e.windowWidth>e.breakpoint?a("router-view"):e._e()],1),e._v(" "),e.loading?a("app-spinner"):e._e()],1)])},s=[],o={render:i,staticRenderFns:s};t.a=o},34:function(e,t,a){"use strict";function i(e){a(184)}Object.defineProperty(t,"__esModule",{value:!0});var s=a(165),o=a(186),n=a(6),r=i,m=n(s.a,o.a,!1,r,"data-v-b51fb64a",null);t.default=m.exports}});
//# sourceMappingURL=1.build.js.map