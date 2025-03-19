export function identifyEquation(equation: string) {
  // Limpar espaços extras e garantir que o formato está correto
  equation = equation.replace(/\s+/g, "").toLowerCase();

  // Verificar se é uma equação de hipérbole
  const hyperbolePattern = /x\^2\/(\d+)\s*-\s*y\^2\/(\d+)\s*=\s*1/;
  const parabolaPatternX = /x\^2\/(\d+)\s*=\s*y/;
  const parabolaPatternY = /y\^2\/(\d+)\s*=\s*x/;

  const hyperboleMatch = equation.match(hyperbolePattern);
  const parabolaXMatch = equation.match(parabolaPatternX);
  const parabolaYMatch = equation.match(parabolaPatternY);

  if (hyperboleMatch) {
    return `Equação de hipérbole: x²/(${hyperboleMatch[1]}) - y²/(${hyperboleMatch[2]}) = 1`;
  }

  if (parabolaXMatch) {
    return `Equação de parábola: x²/(${parabolaXMatch[1]}) = y`;
  }

  if (parabolaYMatch) {
    return `Equação de parábola: y²/(${parabolaYMatch[1]}) = x`;
  }

  return "Não foi possível identificar a equação. Verifique o formato.";
}
