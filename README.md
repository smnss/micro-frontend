# Micro Frontend Dashboard

A modern micro frontend-based dashboard application built with React, Vite, and Module Federation.

## Architecture Decisions

- **Module Federation**: Used to split the application into independent deployable modules
- **Web Vitals**: Integrated for performance monitoring
- **Recharts**: Chosen for responsive and interactive data visualization
- **Tailwind CSS**: Used for rapid UI development and consistent styling

## Project Structure

```
apps/
  ├── host/         # Dashboard shell application
  └── remote/       # Analytics widget micro frontend
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development servers:
   ```bash
   npm run preview
   ```

   - Host application: http://localhost:5000
   - Remote application: http://localhost:5001

## Features

- Real-time analytics dashboard
- Modular architecture with Module Federation
- Performance monitoring with Web Vitals
- Responsive design with Tailwind CSS
- Interactive charts with Recharts

## Performance Optimizations

- Lazy loading of micro frontends
- Code splitting with React Suspense
- Web Vitals monitoring
- Shared dependencies between applications