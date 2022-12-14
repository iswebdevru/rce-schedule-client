import { ScheduleState } from '../schedule-reducer';
import { groupFilter } from '../utils';
import { ScheduleSkeleton } from './ScheduleSkeleton';

export interface ScheduleProps {
  state: ScheduleState;
  filters: {
    group: string;
  };
}

export function Schedule({ state, filters }: ScheduleProps) {
  if (state.type === 'loading') {
    return <ScheduleSkeleton count={12} />;
  }

  if (state.type === 'error') {
    return <>{state.reason}</>;
  }

  return (
    <div className="flex flex-wrap justify-between gap-10">
      {state.data
        .filter(({ group }) => groupFilter(group, filters.group))
        .map(schedule => {
          return (
            <div
              key={schedule.group}
              className="bg-white border border-gray-400 shadow-sm rounded-2xl basis-full md:basis-80"
            >
              <h2 className="text-xl font-medium mx-4 mt-4">
                {schedule.group}
              </h2>
              <div className="p-2">
                <table className="border-none w-full">
                  <tbody>
                    <tr>
                      <th className="w-[10%] font-extralight text-lg border-b border-r px-3 py-1">
                        №
                      </th>
                      <th className="w-[75%] font-extralight text-lg border-b border-r px-3 py-1 text-left">
                        Предмет
                      </th>
                      <th className="w-[20%] font-extralight text-lg border-b group-last:border-b-0 px-3 py-1">
                        Каб
                      </th>
                    </tr>
                    {schedule.subjects.map((subject, i) => {
                      return (
                        <tr key={subject?.index ?? i} className="group">
                          <td className="w-[10%] text-lg text-center border-b border-r group-last:border-b-0 px-3 py-1">
                            {subject?.index ?? ''}
                          </td>
                          <td className="w-[75%] border-b border-r group-last:border-b-0 px-3 py-1">
                            {subject?.title ?? ''}
                          </td>
                          <td className="w-[20%] text-center border-b group-last:border-b-0 px-3 py-1">
                            {subject?.cabinet ?? ''}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </div>
  );
}
