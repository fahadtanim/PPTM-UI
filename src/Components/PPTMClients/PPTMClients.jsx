import React, { Component } from "react";
import { PageHeader } from "../../GlobalAtoms";
import {
  Container,
  Grid,
  GridRow,
  GridColumn,
  Accordion,
  AccordionTitle,
  Icon,
  AccordionContent,
  Message,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableBody,
} from "semantic-ui-react";
import "./Atoms";
import PPTMFilterClient from "./PPTMFilterClient/PPTMFilterClient";
import { connect } from "react-redux";
import { ContextMenu } from "./Atoms";
import { ClientsApi } from "../../API/ClientsApi";
import { HttpStatus } from "../../Utils/HTTP_STATUS_CODE";
import { clientAction } from "../../Actions/ClientAction";
import PPTMAddClient from "./PPTMAddClient/PPTMAddClient";
import PPTMEditClient from "./PPTMEditClient/PPTMEditClient";
import PPTMRemoveClient from "./PPTMRemoveClient/PPTMRemoveClient";
import { withRouter } from "react-router-dom";

class PPTMClients extends Component {
  state = {
    activeIndex: false,
    dataLoading: true,
    dataError: false,
    dataErrorMessage: "",
    contextData: {},
  };

  componentDidMount = async () => {
    let { dataLoading, dataError, dataErrorMessage } = this.state;
    try {
      const response = await ClientsApi.getClients();
      // console.log(response);
      if (response.statusCode === HttpStatus.OK) {
        this.props.dispatch(clientAction.setClients(response.data));
      } else if (
        response.statusCode === HttpStatus.NOT_FOUND ||
        response.statusCode === HttpStatus.NO_CONTENT
      ) {
        this.props.dispatch(clientAction.resetClients());
      } else {
      }
    } catch (err) {
      dataError = true;
      dataErrorMessage = false;
    }
    dataLoading = false;
    document.addEventListener("click", () => {
      if (document.getElementById("right-btn-container") !== null) {
        document.getElementById("right-btn-container").style.display = "none";
      }
    });
    this.setState({ dataLoading, dataError, dataErrorMessage });
  };

  // ##########  HANDLE RIGHT CLICK MOUSE Y COORDINATE  ##########
  mouseY = (evt) => {
    if (evt.pageY) {
      // console.log("@evt_pageY", evt.pageY);
      // console.log("@window_InnerHeight", window.innerHeight);
      return evt.pageY;
    } else if (evt.clientY) {
      return (
        evt.clientY +
        (document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop)
      );
    } else {
      return null;
    }
  };

  // ##########  HANDLE RIGHT CLICK MOUSE X COORDINATE  ##########
  mouseX = (evt) => {
    if (evt.pageX) {
      return evt.pageX;
    } else if (evt.clientX) {
      return (
        evt.clientX +
        (document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft)
      );
    } else {
      return null;
    }
  };

  handleRightButtonClick = (event, param) => {
    event.preventDefault();
    let elem = document.getElementById("right-btn-container");
    this.setState({
      contextData: param,
    });
    elem.style.display = "block";
    const yCord = this.mouseY(event);
    const xCord = this.mouseX(event);
    const contextMenuHeight = elem.offsetHeight + 0;
    const contextMenuWidth = elem.offsetWidth + 0;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let yPos, xPos;
    yPos =
      yCord + contextMenuHeight > windowHeight
        ? yCord - contextMenuHeight < 1
          ? 1
          : yCord - contextMenuHeight
        : yCord;

    xPos =
      xCord + contextMenuWidth > windowWidth
        ? xCord - contextMenuWidth < 1
          ? 1
          : xCord - contextMenuWidth
        : xCord;
    elem.style.top = yPos + "px";
    elem.style.left = xPos + "px";
  };

  handleClick = (e) => {
    this.setState({ activeIndex: !this.state.activeIndex });
  };

  handleRenderClientsTable = (clients) => {
    let list = clients.map((client, index) => {
      return (
        <TableRow
          key={index}
          onContextMenu={(e) => {
            this.handleRightButtonClick(e, client);
          }}
          onClick={() => {
            this.props.history.push(
              `/clients/client/${client.cid.toLowerCase()}`
            );
          }}
        >
          <TableCell>{client.cid}</TableCell>
          <TableCell>{client.clientName}</TableCell>
          <TableCell>{client.clientDescription}</TableCell>
        </TableRow>
      );
    });
    return list;
  };
  render() {
    return (
      <React.Fragment>
        <Container>
          <PageHeader>Clients</PageHeader>
          <ContextMenu id="right-btn-container">
            <PPTMEditClient data={this.state.contextData}></PPTMEditClient>
            <PPTMRemoveClient data={this.state.contextData}></PPTMRemoveClient>
          </ContextMenu>
          <Grid>
            <GridRow>
              <GridColumn mobile={12}>
                <Accordion styled fluid>
                  <AccordionTitle
                    active={this.state.activeIndex}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    FILTER
                  </AccordionTitle>
                  <AccordionContent active={this.state.activeIndex}>
                    <PPTMFilterClient></PPTMFilterClient>
                  </AccordionContent>
                </Accordion>
              </GridColumn>
              <GridColumn mobile={4}>
                <PPTMAddClient></PPTMAddClient>
              </GridColumn>
            </GridRow>
            {this.state.dataError ? (
              <GridRow>
                <GridColumn mobile={16}>
                  <Message
                    error={this.state.dataError}
                    header="Error Fetching Data!"
                    list={this.state.dataErrorMessage}
                  />
                </GridColumn>
              </GridRow>
            ) : (
              ""
            )}

            {this.state.dataLoading ? (
              <GridRow>
                <GridColumn mobile={16}>
                  <Message icon warning={true}>
                    <Icon
                      name="circle notched"
                      loading={this.state.dataLoading}
                    />
                    <Message.Content>
                      <Message.Header>Just Wait a Second</Message.Header>
                      We are fetching <b>Clients</b> data for you.
                    </Message.Content>
                  </Message>
                </GridColumn>
              </GridRow>
            ) : (
              ""
            )}

            <GridRow>
              <GridColumn mobile={16}>
                <Table striped selectable compact="very">
                  <TableHeader>
                    <TableRow
                    // onContextMenu={(e) => {
                    //   this.handleRightButtonClick(e, {
                    //     id: 1,
                    //     cid: "",
                    //     clientName: "",
                    //     clientDescription: "",
                    //   });
                    // }}
                    >
                      <TableHeaderCell>CID</TableHeaderCell>
                      <TableHeaderCell>Client Name</TableHeaderCell>
                      <TableHeaderCell>Client Description</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {this.handleRenderClientsTable(
                      this.props.clients.clientList
                    )}
                  </TableBody>
                </Table>
              </GridColumn>
            </GridRow>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    clients: state.clients,
  };
}

export default withRouter(connect(mapStateToProps)(PPTMClients));
