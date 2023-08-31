import { useId } from 'react';
import { useDaysWithChanges } from '../lib/api';
import { createDateId, toHumanReadableDate } from '../lib/utils';
import Label from './Label';
import Select, { Option } from './Select';
import { useScheduleStore } from '../lib/store';
import { DownloadPdf } from './DownloadPdf';

export function Settings() {
  const inputGroupId = useId();
  const { group, setGroup, day, setDay } = useScheduleStore();

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
            autoComplete="off"
            name="group"
            className="px-4 py-2 text-sm rounded-md transition-[outline] outline outline-1 outline-slate-400 focus:outline-slate-900 dark:bg-neutral-900 dark:outline-neutral-800 dark:focus:outline-neutral-700 dark:text-neutral-300"
            value={group}
            onChange={e => setGroup(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col">
          <SelectDay selectedDay={day} onSelectedDayChange={setDay} />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 font-semibold dark:text-neutral-400">
            Скачать
          </div>
          <DownloadPdf />
        </div>
      </div>
    </div>
  );
}

interface SelectDayProps {
  selectedDay: number;
  onSelectedDayChange: (day: number) => void;
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
        onChange={e => onSelectedDayChange(+e.currentTarget.value)}
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
