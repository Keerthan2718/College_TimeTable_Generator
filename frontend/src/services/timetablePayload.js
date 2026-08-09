export const createTimetablePayload = (wizardData) => {
  return {
    title: wizardData.generalInfo.title,
    department: wizardData.generalInfo.department,
    semester: Number(wizardData.generalInfo.semester),
    section: wizardData.generalInfo.section,
    academic_year: wizardData.generalInfo.academicYear,

    

    time_configuration: {
      working_days: Number(
        wizardData.timeConfiguration.workingDays
      ),

      periods_per_day: Number(
        wizardData.timeConfiguration.periodsPerDay
      ),

      college_start_time:
        wizardData.timeConfiguration.collegeStartTime,

      college_end_time:
        wizardData.timeConfiguration.collegeEndTime,

      period_duration: Number(
        wizardData.timeConfiguration.periodDuration
      ),

      lunch_start:
        wizardData.timeConfiguration.lunchStart,

      lunch_duration: Number(
        wizardData.timeConfiguration.lunchDuration
      ),
    },

    teaching_assignments: {
      theory_subjects:
        wizardData.teachingAssignments.theorySubjects,

      lab_subjects:
        wizardData.teachingAssignments.labSubjects,

      theory_weekly_periods:
        wizardData.teachingAssignments.theoryWeeklyPeriods,

      lab_weekly_periods:
        wizardData.teachingAssignments.labWeeklyPeriods,

      faculty_assignments:
        wizardData.teachingAssignments.facultyAssignments,
    },

    constraints: wizardData.constraints.map((constraint) => ({
  constraint_type: constraint.type,
  subject: constraint.subject,
  day: constraint.day,
  period: constraint.period,
})),
  };
};