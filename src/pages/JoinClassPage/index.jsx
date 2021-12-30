import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import { getAuth, postAuth } from "../../Utils/httpHelpers";
import "./index.scss";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export const JoinClassPage = () => {
  const { id } = useParams();
  let query = useQuery();
  const history = useHistory();
  const [failedMessage, setFailedMessage] = useState(false);
  const [disable, setDisable] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Something went wrong. Please try again."
  );
  const code = query.get("cjc");
  const token = query.get("token");
  const role = query.get("role");
  useEffect(() => {
    const checkAlreadyInClass = () => {
      getAuth(`/class/${id}`)
        .then((response) => {
          history.push(`/class/${id}`);
        })
        .catch((error) => {
          console.log("Not a member, continue.");
        });
    };
    checkAlreadyInClass();
    if (!code && !token) {
      history.push("/404");
    }
  }, [code, history, id, token]);
  function handleJoinClass() {
    setDisable(true);
    if (code) {
      joinClassByCode();
    } else if (token && role) {
      joinClassByToken();
    } else {
      setAlertMessage("This invitation link is invalid.");
      setFailedMessage(true);
    }
  }

  function joinClassByCode() {
    getAuth(`/class/${id}/key/${code}`)
      .then((response) => {
        history.replace(`/class/${id}`);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            setAlertMessage("This invitation link is expired or invalid.");
            break;
          case 402:
            setAlertMessage(
              "This class has been disable. Please contact the owner or admin for more information."
            );
          default:
            setAlertMessage("Something went wrong. Please try again later.");
            break;
        }
        setDisable(false);
        setFailedMessage(true);
      });
  }

  function joinClassByToken() {
    const body = {
      token: token,
    };
    console.log(body);
    postAuth(`/class/${id}/confirm-invite-email`, body)
      .then((response) => {
        history.replace(`/class/${id}`);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            setAlertMessage("This invitation link is expired or invalid.");
            break;
          case 402:
            setAlertMessage(
              "This class has been disable. Please contact the owner or admin for more information."
            );
          case 403:
            setAlertMessage(
              "You are using the wrong email to sign up for this class."
            );
          default:
            setAlertMessage("Something went wrong. Please try again later.");
            break;
        }
        setDisable(false);
        setFailedMessage(true);
      });
  }
  return (
    <div>
      <Header isAtMainPage={false} />
      <div className="join-main">
        <Container>
          <Grid container spacing={2} xs={12} justifyContent="center">
            <Grid item xs={12} sm={10} md={6}>
              <Grid item xs={12}>
                <Card>
                  <CardActionArea>
                    <div style={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image="https://gstatic.com/classroom/themes/img_breakfast.jpg"
                        alt="green iguana"
                      />
                      <Link to="/">
                        <img
                          src="/assets/img/gradebook_bg.png"
                          width="150px"
                          height="150px"
                          alt="logo"
                          className="logo"
                        ></img>
                      </Link>
                    </div>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                      >
                        Join a new class
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                      >
                        You are invited to this class as a{" "}
                        {role ? role : "student"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={handleJoinClass}
                      disabled={disable}
                    >
                      Join Class
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
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
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
