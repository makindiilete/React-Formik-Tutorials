/*
Instead of displaying all the form validation errors, we want to display only for visited fields..
To keep track of the visited state of our form inputs, we add formik handleBlur to the onBlur attribute of the fields
*/

import React from "react";
import { useFormik } from "formik";

const initialValues = {
  // d key used here must b d same as the 'name' attribute of the input fields..
  name: "", // here we can set default name
  email: "",
  channel: "",
};
const onSubmit = (values) => {
  console.log("form data", values);
};

const validate = (values) => {
  let errors = {};
  // 'Required' validation for the 'name' field
  if (!values.name) {
    errors.name = "Required";
  }
  // if email is empty
  if (!values.email) {
    errors.email = "Required";
  }
  // if email is not empty but fails to match the email regex pattern
  else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
  ) {
    errors.email = "Invalid Email Format!";
  }
  if (!values.channel) {
    errors.channel = "Required";
  }
  return errors;
};

export function YoutubeForm(props) {
  // import the useFormik hook which gives us access to all the features of formik
  const formik = useFormik({
    // ds contain initial values of our form
    initialValues,
    // ds method is called by the handleSubmit() method on the form tag when we submit the form..
    onSubmit,
    //we define a validation function to validate our form fields
    validate,
  });

  console.log("visited fields = ", formik.touched);

  return (
    <div>
      {/*we bind the onSubmit attribute to formik "handleSubmit" handler*/}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        {/*formik will use d onChange attribute passed here and d value to track d state of the input field...*/}
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {/*if there is an error for the name, we display it*/}
        {formik.errors.name && (
          <div className="alert alert-danger">{formik.errors.name}</div>
        )}
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {/*if there is an error for email, we display it*/}
        {formik.errors.email && (
          <div className="alert alert-danger">{formik.errors.email}</div>
        )}

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          className="form-control"
          id="channel"
          name="channel"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.channel}
        />
        {/*if there is an error for channel, we display it*/}
        {formik.errors.channel && (
          <div className="alert alert-danger">{formik.errors.channel}</div>
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

/*
Now as we interact with the input fields one by one, the visited fields objects is populated with the field name and 'true' as boolean value
*/
