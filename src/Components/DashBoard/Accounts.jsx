import * as React from "react";
import { Alert, Snackbar, Stack } from "@mui/material";
import { deleteAuth, postAuth } from "../../Utils/httpHelpers";
import { useState } from "react";
import UsersList from "./UsersList";

export default function Accounts({
  users,
  setUsers,
  isLoadingUser,
  admins,
  setAdmins,
  isLoadingAdmin,
}) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState(false);
  const [message, setMessage] = useState("");

  const updateUsersStatus = (index, status) => {
    let newList = [...users];
    newList[index].status = status;
    setUsers(newList);
  };

  const updateAdminsStatus = (index, status) => {
    let newList = [...admins];
    newList[index].status = status;
    setAdmins(newList);
  };

  const handleBlock = (index, id, isAdmin) => {
    deleteAuth(`/admin/users/${id}`)
      .then(() => {
        if (isAdmin) {
          updateAdminsStatus(index, "unable");
        } else {
          updateUsersStatus(index, "unable");
        }
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          handleFailedMessage(error.response.data.message);
        } else {
          handleFailedMessage();
        }
      });
  };

  const handleUnblock = (index, id, isAdmin) => {
    postAuth(`/admin/users/${id}`)
      .then(() => {
        if (isAdmin) {
          updateAdminsStatus(index, "enable");
        } else {
          updateUsersStatus(index, "enable");
        }
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          handleFailedMessage(error.response.data.message);
        } else {
          handleFailedMessage();
        }
      });
  };
  const handleSuccessMessage = (message) => {
    if (message) {
      setMessage(message);
    } else {
      setMessage("Updated successfully.");
    }
    setSuccessMessage(true);
  };
  const handleFailedMessage = (message) => {
    if (message) {
      setMessage(message);
    } else {
      setMessage("Something went wrong. Please try again.");
    }
    setFailedMessage(true);
  };

  React.useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
      <Stack spacing={3}>
        <UsersList
          isAdmin={true}
          isLoading={isLoadingAdmin}
          users={admins}
          setUsers={setAdmins}
          handleBlock={handleBlock}
          handleUnblock={handleUnblock}
          handleSuccessMessage={handleSuccessMessage}
          handleFailedMessage={handleFailedMessage}
        />
        <UsersList
          isAdmin={false}
          isLoading={isLoadingUser}
          users={users}
          setUsers={users}
          handleBlock={handleBlock}
          handleUnblock={handleUnblock}
          handleSuccessMessage={handleSuccessMessage}
          handleFailedMessage={handleFailedMessage}
        />
      </Stack>
      <Snackbar
        open={successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
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
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
