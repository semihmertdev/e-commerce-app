import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import styled from 'styled-components';
import { useState } from 'react';
import { FaHome, FaShoppingCart, FaHeart, FaSignInAlt, FaSearch } from 'react-icons/fa';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem;
  transition: transform 1s ease;

  &:hover {
    transform: scale(1.1);
    color: #FCC730;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 50%;
  max-width: 600px;
  margin: 1rem 0;
   transition: width 1s ease;

  @media (min-width: 768px) {
    margin: 0;
  }

  &:hover {
    filter: drop-shadow(0 0 0.75rem #ccc);
    width: 60%;
  }

  &:focus-within {
    filter: drop-shadow(0 0 0.75rem #ccc);
    width: 100%;
  }
`;

const SearchInput = styled.input.attrs({ type: 'text' })`
  background-color: #fff;
  height: 2.5rem;
  padding: 0 2rem 0 1rem;
  border: 1px solid #ccc;
  border-radius: 9999px;
  font-size: 1.2rem;
  width: 100%;
  box-sizing: border-box;
  outline: none;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  svg {
    width: 1rem;
    height: 1rem;
    fill: #333;
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: #FCC730;
  }
`;

const IconLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-top: 0;
  }
`;

const IconLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
`;

function NavBar() {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
    if (encodedSearchTerm) {
      navigate(`/shop?search=${encodedSearchTerm}`);
    }
  };

  return (
    <Nav>
      <NavLinksContainer>
        <NavLink to="/">E-comm</NavLink>
        <NavLink to="/shop">Shop</NavLink>
      </NavLinksContainer>
      <SearchContainer>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit">
            <FaSearch />
          </SearchButton>
        </form>
      </SearchContainer>
      <IconLinksContainer>
        <IconLink to="/"> 
          <FaSignInAlt /> Log In
        </IconLink>
        <IconLink to="/favorites">
          <FaHeart /> Favorites
        </IconLink>
        <IconLink to="/cart">
          <FaShoppingCart /> Cart ({cart.length})
        </IconLink>
      </IconLinksContainer>
    </Nav>
  );
}

export default NavBar;
