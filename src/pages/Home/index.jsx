import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateClassForm from "../../Components/Form/CreateClassForm";

import Header from "../../Components/Header";
import { getAuth } from "../../Utils/httpHelpers";
import Main from "./Main";

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [classList, setClassList] = useState([]);
  const [openLoadingScreen, setOpenLoadingScreen] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  useEffect(() => {
    getClassList();
  }, []);

  // useEffect(() => {
  //   if (showCreateForm === false) {
  //     getClassList();
  //   }
  // }, [showCreateForm]);

  function handleCreateClass() {
    setShowCreateForm(true);
  }

  function onCreateSuccess() {
    setCreateSuccess(true);
    setOpenSnackBar(true);
  }

  function onCreateFailed() {
    setCreateSuccess(false);
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
      <Header onCreateClass={handleCreateClass} isAtMainPage={true} />
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
          severity={createSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {createSuccess
            ? "Created class successfully"
            : "Cannot create class, please try again."}
        </Alert>
      </Snackbar>
    </div>
  );
}
