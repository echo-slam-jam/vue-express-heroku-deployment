const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// links to posts.js file
const posts = require('./routes/api/posts')
app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
	// static folder
	app.use(express.static(__dirname + '/public'));

	// Handle single page app
	// /.* = any route
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// listen to server port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server sarted on port ${port}`));