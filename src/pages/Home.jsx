import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Zap, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { productos, FOTOS } from '../data/products';

/* ─── helpers ─────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1];
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const fadeUp  = { hidden: { opacity:0, y:50 }, show: { opacity:1, y:0, transition: { duration:0.8, ease } } };
const fadeIn  = { hidden: { opacity:0 }, show: { opacity:1, transition: { duration:0.8, ease } } };

function useCounter(target, duration = 1.6) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / (duration * 1000), 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

function MagneticBtn({ children, onClick, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.35;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.35;
    ref.current.style.transform = `translate(${dx}px,${dy}px)`;
  };
  const onLeave = () => { ref.current.style.transform = 'translate(0,0)'; };
  return (
    <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} className="magnetic" style={style}>
      {children}
    </button>
  );
}

/* ─── MARQUEE text strip ─────────────────────────────────────── */
function Marquee({ items, accent }) {
  const repeated = [...items, ...items];
  return (
    <div style={{ overflow:'hidden', background:'var(--bg2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'14px 0', userSelect:'none' }}>
      <div className="marquee-inner">
        {repeated.map((item, i) => (
          <span key={i} style={{ display:'flex', alignItems:'center', gap:20, paddingRight:40, fontFamily:'var(--font-hero)', fontSize:18, fontWeight:900, letterSpacing:'0.06em', whiteSpace:'nowrap', color: i % 3 === 1 ? 'var(--accent)' : 'var(--muted)' }}>
            {item}
            <span style={{ color:'var(--accent)', opacity:0.5 }}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONCEPT HERO COMPONENTS
═══════════════════════════════════════════════════════════════ */

function HeroStreet({ setPage }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start','end start'] });
  const yBg  = useTransform(scrollYProgress, [0,1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0,0.65], [1, 0]);

  const words = ['DOMINA', 'LA', 'CALLE'];

  return (
    <section ref={heroRef} style={{ position:'relative', height:'100vh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Parallax background — /fotos/negro1.jpeg */}
      <motion.div style={{ y:yBg, position:'absolute', inset:'-15%', backgroundImage:`url(${FOTOS.negro1})`, backgroundSize:'cover', backgroundPosition:'center' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(8,8,8,0.92) 0%,rgba(8,8,8,0.6) 60%,rgba(8,8,8,0.85) 100%)' }} />

      {/* Diagonal neon slash decoration */}
      <div style={{ position:'absolute', top:0, right:0, width:'40%', height:'100%', background:`linear-gradient(135deg, transparent 50%, color-mix(in srgb, var(--accent) 6%, transparent) 100%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg, var(--accent), transparent)` }} />

      <motion.div style={{ opacity:fade, position:'relative', zIndex:10, padding:'0 clamp(20px,5vw,80px)', maxWidth:1200, width:'100%' }}
        variants={stagger} initial="hidden" animate="show"
      >
        {/* Tag line */}
        <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
          <span style={{ width:32, height:2, background:'var(--accent)', display:'inline-block' }} />
          <span style={{ fontFamily:'var(--font-head)', fontSize:11, fontWeight:700, letterSpacing:'0.3em', color:'var(--accent)', textTransform:'uppercase' }}>Nueva Temporada 2025</span>
        </motion.div>

        {/* Main headline — Bebas Neue glitch */}
        <div>
          {words.map((w, i) => (
            <motion.div key={w} variants={{ hidden:{y:'115%', opacity:0}, show:{ y:0, opacity:1, transition:{ duration:0.85, delay:i*0.1, ease }} }}
              style={{ overflow:'hidden' }}
            >
              <div className="glitch-wrap">
                <span style={{ display:'block', fontFamily:'var(--font-hero)', fontSize:'clamp(72px,14vw,180px)', lineHeight:0.9, color: i===1 ? 'var(--accent)' : 'var(--text)', letterSpacing:'0.02em' }}>{w}</span>
                <span className="gl1" aria-hidden>{w}</span>
                <span className="gl2" aria-hidden>{w}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub + CTA row */}
        <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:24, marginTop:32 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--muted)', maxWidth:380, lineHeight:1.7, borderLeft:'2px solid var(--accent)', paddingLeft:16 }}>
            Gorras del underground. Sin filtros. Sin compromisos. Calidad que se gana en la calle.
          </p>
          <MagneticBtn onClick={() => setPage('catalog')} style={{ padding:'18px 40px', background:'var(--accent)', color:'var(--bg)', border:'none', cursor:'pointer', fontFamily:'var(--font-hero)', fontSize:20, letterSpacing:'0.06em', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
            VER COLECCIÓN <ArrowRight size={20} />
          </MagneticBtn>
        </motion.div>

        {/* Floating badges */}
        <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:1.4, duration:0.7, ease }}
          style={{ position:'absolute', top:'15%', right:'5%', background:'var(--accent)', color:'var(--bg)', padding:'12px 18px', transform:'rotate(3deg)' }}
        >
          <span style={{ fontFamily:'var(--font-hero)', fontSize:13, letterSpacing:'0.1em' }}>DROP</span><br/>
          <span style={{ fontFamily:'var(--font-hero)', fontSize:22 }}>SS25</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
        style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}
      >
        <span style={{ fontFamily:'var(--font-head)', fontSize:9, letterSpacing:'0.3em', color:'var(--muted)', textTransform:'uppercase' }}>Scroll</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.5, ease:'easeInOut' }}
          style={{ width:1, height:32, background:`linear-gradient(to bottom, var(--accent), transparent)` }}
        />
      </motion.div>
    </section>
  );
}

function HeroPremium({ setPage }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:['start start','end start'] });
  const yBg  = useTransform(scrollYProgress, [0,1], [0, 100]);
  const fade = useTransform(scrollYProgress, [0,0.6], [1, 0]);

  return (
    <section ref={heroRef} style={{ position:'relative', height:'100vh', overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
      {/* Left — text */}
      <motion.div style={{ opacity:fade, display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(60px,8vw,120px) clamp(30px,5vw,80px)', position:'relative', zIndex:10 }}
        variants={stagger} initial="hidden" animate="show"
      >
        <motion.div variants={fadeUp} style={{ marginBottom:24 }}>
          <div className="ruled-line" style={{ marginBottom:24, width:60 }} />
          <p style={{ fontFamily:'var(--font-head)', fontSize:9, letterSpacing:'0.4em', color:'var(--accent)', textTransform:'uppercase', fontWeight:700 }}>
            Colección Limitada — SS25
          </p>
        </motion.div>

        {['DEFINE', 'TU', 'LEGADO'].map((w, i) => (
          <motion.div key={w} variants={{ hidden:{opacity:0, x:-40}, show:{ opacity:1, x:0, transition:{ duration:1.1, delay:i*0.18, ease }} }}>
            <span style={{ display:'block', fontFamily:'var(--font-hero)', fontStyle:'italic', fontSize:'clamp(52px,8vw,110px)', fontWeight:300, lineHeight:1, letterSpacing:'-0.01em', color: i===1 ? 'var(--accent)' : 'var(--text)' }}>{w}</span>
          </motion.div>
        ))}

        <motion.p variants={fadeUp} style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:18, color:'var(--muted)', maxWidth:360, lineHeight:1.7, marginTop:28, marginBottom:40 }}>
          Piezas de edición limitada para quienes no necesitan aprobación.
        </motion.p>
        <motion.div variants={fadeUp}>
          <div className="ruled-line" style={{ marginBottom:24 }} />
          <MagneticBtn onClick={() => setPage('catalog')} style={{ background:'transparent', border:'1px solid var(--accent)', color:'var(--accent)', padding:'14px 36px', cursor:'pointer', fontFamily:'var(--font-head)', fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', fontWeight:700, display:'inline-flex', alignItems:'center', gap:12 }}>
            Explorar Piezas <ArrowUpRight size={14} />
          </MagneticBtn>
        </motion.div>
      </motion.div>

      {/* Right — full-bleed image */}
      <motion.div style={{ y:yBg, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${FOTOS.blanco1})`, backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, var(--bg) 0%, transparent 30%)' }} />
        {/* Gold accent strip */}
        <div style={{ position:'absolute', left:0, top:'20%', bottom:'20%', width:2, background:`linear-gradient(to bottom, transparent, var(--accent), transparent)` }} />
        {/* Number badge */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2, duration:0.9, ease }}
          style={{ position:'absolute', bottom:40, right:40, textAlign:'right' }}
        >
          <p style={{ fontFamily:'var(--font-head)', fontSize:9, letterSpacing:'0.3em', color:'var(--accent)', textTransform:'uppercase' }}>Edición</p>
          <p style={{ fontFamily:'var(--font-hero)', fontStyle:'italic', fontSize:64, fontWeight:300, lineHeight:1, color:'var(--text)' }}>001</p>
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0 }}>
        <div className="ruled-line" />
      </div>
    </section>
  );
}

function HeroClean({ setPage }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:['start start','end start'] });
  const yBg  = useTransform(scrollYProgress, [0,1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0,0.6], [1, 0]);

  return (
    <section ref={heroRef} style={{ position:'relative', height:'100vh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Blob background elements */}
      <div className="blob-bg">
        <motion.span animate={{ x:[0,40,0], y:[0,-30,0], scale:[1,1.1,1] }} transition={{ duration:12, repeat:Infinity, ease:'easeInOut' }}
          style={{ width:600, height:600, left:'-10%', top:'-20%', background:'var(--accent)' }} />
        <motion.span animate={{ x:[0,-30,0], y:[0,40,0], scale:[1,1.15,1] }} transition={{ duration:15, repeat:Infinity, ease:'easeInOut', delay:3 }}
          style={{ width:500, height:500, right:'-15%', bottom:'-20%', background:'var(--accent2)' }} />
      </div>

      {/* Parallax image — blurred in bg */}
      <motion.div style={{ y:yBg, position:'absolute', inset:'-15%', backgroundImage:`url(${FOTOS.gris2})`, backgroundSize:'cover', backgroundPosition:'center', filter:'blur(2px) saturate(80%)', opacity:0.12 }} />

      <motion.div style={{ opacity:fade, position:'relative', zIndex:10, maxWidth:800, width:'100%', padding:'0 24px', textAlign:'center' }}
        variants={stagger} initial="hidden" animate="show"
      >
        <motion.span variants={fadeIn} style={{ display:'inline-block', background:'color-mix(in srgb, var(--accent) 15%, transparent)', border:'1px solid color-mix(in srgb, var(--accent) 40%, transparent)', borderRadius:40, padding:'6px 18px', fontFamily:'var(--font-body)', fontSize:12, fontWeight:500, color:'var(--accent)', marginBottom:28 }}>
          Nueva Colección — Verano 2025
        </motion.span>

        <div style={{ overflow:'hidden' }}>
          {['Estilo que', 'habla por ti'].map((line, i) => (
            <motion.div key={i} variants={{ hidden:{y:'110%', opacity:0}, show:{ y:0, opacity:1, transition:{ duration:0.9, delay:i*0.12, ease }} }}>
              <span style={{ display:'block', fontFamily:'var(--font-head)', fontSize:'clamp(42px,8vw,96px)', fontWeight:700, lineHeight:1.05, letterSpacing:'-0.03em', color: i===0 ? 'var(--text)' : 'var(--accent)' }}>{line}</span>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} style={{ fontFamily:'var(--font-body)', fontWeight:300, fontSize:17, color:'var(--muted)', marginTop:24, marginBottom:40, lineHeight:1.7, maxWidth:480, margin:'24px auto 44px' }}>
          Diseño consciente, materiales premium. Cada pieza pensada para durar y sorprender.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <MagneticBtn onClick={() => setPage('catalog')} style={{ padding:'16px 36px', background:'var(--accent)', color:'#fff', border:'none', borderRadius:50, cursor:'pointer', fontFamily:'var(--font-body)', fontWeight:600, fontSize:15, display:'flex', alignItems:'center', gap:10, boxShadow:`0 12px 40px color-mix(in srgb, var(--accent) 40%, transparent)` }}>
            Ver Colección <ArrowRight size={16} />
          </MagneticBtn>
          <button onClick={() => setPage('catalog')} style={{ padding:'16px 28px', background:'transparent', color:'var(--text)', border:'1px solid var(--border)', borderRadius:50, cursor:'pointer', fontFamily:'var(--font-body)', fontWeight:500, fontSize:15 }}>
            Conocer más
          </button>
        </motion.div>
      </motion.div>

      {/* Floating product preview card */}
      <motion.div
        initial={{ opacity:0, y:40, rotate:-3 }} animate={{ opacity:1, y:0, rotate:-3 }} transition={{ delay:1.3, duration:0.8, ease }}
        style={{ position:'absolute', bottom:80, right:'8%', width:140 }}
        className="glass"
        style2={{ borderRadius:16, overflow:'hidden' }}
      >
        <div style={{ position:'relative', borderRadius:16, overflow:'hidden', background:'var(--card)', border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(0,0,0,0.3)', transform:'rotate(-3deg)' }}>
          <img src={FOTOS.blanco2} alt="preview" style={{ width:'100%', height:180, objectFit:'cover' }} />
          <div style={{ padding:'10px 12px' }}>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:12, color:'var(--text)' }}>Dad Cap</p>
            <p style={{ color:'var(--accent)', fontWeight:700, fontSize:13 }}>$68.000</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── STATS row ──────────────────────────────────────────────── */
function StatsRow() {
  const { concept } = useTheme();
  const stats = [
    { label:'Drops este año',  value:24,  suffix:'+' },
    { label:'Estilos únicos',  value:6,   suffix:''  },
    { label:'Clientes felices',value:1200,suffix:'+'  },
    { label:'Años en la calle',value:8,   suffix:''  },
  ];

  return (
    <motion.section
      initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
      transition={{ duration:0.7 }}
      style={{ padding:'60px clamp(20px,5vw,80px)', background:'var(--bg2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:32 }}
    >
      {stats.map((s) => {
        const [val, ref] = useCounter(s.value);
        return (
          <div key={s.label} ref={ref} style={{ textAlign:'center' }}>
            <p style={{ fontFamily:'var(--font-hero)', fontSize:'clamp(36px,5vw,64px)', color:'var(--accent)', lineHeight:1, letterSpacing: concept === 'premium' ? '0.05em' : '0.02em' }}>
              {val}{s.suffix}
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--muted)', marginTop:6, letterSpacing: concept === 'premium' ? '0.15em' : '0.05em', textTransform: concept === 'premium' ? 'uppercase' : 'none' }}>
              {s.label}
            </p>
          </div>
        );
      })}
    </motion.section>
  );
}

/* ─── FEATURED DROPS GRID ────────────────────────────────────── */
function FeaturedGrid({ setPage, onProductClick }) {
  const { concept } = useTheme();
  const featured = productos.filter(p => p.featured);

  const title = concept === 'street' ? 'DROPS DEL MOMENTO'
    : concept === 'premium' ? 'PIEZAS SELECTAS'
    : 'Lo Más Nuevo';
  const subtitle = concept === 'premium' ? 'Selección Exclusiva' : 'Featured';

  return (
    <section style={{ padding:'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
      {/* Section header */}
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.7 }}
        style={{ marginBottom:56, display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}
      >
        <div>
          <p style={{ fontFamily:'var(--font-head)', fontSize:10, letterSpacing:'0.3em', color:'var(--accent)', textTransform:'uppercase', marginBottom:8, fontWeight:700 }}>{subtitle}</p>
          <h2 style={{ fontFamily:'var(--font-hero)', fontSize:'clamp(28px,6vw,72px)', lineHeight:0.95, letterSpacing: concept === 'premium' ? '0.08em' : '0.02em', fontStyle: concept === 'premium' ? 'italic' : 'normal', fontWeight: concept === 'street' ? 400 : 300 }}>
            {title}
          </h2>
        </div>
        <motion.button onClick={() => setPage('catalog')} whileHover={{ x:6 }} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, color:'var(--muted)', display:'flex', alignItems:'center', gap:8, padding:0 }}>
          Ver todo <ArrowRight size={14} color="var(--accent)" />
        </motion.button>
      </motion.div>

      {/* Products grid — concept-specific layout */}
      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.1 } } }}
        initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}
        style={{
          display:'grid',
          gap:concept === 'premium' ? 1 : 20,
          gridTemplateColumns: concept === 'clean'
            ? 'repeat(auto-fit, minmax(260px,1fr))'
            : concept === 'premium'
            ? 'repeat(3, 1fr)'
            : 'repeat(auto-fit, minmax(260px,1fr))',
        }}
      >
        {featured.map((prod, i) => (
          <FeaturedCard key={prod.id} prod={prod} i={i} concept={concept} onClick={() => onProductClick(prod)} />
        ))}
      </motion.div>
    </section>
  );
}

function FeaturedCard({ prod, i, concept, onClick }) {
  const [hovered, setHovered] = useState(false);
  const spring = useSpring(0, { stiffness:200, damping:25 });

  // Street: squared sharp hover. Premium: elegant fade. Clean: lift + shadow.
  const cardStyle = {
    street: {
      borderRadius:0, border:`2px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
      background:'var(--card)',
      boxShadow: hovered ? `4px 4px 0 var(--accent)` : 'none',
    },
    premium: {
      borderRadius:0, border:'none',
      borderBottom:`1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
      borderTop: i === 0 ? '1px solid var(--border)' : 'none',
      background:'var(--card)',
    },
    clean: {
      borderRadius:'var(--radius)', border:`1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
      background:'var(--card)',
      boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.08)',
    },
  }[concept];

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      animate={{ y: concept === 'clean' && hovered ? -8 : 0 }}
      transition={{ duration:0.3 }}
      style={{ overflow:'hidden', cursor:'pointer', transition:'border-color 0.3s, box-shadow 0.3s', ...cardStyle }}
    >
      {/* Image */}
      <div style={{ position:'relative', aspectRatio: concept === 'premium' ? '3/4' : '4/3', overflow:'hidden' }}>
        <motion.img src={prod.imagen} alt={prod.nombre}
          animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration:0.6, ease }}
          style={{ width:'100%', height:'100%', objectFit:'cover' }}
        />
        <motion.img src={prod.imagenAlt} alt={prod.nombre} aria-hidden
          animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration:0.4 }}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        />
        {/* Tag */}
        <div style={{ position:'absolute', top:12, left:12, background:'var(--accent)', color:'var(--bg)', padding:'3px 10px', fontSize:9, fontWeight:800, letterSpacing:'0.15em', fontFamily:'var(--font-head)' }}>
          {prod.tag}
        </div>
        {/* Hover overlay */}
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration:0.3 }}
          style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          <motion.span animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }} transition={{ duration:0.3 }}
            style={{ fontFamily:'var(--font-head)', fontSize:10, fontWeight:700, letterSpacing:'0.2em', color:'#fff', border:'1px solid rgba(255,255,255,0.5)', padding:'8px 20px' }}
          >
            VER DETALLE
          </motion.span>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: concept === 'premium' ? '20px 0' : '16px 18px 18px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <p style={{ fontFamily:'var(--font-head)', fontSize:9, letterSpacing:'0.18em', color:'var(--muted)', textTransform:'uppercase', marginBottom:4 }}>{prod.estilo}</p>
            <h3 style={{ fontFamily:'var(--font-hero)', fontStyle: concept === 'premium' ? 'italic' : 'normal', fontWeight: concept === 'premium' ? 300 : 400, fontSize: concept === 'premium' ? 20 : 18, lineHeight:1.2, letterSpacing: concept === 'premium' ? '0.03em' : '0.01em' }}>
              {prod.nombre}
            </h3>
          </div>
          <span style={{ fontFamily:'var(--font-hero)', fontSize: concept === 'premium' ? 16 : 20, color:'var(--accent)', flexShrink:0, marginLeft:12 }}>
            ${prod.precio.toLocaleString('es-CO')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── HORIZONTAL SCROLL SHOWCASE ─────────────────────────────── */
function ShowcaseStrip({ onProductClick }) {
  const { concept } = useTheme();
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const x = useTransform(scrollXProgress, [0,1], ['0%','100%']);

  return (
    <section style={{ padding:'60px 0', overflow:'hidden', position:'relative' }}>
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        style={{ padding:'0 clamp(20px,5vw,80px)', marginBottom:28, display:'flex', alignItems:'center', justifyContent:'space-between' }}
      >
        <h3 style={{ fontFamily:'var(--font-hero)', fontSize:'clamp(18px,3vw,36px)', letterSpacing: concept === 'premium' ? '0.15em' : '0.03em', fontStyle: concept === 'premium' ? 'italic' : 'normal', fontWeight: concept === 'premium' ? 300 : 400 }}>
          {concept === 'street' ? 'TODA LA SELECCIÓN' : concept === 'premium' ? 'La Colección' : 'Más estilos'}
        </h3>
        <span style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--muted)' }}>← Desliza →</span>
      </motion.div>

      <div ref={ref} style={{ display:'flex', gap: concept === 'premium' ? 1 : 16, overflowX:'auto', paddingLeft:'clamp(20px,5vw,80px)', paddingRight:'clamp(20px,5vw,80px)', paddingBottom:16, scrollbarWidth:'none', scrollSnapType:'x mandatory', cursor:'grab' }}
        className={concept === 'street' ? '' : ''}
      >
        {productos.map((prod) => (
          <motion.div key={prod.id} onClick={() => onProductClick(prod)}
            whileHover={{ y:-6 }} style={{ flexShrink:0, width:220, scrollSnapAlign:'start', cursor:'pointer', background:'var(--card)', border:`1px solid var(--border)`, borderRadius: concept === 'clean' ? 12 : 0, overflow:'hidden' }}
          >
            <div style={{ aspectRatio:'1/1', overflow:'hidden', position:'relative' }}>
              <img src={prod.imagen} alt={prod.nombre} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', display:'block' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              />
            </div>
            <div style={{ padding:'10px 12px 14px' }}>
              <p style={{ fontFamily:'var(--font-hero)', fontStyle: concept==='premium'?'italic':'normal', fontWeight: concept==='premium'?300:400, fontSize:15, marginBottom:2 }}>{prod.nombre}</p>
              <p style={{ color:'var(--accent)', fontFamily:'var(--font-hero)', fontSize:14 }}>${prod.precio.toLocaleString('es-CO')}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── BRAND MANIFESTO section ────────────────────────────────── */
function Manifesto() {
  const { concept } = useTheme();
  const words = concept === 'street'
    ? ['HECHO', 'EN', 'LA', 'CALLE', 'PARA', 'LA', 'CALLE']
    : concept === 'premium'
    ? ['Exclusividad', '·', 'Calidad', '·', 'Legado']
    : ['Diseño', 'que', 'importa'];

  return (
    <section style={{ padding:'80px clamp(20px,5vw,80px)', background:'var(--bg2)', borderTop:'1px solid var(--border)', textAlign: concept === 'premium' ? 'center' : 'left', overflow:'hidden' }}>
      {concept === 'premium' && <div className="ruled-line" style={{ marginBottom:48 }} />}
      <motion.div variants={{ hidden:{}, show:{ transition:{ staggerChildren: concept==='street' ? 0.06 : 0.12 } } }}
        initial="hidden" whileInView="show" viewport={{ once:true, margin:'-80px' }}
        style={{ display:'flex', flexWrap: concept === 'street' ? 'wrap' : 'nowrap', gap: concept === 'street' ? 8 : 24, justifyContent: concept === 'premium' ? 'center' : 'flex-start', alignItems:'baseline' }}
      >
        {words.map((w, i) => (
          <motion.span key={i}
            variants={{ hidden:{ opacity:0, y: concept==='street' ? 60 : 30 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease } } }}
            style={{
              fontFamily:'var(--font-hero)',
              fontSize: concept === 'street' ? 'clamp(32px,6vw,80px)' : concept === 'premium' ? 'clamp(16px,2.5vw,28px)' : 'clamp(28px,5vw,60px)',
              fontStyle: concept === 'premium' ? 'italic' : 'normal',
              fontWeight: concept === 'premium' ? 300 : 400,
              color: (concept === 'street' && [1,4].includes(i)) || (concept === 'clean' && i === 0) ? 'var(--accent)' : (concept === 'premium' && w === '·') ? 'var(--accent)' : 'var(--text)',
              letterSpacing: concept === 'premium' ? '0.25em' : '0.02em',
              lineHeight:1,
            }}
          >{w}</motion.span>
        ))}
      </motion.div>
      {concept === 'premium' && <div className="ruled-line" style={{ marginTop:48 }} />}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HOME EXPORT
═══════════════════════════════════════════════════════════════ */
export default function Home({ setPage, onProductClick }) {
  const { concept } = useTheme();

  const marqueeItems = concept === 'street'
    ? ['NUEVO DROP', 'EDICIÓN LIMITADA', 'SS25', 'STREET WEAR', 'UNDERGROUND', 'GORRA.CO']
    : concept === 'premium'
    ? ['COLECCIÓN LIMITADA', 'SS25', 'EXCLUSIVO', 'PREMIUM', 'CAPVS']
    : ['Nueva Colección', 'Diseño Limpio', 'SS25', 'Cápsula', 'Premium'];

  return (
    <div style={{ paddingTop: concept === 'clean' ? 0 : 60 }}>
      {/* Hero — radical per concept */}
      {concept === 'street'  && <HeroStreet  setPage={setPage} />}
      {concept === 'premium' && <HeroPremium setPage={setPage} />}
      {concept === 'clean'   && <HeroClean   setPage={setPage} />}

      {/* Marquee strip */}
      <Marquee items={marqueeItems} />

      {/* Stats */}
      <StatsRow />

      {/* Featured drops grid */}
      <FeaturedGrid setPage={setPage} onProductClick={onProductClick} />

      {/* Horizontal scroll showcase */}
      <ShowcaseStrip onProductClick={onProductClick} />

      {/* Manifesto / brand statement */}
      <Manifesto />
    </div>
  );
}
