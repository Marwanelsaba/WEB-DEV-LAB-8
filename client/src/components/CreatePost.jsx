import React, { useState } from "react";
import { createPost } from "../api";

export default function CreatePost({ onPostAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function submit(e) {
    e.preventDefault(); // VERY IMPORTANT

    if (!title.trim() || !content.trim()) return;

    const newPost = await createPost(title, content);
    onPostAdded(newPost);

    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Name"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button type="submit">Create Post</button>
    </form>
  );
}
