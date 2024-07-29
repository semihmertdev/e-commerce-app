// src/components/Categories.jsx
import React from 'react';
import styled from 'styled-components';

const CategoriesContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Categories({ categories, onCategoryClick }) {
  return (
    <CategoriesContainer>
      <CategoryButton onClick={() => onCategoryClick(null)}>All</CategoryButton>
      {categories.map((category) => (
        <CategoryButton key={category} onClick={() => onCategoryClick(category)}>
          {category}
        </CategoryButton>
      ))}
    </CategoriesContainer>
  );
}

export default Categories;
