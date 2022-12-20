import { PropsWithChildren } from 'react';
import { ScheduleState } from '../schedule-reducer';
import { groupFilter, repeat } from '../utils';
import Container from './Container';
import styles from './Schedule.module.css';

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
            <div key={schedule.group} className={styles.schedule}>
              <h2 className="text-xl font-medium mx-4 mt-3 dark:text-neutral-300">
                {schedule.group}
              </h2>
              <div className="p-2">
                <table className="border-none w-full">
                  <tbody className="dark:text-neutral-400">
                    <tr>
                      <th className={styles.leftTD}>№</th>
                      <th className={styles.middleTD}>Предмет</th>
                      <th className={styles.rightTD}>Каб</th>
                    </tr>
                    {schedule.subjects.map((subject, i) => {
                      return (
                        <tr key={subject?.index ?? i} className="group">
                          <td
                            className={`${styles.leftTD} group-last:border-b-0`}
                          >
                            {subject?.index ?? ''}
                          </td>
                          <td
                            className={`${styles.middleTD} group-last:border-b-0`}
                          >
                            {subject?.title ?? ''}
                          </td>
                          <td
                            className={`${styles.rightTD} group-last:border-b-0`}
                          >
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
  return (
    <div className="h-6 animate-pulse bg-gray-300 rounded-md dark:bg-neutral-800 my-1"></div>
  );
}

function ScheduleSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {repeat(
        count,
        <div className={styles.schedule}>
          <h2 className="text-xl font-medium mx-4 mt-3">
            <AnimatedCell />
          </h2>
          <div className="p-2">
            <table className="border-none w-full">
              <tbody>
                {repeat(
                  6,
                  <tr className="group">
                    <td className={`${styles.leftTD} group-last:border-b-0`}>
                      <AnimatedCell />
                    </td>
                    <td className={`${styles.middleTD} group-last:border-b-0`}>
                      <AnimatedCell />
                    </td>
                    <td className={`${styles.rightTD} group-last:border-b-0`}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    </Container>
  );
}
