# puntoybarra 🌽

**Mayan vigesimal arithmetic for LaTeX, terminal and web — from the shell zero to the purple universe.**
**Aritmética vigesimal maya para LaTeX, terminal y web — del cero concha al universo morado.**

[English](#english) · [Español](#español)

---

## English

Converts decimal numbers into **Mayan numerals** (dots and bars) and
**vigesimal alphabetic notation** (0–9, A–J), coloring each positional *floor*
with a seven-color cycle.

### Origin and credits

- Original conversion logic and floor coloring: macro by **@egreg**, TeX
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

### The seven-color cycle

Floors are colored **bottom to top** (and **right to left** in horizontal
layout):

| Floor | Color | HEX | Meaning |
|---:|---|---|---|
| 0 | brown | `#8B4513` | the earth |
| 1 | deep blue | `#005B96` | water |
| 2 | green | `#2E8B57` | vegetation |
| 3 | red | `#DC143C` | life |
| 4 | light blue | `#87CEEB` | the sky |
| 5 | yellow | `#DAA520` | light, the sun |
| 6 | purple | `#6A0DAD` | the universe |

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

Included in TeX Live; install with `tlmgr install mayanumber` or let your collection pull it automatically.

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

### License

MIT © 2026 Manuel López Mateos. See [LICENSE](LICENSE).

---

## Español

Convierte números decimales a **numerales mayas** (puntos y barras) y a
**notación vigesimal alfabética** (0–9, A–J), coloreando cada *piso*
posicional con un ciclo de siete colores.

### Origen y créditos

- Lógica original de conversión y coloreado por piso: macro de **@egreg** en
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

### El ciclo de siete colores

Los pisos se colorean **de abajo hacia arriba** (y **de derecha a izquierda**
en modo horizontal):

| Piso | Color | HEX | Significado |
|---:|---|---|---|
| 0 | café | `#8B4513` | la tierra |
| 1 | azul profundo | `#005B96` | el agua |
| 2 | verde | `#2E8B57` | la vegetación |
| 3 | rojo | `#DC143C` | la vida |
| 4 | azul claro | `#87CEEB` | el cielo |
| 5 | amarillo | `#DAA520` | la luz, el sol |
| 6 | morado | `#6A0DAD` | el universo |

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

Incluido en TeX Live; se instala con `tlmgr install mayanumber` o deja que tu `collection` la jale de manera automática.

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

