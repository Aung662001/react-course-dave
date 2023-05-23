import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { DataContext } from "./context/DataContext";
import api from "./api/post";

const PostPage = () => {
  const { posts, setPosts, navigate } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (error) {
      console.log({
        Error: error.message,
      });
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <button onClick={() => handleDelete(post.id)}>Delete Post</button>
              <button
                onClick={() => <Navigate to={`/post/${id}/edit`} />}
                style={{ backgroundColor: "green" }}
              >
                Edit Post
              </button>
            </div>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
