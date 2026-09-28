/**
 * mayanumber.js — Widget web para numerales mayas y notación vigesimal
 * 
 * CRÉDITOS:
 *   Lógica original: macro de Enrico Gregorio (egreg on TeX StackExchange, @eg9 on GitHub) en TeX StackExchange, respuesta a una
 *   pregunta de tatojo: https://tex.stackexchange.com/a/452806/18280
 *   Adaptación a JavaScript y widget SVG: Manuel López Mateos (mlmateos),
 *   repositorio puntoybarra.
 *
 * USO:
 *   <script src="mayanumber.js"></script>
 *   <div class="mayanumber" data-value="4581"></div>
 *   <div class="mayanumber" data-value="1234567890" data-layout="horizontal"></div>
 *   <div class="mayanumber" data-value="4581" data-mode="alpha"></div>
 *   <div class="mayanumber" data-value="4581" data-nocolor="true"></div>
 */

(function() {
  'use strict';

  // Paleta de 7 colores (posición 0 = unidades)
  const PALETA = [
    { nombre: 'tierra',     color: '#8B4513', significado: 'la tierra' },
    { nombre: 'agua',       color: '#005B96', significado: 'el agua' },
    { nombre: 'vegetacion', color: '#2E8B57', significado: 'la vegetación' },
    { nombre: 'vida',       color: '#DC143C', significado: 'la vida' },
    { nombre: 'cielo',      color: '#87CEEB', significado: 'el cielo' },
    { nombre: 'sol',        color: '#DAA520', significado: 'la luz, el sol' },
    { nombre: 'universo',   color: '#6A0DAD', significado: 'el universo' }
  ];

  const ALFABETO = '0123456789ABCDEFGHIJ';

  /**
   * Convierte un número decimal a dígitos en base 20
   * @param {number|string} n - Número decimal
   * @returns {number[]} Dígitos del más al menos significativo
   */
  function digitsBase20(n) {
    n = BigInt(n);
    if (n === 0n) return [0];
    const digits = [];
    while (n > 0n) {
      digits.push(Number(n % 20n));
      n = n / 20n;
    }
    return digits.reverse();
  }

  /**
   * Genera las líneas de un dígito maya (puntos sobre barras)
   * @param {number} digit - Dígito 0-19
   * @returns {string[]} Array de strings representando las líneas
   */
  function levelRows(digit) {
    if (digit === 0) return ['◎'];
    const bars = Math.floor(digit / 5);
    const dots = digit % 5;
    const rows = [];
    if (dots > 0) {
      rows.push('● '.repeat(dots).trim());
    }
    for (let i = 0; i < bars; i++) {
      rows.push('━━━');
    }
    return rows;
  }

  /**
   * Dibuja un dígito maya en SVG
   * @param {number} digit - Dígito 0-19
   * @param {string} color - Color hex
   * @param {number} x - Posición X
   * @param {number} y - Posición Y (base)
   * @param {number} scale - Escala
   * @returns {string} SVG markup
   */
  function drawMayaDigitSVG(digit, color, x, y, scale = 1) {
    const barWidth = 30 * scale;
    const barHeight = 6 * scale;
    const dotRadius = 4 * scale;
    const spacing = 12 * scale;
    
    let svg = '';
    
    if (digit === 0) {
      // Concha (cero)
      svg += `<ellipse cx="${x}" cy="${y - 8 * scale}" rx="${12 * scale}" ry="${8 * scale}" fill="${color}" opacity="0.35" stroke="${color}" stroke-width="2"/>`;
      return svg;
    }
    
    const bars = Math.floor(digit / 5);
    const dots = digit % 5;
    
    let currentY = y;
    
    // Barras (de abajo hacia arriba)
    for (let i = 0; i < bars; i++) {
      const barX = x - barWidth / 2;
      const barY = currentY - barHeight;
      svg += `<rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" fill="${color}" rx="2"/>`;
      currentY -= barHeight + 4 * scale;
    }
    
    // Puntos (arriba de las barras)
    if (dots > 0) {
      const dotsWidth = dots * (dotRadius * 2 + 2 * scale);
      const startX = x - dotsWidth / 2 + dotRadius;
      const dotY = currentY - dotRadius - 2 * scale;
      
      for (let i = 0; i < dots; i++) {
        const dotX = startX + i * (dotRadius * 2 + 2 * scale);
        svg += `<circle cx="${dotX}" cy="${dotY}" r="${dotRadius}" fill="${color}"/>`;
      }
    }
    
    return svg;
  }

  /**
   * Renderiza un número maya en modo vertical
   * @param {number[]} digits - Dígitos en base 20
   * @param {boolean} useColor - Usar colores
   * @returns {string} SVG markup
   */
  function renderVertical(digits, useColor) {
    const scale = 1.5;
    const levelSpacing = 50 * scale;
    const totalHeight = digits.length * levelSpacing;
    const width = 80 * scale;
    
    let svg = `<svg viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}" style="max-width:100%; height:auto;" xmlns="http://www.w3.org/2000/svg">`;
    
    for (let i = 0; i < digits.length; i++) {
      const pos = digits.length - 1 - i;
      const color = useColor ? PALETA[pos % 7].color : '#000000';
      const y = (i + 1) * levelSpacing - 10 * scale;
      svg += drawMayaDigitSVG(digits[i], color, width / 2, y, scale);
    }
    
    svg += '</svg>';
    return svg;
  }

  /**
   * Renderiza un número maya en modo horizontal
   * @param {number[]} digits - Dígitos en base 20
   * @param {boolean} useColor - Usar colores
   * @returns {string} SVG markup
   */
  function renderHorizontal(digits, useColor) {
    const scale = 1.5;
    const digitWidth = 50 * scale;
    const spacing = 20 * scale;
    const totalWidth = digits.length * (digitWidth + spacing) - spacing;
    const height = 100 * scale;
    
    let svg = `<svg viewBox="0 0 ${totalWidth} ${height}" width="${totalWidth}" height="${height}" style="max-width:100%; height:auto;" xmlns="http://www.w3.org/2000/svg">`;
    
    for (let i = 0; i < digits.length; i++) {
      const pos = digits.length - 1 - i;
      const color = useColor ? PALETA[pos % 7].color : '#000000';
      const x = i * (digitWidth + spacing) + digitWidth / 2;
      const y = height - 10 * scale;
      svg += drawMayaDigitSVG(digits[i], color, x, y, scale);
    }
    
    svg += '</svg>';
    return svg;
  }

  /**
   * Renderiza notación alfabética
   * @param {number[]} digits - Dígitos en base 20
   * @param {boolean} useColor - Usar colores
   * @returns {string} HTML markup
   */
  function renderAlpha(digits, useColor) {
    let html = '';
    for (let i = 0; i < digits.length; i++) {
      const pos = digits.length - 1 - i;
      const color = useColor ? PALETA[pos % 7].color : '#000000';
      html += `<span style="color: ${color};">${ALFABETO[digits[i]]}</span>`;
    }
    return html;
  }

  /**
   * Procesa un elemento DOM con clase "mayanumber"
   * @param {HTMLElement} element
   */
  function processElement(element) {
    const value = element.getAttribute('data-value');
    const layout = element.getAttribute('data-layout') || 'vertical';
    const nocolor = element.getAttribute('data-nocolor') === 'true';

    if (!value) {
      element.textContent = '[Error: falta data-value]';
      return;
    }

    try {
      const digits = digitsBase20(value);
      const useColor = !nocolor;
      element.innerHTML = renderCombined(digits, useColor, layout);
    } catch (e) {
      element.textContent = '[Error: ' + e.message + ']';
    }
  }

  /**
   * Glifo maya + notación alfabética coloreada a su derecha.
   */
  function renderCombined(digits, useColor, layout) {
    const maya = (layout === 'horizontal')
      ? renderHorizontal(digits, useColor)
      : renderVertical(digits, useColor);
    const alpha = renderAlpha(digits, useColor);
    return '<div style="display:inline-flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:18px; max-width:100%;">' +
             '<div>' + maya + '</div>' +
             '<div style="font-family: monospace; font-size:1.5em; line-height:1;">' +
               alpha + '<sub style="font-size:0.6em;">20</sub>' +
             '</div>' +
           '</div>';
  }

  /**
   * API pública para conversión programática
   */
  window.MayanNumber = {
    toBase20: digitsBase20,
    renderVertical: renderVertical,
    renderHorizontal: renderHorizontal,
    renderAlpha: renderAlpha,
    renderCombined: renderCombined,
    process: processElement,
    paleta: PALETA
  };

  /**
   * Inicializa todos los elementos con clase "mayanumber"
   */
  function init() {
    const elements = document.querySelectorAll('.mayanumber');
    elements.forEach(processElement);
  }

  // Auto-inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
