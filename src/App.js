import React from "react";
import "./App.css";
import PPTMHeader from "./Components/Header/PPTMHeader";
import PPTMSidebar from "./Components/Sidebar/PPTMSidebar";
import { SidebarPushable, SidebarPusher } from "semantic-ui-react";
import { createStore } from "redux";
import Reducer from "./Reducers/index";
import { Provider } from "react-redux";
import PPTMLabel from "./Components/PPTMLabel/PPTMLabel";
import PPTMClients from "./Components/PPTMClients/PPTMClients";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PPTMClient from "./Components/PPTMClients/PPTMClient/PPTMClient";
const store = createStore(Reducer);
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SidebarPushable as={React.Fragment}>
          <PPTMSidebar></PPTMSidebar>
        </SidebarPushable>

        <SidebarPusher>
          <PPTMHeader></PPTMHeader>
          <Switch>
            <Route exact path="/labels" component={PPTMLabel}></Route>
            <Route exact path="/clients" component={PPTMClients}></Route>
            <Route
              exact
              path="/clients/client/:cid"
              component={PPTMClient}
            ></Route>
          </Switch>
        </SidebarPusher>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
