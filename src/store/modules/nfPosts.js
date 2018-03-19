import router from '../../router'
import { posts, comments, likes } from '../../axios-urls'

export const nfPosts = {
  namespaced: true,
  
  state: {
    newsFeedPostsAll: [],
    newsFeedPost: {},
    user: {},
    postCommentsAll: []
  },

  mutations: {
    setNewsFeedPostsAll(state, postsAll) {
      state.newsFeedPostsAll = postsAll;
    },
    changeNewsFeedPostsAll(state, post) {
      const i = Object.keys(state.newsFeedPostsAll[post.index]).length;
      const j = Object.keys(post.value).length;
      if (i > j) {
        for (let prop in post.value) {
          state.newsFeedPostsAll[post.index][prop] = post.value[prop];
        }
      } else state.newsFeedPostsAll[post.index] = post.value;
    },
    setNewsFeedPost(state, post) {
      state.newsFeedPost = post;
    },
    setUser(state, user) {
      state.user = user;
    },
    setPostCommentsAll(state, comments) {
      state.postCommentsAll = comments;
    },
    changePostCommentsAll(state, comment) {
      const i = Object.keys(state.postCommentsAll[comment.index]).length;
      const j = Object.keys(comment.value).length;
      if (i > j) {
        for (let prop in comment.value) {
          state.postCommentsAll[comment.index][prop] = comment.value[prop];
        }
      } else state.postCommentsAll[comment.index] = comment.value;
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
    changeUser({commit}, user) {
      commit('setUser', user);
    },
    pushPostCommentsAll({commit}, comments) {
      commit('setPostCommentsAll', comments);
    },
    updatePostCommentsAll({commit}, comment) {
      commit('changePostCommentsAll', comment);
    },
    postComment({commit}, data) {
      const token = localStorage.getItem('token');
      return comments.post('', { post_id: data.post_id, body: data.body },
        { headers: { Authorization: 'Bearer ' + token } });
    },
    postPost({commit}, data) {
      const token = localStorage.getItem('token');
      return posts.post('', data, { headers: { Authorization: 'Bearer ' + token } });
    },
    deleteComment({commit}, commentId) {
      const token = localStorage.getItem('token');
      return comments.delete('' + commentId, { headers: { Authorization: 'Bearer ' + token } });
    },
    unLike({commit, dispatch, state}, data) {
      const token = localStorage.getItem('token');
      if (data.likeId) {
        return likes.delete('' + data.likeId, { headers: { Authorization: 'Bearer ' + token } });
      } else {
        return likes.post('', { likable_id: data.id, likable_type: data.type },
          { headers: { Authorization: 'Bearer ' + token } });
      }
    }
  },

  getters: {
    newsFeedPostsAll(state) {
      return state.newsFeedPostsAll;
    },
    newsFeedPost(state) {
      return state.newsFeedPost;
    },
    user(state) {
      return state.user;
    },
    postCommentsAll(state) {
      return state.postCommentsAll;
    }
  }
};
