import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalContent,
  FormGroup,
  FormField,
  Input,
  Form,
  Message,
  ButtonGroup,
  ButtonOr,
  TextArea,
} from "semantic-ui-react";
import { PageHeader, PrimaryButton, LabelText } from "../../../GlobalAtoms";
import { HttpStatus } from "../../../Utils/HTTP_STATUS_CODE";
import { ClientsApi } from "../../../API/ClientsApi";
import { clientAction } from "../../../Actions/ClientAction";
class PPTMEditClient extends Component {
  state = {
    formStatus: {
      loading: false,
      success: false,
      error: false,
      errorMessage: "",
    },
    cid: {
      value: "",
      error: false,
      errorContent: {
        content: "Please Provide the Cid",
        pointing: "below",
      },
    },

    clientName: {
      value: "",
      error: false,
      errorContent: {
        content: "Please Provide the Client Name",
        pointing: "below",
      },
    },
    clientDescription: {
      value: "",
      error: false,
      errorContent: {
        content: "Please Provide Client Description",
        pointing: "below",
      },
    },
  };

  constructor(props) {
    super(props);
  }

  handleChangeCid = async (event) => {
    const { cid, formStatus } = this.state;
    cid.value = event.target.value;
    if (cid.value !== "" && cid.value !== null && cid !== undefined) {
      cid.error = false;
      formStatus.error = false;
      formStatus.success = false;
    }
    try {
      let response = await ClientsApi.getByCid(cid.value);
      if (response.statusCode === HttpStatus.OK) {
        cid.error = true;
        cid.errorContent = {
          content: `Client with This Cid Exists`,
          pointing: "below",
        };
      } else if (
        response.statusCode === HttpStatus.NOT_FOUND ||
        response.statusCode === HttpStatus.NOT_FOUND
      ) {
        cid.error = false;
        formStatus.errorMessage =
          response.statusCode + " ! " + response.Message;
      }
    } catch (err) {
      formStatus.errorMessage = err;
    }
    this.setState({ cid, formStatus });
  };

  handleChangeClientName = (event) => {
    const { clientName, formStatus } = this.state;
    clientName.value = event.target.value;
    if (
      clientName.value !== "" &&
      clientName.value !== null &&
      clientName !== undefined
    ) {
      clientName.error = false;
      formStatus.error = false;
      formStatus.success = false;
    }
    this.setState({ clientName, formStatus });
  };
  handleChangeClientDescription = (event) => {
    const { clientDescription, formStatus } = this.state;
    clientDescription.value = event.target.value;
    if (
      clientDescription.value !== "" &&
      clientDescription.value !== null &&
      clientDescription !== undefined
    ) {
      formStatus.error = false;
      formStatus.success = false;
      clientDescription.error = false;
    }
    this.setState({ clientDescription, formStatus });
  };

  setupForm = () => {
    const { data } = this.props;
    this.setState({
      formStatus: {
        loading: false,
        success: false,
        error: false,
        errorMessage: "",
      },
      cid: {
        value: data.cid,
        error: false,
        errorContent: {
          content: "Please Provide the Label Name",
          pointing: "below",
        },
      },
      clientName: {
        value: data.clientName,
        error: false,
        errorContent: {
          content: "Please Provide the Label Name",
          pointing: "below",
        },
      },
      clientDescription: {
        value: data.clientDescription,
        error: false,
        errorContent: {
          content: "Please Provide Hex or RGB Color Code",
          pointing: "below",
        },
      },
    });
  };

  handleEditClient = async () => {
    const { cid, clientName, clientDescription, formStatus } = this.state;
    formStatus.loading = true;
    this.setState({ formStatus });
    let status = true;
    if (cid.value === "" || cid.value === null || cid.value === undefined) {
      cid.error = true;
      status = false;
      cid.errorContent = {
        content: `Provide Cid`,
        pointing: "below",
      };
    } else if (cid.value.toLowerCase() !== this.props.data.cid.toLowerCase()) {
      try {
        let response = await ClientsApi.getByCid(cid.value);
        if (response.statusCode === HttpStatus.OK) {
          cid.error = true;
          status = false;
          cid.errorContent = {
            content: `Client with This Cid Exists`,
            pointing: "below",
          };
        }
      } catch (err) {}
    }
    if (
      clientName.value === "" ||
      clientName.value === null ||
      clientName.value === undefined
    ) {
      clientName.error = true;
      clientName.errorContent = {
        content: `Provide Client Name`,
        pointing: "below",
      };
      status = false;
    }

    if (!status) {
      formStatus.loading = false;
      this.setState({ clientName, clientDescription, formStatus });
      return;
    }
    try {
      let response = await ClientsApi.updateClient({
        id: this.props.data.id,
        cid: cid.value,
        clientName: clientName.value,
        clientDescription: clientDescription.value,
      });
      if (
        response.statusCode === HttpStatus.CREATED ||
        response.statusCode === HttpStatus.OK
      ) {
        formStatus.success = true;
        formStatus.loading = false;
        try {
          let response = await ClientsApi.getClients();
          if (response.statusCode === HttpStatus.OK) {
            this.props.dispatch(clientAction.setClients(response.data));
          } else if (
            response.statusCode === HttpStatus.NOT_FOUND ||
            response.statusCode === HttpStatus.NO_CONTENT
          ) {
            this.props.dispatch(clientAction.resetClients());
          }
        } catch (err) {
          this.props.dispatch(clientAction.resetClients());
        }
        this.setState({ formStatus, clientName, clientDescription });
      } else {
        formStatus.error = true;
        formStatus.loading = false;
        formStatus.errorMessage = response.statusCode + "! " + response.message;
        this.setState({ formStatus });
      }
    } catch (err) {
      formStatus.error = true;
      formStatus.errorMessage = err.toString();
      formStatus.loading = false;
      this.setState({ formStatus });
    }
  };

  render() {
    const { cid, clientName, clientDescription, formStatus } = this.state;
    const loader = formStatus.loading;
    return (
      <Modal
        trigger={<button>Edit</button>}
        closeIcon={true}
        onOpen={this.setupForm}
      >
        <ModalHeader>
          <PageHeader data={this.state.contextData}>Edit Client</PageHeader>
        </ModalHeader>
        <ModalContent>
          <Form
            onSubmit={this.handleEditClient}
            success={this.state.formStatus.success}
            error={this.state.formStatus.error}
          >
            <FormGroup>
              <FormField
                control={Input}
                type="text"
                width="8"
                placeholder="CID"
                value={cid.value}
                label={
                  <LabelText>
                    CID <span>*</span>
                  </LabelText>
                }
                error={cid.error ? cid.errorContent : cid.error}
                onChange={this.handleChangeCid}
              ></FormField>
              <FormField
                control={Input}
                type="text"
                width="8"
                placeholder="Client Name"
                value={clientName.value}
                label={
                  <LabelText>
                    Client Name<span>*</span>
                  </LabelText>
                }
                error={
                  clientName.error ? clientName.errorContent : clientName.error
                }
                onChange={this.handleChangeClientName}
              ></FormField>
            </FormGroup>
            <FormGroup>
              <FormField
                control={TextArea}
                type="text"
                width="16"
                placeholder="Client Description"
                value={clientDescription.value}
                label={
                  <LabelText>
                    Client Description<span>*</span>
                  </LabelText>
                }
                error={
                  clientDescription.error
                    ? clientDescription.errorContent
                    : clientDescription.error
                }
                onChange={this.handleChangeClientDescription}
              ></FormField>
            </FormGroup>
            <Message
              success
              header="Success!"
              content="Label Edited Successfully"
            />
            <Message
              error
              header="Error!"
              content={this.state.formStatus.errorMessage}
            />
            {/* <Form.Field control={FormButton}>Submit</Form.Field> */}
            <ButtonGroup>
              <PrimaryButton type="submit" loading={loader}>
                Submit
              </PrimaryButton>
              {/* <ButtonOr></ButtonOr>
                  <Button negative loading={loader}>
                    Cancel
                  </Button> */}
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    clients: state.clients,
  };
}

export default connect(mapStateToProps)(PPTMEditClient);
