// MAIN MODULES
import React from "react";
// import cn from 'classnames';

// MATERIAL COMPONENTS
import { Row, Col } from "antd";
// STYLES
import "./styles.scss";

// COMPONENTS
import TeamProfile from "../../components/TeamProfile";
// TEAM IMAGES

import Tammany from "../../assets/team/Ellipse 3.3.png";
import Todd from "../../assets/team/Ellipse 3.4.png";
import Wendy from "../../assets/team/Ellipse 3.5.png";
import Pam from "../../assets/team/Ellipse 3.6.png";
import Ron from "../../assets/team/Ron.png";
import Niraj from "../../assets/team/NirajMistri.png";
import Nancy from "../../assets/team/Nancy.png";
import Chris from "../../assets/team/ChrissBass.png";
import Alok from "../../assets/team/AlokPatel.png";

const teamProfile = () => {
  const Users: any[] = [
    {
      avatar: Tammany,
      name: "Tammany Petrie",
      designation: "Founder",
      education: "Pediatric Entrepreneur",
    },
    {
      avatar: Todd,
      name: "Todd Lee",
      designation: "CTO",
      education: "Sr. Software Engineer",
    },
    {
      avatar: Wendy,
      name: "Wendy Kaufman",
      designation: "CFO",
      education: "CPA, CA",
    },
    {
      avatar: Pam,
      name: "Pam Aasen",
      designation: "Disability Advocate, Parent Leader and Family Engagement Specialist",
      education: "Educator B.Ed., M.Ed.",
    },
    {
      avatar: Chris,
      name: "Chris Bass",
      designation: "Business Development",
      education: "Masters of Business, Entrepreneurship & Technology, HBA",
    },
  ];
  const Advisors: any[] = [
    {
      avatar: Ron,
      name: "Ron Duke",
      designation: "Business Advisor",
      education: " C-Suite Exec, Board Director, Advisor and Mentor; CPA",
    },
    {
      avatar: Niraj,
      name: "Dr. Niraj Mistry",
      designation: "Pediatric Advisor, Canada",
      education: " Pediatrician, The Hospital for Sick Children",
    },
    {
      avatar: Nancy,
      name: "Nancy Watt",
      designation: "Communications Advisor",
      education: " B.A., C.A.P.P.",
    },
    {
      avatar: Alok,
      name: "Dr. Alok Patel",
      designation: "Pediatric Advisor",
      education:
        "US  Pediatrician,  UCSF, Stanford & Columbia, Special Correspondent ABC News, Co-host “Parentalogic”, PBS",
    },
  ];
  return (
    <div className="team-container">
      <Row style={{ width: "100%" }} justify="center">
        <Col span={24}>
          <h1 className="title">Meet our team</h1>
        </Col>
        {Users.map((user, index) => (
          <Col md={12} xl={6} xxl={6}>
            <TeamProfile
              avatar={user.avatar}
              name={user.name}
              designation={user.designation}
              key={index}
              education={user.education}
            />
          </Col>
        ))}
      </Row>
      <Row style={{ width: "100%" }} justify="center">
        <Col span={24}>
          <h1 className="title">advisors</h1>
        </Col>
        {Advisors.map((user, index) => (
          <Col md={12} xl={6} xxl={6}>
            <TeamProfile
              avatar={user.avatar}
              name={user.name}
              designation={user.designation}
              key={index}
              education={user.education}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default teamProfile;
