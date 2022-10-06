import { DayWithChanges } from './types';

export const repeat = <T>(count: number, value: T) => {
  return Array(count)
    .fill(0)
    .map(() => value);
};

const DAYS_OF_THE_WEEK: Record<number, string> = {
  '0': 'Воскресенье',
  '1': 'Понедельник',
  '2': 'Вторник',
  '3': 'Среда',
  '4': 'Четверг',
  '5': 'Пятница',
  '6': 'Суббота',
  '7': 'Воскресенье',
};

function adjustDate(n: number) {
  return `${n < 10 ? 0 : ''}${n}`;
}

export function toHumanReadableDate(day: DayWithChanges) {
  const date = new Date(day.year, day.month - 1, day.day);
  console.log(date);

  return `${DAYS_OF_THE_WEEK[date.getDay()]} ${adjustDate(
    day.day
  )}.${adjustDate(day.month + 1)}`;
}
