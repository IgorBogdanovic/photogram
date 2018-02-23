import axios from 'axios'

export const auth = axios.create({
	baseURL: 'http://192.168.0.154:8000/api/auth/'
});

export const users = axios.create({
	baseURL: 'http://192.168.0.154:8000/api/users/'
});

export const posts = axios.create({
	baseURL: 'http://192.168.0.154:8000/api/posts/'
});
