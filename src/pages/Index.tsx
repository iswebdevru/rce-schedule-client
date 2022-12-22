import { ChangeEventHandler, useState } from 'react';
import { Schedule } from '../components/Schedule';
import { Settings } from '../components/Settings';
import { groupSearch } from '../lib/config';

export default function Index() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem(groupSearch) ?? ''
  );

  const onSelectedGroupChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSelectedGroup(e.currentTarget.value);
    localStorage.setItem(groupSearch, selectedGroup);
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
