library(tidyverse)
library(fs)
library(glue)

# Scans a folder of images and returns the HTML for a responsive gallery.
# Usage inside an .Rmd chunk:
#   build_gallery("photos/paisaje-natural")
build_gallery <- function(folder, exts = c("jpg", "jpeg", "png", "webp")) {

  pattern <- exts %>%
    str_c(collapse = "|") %>%
    glue("\\.({.})$", .open = "{", .close = "}")

  files <- dir_ls(folder, recurse = FALSE, type = "file") %>%
    keep(~ str_detect(.x, regex(pattern, ignore_case = TRUE)))

  if (length(files) == 0) {
    return(glue(
      "<div class='gallery-empty'>",
      "Aún no hay fotos en <code>{folder}</code>. ",
      "Agrega tus acuarelas ahí y vuelve a renderizar el sitio.",
      "</div>"
    ))
  }

  items <- files %>%
    map_chr(~ glue(
      "<figure class='gallery-item'>",
      "<img src='{.x}' alt='Acuarela de Ricardo Ahumada' loading='lazy'>",
      "</figure>"
    )) %>%
    str_c(collapse = "\n")

  glue("<div class='gallery-grid'>\n{items}\n</div>")
}
