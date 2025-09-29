# Todo List Web App

A full-stack todo list application built with React TypeScript frontend and Python FastAPI backend.

## Features

- ✅ Add new todo items with title and description
- ✅ Mark todos as completed/uncompleted
- ✅ Visual separation between active and completed items
- ✅ Responsive design for mobile and desktop
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ Real-time updates via REST API

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Python + FastAPI
- **Storage**: In-memory (Python data structures)
- **API**: RESTful APIs with JSON

## Project Structure

```
├── frontend/              # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API client services
│   │   └── types/         # TypeScript interfaces
├── backend/               # Python FastAPI backend
│   ├── main.py           # Main FastAPI application
│   └── requirements.txt  # Python dependencies
└── docs/                 # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   python main.py
   ```

The backend will run on http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:5173

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update todo completion status
- `GET /health` - Health check endpoint

## Development

### Frontend Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Features Implemented

#### Phase 3: Frontend Development ✅
- [x] Task 3.1: Set up React components structure
- [x] Task 3.2: Create TypeScript interfaces for todo data types
- [x] Task 3.3: Implement API client service for backend communication
- [x] Task 3.4: Create todo list display component
- [x] Task 3.5: Implement add new todo functionality
- [x] Task 3.6: Implement toggle todo completion functionality
- [x] Task 3.7: Add basic styling and responsive design
- [x] Task 3.8: Implement error handling and loading states
- [x] Task 3.9: Add input validation and user feedback

## Screenshots

### Desktop View
![Desktop View](https://github.com/user-attachments/assets/f74d8862-c4bf-4599-9527-a8618f2d7691)

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/e87a9282-ebed-4197-bde6-ddc572fb3a15)

### Complete Functionality
![Complete App](https://github.com/user-attachments/assets/bd29da29-f432-402d-aa16-512d4e6aecc2)

## Code Quality

- TypeScript for type safety
- ESLint for code quality
- Responsive CSS design
- Clean component architecture
- Error handling and loading states
- Input validation and user feedback