import { Parabola } from "./Types/Equations";

interface ParabolaPattern {
  regex: RegExp;
  processor: (match: RegExpMatchArray) => Parabola | null;
}

// Lista de padrões de equações de parábola
const PARABOLA_PATTERNS: ParabolaPattern[] = [
  // Formas canônicas (y² = 4px ou x² = 4py)
  {
    regex: /^\s*y\s*(?:²|\^?2)\s*=\s*([+-]?\d*\.?\d+)\s*x\s*$/i,
    processor: (match) => processStandardParabolaEquation(match, true),
  },
  {
    regex: /^\s*x\s*(?:²|\^?2)\s*=\s*([+-]?\d*\.?\d+)\s*y\s*$/i,
    processor: (match) => processStandardParabolaEquation(match, false),
  },

  // Formas vértice (y = a(x-h)² + k ou x = a(y-k)² + h)
  {
    regex:
      /^\s*y\s*=\s*([+-]?\d*\.?\d+)\s*\(\s*x\s*([+-]\s*\d+\.?\d*)\s*\)\s*(?:²|\^?2)\s*([+-]\s*\d+\.?\d*)\s*$/i,
    processor: (match) => processVertexFormEquation(match, true),
  },
  {
    regex:
      /^\s*x\s*=\s*([+-]?\d*\.?\d+)\s*\(\s*y\s*([+-]\s*\d+\.?\d*)\s*\)\s*(?:²|\^?2)\s*([+-]\s*\d+\.?\d*)\s*$/i,
    processor: (match) => processVertexFormEquation(match, false),
  },

  // Formas expandidas (y = ax² + bx + c ou x = ay² + by + c)
  {
    regex:
      /^\s*y\s*=\s*([+-]?\d*\.?\d+)\s*x\s*(?:²|\^?2)\s*([+-]\s*\d+\.?\d*\s*x)?\s*([+-]\s*\d+\.?\d*)?\s*$/i,
    processor: (match) => processExpandedFormEquation(match, true),
  },
  {
    regex:
      /^\s*x\s*=\s*([+-]?\d*\.?\d+)\s*y\s*(?:²|\^?2)\s*([+-]\s*\d+\.?\d*\s*y)?\s*([+-]\s*\d+\.?\d*)?\s*$/i,
    processor: (match) => processExpandedFormEquation(match, false),
  },
];

/**
 * Processa equações na forma canônica (y² = 4px ou x² = 4py)
 * @param match Resultado do regex match
 * @param isYSquared Indica se é uma equação do tipo y²
 */
function processStandardParabolaEquation(
  match: RegExpMatchArray,
  isYSquared: boolean
): Parabola {
  const coefficient = parseFloat(match[1]);
  const p = coefficient / 4;
  const absP = Math.abs(p);

  const type = isYSquared ? "horizontal" : "vertical";
  const direction = isYSquared
    ? p > 0
      ? "right"
      : "left"
    : p > 0
    ? "up"
    : "down";

  const vertex = { x: 0, y: 0 };
  const focus = isYSquared ? { x: p, y: 0 } : { x: 0, y: p };
  const directrix = isYSquared ? `x = ${-p}` : `y = ${-p}`;

  return { type, direction, vertex, p: absP, focus, directrix };
}

/**
 * Processa equações na forma vértice (y = a(x-h)² + k ou x = a(y-k)² + h)
 * @param match Resultado do regex match
 * @param isVertical Indica se a parábola é vertical
 */
function processVertexFormEquation(
  match: RegExpMatchArray,
  isVertical: boolean
): Parabola {
  const a = parseFloat(match[1]);
  const h = parseFloat(match[2].replace(/\s+/g, ""));
  const k = parseFloat(match[3]?.replace(/\s+/g, "") || "0");

  return createParabolaFromCoefficients(a, h, k, isVertical);
}

/**
 * Processa equações na forma expandida (y = ax² + bx + c ou x = ay² + by + c)
 * @param match Resultado do regex match
 * @param isVertical Indica se a parábola é vertical
 */
function processExpandedFormEquation(
  match: RegExpMatchArray,
  isVertical: boolean
): Parabola {
  const a = parseFloat(match[1]);
  const b = match[2]
    ? parseFloat(match[2].replace(/[xy]/g, "").replace(/\s+/g, ""))
    : 0;
  const c = match[3] ? parseFloat(match[3].replace(/\s+/g, "")) : 0;

  const h = isVertical ? -b / (2 * a) : c - (b * b) / (4 * a);
  const k = isVertical ? c - (b * b) / (4 * a) : -b / (2 * a);

  return createParabolaFromCoefficients(a, h, k, isVertical);
}

/**
 * Cria um objeto Parabola a partir dos coeficientes e posição
 * @param a Coeficiente quadrático
 * @param h Coordenada x do vértice
 * @param k Coordenada y do vértice
 * @param isVertical Indica se a parábola é vertical
 */
function createParabolaFromCoefficients(
  a: number,
  h: number,
  k: number,
  isVertical: boolean
): Parabola {
  const p = 1 / (4 * Math.abs(a));
  const direction = isVertical
    ? a > 0
      ? "up"
      : "down"
    : a > 0
    ? "right"
    : "left";

  const vertex = { x: h, y: k };
  const focus = isVertical
    ? { x: h, y: k + (a > 0 ? p : -p) }
    : { x: h + (a > 0 ? p : -p), y: k };

  const directrix = isVertical
    ? `y = ${k - (a > 0 ? p : -p)}`
    : `x = ${h - (a > 0 ? p : -p)}`;

  return {
    type: isVertical ? "vertical" : "horizontal",
    direction,
    vertex,
    p,
    focus,
    directrix,
  };
}

/**
 * Tenta reconhecer e processar uma equação de parábola
 * @param equation Equação matemática como string
 * @returns Objeto Parabola ou null se não reconhecer
 */
export function recognizeParabolaEquation(equation: string): Parabola | null {
  for (const pattern of PARABOLA_PATTERNS) {
    const match = equation.match(pattern.regex);
    if (match) {
      return pattern.processor(match);
    }
  }

  return null;
}

/**
 * Formata as informações da parábola para exibição
 * @param parabola Objeto Parabola a ser formatado
 * @returns String formatada com as propriedades da parábola
 */
export function formatParabolaInfo(parabola: Parabola): string {
  const directionNames = {
    up: "para cima",
    down: "para baixo",
    left: "para a esquerda",
    right: "para a direita",
  };

  return [
    `Parábola ${parabola.type === "vertical" ? "vertical" : "horizontal"}`,
    `-> ${
      parabola.type === "vertical" ? "Eixo paralelo a y" : "Eixo paralelo a x"
    }`,
    `-> Abertura ${directionNames[parabola.direction]}`,
    `-> Vértice: (${parabola.vertex.x.toFixed(2)}, ${parabola.vertex.y.toFixed(
      2
    )})`,
    `-> Foco: (${parabola.focus.x.toFixed(2)}, ${parabola.focus.y.toFixed(2)})`,
    `-> Diretriz: ${parabola.directrix}`,
    `-> Parâmetro focal (p): ${parabola.p.toFixed(2)}`,
  ].join("\n");
}
