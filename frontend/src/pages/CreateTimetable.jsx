import Navbar from "../components/layout/Navbar";
import Wizard from "../components/wizard/Wizard";

function CreateTimetable() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">

      <Navbar />

      <div className="p-8">
        <Wizard />
      </div>

    </div>
  );
}

export default CreateTimetable;