import * as React from "react";
import { Stack } from "@mui/material";
import { deleteAuth, postAuth } from "Utils/httpHelpers";
import { useState } from "react";
import UsersList from "./UsersList";
import NewAdmin from "./NewAdmin";
import Snackbars from "Components/Snackbars/Snackbars";

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
  const [openCreateAdmin, setOpenCreateAdmin] = React.useState(false);

  const handleClickOpen = () => {
    setOpenCreateAdmin(true);
  };

  const handleClose = () => {
    setOpenCreateAdmin(false);
  };

  const updateUsersStatus = (id, status) => {
    let newList = [...users];
    newList.find((value) => value._id === id).status = status;
    setUsers(newList);
  };

  const updateAdminsStatus = (id, status) => {
    let newList = [...admins];
    newList.find((value) => value._id === id).status = status;
    setAdmins(newList);
  };

  const handleBlock = (index, id, isAdmin) => {
    deleteAuth(`/admin/users/${id}`)
      .then(() => {
        if (isAdmin) {
          updateAdminsStatus(id, "disable");
        } else {
          updateUsersStatus(id, "disable");
        }
        handleSuccessMessage("Block account successfully!");
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
          updateAdminsStatus(id, "enable");
        } else {
          updateUsersStatus(id, "enable");
        }
        handleSuccessMessage("Unblock account successfully!");
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
          handleOpenAdminCreateForm={handleClickOpen}
        />
        <UsersList
          isAdmin={false}
          isLoading={isLoadingUser}
          users={users}
          setUsers={setUsers}
          handleBlock={handleBlock}
          handleUnblock={handleUnblock}
          handleSuccessMessage={handleSuccessMessage}
          handleFailedMessage={handleFailedMessage}
        />
      </Stack>
      <NewAdmin
        open={openCreateAdmin}
        handleClose={handleClose}
        showFailedScreen={handleFailedMessage}
      />
      <Snackbars
        message={message}
        successMessage={successMessage}
        failedMessage={failedMessage}
        setSuccessMessage={setSuccessMessage}
        setFailedMessage={setFailedMessage}
      />
    </>
  );
}
