import { ChangeEvent, useEffect, useId, useReducer, useState } from 'react';
import { Schedule } from './components/Schedule';
import { scheduleReducer } from './schedule-reducer';
import { ScheduleResponseSchema } from './schemas';

function InformationForm() {
  const groupInputId = useId();
  const dayInputId = useId();

  return (
    <div className="p-4">
      <div className="flex flex-col">
        <label htmlFor={groupInputId}>Группа</label>
        <input
          type="text"
          name="group"
          id={groupInputId}
          defaultValue={'ИС-203'}
          className="border-2 border-gray-500 px-2 py-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor={dayInputId}>День</label>
        <input
          type="text"
          name="day"
          id={dayInputId}
          defaultValue={'Сегодня'}
          className="border-2 border-gray-500 px-2 py-1"
        />
      </div>
    </div>
  );
}

export function App() {
  const [schedule, dispatch] = useReducer(scheduleReducer, { type: 'loading' });
  const [groupFilter, setGroupFilter] = useState('');

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = async () => {
    const data = await (
      await fetch('https://rce-schedule-api.up.railway.app/schedule')
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

  const onGroupFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupFilter(e.currentTarget.value);
  };

  if (schedule.type === 'loading') {
    return <>Loading</>;
  }
  if (schedule.type === 'error') {
    return <>{schedule.reason}</>;
  }
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="">Группа:</label>
        <input
          type="text"
          className="p-4 border border-gray-700"
          value={groupFilter}
          onChange={onGroupFilterChange}
        />
      </div>
      <div>
        <Schedule
          data={schedule.data.filter(({ group }) =>
            new RegExp(groupFilter, 'i').test(group)
          )}
        />
      </div>
    </div>
  );
}
