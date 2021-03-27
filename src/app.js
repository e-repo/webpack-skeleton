import Post from './models/Post.js';
import './styles/main.css'

const post  = new Post(
    'Some title',
    '/some/image.jpeg'
);

console.log(post);