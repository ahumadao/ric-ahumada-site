(function () {
  "use strict";
  const C = window.CONFIG, OBRAS = window.OBRAS, SERIES = window.SERIES;
  const IMG = window.IMG_OVERRIDE || {};          // solo para la vista previa
  const $ = (s, el = document) => el.querySelector(s);
  const main = $("#contenido");
  const visor = $("#visor");
  let temporizador = null;

  const fuente = (o) => IMG[o.id] || o.img;
  const pesos = (n) => "$" + n.toLocaleString("es-CL");
  const formatoDe = (o) => C.formatos.find((f) => o.ancho * o.alto <= f.hasta);
  const medidas = (o) => `${o.ancho} × ${o.alto} cm`;
  const porId = (id) => OBRAS.find((o) => o.id === id);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function cargar(src) {
    return new Promise((ok) => {
      if (!src) return ok(false);
      const i = new Image();
      i.onload = () => ok(true);
      i.onerror = () => ok(false);
      i.src = src;
    });
  }

  function imagen(o, clase = "") {
    const src = fuente(o);
    if (!src) return marcador(o);
    return `<img class="${clase}" src="${esc(src)}" alt="${esc(o.titulo)}, acuarela de Ric Ahumada" loading="lazy"
      onerror="this.outerHTML=window.__marcador('${o.id}')">`;
  }
  function marcador(o) {
    return `<div class="sin-imagen" style="aspect-ratio:${o.ancho}/${o.alto}">${esc(o.titulo)}</div>`;
  }
  window.__marcador = (id) => marcador(porId(id));

  /* ---------- Portada ---------- */
  async function portada() {
    const candidatas = C.destacadas.map(porId).filter(Boolean);
    const cargadas = await Promise.all(candidatas.map((o) => cargar(fuente(o))));
    const diapos = candidatas.filter((_, i) => cargadas[i]);

    const portadasSerie = await Promise.all(SERIES.map(async (s) => {
      const obras = OBRAS.filter((o) => o.serie === s.id);
      const preferidas = [...obras.filter((o) => C.destacadas.includes(o.id)), ...obras];
      for (const o of preferidas) if (await cargar(fuente(o))) return o;
      return null;
    }));

    main.innerHTML = `
      <section class="carrusel" aria-roledescription="carrusel" aria-label="Obras destacadas">
        <div class="lamina">
          ${diapos.map((o, i) => `
            <div class="diapo${i === 0 ? " activa" : ""}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${diapos.length}" ${i ? 'aria-hidden="true"' : ""}>
              <button type="button" data-abrir="${o.id}" aria-label="Ver ${esc(o.titulo)}"><img src="${esc(fuente(o))}" alt="${esc(o.titulo)}"></button>
            </div>`).join("")}
        </div>
        <div class="carrusel-pie">
          <div class="cartela-corta" aria-live="polite"></div>
          ${diapos.length > 1 ? `<div class="controles">
            <button type="button" data-paso="-1" aria-label="Obra anterior">‹</button>
            <span class="contador"></span>
            <button type="button" data-paso="1" aria-label="Obra siguiente">›</button>
          </div>` : ""}
        </div>
      </section>
      <section class="presentacion"><p>Acuarelas originales de paisaje, ciudad y objetos cotidianos. Cada obra es única y se entrega sin enmarcar.</p></section>
      <section class="series" aria-label="Series">
        ${SERIES.map((s, i) => `
          <a class="serie" href="#${s.id}">
            <div class="marco">${portadasSerie[i] ? `<img src="${esc(fuente(portadasSerie[i]))}" alt="" loading="lazy">` : ""}</div>
            <h2>${s.nombre}</h2>
            <p>${s.bajada} ${OBRAS.filter((o) => o.serie === s.id).length} obras.</p>
          </a>`).join("")}
      </section>`;

    if (!diapos.length) return;
    let actual = 0;
    const nodos = [...main.querySelectorAll(".diapo")];
    const cartela = $(".cartela-corta", main);
    const contador = $(".contador", main);
    const mostrar = (n) => {
      nodos[actual].classList.remove("activa"); nodos[actual].setAttribute("aria-hidden", "true");
      actual = (n + nodos.length) % nodos.length;
      nodos[actual].classList.add("activa"); nodos[actual].removeAttribute("aria-hidden");
      const o = diapos[actual];
      cartela.innerHTML = `<p class="titulo">${esc(o.titulo)}</p><p class="datos">Acuarela sobre papel ${esc(o.papel)}, ${medidas(o)}</p>`;
      if (contador) contador.textContent = `${actual + 1} / ${nodos.length}`;
    };
    mostrar(0);
    main.querySelectorAll("[data-paso]").forEach((b) => b.addEventListener("click", () => { mostrar(actual + Number(b.dataset.paso)); reiniciar(); }));

    const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reiniciar = () => {
      clearInterval(temporizador);
      if (!quieto && nodos.length > 1) temporizador = setInterval(() => mostrar(actual + 1), 6500);
    };
    const carrusel = $(".carrusel", main);
    carrusel.addEventListener("mouseenter", () => clearInterval(temporizador));
    carrusel.addEventListener("mouseleave", reiniciar);
    carrusel.addEventListener("focusin", () => clearInterval(temporizador));
    carrusel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") mostrar(actual + 1);
      if (e.key === "ArrowLeft") mostrar(actual - 1);
    });
    reiniciar();
  }

  /* ---------- Galería por serie ---------- */
  function galeria(serie) {
    const obras = [...OBRAS.filter((o) => o.serie === serie.id)]
      .sort((a, b) => (a.estado === "vendida") - (b.estado === "vendida"));
    main.innerHTML = `
      <header class="encabezado-pagina"><h1>${serie.nombre}</h1><p>${serie.bajada}</p></header>
      <section class="galeria">
        ${obras.map((o) => `
          <figure class="obra">
            <button type="button" data-abrir="${o.id}" aria-label="Ver ${esc(o.titulo)}">${imagen(o)}</button>
            <figcaption>
              <span class="titulo">${esc(o.titulo)}</span>
              <span class="datos">${medidas(o)}</span>
              ${o.estado === "vendida" ? `<span class="vendida-marca">Colección privada</span>` : ""}
            </figcaption>
          </figure>`).join("")}
      </section>`;
  }

  /* ---------- Visor de obra ---------- */
  function abrir(id) {
    const o = porId(id); if (!o) return;
    const f = formatoDe(o);
    const link = C.mercadoPago[f.nombre];
    const asunto = encodeURIComponent(`Consulta por «${o.titulo}»`);
    const correo = `mailto:${C.correo}?subject=${asunto}`;
    let compra = "";
    if (o.estado === "disponible") {
      compra = link
        ? `<a class="boton principal" href="${esc(link)}" target="_blank" rel="noopener">Pagar con Mercado Pago</a>
           <a class="boton secundario" href="${correo}">Consultar por correo</a>
           <small>Formato ${f.nombre.toLowerCase()}, ${pesos(f.precio)} más ${C.recargoMercadoPago} de recargo por Mercado Pago. Después de pagar, envía el comprobante a ${C.correo} indicando el nombre de la obra.</small>`
        : `<a class="boton principal" href="${correo}">Consultar por esta obra</a>
           <small>Respondo con disponibilidad y link de pago.</small>`;
    }
    $(".visor-imagen", visor).innerHTML = imagen(o);
    $(".visor-cartela", visor).innerHTML = `
      <h2 id="visor-titulo">${esc(o.titulo)}</h2>
      <dl>
        <dt>Técnica</dt><dd>Acuarela sobre papel ${esc(o.papel)}</dd>
        <dt>Medidas</dt><dd>${medidas(o)}, sin marco</dd>
        <dt>Formato</dt><dd><a href="#precios" data-cerrar>${f.nombre}</a></dd>
        <dt>Estado</dt><dd>${o.estado === "disponible" ? "Disponible" : "Colección privada"}</dd>
      </dl>
      ${o.nota ? `<p class="nota">${esc(o.nota)}.</p>` : ""}
      <div class="adquirir">${compra}</div>`;
    clearInterval(temporizador);
    visor.showModal();
    $(".cerrar", visor).focus();
  }
  visor.addEventListener("click", (e) => {
    if (e.target.closest("[data-cerrar]") || e.target.closest(".cerrar")) visor.close();
  });

  /* ---------- Páginas de texto ---------- */
  function precios() {
    const ejemplos = ["10 × 15 cm", "14 × 19 cm", "19 × 28 cm", "25 × 35 cm", "38 × 56 cm"];
    let desde = 0;
    const filas = C.formatos.map((f, i) => {
      const rango = f.hasta === Infinity ? `más de ${desde.toLocaleString("es-CL")} cm²` :
        (desde ? `${(desde + 1).toLocaleString("es-CL")} a ${f.hasta.toLocaleString("es-CL")} cm²` : `hasta ${f.hasta} cm²`);
      desde = f.hasta;
      return `<tr><td>${f.nombre}</td><td>${rango}</td><td>${ejemplos[i] || ""}</td><td>${pesos(f.precio)}</td></tr>`;
    }).join("");
    main.innerHTML = `
      <header class="encabezado-pagina"><h1>Precios</h1>
        <p>El valor de cada acuarela depende de su formato, que se calcula según la superficie del papel (ancho × alto). Al abrir una obra en la galería verás su formato.</p></header>
      <section class="texto">
        <table class="tabla-precios">
          <thead><tr><th>Formato</th><th>Superficie</th><th>Por ejemplo</th><th>Valor</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
        <p>Valores en pesos chilenos, sin marco. El pago con Mercado Pago tiene un recargo de ${C.recargoMercadoPago}. Revisa las <a href="#condiciones">condiciones de venta</a>.</p>
      </section>`;
  }

  function condiciones() {
    main.innerHTML = `
      <header class="encabezado-pagina"><h1>Condiciones de venta</h1></header>
      <section class="texto">
        <h2>Las obras</h2>
        <p>Todas son acuarelas originales y únicas, pintadas sobre papel 100% de calidad profesional (Arches, Saunders Waterford y Baohong) con acuarelas White Nights y Schmincke Horadam.</p>
        <p>Algunas fueron realizadas en cursos o talleres. Cuando es así, se indica en la ficha de la obra.</p>
        <p>Se entregan sin enmarcar. Si quieres la obra enmarcada, el marco se cotiza aparte, según disponibilidad.</p>
        <h2>Pago</h2>
        <p>Por transferencia bancaria (te envío los datos por correo) o con Mercado Pago, con débito o crédito, con un recargo de ${C.recargoMercadoPago}.</p>
        <p>Después de pagar, envía el comprobante a <a href="mailto:${C.correo}">${C.correo}</a> indicando el nombre de la obra.</p>
        <h2>Entrega</h2>
        <p>Por lo general la entrega la hago yo. En algunos casos uso una empresa de transporte de confianza.</p>
        <p>Si necesitas envío a domicilio, puedes <a href="${C.envioMercadoPago}" target="_blank" rel="noopener">pagarlo con Mercado Pago</a>.</p>
      </section>`;
  }

  function sobreMi() {
    const foto = IMG.__yo || "assets/img/portada/yo.png";
    main.innerHTML = `
      <header class="encabezado-pagina"><h1>Hola, soy Ricardo</h1></header>
      <section class="sobre">
        <img src="${foto}" alt="Ricardo pintando en la academia CAPA" onerror="this.remove()">
        <div class="texto">
          <p>La mayor parte del tiempo trabajo en salud pública, y por mucho tiempo sentí la necesidad de equilibrar lo técnico con lo creativo. La acuarela llegó en 2020 como un regalo de Javiera, mi compañera, y se volvió una forma de darle espacio a la expresión artística, que también he explorado a través de la música y el baile.</p>
          <p>Estudio en la <a href="https://www.capa-academia.com/" target="_blank" rel="noopener">academia CAPA</a>. Hice el curso inicial de nueve meses con profesores como Gonzalo Ibáñez, Pedro Sócrates y Jorge Salinas, y hoy curso el nivel avanzado.</p>
          <p>Para consultas o encargos, escríbeme a <a href="mailto:${C.correo}">${C.correo}</a> o por <a href="${C.instagram}" target="_blank" rel="noopener">Instagram</a>.</p>
        </div>
      </section>`;
  }

  /* ---------- Rutas ---------- */
  const rutas = {
    "": portada, "inicio": portada, "precios": precios, "condiciones": condiciones, "sobre-mi": sobreMi
  };
  SERIES.forEach((s) => { rutas[s.id] = () => galeria(s); });

  function navegar() {
    clearInterval(temporizador);
    if (visor.open) visor.close();
    const ruta = decodeURIComponent(location.hash.slice(1));
    (rutas[ruta] || portada)();
    document.querySelectorAll(".menu a").forEach((a) => {
      a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + ruta);
      if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
    });
    const serie = SERIES.find((s) => s.id === ruta);
    document.title = serie ? `${serie.nombre} | Ric Ahumada` : "Ric Ahumada | Acuarelas";
    window.scrollTo(0, 0);
  }
  main.addEventListener("click", (e) => {
    const b = e.target.closest("[data-abrir]");
    if (b) abrir(b.dataset.abrir);
  });
  window.addEventListener("hashchange", navegar);
  document.getElementById("anio").textContent = new Date().getFullYear();
  navegar();
})();
