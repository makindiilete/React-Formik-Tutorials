/*
Now we want to take a closer look at our ErrorMessage component so we can return the error styling.. To do this, we need to make use of the component prop and return a custom component we want to make use of.. Inside this custom component, we define the styling we want to use...

1)  Create a TextError.js componet
*/

//TextError.js
import React from "react";

export function TextError(props) {
  return <div className="alert alert-danger">{props.children}</div>;
}

//YoutubeForm.js
import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError"; // import yup

const initialValues = {
  // d key used here must b d same as the 'name' attribute of the input fields..
  name: "", // here we can set default name
  email: "",
  channel: "",
  comments: "", // ds will render a textArea field
  address: "", // we will use d render function to create ds field
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
  address: Yup.string().required("Address Cannot Be Empty"),
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
          {/*ds will pass d error message as 'props.children' to the TextError component*/}
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <Field
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
          {/*ds will pass d error message as 'props.children' to the TextError component*/}
          <ErrorMessage name="email" component={TextError} />
        </div>

        <div className="form-group">
          <label htmlFor="channel">Channel</label>
          {/*Passing additional prop 'placeHolder' to the field component..*/}
          <Field
            type="text"
            className="form-control"
            id="channel"
            name="channel"
            placeHolder="Youtube Channel Name"
          />
          {/*ds will pass d error message as 'props.children' to the TextError component*/}
          <ErrorMessage name="channel" />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comments</label>
          <Field
            as="textarea"
            type="text"
            className="form-control"
            id="comment"
            name="comment"
          />
        </div>
        {/*Using the render function to create our Address field*/}
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("Render props = ", props);
              return (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    {...field}
                  />
                  {/*from the meta prop, we gt access to d touched and error property so we use it to render an error msg if there is one and the field as bin visited...*/}
                  {meta.touched && meta.error && (
                    <div className="alert alert-danger">{meta.error}</div>
                  )}
                </div>
              );
            }}
          </Field>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
}

/*
USING THE RENDER FUNCTION METHOD TO SOLVE THE SAME THING..
*/

<div className="form-group">
  <label htmlFor="email">Email address</label>
  <Field type="email" className="form-control" id="email" name="email" />
  {/*Using the render function to style the errormessage*/}
  <ErrorMessage name="email">
    {(errorMessage) => {
      return (
        <div>
          <div className="alert alert-danger">{errorMessage}</div>
        </div>
      );
    }}
  </ErrorMessage>
</div>;

//Complete code
import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError"; // import yup

const initialValues = {
  // d key used here must b d same as the 'name' attribute of the input fields..
  name: "", // here we can set default name
  email: "",
  channel: "",
  comments: "", // ds will render a textArea field
  address: "", // we will use d render function to create ds field
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
  address: Yup.string().required("Address Cannot Be Empty"),
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
          {/*ds will pass d error message as 'props.children' to the TextError component*/}
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <Field
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
          {/*Using the render function to style the errormessage*/}
          <ErrorMessage name="email">
            {(errorMessage) => {
              return (
                <div>
                  <div className="alert alert-danger">{errorMessage}</div>
                </div>
              );
            }}
          </ErrorMessage>
        </div>

        <div className="form-group">
          <label htmlFor="channel">Channel</label>
          {/*Passing additional prop 'placeHolder' to the field component..*/}
          <Field
            type="text"
            className="form-control"
            id="channel"
            name="channel"
            placeHolder="Youtube Channel Name"
          />
          {/*ds will pass d error message as 'props.children' to the TextError component*/}
          <ErrorMessage name="channel" />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comments</label>
          <Field
            as="textarea"
            type="text"
            className="form-control"
            id="comment"
            name="comment"
          />
        </div>
        {/*Using the render function to create our Address field*/}
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("Render props = ", props);
              return (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    {...field}
                  />
                  {/*from the meta prop, we gt access to d touched and error property so we use it to render an error msg if there is one and the field as bin visited...*/}
                  {meta.touched && meta.error && (
                    <div className="alert alert-danger">{meta.error}</div>
                  )}
                </div>
              );
            }}
          </Field>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
}
