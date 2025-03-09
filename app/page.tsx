// Home.tsx
"use client";
import { useState } from "react";
import { identifyEquation } from "./identifyEquation";

export default function Home() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    setResult(identifyEquation(equation));
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Identificador de Equações</h1>
      <input
        type='text'
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
        className='border p-2 rounded w-80 text-center'
        placeholder='Digite a equação...'
      />
      <button
        onClick={handleSubmit}
        className='bg-blue-500 text-white p-2 rounded mt-2 cursor-pointer'
      >
        Identificar
      </button>
      {result && (
        <p className='mt-4 text-lg font-semibold'>Resultado: {result}</p>
      )}
    </div>
  );
}
