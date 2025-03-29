"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { identifyEquation } from "./identifyEquation";

export default function Home() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!equation.trim()) {
      setResult("Por favor, insira uma equação.");
      return;
    }

    setIsProcessing(true);
    const startTime = performance.now();

    try {
      const calculationResult = identifyEquation(equation);
      const endTime = performance.now();
      const processingTime = endTime - startTime;

      const remainingTime = processingTime;

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setResult(calculationResult);
    } finally {
      setIsProcessing(false);
    }
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 dark:from-gray-800 dark:to-gray-900 px-4 py-8 sm:px-6'>
      <div className='bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            Identificador de Equações
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Digite uma equação de parábola ou hipérbole
          </p>
        </div>
        <div className='relative w-full mb-4'>
          <input
            type='text'
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            className='border p-3 pr-10 rounded-lg w-full text-center text-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200'
            placeholder='Ex: x²/9 - y²/4 = 1'
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label='Digite a equação matemática'
          />
          {equation && (
            <button
              onClick={clearInput}
              aria-label='Limpar equação'
              className='absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 hover:text-gray-700 dark:hover:text-white cursor-pointer flex items-center justify-center'
            >
              <FiX className='w-5 h-5' />
            </button>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold shadow-md transition-all duration-200 cursor-pointer ${
            isProcessing
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          } text-white`}
        >
          {isProcessing ? "Processando..." : "Identificar"}
        </button>
        {(isProcessing || result) && (
          <div className='mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner'>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              Resultado:
            </h2>
            <div className='bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-600'>
              {isProcessing ? (
                <p className='text-gray-800 dark:text-gray-100 mb-1 last:mb-0 text-left'>
                  Processando...
                </p>
              ) : (
                result.split("\n").map((line, index) => (
                  <p
                    key={index}
                    className='text-gray-800 dark:text-gray-100 mb-1 last:mb-0 text-left'
                  >
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
