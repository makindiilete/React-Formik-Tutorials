/*
In the next couple of videos, we will see how we can further simplify our code with options provided by formik.. To start with this, we create a new component "OldYoutubeForm.js" and we copy our current code to the file as a reference while we build on the existing codebase...

1)  Remove the validate() function so we are left the validateSchema from yup
2)  As we can observe, on each of those fields, we are repeating the same props : -
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
We can use formik to simplify this by replacing it with "{...formik.getFieldProps("name")} : - We pass the field name as arg to the function
*/

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // import yup

const initialValues = {
  // d key used here must b d same as the 'name' attribute of the input fields..
  name: "", // here we can set default name
  email: "",
  channel: "",
};
const onSubmit = (values) => {
  console.log("form data", values);
};

//form validation schema by yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name Is Required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email Is Required"),
  channel: Yup.string().required("Channel Is Required"),
});

export function YoutubeForm(props) {
  // import the useFormik hook which gives us access to all the features of formik
  const formik = useFormik({
    // ds contain initial values of our form
    initialValues,
    // ds method is called by the handleSubmit() method on the form tag when we submit the form..
    onSubmit,
    // we now using the validation schema from yup
    validationSchema,
    //we define a validation function to validate our form fields
    // validate,
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
          {...formik.getFieldProps("name")}
        />
        {/*if there is an error for the name and the field has been visited, we display it*/}
        {formik.touched.name && formik.errors.name && (
          <div className="alert alert-danger">{formik.errors.name}</div>
        )}
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          {...formik.getFieldProps("email")}
        />
        {/*if there is an error for email, we display it*/}
        {formik.touched.email && formik.errors.email && (
          <div className="alert alert-danger">{formik.errors.email}</div>
        )}

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          className="form-control"
          id="channel"
          name="channel"
          {...formik.getFieldProps("channel")}
        />
        {/*if there is an error for channel, we display it*/}
        {formik.touched.channel && formik.errors.channel && (
          <div className="alert alert-danger">{formik.errors.channel}</div>
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
