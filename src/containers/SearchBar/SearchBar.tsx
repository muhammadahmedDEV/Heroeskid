// MAIN MODULES
import React, { useState } from "react";
import { compose } from "recompose";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { Col, Form, Row, Select } from "antd";

// COMPONENTS
import Autosuggest, { SuggestionType } from "../../components/Autosuggest";

// STYLES
// import "./styles.scss";
import Button from "../../components/Buttons";
import '../Search/styles.scss'
import { getStyles, getButtonRed } from "../../components/Buttons/style";

// ACTIONS
import { addFilterList, openFilterBar, deleteCurrent } from "../../actions";

// ICON
import { State } from "../../reducers";
import { getItemToLocalStorage } from "../../servises/localStorage";

// TYPES

interface ComponentProps extends RouteComponentProps {
  addFilterList: (a: any) => void;
  deleteCurrent: (a: string) => void;
  openFilterBar: (a: string) => void;
  isFilterBarOpen: boolean;
  diagnoses: any;
  disorderList: any;
  list: any;
  languages: any;
  cityList: any;
  orgList: any;
}

const { Option } = Select;
const bc: string = "search";

const Search = (props: ComponentProps) => {
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const [val, setVal] = useState("");
  const classes = getStyles(Search);
  const newClasses = getButtonRed("74px", "74px", '#d12c27');
  const searchResult = () => {
    const cityFilter = getFieldValue('cities')
    const profFilter = getFieldValue('prof_title')
    const specFilter = getFieldValue('speciality')
    const langFilter = getFieldValue('languages')
    props.history.push("/search");
    // const res: SuggestionType = { id: val, type: val };
    const languages = getItemToLocalStorage("langComplete");
    const profType = getItemToLocalStorage("specComplete");
    const specialty = getItemToLocalStorage("diagComplete");
    const cities = getItemToLocalStorage("cities");
    const name = [...props.list];
    const orgName = [...props.orgList];
    const prof = profType.find((item: any) => {
      return item.type.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const spec = specialty.find((item: any) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const lang = languages.find((item: any) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const city = cities.find((item: any) => {
      return item.name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const firstName = name.find((item) => {
      return item.first_name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const lastName = name.find((item) => {
      return item.last_name.trim().toUpperCase() === val.trim().toUpperCase();
    });
    const fullName = name.find((item) => {
      const fname: any = `${item.first_name
        .trim()
        .toUpperCase()} ${item.last_name.trim().toUpperCase()}`;
      return fname === val.trim().toUpperCase();
    });
    const organizationName = orgName.find((item) => {
      return item?.name?.trim().toUpperCase() === val.trim().toUpperCase();
    });
    if (organizationName) {
      const res: any = {
        group: "Org Name",
        option: `${organizationName.name}`,
      };
      props.addFilterList(res);
    }

    if (prof) {
      const res: any = {
        group: "Profession Type",
        option: prof.type,
      };
      props.addFilterList(res);
      if (prof?.treats?.length) {
        prof?.treats?.forEach((elem: any) => {
          const result = { group: 'Specialty', option: elem.name }
          props.addFilterList(result);
        })
      }
    }
    if (profFilter) {
      const res: any = {
        group: "Profession Type",
        option: profFilter,
      };
      props.addFilterList(res);
      if (prof?.treats?.length) {
        prof?.treats?.forEach((elem: any) => {
          const result = { group: 'Specialty', option: elem.name }
          props.addFilterList(result);
        })
      }
    }
    if (spec) {
      const res: any = { group: "Specialty", option: spec.name };
      props.addFilterList(res);
    }
    if (specFilter) {
      const res: any = { group: "Specialty", option: specFilter };
      props.addFilterList(res);
    }
    if (lang) {
      const res: any = { group: "Languages", option: lang.name };
      props.addFilterList(res);
    }
    if (langFilter) {
      const res: any = { group: "Languages", option: langFilter };
      props.addFilterList(res);
    }
    if (city) {
      const res: any = { group: "City", option: city.name };
      props.addFilterList(res);
    }
    if (cityFilter) {
      const res: any = { group: "City", option: cityFilter };
      props.addFilterList(res);
    }
    if (firstName) {
      const res: any = {
        group: "First Name",
        // option: `${firstName.first_name} ${firstName.last_name}`,
        option: `${firstName.first_name}`,
      };
      props.addFilterList(res);
    }
    if (lastName) {
      const res: any = {
        group: "Last Name",
        option: `${lastName.last_name}`,
        // option: `${lastName.first_name} ${lastName.last_name}`,
      };
      props.addFilterList(res);
    }
    if (fullName) {
      const res: any = {
        group: "Full Name",
        option: `${fullName.first_name} ${fullName.last_name}`,
      };
      props.addFilterList(res);
    }
    if (
      prof === undefined &&
      spec === undefined &&
      firstName === undefined &&
      lastName === undefined &&
      fullName === undefined &&
      city === undefined &&
      lang === undefined &&
      cityFilter === undefined &&
      profFilter === undefined &&
      specFilter === undefined &&
      langFilter === undefined &&
      organizationName === undefined
    ) {
      const res: any = { group: "No Value", option: val };
      props.addFilterList(res);
    }
  };
  const onSubmit = (): void => {
    props.history.push("/search");
    const res: SuggestionType = { id: val, type: val };
    props.addFilterList(res);
  };
  const advancedOpt = (): void => {
    props.openFilterBar("home");
    props.history.push("/search");
    props.deleteCurrent("all");
  };
  const triggerModal = (): void => {
    openFilterBar("home");
    // openFilterBar("search");
  };
  return (
    <Form
      form={form}
      onFinish={searchResult}
      className={bc}
    >
      <Row gutter={[8, 8]} className={`${bc}__middle-container`}>
        <Col sm={22} md={22} xl={22} xxl={22}
          style={{ margin: '0', padding: '0' }}
        >
          <Form.Item className={`${bc}__middle-container__input`} >
            <Autosuggest isChange={setVal}
            // style={{ width: '100%', height: '100%' }}
            />
          </Form.Item>
          {/* <Row
          gutter={8}
          className={`${bc}__bottom-container`}
          // style={{height: '48px', marginBottom: '10px'}}
          >
            <Col sm={24} md={3} xl={3} xxl={3} className={`${bc}__text`}>
              Filter by:
            </Col>
             <Col  sm={24} md={5} xl={5} xxl={5} >
                  <Form.Item
                  name="cities"
                  >
                         <Select
                        placeholder='Location'

                         >
                           {props?.cityList?.map((item: any, index: any) => (
                       <Option value={item.name} key={`${item.id} ${index}`}>
                        {item.name}
                      </Option>
                      ))}
                         </Select>
                  </Form.Item>
                </Col>
             <Col  sm={24} md={5} xl={5} xxl={5}>
                  <Form.Item name="speciality">
                    <Select
                    placeholder='Diagnosis/Concerns'
                    >
                      {props?.diagnoses?.map((item: any, index: any) => (
                       <Option value={item.name} key={`${item.id} ${index}`}>
                        {item.name}
                      </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
             <Col  sm={24} md={6} xl={6} xxl={6}>
                  <Form.Item name="prof_title">
                    <Select
                    placeholder='Profession'>
                      {props?.disorderList?.map((item: any, index: any) => (
                       <Option value={item.type} key={`${item.id} ${index}`}>
                        {item.type}
                      </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
             <Col sm={24} md={5} xl={5} xxl={5} >
                  <Form.Item name="languages">
                    <Select
                    placeholder='Languages'>
                       {props.languages?.map((item: any, index: any) => (
                       <Option value={item.name} key={`${item.id} ${index}`}>
                        {item.name}
                      </Option>
                      ))}
                    </Select>
                  </Form.Item>
            </Col>
          </Row> */}
        </Col>
        <Col sm={2} md={2} xl={2} xxl={2}
          style={{ margin: '0', padding: '0' }}
        >
          <Form.Item>
            <button
              type='submit'
              onClick={searchResult}
              className={`${bc}__button`}
            >
            </button>
          </Form.Item>
        </Col>
      </Row>
      {/* <div className={`${bc}__bottom-filter-button`}>
        <Button
          title={"Search Filters"}
          styles={classes.root}
          onClick={advancedOpt}
          variant='contained'
        />
      </div> */}
    </Form>
  );
};

Search.displayName = "Search";
const mapStateToProps = (state: State) => ({
  ...state.userList,
  ...state.orgList,
  ...state.app,
  ...state.app.termsAccepted,
});
const mapDispatchToProps = { addFilterList, deleteCurrent, openFilterBar };

// export default compose<ComponentProps, {}>(withRouter, connect(null, mapDispatchToProps))(Search)
export default compose<ComponentProps, {}>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Search);
