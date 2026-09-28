The mayanumber package
======================

Mayan numerals (dots and bars) and vigesimal alphabetic notation (0-9, A-J)
for LaTeX, with positional floor colors in a seven-color cycle.

- Engines: XeLaTeX or LuaLaTeX. Loads xcolor and fontspec automatically.
- Font: requires the free font "BabelStone Mayan Numerals"
  (https://www.babelstone.co.uk/Fonts/). An alternative face (e.g. Noto Sans
  Mayan Numerals) can be declared as \mayanumerals BEFORE loading the
  package; the package then skips its own declaration.
- Default output: vertical stack of glyphs, colored by positional floor
  (floor 0 = units at the bottom). Options: vertical|horizontal,
  colors|nocolor, scale=<n>, align=<c|t|b>; they combine freely.
  Starred form \mayanumber*{N} prints the alphabetic notation.
- Unlimited magnitude: base-20 conversion by long division over the decimal
  string, immune to TeX's 32-bit integer limit.

Files:
  mayanumber.sty      the package
  mayanumber.pdf      documentation (compile mayanumber-doc.tex with XeLaTeX)
  mayanumber-doc.tex  documentation source
  LICENSE             MIT, with attribution to the original macro

Credits:
  Original macro by Enrico Gregorio (egreg on TeX StackExchange, @eg9 on GitHub), TeX StackExchange, answer to a question by tatojo:
  https://tex.stackexchange.com/a/452806/18280
  Extensions (seven-color cycle, defaults, nocolor, unlimited magnitude):
  Manuel López Mateos, 2026.

Source and development: https://github.com/mlmateos/puntoybarra

Version 1.0, 2026-09-09
