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
import { PageHeader, PrimaryButton } from "../../../GlobalAtoms";
import { LabelText } from "./Atoms";
import { LabelApi } from "../../../API/LabelApi";
import { HttpStatus } from "../../../Utils/HTTP_STATUS_CODE";
import { connect } from "react-redux";
import { labelAction } from "../../../Actions/LabelAction";

class PPTMAddLabel extends Component {
  state = {
    formStatus: {
      loading: false,
      success: false,
      error: false,
      errorMessage: "",
    },
    labelName: {
      value: "",
      error: false,
      errorContent: {
        content: "Please Provide the Label Name",
        pointing: "below",
      },
    },
    labelColor: {
      value: "",
      error: false,
      errorContent: {
        content: "Please Provide Hex or RGB Color Code",
        pointing: "below",
      },
    },
  };

  handleChangeLabelName = (event) => {
    const { labelName, formStatus } = this.state;
    labelName.value = event.target.value;
    if (
      labelName.value !== "" &&
      labelName.value !== null &&
      labelName !== undefined
    ) {
      labelName.error = false;
      formStatus.error = false;
      formStatus.success = false;
    }
    this.setState({ labelName, formStatus });
  };
  handleChangeLabelColor = (event) => {
    const { labelColor, formStatus } = this.state;
    labelColor.value = event.target.value;
    if (
      labelColor.value !== "" &&
      labelColor.value !== null &&
      labelColor !== undefined
    ) {
      formStatus.error = false;
      formStatus.success = false;
      labelColor.error = false;
    }
    this.setState({ labelColor, formStatus });
  };

  clearUpForm = () => {
    this.setState({
      formStatus: {
        loading: false,
        success: false,
        error: false,
        errorMessage: "",
      },
      labelName: {
        value: "",
        error: false,
        errorContent: {
          content: "Please Provide the Label Name",
          pointing: "below",
        },
      },
      labelColor: {
        value: "",
        error: false,
        errorContent: {
          content: "Please Provide Hex or RGB Color Code",
          pointing: "below",
        },
      },
    });
  };

  handleAddNewLabel = async () => {
    const { labelName, labelColor, formStatus } = this.state;
    formStatus.loading = true;
    this.setState({ formStatus });
    let status = true;
    if (
      labelName.value === "" ||
      labelName.value === null ||
      labelName.value === undefined
    ) {
      labelName.error = true;
      status = false;
    }
    if (
      labelColor.value === "" ||
      labelColor.value === null ||
      labelColor.value === undefined
    ) {
      labelColor.error = true;
      status = false;
    }

    if (!status) {
      formStatus.loading = false;
      this.setState({ labelName, labelColor, formStatus });
      return;
    }

    try {
      let response = await LabelApi.addLabel({
        labelName: labelName.value,
        labelValue: labelColor.value,
      });
      if (
        response.statusCode === HttpStatus.CREATED ||
        response.statusCode === HttpStatus.OK
      ) {
        labelName.value = "";
        labelColor.value = "";
        formStatus.success = true;
        formStatus.loading = false;
        try {
          let response = await LabelApi.getLabels();
          if (response.statusCode === HttpStatus.OK) {
            this.props.dispatch(labelAction.setLabels(response.data));
          } else if (
            response.statusCode === HttpStatus.NOT_FOUND ||
            response.statusCode === HttpStatus.NO_CONTENT
          ) {
            this.props.dispatch(labelAction.resetLabels());
          }
        } catch (err) {
          this.props.dispatch(labelAction.resetLabels());
        }
        this.setState({ formStatus, labelName, labelColor });
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
    const { labelName, labelColor, formStatus } = this.state;
    const loader = formStatus.loading;
    return (
      <Modal
        trigger={<PrimaryButton floated="right">Add Label</PrimaryButton>}
        closeIcon={true}
        onOpen={this.clearUpForm}
      >
        <ModalHeader>
          <PageHeader>Add Label</PageHeader>
        </ModalHeader>
        <ModalContent>
          <Form
            onSubmit={this.handleAddNewLabel}
            success={this.state.formStatus.success}
            error={this.state.formStatus.error}
          >
            <FormGroup>
              <FormField
                control={Input}
                type="text"
                width="8"
                placeholder="label name"
                value={labelName.value}
                label={
                  <LabelText>
                    Label Name<span>*</span>
                  </LabelText>
                }
                error={
                  this.state.labelName.error
                    ? this.state.labelName.errorContent
                    : this.state.labelName.error
                }
                onChange={this.handleChangeLabelName}
              ></FormField>
              <FormField
                control={Input}
                type="text"
                width="8"
                placeholder="Color Code: e.g. #ff00ff"
                value={labelColor.value}
                label={
                  <LabelText>
                    Color Code<span>*</span>
                  </LabelText>
                }
                error={
                  this.state.labelColor.error
                    ? this.state.labelColor.errorContent
                    : this.state.labelColor.error
                }
                onChange={this.handleChangeLabelColor}
              ></FormField>
            </FormGroup>
            <Message
              success
              header="Success!"
              content="Label Added Successfully"
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
  return {};
}

export default connect(mapStateToProps)(PPTMAddLabel);
