import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleImage, setNewArticleImage] = useState(null);
  const [comments, setComments] = useState([]);

  const retrieveUserComments = () => {
    const userComment = JSON.parse(localStorage.getItem("userComment")) || [];
    setComments(userComment);
  };

  useEffect(() => {
    retrieveUserComments();
  }, []);

  const createArticle = () => {
    const newArticle = {
      title: newArticleTitle,
      content: newArticleContent,
      image: newArticleImage,
    };
    setArticles([...articles, newArticle]);
    setNewArticleTitle("");
    setNewArticleContent("");
    setNewArticleImage(null);
  };

  const deleteArticle = (index) => {
    const updatedArticles = articles.filter((article, i) => i !== index);
    setArticles(updatedArticles);
  };

  const deleteComment = (index) => {
    const updatedComments = comments.filter((comment, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem("userComment", JSON.stringify(updatedComments));
  };

  const createReport = () => {
    // Generate report based on articles and comments data
    const report = {
      articlesCount: articles.length,
      commentsCount: comments.length,
    };
    console.log(report);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewArticleImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("post")) || [];
    setArticles(storedPosts);
  }, []);

  const deletePost = (index) => {
    const updatedPosts = [...articles];
    updatedPosts.splice(index, 1);
    setArticles(updatedPosts);
    localStorage.setItem("post", JSON.stringify(updatedPosts));
  };

  const editPost = (index) => {
    // Implement the edit functionality for a post at the specified index
    // You can use this function to update the post data in the state and localStorage
    console.log("Edit post at index:", index);
  };

  return (
    <div className="container mt-3">
      <h2>Dashboard Admin</h2>
      <hr />

      {/* Kelola Artikel */}
      <div className="mb-4">
        <h5>Daftar Artikel:</h5>
        {articles.map((article, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              {article.image && (
                <div className="form-group">
                  <img
                    src={article.image}
                    alt="Preview"
                    style={{ width: "200px" }}
                  />
                </div>
              )}
              <p className="card-text">{article.content}</p>
              <button
                className="btn btn-danger"
                onClick={() => deleteArticle(index)}
              >
                Hapus Artikel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Kelola Komentar */}
      <div className="mb-4">
        <h4>Kelola Komentar</h4>
        <hr />
        <h5>Daftar Komentar:</h5>
        {comments.length === 0 ? (
          <p>Tidak ada komentar</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Komentar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td>{comment.commentText}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteComment(index)}
                    >
                      Hapus Komentar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tabel Data Post */}
      <div className="mb-4">
        <h4>Laporan Artikel</h4>
        <hr />
        <h5>Data Post:</h5>
        {articles.length === 0 ? (
          <p>Tidak ada data post</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Desc</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((post, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.desc}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePost(index)}
                    >
                      Hapus
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => editPost(index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pembuatan Laporan */}
      <div>
        <h4>Pembuatan Laporan</h4>
        <button className="btn btn-primary" onClick={createReport}>
          Buat Laporan
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
