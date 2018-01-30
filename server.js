const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var request = require('request');

const posturl = 'http://jsonplaceholder.typicode.com/posts'
const commenturl = 'http://jsonplaceholder.typicode.com/comments'


app.listen(process.env.PORT || 3010, () => {
  console.log('Listening on port 3010');

});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Redirect to posts
app.get('/', (req, res) => {	  
  res.redirect('/posts'); 
});

// List all posts
app.get('/posts', (req, res) => {
	request(posturl, function (error, response, body) {
		var posts = JSON.parse(body)
  	res.render('posts.ejs', {posts})
});
});

// Show the search form
app.get('/search', (req, res) => {
   res.render('search.ejs', { post: 'name' });
});

// Find all comments for post
app.post('/search', (req, res) => {
	request(commenturl, function (error, response, body) {
		var comments = JSON.parse(body)
		var name = req.body.title
  	res.render('search_result.ejs', {comments, name})
});
});
