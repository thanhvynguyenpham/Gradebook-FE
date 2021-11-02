import React, { useEffect, useState } from "react";
import CreateClassForm from "../../Components/Form/CreateClassForm";
import Header from "../../Components/Header";
import { get } from "../../Utils/httpHelpers";
import Main from "./Main";

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    getClassList();
  }, []);

  useEffect(() => {
    getClassList();
  }, [showCreateForm]);

  function handleCreateClass() {
    setShowCreateForm(true);
  }

  async function getClassList() {
    get("class")
      .then((response) => {
        if (response.status === 200) {
          var arr = [...response.data];
          setClassList(arr);
          console.log(arr);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <CreateClassForm
        isShow={showCreateForm}
        reloadFucntion={getClassList}
        handleClose={() => setShowCreateForm(false)}
      />
      <Header onCreateClass={handleCreateClass} />
      <Main classList={classList} />
    </div>
  );
}
