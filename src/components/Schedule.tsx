import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { ScheduleState } from '../schedule-reducer';
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
            <ScheduleWrapper key={schedule.group}>
              <h2 className="text-xl font-medium mx-4 mt-3 dark:text-neutral-300">
                {schedule.group}
              </h2>
              <div className="p-2">
                <table className="border-none w-full">
                  <tbody className="dark:text-neutral-400">
                    <tr>
                      <ScheduleSideCell>№</ScheduleSideCell>
                      <ScheduleMiddleCell>Предмет</ScheduleMiddleCell>
                      <ScheduleSideCell>Каб</ScheduleSideCell>
                    </tr>
                    {schedule.subjects.map((subject, i) => {
                      return (
                        <tr key={subject?.index ?? i} className="group">
                          <ScheduleSideCell>
                            {subject?.index ?? ''}
                          </ScheduleSideCell>
                          <ScheduleMiddleCell>
                            {subject?.title ?? ''}
                          </ScheduleMiddleCell>
                          <ScheduleSideCell>
                            {subject?.cabinet ?? ''}
                          </ScheduleSideCell>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </ScheduleWrapper>
          );
        })}
    </ScheduleContainer>
  );
}

function AnimatedCell() {
  return (
    <div className="h-6 animate-pulse bg-gray-300 rounded-md dark:bg-neutral-800 my-1"></div>
  );
}

function ScheduleSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {repeat(
        count,
        <ScheduleWrapper>
          <h2 className="text-xl font-medium mx-4 mt-3">
            <AnimatedCell />
          </h2>
          <div className="p-2">
            <table className="border-none w-full">
              <tbody>
                {repeat(
                  6,
                  <tr className="group">
                    <ScheduleSideCell>
                      <AnimatedCell />
                    </ScheduleSideCell>
                    <ScheduleMiddleCell>
                      <AnimatedCell />
                    </ScheduleMiddleCell>
                    <ScheduleSideCell>
                      <AnimatedCell />
                    </ScheduleSideCell>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScheduleWrapper>
      )}
    </>
  );
}

function ScheduleWrapper({ children }: PropsWithChildren) {
  return (
    <div className="border border-slate-200 shadow-sm rounded-lg basis-full md:basis-80 dark:border-neutral-800">
      {children}
    </div>
  );
}

function ScheduleSideCell({ children }: PropsWithChildren) {
  return (
    <ScheduleCell className="w-[15%] text-center">{children}</ScheduleCell>
  );
}
function ScheduleMiddleCell({ children }: PropsWithChildren) {
  return <ScheduleCell className="w-[70%] text-left">{children}</ScheduleCell>;
}

function ScheduleCell(props: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      {...props}
      className={`font-extralight border-slate-200 border-b border-r px-3 py-1 dark:border-neutral-800 last:border-r-0 group-last:border-b-0 ${props.className}`}
    />
  );
}

function ScheduleContainer({ children }: PropsWithChildren) {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    </Container>
  );
}
