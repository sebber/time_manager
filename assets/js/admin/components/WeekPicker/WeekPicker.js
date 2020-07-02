import React, { useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  getWeekDays,
  firstDayNextWeek,
  lastDayLastWeek,
  formatDateShort
} from './utils';

export default function WeekPicker({ date, onChange }) {
  const dates = useMemo(() => getWeekDays(date), [date]);
  const nextWeek = useMemo(() => firstDayNextWeek(date), [date]);
  const lastWeek = useMemo(() => lastDayLastWeek(date), [date]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 p-4 justify-center content-center">
        <button onClick={() => onChange(lastWeek)}>
          <FaArrowLeft />
        </button>
      </div>
      <div className="flex flex-row border-r-2 border-gray-300">
        {dates.map(weekDate => (
          <div key={weekDate}
            className={`flex flex-1 p-4 border-2 border-r-0 border-gray-300 justify-center content-center hover:bg-gray-200 cursor-pointer ${isSameDay(weekDate, date) ? 'bg-gray-200' : ''}`}
            onClick={() => onChange(weekDate)}>
            {formatDateShort(weekDate)}
          </div>
        ))}
      </div>
      <div className="flex flex-1 p-4 justify-center content-center">
        <button onClick={() => onChange(nextWeek)}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}