import {
  Container,
  Grid,
  Stack,
  Paper,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import AssignmentForm from "./Components/AssignmentForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AddCircleOutlined } from "@mui/icons-material";
function Grading({ hidden }) {
  const [assignments, setAssignments] = useState([
    { id: "ass1", name: "Assignment 1", point: 9 },
    { id: "ass2", name: "Assignment 2", point: 9 },
    { id: "ass3", name: "Assignment 3", point: 9 },
  ]);
  const [focusForm, setFocusForm] = useState("");

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = Array.from(assignments);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setAssignments(items);
  };

  const onAddClick = () => {
    const nextID = assignments.length;
    const item = {
      id: `assignment-${nextID}`,
      name: "",
      point: 0,
    };
    const newAsgList = Array.from(assignments);
    newAsgList.push(item);
    setAssignments(newAsgList);
    setFocusForm(item.id);
  };

  const onRemove = (index) => {
    const newAsgList = Array.from(assignments);
    newAsgList.splice(index, 1);
    setAssignments(newAsgList);
  };
  return (
    <div hidden={hidden}>
      <Container sx={{ mt: 4, mb: 2 }}>
        <Grid container spacing={2} xs={12} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
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
                    <Paper elevation={3}>
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
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
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
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <Grid container xs={12} justifyContent="center">
                      <Grid item>
                        <Button variant="contained" fullWidth>
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Stack>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Grading;
