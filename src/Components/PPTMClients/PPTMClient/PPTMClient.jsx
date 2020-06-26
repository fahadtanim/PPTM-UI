import React, { Component } from "react";
import { PageHeader } from "../../../GlobalAtoms";
import { Container } from "semantic-ui-react";

export default class PPTMClient extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <PageHeader>CID</PageHeader>
        </Container>
      </React.Fragment>
    );
  }
}
