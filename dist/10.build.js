webpackJsonp([10],{145:function(t,e,i){"use strict";function a(t){i(146)}var s=i(148),n=i(6),o=a,r=n(null,s.a,!1,o,"data-v-6e487a42",null);e.a=r.exports},146:function(t,e,i){var a=i(147);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(5)("b572295c",a,!0,{})},147:function(t,e,i){e=t.exports=i(2)(!1),e.push([t.i,".a-spinner[data-v-6e487a42]{position:relative;top:0;left:50%;transform:translateX(-50%);width:10%;height:auto;margin:5% 0 3%;color:#232429}.a-spinner svg[data-v-6e487a42]{width:100%;height:100%}",""])},148:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"a-spinner"},[i("icon",{attrs:{name:"spinner",pulse:""}})],1)},s=[],n={render:a,staticRenderFns:s};e.a=n},169:function(t,e,i){"use strict";var a=i(3),s=i(10),n=i(198),o=i(145);e.a={props:["postId","typeId"],mixins:[s.a],data:function(){return{likes:[],loading:!1,infScrollDisable:!1,likesAmount:15,likesPage:1}},computed:{token:function(){return this.$store.getters["login/token"]},newsFeedPost:function(){return this.$store.getters["nfPosts/newsFeedPost"]},likesAll:function(){return this.$store.getters["nfPosts/likesAll"]}},methods:{axiosGetLikes:function(){var t=this;this.loading=!0,this.infScrollDisable=!0,a.c.get("",{headers:{Authorization:"Bearer "+this.token},params:{likable_id:this.postId,likable_type:this.typeId,amount:this.likesAmount,page:this.likesPage}}).then(function(e){if(e.data.data.length>0){for(var i=0;i<e.data.data.length;i++)t.likes.push(e.data.data[i]);t.likesPage++,t.$store.dispatch("nfPosts/pushLikes",t.likes),t.loading=!1,t.infScrollDisable=!1}else t.loading=!1,t.infScrollDisable=!0,console.log("empty array")})},closeLikes:function(){var t=this;setTimeout(function(){t.$store.dispatch("nfPosts/pushLikes",[])},500)}},components:{appLike:n.a,appSpinner:o.a},created:function(){this.windowWidth>this.breakpoint?this.$store.dispatch("headings/actSetHeading","photogram"):this.$store.dispatch("headings/actSetHeading","Likes")},destroyed:function(){this.$store.dispatch("nfPosts/pushLikes",[])}}},170:function(t,e,i){"use strict";var a=i(10);e.a={mixins:[a.b],props:["likeObj"],data:function(){return{like:this.likeObj}},computed:{token:function(){return this.$store.getters["login/token"]},loggedUserId:function(){return this.$store.getters["login/idUser"]}},methods:{followUser:function(){var t=this,e=this.like.id;this.$store.dispatch("nfPosts/followUser",e).then(function(e){t.like.auth_follow=!0}).catch(function(t){console.log(t)})},unfollowUser:function(){var t=this,e=this.like.id;this.$store.dispatch("nfPosts/unfollowUser",e).then(function(e){t.like.auth_follow=!1}).catch(function(t){console.log(t)})}}}},196:function(t,e,i){var a=i(197);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(5)("640d128e",a,!0,{})},197:function(t,e,i){e=t.exports=i(2)(!1),e.push([t.i,".o-likes[data-v-40a9337b]{font-family:Roboto,sans-serif;width:100%;height:100%;z-index:9}@media (min-width:768px){.o-likes[data-v-40a9337b]{position:fixed;top:0;left:0;background-color:rgba(35,36,41,.9)}}.o-likes__wrapper--main[data-v-40a9337b]{background-color:#fff}@media (min-width:768px){.o-likes__wrapper--main[data-v-40a9337b]{position:absolute;width:57rem;height:74vh;top:55%;left:50%;transform:translate(-50%,-50%)}}@media (min-width:768px){.o-likes__wrapper--sub[data-v-40a9337b]{position:absolute;width:57rem;height:74vh;overflow-y:auto}}.o-likes__close[data-v-40a9337b]{position:absolute;width:4rem;height:4rem;color:#fff;top:-5%;right:-7%;cursor:pointer}.o-likes__close svg[data-v-40a9337b]{width:100%;height:100%}",""])},198:function(t,e,i){"use strict";function a(t){i(199)}var s=i(170),n=i(201),o=i(6),r=a,l=o(s.a,n.a,!1,r,"data-v-332e18f1",null);e.a=l.exports},199:function(t,e,i){var a=i(200);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(5)("3262d11e",a,!0,{})},200:function(t,e,i){e=t.exports=i(2)(!1),e.push([t.i,".m-like[data-v-332e18f1]:last-child{margin-bottom:1rem}@media (min-width:768px){.m-like[data-v-332e18f1]:last-child{margin-bottom:4rem}}.m-like__user-img[data-v-332e18f1]{display:inline-block;width:4.1rem;height:4.1rem;margin-top:.9rem;margin-left:1.5rem;cursor:pointer}@media (min-width:768px){.m-like__user-img[data-v-332e18f1]{width:4.6rem;height:4.6rem;margin-top:4.8rem;margin-left:3.5rem}}.m-like__user-img img[data-v-332e18f1]{width:100%;height:100%;border-radius:50%}.m-like__content[data-v-332e18f1]{display:inline-block;width:55%;margin-top:2.2rem;margin-left:.6rem;vertical-align:top}@media (max-width:767px){.m-like__content[data-v-332e18f1]{font-size:1.4rem}}@media (min-width:768px){.m-like__content[data-v-332e18f1]{font-size:1.6rem}}@media (max-width:767px){.m-like__content[data-v-332e18f1]{line-height:1.7rem}}@media (min-width:768px){.m-like__content[data-v-332e18f1]{line-height:1.9rem;width:60%;margin-top:6rem}}.m-like__username[data-v-332e18f1]{font-family:Roboto-Bold,sans-serif;cursor:pointer}.m-like__txt[data-v-332e18f1]{display:inline}.m-like__button[data-v-332e18f1]{float:right;padding-top:1.7rem;padding-right:1rem}@media (min-width:768px){.m-like__button[data-v-332e18f1]{padding-top:5.1rem;padding-right:2rem}}.m-like__btn[data-v-332e18f1]{font-family:Roboto,sans-serif;color:#fff;border-radius:30px;cursor:pointer}@media (max-width:767px){.m-like__btn[data-v-332e18f1]{font-size:1rem}}@media (min-width:768px){.m-like__btn[data-v-332e18f1]{font-size:2rem}}@media (max-width:767px){.m-like__btn[data-v-332e18f1]{line-height:1.2rem}}@media (min-width:768px){.m-like__btn[data-v-332e18f1]{line-height:2.4rem}}.m-like__btn--follow[data-v-332e18f1]{background-color:#232429;padding:.5rem 1.4rem}@media (min-width:768px){.m-like__btn--follow[data-v-332e18f1]{padding:.5rem 2rem}}.m-like__btn--unfollow[data-v-332e18f1]{background-color:#95989a;padding:.5rem .9rem}",""])},201:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"m-like"},[i("router-link",{staticClass:"m-like__user-img",attrs:{to:{name:"user",params:{userId:t.like.id}},tag:"div"}},[i("img",{attrs:{src:t.storage+t.like.image.avatar,alt:"user avatar that made this comment"}})]),t._v(" "),i("div",{staticClass:"m-like__content"},[i("router-link",{staticClass:"m-like__username",attrs:{to:{name:"user",params:{userId:t.like.id}},tag:"span"}},[t._v("\n            "+t._s(t.like.username)+"\n        ")]),t._v(" "),i("p",{staticClass:"m-like__txt"},[t._v("liked this post")])],1),t._v(" "),i("div",{staticClass:"m-like__button"},[t.like.auth_follow||t.like.id==t.loggedUserId?t._e():i("button",{staticClass:"m-like__btn  m-like__btn--follow",attrs:{type:"button"},on:{click:t.followUser}},[t._v("Follow")]),t._v(" "),t.like.auth_follow?i("button",{staticClass:"m-like__btn  m-like__btn--unfollow",attrs:{type:"button"},on:{click:t.unfollowUser}},[t._v("Unfollow")]):t._e()])],1)},s=[],n={render:a,staticRenderFns:s};e.a=n},202:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"o-likes"},[i("div",{staticClass:"o-likes__wrapper--main"},[i("a",{staticClass:"o-likes__close  u-only-desktop",attrs:{href:"javascript:history.go(-1)"},on:{click:t.closeLikes}},[i("icon",{staticClass:"icon",attrs:{name:"close"}})],1),t._v(" "),i("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.axiosGetLikes,expression:"axiosGetLikes"}],staticClass:"o-likes__wrapper--sub",attrs:{"infinite-scroll-disabled":"infScrollDisable","infinite-scroll-distance":t.windowHeight/3}},[t._l(t.likesAll,function(t,e){return i("app-like",{key:t.id+"-"+e,staticClass:"o-likes__like",attrs:{likeObj:t}})}),t._v(" "),t.loading?i("app-spinner"):t._e()],2)])])},s=[],n={render:a,staticRenderFns:s};e.a=n},37:function(t,e,i){"use strict";function a(t){i(196)}Object.defineProperty(e,"__esModule",{value:!0});var s=i(169),n=i(202),o=i(6),r=a,l=o(s.a,n.a,!1,r,"data-v-40a9337b",null);e.default=l.exports}});
//# sourceMappingURL=10.build.js.map