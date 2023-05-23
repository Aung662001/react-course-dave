import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DataContext } from "./context/DataContext";
import format from "date-fns/format";
import api from "./api/post";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, navigate, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id.toString());
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);
  const handleEdit = async (id) => {
    const dateTime = format(new Date(), "mmmm dd,yy pp");
    const updatePost = { id, title: editTitle, dateTime, body: editBody };
    console.log(updatePost);
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) =>
          post.id.toString() === id.toString() ? { ...response.data } : post
        )
      );
      setEditBody("");
      setEditTitle("");
      navigate("/");
    } catch (error) {
      console.log({ Error: error.message });
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
        <button type="submit" onClick={() => handleEdit(post.id)}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default EditPost;
