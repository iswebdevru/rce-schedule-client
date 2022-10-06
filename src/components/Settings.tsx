import { ChangeEventHandler } from 'react';
import { DayWithChanges } from '../types';
import { toHumanReadableDate } from '../utils';

export interface SettingsProps {
  selectedGroup: string;
  onSelectedGroupChange: ChangeEventHandler<HTMLInputElement>;
  selectedDay: number | null;
  onSelectedDayChange: ChangeEventHandler<HTMLSelectElement>;
  days: DayWithChanges[];
}

export function Settings({
  selectedGroup,
  onSelectedGroupChange,
  selectedDay,
  onSelectedDayChange,
  days,
}: SettingsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col">
        <label htmlFor="" className="text-lg font-semibold mb-1">
          Группа:
        </label>
        <input
          type="text"
          className="p-2 border border-gray-700 rounded-md"
          value={selectedGroup}
          onChange={onSelectedGroupChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="text-lg font-semibold mb-1">
          Дата:
        </label>
        {selectedDay !== null && (
          <select
            value={selectedDay}
            onChange={onSelectedDayChange}
            className="p-2 border border-gray-700 rounded-md"
          >
            {days.map((day, i) => {
              return <option value={i}>{toHumanReadableDate(day)}</option>;
            })}
          </select>
        )}
      </div>
    </div>
  );
}
