import { Alert, Container, Grid, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Redirect } from "react-router";
import Header from "../../Components/Header";
import { getLocalUser } from "../../Utils/localStorageGetSet";
import { ProfileForm } from "./Form";
import "./index.scss";

export const ProfilePage = () => {
  const userProfile = getLocalUser();
  const [successMessage, setSuccessMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSuccessMessage = (message) => {
    if (message) {
      setMessage(message);
    } else {
      setMessage("Updated successfully.");
    }
    setSuccessMessage(true);
  };
  const handleFailedMessage = (message) => {
    if (message) {
      setMessage(message);
    } else {
      setMessage("Something went wrong. Please try again.");
    }
    setFailedMessage(true);
  };
  return (
    <div>
      <Header isAtMainPage={false} />
      <div className="profile-main">
        <Container>
          <Grid container spacing={2} xs={12} justifyContent="center">
            <Grid item xs={12} sm={10} md={6}>
              {userProfile ? (
                <ProfileForm
                  userProfile={userProfile}
                  showSuccessAlert={handleSuccessMessage}
                  showFailedAlert={handleFailedMessage}
                />
              ) : (
                <Redirect to="/login" />
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
      <Snackbar
        open={successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={failedMessage}
        autoHideDuration={4000}
        onClose={() => setFailedMessage(false)}
      >
        <Alert
          onClose={() => setFailedMessage(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
