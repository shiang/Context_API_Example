import React from "react";
import { render } from "react-dom";
import App from "./App";
import Profile from "./Profile";
import { Public } from "./Public";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Auth from "./Auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const Root = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/public" component={Public} />
          <Route
            render={props => (
              <Auth {...props} submitButtonLabel="Login">
                <Route exact path="/profile" component={Profile} />
              </Auth>
            )}
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

render(<Root />, document.getElementById("root"));
