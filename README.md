# ric-ahumada.com

Sitio de acuarelas de Ric Ahumada. HTML, CSS y JavaScript sin dependencias,
publicado con GitHub Pages.

## Editar obras

Todo el catálogo está en `assets/js/obras.js`:

- **Estado:** `estado: "disponible"` o `estado: "no disponible"`.
- **Agregar una obra:** copia una línea de `window.OBRAS`, cambia sus datos y
  usa un `id` único (sin tildes ni espacios). La foto va en
  `assets/img/<serie>/`.
- **Carrusel de portada:** lista `destacadas`, por `id` y en orden.
- **Precios:** `formatos`, según la superficie del papel (ancho × alto).

## Ver localmente

```
python -m http.server 8000
```

y abre `http://localhost:8000`.
