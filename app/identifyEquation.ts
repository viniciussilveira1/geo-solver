import { formatHyperbolaInfo, recognizeHyperbolaEquation } from "./Hyperbola";
import { formatParabolaInfo, recognizeParabolaEquation } from "./Parabola";

export function identifyEquation(equation: string): string {
  // Remover todos os espaços em branco para facilitar a comparação
  const sanitizedEquation = sanitizeEquation(equation);

  const parabola = recognizeParabolaEquation(sanitizedEquation);
  if (parabola) {
    return formatParabolaInfo(parabola);
  }

  const hyperbola = recognizeHyperbolaEquation(sanitizedEquation);
  if (hyperbola) {
    return formatHyperbolaInfo(hyperbola);
  }

  return "Equação não é Parábola ou Hipérbole.";
}

function sanitizeEquation(equation: string): string {
  return equation.replace(/\s+/g, "").toLowerCase();
}
