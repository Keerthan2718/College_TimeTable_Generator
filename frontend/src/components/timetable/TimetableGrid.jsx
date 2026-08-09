function TimetableGrid({
  workingDays,
  periodsPerDay,
  collegeStartTime,
  periodDuration,
  lunchStart,
  lunchDuration,
  entries = [],
}) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getEntry = (day, period) => {
    return entries.find(
      (entry) =>
        entry.day === day &&
        entry.period === period
    );
  };

  return (
    <table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100">

      <thead className="bg-gray-100 dark:bg-gray-700">

        <tr className="bg-gray-100 dark:bg-gray-700">

          <th className="border border-gray-300 dark:border-gray-600 p-3">
            Day
          </th>

          {Array.from(
            { length: periodsPerDay },
            (_, i) => (
              <th
                key={i}
                className="border border-gray-300 dark:border-gray-600 p-3"
              >
                P{i + 1}
              </th>
            )
          )}

        </tr>

      </thead>

      <tbody>

        {Array.from(
          { length: workingDays },
          (_, dayIndex) => (

            <tr key={dayIndex}>

              <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium">
                {days[dayIndex]}
              </td>

              {Array.from(
                { length: periodsPerDay },
                (_, periodIndex) => (

                  <td
                    key={periodIndex}
                    className="border border-gray-300 dark:border-gray-600 p-3 text-center"
                  >
                    {getEntry(
                      days[dayIndex],
                      periodIndex + 1
                    )?.subject || "--"}
                  </td>

                )
              )}

            </tr>

          )
        )}

      </tbody>

    </table>
  );
}

export default TimetableGrid;