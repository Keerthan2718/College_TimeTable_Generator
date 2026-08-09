import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">

      <div className="text-center max-w-2xl px-6">

        <h1 className="text-5xl font-bold mb-6">
          Timetable Generator
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Create optimized college timetables automatically
          using constraint-based scheduling.
        </p>

        <div className="flex justify-center gap-4">

          <Button onClick={() => navigate("/login")}>
            Sign In
          </Button>

          <Button onClick={() => navigate("/register")}>
            Sign Up
          </Button>

        </div>

      </div>

    </div>
  );
}

export default Home;