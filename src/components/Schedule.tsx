import { z } from 'zod';
import { ScheduleSchema } from '../schemas';

export type ScheduleProps = {
  data: z.infer<typeof ScheduleSchema>[];
};

export function Schedule({ data }: ScheduleProps) {
  return (
    <div className="flex flex-wrap flex-auto  ">
      {data.map(schedule => {
        return (
          <table className="flex-bas basis-1/3" key={schedule.group}>
            <tbody className="text-left border border-gray-400">
              <tr>
                <th
                  className="text-xl border border-gray-400 px-2 py-1"
                  colSpan={3}
                >
                  {schedule.group}
                </th>
              </tr>
              <tr>
                <td
                  className="text-lg border border-gray-400 px-2 py-1"
                  colSpan={2}
                >
                  Пара
                </td>
                <td className="text-lg text-center border border-gray-400 px-2 py-1">
                  Каб
                </td>
              </tr>
              {schedule.subjects.map(subject => {
                return (
                  <tr key={subject.index}>
                    <td className="w-1/12 text-lg text-center border border-gray-400 px-2 py-1">
                      {subject.index}
                    </td>
                    <td className="w-9/12 border border-gray-400 px-2 py-1">
                      {subject.title}
                    </td>
                    <td className="w-2/12 text-center border border-gray-400 px-2 py-1">
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
