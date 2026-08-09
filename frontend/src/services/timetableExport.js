import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
} from "docx";

/*
  Convert timetable entries into a grid:

  Day | P1 | P2 | P3 | ...
*/
const createTimetableGrid = (timetable) => {
  const workingDays = timetable.working_days;
  const periodsPerDay = timetable.periods_per_day;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const entries = timetable.timetable_entries || [];

  const getEntry = (day, period) => {
    return entries.find(
      (entry) =>
        entry.day === day &&
        entry.period === period
    );
  };

  const headers = ["Day"];

  for (
    let period = 1;
    period <= periodsPerDay;
    period++
  ) {
    headers.push(`P${period}`);
  }

  const rows = [];

  for (
    let dayIndex = 0;
    dayIndex < workingDays;
    dayIndex++
  ) {
    const day = days[dayIndex];

    const row = [day];

    for (
      let period = 1;
      period <= periodsPerDay;
      period++
    ) {
      const entry = getEntry(day, period);

      row.push(entry?.subject || "--");
    }

    rows.push(row);
  }

  return {
    headers,
    rows,
  };
};


/* =====================================================
   WORD EXPORT
===================================================== */

export const exportTimetableToWord = async (timetable) => {
  const { headers, rows } =
    createTimetableGrid(timetable);

  /*
    Create timetable table rows
  */

  const tableRows = [
    // Header row
    new TableRow({
      children: headers.map(
        (header) =>
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: header,
                    bold: true,
                  }),
                ],
              }),
            ],
          })
      ),
    }),

    // Data rows
    ...rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: String(cell),
                      }),
                    ],
                  }),
                ],
              })
          ),
        })
    ),
  ];

  /*
    Create timetable table
  */

  const timetableTable = new Table({
    rows: tableRows,

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });


  /*
    Create constraints section
  */

  const constraints =
    timetable.constraints || [];

  const constraintParagraphs = [];

  if (constraints.length > 0) {
    constraintParagraphs.push(
      new Paragraph({
        spacing: {
          before: 300,
          after: 150,
        },

        children: [
          new TextRun({
            text: "Constraints",
            bold: true,
            size: 28,
          }),
        ],
      })
    );

    constraints.forEach((constraint) => {
      constraintParagraphs.push(
        new Paragraph({
          bullet: {
            level: 0,
          },

          children: [
            new TextRun({
              text:
                `${constraint.constraint_type || "-"} - ` +
                `${constraint.subject || "-"} cannot be scheduled on ` +
                `${constraint.day || "-"}, ` +
                `Period ${constraint.period || "-"}`,
            }),
          ],
        })
      );
    });
  }


  /*
    Create Word document
  */

  const wordDocument = new Document({
    sections: [
      {
        children: [

          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,

            spacing: {
              after: 300,
            },

            children: [
              new TextRun({
                text: "TIMETABLE",
                bold: true,
                size: 36,
              }),
            ],
          }),


          // General Information
          new Paragraph({
            children: [
              new TextRun({
                text: "Title: ",
                bold: true,
              }),

              new TextRun({
                text: timetable.title || "-",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Department: ",
                bold: true,
              }),

              new TextRun({
                text: timetable.department || "-",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Semester: ",
                bold: true,
              }),

              new TextRun({
                text: String(
                  timetable.semester || "-"
                ),
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Section: ",
                bold: true,
              }),

              new TextRun({
                text: timetable.section || "-",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Academic Year: ",
                bold: true,
              }),

              new TextRun({
                text:
                  timetable.academic_year || "-",
              }),
            ],
          }),


          // Space before timetable
          new Paragraph({
            spacing: {
              after: 300,
            },

            children: [],
          }),


          // Timetable
          timetableTable,


          // Constraints
          ...constraintParagraphs,
        ],
      },
    ],
  });


  /*
    Generate Word file
  */

  const blob =
    await Packer.toBlob(wordDocument);

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${timetable.title || "Timetable"}_Timetable.docx`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};


/* =====================================================
   PDF EXPORT
===================================================== */

export const exportTimetableToPDF = (timetable) => {
  const { headers, rows } =
    createTimetableGrid(timetable);


  /*
    Landscape A4
  */

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });


  /* -------------------------------
     Title
  -------------------------------- */

  doc.setFontSize(18);

  doc.text(
    "Timetable",
    148,
    15,
    {
      align: "center",
    }
  );


  /* -------------------------------
     General Information
  -------------------------------- */

  doc.setFontSize(10);

  doc.text(
    `Title: ${timetable.title || "-"}`,
    14,
    27
  );

  doc.text(
    `Department: ${
      timetable.department || "-"
    }`,
    14,
    34
  );

  doc.text(
    `Semester: ${
      timetable.semester || "-"
    }`,
    14,
    41
  );

  doc.text(
    `Section: ${
      timetable.section || "-"
    }`,
    100,
    27
  );

  doc.text(
    `Academic Year: ${
      timetable.academic_year || "-"
    }`,
    100,
    34
  );

  doc.text(
    `Working Days: ${
      timetable.working_days || "-"
    }`,
    100,
    41
  );


  /* -------------------------------
     Timetable Table
  -------------------------------- */

  autoTable(doc, {
    startY: 48,

    head: [headers],

    body: rows,

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 4,
      halign: "center",
      valign: "middle",
    },

    headStyles: {
      fontStyle: "bold",
      halign: "center",
    },

    columnStyles: {
      0: {
        halign: "left",
        fontStyle: "bold",
      },
    },
  });


  /* -------------------------------
     Constraints
  -------------------------------- */

  const constraints =
    timetable.constraints || [];

  if (constraints.length > 0) {

    const finalY =
      doc.lastAutoTable.finalY + 12;

    doc.setFontSize(13);

    doc.text(
      "Constraints",
      14,
      finalY
    );


    const constraintRows =
      constraints.map((constraint) => [
        constraint.constraint_type || "-",
        constraint.subject || "-",
        constraint.day || "-",
        constraint.period || "-",
      ]);


    autoTable(doc, {
      startY: finalY + 5,

      head: [
        [
          "Constraint Type",
          "Subject",
          "Day",
          "Period",
        ],
      ],

      body: constraintRows,

      theme: "grid",

      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    });
  }


  /* -------------------------------
     Download PDF
  -------------------------------- */

  const fileName =
    `${timetable.title || "Timetable"}_Timetable.pdf`;

  doc.save(fileName);
};