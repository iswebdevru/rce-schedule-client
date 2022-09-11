import { useEffect, useId, useState } from 'react';

export type Subject = {
  index: number;
  title: string;
  cabinet: string;
};

export interface Schedule {
  group: string;
  subjects: Subject[];
}

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

function Schedule() {
  const [schedule, setSchedule] = useState<Schedule[] | null>(null);

  useEffect(() => {
    getSchedule();
  });

  const getSchedule = async () => {
    const body = await (await fetch('http://127.0.0.1:3000/schedule')).json();
    setSchedule(body);
  };

  if (!schedule) {
    return <>loading</>;
  }

  return (
    <div className="flex flex-wrap flex-auto">
      {schedule.map(schedule => {
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
