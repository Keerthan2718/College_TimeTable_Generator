import { z } from "zod";

export const teachingAssignmentSchema = z
  .object({
    theorySubjects: z
      .array(z.string())
      .min(1, "Add at least one theory subject"),

    labSubjects: z.array(z.string()),

    theoryWeeklyPeriods: z.record(z.string()),

    labWeeklyPeriods: z.record(z.string()),

    facultyAssignments: z.record(z.string()),
  })

  .superRefine((data, ctx) => {

    // Theory Subjects

    data.theorySubjects.forEach((subject) => {

      const periods = data.theoryWeeklyPeriods[subject];

      if (!periods || Number(periods) <= 0) {

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Weekly periods required for ${subject}`,
          path: ["theoryWeeklyPeriods", subject],
        });

      }

      const faculty = data.facultyAssignments[subject];

      if (!faculty || faculty.trim() === "") {

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Faculty required for ${subject}`,
          path: ["facultyAssignments", subject],
        });

      }

    });

    // Lab Subjects

    data.labSubjects.forEach((subject) => {

      const periods = data.labWeeklyPeriods[subject];

      if (!periods || Number(periods) <= 0) {

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Weekly periods required for ${subject}`,
          path: ["labWeeklyPeriods", subject],
        });

      }

      const faculty = data.facultyAssignments[subject];

      if (!faculty || faculty.trim() === "") {

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Faculty required for ${subject}`,
          path: ["facultyAssignments", subject],
        });

      }

    });

  });