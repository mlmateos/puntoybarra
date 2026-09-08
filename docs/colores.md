# La paleta de siete pisos / The seven-floor palette

## Español

En el sistema vigesimal maya, cada posición es un *piso* del edificio del
número: las unidades (20⁰) se apoyan en el suelo y cada piso superior
multiplica por veinte. Esta paleta asigna a cada piso un color y un
significado, de abajo hacia arriba:

| Piso | Potencia | Color | HEX | Significado |
|---:|---|---|---|---|
| 0 | 20⁰ | café | `#8B4513` | la tierra |
| 1 | 20¹ | azul profundo | `#005B96` | el agua |
| 2 | 20² | verde | `#2E8B57` | la vegetación |
| 3 | 20³ | rojo | `#DC143C` | la vida |
| 4 | 20⁴ | azul claro | `#87CEEB` | el cielo |
| 5 | 20⁵ | amarillo | `#DAA520` | la luz, el sol |
| 6 | 20⁶ | morado | `#6A0DAD` | el universo |

### Reglas de lectura

- **Vertical**: el piso 0 queda abajo; se lee de abajo hacia arriba.
- **Horizontal**: el piso 0 queda a la derecha; se lee de derecha a izquierda.
- **Ciclo**: en el piso 7 el ciclo se reinicia; el universo vuelve a ser
  tierra, como los ciclos calendáricos que se renuevan.

### Agua y cielo

Los dos azules se distinguen por luminosidad: el **agua** es honda y saturada
(`#005B96`); el **cielo** es claro y aéreo (`#87CEEB`). En imprenta y en
pantalla deben leerse como dos aguas distintas del mismo mundo: la que se
pisa y la que se mira.

### Nombres en cada implementación

| Piso | LaTeX (`xcolor`) | Python / bash / web |
|---:|---|---|
| 0 | `mayaTierra` | `tierra` |
| 1 | `mayaAgua` | `agua` |
| 2 | `mayaVegetacion` | `vegetacion` |
| 3 | `mayaVida` | `vida` |
| 4 | `mayaCielo` | `cielo` |
| 5 | `mayaSol` | `sol` |
| 6 | `mayaUniverso` | `universo` |

En LaTeX los colores se declaran con `\providecolor`, de modo que el usuario
puede redefinirlos *antes* de cargar el paquete sin romper nada.

---

## English

In the Mayan vigesimal system, each position is a *floor* of the number's
building: the units (20⁰) rest on the ground and each higher floor multiplies
by twenty. This palette assigns each floor a color and a meaning, from bottom
to top:

| Floor | Power | Color | HEX | Meaning |
|---:|---|---|---|---|
| 0 | 20⁰ | brown | `#8B4513` | the earth |
| 1 | 20¹ | deep blue | `#005B96` | water |
| 2 | 20² | green | `#2E8B57` | vegetation |
| 3 | 20³ | red | `#DC143C` | life |
| 4 | 20⁴ | light blue | `#87CEEB` | the sky |
| 5 | 20⁵ | yellow | `#DAA520` | light, the sun |
| 6 | 20⁶ | purple | `#6A0DAD` | the universe |

### Reading rules

- **Vertical**: floor 0 is at the bottom; read from bottom to top.
- **Horizontal**: floor 0 is at the right; read from right to left.
- **Cycle**: at floor 7 the cycle restarts; the universe becomes earth again,
  like the calendar cycles that renew themselves.

### Water and sky

The two blues are distinguished by luminosity: **water** is deep and
saturated (`#005B96`); **sky** is light and airy (`#87CEEB`). In print and on
screen they should read as two different waters of the same world: the one
you step on and the one you look at.

### Names in each implementation

| Floor | LaTeX (`xcolor`) | Python / bash / web |
|---:|---|---|
| 0 | `mayaTierra` | `tierra` |
| 1 | `mayaAgua` | `agua` |
| 2 | `mayaVegetacion` | `vegetacion` |
| 3 | `mayaVida` | `vida` |
| 4 | `mayaCielo` | `cielo` |
| 5 | `mayaSol` | `sol` |
| 6 | `mayaUniverso` | `universo` |

In LaTeX the colors are declared with `\providecolor`, so the user can
redefine them *before* loading the package without breaking anything.
