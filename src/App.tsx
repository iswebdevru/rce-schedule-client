import { Reducer, useEffect, useId, useReducer } from 'react';
import { z } from 'zod';

const ScheduleSchema = z.object({
  error: z.string().nullable(),
  data: z
    .object({
      group: z.string(),
      subjects: z
        .object({
          index: z.number(),
          title: z.string(),
          cabinet: z.string(),
        })
        .array(),
    })
    .array(),
});

type ScheduleState =
  | ScheduleStateLoading
  | ScheduleStateError
  | ScheduleStateSuccess;
type ScheduleStateLoading = {
  type: 'loading';
};
type ScheduleStateError = {
  type: 'error';
  reason: string;
};
type ScheduleStateSuccess = {
  type: 'success';
  data: z.infer<typeof ScheduleSchema>['data'];
};
type ScheduleReducerAction = {
  type: 'ADD' | 'WAIT' | 'THROW';
  payload?: any;
};

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
const scheduleReducer: Reducer<ScheduleState, ScheduleReducerAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'ADD':
      return {
        type: 'success',
        data: action.payload,
      };
    case 'WAIT':
      return {
        type: 'loading',
      };
    case 'THROW':
      return {
        type: 'error',
        reason: 'Not Found',
      };
    default:
      return prevState;
  }
};

function Schedule() {
  const [schedule, dispatch] = useReducer(scheduleReducer, { type: 'loading' });

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = async () => {
    const data = await (
      await fetch('http://127.0.0.1:3000/schedule?day=12')
    ).json();
    const validatedSchedule = ScheduleSchema.safeParse(data);
    if (validatedSchedule.success) {
      dispatch({
        type: 'ADD',
        payload: validatedSchedule.data.data,
      });
    } else {
      dispatch({
        type: 'THROW',
        payload: validatedSchedule.error.message,
      });
    }
  };

  if (schedule.type === 'loading') {
    return <>Loading</>;
  }
  if (schedule.type === 'error') {
    return <>{schedule.reason}</>;
  }

  return (
    <div className="flex flex-wrap flex-auto">
      {schedule.data.map(schedule => {
        return (
          <table>
            <tbody className="text-left border border-gray-400">
              <tr>
                <th className="border border-gray-400 px-2 py-1" colSpan={3}>
                  {schedule.group}
                </th>
              </tr>
              <tr>
                <td className="border border-gray-400 px-2 py-1" colSpan={2}>
                  Пара
                </td>
                <td className="border border-gray-400 px-2 py-1">Кабинет</td>
              </tr>
              {schedule.subjects.map(subject => {
                return (
                  <tr>
                    <td className="border border-gray-400 px-2 py-1">
                      {subject.index}
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {subject.title}
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {subject.cabinet}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export function App() {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col-reverse sm:flex-row gap-4">
      <div>
        <Schedule />
      </div>
      {/* <div>
        <InformationForm />
      </div> */}
    </div>
  );
}
