import { Input } from "@mui/material";
import React from "react";
import { patchAuth } from "../../Utils/httpHelpers";

const IDField = ({
  identity,
  setUsers,
  users,
  showSuccessfulAlert,
  showFailedAlert,
}) => {
  const [disabled, setDisabled] = React.useState(false);
  const handleSubmit = (event) => {
    if (event.target.value.length === 0) {
      return;
    }
    if (event.target.value.length > 20) {
      event.target.value = "";
      showFailedAlert("ID must be no longer than 20 characters.");
    }
    if (!checkID(event.target.value)) {
      event.target.value = "";
      showFailedAlert("Student ID must only contains alphabets and numbers");
      return;
    }
    const body = {
      studentId: event.target.value,
    };
    setDisabled(true);
    patchAuth(`/admin/users/${identity}/studentid`, body)
      .then((response) => {
        let newList = [...users];
        newList.find((value) => value._id === identity).studentId =
          event.target.value;
        setUsers(newList);
        showSuccessfulAlert();
      })
      .catch((error) => {
        event.target.value = "";
        setDisabled(false);
        if (error.response.status === 400) {
          showFailedAlert(error.response.data.message);
        } else {
          showFailedAlert();
        }
      });
  };
  const checkID = (value) => {
    return /^[aA-zZ0-9]+$/.test(value);
  };
  return (
    <div>
      <Input
        defaultValue=""
        style={{ width: "50px" }}
        onBlur={(event) => handleSubmit(event)}
        disabled={disabled}
      />
    </div>
  );
};

export default IDField;
