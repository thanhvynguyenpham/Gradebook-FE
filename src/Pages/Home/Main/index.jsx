import { Grid } from "@mui/material";
import React from "react";
import Class from "../../../Components/Class";
import "./index.scss";

export default function Main(props) {
  return (
    <div className="main">
      <Grid container>
        {Array.from(props.classList).map((value, key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Class
              name={value.name}
              owner={value.owner}
              description={value.description}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
