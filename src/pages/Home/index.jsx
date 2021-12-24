import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateClassForm from "../../Components/Form/CreateClassForm";
import JoinClassForm from "../../Components/Form/JoinClassForm";

import Header from "../../Components/Header";
import { getAuth } from "../../Utils/httpHelpers";
import Main from "./Main";

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [classList, setClassList] = useState([]);
  const [openLoadingScreen, setOpenLoadingScreen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  useEffect(() => {
    getClassList();
  }, []);

  function handleCreateClass() {
    setShowCreateForm(true);
  }

  function handleJoinClass() {
    setShowJoinForm(true);
  }

  function onCreateSuccess() {
    setSuccess(true);
    setMessage("Created class successfully");
    setOpenSnackBar(true);
  }

  function onCreateFailed() {
    setSuccess(false);
    setMessage("Cannot create class, please try again.");
    setOpenSnackBar(true);
  }

  function onJoinFailed(message) {
    setSuccess(false);
    setMessage(message);
    setOpenSnackBar(true);
  }

  async function getClassList() {
    setOpenLoadingScreen(true);
    getAuth("/classes")
      .then((response) => {
        if (response.status === 200) {
          var arr = [...response.data];
          setClassList(arr);
        }
        setOpenLoadingScreen(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenLoadingScreen(false);
      });
  }

  return (
    <div>
      <CreateClassForm
        isShow={showCreateForm}
        reloadFucntion={getClassList}
        handleClose={() => setShowCreateForm(false)}
        onCreateSuccess={onCreateSuccess}
        onCreateFailed={onCreateFailed}
      />
      <JoinClassForm
        isShow={showJoinForm}
        handleClose={() => setShowJoinForm(false)}
        onJoinFailed={onJoinFailed}
      />
      <Header
        onCreateClass={handleCreateClass}
        onJoinClass={handleJoinClass}
        isAtMainPage={true}
      />
      <Main classList={classList} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoadingScreen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
