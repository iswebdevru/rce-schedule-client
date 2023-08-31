import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDesktop, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const groupSearchStorageKey = 'rce/group';
export const isBetaBannerHiddenStorageKey = 'beta-banner';
export const themeStorageKey = 'theme';

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export const weekdays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
] as const;

export const themeKeys = ['system', 'light', 'dark'] as const;

export const bellsScheduleTypes = ['Обычный', 'Сокращенный'] as const;

export type BellsScheduleTypes = (typeof bellsScheduleTypes)[number];

export type ThemeKey = (typeof themeKeys)[number];

export type Weekdays = (typeof weekdays)[number];

export type TimePeriod = [number, number];

export interface LessonWithBreak {
  hasBreak: true;
  firstHalf: TimePeriod;
  lastHalf: TimePeriod;
}

export interface LessonWithoutBreak {
  hasBreak: false;
  period: TimePeriod;
}

export type LessonSchedule = LessonWithBreak | LessonWithoutBreak;

export type BellsSchedule = Array<LessonSchedule | null>;

export interface Theme {
  name: string;
  icon: IconDefinition;
  activeClassName: string;
  className: string;
}

export interface HeaderLinkProps {
  kind: 'internal' | 'external';
  href: string;
  text: string;
}

export const headerLinks: HeaderLinkProps[] = [
  {
    kind: 'internal',
    href: '/',
    text: 'пары',
  },
  {
    kind: 'internal',
    href: '/bells',
    text: 'звонки',
  },
  {
    kind: 'external',
    href: 'https://xn--j1al4b.xn--p1ai/',
    text: 'колледж',
  },
  {
    kind: 'external',
    href: 'https://vk.com/rcenext',
    text: 'vk',
  },
  {
    kind: 'external',
    href: 'https://github.com/iswebdevru/rce-schedule-client',
    text: 'GitHub',
  },
  {
    kind: 'external',
    href: 'https://iswebdev.ru',
    text: 'о нас',
  },
];

export const tgChannel = 'https://t.me/iswebdev';

const commonWeekdayBellsSchedule: BellsSchedule = [
  {
    hasBreak: false,
    period: [8 * hour, 8 * hour + 55 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [9 * hour, 9 * hour + 45 * minute],
    lastHalf: [9 * hour + 50 * minute, 10 * hour + 35 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [10 * hour + 50 * minute, 11 * hour + 35 * minute],
    lastHalf: [11 * hour + 40 * minute, 12 * hour + 25 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [12 * hour + 45 * minute, 13 * hour + 30 * minute],
    lastHalf: [13 * hour + 35 * minute, 14 * hour + 20 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [14 * hour + 30 * minute, 15 * hour + 15 * minute],
    lastHalf: [15 * hour + 20 * minute, 16 * hour + 5 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [16 * hour + 15 * minute, 17 * hour],
    lastHalf: [17 * hour + 5 * minute, 17 * hour + 50 * minute],
  },
];

const commonSaturdayBellsSchedule: BellsSchedule = [
  null,
  {
    hasBreak: true,
    firstHalf: [8 * hour, 8 * hour + 45 * minute],
    lastHalf: [8 * hour + 50 * minute, 9 * hour + 35 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [9 * hour + 45 * minute, 10 * hour + 30 * minute],
    lastHalf: [10 * hour + 35 * minute, 11 * hour + 20 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [11 * hour + 30 * minute, 12 * hour + 15 * minute],
    lastHalf: [12 * hour + 20 * minute, 13 * hour + 5 * minute],
  },
  {
    hasBreak: true,
    firstHalf: [13 * hour + 15 * minute, 14 * hour],
    lastHalf: [14 * hour + 5 * minute, 14 * hour + 50 * minute],
  },
  {
    hasBreak: false,
    period: [15 * hour, 16 * hour],
  },
];

const reducedWeekdayBellsSchedule: BellsSchedule = [
  {
    hasBreak: false,
    period: [8 * hour, 8 * hour + 55 * minute],
  },
  {
    hasBreak: false,
    period: [9 * hour, 10 * hour],
  },
  {
    hasBreak: false,
    period: [10 * hour + 10 * minute, 11 * hour + 10 * minute],
  },
  {
    hasBreak: false,
    period: [11 * hour + 20 * minute, 12 * hour + 20 * minute],
  },
  {
    hasBreak: false,
    period: [12 * hour + 30 * minute, 13 * hour + 30 * minute],
  },
  {
    hasBreak: false,
    period: [13 * hour + 40 * minute, 14 * hour + 40 * minute],
  },
];
const reducedSaturdayBellsSchedule: BellsSchedule = [
  null,
  {
    hasBreak: false,
    period: [8 * hour, 9 * hour],
  },
  {
    hasBreak: false,
    period: [9 * hour + 10 * minute, 10 * hour + 10 * minute],
  },
  {
    hasBreak: false,
    period: [10 * hour + 20 * minute, 11 * hour + 20 * minute],
  },
  {
    hasBreak: false,
    period: [11 * hour + 30 * minute, 12 * hour + 30 * minute],
  },
  {
    hasBreak: false,
    period: [12 * hour + 40 * minute, 13 * hour + 40 * minute],
  },
];

export const bellsScheduleMap: Record<
  (typeof bellsScheduleTypes)[number],
  Record<(typeof weekdays)[number], BellsSchedule>
> = {
  Обычный: {
    Понедельник: commonWeekdayBellsSchedule,
    Вторник: commonWeekdayBellsSchedule,
    Среда: commonWeekdayBellsSchedule,
    Четверг: commonWeekdayBellsSchedule,
    Пятница: commonWeekdayBellsSchedule,
    Суббота: commonSaturdayBellsSchedule,
  },
  Сокращенный: {
    Понедельник: reducedWeekdayBellsSchedule,
    Вторник: reducedWeekdayBellsSchedule,
    Среда: reducedWeekdayBellsSchedule,
    Четверг: reducedWeekdayBellsSchedule,
    Пятница: reducedWeekdayBellsSchedule,
    Суббота: reducedSaturdayBellsSchedule,
  },
};

export const themes: Record<ThemeKey, Theme> = {
  system: {
    name: 'Системная',
    icon: faDesktop,
    className: 'hover:text-blue-500 dark:hover:text-blue-500',
    activeClassName: 'text-blue-500',
  },
  light: {
    name: 'Светлая',
    icon: faSun,
    className: 'hover:text-yellow-600 dark:hover:text-yellow-300',
    activeClassName: 'text-yellow-500',
  },
  dark: {
    name: 'Темная',
    icon: faMoon,
    className:
      'hover:text-neutral-200 md:hover:text-neutral-900 dark:hover:text-white',
    activeClassName: 'text-white',
  },
};
