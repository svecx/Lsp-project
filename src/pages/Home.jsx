import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState({});
  const [email, setEmail] = useState({});
  const [commentText, setCommentText] = useState({});
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const newComment = {
      postId,
      name: name[postId],
      email: email[postId],
      commentText: commentText[postId],
    };
    setComments((prevComments) => [...prevComments, newComment]);

    setName((prevNames) => ({ ...prevNames, [postId]: "" }));
    setEmail((prevEmails) => ({ ...prevEmails, [postId]: "" }));
    setCommentText((prevCommentTexts) => ({ ...prevCommentTexts, [postId]: "" }));

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
    setPosts(storedPosts);

    // Ambil nilai pencarian dari local storage
    const searchInput = localStorage.getItem("search") || "";

    // Bandingkan nilai pencarian dengan judul (title) dari postingan
    const filtered = storedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Setel daftar postingan yang telah difilter
    setFilteredPosts(filtered.length > 0 ? filtered : storedPosts);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "search") {
        window.location.reload(); // Refresh halaman saat ada perubahan di local storage "search"
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        {filteredPosts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card mb-4">
              <div className="ratio ratio-4x3">
                <img src={post.img} className="card-img" alt={post.title} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.desc}</p>
                <Link to={`/post/${post.id}`} className="btn btn-primary">
                  Read More
                </Link>
                <div className="mt-4" style={{ maxHeight: "10rem", overflowY: "auto" }}>
                  <h6>Comments:</h6>
                  {comments
                    .filter((comment) => comment.postId === post.id)
                    .map((comment, index) => (
                      <div key={`${post.id}-${index}`} className="border p-3 mt-2">
                        <p>Name: {comment.name}</p>
                        <p>Email: {comment.email}</p>
                        <p>Comment: {comment.commentText}</p>
                      </div>
                    ))}
                </div>
                <form className="mt-4" onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                  <div className="form-group">
                    <label htmlFor={`name-${post.id}`}>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`name-${post.id}`}
                      value={name[post.id] || ""}
                      onChange={(e) => setName((prevNames) => ({ ...prevNames, [post.id]: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`email-${post.id}`}>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id={`email-${post.id}`}
                      value={email[post.id] || ""}
                      onChange={(e) => setEmail((prevEmails) => ({ ...prevEmails, [post.id]: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`comment-${post.id}`}>Comment:</label>
                    <textarea
                      className="form-control"
                      id={`comment-${post.id}`}
                      rows="3"
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        setCommentText((prevCommentTexts) => ({
                          ...prevCommentTexts,
                          [post.id]: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
