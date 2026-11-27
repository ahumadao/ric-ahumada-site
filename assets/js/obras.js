/* ==========================================================
   CATÁLOGO Y CONFIGURACIÓN
   Este es el único archivo que necesitas editar para agregar
   obras, marcarlas como no disponibles o cambiar precios.
   ========================================================== */

window.CONFIG = {
  correo: "contacto@ric-ahumada.com",
  instagram: "https://www.instagram.com/ric.ahumada/",
  recargoMercadoPago: "5%",
  envioMercadoPago: "https://mpago.la/16JUYGo",

  // Formatos por superficie (ancho × alto, en cm²). El precio de cada obra sale de aquí.
  formatos: [
    { nombre: "Mini",         hasta: 200,      precio: 20000 },
    { nombre: "Pequeño",      hasta: 350,      precio: 30000 },
    { nombre: "Mediano",      hasta: 750,      precio: 40000 },
    { nombre: "Grande",       hasta: 1200,     precio: 55000 },
    { nombre: "Extra grande", hasta: Infinity, precio: 80000 }
  ],

  // Un link de Mercado Pago por formato. Si queda vacío, el botón ofrece escribir por correo.
  mercadoPago: {
    "Mini": "",
    "Pequeño": "",
    "Mediano": "",
    "Grande": "",
    "Extra grande": ""
  },

  // Obras del carrusel de portada (por id, en orden). Las que no tengan imagen se omiten solas.
  destacadas: ["amanecer-o-anochecer", "oscureciendo", "dia-nublado-2s", "dia-nublado-2", "dia-nublado-1", "campo-nublado-con-flores", "dia-nublado-1s", "dia-nublado-3"]
};

window.SERIES = [
  { id: "paisaje-natural", nombre: "Paisaje natural", bajada: "Campo, costa y montaña." },
  { id: "paisaje-urbano",  nombre: "Paisaje urbano",  bajada: "Calles, puertos y luces de ciudad." },
  { id: "inanimados",      nombre: "Inanimados",      bajada: "Objetos, telas y estudios de luz." }
];

// estado: "disponible" o "no disponible". Medidas en cm: ancho × alto.
window.OBRAS = [
  // Paisaje natural
  { id: "dia-nublado-1s", serie: "paisaje-natural", titulo: "Día nublado 1S", ancho: 19, alto: 14, papel: "Arches grano fino", estado: "disponible", img: "assets/img/paisaje-natural/dianubladito1.png" },
  { id: "oscureciendo", serie: "paisaje-natural", titulo: "Oscureciendo", ancho: 56, alto: 38, papel: "Saunders Waterford - grano fino", estado: "disponible", img: "assets/img/paisaje-natural/oscureciendo.png" },
  { id: "atardecer-practica-capa", serie: "paisaje-natural", titulo: "Atardecer - Práctica CAPA", ancho: 19, alto: 14, papel: "Saunders Waterford - grano fino", estado: "disponible", nota: "Realizado en contexto de curso", img: "assets/img/paisaje-natural/atardecer.png" },
  { id: "paisaje-en-taller-con-jorge-corpuna", serie: "paisaje-natural", titulo: "Paisaje en Taller con Jorge Corpuna", ancho: 26, alto: 36, papel: "Papel Arches", estado: "disponible", nota: "Realizado en contexto de curso", img: "assets/img/paisaje-natural/corpuna.png" },
  { id: "itubera", serie: "paisaje-natural", titulo: "Ituberá", ancho: 19, alto: 27, papel: "Arches - grano fino", estado: "disponible", img: "assets/img/paisaje-natural/itubera.png" },
  { id: "rocoso", serie: "paisaje-natural", titulo: "Rocoso", ancho: 11, alto: 20, papel: "Papel Arches - grano fino", estado: "disponible", img: "assets/img/paisaje-natural/rocoso.png" },
  { id: "faro-practica-capa", serie: "paisaje-natural", titulo: "Faro - práctica CAPA", ancho: 19, alto: 14, papel: "Papel Baohong - grano fino", estado: "disponible", nota: "Realizado en contexto de curso", img: "assets/img/paisaje-natural/faro.png" },
  { id: "castillo-practica-capa", serie: "paisaje-natural", titulo: "Castillo - práctica CAPA", ancho: 19, alto: 14, papel: "Papel Baohong - grano fino", estado: "disponible", nota: "Realizado en contexto de curso", img: "assets/img/paisaje-natural/castillo.png" },
  { id: "de-forestal-iii", serie: "paisaje-natural", titulo: "De-Forestal III", ancho: 19, alto: 14, papel: "Papel Baohong - grano fino", estado: "disponible", img: "assets/img/paisaje-natural/deforestal3.png" },
  { id: "cueva-y-gente", serie: "paisaje-natural", titulo: "Cueva y gente", ancho: 14, alto: 19, papel: "Papel Baohong - grano fino", estado: "disponible", img: "assets/img/paisaje-natural/cueva.png" },
  { id: "de-forestal-ii", serie: "paisaje-natural", titulo: "De-forestal II", ancho: 14, alto: 19, papel: "Papel Arches", estado: "disponible", img: "assets/img/paisaje-natural/deforestal2.png" },
  { id: "dia-nublado-2s", serie: "paisaje-natural", titulo: "Día nublado 2S", ancho: 14, alto: 19, papel: "Arches grano fino", estado: "disponible", img: "assets/img/paisaje-natural/dianubladito2.png" },
  { id: "paisaje-despejado", serie: "paisaje-natural", titulo: "Paisaje despejado", ancho: 14, alto: 24, papel: "Papel Arches - grano fino", estado: "disponible", img: "assets/img/paisaje-natural/paisajeenverde.png" },
  { id: "dia-nublado-3", serie: "paisaje-natural", titulo: "Día nublado 3", ancho: 28, alto: 19, papel: "Papel Arches - grano fino", estado: "disponible", img: "assets/img/paisaje-natural/dianublado3.png" },
  { id: "cajon-del-maipo", serie: "paisaje-natural", titulo: "Cajón del Maipo", ancho: 29, alto: 39, papel: "Papel Arches grano fino", estado: "disponible", img: "assets/img/paisaje-natural/cajondelmaipo.png" },
  { id: "de-forestal", serie: "paisaje-natural", titulo: "De-forestal", ancho: 38, alto: 28, papel: "Papel Arches", estado: "disponible", img: "assets/img/paisaje-natural/deforestal1.png" },
  { id: "faro-exploradores", serie: "paisaje-natural", titulo: "Faro Exploradores", ancho: 25, alto: 35, papel: "Papel Arches", estado: "disponible", img: "assets/img/paisaje-natural/faroexploradores.png" },
  { id: "muelle-en-morro-2", serie: "paisaje-natural", titulo: "Muelle en Morro 2", ancho: 23, alto: 31, papel: "Papel Baohong", estado: "disponible", img: "assets/img/paisaje-natural/muelleMorro2.png" },
  { id: "mesa-de-picnic", serie: "paisaje-natural", titulo: "Mesa de Picnic", ancho: 38, alto: 28, papel: "Papel Arches - grano fino", estado: "no disponible", img: "assets/img/paisaje-natural/mesadepicnic.png" },
  { id: "campo-nublado-con-flores", serie: "paisaje-natural", titulo: "Campo nublado con flores", ancho: 27, alto: 37, papel: "Papel Arches - grano fino", estado: "no disponible", img: "assets/img/paisaje-natural/camponubladoconfloresrojas.png" },
  { id: "dia-nublado-2", serie: "paisaje-natural", titulo: "Día nublado 2", ancho: 35, alto: 25, papel: "Papel Baohong - grano fino", estado: "no disponible", img: "assets/img/paisaje-natural/dianublado2.png" },
  { id: "dia-nublado-1", serie: "paisaje-natural", titulo: "Día nublado 1", ancho: 35, alto: 25, papel: "Baohong - grano fino", estado: "no disponible", img: "assets/img/paisaje-natural/dianublado1.png" },
  { id: "amanecer-o-anochecer", serie: "paisaje-natural", titulo: "Amanecer o anochecer", ancho: 26, alto: 36, papel: "Saunders Waterford - grano fino", estado: "no disponible", img: "assets/img/paisaje-natural/amaneceroanochecer.png" },
  { id: "muelle-en-morro", serie: "paisaje-natural", titulo: "Muelle en Morro", ancho: 28, alto: 38, papel: "Papel Arches", estado: "no disponible", img: "assets/img/paisaje-natural/muelleMorro1.png" },
  // Paisaje urbano
  { id: "urbano-y-nublado", serie: "paisaje-urbano", titulo: "Urbano y nublado", ancho: 19, alto: 28, papel: "Arches grano fino", estado: "disponible", img: "assets/img/paisaje-urbano/urbanoynublado.png" },
  { id: "workshop-pitocampos", serie: "paisaje-urbano", titulo: "Workshop PitoCampos", ancho: 20, alto: 35, papel: "Arches grano fino", estado: "disponible", nota: "Realizado en contexto de curso", img: "assets/img/paisaje-urbano/urbanocampos.png" },
  { id: "salvador", serie: "paisaje-urbano", titulo: "Salvador", ancho: 19, alto: 28, papel: "Arches grano fino", estado: "disponible", img: "assets/img/paisaje-urbano/salvadorbahia.png" },
  { id: "ciudad-y-cafe", serie: "paisaje-urbano", titulo: "Ciudad y Café", ancho: 10, alto: 15, papel: "Papel Baohong", estado: "disponible", img: "assets/img/paisaje-urbano/ciudadycafe.png" },
  { id: "callejon", serie: "paisaje-urbano", titulo: "Callejón", ancho: 14, alto: 24, papel: "Papel Arches", estado: "disponible", img: "assets/img/paisaje-urbano/callejon.png" },
  { id: "costera", serie: "paisaje-urbano", titulo: "Costera", ancho: 35, alto: 25, papel: "Papel Baohong", estado: "disponible", img: "assets/img/paisaje-urbano/costera.png" },
  { id: "atardecer-costanera", serie: "paisaje-urbano", titulo: "Atardecer costanera", ancho: 14, alto: 24, papel: "Papel Arches", estado: "disponible", img: "assets/img/paisaje-urbano/marinayatardecer.png" },
  { id: "poblacion-san-miguel", serie: "paisaje-urbano", titulo: "Población San Miguel", ancho: 18, alto: 26, papel: "Papel Arches", estado: "disponible", img: "assets/img/paisaje-urbano/villasanmiguel.png" },
  { id: "grifo", serie: "paisaje-urbano", titulo: "Grifo", ancho: 35, alto: 23, papel: "Papel Arches", estado: "no disponible", img: "assets/img/paisaje-urbano/grifo.png" },
  { id: "teleferico", serie: "paisaje-urbano", titulo: "Teleférico", ancho: 28, alto: 18, papel: "Papel Saunders Waterford", estado: "no disponible", img: "assets/img/paisaje-urbano/teleferico.png" },
  // Inanimados
  { id: "hallulla", serie: "inanimados", titulo: "Hallulla", ancho: 28, alto: 19, papel: "Arches grano fino", estado: "disponible", img: "assets/img/inanimados/hallulla.png" },
  { id: "tela-practica-capa", serie: "inanimados", titulo: "Tela - práctica CAPA", ancho: 14, alto: 23, papel: "Baohong - grano fino", estado: "disponible", nota: "Realizado en contexto de curso", img: "assets/img/inanimados/tela.png" },
  { id: "estatua", serie: "inanimados", titulo: "Estatua", ancho: 14, alto: 20, papel: "Baohong - grano fino", estado: "disponible", img: "assets/img/inanimados/estatua.jpg" }
];

