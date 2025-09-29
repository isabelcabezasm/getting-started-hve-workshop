import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  loading: boolean;
}

export function TodoList({ todos, onToggleTodo, loading }: TodoListProps) {
  if (loading) {
    return (
      <div className="todo-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading todos...</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list-container">
        <div className="empty-state">
          <p>No todos yet. Add one above to get started!</p>
        </div>
      </div>
    );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-list-container">
      <div className="todo-stats">
        <span>{incompleteTodos.length} remaining, {completedTodos.length} completed</span>
      </div>
      <div className="todo-list">
        {incompleteTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
          />
        ))}
        {completedTodos.length > 0 && (
          <>
            <div className="completed-divider">
              <span>Completed ({completedTodos.length})</span>
            </div>
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggleTodo}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}