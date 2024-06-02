import React, { useContext } from "react";
import PaginateBar from "./PaginateBar";
import classes from "./css/LandingFormPage.module.css";
import UserNameForm from "./UserNameForm";
import WorkspaceForm from "./WorkspaceForm";
import UsageForm from "./UsageForm";
import CongratzPage from "./CongratzPage";
import FormContext from "../store/form-context";

function LandingFormPage() {
  const {
    page,
    setCurrentPage,
    numOfPages,
    formData,
    setFinalData,
    resetDataState,
    validate,
    validation,
    validateField,
    setErrors,
    isValidUrl,
    validateEmail,
  } = useContext(FormContext);

  const pageSet = () => {
    if (page < numOfPages) {
      switch (page) {
        case 1:
          if (formData.Fullname && formData.DisplayName && formData.email) {
            if (validateEmail(formData.email)) setCurrentPage(page + 1);
            else
              setErrors((prev) => ({
                ...prev,
                email: "email is not valid",
              }));
          } else
            setErrors((prev) => ({
              ...prev,
              Fullname: "fullname is required",
              DisplayName: "displayname is required",
              email: "email is required",
            }));
          break;
        case 2:
          if (
            formData.WorkspaceName &&
            formData.WorkspaceURL &&
            isValidUrl(formData.WorkspaceURL)
          )
            setCurrentPage(page + 1);
          else {
            if (!isValidUrl(formData.WorkspaceURL)) {
              setErrors((prev) => ({
                ...prev,
                WorkspaceURL: "workspace url is not valid",
              }));
            } else
              setErrors((prev) => ({
                ...prev,
                WorkspaceName: "workspace name is required",
                WorkspaceURL: "workspace url is required",
              }));
          }
          break;
        case 3:
          if (formData.usage && validate(validation)) setCurrentPage(page + 1);
          else {
            setErrors((prev) => ({
              ...prev,
              usage: "usage is required",
            }));
            alert("Form is not complete");
          }
          break;
        case 4:
          setFinalData((current) => [...current, formData]);
          resetDataState();
          setCurrentPage(1);
          setErrors({});
          break;

        default:
          setErrors((prev) => ({
            ...prev,
            Fullname: "fullname is required",
            DisplayName: "displayname is required",
            WorkspaceName: "workspace name is required",
            WorkspaceURL: "workspace url is required",
            usage: "usage is required",
          }));
          break;
      }
      // jump to next page
    } else if (page === numOfPages) {
      // if we are already in the last page, set the collected data into a new state and reset the form to default.
      setFinalData((current) => [...current, formData]);
      resetDataState();
      setCurrentPage(1);
      setErrors({});
    }
  };

  return (
    <div className={classes.form}>
      <PaginateBar />
      <div className="card">
        {page === 1 && <UserNameForm />}
        {page === 2 && <WorkspaceForm />}
        {page === 3 && <UsageForm />}
        {page === 4 && <CongratzPage />}
      </div>
      <button className="button" onClick={pageSet}>
        {page === numOfPages ? `Launch JDFinance` : `Create Workspace`}
      </button>
    </div>
  );
}

export default LandingFormPage;
