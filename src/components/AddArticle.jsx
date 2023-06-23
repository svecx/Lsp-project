import React, { useState } from "react";

const AddArticle = () => {
    const [articles, setArticles] = useState([]);
    const [newArticleTitle, setNewArticleTitle] = useState("");
    const [newArticleContent, setNewArticleContent] = useState("");
    const [newArticleImage, setNewArticleImage] = useState(null);

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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setNewArticleImage(URL.createObjectURL(file));
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
          <label htmlFor="articleContent">Konten Artikel:</label>
          <textarea
            className="form-control"
            id="articleContent"
            rows="3"
            value={newArticleContent}
            onChange={(e) => setNewArticleContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="articleImage">Gambar Artikel:</label>
          <input
            type="file"
            className="form-control-file"
            id="articleImage"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {newArticleImage && (
          <div className="form-group mt-2">
            <img src={newArticleImage} alt="Preview" style={{ width: "200px" }} />
          </div>
        )}
        <button className="btn btn-primary mt-2" onClick={createArticle}>
          Buat Artikel Baru
        </button>
    </div>
  )
}

export default AddArticle