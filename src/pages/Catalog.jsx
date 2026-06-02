import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { productos, estilos, coloresFiltro, preciosFiltro } from '../data/products';

const ease = [0.22, 1, 0.36, 1];
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.07 } } };
const fadeUp = { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.5, ease } } };

/* ─── Color dots helper ──────────────────────────────────────── */
const COLOR_HEX = {
  'negro':       '#1a1a1a',
  'blanco':      '#f0f0f0',
  'gris':        '#888888',
  'blanco y negro': 'linear-gradient(135deg,#1a1a1a 50%,#f0f0f0 50%)',
};
function colorDot(name) {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(COLOR_HEX)) {
    if (key.includes(k)) return v;
  }
  return '#888';
}

function FilterSection({ title, children, defaultOpen = true }) {
  const { concept } = useTheme();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom:'1px solid var(--border)', paddingBottom:18, marginBottom:18 }}>
      <button onClick={() => setOpen(o => !o)} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', background:'none', border:'none', cursor:'pointer', color:'var(--text)', marginBottom: open ? 12 : 0, fontFamily:'var(--font-head)', fontSize:9, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', padding:0, transition:'color 0.2s' }}>
        {title}
        <motion.div animate={{ rotate: open ? 0 : -90 }} transition={{ duration:0.25 }}>
          {open ? <ChevronUp size={14} color="var(--accent)" /> : <ChevronDown size={14} color="var(--muted)" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3, ease }} style={{ overflow:'hidden' }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Catalog({ onProductClick }) {
  const { concept } = useTheme();
  const [selectedEstilo, setSelectedEstilo] = useState('Todos');
  const [selectedColor, setSelectedColor]   = useState('Todos');
  const [selectedPrecio, setSelectedPrecio] = useState(0);
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [hoveredId, setHoveredId]           = useState(null);

  const filteredPrecios = preciosFiltro[selectedPrecio];
  const filtered = productos.filter(p => {
    const estiloOk = selectedEstilo === 'Todos' || p.estilo === selectedEstilo;
    const colorOk  = selectedColor  === 'Todos' || p.colores.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()));
    const precioOk = p.precio >= filteredPrecios.min && p.precio <= filteredPrecios.max;
    return estiloOk && colorOk && precioOk;
  });
  const hasFilters = selectedEstilo !== 'Todos' || selectedColor !== 'Todos' || selectedPrecio !== 0;

  /* Concept-specific page header styles */
  const ptop = concept === 'clean' ? 88 : 60;

  return (
    <div style={{ paddingTop: ptop, minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      {/* ── Page header ── */}
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        style={{ padding:'40px clamp(20px,5vw,60px) 28px', borderBottom:'1px solid var(--border)', background:'var(--bg2)' }}
      >
        <p style={{ color:'var(--accent)', fontSize:9, fontFamily:'var(--font-head)', letterSpacing:'0.35em', textTransform:'uppercase', marginBottom:8, fontWeight:700 }}>
          {concept === 'premium' ? 'Catálogo Exclusivo' : 'Colecciones'}
        </p>
        <h1 style={{ fontFamily:'var(--font-hero)', fontSize:'clamp(32px,6vw,72px)', fontStyle: concept==='premium' ? 'italic':'normal', fontWeight: concept==='premium' ? 300 : 400, letterSpacing: concept==='premium' ? '0.05em' : '0.02em', lineHeight:0.95 }}>
          {concept === 'street' ? 'TODA LA SELECCIÓN' : concept === 'premium' ? 'Piezas Exclusivas' : 'Todas las Gorras'}
        </h1>
        <p style={{ color:'var(--muted)', marginTop:10, fontSize:13, fontFamily:'var(--font-body)' }}>
          {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'} encontrados
        </p>
      </motion.div>

      <div style={{ display:'flex', flex:1 }}>
        {/* ── SIDEBAR ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside initial={{ width:0, opacity:0 }} animate={{ width:252, opacity:1 }} exit={{ width:0, opacity:0 }} transition={{ duration:0.38, ease }}
              style={{ background:'var(--bg2)', borderRight:'1px solid var(--border)', overflow:'hidden', flexShrink:0 }}
            >
              <div style={{ width:252, padding:'24px 20px', minHeight:'100%' }}>
                {/* Sidebar header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
                  <span style={{ fontFamily:'var(--font-head)', fontSize:9, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--muted)', display:'flex', alignItems:'center', gap:6 }}>
                    <SlidersHorizontal size={12} color="var(--accent)" /> Filtros
                  </span>
                  <AnimatePresence>
                    {hasFilters && (
                      <motion.button initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.8 }}
                        onClick={() => { setSelectedEstilo('Todos'); setSelectedColor('Todos'); setSelectedPrecio(0); }}
                        style={{ background:'transparent', border:'1px solid var(--accent)', color:'var(--accent)', padding:'4px 10px', fontSize:10, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontFamily:'var(--font-body)', borderRadius: concept==='clean' ? 20 : 0 }}
                      >
                        <X size={10} /> Limpiar
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Estilo */}
                <FilterSection title="Estilo">
                  <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                    {estilos.map(e => (
                      <motion.button key={e} onClick={() => setSelectedEstilo(e)} whileHover={{ x:5 }}
                        style={{ background:'none', border:'none', textAlign:'left', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:14, color: selectedEstilo===e ? 'var(--accent)' : 'var(--muted)', fontWeight: selectedEstilo===e ? 700 : 400, padding:'5px 0', transition:'color 0.2s', display:'flex', alignItems:'center', gap:8 }}
                      >
                        {selectedEstilo === e
                          ? <motion.span layoutId="estilo-dot" style={{ width:5, height:5, borderRadius:'50%', background:'var(--accent)', flexShrink:0, display:'inline-block' }} />
                          : <span style={{ width:5, display:'inline-block' }} />
                        }
                        {e}
                      </motion.button>
                    ))}
                  </div>
                </FilterSection>

                {/* Color */}
                <FilterSection title="Color">
                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    {coloresFiltro.map(c => {
                      const active = selectedColor === c;
                      return (
                        <motion.button key={c} onClick={() => setSelectedColor(c)} whileHover={{ x:4 }}
                          style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:10, padding:'4px 0', fontFamily:'var(--font-body)', fontSize:14, color: active ? 'var(--accent)' : 'var(--muted)', fontWeight: active ? 700 : 400, transition:'color 0.2s' }}
                        >
                          {c !== 'Todos' && (
                            <span style={{ width:14, height:14, borderRadius:'50%', border:`1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`, flexShrink:0, background: colorDot(c), display:'inline-block' }} />
                          )}
                          {c === 'Todos' && <span style={{ width:14, display:'inline-block' }} />}
                          {c}
                        </motion.button>
                      );
                    })}
                  </div>
                </FilterSection>

                {/* Precio */}
                <FilterSection title="Precio">
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    {preciosFiltro.map((pf, i) => (
                      <motion.button key={pf.label} onClick={() => setSelectedPrecio(i)} whileHover={{ x:4 }}
                        style={{ background:'none', border:'none', textAlign:'left', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, color: selectedPrecio===i ? 'var(--accent)' : 'var(--muted)', fontWeight: selectedPrecio===i ? 700 : 400, padding:'5px 0', transition:'color 0.2s' }}
                      >
                        {selectedPrecio === i ? '▸ ' : ''}{pf.label}
                      </motion.button>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── PRODUCT GRID ── */}
        <main style={{ flex:1, padding:'clamp(20px,3vw,36px)', minWidth:0 }}>
          {/* Toolbar */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <motion.button onClick={() => setSidebarOpen(o => !o)} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 16px', border:'1px solid var(--border)', background:'transparent', color:'var(--muted)', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', borderRadius: concept==='clean' ? 30 : 0 }}
            >
              <Filter size={13} color="var(--accent)" />
              {sidebarOpen ? 'Ocultar filtros' : 'Filtros'}
            </motion.button>
            {hasFilters && (
              <motion.div initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {selectedEstilo !== 'Todos' && <ActiveTag label={selectedEstilo} onRemove={() => setSelectedEstilo('Todos')} concept={concept} />}
                {selectedColor  !== 'Todos' && <ActiveTag label={selectedColor}  onRemove={() => setSelectedColor('Todos')}  concept={concept} />}
                {selectedPrecio !== 0       && <ActiveTag label={preciosFiltro[selectedPrecio].label} onRemove={() => setSelectedPrecio(0)} concept={concept} />}
              </motion.div>
            )}
          </div>

          {filtered.length === 0 ? (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ textAlign:'center', padding:'80px 20px', color:'var(--muted)' }}>
              <p style={{ fontSize:36, marginBottom:12 }}>🧢</p>
              <p style={{ fontFamily:'var(--font-hero)', fontSize:18 }}>Sin resultados</p>
              <p style={{ fontSize:13, marginTop:6 }}>Prueba otra combinación de filtros</p>
            </motion.div>
          ) : (
            <motion.div key={`${selectedEstilo}-${selectedColor}-${selectedPrecio}`}
              variants={stagger} initial="hidden" animate="show"
              style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap: concept==='premium' ? 1 : 18 }}
            >
              {filtered.map(prod => (
                <ProductCard key={prod.id} prod={prod} concept={concept} hovered={hoveredId===prod.id} onHover={setHoveredId} onClick={() => onProductClick(prod)} />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

function ActiveTag({ label, onRemove, concept }) {
  return (
    <motion.span initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.85 }}
      style={{ display:'inline-flex', alignItems:'center', gap:6, background:'color-mix(in srgb, var(--accent) 12%, transparent)', border:'1px solid var(--accent)', color:'var(--accent)', padding:'4px 10px', fontSize:11, fontWeight:700, fontFamily:'var(--font-body)', borderRadius: concept==='clean' ? 20 : 0 }}
    >
      {label}
      <button onClick={onRemove} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--accent)', display:'flex', lineHeight:1, padding:0 }}><X size={11} /></button>
    </motion.span>
  );
}

function ProductCard({ prod, concept, hovered, onHover, onClick }) {
  const cardStyle = {
    street: { borderRadius:0, border:`2px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`, boxShadow: hovered ? `3px 3px 0 var(--accent)` : 'none' },
    premium: { borderRadius:0, border:'none', borderBottom:`1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}` },
    clean: { borderRadius:12, border:`1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`, boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.07)' },
  }[concept];

  return (
    <motion.div variants={fadeUp}
      onMouseEnter={() => onHover(prod.id)} onMouseLeave={() => onHover(null)} onClick={onClick}
      animate={{ y: concept==='clean' && hovered ? -6 : 0 }}
      transition={{ duration:0.25 }}
      style={{ overflow:'hidden', cursor:'pointer', background:'var(--card)', transition:'border-color 0.3s, box-shadow 0.3s', ...cardStyle }}
    >
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
        <motion.img src={prod.imagen} alt={prod.nombre} animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration:0.55, ease }} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <motion.img src={prod.imagenAlt} alt="" aria-hidden animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration:0.35 }} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <span style={{ position:'absolute', top:10, left:10, background:'var(--accent)', color:'var(--bg)', padding:'2px 8px', fontSize:8, fontWeight:800, letterSpacing:'0.15em', fontFamily:'var(--font-head)' }}>{prod.tag}</span>
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.32)', display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:14 }}>
          <motion.span animate={{ y: hovered ? 0 : 14, opacity: hovered ? 1 : 0 }} transition={{ duration:0.28 }}
            style={{ fontFamily:'var(--font-head)', fontSize:9, fontWeight:700, letterSpacing:'0.22em', color:'#fff', border:'1px solid rgba(255,255,255,0.4)', padding:'7px 18px' }}
          >VER DETALLE</motion.span>
        </motion.div>
      </div>
      <div style={{ padding: concept==='premium' ? '16px 0' : '12px 14px 16px' }}>
        <p style={{ fontFamily:'var(--font-head)', fontSize:8, letterSpacing:'0.18em', color:'var(--muted)', textTransform:'uppercase', marginBottom:3 }}>{prod.estilo}</p>
        <h3 style={{ fontFamily:'var(--font-hero)', fontStyle: concept==='premium' ? 'italic':'normal', fontWeight: concept==='premium' ? 300 : 400, fontSize: concept==='premium' ? 17 : 16, lineHeight:1.25, letterSpacing:'0.01em', marginBottom:8 }}>{prod.nombre}</h3>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:'var(--accent)', fontFamily:'var(--font-hero)', fontSize:16 }}>${prod.precio.toLocaleString('es-CO')}</span>
          <div style={{ display:'flex', gap:4 }}>
            {prod.colores.map(c => (
              <div key={c} title={c} style={{ width:10, height:10, borderRadius:'50%', background: colorDot(c), border:'1px solid var(--border)', flexShrink:0 }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
