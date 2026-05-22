import React, { useState, useEffect } from 'react';

const STATUSES = {
  PLAN: 'План',
  IN_PROCESS: 'В процессе',
  COMPLETED: 'Завершён',
};

function App() {

  const [experiments, setExperiments] = useState(() => {
    const saved = localStorage.getItem('experiments');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [name, setName] = useState('');
  const [status, setStatus] = useState(STATUSES.PLAN);
  const [filter, setFilter] = useState('Все');


}

export default App;