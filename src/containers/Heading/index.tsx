// MAIN MODULES
import React from "react";
import { Row, Col } from "antd";
// MATERIAL COMPONENTS
import Grid from "@material-ui/core/Grid";

// STYLES
import "./styles.scss";

// COMPONENTS
import TitleTile from "../../components/TitleTile";

// IMAGES
import MobileMockup from "../../assets/icons/Mockup_Mobile.png";

// TEAM IMAGES
import Tammany from "../../assets/team/Ellipse 3.3.png";

const Heading = () => {
  return (
    <div className="work-container">
      <Row>
        <Col span={24}>
          <h1 className="title">How It Works</h1>
        </Col>
        <Row style={{ width: '100%' }} gutter={16} justify='center'>
          <Col sm={24} md={16} xl={16} xxl={16}>
            <div className="work-content">
              <TitleTile
                title="What we do"
                content="Everyday Heroes connects parents and caregivers to all accredited pediatric
                professionals and pediatric organizations in the areas of health, mental health and
                education with the goal of encouraging earlier intervention for better outcomes."
              />

              <TitleTile
                title="Why we do it"
                content="Everyday Heroes was founded on the belief that connecting
                families with the appropriate pediatric care should be easily accessible."
              />

              <TitleTile
                title="Who we are"
                content="Our founding team is comprised of dedicated parents and
                professionals who have been directly affected by learning, physical and developmental disabilities."
              />
              <div className="testimonials">
                <img src={Tammany} alt=" Tammany " width="225rem" />
                <div className="content-container">
                  <p className="content">
                    "As a proud mother of two amazing boys with special needs, I
                    am familiar with the stressful process of trying to find the
                    best pediatric services. I created Everyday Heroes to
                    provide a centralized destination for pediatric support that
                    is easy to access and navigate."
                  </p>
                  <p>-Tammany Petrie, Founder</p>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={8} xl={8} xxl={8}>
            <img src={MobileMockup} alt="Mobile Mockup" className="work-img" />
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Heading;
