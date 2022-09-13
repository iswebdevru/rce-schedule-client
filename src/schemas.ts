import { z } from 'zod';

function createErrorProneSchema<S, E>(
  success: z.ZodType<S>,
  error: z.ZodType<E>
) {
  return z
    .object({
      error: z.null(),
      data: success,
    })
    .or(
      z.object({
        error: z.string(),
        message: error,
      })
    );
}

export const SubjectSchema = z.object({
  index: z.number(),
  title: z.string(),
  cabinet: z.string(),
});

export const ScheduleSchema = z.object({
  group: z.string(),
  subjects: SubjectSchema.array(),
});

export const ScheduleResponseSchema = createErrorProneSchema(
  ScheduleSchema.array(),
  z.string()
);
