// MAIN MODULES
import React from "react";
import { connect } from "react-redux";
import { Row } from "antd";

// COMPONENTS
import Tile from "../../components/Tile";

// STYLES
import "./styles.scss";

// ICON
import heros from "../../assets/icons/heros.png";
import arrow from "../../assets/icons/arrow.png";

// TYPES
import { State } from "../../reducers";

interface ComponentProps {
  list: any;
}

const bc: string = "banner";

const Banner = ({ list }: ComponentProps) => {
  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__text`}>
          Select and choose from the options to find who you need.
        </div>

        <div className={`${bc}__header__logo`}>
          <img src={heros} className={`${bc}__header__hero`} alt="" />
          {/* <img src={arrow} className={`${bc}__header__arrow`} alt="" /> */}
        </div>
      </div>
      <div className={`${bc}__body`}>
        <Row>
          {list.map(
            (
              {
                first_name,
                last_name,
                work_place,
                professional_title,
                city,
                working_hours,
                avatar,
                id,
                specialities,
                video,
              }: any,
              index: number
            ) => {
              if (index > 2) return undefined;
              const classFirst: string = index === 0 ? "first" : "";
              const classSecond: string = index === 1 ? "third" : "";
              const classThird: string = index === 2 ? "second" : "";
              const a = classFirst || classSecond || classThird;
              return (
                // <div style={{width:'230px'}}>
                <Tile
                  key={id}
                  fullName={`${first_name} ${last_name}`}
                  workPlace={work_place.join(', ')}
                  specialty={specialities.join(" ")}
                  status={professional_title}
                  location={city}
                  workSchedule={working_hours}
                  avatar={avatar}
                  id={id}
                  extendsClass={a}
                  video={video}
                />
                // </div>
              );
            }
          )}
        </Row>
      </div>
    </div>
  );
};
const mapStateToProps = (state: State) => state.userList;
export default connect(mapStateToProps)(Banner);
