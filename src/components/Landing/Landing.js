import React from "react";

import { connect } from "react-redux";
import {Button} from "react-bootstrap"

const Landing = props => {
  console.log(props);

  return (
    <div>
      <a href={process.env.REACT_APP_LOGIN}>
      <Button bsStyle="primary">LOG IN</Button>
      </a>
    </div>
  );
};
const mapStatetoProps = state => state;
export default connect(mapStatetoProps)(Landing);