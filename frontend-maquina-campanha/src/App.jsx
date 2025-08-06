import React, { useState, useEffect } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">Google Máquina Campanha Ads</h1>
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Alternar Modo {darkMode ? "Claro" : "Escuro"}
      </button>
    </div>
  );
}