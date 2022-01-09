import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { validateEmail } from "Utils/converters";

const EmailInvitationDialog = ({
  open,
  title,
  message,
  handleClose,
  handleAction,
  btnDisable,
}) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setErrorMessage("Please input an email");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please input a valid email");
      return;
    }
    handleAction(email);
    setEmail("");
  };
  const handleFormChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          <TextField
            error={errorMessage.length !== 0}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={handleFormChange}
            fullWidth
            helperText={errorMessage}
            variant="standard"
            disabled={btnDisable}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={btnDisable}>
            Send Invitation
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmailInvitationDialog;
