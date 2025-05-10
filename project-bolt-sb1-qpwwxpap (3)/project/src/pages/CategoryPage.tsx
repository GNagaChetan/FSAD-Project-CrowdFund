import React from 'react';
import { useParams } from 'react-router-dom';

export const CategoryPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Category: {slug}</h1>
      <p>Welcome to the {slug} category page.</p>
    </div>
  );
};
