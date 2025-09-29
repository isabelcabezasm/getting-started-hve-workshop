import { useState, useEffect, useCallback } from 'react';
import type { Todo, CreateTodoRequest } from '../types/todo';
import { todoApiService } from '../services/todoApi';

export interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (todoData: CreateTodoRequest) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoApiService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(async (todoData: CreateTodoRequest) => {
    try {
      setError(null);
      const newTodo = await todoApiService.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err;
    }
  }, []);

  const toggleTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = await todoApiService.updateTodo(id, { 
        completed: !todo.completed 
      });
      
      setTodos(prev => 
        prev.map(t => t.id === id ? updatedTodo : t)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  }, [todos]);

  useEffect(() => {
    refreshTodos();
  }, [refreshTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    refreshTodos,
  };
}