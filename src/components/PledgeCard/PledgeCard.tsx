// MAIN MODULES
import React from "react";

// STYLES
import "./styles.scss";
import { Row, Col } from "antd";

// ASSETS
interface ComponentProps {
  description: string;
  url: any;
  src: any;
}

const bc: string = "pledge-card";

const PartnerLogo = ({ description, url, src }: ComponentProps) => {
  return (
    <div className={bc}>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className={`${bc}__body`}>
            <a href={url} target="_blank">
              <img src={src} alt="" width="211px" loading='lazy' />
            </a>
          </div>
        </Col >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className={`${bc}__body__feedback`}>{description}</div>
        </Col>
      </Row>
    </div>
  );
};

export default PartnerLogo;
