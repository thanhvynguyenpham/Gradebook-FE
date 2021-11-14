import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Header from "../../Components/Header";
import { getAuth } from "../../Utils/httpHelpers";
import { getLocalUser } from "../../Utils/localStorageGetSet";
import "../Home/Main/index.scss";
import DashBoard from "./Dashboard";
import Members from "./Members";

const ClassPage = () => {
  const [value, setValue] = React.useState(0);
  const [classDetails, setClassDetails] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
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
    const getMemberList = () => {
      getAuth(`/class/${id}/list-member`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setStudentsList(response.data.students);
            setTeachersList(response.data.teachers);
          }
        })
        .catch((error) => {
          history.push("/login");
        });
    };
    console.log(id);
    getClassDetails();
    getMemberList();
  }, [id, history]);

  return (
    <div>
      <Header isAtMainPage={false} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Dashboard" key="tab-1" />
          <Tab label="Members" key="tab-2" />
        </Tabs>
      </Box>
      <DashBoard
        hidden={value !== 0}
        classDetails={classDetails}
        user={user}
        listPosts={exampleListPost}
      />
      <Members
        hidden={value !== 1}
        teachersList={teachersList}
        studentsList={studentsList}
      />
    </div>
  );
};
export default ClassPage;
