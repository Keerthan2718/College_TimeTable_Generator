import { z } from "zod";

export const timeConfigurationSchema = z
  .object({
    workingDays: z.string().min(1, "Working days is required"),

    periodsPerDay: z.string().min(1, "Periods per day is required"),

    collegeStartTime: z
      .string()
      .min(1, "College start time is required"),

    collegeEndTime: z
      .string()
      .min(1, "College end time is required"),

    periodDuration: z
      .string()
      .min(1, "Period duration is required")
      .refine((value) => Number(value) > 0, {
        message: "Period duration must be greater than 0",
      }),

    lunchStart: z
      .string()
      .min(1, "Lunch start time is required"),

    lunchDuration: z
      .string()
      .min(1, "Lunch duration is required")
      .refine((value) => Number(value) > 0, {
        message: "Lunch duration must be greater than 0",
      }),
  })
  .refine(
    (data) => data.collegeStartTime < data.collegeEndTime,
    {
      message: "College start time must be before college end time",
      path: ["collegeEndTime"],
    }
  );