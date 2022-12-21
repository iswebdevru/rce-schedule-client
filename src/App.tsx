import { ChangeEventHandler, useEffect, useState } from 'react';
import { BetaBanner } from './components/BetaBanner';
import { Header } from './components/Header';
import { PopUp } from './components/PopUp';
import { Schedule } from './components/Schedule';
import { Settings } from './components/Settings';
import { GROUP, SHOW_BETA_BANNER } from './lib/storage';

export function App() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem(GROUP) || ''
  );
  const prevBetaPopUpState = localStorage.getItem(SHOW_BETA_BANNER);
  const [showBetaPopUp, setShowBetaPopUp] = useState(
    prevBetaPopUpState === 'false' ? false : true
  );

  useEffect(() => {
    if (localStorage.getItem(GROUP) !== selectedGroup) {
      localStorage.setItem(GROUP, selectedGroup);
    }
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem(SHOW_BETA_BANNER, showBetaPopUp.toString());
  }, [showBetaPopUp]);

  const onSelectedGroupChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSelectedGroup(e.currentTarget.value);
  };

  const onSelectedDayChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelectedDay(+e.currentTarget.value);
  };

  return (
    <>
      <Header />
      <Settings
        selectedGroup={selectedGroup}
        onSelectedGroupChange={onSelectedGroupChange}
        selectedDay={selectedDay}
        onSelectedDayChange={onSelectedDayChange}
      />
      <Schedule filters={{ group: selectedGroup, dayId: selectedDay }} />
      <PopUp show={showBetaPopUp}>
        <BetaBanner closeHandler={() => setShowBetaPopUp(false)} />
      </PopUp>
    </>
  );
}
