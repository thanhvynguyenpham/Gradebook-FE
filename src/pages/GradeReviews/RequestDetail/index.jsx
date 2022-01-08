import { Container, Grid, Snackbar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../Components/Header";
import { getAuth } from "../../../Utils/httpHelpers";
import ListComments from "./Components/ListComments";
import RequestCard from "./Components/RequestCard";

function RequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    const loadRequest = () => {
      setIsLoading(true);
      getAuth(`/request/${id}`)
        .then((response) => {
          setRequest(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          showAlert(error.response.data.message);
        });
    };
    loadRequest();
  }, [id]);
  useEffect(() => {
    if (alertMessage && alertMessage.length !== 0) {
      setOpenAlertMessage(true);
    } else {
      setOpenAlertMessage(false);
    }
  }, [alertMessage]);

  const showAlert = (message) => {
    setAlertMessage(message);
  };
  return (
    <div>
      <Header isAtMainPage={false} />
      <Container sx={{ marginBlock: "20px" }}>
        <Grid container spacing={3}>
          <Grid container item spacing={3}>
            <Grid item xs={12} md={6}>
              <RequestCard
                showAlert={showAlert}
                id={id}
                isLoading={isLoading}
                request={request}
                setRequest={setRequest}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListComments
                showAlert={showAlert}
                status={request ? request.status : "close"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openAlertMessage}
        autoHideDuration={4000}
        onClose={() => setOpenAlertMessage(false)}
        message={alertMessage}
      />
    </div>
  );
}

export default RequestDetail;
