import { ChangeEventHandler, useEffect, useReducer, useState } from 'react';
import { Schedule } from './components/Schedule';
import { Settings } from './components/Settings';
import { TableSkeleton } from './components/TableSkeleton';
import { scheduleReducer } from './schedule-reducer';
import { ScheduleResponseSchema } from './schemas';
import { GROUP } from './storage';
import { DayWithChanges } from './types';

const RCE_API = 'https://api.rcebot.tk';

export function App() {
  const [schedule, dispatch] = useReducer(scheduleReducer, { type: 'loading' });
  const [days, setDays] = useState<DayWithChanges[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem(GROUP) || ''
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    fetchDays();
  }, []);

  useEffect(() => {
    if (selectedDay !== null) {
      fetchSchedule();
    }
  }, [selectedDay]);

  useEffect(() => {
    if (localStorage.getItem(GROUP) !== selectedGroup) {
      localStorage.setItem(GROUP, selectedGroup);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (days.length) {
      const today = new Date();
      let todayIndex = -1;
      let freshestIndex: number = -1;

      for (let i = 0; i < days.length; i++) {
        if (
          days[i].day === today.getDate() &&
          days[i].month === today.getMonth() + 1 &&
          days[i].year === today.getFullYear()
        ) {
          todayIndex = i;
          break;
        }
        if (
          freshestIndex === -1 ||
          new Date(days[i].year, days[i].month - 1, days[i].day) >
            new Date(
              days[freshestIndex].year,
              days[freshestIndex].month - 1,
              days[freshestIndex].day
            )
        ) {
          freshestIndex = i;
        }
      }
      if (todayIndex !== -1) {
        setSelectedDay(todayIndex);
      } else {
        setSelectedDay(freshestIndex);
      }
    }
  }, [days]);

  const fetchDays = () => {
    fetch(`${RCE_API}/days-with-changes`)
      .then(response => response.json())
      .then(days => setDays(days));
  };

  const fetchSchedule = async () => {
    dispatch({
      type: 'WAIT',
    });
    const { day, month, year } = days[selectedDay as number];
    const getParams = `?day=${day}&month=${month}&year=${year}`;
    const data = await (await fetch(`${RCE_API}/schedule${getParams}`)).json();
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

  const onSelectedGroupChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSelectedGroup(e.currentTarget.value);
  };

  const onSelectedDayChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelectedDay(+e.currentTarget.value);
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
      <Settings
        selectedGroup={selectedGroup}
        onSelectedGroupChange={onSelectedGroupChange}
        selectedDay={selectedDay}
        onSelectedDayChange={onSelectedDayChange}
        days={days}
      />
      <div>{tablePart}</div>
    </div>
  );
}
