"use client";
import { useState } from "react";
import { identifyEquation } from "./identifyEquation";
import { FiX } from "react-icons/fi";

export default function Home() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!equation.trim()) {
      setResult("Por favor, insira uma equação.");
      return;
    }
    setResult(identifyEquation(equation));
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

        {/* Input com ícone de limpar */}
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

        {/* Botão de Identificação */}
        <button
          onClick={handleSubmit}
          className='cursor-pointer bg-blue-500 text-white p-3 rounded-lg mt-4 w-full text-lg font-semibold hover:bg-blue-600 active:scale-95 transition-transform shadow-md'
        >
          Identificar
        </button>

        {/* Exibição do resultado */}
        {result && (
          <div className='mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md text-center'>
            <p className='text-lg font-semibold text-gray-900 dark:text-white'>
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
