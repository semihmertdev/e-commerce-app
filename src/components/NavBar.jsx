// src/components/NavBar.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
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

function NavBar() {
  const { cart } = useCart();

  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/cart">Cart ({cart.length})</NavLink>
    </Nav>
  );
}

export default NavBar;
