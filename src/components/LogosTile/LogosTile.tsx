// MAIN MODULES
import React from "react";
import Swal from "sweetalert2";
import { Row, Col } from "antd";

// COMPONENTS
import OAMHPLogo from "../../assets/logo/OAMHPLogo.png";
import SpecialOlympics from "../../assets/logo/SpecialOlympics.png";
import tech4Kids from "../../assets/logo/tech4Kids.png";

// STYLES
import "./styles.scss";
import PledgeCard from "../PledgeCard/PledgeCard";

// interface ComponentProps {

// }

const bc: string = "logos-tile";

const Feedback = () => {
  return (
    <div className={bc}>
      {/* <div className={`${bc}__header`}>
        <div className={`${bc}__header__top_text`}>
          Our Partners in Support of Pediatric Health and Well-being
        </div>
      </div> */}
      <div className={`${bc}__body`}>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className={`${bc}__body__content`}>
              <a href={"https://oamhp.ca/"} target="_blank">
                <img src={OAMHPLogo} alt="OAHMP Logo" width="211px" loading='lazy' />
              </a>
              <a
                href={"https://www1.specialolympicsontario.com/"}
                target="_blank"
              >
                <img
                  src={SpecialOlympics}
                  alt="Special Olympics Ontario"
                  height="211px"
                  loading='lazy'
                />
              </a>
              <PledgeCard
                description={"We have taken the Tech4SickKids pledge"}
                url={"http://www.tech4sickkids.com"}
                src={tech4Kids}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Feedback;
