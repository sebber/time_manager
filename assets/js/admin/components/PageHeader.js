import React from 'react';

export default function PageHeader({ children }) {
  return (
    <div className="flex flex-row justify-between align-center py-4 px-2 mb-8 border-b-2 border-gray-200">
      {children}
    </div>
  )
}
