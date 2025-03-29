export interface CartesianPoint {
  x: number;
  y: number;
}

export interface Parabola {
  type: "vertical" | "horizontal"; // Tipo de parábola (vertical ou horizontal)
  direction: "up" | "down" | "left" | "right"; // Direção da abertura
  vertex: CartesianPoint; // Vértice
  p: number; // Parâmetro focal
  focus: CartesianPoint; // Foco
  directrix: string; // Diretriz
}

export interface Hyperbola {
  orientation: "horizontal" | "vertical"; // Orientação (horizontal ou vertical)
  center: CartesianPoint; // Centro
  semiTransverse: number; // Semi-eixo real (a)
  semiConjugate: number; // Semi-eixo imaginário (b)
  focalDistance: number; // Distância focal (c)
  eccentricity: number; // Excentricidade (e)
  vertices: [[number, number], [number, number]]; // Vértices
  foci: [[number, number], [number, number]]; // Focos
}
