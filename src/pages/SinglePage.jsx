// SinglePage.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SinglePage = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      postId: Number(postId),
      name,
      email,
      commentText,
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setName("");
    setEmail("");
    setCommentText("");

    // Simpan komentar pengguna ke dalam local storage
    const userComment = JSON.parse(localStorage.getItem("userComment")) || [];
    userComment.push(newComment);
    localStorage.setItem("userComment", JSON.stringify(userComment));
  };

  const retrieveUserComments = () => {
    const userComment = JSON.parse(localStorage.getItem("userComment")) || [];
    setComments(userComment);
  };

  useEffect(() => {
    retrieveUserComments();
  }, []);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = storedPosts.find((p) => p.id === Number(postId));
    setPost(post);
  }, [postId]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div style={{ height: "20rem", overflow: "hidden" }}>
              <img
                src={post.img}
                className="card-img-top"
                alt=""
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.desc}</p>

              {/* Komentar */}
              <h6 className="mt-4">Comments:</h6>
              {comments
                .filter((comment) => comment.postId === post.id)
                .map((comment, index) => (
                  <div key={`${post.id}-${index}`} className="border p-3 mt-2">
                    <p>Name: {comment.name}</p>
                    <p>Email: {comment.email}</p>
                    <p>Comment: {comment.commentText}</p>
                  </div>
                ))}

              {/* Form komentar */}
              <form className="mt-4" onSubmit={handleCommentSubmit}>
                <div className="form-group">
                  <label htmlFor={`name-${post.id}`}>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`name-${post.id}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`email-${post.id}`}>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id={`email-${post.id}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`comment-${post.id}`}>Comment:</label>
                  <textarea
                    className="form-control"
                    id={`comment-${post.id}`}
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Link to="/" className="btn btn-secondary mt-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
