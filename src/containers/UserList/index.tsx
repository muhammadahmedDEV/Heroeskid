// MAIN MODULES
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { uniqBy } from "lodash";
import { Row, Col, Pagination } from "antd";
import Carousel from "react-multi-carousel";
import { CircularProgress } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
// COMPONENTS
import Tile from "../../components/Tile";
// STYLES
import "./styles.scss";
// TYPES
import { State } from "../../reducers";
import { FilterPayload } from "../../models/commonTypes";
interface ComponentProps {
  list: any;
  filterList: FilterPayload[];
  listLoading: boolean;
}
const bc: string = "user-list";
const responsive = {
  tablet: {
    breakpoint: { max: 992, min: 600 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const UserList = ({ list, filterList, listLoading }: ComponentProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(6);
  const [valueNumber, setValueNumber] = useState(0);
  const breakpoint = 600;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  const getUserAccordingToFilterList = (): any => {
    const genderList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.gender) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Gender") {
              return (
                val.option.trim().toUpperCase() ===
                item.gender.trim().toUpperCase()
              );
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const cityList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.city) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "City") {
              return item.city.match(val.option);
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const langList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item && item.approved) {
        if (item.languages && item.languages.length) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Languages") {
              let a: boolean = false;
              a = item.languages.some((lang: any) => {
                return (
                  lang.trim().toUpperCase() === val.option.trim().toUpperCase()
                );
              });

              return a;
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const specialityList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (Array.isArray(item.specialities) && item.specialities.length) {
          isMatch = filterList.some((val: any) => {
            if (val.group == "Specialty") {
              let a: boolean = false;
              a = item.specialities.some((sp: any) => {
                return ( 
                  // sp &&
                  // sp.trim().toUpperCase() ===  val.option ? val.option.trim().toUpperCase():""
                  sp ==  val.option ? val.option:""
                );
                // return sp.match(val.option)
              });
              return a;
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });

    const proffTypeList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.prof_title) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Profession Type") {
              return (
                item.prof_title.trim().toUpperCase() ===
                val.option.trim().toUpperCase()
              );
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const firstNameList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.first_name) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "First Name") {
              return (
                item.first_name.trim().toUpperCase() ===
                val.option.trim().toUpperCase()
              );
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const lastNameList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.last_name) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Last Name") {
              return (
                item.last_name.trim().toUpperCase() ===
                val.option.trim().toUpperCase()
              );
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const fullNameList = list.filter((item: any): any => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.first_name || item.last_name) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Full Name") {
              const name: any = `${item.first_name
                .trim()
                .toUpperCase()} ${item.last_name.trim().toUpperCase()}`;
              return name === val.option.trim().toUpperCase();
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const distanceList = list.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.prof_title) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Distance") {
              return item.prof_title.match(val.option);
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const collection: any = [
      ...genderList,
      ...cityList,
      ...langList,
      ...specialityList,
      ...proffTypeList,
      ...distanceList,
      ...firstNameList,
      ...lastNameList,
      ...fullNameList,
    ];
    const uniqCol: any = uniqBy(collection, "id");
    return uniqCol;
  };
  const handleChange = (value: any) => {
    if (valueNumber < value) {
      if (value <= 1) {
        setMinValue(0)
        setMaxValue(6)
      }
      else {
        setMinValue(maxValue)
        setMaxValue(value * 6)
      }
    }
    else {
      if (value <= 1) {
        setMinValue(0)
        setMaxValue(6)
      }
      else {
        setMinValue(maxValue - 12)
        setMaxValue(value * 6)
      }
    }
    setValueNumber(value)
  };
  const title1 = "No professional found for that search";
  const title2 = `Professional Search Results [${getUserAccordingToFilterList().length}]`;
  const isEmpty = getUserAccordingToFilterList().length;
  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        {listLoading == true ? "" :
          <div className={`${bc}__header__top_text`}>
            {isEmpty ? title2 : title1}
          </div>}
      </div>
      {listLoading == true ?
        <div className="loader">
          <CircularProgress />
        </div>
        :
        <div className={cn(`${bc}__body`, !isEmpty && "addition-height")}>
          <Row
            className="visible_md"
            style={{ width: "100%" }}
            justify="center"
            gutter={[10, 10]}
          >
            {filterList.length &&
              getUserAccordingToFilterList().slice(minValue, maxValue).map(
                (
                  {
                    first_name,
                    last_name,
                    work_place,
                    prof_title,
                    city,
                    working_hours,
                    avatar,
                    id,
                    specialities,
                    approved,
                    video,
                  }: any,
                  index: number
                ) => {
                  return approved ? (
                    <Col key ={id}>
                      <Tile
                        key={id}
                        fullName={`${first_name} ${last_name}`}
                        workPlace={work_place.join(', ')}
                        specialty={specialities[specialities.length - 1]}
                        status={prof_title}
                        location={city}
                        workSchedule={working_hours}
                        avatar={avatar}
                        id={id}
                        video={video}
                      />
                    </Col>
                  ) : null;
                }
              )}
            <Col className="align-right" sm={24} md={24} xl={24} xxl={24}>
              <Pagination
                simple
                defaultCurrent={1}
                defaultPageSize={6}
                onChange={handleChange}
                total={filterList.length && getUserAccordingToFilterList().length}
              />
            </Col>
          </Row>
          <Carousel className="visible_sm" responsive={responsive}>
            {filterList.length &&
              getUserAccordingToFilterList().map(
                (
                  {
                    first_name,
                    last_name,
                    work_place,
                    prof_title,
                    city,
                    working_hours,
                    avatar,
                    id,
                    specialities,
                    approved,
                    video,
                  }: any,
                  index: number
                ) => {
                  return (
                    approved && (
                      <Tile
                        key={id}
                        fullName={`${first_name} ${last_name}`}
                        workPlace={work_place.join(', ')}
                        specialty={specialities[specialities.length - 1]}
                        status={prof_title}
                        location={city}
                        workSchedule={working_hours}
                        avatar={avatar}
                        id={id}
                        video={video}
                      />
                    )
                  );
                }
              )}
          </Carousel>
        </div>}
    </div>
  );
};
const mapStateToProps = (state: State) => ({ ...state.app, ...state.userList });
export default connect(mapStateToProps)(UserList);
