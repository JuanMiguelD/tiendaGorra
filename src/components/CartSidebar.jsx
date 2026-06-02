import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CartSidebar({ isOpen, onClose, cart, updateQty, removeItem }) {
  const { concept } = useTheme();
  const total = cart.reduce((sum, item) => sum + item.precio * item.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: Math.min(420, window.innerWidth),
              background: 'var(--bg2)',
              borderLeft: '1px solid var(--border)',
              zIndex: 2001,
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '24px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShoppingBag size={20} color="var(--accent)" />
                <span style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: concept === 'premium' ? 13 : 18,
                  fontWeight: 800,
                  letterSpacing: concept === 'premium' ? '0.2em' : '0.02em',
                  textTransform: concept === 'premium' ? 'uppercase' : 'none',
                }}>
                  Tu Carrito
                </span>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', paddingTop: 80, color: 'var(--muted)' }}
                >
                  <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3, display: 'block' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}>Tu carrito está vacío</p>
                  <p style={{ fontSize: 13, marginTop: 6, opacity: 0.6 }}>Agrega algunas gorras</p>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map(item => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.talla}`}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, padding: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex', gap: 14, marginBottom: 16,
                        padding: 14, borderRadius: 12,
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        width: 72, height: 72, borderRadius: 8, overflow: 'hidden',
                        flexShrink: 0, background: 'var(--bg)',
                      }}>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontFamily: 'var(--font-body)', fontSize: 13,
                          fontWeight: 700, marginBottom: 4,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {item.nombre}
                        </p>
                        <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>
                          {item.color} · {item.talla}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {/* Qty controls */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQty(item.id, item.color, item.talla, -1)}
                              style={{
                                width: 26, height: 26, borderRadius: '50%',
                                background: 'var(--border)', border: 'none',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--text)',
                              }}
                            >
                              <Minus size={12} />
                            </motion.button>
                            <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: 'center' }}>
                              {item.qty}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQty(item.id, item.color, item.talla, 1)}
                              style={{
                                width: 26, height: 26, borderRadius: '50%',
                                background: 'var(--accent)', border: 'none',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--bg)',
                              }}
                            >
                              <Plus size={12} />
                            </motion.button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
                              ${(item.precio * item.qty).toLocaleString('es-CO')}
                            </span>
                            <motion.button
                              whileHover={{ color: '#ff4444' }}
                              whileTap={{ scale: 0.85 }}
                              onClick={() => removeItem(item.id, item.color, item.talla)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}
                            >
                              <Trash2 size={14} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{
                padding: '20px 24px',
                borderTop: '1px solid var(--border)',
                background: 'var(--card)',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: 16, alignItems: 'center',
                }}>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, color: 'var(--accent)' }}>
                    ${total.toLocaleString('es-CO')}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%', padding: '16px',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    border: 'none', borderRadius: 12,
                    fontFamily: 'var(--font-head)',
                    fontSize: concept === 'premium' ? 12 : 15,
                    fontWeight: 800,
                    letterSpacing: concept === 'premium' ? '0.2em' : '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Finalizar Compra
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
