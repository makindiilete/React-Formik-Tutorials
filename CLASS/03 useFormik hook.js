/*
1)  Install formik "npm i formik"
*/

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

export function YoutubeForm(props) {
  // import the useFormik hook which gives us access to all the features of formik
  const formik = useFormik({});
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" name="name" />

        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" name="email" />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          className="form-control"
          id="channel"
          name="channel"
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
