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
  background-color: #FCC730;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background-color: #FFD700;
    transition: background-color 0.3s;

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
