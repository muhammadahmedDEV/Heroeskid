// MAIN MODULES
import React from "react";
// COMPONENTS
import Button from "../Buttons";

// STYLES
import "./styles.scss";
import { getButtonRed } from "../Buttons/style";

// ICON
import star from "../../assets/icons/icn_star.png";
import { State } from "../../reducers";
import { compose } from "recompose";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { History } from "history";

// ACTIONS
import {
  addFilterList,
  openFilterBar,
  deleteCurrent,
  setScrollPosition,
  setCarouselPosition,
} from "../../actions";

interface ComponentProps {
  index?: number;
  cityName: string;
  url: string;
  like: number;
  specialty: string;
  disabled?: boolean;
  history: History;
  addFilterList: (a: any) => void;
  setScrollPosition: (a: any) => void;
  setCarouselPosition: (a: any) => void;
}

const bc: string = "city-tile";
const CityTile = (props: ComponentProps) => {
  const classes = getButtonRed("35px", "145px");
  const trigger = (): void => {
    const container = document.querySelector("#root>div:first-child");
    const scrollPos = container.scrollTop;
    props.setScrollPosition(scrollPos);
    props.setCarouselPosition(props.index);
    props.history.push("/search");
    const res: any = {
      group: "City",
      option: props.cityName,
    };
    props.addFilterList(res);
  };
  return (
    <div className={bc}>
      <div className={`${bc}__city-name`}>{props.cityName}</div>
      <div className={`${bc}__logo-block`}>
        <img
          className={`${bc}__logo-block__logo`}
          src={props.url}
          alt=""
          style={{ maxWidth: "300px" }}
        />
      </div>
      <div className={`${bc}__info-block`}>
        <div>
          <img src={star} alt={props.cityName} loading='lazy' />
          <span className={`${bc}__like`}>{props.like}</span>
        </div>
        <span className={`${bc}__text`}>Pediatric Professionals</span>
        <span className={`${bc}__specialty`}>{props.specialty}</span>
        <Button
          styles={classes.root}
          variant="contained"
          title={"View Profile"}
          onClick={trigger}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addFilterList,
  deleteCurrent,
  openFilterBar,
  setScrollPosition,
  setCarouselPosition,
};
export default connect(null, mapDispatchToProps)(CityTile);
