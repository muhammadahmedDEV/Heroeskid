// MAIN MODULES
import React, { Component } from "react";

// COMPONENTS
import Login from "../../containers/Login";
import SignUp from "../../containers/SignUp";
import ResetPassword from "../../containers/ResetPassword/ResetPassword";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
// STYLES
import "./styles.scss";
import { getFbData } from "../../servises/firebase";
import { connect } from "react-redux";
import { State } from "../../reducers";
// ACTIONS
import { addUserList } from "../../actions";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";

const bc: string = "login_page";

interface ComponentState {
  // signUp: boolean
  signUp: string;
  error: string;
  profileType: string;
}
interface ComponentProps {
  addUserList: any;
  history: History;
}
class LoginPage extends Component<ComponentProps, ComponentState> {
  state = {
    signUp: "login",
    error: "",
    profileType: "",
  };
  componentDidMount() {
    const status: any = this.props.history.location.state;
    this.setState({ profileType: status });
    const triggerUser = this.props.addUserList;
    getFbData("users")
      // getFbData(this.state.profileType)
      .then((querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          users.push(newDoc);
        });
        triggerUser(users); // Add users list to store
      })
      .catch((e) => {
        // this.setState({ error: e })
      });
  }
  switchToSignUp = (flag: string): void => {
    // Switch between login, resetPassword, and signup
    this.setState({ signUp: flag });
  };
  render() {
    const { signUp } = this.state;
    return (
      <div className={bc}>
        <Header />

        {signUp === "signup" ? (
          <SignUp flag={this.state.profileType} />
        ) : signUp === "resetPassword" ? (
          <ResetPassword onChange={this.switchToSignUp} />
        ) : (
          <Login
            onChange={this.switchToSignUp}
            addUser={addUserList}
            flag={this.state.profileType}
          />
        )}
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = { addUserList };
const mapStateToProps = (state: State) => state.app;
export default compose<ComponentProps, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);
