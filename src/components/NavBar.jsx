import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import styled, { createGlobalStyle } from 'styled-components';
import { FaShoppingCart, FaHeart, FaSignInAlt, FaSearch, FaBars } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
`;

const NavWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    order: 1;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #FCC730;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #333;
  }
`;

const SearchContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  margin: 0 1rem;

  @media (max-width: 768px) {
    flex: 100%;
    order: 3;
    margin-top: 1rem;
  }
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 3rem 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover, &:focus {
    border-color: #FCC730;
    box-shadow: 0 0 8px rgba(252, 199, 48, 0.3);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  padding: 0.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FCC730;
  color: #fff;
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    order: 2;
    align-items: flex-start;
  }
`;

const IconLink = styled(Link)`
  color: #333;
  text-decoration: none;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  transition: color 0.3s ease-in-out;

  svg {
    font-size: 1.5rem;
    margin-right: 0.3rem;
  }

  span {
    display: inline-block;
    font-size: 1rem;
  }

  &:hover {
    color: #FCC730;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const HamburgerMenu = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;

  @media (min-width: 769px) {
    display: none;
  }

  &:hover {
    color: #FCC730;
  }
`;

const MobileMenu = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  border-top: 1px solid #ddd;
  transition: max-height 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileDropdownContent = styled.div`
  padding-left: 1rem;
  border-left: 1px solid #ddd;
  margin-left: 0.5rem;
`;

const MobileDropdownItem = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 0.5rem 0;
  display: block;
  font-size: 0.9rem;
  text-transform: capitalize;
  border-bottom: 2px solid transparent;

  &:hover {
    background-color: #f1f1f1;
  }

`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CategoryLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid #ccc;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;

  &:hover {
    background-color: #f1f1f1;
    color: #FCC730;
  }

  &.active {
    border-bottom: 2px solid #FCC730;
  }
`;

function NavBar() {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
    if (encodedSearchTerm) {
      navigate(`/shop?search=${encodedSearchTerm}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategoryClick = (category) => {
    const encodedCategory = encodeURIComponent(category);
    navigate(`/shop?category=${encodedCategory}`);
    setActiveCategory(category);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(['All', ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <GlobalStyle />
      <NavWrapper>
        <Nav>
          <LogoContainer>
            <Logo to="/">E-comm</Logo>
          </LogoContainer>

          <SearchContainer>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </SearchForm>
          </SearchContainer>

          <NavLinksContainer>
            <HamburgerMenu onClick={toggleMobileMenu}>
              <FaBars />
            </HamburgerMenu>

            <IconLink to="/login">
              <FaSignInAlt />
              <span>Login</span>
            </IconLink>
            <IconLink to="/favorites">
              <FaHeart />
              <span>Favorites</span>
            </IconLink>
            <IconLink to="/cart">
              <FaShoppingCart />
              <span>Cart ({cart.length})</span>
            </IconLink>
          </NavLinksContainer>
        </Nav>

        <CategoriesContainer>
          {categories.map(category => (
            <CategoryLink 
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
              onClick={() => handleCategoryClick(category)}
              className={activeCategory === category ? 'active' : ''}
            >
              {category}
            </CategoryLink>
          ))}
        </CategoriesContainer>
      </NavWrapper>

      <MobileMenu isOpen={isMobileMenuOpen}>
        {categories.map(category => (
          <MobileDropdownContent key={category}>
            <MobileDropdownItem 
              to={`/shop?category=${encodeURIComponent(category)}`}
              onClick={() => handleCategoryClick(category)}
              className={activeCategory === category ? 'active' : ''}
            >
              {category}
            </MobileDropdownItem>
          </MobileDropdownContent>
        ))}
      </MobileMenu>
    </>
  );
}

export default NavBar;
