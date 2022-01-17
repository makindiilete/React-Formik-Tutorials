/*
There are two scenarios which are the most common reasons the submit form should be disabled
1)  When the form validation state is invalid
2)  During form submission process : - The form passed validation and you have clicked the submit button then the form submit button should be disabled in other not to trigger another backend call..

We will take a look at the first case which is to disable the submit button when the form state is invalid... For this we have two options
1)  We can disable the submit button immediately on page load and ensure a user interact changing the field values and then validate the form to be valid before enabling the submit button : - This option work fine but when we have scenario of an edit form when the form is already pre-populated with data from the server and in such cases, the user might want to leave the fields on change, this will not work fine because the form will enforce the user change the values
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

//field level validation for the comments section
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Comments Cannot Be Empty";
  }
  return error;
};

export function ManualValidationTrigger() {
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
      {/*Using render function for manual validation trigger*/}
      {(formik) => {
        console.log("Formik prop = ", formik);
        return (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              {/*We replace html input field with <Field> tag from formik which behind the scene manage the state of each field using its name*/}
              <Field
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
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
                placeholder="Youtube Channel Name"
              />
              {/*ds will pass d error message as 'props.children' to the TextError component*/}
              <ErrorMessage name="channel" component={TextError} />
            </div>

            {/*Field level validation : - We pass our validateComments() to the validate prop of comment field*/}
            <div className="form-group">
              <label htmlFor="comment">Comments</label>
              <Field
                as="textarea"
                type="text"
                className="form-control"
                id="comment"
                name="comment"
                validate={validateComments}
              />
              <ErrorMessage name="comment" component={TextError} />
            </div>
            {/*Using the render function to create our Address field*/}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field name="address">
                {(props) => {
                  const { field, form, meta } = props;
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
                                  className="btn btn-outline-danger btn-sm mr-2"
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
            {/*to validate a given field, we first set the field to be touched and then call d validateField() method passing d field name*/}
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={() => {
                formik.setFieldTouched("comment");
                formik.validateField("comment");
              }}
            >
              Validate Comment
            </button>
            {/*to validate the entire form, we first set all fields to be touched and then call validateForm() with no argument*/}
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={() => {
                formik.setTouched({
                  address: true,
                  channel: true,
                  comment: true,
                  email: true,
                  name: true,
                });
                formik.validateForm().then(null);
              }}
            >
              Validate All
            </button>
            {/*disabled={!(formik.dirty && formik.isValid)} : - Disable the submit button if the user has changed the field values and the form is not in a valid state..
            We cannot use disabled={!formik.dirty && !formik.isValid} bcos two negatives will change to positive
            */}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={!(formik.dirty && formik.isValid)}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

/*
2)  The second option is validating only upon the click on the submit button, on page load, the submit button is enabled and on click of the button, the validation runs and then if the validation fails, the button is disabled else, the form gets submitted
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

//field level validation for the comments section
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Comments Cannot Be Empty";
  }
  return error;
};

export function ManualValidationTrigger() {
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
      {/*Using render function for manual validation trigger*/}
      {(formik) => {
        console.log("Formik prop = ", formik);
        return (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              {/*We replace html input field with <Field> tag from formik which behind the scene manage the state of each field using its name*/}
              <Field
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
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
                placeholder="Youtube Channel Name"
              />
              {/*ds will pass d error message as 'props.children' to the TextError component*/}
              <ErrorMessage name="channel" component={TextError} />
            </div>

            {/*Field level validation : - We pass our validateComments() to the validate prop of comment field*/}
            <div className="form-group">
              <label htmlFor="comment">Comments</label>
              <Field
                as="textarea"
                type="text"
                className="form-control"
                id="comment"
                name="comment"
                validate={validateComments}
              />
              <ErrorMessage name="comment" component={TextError} />
            </div>
            {/*Using the render function to create our Address field*/}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field name="address">
                {(props) => {
                  const { field, form, meta } = props;
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
                                  className="btn btn-outline-danger btn-sm mr-2"
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
            {/*to validate a given field, we first set the field to be touched and then call d validateField() method passing d field name*/}
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={() => {
                formik.setFieldTouched("comment");
                formik.validateField("comment");
              }}
            >
              Validate Comment
            </button>
            {/*to validate the entire form, we first set all fields to be touched and then call validateForm() with no argument*/}
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={() => {
                formik.setTouched({
                  address: true,
                  channel: true,
                  comment: true,
                  email: true,
                  name: true,
                });
                formik.validateForm().then(null);
              }}
            >
              Validate All
            </button>
            {/*ds will enable the submit button on page load and on click of the submit button, d validation runs and if the state is invalid, the button is disabled*/}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={!formik.isValid}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
