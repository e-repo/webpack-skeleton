import $ from 'jquery'
import Post from '@/js/models/Post';
import Util from './Util';
import start from './test_babel'

import '@/styles/main.css'
import '@/styles/sass.scss'

import json from '../assets/json/some_json_file.json'

const post  = new Post(
    'Some title',
    '/some/image.jpeg'
);

console.log('Post obj: ', post);
console.log('JSON: ', json);
console.log('jQuery: ', $);

start().then(console.log);
console.log('Util ID: ', Util.id);