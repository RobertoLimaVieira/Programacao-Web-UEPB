import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    
    // Inicia o intervalo se isRunning for true
    if (isRunning) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
    
    // Limpa o intervalo quando o componente é desmontado ou quando o isRunning muda para false
    return () => clearInterval(interval);
  }, [isRunning]);

  // Função para parar o contador
  const stopCounter = () => {
    setIsRunning(false);
  };

  // Função para iniciar o contador
  const startCounter = () => {
    setIsRunning(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Contador: {count}</h1>
      <button onClick={stopCounter} disabled={!isRunning}>
        Parar
      </button>
      <button onClick={startCounter} disabled={isRunning} style={{ marginLeft: '10px' }}>
        Iniciar
      </button>
    </div>
  );
};

export default Counter;
