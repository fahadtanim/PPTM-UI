import React, { Component } from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import { connect } from "react-redux";
import { MenubarAction } from "../../Actions/Actions";

const Clients = [
  {
    id: 1,
    cid: "amac",
    description: "this is amac",
  },
  {
    id: 2,
    cid: "hfcu",
    description: "hfs fedaral union",
  },
  {
    id: 3,
    cid: "sefc",
    description: "this is sefc",
  },
];

const Projects = [
  {
    id: 1,
    cid: "amac",
    jid: "ml1",
    shortname: "amac heloc",
  },
  {
    id: 2,
    cid: "amac",
    jid: "ms2",
    shortname: "amac dda",
  },
  {
    id: 3,
    jid: "dl0",
    cid: "hfcu",
    shortname: "hfcu daily",
  },
  {
    id: 4,
    jid: "ms2",
    cid: "hfcu",
    shortname: "hfcu monthly",
  },
  {
    id: 5,
    jid: "dl0",
    cid: "sefc",
    shortname: "sefc daily",
  },
  {
    id: 6,
    cid: "sefc",
    jid: "ms2",
    shortname: "sefc monthly",
  },
];

class PPTMSidebar extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount = () => {
    console.log("sidebar com", this.props.sidebar.sidebarVisibility);
  };

  //######## TOGGLE SIDEBAR ############

  toggleSidebar = () => {
    this.props.dispatch(MenubarAction.toggleSidebar());
    console.log("sidebar ", this.props.sidebarVisibility);
  };

  //####################################

  //######## GENERATE SIDEBAR ############

  generateClientPanel = (clients, projects) => {
    let clientPanel = clients.map((client) => {
      let filteredProjects = projects.filter(
        (project) => project.cid === client.cid
      );

      let projectPanel = filteredProjects.map((project) => {
        let prefix = project.cid + project.jid;
        return (
          <Menu.Item
            key={project.id}
            name={prefix}
            active={this.state.activeItem === prefix}
            onClick={this.handleItemClick}
          />
        );
      });

      return (
        <React.Fragment>
          <Menu.Header>{client.cid}</Menu.Header>
          <Menu.Menu>{projectPanel}</Menu.Menu>
        </React.Fragment>
      );
    });

    return <Menu.Item>{clientPanel}</Menu.Item>;
  };

  //####################################

  render() {
    const { activeItem } = this.state;
    return (
      <React.Fragment>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          //   inverted
          onHide={this.toggleSidebar}
          vertical
          visible={this.props.sidebar.sidebarVisibility}
          width="thin"
        >
          {this.generateClientPanel(Clients, Projects)}
          <Menu.Item>
            <Menu.Header>Products</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="enterprise"
                active={activeItem === "enterprise"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="consumer"
                active={activeItem === "consumer"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>CMS Solutions</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="rails"
                active={activeItem === "rails"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="python"
                active={activeItem === "python"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="php"
                active={activeItem === "php"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Hosting</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="shared"
                active={activeItem === "shared"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="dedicated"
                active={activeItem === "dedicated"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Support</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="email"
                active={activeItem === "email"}
                onClick={this.handleItemClick}
              >
                E-mail Support
              </Menu.Item>

              <Menu.Item
                name="faq"
                active={activeItem === "faq"}
                onClick={this.handleItemClick}
              >
                FAQs
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Sidebar>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    sidebar: state.sidebar,
  };
}

export default connect(mapStateToProps)(PPTMSidebar);
