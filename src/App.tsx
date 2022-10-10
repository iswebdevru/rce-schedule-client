import { ChangeEventHandler, useEffect, useReducer, useState } from 'react';
import { BetaBanner } from './components/BetaBanner';
import { PopUp } from './components/PopUp';
import { Schedule } from './components/Schedule';
import { Settings } from './components/Settings';
import { scheduleReducer } from './schedule-reducer';
import { ScheduleResponseSchema } from './schemas';
import { GROUP, SHOW_BETA_BANNER } from './storage';
import { DayWithChanges } from './types';

const RCE_API = 'https://api.rcebot.tk';

export function App() {
  const [schedule, dispatch] = useReducer(scheduleReducer, { type: 'loading' });
  const [days, setDays] = useState<DayWithChanges[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem(GROUP) || ''
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const prevBetaPopUpState = localStorage.getItem(SHOW_BETA_BANNER);
  const [showBetaPopUp, setShowBetaPopUp] = useState(
    prevBetaPopUpState === 'false' ? false : true
  );

  useEffect(() => {
    fetchDays();
  }, []);

  useEffect(() => {
    if (selectedDay !== null) {
      fetchSchedule();
    }
  }, [selectedDay]);

  useEffect(() => {
    if (localStorage.getItem(GROUP) !== selectedGroup) {
      localStorage.setItem(GROUP, selectedGroup);
    }
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem(SHOW_BETA_BANNER, showBetaPopUp.toString());
  }, [showBetaPopUp]);

  useEffect(() => {
    if (days.length) {
      const today = new Date();
      let todayIndex = -1;
      let freshestIndex: number = -1;

      for (let i = 0; i < days.length; i++) {
        if (
          days[i].day === today.getDate() &&
          days[i].month === today.getMonth() + 1 &&
          days[i].year === today.getFullYear()
        ) {
          todayIndex = i;
          break;
        }
        if (
          freshestIndex === -1 ||
          new Date(days[i].year, days[i].month - 1, days[i].day) >
            new Date(
              days[freshestIndex].year,
              days[freshestIndex].month - 1,
              days[freshestIndex].day
            )
        ) {
          freshestIndex = i;
        }
      }
      if (todayIndex !== -1) {
        setSelectedDay(todayIndex);
      } else {
        setSelectedDay(freshestIndex);
      }
    }
  }, [days]);

  const fetchDays = () => {
    fetch(`${RCE_API}/days-with-changes`)
      .then(response => response.json())
      .then(days => setDays(days));
  };

  const fetchSchedule = async () => {
    dispatch({ type: 'WAIT' });
    const { day, month, year } = days[selectedDay as number];
    const searchParams = new URLSearchParams({
      day: `${day}`,
      month: `${month}`,
      year: `${year}`,
    }).toString();
    const data = await (
      await fetch(`${RCE_API}/schedule?${searchParams}`)
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

  const onSelectedGroupChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSelectedGroup(e.currentTarget.value);
  };

  const onSelectedDayChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelectedDay(+e.currentTarget.value);
  };

  return (
    <div>
      <div className="px-4 max-w-screen-xl mx-auto flex flex-col gap-4">
        <Settings
          selectedGroup={selectedGroup}
          onSelectedGroupChange={onSelectedGroupChange}
          selectedDay={selectedDay}
          onSelectedDayChange={onSelectedDayChange}
          days={days}
        />
        <Schedule state={schedule} filters={{ group: selectedGroup }} />
      </div>
      <PopUp show={showBetaPopUp}>
        <BetaBanner closeHandler={() => setShowBetaPopUp(false)} />
      </PopUp>
    </div>
  );
}
