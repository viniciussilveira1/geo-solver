interface Hyperbola {
  a: number;
  b: number;
}

interface Parabola {
  xOrY: number;
  axis: "x" | "y";
}

const HYPERBOLA_PATTERNS = [
  /x\^2\/(\d+)\s*-\s*y\^2\/(\d+)\s*=\s*1/,
  /y\^2\/(\d+)\s*-\s*x\^2\/(\d+)\s*=\s*1/,
];

const PARABOLA_PATTERNS = [/x\^2\s*=\s*(-?\d+)y/, /y\^2\s*=\s*(-?\d+)x/];

export function identifyEquation(equation: string): string {
  const sanitizedEquation = sanitizeEquation(equation);

  const parabola = matchParabola(sanitizedEquation);
  if (parabola) {
    return formatParabola(parabola);
  }

  const hyperbola = matchHyperbola(sanitizedEquation);
  if (hyperbola) {
    return formatHyperbola(hyperbola);
  }

  return "Equação não é Parábola ou Hipérbole.";
}

function sanitizeEquation(equation: string): string {
  return equation.replace(/\s+/g, "").toLowerCase();
}

function matchParabola(equation: string): Parabola | null {
  for (const pattern of PARABOLA_PATTERNS) {
    const match = equation.match(pattern);
    if (match) {
      const xOrY = parseInt(match[1]) / 4;
      const axis = pattern === PARABOLA_PATTERNS[0] ? "x" : "y";
      return { xOrY, axis };
    }
  }
  return null;
}

function formatParabola({ xOrY, axis }: Parabola): string {
  const formattedXOrY = xOrY.toFixed(0);
  const vertex = `(0, 0)`;
  const focus =
    axis === "x" ? `(0, ${formattedXOrY})` : `(${formattedXOrY}, 0)`;
  const directrix =
    axis === "x" ? `y = ${-formattedXOrY}` : `x = ${-formattedXOrY}`;
  const symmetryAxis = axis === "x" ? `x = 0` : `y = 0`;

  let opening: string;
  if (axis === "x") {
    opening = xOrY > 0 ? "para cima" : "para baixo";
  } else {
    opening = xOrY > 0 ? "para a direita" : "para a esquerda";
  }

  return `PARÁBOLA\nVértice: ${vertex}\nFoco: ${focus}\nDiretriz: ${directrix}\nEixo de simetria: ${symmetryAxis}\nAbertura: ${opening}`;
}

function matchHyperbola(equation: string): Hyperbola | null {
  for (const pattern of HYPERBOLA_PATTERNS) {
    const match = equation.match(pattern);
    if (match) {
      return {
        a: parseInt(match[1]),
        b: parseInt(match[2]),
      };
    }
  }
  return null;
}

function formatHyperbola({ a, b }: Hyperbola): string {
  const aSqrt = Math.sqrt(a);
  const bSqrt = Math.sqrt(b);
  const c = Math.sqrt(a + b);
  const e = (c / aSqrt).toFixed(1);

  const eixoParalelo = "Eixo x";

  const vetor1 = `(${aSqrt}, 0)`;
  const vetor2 = `(0, ${bSqrt})`;

  const foco1 = `(±${c}, 0)`;
  const foco2 = `(0, ±${bSqrt})`;

  return `HIPÉRBOLE\nCentro: (0, 0)\nEixo paralelo: ${eixoParalelo}\nA: ${aSqrt}\nB: ${bSqrt}\nC: ${c.toFixed(
    1
  )}\nExcentricidade: ${e}\nVetores diretores: ${vetor1} e ${vetor2}\nFocos: ${foco1} e ${foco2}`;
}
