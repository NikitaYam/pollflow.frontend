# Survey System - Dev Frontend

A modern React-based frontend application for creating and managing surveys.

## Features

- 📝 Create custom surveys with multiple questions
- 🔐 User authentication and authorization
- 📊 Real-time survey results visualization
- 🎨 Modern and responsive UI design
- 🚀 Fast development with Vite
- 💪 Type-safe with TypeScript

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/          - Application pages (routes)
├── components/     - Reusable components
├── services/       - API service layer
├── types/          - TypeScript type definitions
├── styles/         - CSS styles
├── App.tsx         - Main app component with routing
└── main.tsx        - Application entry point
```

## Routes

- `/` - Home page
- `/enter-number` - Enter survey ID to take survey
- `/auth` - Login/Register page
- `/dashboard` - User dashboard (protected)
- `/constructor` - Survey constructor (protected)
- `/survey/:id` - Take survey
- `/results/:id` - View survey results

## API Configuration

The application connects to the backend API at `http://localhost:8080/api/v1`

You can modify this in `src/services/apiService.ts`

## Technologies

- React 18
- TypeScript
- Vite
- React Router v6
- CSS3

## Documentation

For detailed API documentation and endpoints, see `../description_dev_frontend.md` in the root directory.

## License

Private project

