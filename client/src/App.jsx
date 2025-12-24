import React, { useEffect, useState } from "react";
import { getPosts } from "./api";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

export default function App() {
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const data = await getPosts();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="container">
      <h1>Mini-Twitter</h1>

      <div className="card">
        <h2>Create New Post</h2>
        <CreatePost onPostAdded={loadPosts} />
      </div>

      <div className="card">
        <h2>Posts</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
