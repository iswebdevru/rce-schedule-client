import { Reducer } from 'react';
import { z } from 'zod';
import { ScheduleResponseSchema, ScheduleSchema } from './schemas';

export type ScheduleState =
  | ScheduleStateLoading
  | ScheduleStateError
  | ScheduleStateSuccess;
export type ScheduleStateLoading = {
  type: 'loading';
};
export type ScheduleStateError = {
  type: 'error';
  reason: string;
};
export type ScheduleStateSuccess = {
  type: 'success';
  data: z.infer<typeof ScheduleSchema>[];
};
export type ScheduleReducerAction = {
  type: 'ADD' | 'WAIT' | 'THROW';
  payload?: any;
};

export const scheduleReducer: Reducer<ScheduleState, ScheduleReducerAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'ADD':
      return {
        type: 'success',
        data: action.payload,
      };
    case 'WAIT':
      return {
        type: 'loading',
      };
    case 'THROW':
      return {
        type: 'error',
        reason: action.payload,
      };
    default:
      return prevState;
  }
};
