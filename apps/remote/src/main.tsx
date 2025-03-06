import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AnalyticsWidget from './components/AnalyticsWidget';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="p-8">
      <AnalyticsWidget />
    </div>
  </StrictMode>
);