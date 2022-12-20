import { ChangeEventHandler } from 'react';
import { DayWithChanges } from '../types';
import { createDateId, toHumanReadableDate } from '../utils';
import Container from './Container';

export interface SettingsProps {
  selectedGroup: string;
  onSelectedGroupChange: ChangeEventHandler<HTMLInputElement>;
  selectedDay: number;
  onSelectedDayChange: ChangeEventHandler<HTMLSelectElement>;
  days: DayWithChanges[];
}

function InputSkeleton() {
  return (
    <div className="flex min-w-[180px] p-2 border rounded-md border-gray-700">
      <div className="h-6 w-full animate-pulse bg-gray-300 rounded-md"></div>
    </div>
  );
}

export function Settings({
  selectedGroup,
  onSelectedGroupChange,
  selectedDay,
  onSelectedDayChange,
  days,
}: SettingsProps) {
  return (
    <div className="mb-6">
      <Container>
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Группа:</label>
            <input
              type="text"
              className="px-4 py-2 rounded-md transition-[outline] outline outline-1 outline-slate-400 focus:outline-slate-900"
              value={selectedGroup}
              onChange={onSelectedGroupChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Дата:</label>
            {days.length ? (
              <select
                value={selectedDay}
                onChange={onSelectedDayChange}
                className="p-2 rounded-md transition-[outline] outline outline-1 outline-slate-400 focus:outline-slate-900"
              >
                {days.map((day, i) => {
                  return (
                    <option key={createDateId(day)} value={i}>
                      {toHumanReadableDate(day)}
                    </option>
                  );
                })}
              </select>
            ) : (
              <InputSkeleton />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
