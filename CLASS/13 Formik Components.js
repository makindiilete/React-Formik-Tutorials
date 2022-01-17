/*
Formik provides us with some component that uses react context under the hood to further simplify our form handling.. There are several components available from which we will be using four : - Formik, Form, Field, ErrorMessage

Formik : - Ds is a replacement of the useFormik({}) hook, the argument passed to the hook will be passed as props to the Formik component
1)  Import Formik instead of useFormik
2)  Wrap your entire form with the Formik component
Form : - This replace our html form tag and with this we can remove our onSubmit prop because it automatically call the onSubmit handler of formik
Field : - This will replace our html input tag, with this we can remove the {...formik.getFieldProps("name")} and it will match up each fields using its name
ErrorMessageComponent: - This takes a name prop which is the name of the field we want to display the error and automatically handle the
{formik.touched.name && formik.errors.name && (
          <div className="alert alert-danger">{formik.errors.name}</div>
        )}
scenario.. So it shows the error message for the field name passed if the field has been visited and the error exists...
*/

import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
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
  /*  // import the useFormik hook which gives us access to all the features of formik
    const formik = useFormik({
      // ds contain initial values of our form
      initialValues,
      // ds method is called by the handleSubmit() method on the form tag when we submit the form..
      onSubmit,
      // we now using the validation schema from yup
      validationSchema,
      //we define a validation function to validate our form fields
      // validate,
    });*/

  return (
    //  we wrap our form with Formik component dt gives us access to other components passing d props we initially passed to useFormik() hook
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {/*we replace html <form> tag with formik Form which automatically hooks to the onSubmit handler*/}
      <Form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          {/*We replace html input field with <Field> tag from formik which behind the scene manage the state of each field using its name*/}
          <Field type="text" className="form-control" id="name" name="name" />
          {/*our long code for error msg is replaced by formik ErrorMessage component*/}
          <ErrorMessage name="name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <Field
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
          <ErrorMessage name="email" />
        </div>

        <div className="form-group">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            className="form-control"
            id="channel"
            name="channel"
          />
          <ErrorMessage name="channel" />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
}

/*
The only issue we are having now is that our error message is no longer styled with the error css.. We will handle this later but other things still works as usual
*/
