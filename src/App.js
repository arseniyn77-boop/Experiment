import React, { useState, useEffect } from 'react';

const STATUSES = {
  PLAN: 'План',
  IN_PROCESS: 'В процессе',
  COMPLETED: 'Завершён',
};

function App() {
// 1. Инициализация состояния
  const [experiments, setExperiments] = useState(() => {
    const saved = localStorage.getItem('experiments');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [name, setName] = useState('');
  const [status, setStatus] = useState(STATUSES.PLAN);
  const [filter, setFilter] = useState('Все');

  // 2. Сохранение данных
  useEffect(() => {
    localStorage.setItem('experiments', JSON.stringify(experiments));
  }, [experiments]);

  // 3. Добавление эксперимента
  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const newExperiment = {
      id: Date.now(), 
      name: name.trim(),
      status: status
    };
    
    setExperiments([...experiments, newExperiment]);
    setName(''); 
    setStatus(STATUSES.PLAN);
  };

  // 4. Удаление
  const handleDelete = (id) => {
    setExperiments(experiments.filter(exp => exp.id !== id));
  };

}

export default App;