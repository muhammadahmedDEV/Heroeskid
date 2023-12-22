// MAIN MODULES
import { Col, Row } from "antd";
import React, { useState } from "react";

// STYLES
// import "./styles.scss";

// ICON
import starbadge from "../../assets/icons/starbadge.png";

interface ComponentProps {
  event: any
}

const bc: string = "article-tile";

const EventTile = ( props : ComponentProps) => {
  const [isOpen, setVal] = useState(false);
  return (
    <div className={bc}>
        <Row gutter={16}>
            <img src={starbadge} alt="" />
            <div className={`${bc}__title-block__article-text`}>
            {props?.event?.title}
            </div>
        </Row>
      <Row gutter={16} style={{margin: '15px 0'}}>
        <Col span={24}>
        <img
        src={props?.event?.eventPicture}
        // width='100%'
        height='260px'
        alt=""
    />
        </Col>
      </Row>
      <Row gutter={16} style={{margin: '15px 0'}}>
        <Col span={24}>
         {props?.event?.details && <div className={`${bc}__title-block__article-text-level2`}>Event Details</div>}
        </Col>
        <Col span={24} className={`${bc}__content-block`}>
          <div className={`${bc}__content-block__text`}>
          {props?.event?.details}
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={6} className={`${bc}__title-block__article-text-level3`}>Date:</Col>
            <Col span={18} className={`${bc}__content-block`}>
              <div className={`${bc}__content-block__text`}>
                {props?.event?.date}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6} className={`${bc}__title-block__article-text-level3`}>Time:</Col>
            <Col span={18} className={`${bc}__content-block`}>
              <div className={`${bc}__content-block__text`}>
              {props?.event?.startTime ? `${props?.event?.startTime} - ${props?.event?.endTime}` : '-- - --'}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6} className={`${bc}__title-block__article-text-level3`}>Contact:</Col>
            <Col span={18} className={`${bc}__content-block`}>
              <div className={`${bc}__content-block__text`}>
              {props?.event?.contact}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
        <Row gutter={16}>
            <Col span={6} className={`${bc}__title-block__article-text-level3`}>Location:</Col>
            <Col span={18} className={`${bc}__content-block`}>
              <div className={`${bc}__content-block__text`}>
              {props?.event?.location}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8} className={`${bc}__title-block__article-text-level3`}>Register at:</Col>
            <Col span={16} className={`${bc}__content-block`}>
              <a className={`${bc}__content-block__text`} href={props?.event?.url} target={'_blank'}>
              {props?.event?.url}
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EventTile;
