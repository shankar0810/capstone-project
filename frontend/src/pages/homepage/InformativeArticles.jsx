import React from 'react';
import ArticleCard from './ArticleCard';
import dietpic from '../../assests/diet-plan.jpg';
import exerpic from '../../assests/exercise.jpg';
import yogapic from '../../assests/yoga.jpg';

function InformativeArticles() {
  const articles = [
    { 
      title: 'Get a Customized Diet Plan', 
      description: 'Discover worth of nutritious recipes',
      imageUrl: dietpic
    },
    { 
      title: 'Exercise for maintaining your own health', 
      description: 'Get the exercises for your own health',
      imageUrl: exerpic // Replace with actual image URL
    },
    { 
      title: 'Benefits of Meditation', 
      description: 'Explore the science behind mindfulness',
      imageUrl: yogapic// Replace with actual image URL
    },
  ];

  return (
    <section className="informative-articles py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-6">Services we provide</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard 
              key={article.title} 
              title={article.title} 
              description={article.description} 
              imageUrl={article.imageUrl} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InformativeArticles;
