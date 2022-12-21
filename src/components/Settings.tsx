import { ChangeEventHandler } from 'react';
import { useDaysWithChanges } from '../lib/api';
import { createDateId, toHumanReadableDate } from '../lib/utils';
import Container from './Container';

export interface SettingsProps {
  selectedGroup: string;
  onSelectedGroupChange: ChangeEventHandler<HTMLInputElement>;
  selectedDay: number;
  onSelectedDayChange: ChangeEventHandler<HTMLSelectElement>;
}

export function Settings({
  selectedGroup,
  onSelectedGroupChange,
  selectedDay,
  onSelectedDayChange,
}: SettingsProps) {
  return (
    <div className="mb-6">
      <Container>
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-2 dark:text-neutral-400">
              Группа:
            </label>
            <input
              type="text"
              className="px-4 py-2 text-sm rounded-md transition-[outline] outline outline-1 outline-slate-400 focus:outline-slate-900 dark:bg-neutral-900 dark:outline-neutral-800 dark:focus:outline-neutral-700 dark:text-neutral-300"
              value={selectedGroup}
              onChange={onSelectedGroupChange}
            />
          </div>
          <div className="flex flex-col">
            <SelectDay
              selectedDay={selectedDay}
              onSelectedDayChange={onSelectedDayChange}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

interface SelectDayProps {
  selectedDay: number;
  onSelectedDayChange: ChangeEventHandler<HTMLSelectElement>;
}

function SelectDay({ selectedDay, onSelectedDayChange }: SelectDayProps) {
  const { data: days, isLoading, error } = useDaysWithChanges();

  let piece: JSX.Element;

  if (isLoading) {
    piece = (
      <div className="flex min-w-[180px] h-[36px] items-center px-2 border rounded-md border-gray-700 dark:border-neutral-800">
        <div className="h-6 w-full animate-pulse bg-gray-300 rounded-md dark:bg-neutral-800"></div>
      </div>
    );
  } else if (!days || error || !days.length) {
    piece = <>Нет изменений</>;
  } else {
    piece = (
      <select
        value={selectedDay}
        onChange={onSelectedDayChange}
        className="p-2 rounded-md text-sm transition-[outline] outline outline-1 outline-slate-400 focus:outline-slate-900 dark:bg-neutral-900 dark:outline-neutral-800 dark:focus:outline-neutral-700 dark:text-neutral-300"
      >
        {days.map((day, i) => {
          return (
            <option
              key={createDateId(day)}
              value={i}
              className="dark:text-neutral-400"
            >
              {toHumanReadableDate(day)}
            </option>
          );
        })}
      </select>
    );
  }
  return (
    <>
      <label className="font-semibold mb-2 dark:text-neutral-400">Дата:</label>
      {piece}
    </>
  );
}
