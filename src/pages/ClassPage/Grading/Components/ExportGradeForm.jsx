import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import React from "react";

const ExportGradeForm = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const formatData = () => {
    let result = [];
    csvData.forEach((data) => {
      let item = {
        StudentID: data.studentId,
      };
      data.grades.forEach((grade) => {
        item[grade.name] = grade.point;
      });
      item.total = data.total;
      result.push(item);
    });
    console.log(result);
    return result;
  };

  const exportToCSV = () => {
    const formattedData = formatData();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Button
      size="small"
      variant="contained"
      startIcon={<Download />}
      onClick={exportToCSV}
    >
      Export
    </Button>
  );
};

export default ExportGradeForm;
