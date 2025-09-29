import React, { useState } from 'react';
import type { CreateTodoRequest } from '../types/todo';
import './AddTodoForm.css';

interface AddTodoFormProps {
  onAddTodo: (todoData: CreateTodoRequest) => Promise<void>;
  disabled?: boolean;
}

export function AddTodoForm({ onAddTodo, disabled = false }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    
    // Input validation
    if (!trimmedTitle) {
      setValidationError('Title is required');
      return;
    }
    
    if (trimmedTitle.length > 100) {
      setValidationError('Title must be 100 characters or less');
      return;
    }
    
    if (trimmedDescription.length > 500) {
      setValidationError('Description must be 500 characters or less');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    try {
      await onAddTodo({
        title: trimmedTitle,
        description: trimmedDescription,
      });
      
      // Clear form on success
      setTitle('');
      setDescription('');
    } catch {
      // Error is handled by the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="todo-title" className="form-label">
          Title *
        </label>
        <input
          id="todo-title"
          type="text"
          className={`form-input ${validationError ? 'error' : ''}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setValidationError('');
          }}
          placeholder="Enter todo title..."
          disabled={disabled || isSubmitting}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="todo-description" className="form-label">
          Description
        </label>
        <textarea
          id="todo-description"
          className="form-textarea"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setValidationError('');
          }}
          placeholder="Enter todo description (optional)..."
          disabled={disabled || isSubmitting}
          rows={3}
          maxLength={500}
        />
      </div>

      {validationError && (
        <div className="validation-error">
          {validationError}
        </div>
      )}

      <button
        type="submit"
        className="submit-button"
        disabled={disabled || isSubmitting || !title.trim()}
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}