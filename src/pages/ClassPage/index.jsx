import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Header from "../../Components/Header";
import { getAuth } from "../../Utils/httpHelpers";
import { getLocalUser } from "../../Utils/localStorageGetSet";
import "../Home/Main/index.scss";
import DashBoard from "./Dashboard";

const ClassPage = () => {
  const [value, setValue] = React.useState(0);
  const [classDetails, setClassDetails] = useState([]);
  const { id } = useParams();
  const user = getLocalUser();
  const history = useHistory();

  const exampleListPost = [
    {
      name: "Vy Nguyen",
      firstName: "Vy",
      lastName: "Nguyen",
      postDate: "26/10/2021",
      postContent: "Hello everyone, nice to meet you all",
    },
    {
      name: "Linh Nguyen",
      firstName: "Linh",
      lastName: "Nguyen",
      postDate: "25/10/2021",
      postContent: "Welcome to our class!",
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getClassDetails = () => {
      console.log("entered");
      getAuth(`/class/${id}/`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setClassDetails(response.data);
          }
        })
        .catch((error) => {
          history.push("/login");
        });
    };
    console.log(id);
    getClassDetails();
  }, [id, history]);

  return (
    <div>
      <Header />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Dashboard" />
          <Tab label="Members" />
        </Tabs>
      </Box>
      <DashBoard
        classDetails={classDetails}
        user={user}
        listPosts={exampleListPost}
      />
    </div>
  );
};
export default ClassPage;
