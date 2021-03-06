import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import AlertDialog from "Components/Alert/AlertDialog";
import Header from "Components/Header";
import { addID } from "Utils/converters";
import { getAuth } from "Utils/httpHelpers";
import { getLocalUser } from "Utils/localStorageGetSet";
import { useQuery } from "Utils/utils";
import "pages/Home/Components/Main/index.scss";
import DashBoard from "./Dashboard";
import Grading from "./Grading";
import Members from "./Members";
import StudentGrading from "./StudentGrading";
const listTab = [0, 1, 2];
const ClassPage = () => {
  const { id } = useParams();
  let query = useQuery();
  const tab = +query.get("tab");
  const user = getLocalUser();
  const history = useHistory();
  const checkTab = (tab) => {
    return listTab.includes(tab);
  };
  const [value, setValue] = React.useState(checkTab(tab) ? tab : 0);
  const [classDetails, setClassDetails] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [gradeStructure, setGradeStructure] = useState([]);
  const [dashBoardLoading, setDashBoardLoading] = useState(true);
  const [memberListLoading, setMemberListLoading] = useState(true);

  // Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (alertMessage === "") {
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }, [alertMessage]);

  const handleCloseAlert = () => {
    setAlertMessage("");
    history.push("/");
  };

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
    getClassDetails();
    getMemberList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getClassDetails = () => {
    getAuth(`/class/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setClassDetails(response.data);
          setDashBoardLoading(false);
          if (response.data.role !== "student") {
            getGradeStructure();
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 410) {
          setAlertMessage(error.response.data.message);
        } else {
          history.push("/404/Class Not Found");
        }
      });
  };
  const getMemberList = () => {
    getAuth(`/class/${id}/list-member`)
      .then((response) => {
        if (response.status === 200) {
          setStudentsList(response.data.students);
          setTeachersList(response.data.teachers);
          setMemberListLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 410) {
          setAlertMessage(error.response.data.message);
        } else {
          history.push("/404/Class Not Found");
        }
      });
  };
  const getGradeStructure = () => {
    getAuth(`/class/${id}/grade-structure`)
      .then((response) => {
        updateGradeStructure(response.data.gradeStructure);
      })
      .catch((error) => {
        if (error.response.status === 410) {
          setAlertMessage(error.response.data.message);
        } else {
          history.push("/404/Class Not Found");
        }
      });
  };
  const updateGradeStructure = (value) => {
    const data = addID(value, "assignment");
    setGradeStructure(data);
  };
  return (
    <div>
      <Header isAtMainPage={false} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Dashboard" key="tab-1" />
          <Tab label="Members" key="tab-2" />
          <Tab label="Grading" key="tab-3" />
        </Tabs>
      </Box>
      <DashBoard
        hidden={value !== 0}
        classDetails={classDetails}
        user={user}
        listPosts={exampleListPost}
        loading={dashBoardLoading}
      />
      <Members
        hidden={value !== 1}
        teachersList={teachersList}
        studentsList={studentsList}
        classDetails={classDetails}
        loading={memberListLoading}
      />
      {classDetails && classDetails.role !== "student" ? (
        <Grading
          hidden={value !== 2}
          gradeStructure={gradeStructure}
          classDetails={classDetails}
          updateGradeStructure={updateGradeStructure}
        />
      ) : (
        <StudentGrading hidden={value !== 2} classDetails={classDetails} />
      )}
      <AlertDialog
        title="Error"
        message={alertMessage}
        show={showAlert}
        handleClose={handleCloseAlert}
      />
    </div>
  );
};
export default ClassPage;
