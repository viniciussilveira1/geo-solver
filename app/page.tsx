"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function Home() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");

  const parseEquation = (equation: string) => {
    const normalizedEquation = equation.replace(/\s+/g, "").toLowerCase();

    // Identificar hipérbole
    const hyperbolaRegex = /(\d+)?x\^2\/(\d+)\s*-\s*(\d+)?y\^2\/(\d+)\s*=\s*1/;
    const parabolaRegex = /x\^2\s*=\s*(\d+)y\s*|\s*y\^2\s*=\s*(\d+)x/;

    let result = "";

    // Identificar e calcular informações para hipérbole
    const hyperbolaMatch = normalizedEquation.match(hyperbolaRegex);
    if (hyperbolaMatch) {
      const a2 = parseInt(hyperbolaMatch[2]); // A constante no denominador de x²
      const b2 = parseInt(hyperbolaMatch[4]); // A constante no denominador de y²
      const a = Math.sqrt(a2); // Raiz de a²
      const c = Math.sqrt(a2 + b2); // Cálculo do foco da hipérbole

      result = `
        Tipo: Hipérbole
        Vértices: (${a.toFixed(2)}, 0) e (${-a.toFixed(2)}, 0)
        Focos: (${c.toFixed(2)}, 0) e (${-c.toFixed(2)}, 0)
        Centro: (0, 0)
        Distância do foco ao vértice (foco-vértice): ${(c - a).toFixed(2)}
        Distância entre os focos: ${(2 * c).toFixed(2)}
      `;
    }

    // Identificar e calcular informações para parábola
    const parabolaMatch = normalizedEquation.match(parabolaRegex);
    if (parabolaMatch) {
      if (parabolaMatch[1]) {
        // Caso para parábola com x² = 4ay
        const a = parseInt(parabolaMatch[1]) / 4;
        result = `
          Tipo: Parábola
          Vértice: (0, 0)
          Foco: (0, ${a.toFixed(2)})
          Diretiva: y = ${(-a).toFixed(2)}
        `;
      } else if (parabolaMatch[2]) {
        // Caso para parábola com y² = 4ax
        const b = parseInt(parabolaMatch[2]) / 4;
        result = `
          Tipo: Parábola
          Vértice: (0, 0)
          Foco: (${b.toFixed(2)}, 0)
          Diretiva: x = ${(-b).toFixed(2)}
        `;
      }
    }

    if (!result) {
      result = "Não foi possível identificar a equação. Verifique o formato.";
    }

    return result;
  };

  const handleSubmit = () => {
    if (!equation.trim()) {
      setResult("Por favor, insira uma equação.");
      return;
    }
    setResult(parseEquation(equation));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const clearInput = () => {
    setEquation("");
    setResult("");
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 px-6'>
      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white text-center mb-4'>
          Identificador de Equações
        </h1>

        <div className='relative w-full'>
          <input
            type='text'
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            className='border p-3 pr-10 rounded-lg w-full text-center text-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 shadow-md'
            placeholder='Digite a equação...'
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {equation && (
            <FiX
              onClick={clearInput}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 hover:text-gray-700 dark:hover:text-white cursor-pointer'
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className='cursor-pointer bg-blue-500 text-white p-3 rounded-lg mt-4 w-full text-lg font-semibold hover:bg-blue-600 active:scale-95 transition-transform shadow-md'
        >
          Identificar
        </button>

        {result && (
          <div className='mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md text-center'>
            <p className='text-lg font-semibold text-gray-900 dark:text-white'>
              {result.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
