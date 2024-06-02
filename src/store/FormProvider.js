import React, { useState } from "react";
import FormContext from "./form-context";

function FormProvider({ children }) {
  const initErr = {
    Fullname: "",
    DisplayName: "",
    email: "",
    WorkspaceName: "",
    WorkspaceURL: "",
    usage: "",
  };

  const initialTouched = {
    Fullname: false,
    DisplayName: false,
    email: false,
    WorkspaceName: false,
    WorkspaceURL: false,
    usage: false,
  };

  const defaultDataState = {
    Fullname: "",
    DisplayName: "",
    email: "",
    WorkspaceName: "",
    WorkspaceURL: "",
    usage: "",
  };
  const defaultValidationState = {
    Fullname: false,
    DisplayName: false,
    email: false,
    WorkspaceName: false,
    usage: false,
  };
  const [page, setPage] = useState(1);
  const [finalData, setFinalData] = useState([]);
  const [formData, setFormData] = useState(defaultDataState);
  const [validation, setValidation] = useState(defaultValidationState);

  const [errors, setErrors] = useState(initErr);
  const [touched, setTouched] = useState(initialTouched);

  const validate = (a) => {
    return Object.values(a).reduce((sum, next) => sum && next, true);
  };

  const resetDataState = () => {
    setFormData(defaultDataState);
    setValidation(defaultValidationState);
  };

  const pageValidate = (page) => {
    switch (page) {
      case 1:
        if (formData.Fullname && formData.DisplayName && formData.email) {
          if (validateEmail(formData.email)) return true;
          else
            return false
        } else
          return false
      case 2:
        if (
          formData.WorkspaceName &&
          formData.WorkspaceURL &&
          isValidUrl(formData.WorkspaceURL)
        )
          return true;
        else {
          if (!isValidUrl(formData.WorkspaceURL)) {
            return false;
          } else
            return false;
        }
        break;
      case 3:
        if (formData.usage && validate(validation)) return true;
        else {
          return false
        }
        
    }
  }

  const setCurrentPage = (val) => {
    console.log(val);
    if (pageValidate(val-1) || val < page) setPage(val);
  };

  function isValidUrl(str) {
    try {
      const newUrl = new URL(str);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) {
      return false;
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validateField = (name, value) => {
    if (!value) {
      return `${name} is required`;
    }
    return "";
  };

  const onBlur = (e) => {
    const { target } = e;
    setTouched((prev) => ({ ...prev, [target.name]: true }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [target.name]: validateField(target.name, target.value),
    }));
  };

  const initialValue = {
    formData,
    page,
    numOfPages: 4,
    finalData,
    validation,
    setCurrentPage,
    setFormData,
    resetDataState,
    setFinalData,
    setValidation,
    validate,
    errors,
    setErrors,
    touched,
    setTouched,
    onBlur,
    isValidUrl,
    validateEmail,
    pageValidate,
  };

  return (
    <FormContext.Provider value={initialValue}>{children}</FormContext.Provider>
  );
}

export default FormProvider;
