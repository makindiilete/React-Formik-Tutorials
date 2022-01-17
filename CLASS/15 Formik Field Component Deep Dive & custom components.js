/*
We will be going over more complex scenarios that will come handy when creating more practical and more complex forms..
We have learnt about how the Field component translate to the form input field in the dom.. There are few things that might be worth knowing..
1)  The Field component will also accept any other props passed to the Field component e.g. Placeholder

*/

import { Field, Form } from "formik";
import React from "react";

{
  /*Passing additional prop 'placeHolder' to the field component..*/
}
<Field
  type="text"
  className="form-control"
  id="channel"
  name="channel"
  placeHolder="Youtube Channel Name"
/>;

/*
2)  Another thing worth knowing is that we can make the Field component render another type of field different from the normal input field, e.g. the textArea field.. We do this using the 'as' props.
#   The 'as' prop can accept, a textarea, select dropdown option, input or custom react component but its default value is 'input' when it is not explicitly declared..
#   You can also use the 'component' prop instead of the 'as' prop BUT IT IS ADVISABLE TO STICK TO USING THE 'as' PROP
*/
//using 'as' prop
<div className="form-group">
  <label htmlFor="comment">Comments</label>
  <Field
    as="textarea"
    type="text"
    className="form-control"
    id="comment"
    name="comment"
  />
</div>;

//Using 'component' prop
<div className="form-group">
  <label htmlFor="comment">Comments</label>
  <Field
    component="textarea"
    type="text"
    className="form-control"
    id="comment"
    name="comment"
  />
</div>;

/*
    THE RENDER FUNCTION :  -
    You can also creat form fields using the render function.. We will see how to get this done.. */

{
  /*Using the render function to create our Address field*/
}
<div className="form-group">
  <label htmlFor="address">Address</label>
  <br />
  <Field name="address">
    {(props) => {
      console.log("Render props = ", props);
      return <input id="address" />;
    }}
  </Field>
</div>;

/*if we log props to the console, we get

{field: {…}, form: {…}, meta: {…}}
field: {name: "address", value: "", onChange: ƒ, onBlur: ƒ}
form: {values: {…}, errors: {…}, touched: {…}, status: undefined, isSubmitting: false, …}
meta: {value: "", error: undefined, touched: false, initialValue: "", initialTouched: false, …}
__proto__: Object

The field and meta contains information about the current input field while the form property contains info and methods about the form in general so we can destructure our field props and spread it inside our input tag so we automatically have the name, value, onChange and onBlur specified in the tag..
#   We can then use the meta props which contains info about any validation error to display error messages if we have one setup in our validation schema..
*/

//THE RENDER FUNCTION IMPLEMENTATION
{
  /*Using the render function to create our Address field*/
}
<div className="form-group">
  <label htmlFor="address">Address</label>
  <Field name="address">
    {(props) => {
      const { field, form, meta } = props;
      console.log("Render props = ", props);
      return (
        <div>
          <input type="text" className="form-control" id="address" {...field} />
          {/*from the meta prop, we gt access to d touched and error property so we use it to render an error msg if there is one and the field as bin visited...*/}
          {meta.touched && meta.error && (
            <div className="alert alert-danger">{meta.error}</div>
          )}
        </div>
      );
    }}
  </Field>
</div>;

/*
Currently this looks like an overkill for the scenario we are using it for but it will become useful when you want to use custom component in your form like the material ui form and you want it to be hooked to formik...
*/

import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup"; // import yup

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
          {/*Passing additional prop 'placeHolder' to the field component..*/}
          <Field
            type="text"
            className="form-control"
            id="channel"
            name="channel"
            placeHolder="Youtube Channel Name"
          />
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
