# puntoybarra 🌽

**Mayan vigesimal arithmetic for LaTeX, terminal and web — from the shell zero to the purple universe.**
**Aritmética vigesimal maya para LaTeX, terminal y web — del cero concha al universo morado.**

[![CTAN](https://img.shields.io/ctan/v/mayanumber)](https://ctan.org/pkg/mayanumber)
[![GitHub release](https://img.shields.io/github/v/release/mlmateos/puntoybarra)](https://github.com/mlmateos/puntoybarra/releases)

[English](#english) · [Español](#español)

---

## English

Converts decimal numbers into **Mayan numerals** (dots and bars) and
**vigesimal alphabetic notation** (0–9, A–J), coloring each positional *floor*
with a seven-color cycle.

### Origin and credits

- Original conversion logic and floor coloring: macro by **Enrico Gregorio (egreg on TeX StackExchange, @eg9 on GitHub)**, TeX
  StackExchange, answer to a question by **tatojo**:
  <https://tex.stackexchange.com/a/452806/18280>
- Extensions (seven-color palette, vertical+color defaults, `nocolor`,
  unlimited magnitude, CLI and web versions): **Manuel López Mateos**
  ([@mlmateos](https://github.com/mlmateos))

### Contents

| Path | What it is | Requirements |
|---|---|---|
| `latex/mayanumber.sty` | LaTeX package: `\mayanumber{N}` | XeLaTeX/LuaLaTeX, `xcolor`, `fontspec`, *BabelStone Mayan Numerals* font |
| `latex/ejemplo.tex`, `latex/sonda.tex` | Regression tests | same |
| `python/mayanumber.py` | Python CLI, unlimited precision | Python 3.9+ |
| `bash/mayanumber.sh` | Bash CLI, 64-bit integers | bash 4+ |
| `web/mayanumber.js` | Self-contained SVG widget (embeddable anywhere) | none (vanilla JS) |
| `web/index.html` | Interactive demo / online service | none |
| `docs/colores.md` | Palette and meanings | — |

### Installation

The package is published on CTAN and included in TeX Live:

```bash
tlmgr install mayanumber
```

With a standard TeX Live collection installed, `tlmgr` will even auto-install
it on first use. **Flexible configuration (v1.0.1+):** your own font and
colors may be declared anywhere in the preamble:

```latex
\usepackage{mayanumber}
\newfontface{\mayanumerals}{Noto Sans Mayan Numerals}  % works anywhere
\definecolor{mayaTierra}{HTML}{A0522D}                 % customize colors too
```

### The seven-color cycle

Floors are colored **bottom to top** (and **right to left** in horizontal
layout). The table reads like a Mayan stack: the earth below, the universe
above:

| Floor | Color | HEX | Meaning |
|---:|---|---|---|
| 6 | purple | `#6A0DAD` | the universe |
| 5 | yellow | `#DAA520` | light, the sun |
| 4 | light blue | `#87CEEB` | the sky |
| 3 | red | `#DC143C` | life |
| 2 | green | `#2E8B57` | vegetation |
| 1 | deep blue | `#005B96` | water |
| 0 | brown | `#8B4513` | the earth |


Beyond floor 6 the cycle repeats: the universe becomes earth again.

### Quick start

**LaTeX**

```latex
\usepackage{mayanumber}   % copy the .sty or point to this repo

\mayanumber{4581}                      % vertical + colors (default)
\mayanumber[horizontal]{4581}
\mayanumber[nocolor]{4581}
\mayanumber[nocolor, scale=3]{4581}    % options combine
\mayanumber*{4581}                     % alphabetic: B91 base-20
```

**Python (unlimited precision)**

```bash
python3 python/mayanumber.py 1234567890
python3 python/mayanumber.py 2187624240 --horizontal
python3 python/mayanumber.py 4581 --alpha --nocolor
python3 python/mayanumber.py --palette
```

**Bash (64-bit)**

```bash
./bash/mayanumber.sh 1234567890
./bash/mayanumber.sh 2187624240 --horizontal
```

**Web**

```html
<script src="mayanumber.js"></script>
<div class="mayanumber" data-value="4581"></div>
<div class="mayanumber" data-value="2187624240" data-layout="horizontal"></div>
<div class="mayanumber" data-value="4581" data-nocolor="true"></div>
```

The widget draws dots and bars as **SVG**: no Mayan font is needed in any
browser. Local demo: `cd web && python3 -m http.server 8000`.
Online service (GitHub Pages): <https://mlmateos.github.io/puntoybarra/>

### Tests

`latex/ejemplo.tex` and `latex/sonda.tex` are the regression tests: compile
them with XeLaTeX and check that only the `nocolor` lines print in black.

### License

MIT © 2026 Manuel López Mateos. See [LICENSE](LICENSE).

---

## Español

Convierte números decimales a **numerales mayas** (puntos y barras) y a
**notación vigesimal alfabética** (0–9, A–J), coloreando cada *piso*
posicional con un ciclo de siete colores.

### Origen y créditos

- Lógica original de conversión y coloreado por piso: macro de **Enrico Gregorio (egreg on TeX StackExchange, @eg9 on GitHub)** en
  TeX StackExchange, respuesta a una pregunta de **tatojo**:
  <https://tex.stackexchange.com/a/452806/18280>
- Extensiones (paleta de 7 colores, vertical+color por defecto, `nocolor`,
  magnitud ilimitada, versiones CLI y web): **Manuel López Mateos**
  ([@mlmateos](https://github.com/mlmateos))

### Contenido

| Ruta | Qué es | Requisitos |
|---|---|---|
| `latex/mayanumber.sty` | Paquete LaTeX: `\mayanumber{N}` | XeLaTeX/LuaLaTeX, `xcolor`, `fontspec`, fuente *BabelStone Mayan Numerals* |
| `latex/ejemplo.tex`, `latex/sonda.tex` | Pruebas de regresión | ídem |
| `python/mayanumber.py` | CLI Python, precisión ilimitada | Python 3.9+ |
| `bash/mayanumber.sh` | CLI bash, enteros de 64 bits | bash 4+ |
| `web/mayanumber.js` | Widget SVG autocontenido (insertable en cualquier página) | ninguno (vanilla JS) |
| `web/index.html` | Demo interactiva / servicio en línea | ninguno |
| `docs/colores.md` | La paleta y sus significados | — |

### Instalación

El paquete está publicado en CTAN e incluido en TeX Live:

```bash
tlmgr install mayanumber
```

Con una colección estándar de TeX Live instalada, `tlmgr` lo auto-instalará
incluso en el primer uso. **Configuración flexible (v1.0.1+):** tu propia
fuente y colores pueden declararse en cualquier parte del preámbulo:

```latex
\usepackage{mayanumber}
\newfontface{\mayanumerals}{Noto Sans Mayan Numerals}  % funciona en cualquier posición
\definecolor{mayaTierra}{HTML}{A0522D}                 % personalizar colores también
```

### El ciclo de siete colores

Los pisos se colorean **de abajo hacia arriba** (y **de derecha a izquierda**
en modo horizontal). La tabla se lee como se apila un número maya: la tierra
abajo, el universo arriba:

| Piso | Color | HEX | Significado |
|---:|---|---|---|
| 6 | morado | `#6A0DAD` | el universo |
| 5 | amarillo | `#DAA520` | la luz, el sol |
| 4 | azul claro | `#87CEEB` | el cielo |
| 3 | rojo | `#DC143C` | la vida |
| 2 | verde | `#2E8B57` | la vegetación |
| 1 | azul profundo | `#005B96` | el agua |
| 0 | café | `#8B4513` | la tierra |

Pasado el piso 6 el ciclo se repite: el universo vuelve a ser tierra.

### Uso rápido

**LaTeX**

```latex
\usepackage{mayanumber}   % copia el .sty o apunta al repo

\mayanumber{4581}                      % vertical + colores (default)
\mayanumber[horizontal]{4581}
\mayanumber[nocolor]{4581}
\mayanumber[nocolor, scale=3]{4581}    % opciones combinables
\mayanumber*{4581}                     % alfabético: B91 en base 20
```

**Python (precisión ilimitada)**

```bash
python3 python/mayanumber.py 1234567890
python3 python/mayanumber.py 2187624240 --horizontal
python3 python/mayanumber.py 4581 --alpha --nocolor
python3 python/mayanumber.py --palette
```

**Bash (64 bits)**

```bash
./bash/mayanumber.sh 1234567890
./bash/mayanumber.sh 2187624240 --horizontal
```

**Web**

```html
<script src="mayanumber.js"></script>
<div class="mayanumber" data-value="4581"></div>
<div class="mayanumber" data-value="2187624240" data-layout="horizontal"></div>
<div class="mayanumber" data-value="4581" data-nocolor="true"></div>
```

El widget dibuja puntos y barras con **SVG**: ningún navegador necesita
fuentes mayas. Demo local: `cd web && python3 -m http.server 8000`.
Servicio en línea (GitHub Pages): <https://mlmateos.github.io/puntoybarra/>

### Licencia

MIT © 2026 Manuel López Mateos. Véase [LICENSE](LICENSE).

