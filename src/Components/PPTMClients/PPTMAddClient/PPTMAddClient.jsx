import { connect } from "react-redux";
import React, { Component } from "react";
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
} from "semantic-ui-react";
import { LabelText, PageHeader, PrimaryButton } from "../../../GlobalAtoms";
import { ClientsApi } from "../../../API/ClientsApi";
import { HttpStatus } from "../../../Utils/HTTP_STATUS_CODE";
import { clientAction } from "../../../Actions/ClientAction";

class PPTMAddClient extends Component {
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
        content: "Please Provide the CID",
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
  handleChangeLabelColor = (event) => {
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

  clearUpForm = () => {
    this.setState({
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
          content: "Please Provide the CID",
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
    });
  };

  handleAddNewClient = async () => {
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
    } else {
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
    // if (
    //   clientDescription.value === "" ||
    //   clientDescription.value === null ||
    //   clientDescription.value === undefined
    // ) {
    //   clientDescription.error = true;
    //   status = false;
    // }

    if (!status) {
      formStatus.loading = false;
      this.setState({ cid, clientName, clientDescription, formStatus });
      return;
    }

    try {
      let response = await ClientsApi.addClient({
        cid: cid.value,
        clientName: clientName.value,
        labelValue: clientDescription.value,
      });
      if (
        response.statusCode === HttpStatus.CREATED ||
        response.statusCode === HttpStatus.OK
      ) {
        cid.value = "";
        clientName.value = "";
        clientDescription.value = "";
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
        trigger={<PrimaryButton floated="right">Add Client</PrimaryButton>}
        closeIcon={true}
        onOpen={this.clearUpForm}
      >
        <ModalHeader>
          <PageHeader>Add Client</PageHeader>
        </ModalHeader>
        <ModalContent>
          <Form
            onSubmit={this.handleAddNewClient}
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
                    CID<span>*</span>
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
                control={Input}
                type="text"
                width="16"
                placeholder="Client Description"
                value={clientDescription.value}
                label={<LabelText>Client Description</LabelText>}
                error={
                  clientDescription.error
                    ? clientDescription.errorContent
                    : clientDescription.error
                }
                onChange={this.handleChangeLabelColor}
              ></FormField>
            </FormGroup>
            <Message
              success
              header="Success!"
              content="Client Added Successfully"
            />
            <Message error header="Error!" content={formStatus.errorMessage} />
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
  return {};
}

export default connect(mapStateToProps)(PPTMAddClient);
