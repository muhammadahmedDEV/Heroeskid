// MAIN MODULES
import React from "react";
import hkLogo from "../../assets/logo/AKH_col.png";
import hollandLogo from "../../assets/logo/Holland.jpg";
import mindUp from "../../assets/logo/MindUP.png";

// STYLES
import "./styles.scss";

const bc: string = "partner-logo";

const PartnerLogo = () => {
  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__top_text`}>Community Resources</div>
      </div>
      <div className={`${bc}__body`}>
        <div className={`${bc}__body__logo`}>
          <a href={'https://www.aboutkidshealth.ca/'} target="_blank">
            {" "}
            <img src={hkLogo} alt="About Kids Health" width="300px" className={`${bc}__body__margin`} loading='lazy' />
          </a>
          <a href={"https://www.hollandbloorview.ca/services/family-workshops-resources/family-resource-centre/online-family-resources-centre"} target="_blank">
            {" "}
            <img src={hollandLogo} alt="Holland Bloorview" width="300px" className={`${bc}__body__margin`} loading='lazy' />
          </a>
        </div>
        <div className={`${bc}__body__feedback`}>In partnership with resources for families with pediatric concerns.</div>
      </div>
    </div>
  );
};

export default PartnerLogo;
