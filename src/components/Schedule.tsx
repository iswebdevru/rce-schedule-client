import { PropsWithChildren } from 'react';
import { z } from 'zod';
import { ScheduleState } from '../schedule-reducer';
import { ScheduleSchema } from '../schemas';
import { groupFilter, repeat } from '../utils';
import Container from './Container';

export interface ScheduleProps {
  state: ScheduleState;
  filters: {
    group: string;
  };
}

export function Schedule({ state, filters }: ScheduleProps) {
  if (state.type === 'loading') {
    return (
      <ScheduleContainer>
        <ScheduleSkeleton count={12} />;
      </ScheduleContainer>
    );
  }

  if (state.type === 'error') {
    return <>{state.reason}</>;
  }

  return (
    <ScheduleContainer>
      {state.data
        .filter(({ group }) => groupFilter(group, filters.group))
        .map(schedule => {
          return (
            <div
              key={schedule.group}
              className="bg-white border border-slate-300 shadow-sm rounded-lg basis-full md:basis-80"
            >
              <h2 className="text-xl font-medium mx-4 mt-3">
                {schedule.group}
              </h2>
              <div className="p-2">
                <table className="border-none w-full">
                  <tbody>
                    <tr>
                      <th className="w-[15%] font-extralight text-lg border-slate-200 border-b border-r px-3 py-1">
                        №
                      </th>
                      <th className="w-[70%] font-extralight text-lg border-slate-200 border-b border-r px-3 py-1 text-left">
                        Предмет
                      </th>
                      <th className="w-[15%] font-extralight text-lg border-slate-200 border-b group-last:border-b-0 px-3 py-1">
                        Каб
                      </th>
                    </tr>
                    {schedule.subjects.map((subject, i) => {
                      return (
                        <tr key={subject?.index ?? i} className="group">
                          <td className="w-[15%] text-lg text-center border-slate-200 border-b border-r group-last:border-b-0 px-3 py-1">
                            {subject?.index ?? ''}
                          </td>
                          <td className="w-[70%] border-slate-200 border-b border-r group-last:border-b-0 px-3 py-1">
                            {subject?.title ?? ''}
                          </td>
                          <td className="w-[15%] border-slate-200 text-center border-b group-last:border-b-0 px-3 py-1">
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
    </ScheduleContainer>
  );
}

function AnimatedCell() {
  return <div className="h-6 animate-pulse bg-gray-300 rounded-md"></div>;
}

function ScheduleSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {repeat(
        count,
        <div className="bg-white border border-slate-300 shadow-sm rounded-lg basis-full md:basis-80">
          <h2 className="text-xl font-medium mx-4 mt-3">
            <AnimatedCell />
          </h2>
          <div className="p-2">
            <table className="border-none w-full">
              <tbody>
                {repeat(
                  6,
                  <tr className="group">
                    <td className="w-[15%] border-slate-200 text-lg text-center border-b border-r group-last:border-b-0 p-2">
                      <AnimatedCell />
                    </td>
                    <td className="w-[70%] border-slate-200 border-b border-r group-last:border-b-0 p-2">
                      <AnimatedCell />
                    </td>
                    <td className="w-[15%] border-slate-200 text-center border-b group-last:border-b-0 p-2">
                      <AnimatedCell />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function ScheduleContainer({ children }: PropsWithChildren) {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </Container>
  );
}
