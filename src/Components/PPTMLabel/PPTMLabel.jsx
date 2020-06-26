import React, { Component } from "react";
import {
  Container,
  Grid,
  GridRow,
  GridColumn,
  Accordion,
  AccordionTitle,
  Icon,
  AccordionContent,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCell,
  TableBody,
  TableRow,
  Message,
  Form,
  FormGroup,
  FormField,
  Input,
  FormButton,
} from "semantic-ui-react";
import { PageHeader, PrimaryButton } from "../../GlobalAtoms";
import { LabelApi } from "../../API/LabelApi";
import { HttpStatus } from "../../Utils/HTTP_STATUS_CODE";
import { ColorBox, ContextMenu } from "./Atoms";
import PPTMAddLabel from "./PPTMAddLabel/PPTMAddLabel";
import { connect } from "react-redux";
import { labelAction } from "../../Actions/LabelAction";
import { LabelText } from "./PPTMAddLabel/Atoms";
import PPTMEditLabel from "./PPTMEditLabel/PPTMEditLabel";
import PPTMFilterLabel from "./PPTMFilterLabel/PPTMFilterLabel";
import PPTMRemoveLabel from "./PPTMRemoveLabel/PPTMRemoveLabel";
class PPTMLabel extends Component {
  state = {
    activeIndex: false,
    dataLoading: true,
    dataError: false,
    dataErrorMessage: "",
    openEdit: false,
  };

  componentDidMount = async () => {
    let { dataLoading, dataError, dataErrorMessage } = this.state;
    try {
      const response = await LabelApi.getLabels();
      // console.log(response);
      if (response.statusCode === HttpStatus.OK) {
        this.props.dispatch(labelAction.setLabels(response.data));
      } else if (
        response.statusCode === HttpStatus.NOT_FOUND ||
        response.statusCode === HttpStatus.NO_CONTENT
      ) {
        this.props.dispatch(labelAction.resetLabels());
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

  handleClick = (e) => {
    this.setState({ activeIndex: !this.state.activeIndex });
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
    // }
    // // // // console.log(param);
  };

  handleRenderLabelsTable = (labels) => {
    let list = labels.map((label, index) => {
      return (
        <TableRow
          key={index}
          onContextMenu={(e) => {
            this.handleRightButtonClick(e, label);
          }}
        >
          <TableCell>{label.labelName}</TableCell>
          <TableCell>{label.labelValue}</TableCell>
          <TableCell>
            <ColorBox backgroundColor={label.labelValue}></ColorBox>
          </TableCell>
        </TableRow>
      );
    });
    return list;
  };
  render() {
    return (
      <React.Fragment>
        <Container>
          <ContextMenu id="right-btn-container">
            <PPTMEditLabel data={this.state.contextData}></PPTMEditLabel>
            <PPTMRemoveLabel data={this.state.contextData}></PPTMRemoveLabel>
          </ContextMenu>
          <Grid>
            <GridRow>
              <GridColumn mobile={16}>
                <PageHeader>Labels</PageHeader>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn mobile={12}>
                <Accordion fluid styled>
                  <AccordionTitle
                    active={this.state.activeIndex}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    FILTER
                  </AccordionTitle>
                  <AccordionContent active={this.state.activeIndex}>
                    <PPTMFilterLabel></PPTMFilterLabel>
                  </AccordionContent>
                </Accordion>
              </GridColumn>
              <GridColumn mobile={4} floated="right">
                {/* <Button floated="right" primary>
                  Add Label
                </Button> */}
                <PPTMAddLabel></PPTMAddLabel>
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
                      <Message.Header>Just one second</Message.Header>
                      We are fetching Lebel data for you.
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
                    <TableRow>
                      <TableHeaderCell>Label Name</TableHeaderCell>
                      <TableHeaderCell>Color Code</TableHeaderCell>
                      <TableHeaderCell>Color</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {this.handleRenderLabelsTable(this.props.labels.labelList)}
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
    labels: state.labels,
  };
}

export default connect(mapStateToProps)(PPTMLabel);
