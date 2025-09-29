import { useTodos } from './hooks/useTodos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

function App() {
  const { todos, loading, error, addTodo, toggleTodo, refreshTodos } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={refreshTodos}
          />
        )}
        
        <AddTodoForm 
          onAddTodo={addTodo}
          disabled={loading}
        />
        
        <TodoList 
          todos={todos}
          onToggleTodo={toggleTodo}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
