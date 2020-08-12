const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
    //res.send('hello');
});

//Add posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});


//Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

// Update Posts
router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.replaceOne({ _id: new mongodb.ObjectID(req.params.id) }, {
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(200).send();
});



//connect to db collection
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:12345@cluster0.rj9zk.mongodb.net/vue_express?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

    //enables crud functions to db collection
    return client.db('vue_express').collection('posts')
}

module.exports = router;