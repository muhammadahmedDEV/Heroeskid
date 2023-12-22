// MAIN MODULES
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import cn from "classnames";

// COMPONENTS
// import Checkbox from "../Checkbox";

// STYLES
import "./styles.scss";

// ICON
import starbadge from "../../assets/icons/small_starbadge.png";

// ACTIONS
import { addFilterList } from "../../actions";

import { State } from "../../reducers/index";
import { AppState } from "../../reducers/app";
import { Row, Col, Form, Select, Divider, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

interface ComponentProps extends AppState {
  group: string;
  options: string[];
  onChange: (text: string) => void | undefined;
  showOptions?: string;
  // props:any
}
interface IUser {
  option: string;
  group: string;
}

const bc: string = "list";

const List = ({
  group,
  options,
  onChange,
  showOptions,
  filterList,
}: // props
ComponentProps) => {
  const dispatch = useDispatch();
  const open: boolean = group === showOptions;
  // const [val, setVal] = useState("");

  const changer = (text: string): boolean => {
    return filterList.some((val: IUser) => {
      return val.option === text;
    });
  };
  // const addFilter = (option: string, group: string): void => {
  //   const newFilter: IUser = { option, group };
  //   dispatch(addFilterList(newFilter));
  // };
  const addFilter = (option: string, group: string): any => {
    if (group === "Diagnosis/Concerns") {
      const newFilter: IUser = { option, group: "Specialty" };
      dispatch(addFilterList(newFilter));
    } else {
      const newFilter: IUser = { option, group };
      dispatch(addFilterList(newFilter));
    }
  };
  const trigger = (): void => {
    onChange(group);
  };
  const countNumb = (): number => {
    let match = 0;
    filterList.forEach((item: any) => {
      if (item.group === group) {
        match = ++match;
      }
    });
    return match;
  };
  const [form] = Form.useForm();

  return (
    <div className={cn(bc, open && "open")}>
      <div className={`${bc}__title`} onClick={trigger}>
        <div>
          <img src={starbadge} alt="" />
          <span>{group}</span>
        </div>
        <div className={`${bc}__title__count-block`}>
          <span>{countNumb()}</span> of <span>{options.length}</span>
        </div>
      </div>
      <div className={`${bc}__list-container`}>
        {open ? (
          <Form form={form}>
            <Row gutter={[16, 10]}>
              <Col span={24}>
                <Form.Item name={group} style={{ position: "relative" }}>
                  <Select
                    getPopupContainer={(trigger:any) => trigger.parentNode}
                    style={{
                      width: "100%",
                      minHeight: "270px",
                      maxWidth: "770px",
                    }}
                    onSelect={(e:any, data:any) => {
                      return addFilter(data.value, group);
                    }}
                    placeholder={`Search ${group}`}
                    size="large"
                    showSearch
                    dropdownRender={(menu:any) => (
                      <div className="dropdown">
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                            maxWidth: "770px",
                            width: "100%",
                          }}
                        ></div>
                      </div>
                    )}
                  >
                    {options.map((item: any, index: number) => (
                      <Option value={item} key={`${item} ${index}`}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : null}
        {/* {open &&
          options.map((item: string, index: number) => {
            return (
              <div className={`${bc}__check-box-container`} key={index}>
                <div className={`${bc}__check-box-wrapper`}>
                  <Checkbox
                    onClick={addFilter}
                    checked={changer(item)}
                    item={item}
                    group={group}
                  />
                </div>
                <span>{item}</span>
              </div>
            );
          })} */}
      </div>
    </div>
  );
};
const mapStateToProps = (state: State) => state.app;
export default connect(mapStateToProps)(List);
