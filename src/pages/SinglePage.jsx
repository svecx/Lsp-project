import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SinglePage = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
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

  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img:
        "https://images.unsplash.com/photo-1686595092928-0252b92e007e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img:
        "https://images.unsplash.com/photo-1530139963092-abc04e3e371b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img:
        "https://images.unsplash.com/photo-1532692966749-619e0feb9e78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1200&q=60",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img:
        "https://images.unsplash.com/photo-1532011617143-60dccd779bde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1200&q=60",
    },
  ];

  const post = posts.find((p) => p.id === Number(postId));

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
    </div>
  );
};

export default SinglePage;
