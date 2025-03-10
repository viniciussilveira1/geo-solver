"use client";
import { useState } from "react";
import { identifyEquation } from "./identifyEquation";

export default function Home() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    setResult(identifyEquation(equation));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all'>
      <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100'>
        Identificador de Equações
      </h1>
      <input
        type='text'
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
        className='border p-2 rounded w-80 text-center bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600'
        placeholder='Digite a equação...'
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSubmit}
        className='bg-blue-500 text-white p-2 rounded mt-2 cursor-pointer dark:bg-blue-600'
      >
        Identificar
      </button>
      {result && (
        <p className='mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100'>
          Resultado: {result}
        </p>
      )}
    </div>
  );
}
