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
  return `${DAYS_OF_THE_WEEK[date.getDay()]} ${adjustDate(
    day.day
  )}.${adjustDate(day.month)}`;
}

export function groupFilter(group: string, search: string) {
  if (!search.length) {
    return true;
  }
  const [name, cabinet] = group.split('-');
  console.log(`^${search.replace(/[^а-я]/gi, '')}`);
  console.log(`^${search.replace(/\D/g, '')}`);

  return (
    new RegExp(`^${search.replace(/[^а-я]/gi, '')}`, 'i').test(name) &&
    new RegExp(`^${search.replace(/\D/g, '')}`).test(cabinet)
  );
}
