import React from 'react';
import { ProductTable } from './components/ProductTable';
import { PrimeReactProvider } from 'primereact/api';

// Import PrimeReact styles
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <PrimeReactProvider>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Management</h1>
          <ProductTable />
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;