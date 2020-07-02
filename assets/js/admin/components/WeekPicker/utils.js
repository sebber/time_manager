import {
  add,
  sub,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from 'date-fns'

export function getWeekDays(date) {
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });
}

export function firstDayNextWeek(date) {
  return add(endOfWeek(date), { days: 1 });
}

export function lastDayLastWeek(date) {
  return sub(startOfWeek(date), { days: 1 });
}

export function formatDateShort(date) {
  return `${format(date, 'd')}/${format(date, 'M')}`;
}