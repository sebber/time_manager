import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { format,parseISO } from 'date-fns'

const EVENTS = gql`
  {
    events {
      id
      title
      start
      end
    }
  }
`;

export default function Events() {
  const { loading, error, data } = useQuery(EVENTS);

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error!</h1>
  }

  return (
    <div>
      <h1>Events</h1>
      <div>
        {data.events.map(event =>
          <div key={event.id}>
            <div className="text-2xl">{event.title}</div>
            <div className="text-sm text-gray-300">{format(parseISO(event.start), 'PPPp')}</div>
          </div>
        )}
      </div>
    </div>
  );
}