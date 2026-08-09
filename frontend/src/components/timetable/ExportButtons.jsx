import Button from "../common/Button";

import {
  exportTimetableToWord,
  exportTimetableToPDF,
} from "../../services/timetableExport";

function ExportButtons({ timetable }) {
  const handleExportPDF = () => {
    exportTimetableToPDF(timetable);
  };

  const handleExportWord = async () => {
    await exportTimetableToWord(timetable);
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="secondary"
        onClick={handleExportPDF}
      >
        Export PDF
      </Button>

      <Button
        variant="secondary"
        onClick={handleExportWord}
      >
        Export Word
      </Button>
    </div>
  );
}

export default ExportButtons;