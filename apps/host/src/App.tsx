import React, { Suspense, lazy } from 'react';
import { Activity, Bell, Home, Users } from 'lucide-react';
import { reportWebVitals } from './webVitals';

const AnalyticsWidget = lazy(() => import('remote/AnalyticsWidget'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white h-[calc(100vh-4rem)] shadow-sm">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg bg-gray-100">
                  <Activity className="h-5 w-5" />
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <Suspense fallback={<div>Loading analytics...</div>}>
                <AnalyticsWidget />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

reportWebVitals();

export default App;