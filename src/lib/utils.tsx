import { Fragment } from 'react';
import { DayWithChanges } from './api';

export const repeat = (count: number, value: JSX.Element) => {
  return Array(count)
    .fill(0)
    .map((_, i) => <Fragment key={i}>{value}</Fragment>);
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
  return (
    new RegExp(`^${search.replace(/[^а-я]/gi, '')}`, 'i').test(name) &&
    new RegExp(`^${search.replace(/\D/g, '')}`).test(cabinet)
  );
}

export function createDateId({ day, month, year, version }: DayWithChanges) {
  return `${day}${month}${year}${version}`;
}

export function standardDate(day: DayWithChanges) {
  return `${adjustDate(day.day)}.${adjustDate(day.month)}.${day.year}`;
}

export function getHoursAndMinutes(ms: number) {
  const date = new Date(ms);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return {
    hours: hours.toString(),
    minutes: minutes > 9 ? minutes.toString() : `0${minutes}`,
  };
}

export const fetcher = async (url: string) =>
  fetch(url).then(data => data.json());

export const noop = () => {};
