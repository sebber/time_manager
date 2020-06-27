import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns'

export function getWeekDays(date) {
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });
}

export function formatDateShort(date) {
  return `${format(date, 'd')}/${format(date, 'M')}`;
}