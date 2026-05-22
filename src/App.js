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

  // 5. Фильтрация и подсчёт
  const filteredExperiments = filter === 'Все' 
    ? experiments 
    : experiments.filter(exp => exp.status === filter);

  const completedCount = experiments.filter(exp => exp.status === STATUSES.COMPLETED).length;

  return (

    <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Название эксперимента" 
          required 
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '8px' }}>
          <option value={STATUSES.PLAN}>{STATUSES.PLAN}</option>
          <option value={STATUSES.IN_PROCESS}>{STATUSES.IN_PROCESS}</option>
          <option value={STATUSES.COMPLETED}>{STATUSES.COMPLETED}</option>
        </select>
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Добавить</button>
      </form>

  )

}

export default App;