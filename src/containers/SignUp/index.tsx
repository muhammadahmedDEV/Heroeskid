// MAIN MODULES
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Row, Col } from "antd";

// COMPONENTS
import Button from "../../components/Buttons";
import Input from "../../components/Input";
import { CircularProgress } from "@material-ui/core";

// STYLES
import "./styles.scss";
import { getButtonRed } from "../../components/Buttons/style";

// // Services
import { createUserWithEmailAndPassword } from "../../servises/firebase";

// TYPES
import { State } from "../../reducers";
import { clearItemToLocalStorage, getItemToLocalStorage, removeItemFromLocalStorage } from "../../servises/localStorage";

interface ComponentProps {
  error: any;
  flag?: string;
}

const bc: string = "sing-up";

const SignUp = ({ error, flag }: ComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isError, setError] = useState("");
  const classes = getButtonRed("35px", "145px");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  // Get server validation errors
  const serverValidation = (): string => {
    const getErrorKey = Object.keys(error);
    if (getErrorKey.length) {
      return error.message;
    }
    return "";
  };
  const textError = serverValidation();

  const checkAllVal = (): void => {
    // setLoader(true);
    // Get form validation errors
    if (password !== passwordConfirm) {
      setError("Password does not match");
      return;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError("Must be a valid email address");
      return;
    }
    const local = getItemToLocalStorage("nonPofitData");
    if (local !== null) {
      removeItemFromLocalStorage("nonPofitData");
      clearItemToLocalStorage();
    }
    setLoader(true);
    createUserWithEmailAndPassword(email, password, dispatch, flag);
    setError("");
    setLoader(false);
  };

  return loader ? (
    <div className={`${bc}__loader`}>
      <CircularProgress />
    </div>
  ) : (
    <Row align="middle" justify="center">
      <Col sm={24} md={22} lg={18} xl={18} xxl={12}>
        <div className={bc}>
          <div className={`${bc}__top-container`}>
            <div className={`${bc}__top-container__title`}>{flag === 'users' ? 'Member Sign-Up' : 'Organization Sign-Up' }</div>
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
            <Input
              placeholder={"Confirm Password"}
              styles={`${bc}__middle-container__input`}
              onChange={setPasswordConfirm}
              type={"password"}
            />
            <div className={`${bc}__error-msg`}>
              <span className={bc + "__error"}>
                {textError ? textError : isError}
              </span>
            </div>
            <Button
              title={"Sign-up"}
              variant="contained"
              styles={classes.root}
              onClick={checkAllVal}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

SignUp.displayName = "SignUp";

const mapStateToProps = (state: State) => state.app;

export default connect(mapStateToProps)(SignUp);
