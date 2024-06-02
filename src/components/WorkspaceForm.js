import React, { useContext } from "react";
import FormContext from "../store/form-context";
import classes from "./css/Form.module.css";

function WorkspaceForm() {
  const { formData, setFormData,setValidation, errors, onBlur } = useContext(FormContext);

  const insertWorkspaceName = (event) => {
    setFormData((prevData) => ({ ...prevData, WorkspaceName: event.target.value }));
    event.target.value === '' ? setValidation(prevData => ({...prevData, WorkspaceName:false})) : setValidation(prevData => ({...prevData, WorkspaceName:true}));
  };

  const insertWorkspaceURL = (event) => {
    setFormData((prevData) => ({ ...prevData, WorkspaceURL: event.target.value }));
  };

  return (
    <>
      <span className={`${classes.container} ${classes.headings}`}>
        <h1>Let's set up a home for all your work</h1>
        <p>You can always create another workspace later.</p>
      </span>


      <span className={classes.container}>
        <p>Workspace Name</p>
        <input
          className={`inputField ${errors.WorkspaceName ? classes.inputErr : ""}`}
          type="text"
          placeholder={errors.WorkspaceName ? errors.WorkspaceName : "JD"}
          onChange={insertWorkspaceName}
          onBlur={onBlur}
          value={formData.WorkspaceName}
          name="WorkspaceName"
        ></input>
      </span>


      <span className={classes.container}>

        <section className={classes.section}>
          <p>Workspace URL</p>
          {/* <sub className={classes.subtext}>{`(optional)`}</sub> */}
        </section>

        <section className={classes.section}>
          <div className={classes.staticInput}>www.jaydeep.com</div>
          <input
            className={`inputField ${classes.urlfield} ${errors.WorkspaceURL ? classes.inputErr : ""}`}
            type="url"
            pattern="https://.*"
            placeholder={errors.WorkspaceURL ? errors.WorkspaceURL : ""}
            onChange={insertWorkspaceURL}
            onBlur={onBlur}
            value={formData.WorkspaceURL}
            name="WorkspaceURL"
          ></input>
        </section>
        
      </span>


    </>
  );
}

export default WorkspaceForm;
