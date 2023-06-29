import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const { postId } = useParams();
  const [article, setArticle] = useState({});
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleDesc, setNewArticleDesc] = useState("");
  const [newArticleImg, setNewArticleImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find((item) => item.id === parseInt(postId));

    if (post) {
      setArticle(post);
      setNewArticleTitle(post.title);
      setNewArticleDesc(post.desc);
      setNewArticleImg(post.img);
    }
  }, [postId]);

  const updateArticle = () => {
    const updatedArticle = {
      id: article.id,
      title: newArticleTitle,
      desc: newArticleDesc,
      img: newArticleImg,
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map((item) =>
      item.id === article.id ? updatedArticle : item
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/admin"); // Navigasi kembali ke halaman dashboard setelah mengupdate artikel
  };

  return (
    <div>
      <h4>Edit Artikel</h4>
      <div className="form-group">
        <label htmlFor="articleTitle">Judul Artikel:</label>
        <input
          type="text"
          className="form-control"
          id="articleTitle"
          value={newArticleTitle}
          onChange={(e) => setNewArticleTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="articleDesc">Deskripsi Artikel:</label>
        <textarea
          className="form-control"
          id="articleDesc"
          rows="3"
          value={newArticleDesc}
          onChange={(e) => setNewArticleDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group mt-2">
        <label htmlFor="articleImg">Gambar Artikel:</label>
        <input
          type="text"
          className="form-control"
          id="articleImg"
          value={newArticleImg}
          onChange={(e) => setNewArticleImg(e.target.value)}
        />
      </div>
      {newArticleImg && (
        <div className="form-group mt-2">
          <img
            src={newArticleImg}
            alt="Article"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
      <button className="btn btn-primary mt-2" onClick={updateArticle}>
        Update Artikel
      </button>
    </div>
  );
};

export default EditArticle;
