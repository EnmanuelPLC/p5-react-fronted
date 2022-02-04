import React from "react";
import { FunctionComponent } from "react";
import "./css/content.css";

// interface ContentProps {

// }

const Content: FunctionComponent<FunctionComponent> = (Children: FunctionComponent) => {
  return (
    <div className="content-wrapper">
      <Children />
    </div>
  );
}

export default Content;
