import useSWR from 'swr';
import { z } from 'zod';
import { fetcher } from './utils';
import { useMemo } from 'react';

export const apiBase = 'https://api.rcenext.ru';

export const GetScheduleResponseSchema = z.object({
  error: z.any(),
  data: z
    .object({
      group: z.string(),
      subjects: z
        .object({
          index: z.number(),
          title: z.string(),
          cabinet: z.string(),
        })
        .nullable()
        .array(),
    })
    .array(),
});

export const DayWithChangesSchema = z.object({
  day: z.number(),
  month: z.number(),
  year: z.number(),
  version: z.number(),
});

export const GetDaysWithChangesSchema = DayWithChangesSchema.array();

export type DayWithChanges = z.infer<typeof DayWithChangesSchema>;

export function useSchedule(day?: DayWithChanges) {
  const search = useMemo(() => {
    return (
      day &&
      new URLSearchParams({
        day: day.day.toString(),
        month: day.month.toString(),
        year: day.year.toString(),
      })
    );
  }, [day?.day, day?.month, day?.year]);

  return useSWR([`${apiBase}/schedule`, search], ([base, search]) =>
    fetcher(`${base}${search ? `?${search}` : ''}`).then(data =>
      GetScheduleResponseSchema.parse(data)
    )
  );
}

export function useDaysWithChanges() {
  return useSWR(`${apiBase}/days-with-changes`, url =>
    fetcher(url).then(data => GetDaysWithChangesSchema.parse(data))
  );
}
