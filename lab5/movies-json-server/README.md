# Movie Management App

A React application for managing movies with a JSON Server backend.

## Project Structure

```
src/
├── api/
│   └── movieAPI.js          # API service for CRUD operations
├── components/
│   ├── MovieForm.jsx         # Form component for adding/editing movies
│   ├── MovieList.jsx         # Card view component for displaying movies
│   └── MovieTable.jsx        # Table view component for displaying movies
├── contexts/
│   └── MovieContext.jsx      # Context provider for global state management
├── pages/
│   └── MovieManager.jsx      # Main page component with tabs for views
├── reducers/
│   └── movieReducers.jsx     # Reducer for state management
└── App.js                    # Root component
```

## Features

- **View Movies**: Display movies in both card and table views
- **Add Movie**: Create new movies with validation
- **Edit Movie**: Update existing movie information
- **Delete Movie**: Remove movies with confirmation
- **Genre Management**: Display movies by genre
- **Responsive Design**: Works on all device sizes using Bootstrap

## Getting Started

### Prerequisites

- Node.js and npm installed
- JSON Server installed as a dev dependency

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the JSON Server API (in one terminal):
```bash
npm run api
```
This starts the API server on `http://localhost:3001`

2. Start the React development server (in another terminal):
```bash
npm start
```
This starts the app on `http://localhost:3000`

## Technologies Used

- **React 19** - UI library
- **Bootstrap 5** - Styling
- **React Bootstrap** - React components for Bootstrap
- **JSON Server** - Mock REST API
- **React Context API** - State management
- **useReducer** - State logic

## Data Model

### Movie Object
```json
{
  "id": 1,
  "title": "Movie Title",
  "description": "Movie description",
  "poster": "/images/poster.jpg",
  "genreId": 1,
  "year": 2023,
  "country": "USA",
  "duration": 120
}
```

### Genre Object
```json
{
  "id": 1,
  "name": "Sci-Fi"
}
```

## API Endpoints

- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID
- `POST /movies` - Create a new movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie
- `GET /genres` - Get all genres

## How to Use

1. **View Movies**: The app loads with the card view by default
2. **Switch Views**: Use the tabs to switch between Card View and Table View
3. **Add Movie**: Click "Add New Movie" button, fill the form, and submit
4. **Edit Movie**: Click the "Edit" button on any movie card or row
5. **Delete Movie**: Click the "Delete" button and confirm the action

## License

This project is for educational purposes.
