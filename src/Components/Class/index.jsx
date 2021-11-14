import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./class.scss";
import { Link } from "react-router-dom";

export default function Class(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://www.gstatic.com/classroom/themes/img_bookclub.jpg"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-overflow"
        >
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.owner}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/class/${props.id}`}>
          <Button size="small">Enter Class</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
