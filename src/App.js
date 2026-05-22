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

  // 2. Сохранение данных в localStorage
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

  // 4. Удаление эксперимента
  const handleDelete = (id) => {
    setExperiments(experiments.filter(exp => exp.id !== id));
  };

  // 5. Фильтрация и подсчёт
  const filteredExperiments = filter === 'Все' 
    ? experiments 
    : experiments.filter(exp => exp.status === filter);

  const completedCount = experiments.filter(exp => exp.status === STATUSES.COMPLETED).length;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Учёт экспериментов</h2>

      
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

      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <div>
          <label htmlFor="filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>Фильтр:</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '4px 8px' }}>
            <option value="Все">Все</option>
            <option value={STATUSES.PLAN}>{STATUSES.PLAN}</option>
            <option value={STATUSES.IN_PROCESS}>{STATUSES.IN_PROCESS}</option>
            <option value={STATUSES.COMPLETED}>{STATUSES.COMPLETED}</option>
          </select>
        </div>
        <div>
          <strong>Завершённых: {completedCount}</strong>
        </div>
      </div>

      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredExperiments.length === 0 ? (
          <li style={{ textAlign: 'center', color: '#888' }}>Нет данных для отображения</li>
        ) : (
          filteredExperiments.map(exp => (
            <li key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
              <div>
                <span style={{ fontWeight: '500' }}>{exp.name}</span>
                <span style={{ 
                  marginLeft: '10px', 
                  fontSize: '0.85em', 
                  padding: '3px 8px', 
                  borderRadius: '12px',
                  backgroundColor: exp.status === STATUSES.COMPLETED ? '#d4edda' : exp.status === STATUSES.IN_PROCESS ? '#fff3cd' : '#e2e3e5'
                }}>
                  {exp.status}
                </span>
              </div>
              <button 
                onClick={() => handleDelete(exp.id)}
                style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Удалить
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;