import React, { useState, useEffect } from "react";
import { getComments, addComment } from "../api";

export default function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      getComments(post.id).then(setComments);
    }
  }, [show, post.id]);

  async function submitComment() {
    if (!text.trim()) return;

    const c = await addComment(post.id, text);
    setComments(prev => [...prev, c]);
    setText("");
  }

  return (
    <div className="post">
      <h4>{post.title}</h4>
      <p>{post.content}</p>

      <button onClick={() => setShow(prev => !prev)}>
        {show ? "Hide Comments" : "Show Comments"}
      </button>

      {show && (
        <div style={{ marginTop: "10px" }}>
          <ul>
            {comments.map(c => (
              <li key={c.id}>{c.text}</li>
            ))}
          </ul>

          <input
            placeholder="Write comment"
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <button onClick={submitComment}>Add</button>
        </div>
      )}
    </div>
  );
}
