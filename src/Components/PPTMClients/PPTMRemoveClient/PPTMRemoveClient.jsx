import React, { Component } from "react";
import {
  Modal,
  //   ModalContent,
  //   ModalActions,
  //   Button,
  //   Icon,
  //   ModalHeader,
} from "semantic-ui-react";
import { PageHeader } from "../../../GlobalAtoms";

export default class PPTMRemoveClient extends Component {
  state = {
    data: {
      labelName: "",
      labelValue: "",
      id: "",
    },
  };
  constructor(props) {
    super(props);
  }
  setupModal = () => {
    const { data } = this.props;
    console.log(data);
    this.setState({ data });
  };
  removeLabel = () => {
    console.log("remove");
  };
  render() {
    return (
      <Modal
        trigger={<button>Remove</button>}
        header="Are You Sure?"
        content={
          <p style={{ padding: "1.25rem 1.5rem" }}>
            Do You Want to Remove Client with cid -{" "}
            <b>{" " + this.state.data.cid + " ?"}</b>{" "}
          </p>
        }
        actions={[
          { key: "no", content: "No", negative: true },
          { key: "yes", content: "Yes", positive: true },
        ]}
        onActionClick={(e, data) => {
          console.log(e);
        }}
        onOpen={this.setupModal}
      />
    );
  }
}
