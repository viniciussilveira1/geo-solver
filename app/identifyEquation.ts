// identifyEquation.ts
export type EquationType =
  | "Reta"
  | "Circunferência"
  | "Parábola"
  | "Elipse"
  | "Hipérbole"
  | "Equação não reconhecida";

export const identifyEquation = (eq: string): EquationType => {
  const normalizedEq = eq.replace(/\s+/g, "").toLowerCase(); // Remove espaços

  // 🔹 Reta: y = mx + b ou ax + by = c
  if (
    /^y=-?\d*x(\+|-)?\d*$/.test(normalizedEq) ||
    /^[+-]?\d*x[+-]?\d*y=?[+-]?\d*$/.test(normalizedEq)
  ) {
    return "Reta";
  }

  // 🔹 Circunferência: x² + y² = r²
  if (/^x\^2\+y\^2=-?\d+$/.test(normalizedEq)) {
    return "Circunferência";
  }

  // 🔹 Parábola: y = ax² + bx + c ou x = ay² + by + c
  if (
    /^y=-?\d*x\^2(\+|-)?\d*x?(\+|-)?\d*$/.test(normalizedEq) ||
    /^x=-?\d*y\^2(\+|-)?\d*y?(\+|-)?\d*$/.test(normalizedEq)
  ) {
    return "Parábola";
  }

  // 🔹 Elipse: Ax² + By² = C (com sinal de "+")
  if (
    /^-?\d*x\^2\+-?\d*y\^2=-?\d+$/.test(normalizedEq) ||
    /^\d*x\^2\+\d*y\^2=\d+$/.test(normalizedEq)
  ) {
    return "Elipse";
  }

  // 🔹 Hipérbole: x²/a² - y²/b² = 1 ou y²/b² - x²/a² = 1 (com sinal de "-")
  if (
    /^-?\d*x\^2-?\d*y\^2=-?\d+$/.test(normalizedEq) ||
    /^-?\d*y\^2-?\d*x\^2=-?\d+$/.test(normalizedEq)
  ) {
    return "Hipérbole";
  }

  return "Equação não reconhecida";
};
