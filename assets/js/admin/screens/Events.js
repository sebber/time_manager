import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { format, parseISO, formatISO, startOfDay, endOfDay } from 'date-fns';
import WeekPicker from '../components/WeekPicker';

const EVENTS = gql`
  query Events($from: NaiveDateTime!, $to: NaiveDateTime!) {
    events(from: $from, to: $to) {
      id
      title
      start
      end
    }
  }
`;

export default function Events() {
  const [date, setDate] = useState(new Date());

  const { loading, error, data } = useQuery(EVENTS, {
    variables: {
      from: formatISO(startOfDay(date)),
      to: formatISO(endOfDay(date)),
    },
  });

  return (
    <div>
      <h1 className="text-2xl">Events: {formatISO(date)}</h1>
      <div className="flex flex-col">
        <WeekPicker date={date} onChange={date => setDate(date)} />
        {loading && (<h1>Loading...</h1>)}
        {error && (<h1>Error!</h1>)}
        {!loading && !error && data.events.map(event =>
          <div key={event.id} className="my-2 p-2 rounded-sm border-2 border-gray-200">
            <div className="text-2xl">{event.title}</div>
            <div className="text-md text-gray-600">{format(parseISO(event.start), 'PPPp')}</div>
          </div>
        )}
      </div>
    </div>
  );
}



