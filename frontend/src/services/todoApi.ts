import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

const API_BASE_URL = 'http://localhost:8000/api';

export class TodoApiService {
  private async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(errorData.message || 'An error occurred');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.fetchWithErrorHandling<Todo[]>(`${API_BASE_URL}/todos`);
  }

  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    return this.fetchWithErrorHandling<Todo>(`${API_BASE_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify(todoData),
    });
  }

  async updateTodo(id: string, updateData: UpdateTodoRequest): Promise<Todo> {
    return this.fetchWithErrorHandling<Todo>(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }
}

export const todoApiService = new TodoApiService();