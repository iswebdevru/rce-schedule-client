import { ChangeEventHandler, useId } from 'react';
import { useDaysWithChanges } from '../lib/api';
import { createDateId, toHumanReadableDate } from '../lib/utils';
import Label from './Label';
import Select, { Option } from './Select';

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
  const inputGroupId = useId();
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
        <div className="flex flex-col">
          <Label className="mb-2" htmlFor={inputGroupId}>
            Группа:
          </Label>
          <input
            id={inputGroupId}
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
    </div>
  );
}

interface SelectDayProps {
  selectedDay: number;
  onSelectedDayChange: ChangeEventHandler<HTMLSelectElement>;
}

function SelectDay({ selectedDay, onSelectedDayChange }: SelectDayProps) {
  const selectDayId = useId();
  const { data: days, isLoading, error } = useDaysWithChanges();

  let piece: JSX.Element;

  if (isLoading) {
    piece = (
      <div className="flex min-w-[180px] h-[36px] items-center px-2 border rounded-md border-gray-700 dark:border-neutral-800">
        <div className="h-5 w-full animate-pulse bg-gray-300 rounded-md dark:bg-neutral-800"></div>
      </div>
    );
  } else if (!days || error || !days.length) {
    piece = <>Нет изменений</>;
  } else {
    piece = (
      <Select
        id={selectDayId}
        value={selectedDay}
        onChange={onSelectedDayChange}
      >
        {days.map((day, i) => {
          return (
            <Option key={createDateId(day)} value={i}>
              {toHumanReadableDate(day)}
            </Option>
          );
        })}
      </Select>
    );
  }
  return (
    <>
      <Label className="mb-2" htmlFor={selectDayId}>
        Дата:
      </Label>
      {piece}
    </>
  );
}
