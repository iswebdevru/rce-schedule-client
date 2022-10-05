import { ChangeEvent, useEffect, useId, useReducer, useState } from 'react';
import { Schedule } from './components/Schedule';
import { TableSkeleton } from './components/TableSkeleton';
import { scheduleReducer } from './schedule-reducer';
import { ScheduleResponseSchema } from './schemas';

const RCE_API = 'http://api.rcebot.tk/';

interface DayWithChanges {
  day: number;
  month: number;
  year: number;
  version: number;
}

export function App() {
  const [schedule, dispatch] = useReducer(scheduleReducer, { type: 'loading' });
  const [daysWithChanges, setDaysWithChanges] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    getDaysWithChanges();
  }, []);

  useEffect(() => {
    getSchedule();
  }, [selectedDay]);

  const getSchedule = async () => {
    dispatch({
      type: 'WAIT',
    });
    const data = await (
      await fetch(`${RCE_API}/schedule${selectedDay}`)
    ).json();
    const validatedScheduleResponse = ScheduleResponseSchema.safeParse(data);

    if (validatedScheduleResponse.success) {
      if (validatedScheduleResponse.data.error === null) {
        dispatch({
          type: 'ADD',
          payload: validatedScheduleResponse.data.data,
        });
      } else {
        dispatch({
          type: 'THROW',
          payload: validatedScheduleResponse.data.message,
        });
      }
    } else {
      dispatch({
        type: 'THROW',
        payload: validatedScheduleResponse.error.message,
      });
    }
  };

  const getDaysWithChanges = async () => {
    const days = (await (
      await fetch(`${RCE_API}/days-with-changes`)
    ).json()) as DayWithChanges[];
    setDaysWithChanges(
      days.map(date => `?day=${date.day}&month=${date.month}&year=${date.year}`)
    );
  };

  const onSelectedGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedGroup(e.currentTarget.value);
  };

  const onSelectedDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.currentTarget.value);
  };
  let tablePart: any;
  if (schedule.type === 'loading') {
    tablePart = <TableSkeleton count={12} />;
  } else if (schedule.type === 'error') {
    tablePart = <>{schedule.reason}</>;
  } else {
    tablePart = (
      <Schedule
        data={schedule.data.filter(({ group }) =>
          new RegExp(selectedGroup, 'i').test(group)
        )}
      />
    );
  }
  return (
    <div className="px-4 max-w-screen-xl mx-auto flex flex-col gap-4">
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
          <select
            value={selectedDay}
            onChange={onSelectedDayChange}
            className="p-2 border border-gray-700 rounded-md"
          >
            {daysWithChanges.map(day => {
              return <option value={day}>{day}</option>;
            })}
          </select>
        </div>
      </div>
      <div>{tablePart}</div>
    </div>
  );
}
