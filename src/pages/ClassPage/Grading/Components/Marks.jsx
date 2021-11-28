import { Button, Grid, Input } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import XLSX from "xlsx";

const Marks = ({ hidden }) => {
  const [students, setStudents] = useState([]);
  const [cols, setCols] = useState([]);

  const handleFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setCols(data[0]);
      setStudents(data.slice(1));
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  return (
    <Grid item xs={12} sm={10} hidden={hidden}>
      <Grid container item xs={12} justifyContent="flex-end">
        <Grid item xs={4}>
          <Link
            to="/assets/templates/student-list-template.xlsx"
            target="_blank"
            download
          >
            <Button size="small" variant="contained">
              Student Template
            </Button>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link
            to="/assets/templates/point-template.xlsx"
            target="_blank"
            download
          >
            <Button size="small" variant="outlined">
              Point Template
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Input type="file" onChange={handleFile} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Marks;
