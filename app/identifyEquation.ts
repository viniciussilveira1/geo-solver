enum EquationType {
  Line = "Reta",
  Circle = "Circunferência",
  Parabola = "Parábola",
  Ellipse = "Elipse",
  Hyperbola = "Hipérbole",
  Unknown = "Equação não identificada",
}

export const identifyEquation = (equation: string): EquationType => {
  const normalized = equation.replace(/\s+/g, "");

  // Reta (formas y = mx + b ou Ax + By + C = 0)
  if (
    /^y=[+-]?\d*x([+-]\d+)?$/.test(normalized) ||
    /^[+-]?\d*x[+-]\d*y([+-]\d+)?=0$/.test(normalized)
  ) {
    return EquationType.Line;
  }

  // Circunferência (formas (x - h)^2 + (y - k)^2 = r^2 ou x^2 + y^2 + Dx + Ey + F = 0)
  if (
    /^\(x[+-]\d+\)\^2\+\(y[+-]\d+\)\^2=\d+$/.test(normalized) ||
    /^x\^2\+y\^2([+-]\d*x)?([+-]\d*y)?([+-]\d+)?=0$/.test(normalized)
  ) {
    return EquationType.Circle;
  }

  // Parábola (formas y = ax^2 + bx + c ou (x - h) = a(y - k)^2)
  if (
    /^y=[+-]?\d*x\^2([+-]\d*x)?([+-]\d+)?$/.test(normalized) ||
    /^\(y[+-]\d+\)=[+-]?\d*\(x[+-]\d+\)\^2$/.test(normalized) ||
    /^\(x[+-]\d+\)=[+-]?\d*\(y[+-]\d+\)\^2$/.test(normalized)
  ) {
    return EquationType.Parabola;
  }

  // Forma geral quadrática: Ax² + By² + Cx + Dy + F = 0
  const quadraticMatch = normalized.match(/([+-]?\d*)x\^2|([+-]?\d*)y\^2/g);
  if (quadraticMatch && quadraticMatch.length >= 1) {
    const [A, C] = quadraticMatch.map((term) => {
      const value = parseInt(term.replace(/[xy\^2]/g, ""), 10);
      return isNaN(value) ? 1 : value;
    });

    if ((A && !C) || (!A && C)) {
      return EquationType.Parabola;
    }

    if (A !== C && A * C > 0) {
      return EquationType.Ellipse;
    }

    if (A * C < 0) {
      return EquationType.Hyperbola;
    }
  }

  // Elipse (formas (x - h)^2 / a^2 + (y - k)^2 / b^2 = 1)
  if (
    /^\(\s*x[+-]\d+\s*\)\^2\/\d+\+\(\s*y[+-]\d+\s*\)\^2\/\d+=1$/.test(
      normalized
    )
  ) {
    return EquationType.Ellipse;
  }

  // Hipérbole (formas (x - h)^2 / a^2 - (y - k)^2 / b^2 = 1)
  if (
    /^\(x[+-]\d+\)\^2\/\d+-\(y[+-]\d+\)\^2\/\d+=1$/.test(normalized) ||
    /^\(y[+-]\d+\)\^2\/\d+-\(x[+-]\d+\)\^2\/\d+=1$/.test(normalized)
  ) {
    return EquationType.Hyperbola;
  }

  return EquationType.Unknown;
};
