import React from 'react';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';

export default function Page({ title, children }) {
  return (
    <div className="bg-white shadow-sm flex-col px-8 py-4">
      {title && (
        <PageHeader>
          <PageTitle>
            {title}
          </PageTitle>
        </PageHeader>
      )}
      {children}
    </div>
  )
}
