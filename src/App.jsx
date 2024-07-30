import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer'; 
import { CartProvider } from './hooks/useCart';
import { FavoritesProvider } from './hooks/useFavorites';
import GlobalStyle from './globalStyles';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <GlobalStyle />
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          <Footer />
          <ToastContainer /> {/* Add ToastContainer to display notifications */}
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
