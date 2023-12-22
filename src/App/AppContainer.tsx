import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { State } from "../reducers";
import { Action } from "redux-actions";
import AppRouter from "../routes/AppRouter";
import "./styles.scss";

// ACTIONS
import { isUserAuth } from "../actions";
// import Header from "../containers/Header";
// import Footer from "../containers/Footer";

export interface ComponentPropsFromDispatch {
  isUserAuth: (obj: any) => Action<object>;
}

export interface ComponentPropsFromState {}

export type ComponentProps = ComponentPropsFromDispatch &
  ComponentPropsFromState;

export interface ComponentState {}

class AppContainer extends Component<ComponentProps, ComponentState> {
  static mapStateToProps(state: State): ComponentPropsFromState {
    return {};
  }

  // static mapDispatchToProps (dispatch: Dispatch<AnyAction>): ComponentPropsFromDispatch {
  //   return {
  //     isUserAuth
  //   }
  // }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user: any): void => {
      if (user) {
        this.props.isUserAuth(user);
      } else {
        this.props.isUserAuth({});
      }
    });
  }

  render() {
    return (
      <div className="appContainer-div">
        {/* <Header /> */}
        <AppRouter />
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapDispatchToProps = { isUserAuth };

export default compose<ComponentProps, Partial<ComponentProps>>(
  withRouter,
  connect(AppContainer.mapStateToProps, mapDispatchToProps)
)(AppContainer);
