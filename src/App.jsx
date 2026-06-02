import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import ConceptSwitcher from './components/ConceptSwitcher';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import './index.css';

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function AppInner() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const key = `${item.id}-${item.color}-${item.talla}`;
      const existing = prev.find(c => `${c.id}-${c.color}-${c.talla}` === key);
      if (existing) {
        return prev.map(c => `${c.id}-${c.color}-${c.talla}` === key ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id, color, talla, delta) => {
    setCart(prev => {
      const key = `${id}-${color}-${talla}`;
      const updated = prev.map(c => `${c.id}-${c.color}-${c.talla}` === key ? { ...c, qty: c.qty + delta } : c);
      return updated.filter(c => c.qty > 0);
    });
  }, []);

  const removeItem = useCallback((id, color, talla) => {
    const key = `${id}-${color}-${talla}`;
    setCart(prev => prev.filter(c => `${c.id}-${c.color}-${c.talla}` !== key));
  }, []);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <>
      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'home' && (
            <Home
              setPage={setPage}
              onProductClick={setSelectedProduct}
            />
          )}
          {page === 'catalog' && (
            <Catalog
              onProductClick={setSelectedProduct}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
      />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(item) => {
              addToCart(item);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>

      <ConceptSwitcher />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
