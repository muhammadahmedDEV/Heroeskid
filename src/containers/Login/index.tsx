// MAIN MODULES
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Row, Col } from "antd";
// COMPONENTS
import Button from "../../components/Buttons";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";

// STYLES
import "./styles.scss";
import { getButtonRed } from "../../components/Buttons/style";

// ICON
import facebookIcon from "../../assets/icons/facebook.png";
import googleIcon from "../../assets/icons/google-white.png";
import Shape from "../../assets/icons/Shape.png";

// CONSTANTS
import { color } from "../../constants/color";

// Services
import { googleAuth, facebookAuth, getFbData } from "../../servises/firebase";

// ACTION
import { logIn } from "../../actions";

// TYPES
import { State } from "../../reducers";
import { getError } from "../../routines/main";
import { CircularProgress } from "@material-ui/core";

interface ComponentProps {
  // onChange: (flag: boolean) => void | undefined;
  onChange: (flag: string) => void | undefined;
  error: any;
  addUser: any;
  flag?: string; // Indicates professional or organizations profile
}

const bc: string = "login";
const Login = ({ onChange, error, addUser, flag }: ComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const classes = getButtonRed("35px", "145px");
  const facebook = getButtonRed("50px", "240px", color.FACEBOOK);
  const google = getButtonRed("50px", "240px", color.GOOGLE);
  const triggerUser = addUser;
  useEffect(() => {

    // TODO
    // Sign with google and facebook for organization
    // User shouldn't be able to sign in with same email to professional and org
    // TODO END
    getFbData("users")
      .then((querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          users.push(newDoc);
        });
        triggerUser(users);
      })
      .catch(() => {
        console.log("");
      });
  }, [triggerUser]);
  const switchToSignUp = (): void => {
    onChange("signup");
  };
  const switchToResetPassword = (): void => {
    onChange("resetPassword");
  };
  const dispatch = useDispatch();
  const checkAllVal = async (): Promise<any> => {
    setLoader(true);
    dispatch(logIn({ email, password, flag }));
    setLoader(false);
  };
  const triggerForGoogle = (): void => {
    googleAuth(dispatch, flag);
  };
  const triggerForFacebook = (): void => {
    facebookAuth(dispatch, flag);
  };
  const isError = (): string => {
    const getErrorKey = Object.keys(error);
    if (getErrorKey.length) {
      return error.message;
    }
    return "";
  };
  const text: string = isError();
  useEffect(() => {
    dispatch(getError(""));
  }, []);
  return loader ? (
    <div className={`${bc}__loader`}>
      <CircularProgress />
    </div>
  ) : (
    <Row align="middle" justify="center">
      <Col sm={24} md={22} lg={18} xl={18} xxl={12}>
        <div className={bc}>
          <div className={`${bc}__top-container`}>
            <div className={`${bc}__top-container__title`}>{flag === 'organizations' ? 'Organization Sign-In' : 'Member Sign-In'}</div>
          </div>
          <div className={`${bc}__middle-container`}>
            <Input
              placeholder={"Email Address"}
              styles={`${bc}__middle-container__input`}
              onChange={setEmail}
            />
            <Input
              placeholder={"Password"}
              styles={`${bc}__middle-container__input`}
              onChange={setPassword}
              type={"password"}
            />
            <div className={`${bc}__middle-container__checkbox`}>
              <Checkbox onClick={console.log} title="Remember me next time" />
            </div>
            <div className={`${bc}__error-msg`}>
              <span className={bc + "__error"}>{text ? text : ""}</span>
            </div>
            <Button
              title={"Sign-in"}
              variant="contained"
              styles={classes.root}
              onClick={checkAllVal}
            />
            <div className={`${bc}__separator`}>
              <div className={`${bc}__separator__devider`} />
              <div className={`${bc}__separator__text`}>OR</div>
              <div className={`${bc}__separator__devider`} />
            </div>
            <div className={`${bc}__social__signup`}>
              <Button
                title={"Sign in with Google"}
                variant="contained"
                styles={google.root}
                icon={googleIcon}
                onClick={triggerForGoogle}
              />
              <Button
                title={"Continue with Facebook"}
                variant="contained"
                styles={facebook.root}
                icon={facebookIcon}
                onClick={triggerForFacebook}
              />
            </div>
            <div className={`${bc}__bottom-container`}>
              <img src={Shape} alt="" />
              <div className={`${bc}__bottom-container__text-block`}>
                <div
                  className={`${bc}__bottom-container__blue-text`}
                  onClick={switchToResetPassword}
                >
                  Forgot password?
                </div>
                <div>
                  Not a member yet?{" "}
                  <span
                    className={`${bc}__bottom-container__blue-text-signup`}
                    onClick={switchToSignUp}
                  >
                    Sign up now!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
Login.displayName = "Login";

const mapStateToProps = (state: State) => state.app;

export default connect(mapStateToProps)(Login);
