/*
Handling form submission with formik is simple : -
1)  Specify the onSubmit handler (formik.handleSubmit) on the form tag
2)  Add a new property to the formik object (onSubmit). This takes an arrow function with the form state as argument
*/

import React from "react";
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
    // ds method is called by the handleSubmit() method on the form tag when we submit the form..
    onSubmit: (values) => {
      console.log("form data", values);
    },
  });

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

/*
form data
{name: "MICHAEL AKINDIILETE", email: "akindiileteforex@gmail.com", channel: "Codevolution"}
channel: "Codevolution"
email: "akindiileteforex@gmail.com"
name: "MICHAEL AKINDIILETE"

*/
