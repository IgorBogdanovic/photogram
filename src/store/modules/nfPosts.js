import router from '../../router'

export const nfPosts = {
  namespaced: true,
  
  state: {
    postDetail: false,
    newsFeedPostsAll: [],
    newsFeedPost: {},
    infScrollDisable: false
  },

  mutations: {
    setNewsFeedPostsAll(state, postsAll) {
      state.newsFeedPostsAll = postsAll;
    },
    setNewsFeedPost(state, post) {
      state.newsFeedPost = post;
    },
    statusPostDetail(state) {
      state.postDetail = !state.postDetail;
    },
    statusInfScrollDisable(state) {
      state.infScrollDisable = !state.infScrollDisable;
    }
  },

  actions: {
    pushNewsFeedPostsAll({commit}, postsAll) {
      commit('setNewsFeedPostsAll', postsAll);
    },
    changeNewsFeedPost({commit}, post) {
      commit('setNewsFeedPost', post);
    },
    changePostDetail({commit}) {
      commit('statusPostDetail');
    },
    changeInfScrollDisable({commit}) {
      commit('statusInfScrollDisable');
    }
  },

  getters: {
    postDetail(state) {
      return state.postDetail;
    },
    newsFeedPostsAll(state) {
      return state.newsFeedPostsAll;
    },
    newsFeedPost(state) {
      return state.newsFeedPost;
    },
    infScrollDisable(state) {
      return state.infScrollDisable;
    }
  }
};
