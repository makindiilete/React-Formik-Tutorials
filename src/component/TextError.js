import React from "react";

export function TextError(props) {
  return (
    <div className="alert alert-danger">
      <small>{props.children}</small>
    </div>
  );
}
