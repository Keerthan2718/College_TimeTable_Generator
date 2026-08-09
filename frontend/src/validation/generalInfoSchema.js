import { z } from "zod";

export const generalInfoSchema = z.object({
  title: z
    .string()
    .min(1, "Timetable title is required"),

  department: z
    .string()
    .min(1, "Department is required"),

  semester: z
    .string()
    .min(1, "Semester is required")
    .refine(
      (value) => {
        const semester = Number(value);
        return semester >= 1 && semester <= 8;
      },
      {
        message: "Semester must be between 1 and 8",
      }
    ),

  academicYear: z
    .string()
    .min(1, "Academic year is required"),
section: z
  .string()
  .min(1, "Section is required"),
});