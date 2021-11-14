import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { nameToAvatar } from "../../../Utils/converters";

const Members = ({ hidden, teachersList, studentsList }) => {
  return (
    <div hidden={hidden}>
      <Container>
        <Grid container spacing={2} xs={12} justifyContent="center">
          <Grid item xs={12} sm={8} md={7}>
            <Stack spacing={1} width={"100%"}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Teachers
              </Typography>
              <Divider />
              <List dense={true}>
                {teachersList.map((value, key) => (
                  <ListItem key={key}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        {nameToAvatar(value.user.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={value.user.name} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} md={7}>
            <Stack spacing={1} width={"100%"}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Students
              </Typography>
              <Divider />
              <List dense={true}>
                {studentsList.map((value, key) => (
                  <ListItem key={key}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        {nameToAvatar(value.user.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={value.user.name} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Members;
