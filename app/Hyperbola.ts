import { Hyperbola } from "./Types/Equations";

interface HyperbolaPattern {
  regex: RegExp;
  processor: (match: RegExpMatchArray) => Hyperbola;
}

// Lista de padrões de equações de hipérbole reconhecidas
const HYPERBOLA_PATTERNS: HyperbolaPattern[] = [
  // Formas padrão centradas na origem (x²/a² - y²/b² = 1)
  {
    regex: /^x²\/(\d+\.?\d*)-y²\/(\d+\.?\d*)=1$/,
    processor: (match) => processStandardHyperbolaEquation(match, true, 0, 0),
  },
  // Formas transladadas ((x-h)²/a² - (y-k)²/b² = 1)
  {
    regex:
      /^\(x([+-]\d+\.?\d*)\)²\/(\d+\.?\d*)-\(y([+-]\d+\.?\d*)\)²\/(\d+\.?\d*)=1$/,
    processor: (match) => processTranslatedHyperbolaEquation(match, true),
  },
  // Formas padrão verticais (y²/a² - x²/b² = 1)
  {
    regex: /^y²\/(\d+\.?\d*)-x²\/(\d+\.?\d*)=1$/,
    processor: (match) => processStandardHyperbolaEquation(match, false, 0, 0),
  },
  // Formas transladadas verticais ((y-k)²/a² - (x-h)²/b² = 1)
  {
    regex:
      /^\(y([+-]\d+\.?\d*)\)²\/(\d+\.?\d*)-\(x([+-]\d+\.?\d*)\)²\/(\d+\.?\d*)=1$/,
    processor: (match) => processTranslatedHyperbolaEquation(match, false),
  },
];

/**
 * Reconhece e processa uma equação de hipérbole
 * @param equation Equação matemática como string
 * @returns Objeto Hyperbola ou null se não reconhecida
 */
export function recognizeHyperbolaEquation(equation: string): Hyperbola | null {
  for (const pattern of HYPERBOLA_PATTERNS) {
    const match = equation.match(pattern.regex);
    if (match) {
      return pattern.processor(match);
    }
  }

  return null;
}

/**
 * Processa equações padrão de hipérbole centradas na origem
 * @param match Resultado da correspondência do regex
 * @param isHorizontal Indica se a hipérbole é horizontal
 * @param h Coordenada x do centro
 * @param k Coordenada y do centro
 */
function processStandardHyperbolaEquation(
  match: RegExpMatchArray,
  isHorizontal: boolean,
  h: number,
  k: number
): Hyperbola {
  const aSquared = parseFloat(match[1]);
  const bSquared = parseFloat(match[2]);
  return createHyperbolaFromParameters(aSquared, bSquared, h, k, isHorizontal);
}

/**
 * Processa equações de hipérbole transladadas (com centro diferente da origem)
 * @param match Resultado da correspondência do regex
 * @param isHorizontal Indica se a hipérbole é horizontal
 */
function processTranslatedHyperbolaEquation(
  match: RegExpMatchArray,
  isHorizontal: boolean
): Hyperbola {
  const h = isHorizontal ? -parseFloat(match[1]) : -parseFloat(match[3]);
  const k = isHorizontal ? -parseFloat(match[3]) : -parseFloat(match[1]);
  const aSquared = parseFloat(match[2]);
  const bSquared = parseFloat(match[4]);
  return createHyperbolaFromParameters(aSquared, bSquared, h, k, isHorizontal);
}

/**
 * Cria um objeto Hyperbola completo a partir dos parâmetros
 * @param aSquared Quadrado do semi-eixo transverso (a²)
 * @param bSquared Quadrado do semi-eixo conjugado (b²)
 * @param h Coordenada x do centro
 * @param k Coordenada y do centro
 * @param isHorizontal Orientação da hipérbole
 */
function createHyperbolaFromParameters(
  aSquared: number,
  bSquared: number,
  h: number,
  k: number,
  isHorizontal: boolean
): Hyperbola {
  const semiTransverse = Math.sqrt(aSquared);
  const semiConjugate = Math.sqrt(bSquared);
  const focalDistance = Math.sqrt(aSquared + bSquared);
  const eccentricity = focalDistance / semiTransverse;

  const vertices: [[number, number], [number, number]] = isHorizontal
    ? [
        [h + semiTransverse, k],
        [h - semiTransverse, k],
      ]
    : [
        [h, k + semiTransverse],
        [h, k - semiTransverse],
      ];

  const foci: [[number, number], [number, number]] = isHorizontal
    ? [
        [h + focalDistance, k],
        [h - focalDistance, k],
      ]
    : [
        [h, k + focalDistance],
        [h, k - focalDistance],
      ];

  return {
    orientation: isHorizontal ? "horizontal" : "vertical",
    center: { x: h, y: k },
    semiTransverse,
    semiConjugate,
    focalDistance,
    eccentricity,
    vertices,
    foci,
  };
}

/**
 * Formata as informações da hipérbole para exibição
 * @param hyperbola Objeto Hyperbola a ser formatado
 * @returns String formatada com as propriedades
 */
export function formatHyperbolaInfo(hyperbola: Hyperbola): string {
  const {
    orientation,
    center,
    semiTransverse,
    semiConjugate,
    focalDistance,
    eccentricity,
    vertices,
    foci,
  } = hyperbola;

  return [
    "HIPÉRBOLE",
    `-> ${
      orientation === "horizontal"
        ? "Eixo x (abertura lateral)"
        : "Eixo y (abertura superior/inferior)"
    }`,
    `-> Centro: (${center.x.toFixed(1)}, ${center.y.toFixed(1)})`,
    `-> a: ${semiTransverse.toFixed(2)}`,
    `-> b: ${semiConjugate.toFixed(2)}`,
    `-> c: ${focalDistance.toFixed(2)}`,
    `-> e: ${eccentricity.toFixed(4)}`,
    "",
    "Vértices:",
    `-> V1: (${vertices[0][0].toFixed(2)}, ${vertices[0][1].toFixed(2)})`,
    `-> V2: (${vertices[1][0].toFixed(2)}, ${vertices[1][1].toFixed(2)})`,
    "",
    "Focos:",
    `-> F1: (${foci[0][0].toFixed(2)}, ${foci[0][1].toFixed(2)})`,
    `-> F2: (${foci[1][0].toFixed(2)}, ${foci[1][1].toFixed(2)})`,
  ].join("\n");
}
