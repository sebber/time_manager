import React from 'react';
import { useForm } from 'react-hook-form';

export default function CreateEvent() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div>
      <h1>New event</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Title</Label>
          <TextInput type="text" name="title" ref={register} />
        </div>


        <div>
          <Label>Start</Label>
          <input type="date" name="start_date" ref={register} />
          <input type="time" name="start_time" ref={register} />
        </div>


        <div>
          <Label>End</Label>
          <input type="date" name="end_date" ref={register} />
          <input type="time" name="end_time" ref={register} />
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

function TextInput({ ...props }) {
  return (
    <input type="text" className="bg-white px-1 py-2 text-gray-900 w-full" {...props} />
  );
}