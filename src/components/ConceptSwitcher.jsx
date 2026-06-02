import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Palette, Sun, Moon, ChevronUp } from 'lucide-react';
import { useTheme, concepts } from '../context/ThemeContext';

export default function ConceptSwitcher() {
  const { concept, setConcept, mode, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:16, scale:0.92 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:16, scale:0.92 }}
            transition={{ type:'spring', stiffness:320, damping:26 }}
            style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius: concept==='clean' ? 16 : 0, padding:20, marginBottom:12, minWidth:210, boxShadow:'0 24px 64px rgba(0,0,0,0.5)' }}
          >
            {/* Mode */}
            <p style={{ color:'var(--muted)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:10, fontFamily:'var(--font-head)', fontWeight:700 }}>
              Modo
            </p>
            <button onClick={toggleMode}
              style={{ display:'flex', alignItems:'center', gap:10, background: mode==='dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', border:'1px solid var(--border)', padding:'10px 16px', color:'var(--text)', cursor:'pointer', width:'100%', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, marginBottom:18, borderRadius: concept==='clean' ? 10 : 0, transition:'all 0.2s' }}
            >
              {mode === 'dark' ? <><Moon size={14} color="var(--accent)" /> Oscuro</> : <><Sun size={14} color="var(--accent)" /> Claro</>}
            </button>

            {/* Concept */}
            <p style={{ color:'var(--muted)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:10, fontFamily:'var(--font-head)', fontWeight:700 }}>
              Concepto
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {concepts.map(c => (
                <motion.button key={c.id} onClick={() => setConcept(c.id)}
                  whileHover={{ x:4 }} whileTap={{ scale:0.97 }}
                  style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', border:`1px solid ${concept===c.id ? 'var(--accent)' : 'var(--border)'}`, background: concept===c.id ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent', color: concept===c.id ? 'var(--accent)' : 'var(--text)', cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 0.2s', borderRadius: concept==='clean' ? 10 : 0 }}
                >
                  <span style={{ fontSize:13, fontWeight:700 }}>{c.label}</span>
                  <span style={{ fontSize:10, color:'var(--muted)' }}>{c.sublabel}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setOpen(o => !o)}
        whileHover={{ scale:1.08 }} whileTap={{ scale:0.9 }}
        style={{ width:50, height:50, borderRadius:'50%', background:'var(--accent)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 32px color-mix(in srgb, var(--accent) 55%, transparent)`, color:'var(--bg)' }}
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.3 }}>
          {open ? <ChevronUp size={20} /> : <Palette size={20} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
