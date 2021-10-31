import React, { useState } from "react";
import CreateClassForm from "../../Components/Form/CreateClassForm";
import Header from "../../Components/Header";
import Main from "./Main";

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  function handleCreateClass() {
    setShowCreateForm(true);
    console.log("open");
  }
  return (
    <div>
      {showCreateForm && <CreateClassForm />}
      <Header onCreateClass={handleCreateClass} />
      <Main
        classList={[
          { name: "Class 1", owner: "NHK", description: "No description" },
          { name: "Class 1", owner: "NHK", description: "No description" },
          { name: "Class 1", owner: "NHK", description: "No description" },
        ]}
      />
    </div>
  );
}
