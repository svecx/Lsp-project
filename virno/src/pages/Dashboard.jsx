import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);

  const retrieveUserComments = () => {
    const userComment = JSON.parse(localStorage.getItem("userComment")) || [];
    setComments(userComment);
  };

  useEffect(() => {
    retrieveUserComments();
  }, []);

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

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setArticles(storedPosts);
  }, []);

  const deletePost = (index) => {
    const updatedPosts = [...articles];
    updatedPosts.splice(index, 1);
    setArticles(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="container mt-3">
      <h2>Dashboard Admin</h2>
      <hr />

      {/* Tabel Data Post */}
      <div className="mb-4">
        <h4>Laporan Artikel</h4>
        <hr />
        <h5>Data Artikel:</h5>
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
                    <Link to={`/admin/${post.id}`} className="btn btn-primary">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
