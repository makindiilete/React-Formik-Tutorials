/*
The FieldArray component is another component offered by formik that helps us with dynamic form controls i.e. Adding form controls on the fly at run time (programmatically)..
For this we will start of by asking user for one for phone number with an option to add more phone numbers on the fly using our dynamic form controls..
*/

import React from "react";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError"; // import yup

const initialValues = {
  // d key used here must b d same as the 'name' attribute of the input fields..
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  //nested object
  social: {
    facebook: "",
    twitter: "",
  },
  //Arrays
  phoneNumbers: ["", ""],
  //dynamic fields
  phNumbers: [""],
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
        {/*Nested object*/}
        <div className="form-group">
          <label htmlFor="facebook">Facebook Profile</label>
          {/*Since ds field is nested inside d 'social' object, d name attribute will take a value of 'social.facebook'*/}
          <Field
            type="text"
            className="form-control"
            id="facebook"
            name="social.facebook"
          />
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter Profile</label>
          {/*Since ds field is nested inside d 'social' object, d name attribute will take a value of 'social.twitter'*/}
          <Field
            type="text"
            className="form-control"
            id="twitter"
            name="social.twitter"
          />
        </div>
        {/*Array*/}
        <div className="form-group">
          <label htmlFor="primaryPh">Primary Phone Number</label>
          {/*name="phoneNumbers[0]" : - ds enters d first index of the phoneNumbers[]*/}
          <Field
            type="text"
            className="form-control"
            id="primaryPh"
            name="phoneNumbers[0]"
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondaryPh">Secondary Phone Number</label>
          {/*name="phoneNumbers[1]" : - ds enters d first index of the phoneNumbers[]*/}
          <Field
            type="text"
            className="form-control"
            id="secondaryPh"
            name="phoneNumbers[1]"
          />
        </div>

        {/*Dynamic form controls*/}
        <div className="form-group">
          <label htmlFor="secondaryPh">List Of Phone Numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              console.log("fieldArrayprops = ", fieldArrayProps);
              /*ds will contain d name of ds field array and alot of functions like : - push(), remove(), pop(), move() etc.. We only need the push (to push in a new control), remove (to remove existing form control)*/
              const { push, remove, form } = fieldArrayProps; // we extract d push(), remove() and d form object (containing d entire form)
              const { values } = form; // then in turn from d destructured 'form', we extract d values property containing values of the entire form
              const { phNumbers } = values; // we extract d 'phNumbers' which is d name of ds dynamic control from the values object inside the form.. so ds destructuring replaced form.values.phNumbers.. We are going to loop through each phoneNumbers in d phNumbers[] and render a Field tag
              return (
                <div>
                  {phNumbers.map((phone, index) => (
                    <div key={index}>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          {/*to add a new form control*/}
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => push("")}
                          >
                            +
                          </button>
                          {/*to remove existing form control at the given index.. Preventing users from removing d form field if we have just one*/}
                          {phNumbers.length > 1 && (
                            <button
                              className="btn btn-outline-primary btn-sm mr-2"
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <Field
                          type="text"
                          className="form-control"
                          name={`phNumbers[${index}]`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
}
