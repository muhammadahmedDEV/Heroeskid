// MAIN MODULES
import React from "react";
import { Row, Col } from "antd";
// import hkLogo from "../../assets/logo/AKH_col.png";
// import hollandLogo from "../../assets/logo/Holland.jpg";
import FoundationImg from "../../assets/logo/foundation.png";
// import upediaImg from "../../assets/logo/upedia.png";
// import umindImg from "../../assets/logo/umind.png";
import logo_upopolis_v2 from "../../assets/logo/logo-upopolis-v2.png";
import cochlearImg from "../../assets/logo/cochlear.jpg";
import piaImg from "../../assets/logo/pia.jpg";
import rogersImg from "../../assets/logo/rogers.png";
import ehklogo from "../../assets/logo/ehklogo.png";

// STYLES
import "./styles.scss";

const bc: string = "khlf-logo";

const KHLF = () => {
  return (
    <div className={bc}>
      
      <div className={`${bc}__body`}>

        <Row align="middle" justify="space-around">
          <Col flex="auto" />
         
          <Col>
            <a href={"https://www.kidshealthlinks.org/"} target="_blank">
              <img src={FoundationImg} alt="khlf" width="300px" loading='lazy' />
            </a>
          </Col>
          <Col >
          <div style={{fontSize:"18px", margin:'10px 32px'}}> <b> Partners with </b>
           
        </div>
          </Col>

          <Col>
            <img src={ehklogo} alt="ehklogo" width="300px" loading='lazy' />
          </Col>

          <Col flex="auto" />
        </Row>

        <div style={{textAlign:"center"}}>
          <a href={"https://tam-70305.medium.com/kids-health-links-foundation-partners-with-everyday-heroes-kids-f9d3ce2303dd"} target="_blank">
            <div className={`${bc}__header__title_text`}>Read the Press Release</div>
          </a>
        </div>

        <div style={{ textAlign: "center" }}>
          <a href={"https://www.upopolis.com/"} target="_blank">
            <img src={logo_upopolis_v2} alt="khlf" width="300px" loading='lazy' />
          </a>
          <div style={{fontSize:"18px"}}>Join <a href="https://www.upopolis.com/">Upopolis</a>, A secure network helping youth and teens facing life challenges, 
            <b> "because it takes more than medicine to heal a sick child". </b>
            This therapeutic network provides access to reliable resources and child life specialists for support and the opportunity to self-empower.</div>
        </div>




        <div>
          <div className={`${bc}__header__header-title`}>Our SPONSORS</div>
        </div>
        <Row gutter={8} align="middle" justify="space-around">
          <Col>
            <a href={"https://www.rogers.com/?msclkid=e9a51678c66911eca0cbe47fdb59efb2"} target="_blank">
              <img src={rogersImg} alt="khlf" width="200px" loading='lazy' />
            </a>
          </Col>
          <Col>
            <a href={"https://www.cochlear.com/ca/en/home?msclkid=d2eddff6c66911ec99de65f191297e96"} target="_blank">
              <img src={cochlearImg} alt="khlf" width="200px" loading='lazy' />
            </a>
          </Col>
          <Col>
            <a href={"https://pialaw.ca/?msclkid=b69ef3b8c66911ec98cfb5568db3be79"} target="_blank">
              <img src={piaImg} alt="khlf" width="200px" loading='lazy' />
            </a>
          </Col>
          <Col>
            <a href={"https://markitech.ca/"} target="_blank">
              <img src={"https://markitech.ca/wp-content/uploads/2020/10/Image-1MKT.png"} alt="Markitech" width="200px" loading='lazy' />
            </a>
          </Col>
        </Row>


        {/* <Row gutter={8} className={`${bc}__body__imgBodySponser`} align="middle" justify="space-around">
          <Col>
            <a href={"https://www.rogers.com/?msclkid=e9a51678c66911eca0cbe47fdb59efb2"} target="_blank">
              <img src={rogersImg} alt="khlf" width="300px" className={`${bc}__body__margin`} loading='lazy' />
            </a>
          </Col>
          <Col>
            <a href={"https://www.cochlear.com/ca/en/home?msclkid=d2eddff6c66911ec99de65f191297e96"} target="_blank">
              <img src={cochlearImg} alt="khlf" width="300px" className={`${bc}__body__margin`} loading='lazy' />
            </a>
          </Col>
          <Col>
            <a href={"https://pialaw.ca/?msclkid=b69ef3b8c66911ec98cfb5568db3be79"} target="_blank">
              <img src={piaImg} alt="khlf" width="300px" className={`${bc}__body__margin`} loading='lazy' />
            </a>
          </Col>
          <Col>
            <a href={"https://markitech.ca/"} target="_blank">
              <img src={"https://markitech.ca/wp-content/uploads/2020/10/Image-1MKT.png"} alt="Markitech" width="300px" className={`${bc}__body__margin`} loading='lazy' />
            </a>
          </Col>
        </Row> */}

        {/* <Row gutter={8} className={`${bc}__body__imgBodySponser`}>
         
         <Col sm={24} md={24} xl={8} xxl={8} className={`${bc}__body__khlfLogoIcons`}>
           <a href={"https://www.rogers.com/?msclkid=e9a51678c66911eca0cbe47fdb59efb2"} target="_blank">
             <img src={rogersImg} alt="khlf" width="300px" className={`${bc}__body__margin`} loading='lazy' />
           </a>
         </Col>
         <Col sm={24} md={24} xl={8} xxl={8} className={`${bc}__body__khlfLogoIcons`}>
           <a href={"https://www.cochlear.com/ca/en/home?msclkid=d2eddff6c66911ec99de65f191297e96"} target="_blank">
             <img src={cochlearImg} alt="khlf" width="300px" className={`${bc}__body__margin`} loading='lazy' />
           </a>
         </Col>
         <Col sm={24} md={24} xl={8} xxl={8} className={`${bc}__body__khlfLogoIcons`}>
           <a href={"https://pialaw.ca/?msclkid=b69ef3b8c66911ec98cfb5568db3be79"} target="_blank">
             <img src={piaImg} alt="khlf" width="300px" className={`${bc}__body__margin`} loading='lazy' />
           </a>
         </Col>
         <Col sm={24} md={24} xl={8} xxl={8} className={`${bc}__body__khlfLogoIcons`}>
            <a href={"https://markitech.ca/"} target="_blank">
              <img src={"https://markitech.ca/wp-content/uploads/2020/10/Image-1MKT.png"} alt="Markitech" width="300px" className={`${bc}__body__margin`} loading='lazy' />
           </a>
         </Col>
       </Row> */}

        {/* <div className={`${bc}__body__feedback`}>In partnership with resources for families with pediatric concerns.</div> */}
      </div>
    </div>
  );
};

export default KHLF;
