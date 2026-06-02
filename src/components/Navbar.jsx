import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─── Marcas según concepto ──────────────────────────────────── */
const BRAND = { street: 'GORRA.CO', premium: 'CAPVS', clean: 'Cápsula' };

export default function Navbar({ page, setPage, cartCount, onCartOpen }) {
  const { concept } = useTheme();

  /* Street: todo mayúsculas, sin blur, borde neón inferior */
  if (concept === 'street') return (
    <motion.nav
      initial={{ y: -70 }} animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background:'var(--nav-blur)',
        borderBottom:'2px solid var(--accent)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:60, padding:'0 24px',
      }}
    >
      <button onClick={() => setPage('home')} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-hero)', fontSize:28, color:'var(--text)', letterSpacing:'0.06em' }}>
        <span style={{ color:'var(--accent)' }}>G</span>ORRA.CO
      </button>
      <div style={{ display:'flex', gap:24, alignItems:'center' }}>
        {['home','catalog'].map(id => (
          <button key={id} onClick={() => setPage(id)} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-head)', fontWeight:900, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color: page===id ? 'var(--accent)' : 'var(--muted)', transition:'color 0.2s' }}>
            {id === 'home' ? 'Inicio' : 'Colecciones'}
            {page === id && <motion.div layoutId="street-bar" style={{ height:2, background:'var(--accent)', marginTop:2 }} />}
          </button>
        ))}
        <CartBtn count={cartCount} onClick={onCartOpen} />
      </div>
    </motion.nav>
  );

  /* Premium: centrado, ultra-espaciado, sin borde visible */
  if (concept === 'premium') return (
    <motion.nav
      initial={{ opacity:0 }} animate={{ opacity:1 }}
      transition={{ duration:1, delay:0.3 }}
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background:'var(--nav-blur)',
        borderBottom:'1px solid var(--border)',
        display:'grid', gridTemplateColumns:'1fr auto 1fr',
        alignItems:'center', height:72, padding:'0 40px',
      }}
    >
      <div style={{ display:'flex', gap:40 }}>
        {['home','catalog'].map(id => (
          <button key={id} onClick={() => setPage(id)} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-head)', fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color: page===id ? 'var(--accent)' : 'var(--muted)', transition:'color 0.4s', fontWeight:700 }}>
            {id === 'home' ? 'Inicio' : 'Colección'}
          </button>
        ))}
      </div>
      <button onClick={() => setPage('home')} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-hero)', fontSize:20, fontStyle:'italic', letterSpacing:'0.04em', color:'var(--text)', textAlign:'center', fontWeight:300 }}>
        CAPVS
      </button>
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <CartBtn count={cartCount} onClick={onCartOpen} />
      </div>
    </motion.nav>
  );

  /* Clean: pill, floating, glassmorphism */
  return (
    <motion.div
      initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
      style={{ position:'fixed', top:10, left:'50%', transform:'translateX(-50%)', zIndex:1000, width:'calc(100% - 64px)', maxWidth:580 }}
    >
      <div className="glass" style={{ borderRadius:50, display:'flex', alignItems:'center', justifyContent:'space-between', height:44, padding:'0 8px 0 18px' }}>
        <button onClick={() => setPage('home')} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-head)', fontWeight:700, fontSize:15, color:'var(--text)', letterSpacing:'-0.02em' }}>
          Cápsula
        </button>
        <div style={{ display:'flex', gap:2, alignItems:'center' }}>
          {['home','catalog'].map(id => (
            <button key={id} onClick={() => setPage(id)} style={{ background: page===id ? 'var(--accent)' : 'transparent', border:'none', borderRadius:40, padding:'6px 14px', cursor:'pointer', fontFamily:'var(--font-body)', fontWeight:500, fontSize:13, color: page===id ? '#fff' : 'var(--muted)', transition:'all 0.3s' }}>
              {id === 'home' ? 'Inicio' : 'Colección'}
            </button>
          ))}
          <CleanCartBtn count={cartCount} onClick={onCartOpen} />
        </div>
      </div>
    </motion.div>
  );
}

/* Botón de carrito para Clean — fondo acento sólido, siempre visible */
function CleanCartBtn({ count, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'relative',
        width: 32, height: 32,
        borderRadius: '50%',
        background: 'var(--accent)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#ffffff',
        flexShrink: 0,
      }}
    >
      <ShoppingBag size={15} />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{
            position: 'absolute', top: -3, right: -3,
            background: 'var(--bg)', color: 'var(--accent)',
            border: '1.5px solid var(--accent)',
            borderRadius: '50%', width: 16, height: 16,
            fontSize: 9, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >{count}</motion.span>
      )}
    </motion.button>
  );
}

function CartBtn({ count, onClick }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
      style={{ position:'relative', background:'none', border:'none', cursor:'pointer', color:'var(--text)', padding:'8px 12px', display:'flex', alignItems:'center' }}
    >
      <div style={{ position:'relative', display:'inline-flex' }}>
        <ShoppingBag size={20} />
        {count > 0 && (
          <motion.span initial={{ scale:0 }} animate={{ scale:1 }}
            style={{ position:'absolute', top:-5, right:-7, background:'var(--accent)', color:'var(--bg)', borderRadius:'50%', width:16, height:16, fontSize:9, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center' }}
          >{count}</motion.span>
        )}
      </div>
    </motion.button>
  );
}
