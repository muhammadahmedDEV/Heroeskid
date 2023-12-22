// MAIN MODULE
import React, { Component } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { CssBaseline } from "@material-ui/core";
import {
  MuiThemeProvider,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { compose } from "recompose";
import { createBrowserHistory } from "history";

import { PersistGate } from "redux-persist/integration/react";
// STORE
import { createStore } from "../store";

// MATERIAL THEME
import { createTheme } from "../theme";

// MAIN APP
import AppContainer from "./AppContainer";

// STYLES
import styles, { classes } from "./styles";

type ComponentProps = WithStyles<classes, true>;

interface ComponentState {
  storeLoaded: boolean;
}
const history = createBrowserHistory();
const { store, persistor } = createStore(history);
class App extends Component<ComponentProps, ComponentState> {
  private readonly theme = createTheme();

  constructor(props: ComponentProps, context?: any) {
    super(props, context);

    this.state = {
      ...this.state,
      storeLoaded: false,
    };
  }
  render() {
    return (
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={this.theme}>
              <CssBaseline />
              <AppContainer />
            </MuiThemeProvider>
          </ConnectedRouter>
        </PersistGate>
      </ReduxProvider>
    );
  }
}

export default compose<ComponentProps, Partial<ComponentProps>>(
  withStyles(styles, { withTheme: true })
)(App);
