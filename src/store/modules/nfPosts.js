import router from '../../router'
import { comments } from '../../axios-urls'

export const nfPosts = {
  namespaced: true,
  
  state: {
    postDetail: false,
    allComments: false,
    allCommentsPostDetail: false,
    newsFeedPostsAll: [],
    newsFeedPost: {},
    postCommentsAll: [],
    infScrollDisable: false
  },

  mutations: {
    setNewsFeedPostsAll(state, postsAll) {
      state.newsFeedPostsAll = postsAll;
    },
    changeNewsFeedPostsAll(state, post) {
      state.newsFeedPostsAll[post.index] = post.post;
    },
    setNewsFeedPost(state, post) {
      state.newsFeedPost = post;
    },
    setPostCommentsAll(state, comments) {
      state.postCommentsAll = comments;
    },
    statusPostDetail(state) {
      state.postDetail = !state.postDetail;
    },
    statusAllComments(state) {
      state.allComments = !state.allComments;
    },
    statusAllCommentsPostDetail(state) {
      state.allCommentsPostDetail = !state.allCommentsPostDetail;
    },
    statusInfScrollDisable(state) {
      state.infScrollDisable = !state.infScrollDisable;
    }
  },

  actions: {
    pushNewsFeedPostsAll({commit}, postsAll) {
      commit('setNewsFeedPostsAll', postsAll);
    },
    updateNewsFeedPostsAll({commit}, post) {
      commit('changeNewsFeedPostsAll', post);
    },
    changeNewsFeedPost({commit}, post) {
      commit('setNewsFeedPost', post);
    },
    pushPostCommentsAll({commit}, comments) {
      commit('setPostCommentsAll', comments);
    },
    changePostDetail({commit}) {
      commit('statusPostDetail');
    },
    changeAllComments({commit}) {
      commit('statusAllComments');
    },
    changeAllCommentsPostDetail({commit}) {
      commit('statusAllCommentsPostDetail');
    },
    changeInfScrollDisable({commit}) {
      commit('statusInfScrollDisable');
    },
    postComment({commit}, data) {
      const token = localStorage.getItem('token');
      comments.post('', { post_id: data.post_id, body: data.body },
      { headers: { Authorization: 'Bearer ' + token } })
        .then(res => {
          // console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  getters: {
    postDetail(state) {
      return state.postDetail;
    },
    allComments(state) {
      return state.allComments;
    },
    allCommentsPostDetail(state) {
      return state.allCommentsPostDetail;
    },
    newsFeedPostsAll(state) {
      return state.newsFeedPostsAll;
    },
    newsFeedPost(state) {
      return state.newsFeedPost;
    },
    postCommentsAll(state) {
      return state.postCommentsAll;
    },
    infScrollDisable(state) {
      return state.infScrollDisable;
    }
  }
};
