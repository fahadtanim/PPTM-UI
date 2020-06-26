import React, { Component } from "react";
import { Form, FormGroup, FormField, Input } from "semantic-ui-react";
import { LabelText } from "../PPTMAddLabel/Atoms";
import { PrimaryButton } from "../../../GlobalAtoms";
import { connect } from "react-redux";
import { LabelApi } from "../../../API/LabelApi";
import { HttpStatus } from "../../../Utils/HTTP_STATUS_CODE";
import { labelAction } from "../../../Actions/LabelAction";

class PPTMFilterLabel extends Component {
  state = {
    labelName: "",
    labelValue: "",
  };

  filterLabels = async () => {
    const { labelName, labelValue } = this.state;
    let query = `?labelName=${encodeURIComponent(
      labelName
    )}&labelValue=${encodeURIComponent(labelValue)}`;
    try {
      const response = await LabelApi.filterLabels(query);
      if (response.statusCode === HttpStatus.OK) {
        this.props.dispatch(labelAction.setLabels(response.data));
      } else if (
        response.statusCode === HttpStatus.NOT_FOUND ||
        response.statusCode === HttpStatus.NO_CONTENT
      ) {
        this.props.dispatch(labelAction.resetLabels());
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { labelName, labelValue } = this.state;
    return (
      <Form onSubmit={this.filterLabels}>
        <FormGroup>
          <FormField
            control={Input}
            type="text"
            placeholder="Label Name"
            width={8}
            value={labelName}
            onChange={(e) => {
              this.setState({ labelName: e.target.value }, async () => {
                await this.filterLabels();
              });
            }}
            label={<LabelText>Label Name</LabelText>}
          ></FormField>
          <FormField
            control={Input}
            type="text"
            placeholder="Color Code"
            value={labelValue}
            width={8}
            onChange={(e) => {
              this.setState({ labelValue: e.target.value }, async () => {
                await this.filterLabels();
              });
            }}
            label={<LabelText>Color Code</LabelText>}
          ></FormField>
        </FormGroup>
        <Form.Field control={PrimaryButton}>Submit</Form.Field>
      </Form>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(PPTMFilterLabel);
