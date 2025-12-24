const BASE_URL = "http://localhost:3000";

export async function getPosts() {
    const res = await fetch(`${BASE_URL}/posts`);
    return res.json();
}

export async function createPost(title, content) {
  const res = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  return res.json();
}

export async function getComments(postId) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    return res.json();
}

export async function addComment(postId, text) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });
    return res.json();
}
