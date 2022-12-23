import { ComponentPropsWithoutRef, Fragment, useState } from 'react';
import Label from '../components/Label';
import Select, { Option } from '../components/Select';
import {
  bellsScheduleMap,
  bellsScheduleTypes,
  BellsScheduleTypes,
  weekdays,
  Weekdays,
} from '../lib/config';
import { getHoursAndMinutes } from '../lib/utils';

const tdStyles =
  'p-2 border-b border-r border-slate-200 last:border-r-0 group-last:border-b-0 dark:border-neutral-800';

export default function Bells() {
  const [selectedDay, setSelectedDay] = useState<Weekdays>(() => {
    const today = new Date().getDay();
    const i = today === 0 ? 0 : today - 1;
    return weekdays[i];
  });

  const [selectedType, setSelectedType] =
    useState<BellsScheduleTypes>('Обычный');

  const bellsSchedule = bellsScheduleMap[selectedType][selectedDay];

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex gap-6">
        <div className="flex-1">
          <Label className="mb-2">День</Label>
          <Select
            className="w-full"
            value={selectedDay}
            onChange={e => setSelectedDay(e.currentTarget.value as any)}
          >
            {weekdays.map(day => (
              <Option key={day} value={day} children={day} />
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <Label className="mb-2">График</Label>
          <Select
            className="w-full"
            value={selectedType}
            onChange={e => setSelectedType(e.currentTarget.value as any)}
          >
            {bellsScheduleTypes.map(kind => (
              <Option key={kind} value={kind} children={kind} />
            ))}
          </Select>
        </div>
      </div>
      <div className="border border-slate-200 rounded-md p-2 dark:border-neutral-800">
        <table className="w-full">
          <tbody>
            <tr className="group">
              <BellsTh>№</BellsTh>
              <BellsTh>Время</BellsTh>
            </tr>
            {bellsSchedule.map((lesson, i, arr) => {
              if (lesson === null) {
                return null;
              }
              if (lesson.hasBreak) {
                const firstHalfStart = getHoursAndMinutes(lesson.firstHalf[0]);
                const firstHalfEnd = getHoursAndMinutes(lesson.firstHalf[1]);
                const lastHalfStart = getHoursAndMinutes(lesson.lastHalf[0]);
                const lastHalfEnd = getHoursAndMinutes(lesson.lastHalf[1]);
                return (
                  <Fragment key={i}>
                    <tr className="group">
                      <BellsTd
                        rowSpan={2}
                        className={i === arr.length - 1 ? 'border-b-0' : ''}
                      >
                        {i} пара
                      </BellsTd>
                      <BellsTd>
                        {firstHalfStart.hours}:{firstHalfStart.minutes}-
                        {firstHalfEnd.hours}:{firstHalfEnd.minutes}
                      </BellsTd>
                    </tr>
                    <tr className="group">
                      <BellsTd>
                        {lastHalfStart.hours}:{lastHalfStart.minutes}-
                        {lastHalfEnd.hours}:{lastHalfEnd.minutes}
                      </BellsTd>
                    </tr>
                  </Fragment>
                );
              }
              const start = getHoursAndMinutes(lesson.period[0]);
              const end = getHoursAndMinutes(lesson.period[1]);
              return (
                <tr className="group" key={i}>
                  <BellsTd>{i} пара</BellsTd>
                  <BellsTd>
                    {start.hours}:{start.minutes}-{end.hours}:{end.minutes}
                  </BellsTd>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BellsTd({ className, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      {...props}
      className={`${tdStyles} dark:text-neutral-300 ${className ?? ''}`}
    />
  );
}

function BellsTh({ className, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <th
      {...props}
      className={`${tdStyles} pt-0 text-left dark:text-neutral-200 ${
        className ?? ''
      }`}
    />
  );
}
