// Mobile nav toggle (dropdown-on-hover doesn't work on touch, so also toggle on click/tap)
document.addEventListener('DOMContentLoaded', function () {
  var navBar = document.querySelector('.nav-bar');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      navBar.classList.toggle('menu-open');
    });
  }

  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      btn.parentElement.classList.toggle('open');
    });
  });
});

// Lightbox: agranda la imagen de una obra al hacer clic. Se crea una sola vez
// y se reutiliza en cualquier página que tenga .painting-card img.
function ensureLightbox() {
  var dialog = document.getElementById('lightbox');
  if (dialog) return dialog;

  dialog = document.createElement('dialog');
  dialog.id = 'lightbox';
  dialog.className = 'lightbox';
  dialog.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Cerrar">&times;</button>' +
    '<img alt="">' +
    '<div class="lightbox-caption"><strong></strong><span></span></div>';
  document.body.appendChild(dialog);

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.closest('.lightbox-close')) dialog.close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dialog.open) dialog.close();
  });

  document.addEventListener('click', function (e) {
    var img = e.target.closest('.painting-card img');
    if (!img) return;
    var card = img.closest('.painting-card');
    dialog.querySelector('img').src = img.src;
    dialog.querySelector('img').alt = img.alt;
    dialog.querySelector('.lightbox-caption strong').textContent =
      card ? card.querySelector('.painting-title').textContent.replace(/^[^\wÀ-ÿ]+/, '') : img.alt;
    var meta = card ? card.querySelector('.painting-meta') : null;
    dialog.querySelector('.lightbox-caption span').textContent = meta ? meta.textContent : '';
    dialog.showModal();
  });

  return dialog;
}
document.addEventListener('DOMContentLoaded', ensureLightbox);

// Precio por tamaño (ancho × alto, en cm²). El precio de cada obra disponible
// se calcula siempre a partir de esta tabla — el campo "price" de los JSON
// de data/ ya no se usa. Para cambiar precios, edita los montos aquí.
var PRICING_TIERS = [
  { nombre: 'Mini', hasta: 200, precio: 20000 },
  { nombre: 'Pequeño', hasta: 350, precio: 30000 },
  { nombre: 'Mediano', hasta: 750, precio: 40000 },
  { nombre: 'Grande', hasta: 1200, precio: 55000 },
  { nombre: 'Extra grande', hasta: Infinity, precio: 80000 }
];

// Extrae ancho y alto (en cm) desde strings como "~19x14 cms." o "26x36 cms."
// y devuelve el precio del tramo correspondiente, o null si no se pudo leer.
function priceFromDimensions(dimensions) {
  if (!dimensions) return null;
  var match = /(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i.exec(dimensions);
  if (!match) return null;
  var area = parseFloat(match[1]) * parseFloat(match[2]);
  for (var i = 0; i < PRICING_TIERS.length; i++) {
    if (area <= PRICING_TIERS[i].hasta) return PRICING_TIERS[i].precio;
  }
  return null;
}

// Renders a category's painting list into a .gallery-grid element from a JSON data file.
function renderGallery(dataUrl, mountSelector) {
  var mount = document.querySelector(mountSelector);
  if (!mount) return;

  fetch(dataUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('No se pudo cargar ' + dataUrl);
      return res.json();
    })
    .then(function (paintings) {
      if (!paintings || paintings.length === 0) {
        mount.innerHTML = '<div class="gallery-empty">Próximamente nuevas obras.</div>';
        return;
      }

      var money = new Intl.NumberFormat('es-CL');
      var html = paintings.map(function (p) {
        var dotClass = p.available ? 'available' : 'sold';
        var dotEmoji = p.available ? '🟢' : '🔴';
        var computedPrice = priceFromDimensions(p.dimensions);
        var priceHtml = p.available && computedPrice != null
          ? '<div class="painting-price">$' + money.format(computedPrice) + '</div>'
          : '<div class="painting-price sold">No disponible</div>';
        var courseHtml = p.course
          ? '<div class="painting-course">Realizado en contexto de curso.</div>'
          : '';

        return (
          '<article class="painting-card">' +
            '<img src="' + p.image + '" alt="' + escapeHtml(p.title) + '" loading="lazy">' +
            '<div class="painting-body">' +
              '<p class="painting-title"><span class="dot ' + dotClass + '">' + dotEmoji + '</span>' + escapeHtml(p.title) + '</p>' +
              '<p class="painting-meta">' + escapeHtml(p.dimensions) + '</p>' +
              '<p class="painting-meta">' + escapeHtml(p.paper) + '</p>' +
              '<p class="painting-meta">' + escapeHtml(p.paint) + '</p>' +
              courseHtml +
              priceHtml +
            '</div>' +
          '</article>'
        );
      }).join('');

      mount.innerHTML = html;
    })
    .catch(function (err) {
      mount.innerHTML = '<div class="gallery-empty">No se pudo cargar la galería.</div>';
      console.error(err);
    });
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
