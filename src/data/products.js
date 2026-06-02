// ─── RUTAS DE IMÁGENES ─────────────────────────────────────────────────────
// Todas las fotos vienen de /fotos/. Los nombres de archivo son el color.
// Archivos disponibles: blanco1.jpg, blanco2.jpg, "blanco y negro.jpg",
//                       gris1.jpg, gris2.png, negro1.jpeg

export const FOTOS = {
  blanco1:       '/fotos/blanco1.jpg',
  blanco2:       '/fotos/blanco2.jpg',
  blancoNegro:   '/fotos/blanco y negro.jpg',
  gris1:         '/fotos/gris1.jpg',
  gris2:         '/fotos/gris2.png',
  negro1:        '/fotos/negro1.jpeg',
};

export const productos = [
  {
    id: 1,
    nombre: "Snapback 'Street Icon'",
    precio: 85000,
    estilo: 'Snapback',
    descripcion: 'Edición limitada. Panel frontal bordado con iconografía urbana, visera plana y ajuste trasero de plástico. Hecha para dominar el pavimento.',
    colores: ['Negro', 'Blanco'],
    tallas: ['S/M', 'M/L', 'L/XL'],
    imagen: FOTOS.negro1,
    imagenAlt: FOTOS.blanco1,
    tag: 'NUEVO DROP',
    featured: true,
  },
  {
    id: 2,
    nombre: "Piluso 'Underground Echo'",
    precio: 72000,
    estilo: 'Piluso',
    descripcion: 'Construcción en canvas pesado, lavado stone. El clásico reimaginado desde las profundidades del underground.',
    colores: ['Gris', 'Negro'],
    tallas: ['Talla Única'],
    imagen: FOTOS.gris1,
    imagenAlt: FOTOS.negro1,
    tag: 'BESTSELLER',
    featured: true,
  },
  {
    id: 3,
    nombre: "Dad Cap 'Concrete Jungle'",
    precio: 68000,
    estilo: 'Dad Cap',
    descripcion: 'Perfil bajo, cierre metálico dorado, bordado en hilo reflectivo. Para el que lo vive todos los días.',
    colores: ['Blanco', 'Gris'],
    tallas: ['Talla Única'],
    imagen: FOTOS.blanco2,
    imagenAlt: FOTOS.gris2,
    tag: 'LIMITED',
    featured: true,
  },
  {
    id: 4,
    nombre: "Trucker 'Neon Ghost'",
    precio: 79000,
    estilo: 'Trucker',
    descripcion: 'Malla posterior transpirable, panel frontal en espuma. Diseño bicolor atemporal.',
    colores: ['Blanco y Negro', 'Gris'],
    tallas: ['S/M', 'M/L'],
    imagen: FOTOS.blancoNegro,
    imagenAlt: FOTOS.gris1,
    tag: 'CLÁSICO',
    featured: false,
  },
  {
    id: 5,
    nombre: "5-Panel 'Cipher'",
    precio: 65000,
    estilo: 'Five Panel',
    descripcion: 'Cinco paneles, cero compromisos. Diseño geométrico en la visera. Carry your code.',
    colores: ['Blanco', 'Gris'],
    tallas: ['Talla Única'],
    imagen: FOTOS.blanco1,
    imagenAlt: FOTOS.gris2,
    tag: 'ESENCIAL',
    featured: false,
  },
  {
    id: 6,
    nombre: "Snapback 'Oro Negro'",
    precio: 120000,
    estilo: 'Snapback',
    descripcion: 'Colección premium. Lana virgen importada, logos en hilo de seda. El lujo que no necesita aprobación.',
    colores: ['Negro', 'Blanco y Negro'],
    tallas: ['S/M', 'M/L', 'L/XL'],
    imagen: FOTOS.negro1,
    imagenAlt: FOTOS.blancoNegro,
    tag: 'PREMIUM',
    featured: false,
  },
];

export const estilos = ['Todos', 'Snapback', 'Piluso', 'Dad Cap', 'Trucker', 'Five Panel'];

export const coloresFiltro = ['Todos', 'Negro', 'Blanco', 'Gris', 'Blanco y Negro'];

export const preciosFiltro = [
  { label: 'Todos',               min: 0,     max: Infinity },
  { label: 'Hasta $70.000',       min: 0,     max: 70000    },
  { label: '$70.000 – $90.000',   min: 70000, max: 90000    },
  { label: 'Más de $90.000',      min: 90000, max: Infinity },
];
