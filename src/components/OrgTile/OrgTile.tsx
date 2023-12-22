// MAIN MODULES
import React, { useState, useEffect } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
// COMPONENTS
import Icon from "../OrgLogo/OrgLogo";
import Button from "../Buttons";

// STYLES
import "./styles.scss";
import { getButtonRed } from "../Buttons/style";

// ICON
import startbadge from "../../assets/icons/starbadge.png";
import defltAvatar from "../../assets/team/avatar.jpg";

// ACTIONS
import {
  addCurrentUser,
  setScrollPosition,
  setCarouselPosition,
  getOrgFromId,
} from "../../actions";
import { VideoCameraOutlined } from "@ant-design/icons";

interface ComponentProps {
  fullName: string;
  orgType: string;
  workPlace?: string;
  status?: string;
  location: string;
  workSchedule?: string;
  extendsClass?: string;
  avatar: string;
  id: string;
  index?: number;
  video?: string;
}

const bc: string = "user-tile";
const OrgTile = ({
  index,
  fullName,
  orgType,
  workPlace,
  status,
  location,
  workSchedule,
  extendsClass = "",
  avatar,
  id,
  video,
}: ComponentProps) => {
  const classes = getButtonRed("35px", "145px");
  const dispatch = useDispatch();
  const trigger = (): void => {
    const container = document.querySelector("#root>div:first-child");
    const scrollPos = container.scrollTop;
    dispatch(setScrollPosition(scrollPos));
    dispatch(setCarouselPosition(index));
    dispatch(getOrgFromId(id))
    dispatch(addCurrentUser(id));
  };
  return (
    <div className={cn(bc, extendsClass)} key={id} onScroll={trigger}>
      {video ? (
        <VideoCameraOutlined
          style={{
            fontSize: "24px",
            color: "#39a2cf",
            position: "relative",
            top: "10px",
            left: "-87px",
          }}
        />
      ) : (
        <VideoCameraOutlined
          style={{
            fontSize: "24px",
            color: "#fff",
            position: "relative",
            top: "10px",
            left: "-87px",
          }}
        />
      )}
      <div className={`${bc}__logo-block`}>
        <Icon url={avatar && avatar ? avatar : defltAvatar} />
        <img className={`${bc}__logo-block__sing`} src={startbadge} alt="" />
      </div>
      <div className={`${bc}__info-block`}>
        <span className={`${bc}__info-block__fullName`}>{fullName}</span>
        <span className={`${bc}__info-block__fullName`}>{orgType}</span>
        <span className={`${bc}__info-block__work-place`}>{`Works with ${status}`}</span>
       {/* <span className={`${bc}__info-block__status`}>{id == "7MNup7DH16pfhD4B49SR" ? "" :`${workSchedule} WAITING LIST`}</span> */}
        <span className={`${bc}__info-block__location`}>{location}</span>
        <span className={`${bc}__info-block__button`}>
          <Button
            styles={classes.root}
            variant="contained"
            title={"View Organization"}
            onClick={trigger}
          />
        </span>
      </div>
    </div>
  );
};

export default OrgTile;
