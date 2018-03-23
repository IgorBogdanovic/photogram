import axios from 'axios'

export const auth = axios.create({
	baseURL: 'http://54.37.227.57:80/api/auth/'
});

export const users = axios.create({
	baseURL: 'http://54.37.227.57:80/api/users/'
});

export const posts = axios.create({
	baseURL: 'http://54.37.227.57:80/api/posts/'
});

export const comments = axios.create({
	baseURL: 'http://54.37.227.57:80/api/comments/'
});

export const likes = axios.create({
	baseURL: 'http://54.37.227.57:80/api/likes/'
});

export const followers = axios.create({
	baseURL: 'http://54.37.227.57:80/api/followers/'
});

export const followings = axios.create({
	baseURL: 'http://54.37.227.57:80/api/followings/'
});
