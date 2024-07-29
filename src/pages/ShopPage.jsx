import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import { useLocation } from 'react-router-dom';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const ProductList = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isGridLayout, setIsGridLayout] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    setSelectedCategory(category);
  }, [location]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleLayoutToggle = () => {
    setIsGridLayout(!isGridLayout);
  };

  return (
    <div>
      <Categories categories={categories} onCategoryClick={setSelectedCategory} />
      <div>
        <label>
          Sort by price:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>
        <button onClick={handleLayoutToggle}>
          {isGridLayout ? 'Switch to List View' : 'Switch to Grid View'}
        </button>
      </div>
      {isGridLayout ? (
        <ProductGrid>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <ProductList>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductList>
      )}
    </div>
  );
}

export default ShopPage;
