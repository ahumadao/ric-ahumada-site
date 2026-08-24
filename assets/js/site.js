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
        var priceHtml = p.available && p.price != null
          ? '<div class="painting-price">$' + money.format(p.price) + '</div>'
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
