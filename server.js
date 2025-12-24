const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let posts = [];
let nextPostId = 1;

app.post("/posts", (req, res) => {
    const { title, content } = req.body;

    const newPost = {
        id: nextPostId++,
        title,
        content,
        comments: []
    };

    posts.push(newPost);

    res.status(200).json(newPost);
});

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ message: "Sorry, The Post is not found" });
    }

    res.json(post);
});

app.post("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({ message: "Sorry, The Post is not found" });
    }

    const comment = {
        id: post.comments.length + 1,
        text
    };

    post.comments.push(comment);

    res.status(200).json(comment);
});

app.get("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ message: "Sorry The Post is not found" });
    }

    res.json(post.comments);
});

app.listen(3000, () => console.log("The Server is running on port 3000"));