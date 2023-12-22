// MAIN MODULES
import React from "react";
import { Grid } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Row, Col } from "antd";
// STYLES
import "./styles.scss";

const bc: string = "message-container";

const Message = () => {
  return (
    <div className={`${bc}`}>
      <Row justify="center">
        <Col sm={24} md={20} xl={16} xxl={12} offset-xxl-6>
          <div className={`${bc}__message`}>
            <div className={`${bc}__icon`}>
              <InfoIcon fontSize="large" />
            </div>
            <p className={`${bc}__message__text`}>
              Thank you for visiting! Our team is excited to hear your feedback
              on our Beta Launch. In the upcoming months, we will continue to
              expand features such as background checks for professionals and
              including video interviews so families can 'meet' their Everyday
              Heroes online. If you are a pediatric professional, we invite you
              to create a free account. At this time, you must have an online
              presence for your profile to be approved. Sincerely, the team at
              Everyday Heroes Kids.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Message;
