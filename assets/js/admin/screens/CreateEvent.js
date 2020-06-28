import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { parse } from 'date-fns';
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
  const { register, handleSubmit, setValue, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("title"));
  console.log(watch("start"));
  console.log(watch("end"));

  useEffect(() => {
    register({ name: "start" }, { required: true });
    register({ name: "end" }, { required: true });
  }, []);


  return (
    <div>
      <h1>New event</h1>
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

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
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