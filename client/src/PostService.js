//handles requests
import axios from 'axios';

//const url = 'http://localhost:5000/api/posts/';
//heroku development
const url = 'api/posts/';
class PostService {
    //get posts
    static getPosts() {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }))
                    );
                })
                .catch((err) => {
                    reject(err);
                })

        });
    }
    //create posts
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }
    //delete posts
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

    static updatePost(id, text) {
        return axios.put(`${url}${id}`, {
            text
        });
    }
}

export default PostService;