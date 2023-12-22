// MAIN MODULES
import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "recompose";
import { State } from "../../reducers";
import { logOut } from "../../servises/firebase";
import { History, Location } from "history";
import cn from "classnames";
import { Row, Col, Menu, Dropdown, Button } from "antd";
// COMPONENTS
import Buttons from "../../components/Buttons";
import LoginAvatar from "../../components/LoginAvatar";
import SignUpAvatar from "../../components/SignUpAvatar";

// IMAGES
import logo from "../../assets/logo/ehklogo.png";

// ACTIONS
import { addCurrentUser, getUserFromId, createLogoutUser, setProfileType } from "../../actions";
// STYLES
import "./styles.scss";
// SERVISES
import { getFbData } from "../../servises/firebase";
import { DownOutlined } from "@ant-design/icons";

import {

  MenuUnfoldOutlined,
  MenuFoldOutlined,

} from '@ant-design/icons';
import { clearItemToLocalStorage, getItemToLocalStorage, removeItemFromLocalStorage } from "../../servises/localStorage";
interface ComponentProps {
  currentUser: any;
  user: any;
  history: History;
  location: Location;
  loginUser: any;
  logoutUser: any;
  addUser: any;
  handleProfileType: any;
  profileType: any;
  // AuthUser: Boolean
}
interface ComponentState {
  isUserPage: boolean;
  anchorEl: any;
  currentUser: any;
  newUserId: string;
  AuthUser: boolean;
  loginUserId: string;
  error: string;
  visible: boolean;
  collapsed: boolean;
}

const bc: string = "header";
let self: any;
let profilePic: string;
let uid: string;
const ITEM_HEIGHT = 48;

const buttonsConfig: any = [
  {
    title: "HOME",
    onClick: (): void => {
      self.history.push("/");
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
  {
    title: "ABOUT US",
    onClick: (): void => {
      self.history.push("/about-us");
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
  {
    title: "HOW IT WORKS",
    onClick: (): void => {
      self.history.push("/how-it-works");
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
  {
    title: "MAILING LIST",
    onClick: (): void => {
      self.history.push("/news-letter");
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
  {
    title: "BLOG",
    onClick: (): void => {
      self.history.push("/blog");
    },
    styles: `${bc + "__buttons-block__button"}`,
  }
];
class Header extends Component<ComponentProps, ComponentState> {

  state = {
    isUserPage: false,
    anchorEl: "",
    currentUser: "",
    newUserId: "",
    AuthUser: false,
    loginUserId: "",
    error: "",
    visible: false,
    collapsed: true,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  static displayName: string = "Header";
  open = Boolean(this.state.anchorEl);
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleJoin = (e: any) => {
    this.props.handleProfileType(e.key)
    if (e.key === "users") {
      self.history.push("/join-our-professionals", "users");
    }
    if (e.key === "organizations") {
      self.history.push("/join-our-organizations", "organizations");
    }
  };

  componentDidMount() {
    if (this.props.location) {
      const { pathname } = this.props.location;
      if (pathname.match("/user/")) {
        this.setState({ isUserPage: true });
      }
    }
    if (!this.state.currentUser) {
      getFbData("users")
        .then((querySnapshot) => {
          const users: any = [];
          querySnapshot.forEach((doc: any) => {
            const newDoc: any = doc.data();
            users.push(newDoc);
          });
          const UID = this.props.user.uid;
          users.filter((item: any) => {
            if (item.authId === UID) {
              this.setState(() => {
                return { newUserId: item.id };
              });
              return true;
            }
            return undefined;
          });
        })
        .catch((e) => {
          this.setState({ error: e });
        });
    }
    uid = this.props.user && this.props.user.uid;
    const authId = this.props.loginUser && this.props.loginUser.authId;
    uid === authId
      ? this.setState({ AuthUser: true })
      : this.setState({ AuthUser: false });
    this.props.loginUser && this.props.loginUser.avatar
      ? (profilePic = this.props.loginUser.avatar)
      : (profilePic = "");
    this.props.loginUser && this.props.loginUser.id
      ? this.setState({ loginUserId: this.props.loginUser.id })
      : this.setState({ loginUserId: "" });
  }

  userLogout = (): any => {
    logOut().then(() => {
      this.props.logoutUser();
    });
  };

  redirectToHome = (): void => {
    this.props.history.push("/");
  };

  menu = (
    <Menu onClick={this.handleClick}>
      <Menu.Item key="users" onClick={(e) => this.handleJoin(e)}>
        PROFESSIONAL
      </Menu.Item>
      <Menu.Item key="organizations" onClick={(e) => this.handleJoin(e)}>
        ORGANIZATION
      </Menu.Item>
    </Menu>
  );

  render() {
    self = this.props;
    {
      this.props.loginUser && this.props.loginUser.avatar
        ? (profilePic = this.props.loginUser.avatar)
        : (profilePic = "");
    }
    return (
      <div className={cn(bc, this.state.isUserPage ? "redBg" : "whiteBg")}>
        <div className={`${bc}__wrapper header-navebar`}>
          <Row align="middle" justify="space-between">
            <Col xs={24} sm={24} md={10} lg={10} xl={8} xxl={8}>
              <div
                className={`${bc}__logo-block`}
                onClick={this.redirectToHome}
              >
                <img src={logo} alt="Everyday Heroes Kids" />
              </div>
            </Col>

            <Col xs={24} sm={24} md={14} lg={14} xl={16} xxl={16}>
              <div className={`${bc}__buttons-block`} >
                <Button onClick={this.toggleCollapsed}  >
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <div className="menu-container">
                    {buttonsConfig.map(
                      ({ title, onClick, styles, icon }: any, index: number) => {
                        const newName: string = "";
                        if (
                          title === "JOIN AS A PROFESSIONAL/LOGIN" &&
                          this.props.user &&
                          this.props.user.uid
                          // && this.props.loginUser && this.props.loginUser.authId
                          /*self.currentUser && self.currentUser.authId*/
                        ) {
                          // newName = ''
                          // title = ''
                          return null;
                        }
                        return (
                          <Buttons
                            key={index}
                            title={newName ? newName : title}
                            onClick={onClick}
                            icon={icon}
                            styles={styles}
                          />
                        );
                      }
                    )}
                    {this.props.user && this.props.user.uid ? null : (
                      <Dropdown overlay={this.menu}>
                        <a
                          className={`${bc + "__buttons-block__button"} MuiButton-root`}
                          onClick={(e) => e.preventDefault()}
                        >
                          JOIN/LOGIN AS <DownOutlined />
                        </a>
                      </Dropdown>
                    )}


                    {
                      profilePic ? (
                        <LoginAvatar
                          src={profilePic}
                          logOut={this.userLogout}
                          authUser={this.state.AuthUser}
                          history={self.history}
                          addUser={this.props.addUser}
                          id={this.state.loginUserId}
                          user={this.props.loginUser}
                          profileType={this.props.profileType}
                        />
                      ) : uid ? (
                        <SignUpAvatar
                          logOut={this.userLogout}
                          history={self.history}
                          profileType={this.props.profileType}
                        />
                      ) : null}
                  </div>
                </Menu>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.currentUser,
  ...state.router,
  ...state.app,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUser: (id: string) => dispatch(getUserFromId(id)),
    addUser: (id: string) => dispatch(addCurrentUser(id)),
    // addUser: (user: any) => dispatch(addCurrentUser(user)),
    logoutUser: () => dispatch(createLogoutUser()),
    handleProfileType: (profileType: string) => dispatch(setProfileType(profileType))
  };
};
export default compose<ComponentProps, {}>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
