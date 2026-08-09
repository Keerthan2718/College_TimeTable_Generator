import Card from "../components/common/Card";
import Button from "../components/common/Button";
import TimetableGrid from "../components/timetable/TimetableGrid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getTimetableDetails } from "../services/timetableService";
import ExportButtons from "../components/timetable/ExportButtons";


function GeneratedTimetable() {

    const [searchParams] = useSearchParams();

    const timetableId = searchParams.get("id");

    const [timetable, setTimetable] = useState(null);

    useEffect(() => {

        async function loadTimetable() {

            try {

                const data =
                    await getTimetableDetails(
                        timetableId
                    );

                setTimetable(data);

            } catch (error) {

                console.error(error);

            }

        }

        if (timetableId) {

            loadTimetable();

        }

    }, [timetableId]);

    if (!timetable) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold mb-6">

                Generated Timetable

            </h1>
             <ExportButtons timetable={timetable} />
             </div>
            <TimetableGrid
              workingDays={timetable.working_days}
              periodsPerDay={timetable.periods_per_day}
              collegeStartTime={timetable.college_start_time}
              periodDuration={timetable.period_duration}
              lunchStart={timetable.lunch_start}
              lunchDuration={timetable.lunch_duration}
              entries={timetable.timetable_entries}
            />

        </div>

    );

}

export default GeneratedTimetable;