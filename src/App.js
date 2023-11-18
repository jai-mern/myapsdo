import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '', status: 'Not Completed' });
  const [filterStatus, setFilterStatus] = useState('All');

  const addTodo = () => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
    setNewTodo({ name: '', description: '', status: 'Not Completed' });
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    if (filterStatus === 'All') {
      return todos;
    } else {
      return todos.filter((todo) => todo.status === filterStatus);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        <label>Filter: </label>
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      <ul>
        {filterTodos().map((todo) => (
          <li key={todo.id}>
            <div>
              <strong>{todo.name}</strong>
              <p>{todo.description}</p>
              <p>Status: {todo.status}</p>
            </div>
            <div>
              <button onClick={() => updateStatus(todo.id, todo.status === 'Completed' ? 'Not Completed' : 'Completed')}>
                Change Status
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      {/* Other content */}
      <TodoApp />
    </div>
  );
};

export default App;
