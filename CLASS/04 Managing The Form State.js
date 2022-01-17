/*
When working with forms in react, we need to bind each form elements to a field in our state and keep track of the field changes so when we update an input field, the state values changes.. Formik helps us manage the state of our forms and we will see how this is donw..
*/

//YoutubeForm.js
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

export function YoutubeForm(props) {
  // import the useFormik hook which gives us access to all the features of formik
  const formik = useFormik({
    // ds contain initial values of our form
    initialValues: {
      // d key used here must b d same as the 'name' attribute of the input fields..
      name: "", // here we can set default name
      email: "",
      channel: "",
    },
  });

  console.log("Form values = ", formik.values); // Lets see what we have in the formik.values we are using to target our form fields
  /*
    Typing in the input fields we see the formik state getting updated : -
    Form values =
  {name: "MICHAEL AKINDIILETE", email: "akindiileteforex@gmail.com", channel: "Codevolution"}
  channel: "Codevolution"
  email: "akindiileteforex@gmail.com"
  name: "MICHAEL AKINDIILETE"
  __proto__: Object
  */

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        {/*formik will use d onChange attribute passed here and d value to track d state of the input field...*/}
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          className="form-control"
          id="channel"
          name="channel"
          onChange={formik.handleChange}
          value={formik.values.channel}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
