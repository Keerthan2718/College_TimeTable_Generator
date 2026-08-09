import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { getAllTimetables } from "../services/timetableService";
import {
  
  deleteTimetable,
} from "../services/timetableService";





function Dashboard() {


  

  const navigate = useNavigate();
  useEffect(() => {
  fetchTimetables();
}, []);

const fetchTimetables = async () => {
  try {
    const data = await getAllTimetables();
    setPreviousTimetables(data);
  } catch (error) {
    console.error(error);
  }
};
const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this timetable?"
  );

  if (!confirmed) return;

  

  try {
    await deleteTimetable(id);

    fetchTimetables();
  } catch (error) {
    setMessage({
        type: "error",
        text: "Unable to delete timetable."
    });
  }
};

 const [previousTimetables, setPreviousTimetables] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">

      

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar/>

        <h1 className="text-5xl font-bold text-center mb-10">
          Timetable Generator
        </h1>

        <div className="flex justify-center gap-6 mb-12">

          <Button onClick={() => navigate("/create")}>
            Create Timetable
          </Button>



        </div>

        <Card>

          <h2 className="text-2xl font-semibold mb-6">
            Previous Timetables
          </h2>

          <div className="divide-y">

            {previousTimetables.map((item) => (

              <div
                key={item.timetable_id}
                onClick={() => navigate(`/view?id=${item.timetable_id}`)}
                className="
                      flex
                      justify-between
                      items-center
                      py-4
                      hover:bg-gray-50
                      dark:hover:bg-gray-800
                      cursor-pointer
                      px-2
                      rounded
                      "
                >
                <div>

                  <p className="font-medium">
                    Semester {item.semester}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400">
                    {item.department} | Section {item.section}
                  </p>

                </div>

                <div className="flex gap-2">

  <Button
    size="sm"
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/view?id=${item.timetable_id}`);
    }}
  >
    View
  </Button>

 <Button
  variant="danger"
  size="sm"
  onClick={(e) => {
    e.stopPropagation();
    handleDelete(item.timetable_id);
  }}
>
  Delete
</Button>

</div>

              </div>

            ))}

          </div>

        </Card>

      </div>

    </div>
  );
}

export default Dashboard;