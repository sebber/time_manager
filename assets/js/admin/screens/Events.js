import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from "react-router-dom";
import { format, parse, parseISO, formatISO, startOfDay, endOfDay } from 'date-fns';
import WeekPicker from '../components/WeekPicker';
import PageLayout from '../layouts/Page';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';

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
    <PageLayout>
      <PageHeader>
        <PageTitle>Events</PageTitle>
        <NewEventPoof date={date} />
      </PageHeader>

      <div className="w-8/12 mx-auto mb-4">
        <WeekPicker date={date} onChange={date => setDate(date)} />
      </div>

      {loading && (<h1>Loading...</h1>)}
      {error && (<h1>Error!</h1>)}

      {!loading && !error && data.events.length > 0 && data.events.map(event =>
        <Event key={event.id} event={event} />
      )}

      {!loading && !error && data.events.length <= 0 && (
        <div>There seems to be no events this day</div>
      )}
    </PageLayout>
  );
}

function Event({ event }) {
  return (
    <div className="mb-2 py-2 px-4 rounded-sm border-b-2 border-gray-200">
      <div className="text-2xl">{format(parseISO(event.start), 'p')}</div>
      <div className="text-md text-gray-800">{event.title}</div>
    </div>
  )
}

function NewEventPoof({ date }) {
  const href = date
    ? `/events/create?date=${format(date, 'yyyy-MM-dd')}`
    : '/events/create';

  return (
    <div className="text-md text-indigo-600">
      <Link to={href}>Create a new event</Link>
    </div>
  )
}