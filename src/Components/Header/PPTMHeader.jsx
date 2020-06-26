import React, { Component } from "react";
import { Container, Menu, Input, Responsive, Icon } from "semantic-ui-react";
import { MenuBar, MenuButton } from "./Atoms.jsx";
import { connect } from "react-redux";
import { MenubarAction } from "../../Actions/Actions.js";
class PPTMHeader extends Component {
  state = { activeItem: "clients" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount = () => {
    console.log("header com", this.props.sidebarVisibility);
  };

  //######## TOGGLE SIDEBAR ############

  toggleSidebar = () => {
    this.props.dispatch(MenubarAction.toggleSidebar());
    console.log("header ", this.props.sidebar.sidebarVisibility);
  };

  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <MenuBar>
            <Menu secondary inverted>
              <Menu.Item>
                <MenuButton onClick={this.toggleSidebar}>
                  <Icon inverted name="bars" />
                </MenuButton>
              </Menu.Item>
              <Menu.Item>
                <b>
                  <em>PPTM</em>
                </b>
              </Menu.Item>
              <Responsive as={React.Fragment} minWidth={768}>
                <Menu.Item
                  name="tasks"
                  active={this.state.activeItem === "tasks"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="projects"
                  active={this.state.activeItem === "projects"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="clients"
                  active={this.state.activeItem === "clients"}
                  onClick={this.handleItemClick}
                />
              </Responsive>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Input icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item
                  name="logout"
                  active={this.state.activeItem === "logout"}
                  onClick={this.handleItemClick}
                />
              </Menu.Menu>
            </Menu>
          </MenuBar>
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    sidebar: state.sidebar,
  };
}

export default connect(mapStateToProps)(PPTMHeader);
