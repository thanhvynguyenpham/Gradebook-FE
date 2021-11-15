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
import { getAuth } from "../../Utils/httpHelpers";
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
  }, []);
  function handleJoinClass() {
    const code = query.get("cjc");
    getAuth(`/class/${id}/key/${code}`)
      .then((response) => {
        history.replace(`/class/${id}`);
      })
      .catch((error) => {
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
                          src="/assets/img/logo_white.png"
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
                        Class name
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                      >
                        You are invited to this class as a student
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={handleJoinClass}
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
          Something went wrong. Please try again.
        </Alert>
      </Snackbar>
    </div>
  );
};
