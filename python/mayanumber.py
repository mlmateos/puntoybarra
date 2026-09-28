#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
mayanumber.py — Conversor de números decimales a:
  a) numerales mayas de puntos y barras, y
  b) notación vigesimal alfabética (0-9, A-J),
con colores por piso posicional (ciclo de 7 colores).

CRÉDITOS:
  Lógica original de la conversión y el coloreado por pisos:
  macro de Enrico Gregorio (egreg on TeX StackExchange, @eg9 on GitHub) en TeX StackExchange, respuesta a una pregunta de tatojo:
  https://tex.stackexchange.com/a/452806/18280
  Adaptación a Python y paleta de 7 colores: Manuel López Mateos (mlmateos),
  repositorio puntoybarra.

USO:
  mayanumber.py NUMERO [--horizontal] [--nocolor] [--alpha] [--palette]
"""

import argparse
import os
import sys

# Ciclo de 7 colores, de la posición 0 (unidades) hacia arriba:
PALETA = [
    ("tierra",     0x8B4513, "la tierra"),
    ("agua",       0x005B96, "el agua"),
    ("vegetacion", 0x2E8B57, "la vegetación"),
    ("vida",       0xDC143C, "la vida"),
    ("cielo",      0x87CEEB, "el cielo"),
    ("sol",        0xDAA520, "la luz, el sol"),
    ("universo",   0x6A0DAD, "el universo"),
]

ALFABETO = "0123456789ABCDEFGHIJ"
DOT, BAR, ZERO = "●", "━━━", "◎"   # punto, barra, concha (cero)
RESET = "\033[0m"


def digits_base20(n: int) -> list:
    """Dígitos en base 20, del más al menos significativo."""
    if n == 0:
        return [0]
    ds = []
    while n:
        ds.append(n % 20)
        n //= 20
    return ds[::-1]


def ansi_truecolor(hexv: int) -> str:
    r, g, b = (hexv >> 16) & 255, (hexv >> 8) & 255, hexv & 255
    return f"\033[38;2;{r};{g};{b}m"


def paint(text: str, pos: int, use_color: bool) -> str:
    """Colorea según el piso: ciclo de 7, residuo siempre positivo."""
    if not use_color:
        return text
    _, hexv, _ = PALETA[pos % 7]
    return f"{ansi_truecolor(hexv)}{text}{RESET}"


def level_rows(digit: int) -> list:
    """Líneas de un dígito maya (de arriba abajo): puntos sobre barras."""
    if digit == 0:
        return [ZERO]
    bars, dots = divmod(digit, 5)
    rows = []
    if dots:
        rows.append(" ".join([DOT] * dots))
    rows.extend([BAR] * bars)
    return rows


def render_vertical(digits: list, use_color: bool) -> str:
    """Pisos apilados: arriba el más significativo, abajo las unidades."""
    n = len(digits)
    bloques = []
    for i, d in enumerate(digits):
        pos = n - 1 - i
        bloques.append("\n".join(paint(r, pos, use_color) for r in level_rows(d)))
    return "\n\n".join(bloques)


def render_horizontal(digits: list, use_color: bool) -> str:
    """Pisos en línea, alineados sobre el suelo (como en el libro)."""
    n = len(digits)
    niveles = []
    for d in digits:
        rows = level_rows(d)
        width = max(len(r) for r in rows)
        niveles.append([r.center(width) for r in rows])
    height = max(len(r) for r in niveles)
    # rellenar arriba con espacios para que todos descansen en el mismo suelo
    niveles = [[" " * len(r[0])] * (height - len(r)) + r for r in niveles]
    lines = []
    for h in range(height):
        parts = [paint(niveles[lv][h], n - 1 - lv, use_color)
                 for lv in range(n)]
        lines.append("  ".join(parts))
    return "\n".join(lines)


def render_alpha(digits: list, use_color: bool) -> str:
    n = len(digits)
    return "".join(paint(ALFABETO[d], n - 1 - i, use_color)
                   for i, d in enumerate(digits))


def main() -> None:
    p = argparse.ArgumentParser(
        description="Conversor decimal → vigesimal maya y alfabético, con colores por piso.",
        epilog="Lógica original: Enrico Gregorio (egreg on TeX StackExchange, @eg9 on GitHub) (TeX SE, a/452806). Repo: mlmateos/puntoybarra.")
    p.add_argument("numero", nargs="?", help="Número decimal (sin límite de dígitos)")
    p.add_argument("--horizontal", action="store_true", help="Pisos en línea (default: vertical)")
    p.add_argument("--nocolor", action="store_true", help="Desactiva los colores")
    p.add_argument("--alpha", action="store_true", help="Notación alfabética 0-9, A-J")
    p.add_argument("--force-color", action="store_true", help="Colorea aunque no sea terminal")
    p.add_argument("--palette", action="store_true", help="Imprime la paleta y sale")
    args = p.parse_args()

    if args.palette:
        for pos, (nombre, hexv, significado) in enumerate(PALETA):
            print(f"{paint(f'pos {pos}', pos, True)}  {nombre:11s} #{hexv:06X}  {significado}")
        return

    if args.numero is None:
        p.error("falta el número decimal (o usa --palette)")

    limpio = args.numero.replace("_", "")
    if not limpio.isdigit():
        p.error(f"no es un decimal válido: {args.numero}")
    n = int(limpio)

    use_color = (not args.nocolor
                 and "NO_COLOR" not in os.environ
                 and (sys.stdout.isatty() or args.force_color))

    digits = digits_base20(n)
    print(f"{n} (decimal) = {render_alpha(digits, False)} (base 20)")
    print("-" * 40)
    if args.alpha:
        print(render_alpha(digits, use_color))
    elif args.horizontal:
        print(render_horizontal(digits, use_color))
    else:
        print(render_vertical(digits, use_color))


if __name__ == "__main__":
    main()
