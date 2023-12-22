// MAIN MODULES
import React, { useState } from "react";
import cn from "classnames";
import moment from "moment";
// COMPONENTS
import Button from "../Buttons";
import Modal from "../Modal";
import HeaderForm from "../../containers/HeaderForm";

// STYLES
import "./styles.scss";
import { getButtonBlue } from "../Buttons/style";

// ICON
import mask_red from "../../assets/icons/mask_red.svg";
import nav_star from "../../assets/icons/nav_star.svg";
import avatar from "../../assets/team/avatar.png";

interface ComponentProps {
  currentUser: any;
  isAuthorize: boolean;
}

const bc: string = "user-logo";

const handleTime = (hours: any) => {
  const hours_split = hours && hours.split("-");
  const start_hour =
    hours_split &&
    hours_split[0] &&
    moment(hours_split[0].trim(), "h:mm A").format("h:mm A");
  const end_hour =
    hours_split &&
    hours_split[1] &&
    moment(hours_split[1].trim(), "h:mm A").format("h:mm A");
  const result = start_hour + " - " + end_hour;
  return result;
};
const UserLogo = ({ isAuthorize, currentUser }: ComponentProps) => {
  const classes = getButtonBlue("24px", "72px", "white", false);
  const [isOpen, setVal] = useState(false);
  const triggerModal = (): void => {
    setVal(!isOpen);
  };
  return (
    <div className={bc}>
      {isOpen && (
        <Modal>
          <HeaderForm onCancel={triggerModal} />
        </Modal>
      )}
      {/* <Row style={{ width: "100%" }} align="middle" justify="space-between" className={`${bc}__container`}>
        <Col sm={24} md={24} lg={18} xl={18}> */}
      <div className={`${bc}__logo-block`}>
        <div
          className={`${bc}__logo-block__logo-mask`}
          style={{ position: "relative" }}
        >
          <img
            className={`${bc}__logo-block__logo-mask__logo`}
            src={
              currentUser && currentUser.avatar ? currentUser.avatar : avatar
            }
            alt=""
          />
          <img
            className={`${bc}__logo-block__logo-mask__mask`}
            src={mask_red}
            alt=""
          />
          <img
            className={`${bc}__logo-block__logo-mask__star`}
            src={nav_star}
            alt=""
          />
          {isAuthorize ? (
            <div className={cn(isAuthorize && "button-bottom-left")}>
              <Button
                title={"Edit"}
                styles={classes.root}
                onClick={triggerModal}
              />
            </div>
          ) : null}
        </div>
        <div className={`${bc}__logo-block__text-block`}>
          <span
            className={`${bc}__logo-block__text-block__name`}
          >{`${currentUser && currentUser.first_name} ${currentUser &&
            currentUser.last_name}`}</span>
          {/* {currentUser && currentUser.specialities.map((e : any) => (
                    <span className={`${bc}__logo-block__text-block__second`}>{`${e}`}</span>
                    ))} */}
          <span>{`${currentUser && currentUser.prof_title}`}</span>
          <span
            className={`${bc}__logo-block__text-block__third`}
          >{`${currentUser &&
            currentUser.exp} years of Private Practice`}</span>
        </div>
      </div>
      {/* </Col>
        <Col sm={24} md={{span:14, offset:5}} lg={5} xl={5}> */}
      <div className={`${bc}__text-block-second`}>
        <div>{/* <span>Waiting period: 2 month</span>  TO DO*/}</div>
        <div className={`${bc}__text-block-second__treatment`}>
          {currentUser.work_place.join(", ")}
        </div>
        <div className={`${bc}__text-block-second__distance`}>
          <span>{currentUser && handleTime(currentUser.working_hours)}</span>
        </div>
        <div className={`${bc}__text-block-second__location`}>
          <span>
            {currentUser && currentUser.business_name
              ? currentUser.business_name
              : null}
          </span>
          <span>
            {currentUser.address}, {currentUser.city} , {currentUser.country}
          </span>
          <span>{currentUser.postal_code}</span>
          <span>{currentUser.phone}</span>
          <span>{currentUser.site}</span>
        </div>
      </div>
      {/* </Col>
      </Row> */}
    </div>
  );
};
export default UserLogo;
