import React from "react";
import Header from "../../Components/Header";
import Main from "./Main";

export default function Home() {
  return (
    <div>
      <Header />
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
