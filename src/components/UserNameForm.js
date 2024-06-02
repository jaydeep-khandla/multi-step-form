import React, { useContext } from "react";
import FormContext from "../store/form-context";
import classes from "./css/Form.module.css";

function UserNameForm() {
  const {setFormData, formData, setValidation, errors, onBlur} = useContext(FormContext);


  const fullNameHandler = (event)=> {
    setFormData(prevData => ({...prevData, Fullname:event.target.value}));
    event.target.value === '' ? setValidation(prevData => ({...prevData, Fullname:false})) : setValidation(prevData => (({...prevData, Fullname:true})));
  }


  const displayNameHandler = (event) => {
    setFormData(prevData => ({...prevData, DisplayName:event.target.value}));
    event.target.value === '' ? setValidation(prevData => ({...prevData, DisplayName:false})) : setValidation(prevData => ({...prevData, DisplayName:true}));
  }

  const emailHandler = (event) => {
    setFormData(prevData => ({...prevData, email:event.target.value}));
    event.target.value === '' ? setValidation(prevData => ({...prevData, email:false})) : setValidation(prevData => ({...prevData, email:true}));
  }



  return (
    <>

      <span className={`${classes.container} ${classes.headings}`}>
        <h1>Welcome! First things first...</h1>
        <p>You can always change them later.</p>
      </span>
      

      <span className={classes.container}>
        <p>Full Name</p>
        <input name="Fullname" className={`inputField ${errors.Fullname ? classes.inputErr : ""}`} type="text" placeholder={errors.Fullname ? errors.Fullname : "Steve Jobs"} onChange={fullNameHandler} onBlur={onBlur} value={formData.Fullname} />
      </span>


      <span className={classes.container}>
        <p>Display Name</p>
        <input name="DisplayName" className={`inputField ${errors.DisplayName ? classes.inputErr : ""}`} type="text" placeholder={errors.DisplayName ? errors.DisplayName : "Steve"} onChange={displayNameHandler} onBlur={onBlur} value={formData.DisplayName} />
      </span>

      <span className={classes.container}>
        <p>E-mail Id</p>
        <input name="email" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i" className={`inputField ${errors.email ? classes.inputErr : ""}`} type="email" placeholder={errors.email ? errors.email : "example@gmail.com"} onChange={emailHandler} onBlur={onBlur} value={formData.email} />
      </span>

    </>
  );
}

export default UserNameForm;
