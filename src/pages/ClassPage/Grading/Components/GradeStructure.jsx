import {
  Grid,
  Stack,
  Paper,
  Typography,
  IconButton,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AssignmentForm from "./AssignmentForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AddCircleOutlined } from "@mui/icons-material";

import "../index.scss";
import { patchAuth } from "../../../../Utils/httpHelpers";

const MAX_SCORE = 10;

function GradeStructure({
  hidden,
  classDetails,
  assignments,
  updateAssignments,
  setAlertMessage,
  setOpenAlertMessage,
  updateGradeStructure,
}) {
  const [focusForm, setFocusForm] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [openDialogMessage, setOpenDialogMessage] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [deleted, setDeleted] = useState(0);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = Array.from(assignments);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    updateAssignments(items);
  };

  const onAddClick = () => {
    const nextID = assignments.length + deleted;
    const item = {
      id: `assignment-${nextID}`,
      name: "",
      point: 0,
    };
    const newAsgList = Array.from(assignments);
    newAsgList.push(item);
    updateAssignments(newAsgList);
    setFocusForm(item.id);
  };

  const onRemove = (index) => {
    const newAsgList = Array.from(assignments);
    newAsgList.splice(index, 1);
    updateAssignments(newAsgList);
    const updateDelNum = deleted + 1;
    setDeleted(updateDelNum);
  };

  const handleFormChange = (index, name, point) => {
    const newAsgList = Array.from(assignments);
    newAsgList.at(index).name = name;
    newAsgList.at(index).point = point;
    updateAssignments(newAsgList);
  };

  const filterList = (assignments) => {
    const newAsgList = [];
    assignments.forEach((item, index) => {
      if (item.name.length !== 0) {
        if (item.identity) {
          newAsgList.push({
            name: item.name,
            point: item.point,
            identity: item.identity,
          });
        } else {
          newAsgList.push({
            name: item.name,
            point: item.point,
          });
        }
      } else {
        onRemove(index);
      }
    });
    return newAsgList;
  };

  const validate = () => {
    let sum = 0;
    assignments.forEach((item) => {
      if (item.name.length !== 0) {
        sum += item.point;
      }
    });
    if (sum < MAX_SCORE) {
      setDialogMessage(
        "Total point is smaller than 10. Do you want to still update?"
      );
      setDialogTitle("Are you sure?");
      setOpenDialogMessage(true);
    } else if (sum > MAX_SCORE) {
      setAlertMessage("Total point is bigger than 10. Please try again!");
      setOpenAlertMessage(true);
    } else {
      return true;
    }
    return false;
  };
  const onUpdateAssignments = () => {
    const validateForm = validate();
    if (validateForm) {
      handleUpdateAssignments();
    }
  };

  const handleUpdateAssignments = () => {
    setDisableButton(true);
    setOpenDialogMessage(false);
    const body = {
      gradeStructure: filterList(assignments),
    };
    patchAuth(`/class/${classDetails._id}/grade-structure`, body)
      .then((response) => {
        updateAssignments([]);
        updateGradeStructure(response.data.gradeStructure);

        setAlertMessage("Update grade structure successfully");
        setOpenAlertMessage(true);
        setDisableButton(false);
      })
      .catch((error) => {
        if (error.response.status === 404 || error.response.status === 400) {
          setAlertMessage(error.response.data.err);
        } else {
          setAlertMessage("Cannot update right now. Please try again!");
        }
        setOpenAlertMessage(true);
        setDisableButton(false);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialogMessage(false);
  };
  return (
    <>
      <Grid item xs={12} sm={10} hidden={hidden}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Stack
                className="droppable"
                spacing={3}
                width={"100%"}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Paper elevation={3} className="top-panel">
                  <Grid
                    container
                    xs={12}
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Grid item>
                      <Typography variant="h5" component="div">
                        Grade structure
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="small"
                        aria-label="Account"
                        color="inherit"
                        onClick={onAddClick}
                      >
                        <AddCircleOutlined />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
                {assignments.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => setFocusForm(item.id)}
                      >
                        <AssignmentForm
                          index={index}
                          name={item.name}
                          point={item.point}
                          onFocus={focusForm === item.id}
                          onRemove={onRemove}
                          setValues={handleFormChange}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Grid container xs={12} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={onUpdateAssignments}
                      disabled={disableButton}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <Dialog
        open={openDialogMessage}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateAssignments} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default GradeStructure;
