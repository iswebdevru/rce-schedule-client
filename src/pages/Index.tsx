import { ChangeEventHandler, useState } from 'react';
import { Schedule } from '../components/Schedule';
import { Settings } from '../components/Settings';
import { GROUP } from '../lib/storage';

export default function Index() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem(GROUP) ?? ''
  );

  const onSelectedGroupChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSelectedGroup(e.currentTarget.value);
    localStorage.setItem(GROUP, selectedGroup);
  };

  const onSelectedDayChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelectedDay(+e.currentTarget.value);
  };
  return (
    <>
      <Settings
        selectedGroup={selectedGroup}
        onSelectedGroupChange={onSelectedGroupChange}
        selectedDay={selectedDay}
        onSelectedDayChange={onSelectedDayChange}
      />
      <Schedule filters={{ group: selectedGroup, dayId: selectedDay }} />
    </>
  );
}
