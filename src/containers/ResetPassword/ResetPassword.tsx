// MAIN MODULES
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Row, Col } from "antd";

// COMPONENTS
import Button from "../../components/Buttons";
import Input from "../../components/Input";
import { CircularProgress } from "@material-ui/core";
import Swal from "sweetalert2";

// STYLES
import "./styles.scss";
import { getButtonRed } from "../../components/Buttons/style";

// // Services
import { resetPassword } from "../../servises/firebase";

// TYPES
import { State } from "../../reducers";

const bc: string = "reset-password";
interface ComponentProps {
  // onChange: (flag: boolean) => void | undefined;
  onChange: (flag: string) => void | undefined;
}

const ResetPassword = ({ onChange }: ComponentProps) => {
  const [email, setEmail] = useState("");
  const [isError, setError] = useState("");
  const classes = getButtonRed("35px", "145px");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const switchToLogin = (): void => {
    // onChange(false);
    onChange("reset-password");
  };
  const handleResetPassword = (): any => {
    if (email) {
      resetPassword(email)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text:
              "Email is sent to your email address. Follow the link to reset password and come back to Login.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            switchToLogin();
          });
        })
        .catch((error) => {
          const message = error.message;
          setError(message);
        });
    }
  };
  return loader ? (
    <div className={`${bc}__loader`}>
      {" "}
      <CircularProgress />
    </div>
  ) : (
    <Row align="middle" justify="center">
      <Col sm={24} md={22} lg={18} xl={18} xxl={12}>
        <div className={bc}>
          <div className={`${bc}__top-container`}>
            <div className={`${bc}__top-container__title`}>Reset Password</div>
          </div>
          <div className={`${bc}__middle-container`}>
            <p className={`${bc}__middle-container__text`}>
              Please enter your email address below and we will send you an
              email with information to reset your password.
            </p>
            <Input
              placeholder={"Email Address"}
              styles={`${bc}__middle-container__input`}
              onChange={setEmail}
            />
              <div  className={`${bc}__error-msg`}>
                <span className={bc + "__error"}>{isError ? isError : ""}</span>
              </div>
            <Button
              title={"Reset Password"}
              variant="contained"
              styles={classes.root}
              onClick={handleResetPassword}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

ResetPassword.displayName = "Reset Password";

const mapStateToProps = (state: State) => state.app;

export default connect(mapStateToProps)(ResetPassword);
