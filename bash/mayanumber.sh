#!/usr/bin/env bash
# mayanumber.sh — Conversor decimal → vigesimal maya (puntos y barras) y
# alfabético, con colores por piso posicional (ciclo de 7). Puro bash.
#
# CRÉDITOS:
#   Lógica original: macro de Enrico Gregorio (egreg on TeX StackExchange, @eg9 on GitHub) en TeX StackExchange, respuesta a una
#   pregunta de tatojo: https://tex.stackexchange.com/a/452806/18280
#   Adaptación a bash y paleta de 7 colores: Manuel López Mateos (mlmateos),
#   repositorio puntoybarra.
#
# LÍMITE: enteros de 64 bits (9223372036854775807). Para magnitudes mayores,
#         usa python/mayanumber.py (precisión ilimitada).

set -u

PALETA_HEX=(8B4513 005B96 2E8B57 DC143C 87CEEB DAA520 6A0DAD)
PALETA_NOMBRE=(tierra agua vegetacion vida cielo sol universo)
PALETA_SIGNIFICADO=("la tierra" "el agua" "la vegetación" "la vida" "el cielo" "la luz, el sol" "el universo")
ALFABETO="0123456789ABCDEFGHIJ"
DOT='●'
BAR='━━━'
ZERO='◎'

HORIZONTAL=0; NOCOLOR=0; ALPHA=0; FORCE=0; PALETTE=0; NUM=""

usage() {
  cat <<'USO'
Uso: mayanumber.sh NUMERO [opciones]
  --horizontal     pisos en línea (default: vertical)
  --nocolor, -n    sin colores
  --alpha, -a      notación alfabética 0-9, A-J
  --palette, -p    imprime la paleta y sale
  --force-color    colorea aunque la salida no sea una terminal
  -h, --help       esta ayuda
USO
}

while (( $# > 0 )); do
  case "$1" in
    --horizontal)  HORIZONTAL=1 ;;
    --nocolor|-n)  NOCOLOR=1 ;;
    --alpha|-a)    ALPHA=1 ;;
    --force-color) FORCE=1 ;;
    --palette|-p)  PALETTE=1 ;;
    -h|--help)     usage; exit 0 ;;
    -*)            echo "mayanumber.sh: opción desconocida: $1" >&2; usage >&2; exit 2 ;;
    *)             NUM="$1" ;;
  esac
  shift
done

# ¿Colorear? Respeta NO_COLOR (https://no-color.org) y tuberías.
USE_COLOR=1
if (( NOCOLOR )) || [[ -n "${NO_COLOR:-}" ]]; then USE_COLOR=0; fi
if (( ! FORCE )) && [[ ! -t 1 ]]; then USE_COLOR=0; fi

PAINTED=""
paint() {   # $1=texto  $2=posición  → resultado en $PAINTED
  if (( ! USE_COLOR )); then PAINTED="$1"; return; fi
  local hex=${PALETA_HEX[$(( $2 % 7 ))]}
  local r=$(( 16#${hex:0:2} )) g=$(( 16#${hex:2:2} )) b=$(( 16#${hex:4:2} ))
  printf -v PAINTED '\033[38;2;%d;%d;%dm%s\033[0m' "$r" "$g" "$b" "$1"
}

if (( PALETTE )); then
  for i in 0 1 2 3 4 5 6; do
    paint "pos $i" "$i"
    printf '%s  %-11s #%s  %s\n' "$PAINTED" "${PALETA_NOMBRE[i]}" "${PALETA_HEX[i]}" "${PALETA_SIGNIFICADO[i]}"
  done
  exit 0
fi

if [[ -z "$NUM" ]]; then usage >&2; exit 2; fi
NUM="${NUM//_/}"
if [[ ! "$NUM" =~ ^[0-9]+$ ]]; then
  echo "mayanumber.sh: no es un decimal válido: $NUM" >&2; exit 2
fi
while (( ${#NUM} > 1 )) && [[ $NUM == 0* ]]; do NUM="${NUM#0}"; done
if (( ${#NUM} > 19 )); then
  echo "mayanumber.sh: fuera del rango de 64 bits; usa python/mayanumber.py" >&2; exit 1
fi
N=$(( 10#$NUM ))

# ---- dígitos en base 20, del más al menos significativo ----
digits=()
if (( N == 0 )); then
  digits=(0)
else
  while (( N > 0 )); do digits+=( $(( N % 20 )) ); N=$(( N / 20 )); done
  rev=()
  for (( i=${#digits[@]}-1; i>=0; i-- )); do rev+=( "${digits[i]}" ); done
  digits=( "${rev[@]}" )
fi
ND=${#digits[@]}

# ---- líneas de un dígito: puntos sobre barras; cero = concha ----
ROWS=()
level_rows() {
  ROWS=()
  local d=$1 bars dots i line
  if (( d == 0 )); then ROWS=( "$ZERO" ); return; fi
  bars=$(( d / 5 )); dots=$(( d % 5 ))
  if (( dots > 0 )); then
    line=""
    for (( i=0; i<dots; i++ )); do line+="$DOT "; done
    ROWS+=( "${line% }" )
  fi
  for (( i=0; i<bars; i++ )); do ROWS+=( "$BAR" ); done
}

plain=""
for (( i=0; i<ND; i++ )); do d=${digits[i]}; plain+="${ALFABETO:d:1}"; done
printf '%s (decimal) = %s (base 20)\n' "$NUM" "$plain"
printf '%s\n' '----------------------------------------'

if (( ALPHA )); then
  out=""
  for (( i=0; i<ND; i++ )); do
    d=${digits[i]}
    paint "${ALFABETO:d:1}" $(( ND - 1 - i ))
    out+="$PAINTED"
  done
  printf '%s\n' "$out"
  exit 0
fi

if (( HORIZONTAL )); then
  # celdas centradas por nivel, todos apoyados en el mismo suelo
  declare -A CELL=()
  widths=(); heights=(); maxh=0
  for (( lv=0; lv<ND; lv++ )); do
    level_rows "${digits[lv]}"
    w=0
    for r in "${ROWS[@]}"; do (( ${#r} > w )) && w=${#r}; done
    widths[lv]=$w; heights[lv]=${#ROWS[@]}
    (( ${#ROWS[@]} > maxh )) && maxh=${#ROWS[@]}
    for (( k=0; k<${#ROWS[@]}; k++ )); do
      r=${ROWS[k]}
      pad=$(( w - ${#r} )); left=$(( pad / 2 )); right=$(( pad - left ))
      printf -v tmp '%*s%s%*s' "$left" '' "$r" "$right" ''
      CELL[$lv,$k]=$tmp
    done
  done
  for (( h=0; h<maxh; h++ )); do
    line=""
    for (( lv=0; lv<ND; lv++ )); do
      idx=$(( h - (maxh - heights[lv]) ))
      if (( idx >= 0 )); then cell="${CELL[$lv,$idx]}"
      else printf -v cell '%*s' "${widths[lv]}" ''; fi
      paint "$cell" $(( ND - 1 - lv ))
      line+="$PAINTED  "
    done
    printf '%s\n' "$line"
  done
else
  for (( i=0; i<ND; i++ )); do
    level_rows "${digits[i]}"
    for r in "${ROWS[@]}"; do
      paint "$r" $(( ND - 1 - i ))
      printf '%s\n' "$PAINTED"
    done
    if (( i < ND - 1 )); then printf '\n'; fi
  done
fi
