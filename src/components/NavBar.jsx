// src/components/NavBar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import styled from 'styled-components';
import { useState } from 'react';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px 0 0 4px;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function NavBar() {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Nav>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/cart">Cart ({cart.length})</NavLink>
      </div>
      <SearchContainer>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
        </form>
      </SearchContainer>
    </Nav>
  );
}

export default NavBar;