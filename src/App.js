import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Загружаем задачи из localStorage при запуске
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');

  // Сохраняем задачи в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>

      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What i need to do?"
          style={{ padding: '10px', fontSize: '16px', width: '250px' }}
        />
        <button onClick={addTask} style={{
          marginLeft: '10px',
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Добавить
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: '0', maxWidth: '400px', margin: '20px auto' }}>
        {tasks.length === 0 ? (
          <p>Список дел пуст</p>
        ) : (
          tasks.map(task => (
            <li
              key={task.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#f9f9f9',
                borderRadius: '5px',
                alignItems: 'center'
              }}
            >
              <span>{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  borderRadius: '3px'
                }}
              >
                deleteTask
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;