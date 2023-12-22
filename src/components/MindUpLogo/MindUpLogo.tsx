// MAIN MODULES
import React from "react";
import hkLogo from "../../assets/logo/AKH_col.png";
import hollandLogo from "../../assets/logo/Holland.jpg";
import mindUp from "../../assets/logo/MindUP.png";

// STYLES
import "./styles.scss";

const bc: string = "mindUp-logo";

const MindUpLogo = () => {
  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__top_text`}>our partner in mental health &  well-being</div>
      </div>
      <div className={`${bc}__body`}>
        <div className={`${bc}__body__mindUpLogo`}>
          <a href={"https://mindup.org/"} target="_blank">
            {" "}
            <img src={mindUp} alt="Holland Bloorview" width="250px" className={`${bc}__body__margin`} loading='lazy' />
          </a>
          <div className={`${bc}__body__mindUp`}>MindUP provides the vehicle for whole-child, whole-school, whole-community transformation offering programs including resources and training for educators, administrators, families and adults.</div>
        </div>
        {/* <div className={`${bc}__body__feedback`}>In partnership with resources for families with pediatric concerns.</div> */}
      </div>
    </div>
  );
};

export default MindUpLogo;
