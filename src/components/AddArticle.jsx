import React, { useState } from "react";

const AddArticle = () => {
  const [articles, setArticles] = useState([]);
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleDesc, setNewArticleDesc] = useState("");
  const [newArticleImg, setNewArticleImg] = useState("");

  const createArticle = () => {
    const newArticle = {
      id: articles.length + 1,
      title: newArticleTitle,
      desc: newArticleDesc,
      img: newArticleImg,
    };
    setArticles([...articles, newArticle]);
    setNewArticleTitle("");
    setNewArticleDesc("");
    setNewArticleImg("");

    localStorage.setItem("post", JSON.stringify([...articles, newArticle]));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewArticleImg(URL.createObjectURL(file));
  };

  return (
    <div>
      <h4>Kelola Artikel</h4>
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
            alt="Preview"
            style={{ width: "200px" }}
          />
        </div>
      )}
      <div className="form-group mt-2">
        <label htmlFor="articleImageUpload">Upload Gambar:</label>
        <input
          type="file"
          className="form-control-file"
          id="articleImageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={createArticle}>
        Buat Artikel Baru
      </button>
    </div>
  );
};

export default AddArticle;
