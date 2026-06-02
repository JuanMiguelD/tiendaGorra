import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const { concept } = useTheme();
  const [selectedColor, setSelectedColor] = useState(product?.colores?.[0] || '');
  const [selectedTalla, setSelectedTalla] = useState(product?.tallas?.[0] || '');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, color: selectedColor, talla: selectedTalla });
    setAdded(true);
    setTimeout(() => { setAdded(false); }, 2200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 3000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            width: '100%', maxWidth: 880,
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          {/* Image side */}
          <div style={{ position: 'relative', background: 'var(--card)', minHeight: 460 }}>
            <motion.img
              key={product.imagen}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.imagen}
              alt={product.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Tag */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: 'var(--accent)', color: 'var(--bg)',
              padding: '4px 12px', borderRadius: 4,
              fontFamily: 'var(--font-head)', fontSize: 10,
              fontWeight: 800, letterSpacing: '0.15em',
            }}>
              {product.tag}
            </div>
          </div>

          {/* Info side */}
          <div style={{ padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Close */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Title */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-head)',
                fontSize: concept === 'premium' ? 18 : 24,
                fontWeight: concept === 'street' ? 900 : 700,
                lineHeight: 1.2,
                letterSpacing: concept === 'premium' ? '0.1em' : '0.02em',
                marginBottom: 8,
              }}>
                {product.nombre}
              </h2>
              <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800 }}>
                ${product.precio.toLocaleString('es-CO')}
              </p>
            </div>

            {/* Description */}
            <p style={{
              color: 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: concept === 'premium' ? 16 : 14,
              lineHeight: 1.65,
            }}>
              {product.descripcion}
            </p>

            {/* Color selector */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
                Color: <span style={{ color: 'var(--text)' }}>{selectedColor}</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.colores.map(color => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: `1.5px solid ${selectedColor === color ? 'var(--accent)' : 'var(--border)'}`,
                      background: selectedColor === color ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                      color: selectedColor === color ? 'var(--accent)' : 'var(--muted)',
                      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
                Talla
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.tallas.map(talla => (
                  <motion.button
                    key={talla}
                    onClick={() => setSelectedTalla(talla)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 8,
                      border: `1.5px solid ${selectedTalla === talla ? 'var(--accent)' : 'var(--border)'}`,
                      background: selectedTalla === talla ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                      color: selectedTalla === talla ? 'var(--accent)' : 'var(--muted)',
                      fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {talla}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add to cart button */}
            <motion.button
              onClick={handleAdd}
              disabled={added}
              whileHover={!added ? { scale: 1.03 } : {}}
              whileTap={!added ? { scale: 0.97 } : {}}
              animate={{
                background: added ? '#22c55e' : 'var(--accent)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: 'auto',
                padding: '16px 24px',
                borderRadius: 12,
                border: 'none',
                color: 'var(--bg)',
                fontFamily: 'var(--font-head)',
                fontSize: concept === 'premium' ? 11 : 14,
                fontWeight: 800,
                letterSpacing: concept === 'premium' ? '0.2em' : '0.06em',
                textTransform: 'uppercase',
                cursor: added ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Check size={18} /> ¡Agregado al Carrito!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <ShoppingBag size={18} /> Agregar al Carrito
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
