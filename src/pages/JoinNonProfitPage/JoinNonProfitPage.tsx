// MAIN MODULES
import React, { Component } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";

// STYLES
import "./styles.scss";
import JoinProfessionalForm from "../../containers/JoinNonProfitOrganizationForm/nonProfitForm";

// ACTIONS
import { setLoginUser } from "../../routines/main";
import { State } from "../../reducers";
import { env } from "../../config";
import SignUp from "../../containers/SignUp";
import { getFbData, getUserDataByID, isStripePayment } from "../../servises/firebase";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import { setProfileType } from "../../actions";

const bc: string = "professionals-page";

interface ComponentState {
  signUp: boolean;
  authId: string;
  userData: string;
  flag: boolean;
  newUserId: string;
  loader: boolean;
  error: string;
}
interface ComponentProps {
  location: any;
  history: History;
  // history: any;
  user: any;
  currentUser: any;
  loginUser: any;
  userList: any;
  addUser: any;
  handleProfileType: any
}

class JoinNonProfitPage extends Component<ComponentProps, ComponentState> {
  state = {
    signUp: true,
    authId: "",
    userData: "",
    flag: false,
    newUserId: "",
    loader: true,
    error: "",
  };

  stitchToSignUp = (flag: boolean): void => {
    this.setState({ signUp: flag });
  };
  componentDidMount = async () => {
    // TODO
    // Check if user has paid alreay

    const AuthId: string = this.props?.user?.uid ? this.props.user.uid : null;
    // Check if org has paid
    if (AuthId) {
      await isStripePayment({table: 'org-pro-customer', id: AuthId})
      .then((querySnapshot) => {
        const payment: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          payment.push(newDoc);
        });
        if (payment.length === 0) {
          this.props.history.push("/check-out");
        }
        // else if(payment[0].status === 'active')
  })
}
    this.setState({ authId: AuthId });
    // User signing in using google auth or fb, get their profile
    if (!this.props.loginUser) {
      await getFbData("organizations")
        .then((querySnapshot) => {
          const users: any = [];
          querySnapshot.forEach((doc: any) => {
            const newDoc: any = doc.data();
            users.push(newDoc);
          });
          const id: string = this.props.user.uid;
          users.filter((item: any) => {
            if (item.authId === id) {
              this.setState({ newUserId: item.id });
              this.props.addUser(item);
              return true;
            } else return null;
          });
        })
        .catch((e) => {
          this.setState({ error: e });
        });
    }
    (() => {
      const userData: object = this.props?.location?.state?.userData;
      if (userData) {
        this.setState(userData);
      }
      // if user is not signed  up of logged in
      if (!this.props?.user?.uid && !this.props?.loginUser?.id ){
        this.props.history.push("/login", "organizations");
      }
      const flagRecieved: boolean = this.props?.location?.state?.flag ? this.props.location.state.flag : false;
      if (flagRecieved) {
        this.setState(() => {
          return { flag: true };
        });
        // Check if user has profile
      } else if (this.props.loginUser && this.props.loginUser.id) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // Check if user is logged in
        if (this.props?.user?.uid) {
          this.props.history.push(`/org/${this.props.loginUser.id}`);
        } else {
          // Remove user data if user logged out and redirect to login
          this.props.addUser({});
          this.props.handleProfileType('organizations')
          this.props.history.push("/login", "organizations");
        }
      } else if (this.props.user && this.props.user.uid) {
        if (this.state && this.state.newUserId !== "") {
          this.props.history.push(`/org/${this.state.newUserId}`);
        }
      }
    })();
    this.setState({ loader: false });
  };

  render() {
    const { signUp } = this.state;
    return (
      <div className={bc}>
        <Header />
        {this.state.loader === true ? (
          <div className={`${bc}__loader`}>
            {" "}
            <CircularProgress />
          </div>
        ) : signUp ? (
          // user is trying to Edit Profile if flag is true
          this.state.flag === false ? (
            <div>
              <JoinProfessionalForm
                authenticationId={this.state.authId}
                env={env}
                key="create"
              />
            </div>
          ) : (
            <div>
              <JoinProfessionalForm
                authenticationId={this.state.authId}
                env={env}
                key="edit"
                userData={Object.assign({}, this.props.loginUser)}
              />
            </div>
          )
        ) : (
          <SignUp flag="organizations" />
        )}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: (user: any) => dispatch(setLoginUser(user)),
    handleProfileType: (profileType: any) => dispatch(setProfileType(profileType)),
  };
};
const mapStateToProps = (state: State) => ({
  ...state.currentUser,
  ...state.app.user,
  ...state.app,
  ...state.userList,
});

export default compose<ComponentProps, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JoinNonProfitPage);
// export default connect(mapStateToProps, mapDispatchToProps)(JoinNonProfitPage);
