import React from 'react';
import './articles.css';

function ArticleCard({ title, description, imageUrl }) {
  return (
    <div className="article-card">
      <img src={imageUrl} alt={title} className="article-image" />
      <div className="article-content">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ArticleCard;
