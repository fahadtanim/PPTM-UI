import React, { Component } from "react";
import {
  Modal,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  ModalHeader,
} from "semantic-ui-react";
import { PageHeader } from "../../../GlobalAtoms";

export default class PPTMRemoveLabel extends Component {
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
      //   <Modal trigger={<button>Remove</button>} onOpen={this.setupModal}>
      //     <ModalContent>
      //       <ModalHeader>
      //         <PageHeader>Are You Sure?</PageHeader>
      //       </ModalHeader>
      //       <p style={{ padding: "1.25rem 1.5rem" }}>
      //         Do You Want to Remove Label -{" "}
      //         <b>{" " + this.state.data.labelName + " ?"}</b>
      //       </p>
      //     </ModalContent>
      //     <ModalActions>
      //       <Button negetive="true" color="red" inverted>
      //         <Icon name="remove" /> No
      //       </Button>
      //       <Button color="green" inverted onClick={this.removeLabel}>
      //         <Icon name="checkmark" /> Yes
      //       </Button>
      //     </ModalActions>
      //   </Modal>
      <Modal
        trigger={<button>Remove</button>}
        header="Are You Sure?"
        content={
          <p style={{ padding: "1.25rem 1.5rem" }}>
            Do You Want to Remove Label -{" "}
            <b>{" " + this.state.data.labelName + " ?"}</b>{" "}
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
