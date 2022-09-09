import { useId } from 'react';

const schedule = [
  {
    group: 'ИС-203',
    subjects: [
      {
        id: 0,
        title: 'Информатика',
        cabinet: 234,
      },
    ],
  },
];

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
  return (
    <div>
      <table className="mx-auto">
        <tbody className="text-left border border-gray-400">
          <tr>
            <th className="border border-gray-400 px-2 py-1" colSpan={2}>
              Пара
            </th>
            <th className="border border-gray-400 px-2 py-1">Кабинет</th>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1">0</td>
            <td className="border border-gray-400 px-2 py-1">Физ-ра</td>
            <td className="border border-gray-400 px-2 py-1"></td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1">1</td>
            <td className="border border-gray-400 px-2 py-1">Информатика</td>
            <td className="border border-gray-400 px-2 py-1">321</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1">2</td>
            <td className="border border-gray-400 px-2 py-1">Физ-ра</td>
            <td className="border border-gray-400 px-2 py-1">342</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function App() {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col-reverse sm:flex-row gap-4">
      <div>
        <Schedule />
      </div>
      <div>
        <InformationForm />
      </div>
    </div>
  );
}
