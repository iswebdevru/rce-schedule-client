import { create } from 'zustand';
import { groupSearchStorageKey } from './config';

export type ScheduleStore = {
  day: number;
  setDay: (day: number) => void;
  group: string;
  setGroup: (group: string) => void;
};

export const useScheduleStore = create<ScheduleStore>(set => ({
  day: 0,
  setDay: day => set({ day }),
  group: localStorage.getItem(groupSearchStorageKey) ?? '',
  setGroup: group => {
    localStorage.setItem(groupSearchStorageKey, group);
    set({ group });
  },
}));
