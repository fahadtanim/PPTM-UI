import React, { Component } from "react";
import { Form, FormGroup, FormField, Input } from "semantic-ui-react";
import { LabelText, PrimaryButton } from "../../../GlobalAtoms";
import { ClientsApi } from "../../../API/ClientsApi";
import { HttpStatus } from "../../../Utils/HTTP_STATUS_CODE";
import { clientAction } from "../../../Actions/ClientAction";
import { connect } from "react-redux";
class PPTMFilterClient extends Component {
  state = {
    cid: "",
    search: "",
  };
  filterClients = async () => {
    const { cid, search } = this.state;
    let query = `?cid=${encodeURIComponent(cid)}&search=${encodeURIComponent(
      search
    )}`;
    try {
      const response = await ClientsApi.filterClients(query);
      if (response.statusCode === HttpStatus.OK) {
        this.props.dispatch(clientAction.setClients(response.data));
      } else if (
        response.statusCode === HttpStatus.NOT_FOUND ||
        response.statusCode === HttpStatus.NO_CONTENT
      ) {
        this.props.dispatch(clientAction.resetClients());
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { cid, search } = this.state;
    return (
      <Form onSubmit={this.filterClients}>
        <FormGroup>
          <FormField
            control={Input}
            type="text"
            placeholder="CID"
            width={8}
            value={cid}
            onChange={(e) => {
              this.setState({ cid: e.target.value }, async () => {
                await this.filterClients();
              });
            }}
            label={<LabelText>CID</LabelText>}
          ></FormField>
          <FormField
            control={Input}
            type="text"
            placeholder="Search (client name or description)"
            value={search}
            width={8}
            onChange={(e) => {
              this.setState({ search: e.target.value }, async () => {
                await this.filterClients();
              });
            }}
            label={<LabelText>Search (Client Name or Description)</LabelText>}
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

export default connect(mapStateToProps)(PPTMFilterClient);
