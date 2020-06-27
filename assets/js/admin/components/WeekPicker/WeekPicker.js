import React, { useMemo } from 'react';
import { getWeekDays, formatDateShort } from './utils';
import { isSameDay } from 'date-fns';

export default function WeekPicker({ date, onChange }) {
  const dates = useMemo(() => getWeekDays(date), [date]);

  return (
    <div className="flex flex-row border-r-2 border-gray-300">
      {dates.map(weekDate => (
        <div key={weekDate}
          className={`flex flex-1 p-4 border-2 border-r-0 border-gray-300 justify-center content-center hover:bg-gray-200 cursor-pointer ${isSameDay(weekDate, date) ? 'bg-gray-200' : ''}`}
          onClick={() => onChange(weekDate)}>
          {formatDateShort(weekDate)}
        </div>
      ))}
    </div>
  )
}