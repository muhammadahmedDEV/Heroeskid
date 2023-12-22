// MAIN MODULES
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { uniqBy } from "lodash";
import { Row, Col, Pagination } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// COMPONENTS
import Tile from "../../components/OrgTile/OrgTile";
// STYLES
// import "./styles.scss";
// TYPES
import { State } from "../../reducers";
import { FilterPayload } from "../../models/commonTypes";
interface ComponentProps {
  orgList: any;
  orgListLoading: boolean;
  filterList: FilterPayload[];
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
const OrgList = ({ orgList, filterList, orgListLoading }: ComponentProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(6);
  const [valueNumber, setValueNumber] = useState(0);
  const breakpoint = 600;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const getUserAccordingToFilterList = (): any => {
    const cityList = orgList.filter((item: any) => {
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
    const langList = orgList.filter((item: any) => {
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
    const specialityList = orgList.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (Array.isArray(item.specialities) && item.specialities.length) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Specialty") {
              let a: boolean = false;
              a = item.specialities.some((sp: any) => {
                return (
                   sp == val.option ? val.option :""
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
    const proffTypeList = orgList.filter((item: any) => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.prof_type) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Profession Type") {
              return (
                item.prof_type.trim().toUpperCase() ===
                val.option.trim().toUpperCase()
              );
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const orgNameList = orgList.filter((item: any): any => {
      let isMatch: boolean = false;
      if (item.approved) {
        if (item.name) {
          isMatch = filterList.some((val: any) => {
            if (val.group === "Org Name") {
                return (
                    item.name.trim().toUpperCase() ===
                    val.option.trim().toUpperCase()
                  );
            }
            return undefined;
          });
        }
      }
      return isMatch;
    });
    const collection: any = [
      ...cityList,
      ...langList,
      ...specialityList,
      ...proffTypeList,
      ...orgNameList,
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
  const title1 = "No Organization found for that search";
  // const title2 = "Our 'Heroes'";
  const title2 = `Organization Search Results [${getUserAccordingToFilterList().length}]`;
  const isEmpty = getUserAccordingToFilterList().length;
  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        {orgListLoading == true ? "" :
        <div className={`${bc}__header__top_text`}>
          {isEmpty ? title2 : title1}
        </div>}
      </div>
      {orgListLoading == true ? "" :
      <div className={cn(`${bc}__body`, !isEmpty && "addition-height")}>
        <Row
          className="visible_md"
          style={{ width: "100%" }}
          justify="center"
          gutter={[20, 20]}
          
        >
          {/* {!filterList.length &&
            orgList.map(
              (
                {
                  name,
                  city,
                  org_type,
                  works_with,
                  avatar,
                  id,
                  approved,
                  video,
                  wait_time
                }: any,
                index: number
              ) => {
                return approved ? (
                  <Col
                  // xs={{ span: 20, offset: 2 }}
                  // sm={{ span: 10, offset: 1 }}
                  // md={{ span: 10, offset: 1 }}
                  // lg={{ span: 5, offset: 0 }}
                  // xl={{ span: 5, offset: 0 }}
                  // xxl={{ span: 4, offset: 0 }}
                  >
                    <Tile
                      key={`${id}${name}`}
                      fullName={name}
                      orgType={org_type}
                      location={city}
                      status={works_with}
                      avatar={avatar}
                      id={id}
                      video={video}
                      index={index}
                      workSchedule={wait_time}
                    />
                  </Col>
                ) : null;
              }
            )} */}
          {filterList.length &&
            getUserAccordingToFilterList().slice(minValue, maxValue).map(
              (
                {
                  name,
                  city,
                  org_type,
                  works_with,
                  avatar,
                  id,
                  approved,
                  video,
                  wait_time
                }: any,
                index: number
              ) => {
                return approved ? (
                  <Col
                  // xs={{ span: 20, offset: 2 }}
                  // sm={{ span: 10, offset: 1 }}
                  // md={{ span: 10, offset: 1 }}
                  // lg={{ span: 6, offset: 0 }}
                  // xl={{ span: 5, offset: 0 }}
                  // xxl={{ span: 4, offset: 0 }}
                  key={`${id}${name}`}
                  >
                    <Tile
                      key={`${id}${name}`}
                      fullName={name}
                      orgType={org_type}
                      location={city}
                      status={works_with}
                      avatar={avatar}
                      id={id}
                      video={video}
                      index={index}
                      workSchedule={wait_time}
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
                total={getUserAccordingToFilterList().length}
              />
            </Col>
        </Row>
        <Carousel className="visible_sm" responsive={responsive}>
          {/* {!filterList.length &&
            orgList.map(
              (
                {
                  name,
                  city,
                  org_type,
                  works_with,
                  avatar,
                  id,
                  approved,
                  video,
                  wait_time
                }: any,
                index: number
              ) => {
                return (
                  approved && (
                    <Tile
                    key={`${id}${name}`}
                    fullName={name}
                    orgType={org_type}
                    location={city}
                    status={works_with}
                    avatar={avatar}
                    id={id}
                    video={video}
                    index={index}
                    workSchedule={wait_time}
                    />
                  )
                );
              }
            )} */}
          {filterList.length &&
            getUserAccordingToFilterList().map(
              (
                {
                  name,
                  city,
                  org_type,
                  works_with,
                  avatar,
                  id,
                  approved,
                  video,
                  wait_time
                }: any,
                index: number
              ) => {
                return (
                  approved && (
                    <Tile
                    key={`${id}${name}`}
                    fullName={name}
                    orgType={org_type}
                    location={city}
                    status={works_with}
                    avatar={avatar}
                    id={id}
                    video={video}
                    index={index}
                    workSchedule={wait_time}
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
const mapStateToProps = (state: State) => ({ ...state.app, ...state.orgList });
export default connect(mapStateToProps)(OrgList);
