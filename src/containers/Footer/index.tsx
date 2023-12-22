// MAIN MODULES
import React, { Component } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import cn from "classnames";
import { Row, Col } from "antd";
// COMPONENTS

// IMAGES
import logo from "../../assets/logo/logo_Biomedical.png";
import tw from "../../assets/icons/twitter.png";
import fb from "../../assets/icons/facebook.png";
import inst from "../../assets/icons/instagram.png";
import ln from "../../assets/icons/linkedin.png";

// STYLES
import "./styles.scss";

// TYPES
import { History, Location } from "history";
interface ComponentProps {
  location: Location;
  history: History;
}
interface ComponentState {
  isUserPage: boolean;
}

const bc: string = "footer";

const buttonsConfig: any = [
  {
    src: tw,
    onClick: (): void => {
      window.open("https://twitter.com/EHKidsHealth");
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
  {
    src: ln,
    onClick: (): void => {
      window.open(
        "https://www.linkedin.com/company/everyday-heroes-kids?originalSubdomain=ca"
      );
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
  {
    src: fb,
    onClick: (): void => {
      window.open("https://www.facebook.com/EHkidshealth/");
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
  {
    src: inst,
    onClick: (): void => {
      window.open("https://www.instagram.com/everydayheroeskids/");
    },
    styles: `${bc + "__buttons-block__button"}`,
  },
];

class Footer extends Component<ComponentProps, ComponentState> {
  state = {
    isUserPage: false,
  };
  static displayName: string = "Footer";
  componentDidMount() {
    if (this.props.location) {
      const { pathname } = this.props.location;
      if (pathname.match("/user/")) {
        this.setState({ isUserPage: true });
      }
    }
  }

  render() {
    return (
      <div
        className={cn(
          bc,
          this.state.isUserPage ? "redBgFooter" : "whiteBgFooter"
        )}
      >
        <Row justify="space-between">
          <Col sm={24} md={8} xl={4} xxl={4}>
            <div className={`${bc}__logo-block`}>
              <img src={logo} alt="Biomedical Logo" loading='lazy' />
            </div>
          </Col>
          <Col sm={24} md={16} xl={11} xxl={12}>
            <div className={`${bc}__text-block`}>
              <span>
                If you are in a life threatening situation, do not refer to this
                site. If your issue is an emergency, call 911 or go to your
                nearest emergency room.
              </span>
            </div>
          </Col>
          <Col sm={10} md={8} xl={4} xxl={4}>
            <div className={`${bc}__buttons-block`}>
              {buttonsConfig.map(
                ({ src, onClick, styles }: any, index: number) => {
                  return (
                    <img
                      key={index}
                      src={src}
                      onClick={onClick}
                      className={`${bc}__buttons-block__button`}
                      alt=""
                      loading='lazy'
                    />
                  );
                }
              )}
            </div>
          </Col>
          <Col sm={24} md={16} xl={24} xxl={24}>
            <div className={`${bc}__text-block__company-text`}>
              <span className={`${bc}__text-block__company-text__email`}>
                info@ehkidshealth.com
                </span>
              <span className={`${bc}__text-block__company-text__policy`}>
                © 2019 Everyday Heroes Kids Health
                </span>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default compose<ComponentProps, {}>(withRouter)(Footer);
