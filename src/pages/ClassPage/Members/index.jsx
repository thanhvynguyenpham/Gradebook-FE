import { PersonAddAlt } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { nameToAvatar } from "../../../Utils/converters";
import { postAuth } from "../../../Utils/httpHelpers";
import EmailInvitationDialog from "./Components/EmailInvitationDialog";

const Members = ({ classDetails, hidden, teachersList, studentsList }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [role, setRole] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSendEmail = (email) => {
    setDisableButton(true);
    const body = {
      email: email,
      role: role,
    };
    postAuth(`/class/${classDetails._id}/send-invite-email`, body)
      .then((response) => {
        setAlertMessage("Send email successfully");
        setOpenAlertMessage(true);
        setOpenDialog(false);
        setDisableButton(false);
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          setAlertMessage(error.response.data.message);
        } else {
          setAlertMessage("Cannot send email. Please try again!");
        }
        setOpenAlertMessage(true);
        setDisableButton(false);
      });
  };
  const handleShowTeacherEmailDialog = () => {
    setTitle("Invite Teacher");
    setMessage(
      "We will send this email an invitation link. Please inform the email's owner to check their email and confirm in 48 hours."
    );
    setRole("teacher");
    setOpenDialog(true);
  };
  const handleShowStudentEmailDialog = () => {
    setTitle("Invite Student");
    setMessage(
      "We will send this email an invitation link. Please inform the email's owner to check their email and confirm in 48 hours."
    );
    setOpenDialog(true);
    setRole("student");
  };
  return (
    <div hidden={hidden}>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={7}>
            <Stack spacing={1} width={"100%"}>
              <Grid
                container
                sx={{ mt: 4, mb: 2 }}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h6" component="div">
                    Teachers
                  </Typography>
                </Grid>
                {classDetails.role !== "student" && (
                  <Grid item>
                    <IconButton
                      size="small"
                      aria-label="Account"
                      color="inherit"
                      onClick={handleShowTeacherEmailDialog}
                    >
                      <PersonAddAlt />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
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
              <Grid
                container
                sx={{ mt: 4, mb: 2 }}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h6" component="div">
                    Students
                  </Typography>
                </Grid>
                {classDetails.role !== "student" && (
                  <Grid item>
                    <IconButton
                      size="small"
                      aria-label="Account"
                      color="inherit"
                      onClick={handleShowStudentEmailDialog}
                    >
                      <PersonAddAlt />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
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
                    {classDetails.role !== "student" && value.studentId && (
                      <Chip label={value.studentId} color="primary" />
                    )}
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <EmailInvitationDialog
        open={openDialog}
        title={title}
        message={message}
        handleClose={() => setOpenDialog(false)}
        handleAction={handleSendEmail}
        btnDisable={disableButton}
      />
      <Snackbar
        open={openAlertMessage}
        autoHideDuration={4000}
        onClose={() => setOpenAlertMessage(false)}
        message={alertMessage}
      />
    </div>
  );
};
export default Members;
