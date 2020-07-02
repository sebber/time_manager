import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { format, parse, parseISO, formatISO, startOfDay, endOfDay } from 'date-fns';
import { useMutation } from '@apollo/client';
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PageLayout from '../layouts/Page';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';
import { EVENTS, CREATE_EVENT } from '../gql';

function useQueryDate() {
  const datestring = new URLSearchParams(useLocation().search).get("date");
  if (datestring) {
    const date = parse(datestring, 'yyyy-MM-dd', new Date());
    return date;
  }

  return null;
}

export default function CreateEvent() {
  const defaultFromDate = useQueryDate() || new Date();
  const defaultToDate = useQueryDate() || new Date();
  const history = useHistory();
  const [createEvent, { data }] = useMutation(
    CREATE_EVENT,
    {
      update: (cache, { data: { createEvent }}) => {
        const query = {
          query: EVENTS,
          variables: {
            from: formatISO(startOfDay(defaultFromDate)),
            to: formatISO(endOfDay(defaultToDate)),
          }
        };
        const { events } = cache.readQuery(query);
        cache.writeQuery({
          ...query,
          data: { events: events.concat([createEvent]) },
        });
      },
      onCompleted: () => {
        history.push('/events');
      }
    }
  );
  const { register, unregister, handleSubmit, setValue, errors } = useForm();
  useEffect(() => {
    register({ name: "start" }, { required: true });
    register({ name: "end" }, { required: true });
    return () => {
      unregister({ name: "start" });
      unregister({ name: "end" });
    }
  }, [register]);

  const onSubmit = data => {
    createEvent({ variables: data });
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>New Event</PageTitle>
        <button className="text-md text-indigo-600" type="button" onClick={() => history.goBack()}>Go back</button>
      </PageHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Title</Label>
          <TextInput type="text" name="title" ref={register} />
        </div>

        <div className="mt-4 flex flex-row justify-between">
          <div>
            <Label>Start</Label>
            <DateInput date={defaultFromDate} onChange={date => setValue('start', date)} />
          </div>

          <div>
            <Label>End</Label>
            <DateInput date={defaultToDate} onChange={date => setValue('end', date)} />
          </div>
        </div>

        <div className="py-4">
          <button type="submit" className="hover:text-indigo-700">Create event</button>
        </div>
      </form>
    </PageLayout>
  );
}

function Label({ children, ...props }) {
  return (
    <label className="font-bold" {...props}>{children}</label>
  );
}

const TextInput = React.forwardRef(({ ...props }, ref) => {
  return (
    <input type="text" className="w-full px-1 py-2 bg-white border border-gray-200 text-gray-900" {...props} ref={ref} />
  );
});

function DateInput({ date, onChange }) {
  const [state, setState] = useState(date);

  const setValue = (date) => {
    onChange(date);
    setState(date);
  }

  return (
    <DatePicker
      selected={state}
      onChange={date => setValue(date)}
      showTimeSelect
      inline
    />
  );
}