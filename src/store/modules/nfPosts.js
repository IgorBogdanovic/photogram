import router from '../../router';
import { posts, comments, likes, followers } from '../../axios-urls';

export const nfPosts = {
  namespaced: true,
  
  state: {
    newsFeedPostsAll: [],
    newsFeedPost: {},
    user: {},
    postCommentsAll: [],
    likesAll: []
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
      const i = Object.keys(state.user).length;
      const j = Object.keys(user).length;
      if (i > j) {
        for (let prop in user) {
          state.user[prop] = user[prop];
        }
      } else state.user = user;
    },
    setPostCommentsAll(state, comments) {
      state.postCommentsAll = comments;
    },
    setLikes(state, likes) {
      state.likesAll = likes;
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
    pushLikes({commit}, likes) {
      commit('setLikes', likes);
    },
    updatePostCommentsAll({commit}, comment) {
      commit('changePostCommentsAll', comment);
    },
    postComment({commit}, data) {
      const token = localStorage.getItem('token');
      if (data.reply_username) {
        return comments.post('', { post_id: data.post_id, reply_username: data.reply_username, body: data.body },
        { headers: { Authorization: 'Bearer ' + token } });
      } else {
        return comments.post('', { post_id: data.post_id, body: data.body },
        { headers: { Authorization: 'Bearer ' + token } });
      }
    },
    postPost({commit}, data) {
      const token = localStorage.getItem('token');
      return posts.post('', data, { headers: { Authorization: 'Bearer ' + token } });
    },
    deleteComment({commit}, commentId) {
      const token = localStorage.getItem('token');
      return comments.delete('' + commentId, { headers: { Authorization: 'Bearer ' + token } });
    },
    deletePost({commit}, postId) {
      const token = localStorage.getItem('token');
      return posts.delete('' + postId, { headers: { Authorization: 'Bearer ' + token } });
    },
    unLike({commit, dispatch, state}, data) {
      const token = localStorage.getItem('token');
      if (data.likeId) {
        return likes.delete('' + data.likeId, { headers: { Authorization: 'Bearer ' + token } });
      } else {
        return likes.post('', { likable_id: data.id, likable_type: data.type },
          { headers: { Authorization: 'Bearer ' + token } });
      }
    },
    followUser({commit}, userId) {
      const token = localStorage.getItem('token');
      return followers.post('', { user_id: userId }, { headers: { Authorization: 'Bearer ' + token } });
    },
    unfollowUser({commit}, userId) {
      const token = localStorage.getItem('token');
      return followers.delete('' + userId, { headers: { Authorization: 'Bearer ' + token } });
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
    },
    likesAll(state) {
      return state.likesAll;
    }
  }
};
